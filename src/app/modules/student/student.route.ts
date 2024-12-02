import { StudentController } from './student.controller';
import express from 'express';
const router = express.Router();

// will call controller function
router.post('/create-student', StudentController.createStudent);
router.get('/all-student', StudentController.getAllStudents);
router.get('/all-student/:studentId', StudentController.getSingleStudent);
//
export const StudentRoutes = router;
