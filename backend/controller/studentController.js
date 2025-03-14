import { Student } from "../Model/StudentModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ErrorHandler from "../middleware.js/error.js";
import { catchAsyncError } from "../middleware.js/catchAsyncError.js";
import mongoose from "mongoose";

export const studentRegister = async (req, res, next) => {
  const {
    firstName,
    middleName,
    lastName,
    password,
    phone,
    villageName,
    talukka,
    district,
    className,
    school,
    coordinator,
  } = req.body;

  try {
    // Check if all required fields are provided
    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !coordinator ||
      !password ||
      !className ||
      !phone ||
      !villageName ||
      !talukka ||
      !district ||
      !school
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check if the student has already been registered
    const existingStudent = await Student.findOne({ phone });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already registered",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new student
    const newStudent = await Student.create({
      firstName,
      middleName,
      lastName,
      password: hashPassword,
      phone,
      coordinator,
      villageName,
      talukka,
      district,
      className,
      role: "Student",
      school,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    // Send response with the token set as a cookie and the student data
    return res
      .status(200)
      .cookie("Student_Token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Student registered successfully",
        newStudent,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// login student
export const studentLogin = async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone) {
    return next(new ErrorHandler("Please fill full form ", 400));
  }

  try {
    const student = await Student.findOne({ phone });

    if (!student) {
      return next(new ErrorHandler("Invalid email or password ", 400));
    }

    // there is no password check for student login bcz password is hashed and we dont know password
    // in future we will add forgot password so user can update password for now no login password security

    // const checkHashPassword = await bcrypt.compare(password, student.password);
    // if (!checkHashPassword) {
    //   return next(new ErrorHandler("Invalid Email or password!!", 401));
    // }

    // generat token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return res
      .status(200)
      .cookie("Student_Token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })
      .json({
        success: true,
        message: `${student?.firstName} Login successfully`,
        user: student,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal sever error" || error,
      success: false,
      error: error.message,
    });
  }
};

// fetch all students
export const getStudents = async (req, res) => {
  const getStudent = await Student.find().sort({ className: 1 });
  if (!getStudent) {
    return res.status(400).json({
      success: false,
      message: "No student found",
    });
  }
  try {
    return res.status(200).json({
      success: true,
      message: "Student list fetched Successfully! ",
      getStudent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// edit student on the basis of id
export const editStudentData = async (req, res, next) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    phone,
    coordinator,
    villageName,
    talukka,
    district,
    className,
    school,
  } = req.body;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "No id provided",
      });
    }
    const student = await Student.findById(id);
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "No student found",
      });
    }

    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, genSalt);

    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;
    if (password) student.password = hashPassword;
    if (phone) student.phone = phone;
    if (coordinator) student.coordinator = coordinator;
    if (villageName) student.villageName = villageName;
    if (talukka) student.talukka = talukka;
    if (district) student.district = district;
    if (className) student.className = className;
    if (school) student.school = school;

    await student.save({
      validateBeforeSave: true,
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Student data updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// delete single student
export const deleteStudent = async (req, res, next) => {
  const { id } = req.params;
  const deleteStudent = await Student.findByIdAndDelete(id);
  if (!deleteStudent) {
    return res.status(400).json({
      success: false,
      message: "No student found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    deleteStudent,
  });
};

// get student data on the basis of id
export const getStudentById = async (req, res, next) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid student id", 400));
  }

  const getStudent = await Student.findById(id);
  if (!getStudent) {
    return res.status(400).json({
      status: false,
      message: "No student found",
      getStudent,
    });
  }

  res.status(200).json({
    success: true,
    message: "Student fetched successfully",
    getStudent,
  });
};

// fetch me when login will fetch me
export const fetchStudent = catchAsyncError(async (req, res, next) => {
  try {
    const studentProfile = await Student.findById(req.user?._id);

    if (!studentProfile) {
      return next(new ErrorHandler("Unauthorized Student", 501));
    }
    res.status(200).json({
      success: true,
      message: `Welcome ${req.user?.firstName} to Dnyanankur Prakashan`,
      user: studentProfile,
    });
  } catch (error) {
    console.error("student fetch me error", error);
    res.status(500).json({
      success: true,
      message: `Something went wrong`,
      error : error.message
    });
  }
});
