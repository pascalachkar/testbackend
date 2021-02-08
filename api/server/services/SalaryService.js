import db from "../src/models/index";
const Sequelize = require("sequelize");

class SalaryService {
  static async addSalary(newSalary) {
    try {
      return await db.Salary.create(newSalary);
    } catch (error) {
      throw error;
    }
  }

  static async updateSalaryForEmployee(id, updatedSalary) {
    try {
      const salaryToUpdate = await db.Salary.findOne({
        where: { employee_id: Number(id) },
      });


      const salaryObject = {
        salary: updatedSalary
      }


      if (salaryToUpdate) {
        await db.Salary.update(salaryObject, {
          where: { id: Number(salaryToUpdate.dataValues.id) },
        });

        return updatedSalary;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default SalaryService;
