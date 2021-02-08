import SalaryService from "../services/SalaryService";
import Util from "../utils/Utils";

const util = new Util();

class SalaryController {
  static async addSalary(req, res) {
    //Validation
    if (!req.body.salary) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newSalary = req.body;
    try {
      const createdSalary = await SalaryService.addSalary(newSalary);
      util.setSuccess(201, "Job Title Added!", createdSalary);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default SalaryController;
