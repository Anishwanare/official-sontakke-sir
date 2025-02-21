import { Student } from "../Model/StudentModel.js";
import { Admin } from "../Model/AdminModel.js"
import { Coordinator } from "../Model/CoordinatorModel.js"
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js ";
import jwt from "jsonwebtoken"
import { School } from "../Model/SchoolModel.js";

export const isStudentAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.Student_Token || req.cookies.Admin_Token || req.cookies.School_Token;

    if (!token) {
        return next(new ErrorHandler("Student is not Authenticated", 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await Student.findById(decoded.id)
        // console.log(req.user)
        next()
    } catch (error) {
        return next(new ErrorHandler("Token Invalid or expires", 401))
    }
})
export const isSchoolAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.School_Token;

    if (!token) {
        return next(new ErrorHandler("School is not Authenticated", 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await School.findById(decoded.id)
        // console.log(req.user)
        next()
    } catch (error) {
        return next(new ErrorHandler("Token Invalid or expires", 401))
    }
})
export const isAdminAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.Admin_Token;
    if (!token) {
        return next(new ErrorHandler("Admin is not Authenticated", 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await Admin.findById(decoded.id)
        console.log(req.user)
        next()
    } catch (error) {
        return next(new ErrorHandler("Token Invalid or expires", 401))
    }
})
export const isCoordinatorAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.Student_Token || req.cookies.Admin_Token || req.cookies.School_Token;

    if (!token) {
        return next(new ErrorHandler("user is not Authenticated", 401))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = await Coordinator.findById(decoded.id)
        // console.log(req.user)
        next()
    } catch (error) {
        return next(new ErrorHandler("Token Invalid or expires", 401))
    }
})


export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user?.role)) {
                return next(new ErrorHandler("user is not Authorized ", 401))
            }
            next()
        } catch (error) {
            return next(new ErrorHandler(error.message || "Internal Server Error", 500))
        }
    }
}