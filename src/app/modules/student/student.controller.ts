import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const { error } = studentValidationSchema.validate(studentData);

    const result = await StudentServices.createStudentIntoDb(studentData);
    // console.log(error, value);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.details,
      });
    }

    // send response

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    // send response
    res.status(200).json({
      success: true,
      message: 'All students fetched successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // send response
    res.status(200).json({
      success: true,
      message: 'Single Student fetched successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
