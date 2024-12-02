import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDb = async (student: Student) => {
  // Insert the student object into your database
  const result = await StudentModel.create(student);
  return result;
};

// get all students from server
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// get Single student from server
const getSingleStudentFromDB = async (id: string) => {
  try {
    const result = await StudentModel.findOne({ _id: id });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
