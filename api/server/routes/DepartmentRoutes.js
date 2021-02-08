import { Router } from 'express';
import DepartmentController from '../controllers/DepartmentController';

const router = Router();

router.get('/', DepartmentController.getAllDepartments);

export default router;