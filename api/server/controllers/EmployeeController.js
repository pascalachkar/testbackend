import EmployeeService from "../services/EmployeeService";
import Util from "../utils/Utils";
import { body } from "express-validator";
import { validationResult } from "express-validator";

const util = new Util();

class EmployeeController {
  static validate(method) {
    switch (method) {
      case "addEmployee":
        {
          return [
            body("firstname", "firstname cannot be empty")
              .exists()
              .isString()
              .notEmpty(),
            body("lastname", "firstname cannot be empty").exists().notEmpty(),
            body("jobtitle", "jobtitle must be specified").exists().notEmpty(),
            body("department_id", "department id should be specfied")
              .exists()
              .notEmpty(),
            body("email", "valid email must be specified")
              .exists()
              .isEmail()
              .notEmpty(),
            body("city", "city cannot be empty").exists().notEmpty(),
            body("country", "country cannot be empty").exists().notEmpty(),
            body("address1", "address1 cannot be empty").exists().notEmpty(),
            body("birthdate", "birthdate should be a valid date")
              .exists()
              .notEmpty(),
            body("hiredate", "hiredate should be a valid date")
              .exists()
              .notEmpty(),
          ];
        }
        break;
      case "updateEmployee":
        {
          return [
            body("id", "employee id must be specified")
              .exists()
              .isInt()
              .notEmpty(),
            body("firstname", "firstname cannot be empty").exists().notEmpty(),
            body("lastname", "firstname cannot be empty").exists().notEmpty(),
            body("jobtitle", "jobtitle must be specified").exists().notEmpty(),
            body("department_id", "department id should be specfied")
              .exists()
              .notEmpty(),
            body("email", "valid email must be specified")
              .exists()
              .isEmail()
              .notEmpty(),
            body("city", "city cannot be empty").exists().notEmpty(),
            body("country", "country cannot be empty").exists().notEmpty(),
            body("address1", "address1 cannot be empty").exists().notEmpty(),
            body("birthdate", "birthdate should be a valid date")
              .exists()
              .notEmpty(),
            body("hiredate", "hiredate should be a valid date")
              .exists()
              .notEmpty(),
          ];
        }
        break;
        case "updateEmployee":
        {
          return [
            body("id", "employee id must be specified")
              .exists()
              .isInt()
              .notEmpty(),
          ];
        }
        break;
    }
  }

  static async getAllEmployees(req, res) {
    try {
      const allEmployees = await EmployeeService.getAllEmployees();
      if (allEmployees.length > 0) {
        util.setSuccess(200, "Employees retrieved", allEmployees);
      } else {
        util.setSuccess(200, "No employee found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getPagination(page, size) {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  }

  static async getPagingData(data, page, limit) {
    const { count: totalItems, rows: employees } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, employees, totalPages, currentPage };
  }

  static async getAllEmployeesWithPagination(req, res) {
    try {
      const { page, size } = req.query;
      const searchFirstname = req.query.searchFirstname;
      const searchLastname = req.query.searchLastname;

      const limit = size ? +size : 3;
      const offset = page ? page * limit : 0;
      //const { limit, offset } = EmployeeController.getPagination(page, size);

      console.log("LIMIT");
      console.log(limit);
      console.log("OFFSET");
      console.log(offset);

      const allEmployees = await EmployeeService.getAllEmployeesWithPagination(
        limit,
        offset,
        searchFirstname,
        searchLastname
      );
      if (allEmployees) {
        console.log("INSIDEDATTA");
        const { count: totalItems, rows: employees } = allEmployees;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);

        const response = { totalItems, employees, totalPages, currentPage };

        util.setSuccess(200, "Employees retrieved", response);
      } else {
        util.setSuccess(200, "No employee found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      console.log(error.toString());
      return util.send(res);
    }
  }

  static async addEmployee(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const newEmployee = req.body;

    try {
      const createdEmployee = await EmployeeService.addEmployee(newEmployee);
      util.setSuccess(201, "employee Added!", createdEmployee);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateEmployee(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const alteredEmployee = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(
        id,
        alteredEmployee
      );
      if (!updatedEmployee) {
        util.setError(404, `Cannot find employee with the id: ${id}`);
      } else {
        util.setSuccess(200, "employee updated", updatedEmployee);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getEmployee(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theemployee = await EmployeeService.getEmployee(id);

      if (!theemployee) {
        util.setError(404, `Cannot find employee with the id ${id}`);
      } else {
        util.setSuccess(200, "Found employee", theemployee);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteEmployee(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const employeeToDelete = await EmployeeService.deleteEmployee(id);

      if (employeeToDelete) {
        util.setSuccess(200, "employee deleted");
      } else {
        util.setError(404, `employee with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default EmployeeController;
