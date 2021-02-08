import db from "../src/models/index";
const Sequelize = require("sequelize");

class JobTitleService {
  static async addJobTitle(newJobTitle) {
    try {
      return await db.JobTitle.create(newJobTitle);
    } catch (error) {
      throw error;
    }
  }

  static async updateJobTitleForEmployee(id, updatedJobTitle) {
    try {
      const jobTitleToUpdate = await db.JobTitle.findOne({
        where: { employee_id: Number(id) },
      });

      const jobTitleObject = {
        title: updatedJobTitle,
        description: updatedJobTitle
      }
      if (jobTitleToUpdate) {
        await db.JobTitle.update(jobTitleObject, {
          where: { employee_id: Number(id) },
        });

        return updatedJobTitle;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default JobTitleService;
