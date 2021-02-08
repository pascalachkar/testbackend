
import DepartmentService from '../services/DepartmentService';
import Util from '../utils/Utils';

const util = new Util();



class DepartmentController {
    static async getAllDepartments(req, res) {
        try {
          const allDepartments = await DepartmentService.getAllDepartments();
          if (allDepartments.length > 0) {
            util.setSuccess(200, 'Departments retrieved', allDepartments);
          } else {
            util.setSuccess(200, 'No Departements found');
          }
          return util.send(res);
        } catch (error) {
          util.setError(400, error);
          return util.send(res);
        }
      }
}

export default DepartmentController