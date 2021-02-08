import db from "../src/models/index";
const Sequelize = require("sequelize");

class DepartmentService {
    static async getAllDepartments() {
        try {
            return await db.Department.findAll();
        } catch(error) {
            throw error
        }
    }
}

export default DepartmentService;