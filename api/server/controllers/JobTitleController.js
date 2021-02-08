import JobTitleService from "../services/JobTitleService";
import Util from "../utils/Utils";

const util = new Util();

class JobTitleController {
  static async addJobTitle(req, res) {
    //Validation
    if (!req.body.title) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newJobTitle = req.body;
    try {
      const createdJobTitle = await JobTitleService.addJobTitle(newJobTitle);
      util.setSuccess(201, "Job Title Added!", createdJobTitle);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }
}

export default JobTitleController;
