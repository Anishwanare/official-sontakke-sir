import jwt from "jsonwebtoken";
import { catchAsyncError } from "../middleware.js/catchAsyncError.js";
import ErrorHandler from "../middleware.js/error.js";
import { School } from "../Model/SchoolModel.js";
import { Student } from "../Model/StudentModel.js";

// School registration function
export const schoolRegistration = async (req, res, next) => {
  try {
    const {
      name,
      schoolId,
      password,
      schoolVillage,
      talukka,
      district,
      coordinator,
      headMasterName,
      headMasterMobile
    } = req.body;

    if (
      !name || !password || !schoolId || !schoolVillage ||
      !talukka || !district || !coordinator ||
      !headMasterName || !headMasterMobile
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingSchool = await School.findOne({ schoolId });
    if (existingSchool) {
      return res.status(400).json({
        success: false,
        message: "School ID already exists",
      });
    }

    const newSchool = await School.create({
      name,
      schoolId,
      password,
      schoolVillage,
      talukka,
      district,
      coordinator,
      headMasterName,
      headMasterMobile
    });

    return res.status(201).json({
      success: true,
      message: "School registered successfully",
      school: newSchool,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register school",
      error: error.message,
    });
  }
};

// School login function
export const schoolLogin = catchAsyncError(async (req, res, next) => {
  try {
    const { schoolId } = req.body;

    if (!schoolId) {
      return res.status(400).json({ success: false, message: "SchoolId is required" });
    }

    const schoolID = schoolId.toUpperCase();
    const fetchSchool = await School.findOne({ schoolId: schoolID });

    if (!fetchSchool) {
      return res.status(401).json({ success: false, message: "Unauthorized login" });
    }

    const token = jwt.sign({ id: fetchSchool._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.status(200).cookie('School_Token', token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true
    }).json({
      success: true,
      message: "School login successful",
      user: fetchSchool
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
});

// Get all schools function
export const getAllSchools = async (req, res, next) => {
  try {
    const allSchools = await School.find({});

    return res.status(200).json({
      success: true,
      message: "All schools fetched successfully",
      schools: allSchools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch schools",
      error: error.message,
    });
  }
};

// Delete school function
export const deleteSchool = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "School ID not provided" });
    }

    const schoolToDelete = await School.findById(id);
    if (!schoolToDelete) {
      return res.status(404).json({ success: false, message: "School not found" });
    }

    const studentsAssigned = await Student.find({ school: schoolToDelete.name });
    if (studentsAssigned.length > 0) {
      return res.status(400).json({
        success: false,
        message: "School has assigned students. Delete student records first.",
      });
    }

    await School.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "School deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete school",
      error: error.message,
    });
  }
};

// Edit school function
export const editSchool = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      schoolId,
      password,
      schoolVillage,
      talukka,
      district,
      coordinator,
      headMasterName,
      headMasterMobile,
    } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "School ID not found" });
    }

    const existingSchool = await School.findById(id);
    if (!existingSchool) {
      return res.status(404).json({ success: false, message: "School not found" });
    }

    const updatedSchool = await School.findByIdAndUpdate(
      id,
      {
        name,
        schoolId,
        password,
        schoolVillage,
        talukka,
        district,
        coordinator,
        headMasterName,
        headMasterMobile,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "School updated successfully",
      school: updatedSchool,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update school",
      error: error.message,
    });
  }
};

// Get school by ID
export const getSchoolById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getSchool = await School.findById(id);

    if (!getSchool) {
      return res.status(404).json({ success: false, message: "No school found" });
    }

    const studentsCount = await Student.aggregate([
      { $match: { school: getSchool.name } },
      { $count: "totalStudents" }
    ])

    res.status(200).json({
      success: true,
      message: "School fetched successfully",
      school: getSchool,
      studentCount: studentsCount.length > 0 ? studentsCount[0].totalStudents : 0,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch school",
      error: error.message,
    });
  }
};

// Fetch the me school
export const fetchSchool = catchAsyncError(async (req, res, next) => {
  try {
    const schoolProfile = await School.findById(req.user?._id);

    if (!schoolProfile) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: `Welcome ${req.user?.name}`,
      user: schoolProfile,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

