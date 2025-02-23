import { Student } from "../Model/StudentModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import ErrorHandler from "../middleware.js/error.js";
import { catchAsyncError } from "../middleware.js/catchAsyncError.js";

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
    const salt = await bcrypt.genSalt(10);   // Generate salt
    const hashPassword = await bcrypt.hash(password, salt);  // Wait for hash to be completed

    // Create a new student
    const newStudent = await Student.create({
      firstName,
      middleName,
      lastName,
      password: hashPassword,  // Assign the resolved password hash
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
    return res.status(200)
      .cookie("Student_Token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
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


export const loginStudent = async (req, res, next) => {
  const { email, phone, password } = req.body

  if (!email || !phone || !password) {
    return res.status(400).json({
      message: "Please fill full form "
    })
  }

  try {
    const student = await Student.findOne({ email })

    if (!student) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false
      })
    }

    const checkHashPassword = bcrypt.compare(password, student.password)
    if (!checkHashPassword) {
      return next(new ErrorHandler("Invalid Email or password!!", 401))
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES
    })

    return res.status(200).cookies("Student_Token", token, { expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000), httpOnly: true }).json({
      success: true,
      message: "Student Login successfully",
      student,
      token
    });

  }
  catch (error) {
    return res.status(500).json({
      message: "Internal sever error" || error,
      success: false,
      error: error.message
    })

  }
}



export const getStudents = async (req, res) => {
  const getStudent = await Student.find().sort({ 'className': 1 });
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

export const editStudentData = async (req, res, next) => {
  const { id } = req.params
  const { firstName, lastName, password, phone, coordinator, villageName, talukka, district, className, school } = req.body

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "No id provided"
      })
    }
    const student = await Student.findById(id)
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "No student found"
      })
    }

    const genSalt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, genSalt)

    if (firstName) student.firstName = firstName
    if (lastName) student.lastName = lastName
    if (password) student.password = hashPassword
    if (phone) student.phone = phone
    if (coordinator) student.coordinator = coordinator
    if (villageName) student.villageName = villageName
    if (talukka) student.talukka = talukka
    if (district) student.district = district
    if (className) student.className = className
    if (school) student.school = school

    await student.save({ validateBeforeSave: true, runValidators: true, new: true })

    res.status(200).json({
      success: true,
      message: "Student data updated successfully",
      student
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })
  }
}

export const deleteStudent = async (req, res, next) => {
  const { id } = req.params
  const deleteStudent = await Student.findByIdAndDelete(id)
  if (!deleteStudent) {
    return res.status(400).json({
      success: false,
      message: "No student found"
    })
  }
  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    deleteStudent
  })
}

export const getStudentById = async (req, res, next) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid student id", 400))
  }

  const getStudent = await Student.findById(id)
  if (!getStudent) {
    return res.status(400).json({
      status: false,
      message: "No student found",
      getStudent
    })
  }

  res.status(200).json({
    success: true,
    message: "Student fetched successfully",
    getStudent
  })
}

// fetch me when login will fetch me
export const fetchStudent = catchAsyncError(async (req, res, next) => {
  try {
    const fetchMe = await Student.findById(req.student._id)

    if (!fetchMe) {
      return next(new ErrorHandler('Unauthorized Student', 501))
    }
    res.status(200).json({
      success: true,
      message: "fetched successfully",
      user: fetchMe
    })
  } catch (error) {
    console.error("student fetch me error", error)
    return next(new ErrorHandler(`Something went wrong ${error}`, 500))
  }
})