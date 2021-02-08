import db from "../src/models/index";
import JobTitleService from "./JobTitleService";
import SalaryService from "./SalaryService";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class EmployeeService {
  static async getAllEmployees() {
    try {
      //console.log(db.Employee);
      //console.log(db.Salary);
      return await db.Employee.findAll({
        include: [
          {
            model: db.Salary,
          },
          {
            model: db.JobTitle,
          },
          {
            model: db.Department,
          },
        ],
      });
      //return await db.Employee.findAll();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAllEmployeesWithPagination(limit, offset, searchFirstname, searchLastname) {
    try {
      
      var condition = null;
      if (searchFirstname && searchLastname) {
        condition = {
          firstname: { [Op.like]: `%${searchFirstname}%` },
          lastname: { [Op.like]: `%${searchLastname}%` },
        };
      } else {
        if (searchFirstname) {
          condition = {
            firstname: { [Op.like]: `%${searchFirstname}%` },
          };
        }
        if (searchLastname) {
          condition = {
            lastname: { [Op.like]: `%${searchLastname}%` },
          };
        }
      }
      
      return await db.Employee.findAndCountAll({
        limit,
        offset,
        where: condition,
        order: [["id", "ASC"]],

        include: [
          {
            model: db.Salary,
          },
          {
            model: db.JobTitle,
          },
          {
            model: db.Department,
          },
        ],
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async addEmployee(newEmployee) {
    try {
      const jobTitleValue = newEmployee.jobtitle;
      const salaryValue = newEmployee.salary;

      var employeeAdded = await db.Employee.create(newEmployee);


      if (employeeAdded && jobTitleValue) {
        const dateNow = new Date();
        const dateAddYear = new Date();
        dateAddYear.setFullYear(dateNow.getFullYear() + 1);
        const jobTitle = {
          employee_id: employeeAdded.dataValues.id,
          title: jobTitleValue,
          description: jobTitleValue,
          from_date: dateNow.toISOString().slice(0, 19).replace("T", " "),
          to_date: dateAddYear.toISOString().slice(0, 19).replace("T", " "),
          created_at: dateNow.toISOString().slice(0, 19).replace("T", " "),
          updated_at: dateNow.toISOString().slice(0, 19).replace("T", " "),
          isCurrent: 1,
        };
        JobTitleService.addJobTitle(jobTitle);
      }

      if (employeeAdded && salaryValue) {
        const dateNow = new Date();
        const dateAddYear = new Date();
        dateAddYear.setFullYear(dateNow.getFullYear() + 1);
        const salary = {
          employee_id: employeeAdded.dataValues.id,
          salary: salaryValue,
          from_date: dateNow.toISOString().slice(0, 19).replace("T", " "),
          to_date: dateAddYear.toISOString().slice(0, 19).replace("T", " "),
          created_at: dateNow.toISOString().slice(0, 19).replace("T", " "),
          updated_at: dateNow.toISOString().slice(0, 19).replace("T", " "),
          isCurrent: 1,
        };
        SalaryService.addSalary(salary);
      }

      return employeeAdded;
    } catch (error) {
      throw error;
    }
  }

  static async updateEmployee(id, updateEmployee) {
    try {
      const updatedSalary = updateEmployee.salary;
      const updatedJobTitle = updateEmployee.jobtitle;

      const employeeToUpdate = await db.Employee.findOne({
        where: { id: Number(id) },
      });

      if (employeeToUpdate) {
        await db.Employee.update(updateEmployee, {
          where: { id: Number(id) },
        });
        console.log("UPDATED SALARY");
        console.log(updatedSalary);
        if (updatedSalary) {
          SalaryService.updateSalaryForEmployee(id, updatedSalary);
        }
        if (updatedJobTitle) {
          JobTitleService.updateJobTitleForEmployee(id, updatedJobTitle);
        }

        return updateEmployee;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getEmployee(id) {
    try {
      const theEmployee = await db.Employee.findOne({
        where: { id: Number(id) },
        include: [
          {
            model: db.Salary,
          },
          {
            model: db.JobTitle,
          },
          {
            model: db.Department,
          },
        ],
      });

      return theEmployee;
    } catch (error) {
      throw error;
    }
  }

  static async deleteEmployee(id) {
    try {
      const employeeToDelete = await db.Employee.findOne({
        where: { id: Number(id) },
      });

      if (employeeToDelete) {
        const deletedEmployee = await db.Employee.destroy({
          where: { id: Number(id) },
        });
        return deletedEmployee;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default EmployeeService;
