import { catchAsyncError } from "../middleware.js/catchAsyncError.js";
import { Admin } from "../Model/AdminModel.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middleware.js/error.js";
import { School } from "../Model/SchoolModel.js";
import { Student } from "../Model/StudentModel.js"
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const AdminRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if ((!email, !name, !password)) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }
    // check if email already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // create new user
    const newAdmin = await Admin.create({
      name,
      email,
      password,
      role: "Admin",
    });

    const token = jwt.sign({ id: newAdmin }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return res.status(200).json({
      success: true,
      message: "Admin registered successfully",
      newAdmin,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again!",
      error: error.message, // Send error message for debugging
    });
  }
};

export const AdminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Find admin by email
    const admin = await Admin.aggregate([
      { $match: { email } }
    ]);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    if (password !== admin.password) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access to admin!",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return res
      .status(200)
      .cookie("Admin_Token", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: admin,
        token,
      });
  } catch (error) {
    console.error("Error during admin login:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again!",
    });
  }
};


// import pdf or imp file to school on the basis of school id 
export const uploadFileToSchool = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { documentName } = req.body;

  // Validate input
  if (!documentName || documentName.trim() === "") {
    return next(new ErrorHandler("Document name is required", 400));
  }

  if (!req.files || !req.files.document) {
    return next(new ErrorHandler("No file uploaded", 400));
  }

  const { document } = req.files;

  // Allowed file types
  const allowedMimeTypes = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "image/jpeg": "jpg",
    "image/png": "png",
  };


  if (!allowedMimeTypes[document.mimetype]) {
    return next(new ErrorHandler("Invalid document type. Only PDF, DOC, DOCX, XLS, and XLSX are allowed.", 400));
  }

  // Fetch school details
  const school = await School.findById(id);
  if (!school) {
    return next(new ErrorHandler("School not found", 404));
  }

  try {
    // Get file extension from MIME type
    const fileExtension = allowedMimeTypes[document.mimetype];
    const finalFileName = `${documentName}.${fileExtension}`;

    // Determine resource type (image vs. raw document)
    const resourceType = document.mimetype.startsWith("image/") ? "image" : "raw";

    const cloudinaryResponse = await cloudinary.uploader.upload(document.tempFilePath, {
      folder: "sontke",
      resource_type: resourceType,
      format: fileExtension,
      public_id: finalFileName,
      use_filename: true,
      unique_filename: false,
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(new ErrorHandler("Failed to upload document to Cloudinary", 500));
    }

    school.documents.push({
      documentName,
      publicId: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    });

    await school.save();

    res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
      documents: school.documents,
    });

  } catch (error) {
    console.error("Cloudinary error:", error);
    return next(new ErrorHandler("Failed to upload document", 500));
  }
});


// upload file to student
export const uploadFileToStudent = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { documentName } = req.body;

  if (!documentName || documentName.trim() === "") {
    return next(new ErrorHandler("Document name is required", 400));
  }

  if (!req.files || !req.files.document) {
    return next(new ErrorHandler("No file uploaded", 400));
  }

  const document = req.files.document;

  // Allowed file types
  const allowedMimeTypes = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "image/jpeg": "jpg",
    "image/png": "png",
  };


  if (!allowedMimeTypes[document.mimetype]) {
    return next(new ErrorHandler("Invalid document type. Only PDF, DOC, DOCX, XLS, and XLSX are allowed.", 400));
  }

  // Fetch school details
  const student = await Student.findById(id);
  if (!student) {
    return next(new ErrorHandler("Student not found", 404));
  }

  try {
    // Get file extension from MIME type
    const fileExtension = allowedMimeTypes[document.mimetype];
    const finalFileName = `${documentName}.${fileExtension}`;

    // Determine resource type (image vs. raw document)
    const resourceType = document.mimetype.startsWith("image/") ? "image" : "raw";

    const cloudinaryResponse = await cloudinary.uploader.upload(document.tempFilePath, {
      folder: "sontke",
      resource_type: resourceType,
      format: fileExtension,
      public_id: finalFileName,
      use_filename: true,
      unique_filename: false,
    });

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(new ErrorHandler("Failed to upload document to Cloudinary", 500));
    }

    student.documents.push({
      documentName,
      publicId: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    });

    await student.save();

    res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
      documents: student.documents,
    });

  } catch (error) {
    console.error("Cloudinary error:", error);
    return next(new ErrorHandler("Failed to upload document", 500));
  }
});


// generate certificate for student

// export const generateCertificate = catchAsyncError(async (req, res, next) => {
//   try {
//     // get that student by id
//     const { id } = req.params

//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//       return next(new ErrorHandler("Invalid student id", 400))
//     }
//     const student = await Student.findById(id);

//     if(!student)
//   } catch (error) {

//   }
// })




// fetch me ;
export const fetchAdmin = catchAsyncError(async (req, res, next) => {
  try {
    const user = await Admin.findById(req.user?._id);
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }
    return res.status(200).json({
      success: true,
      message: `${req.user?.name} Welcome`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
})


// logout for school admin and coordinator
export const Logout = catchAsyncError(async (req, res, next) => {
  try {
    res.status(200).cookie('School_Token', "", {
      expires: new Date(0),
      httpOnly: true
    }).cookie("Admin_Token", "", {
      expires: new Date(0),
      httpOnly: true
    }).cookie("Coordinator_Token", "", {
      expires: new Date(0),
      httpOnly: true
    }).cookie('Student_Token', " ", {
      expires: new Date(0),
      httpOnly: true
    }).json({
      success: true,
      message: 'Logout successfully.'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving messages",
      error: error.message,
    });
  }
})