/**
  @swagger
   components:
     schemas:
       Book:
         type: object
         required:
           - title
           - author
           - finished
         properties:
           id:
             type: integer
             description: The auto-generated id of the book.
           title:
             type: string
             description: The title of your book.
           author:
             type: string
             description: Who wrote the book?
           finished:
             type: boolean
             description: Have you finished reading it?
           createdAt:
             type: string
             format: date
             description: The date of the record creation.
         example:
            title: The Pragmatic Programmer
            author: Andy Hunt / Dave Thomas
            finished: true
 
 */

import { Router } from 'express';
import EmployeeController from '../controllers/EmployeeController';

const router = Router();

router.get('/', EmployeeController.getAllEmployeesWithPagination);
router.post('/', EmployeeController.validate('addEmployee'), EmployeeController.addEmployee);
router.get('/:id', EmployeeController.getEmployee);
router.put('/:id', EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);

export default router;