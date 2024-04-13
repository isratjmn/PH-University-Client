import { TMeta } from ".";
import {
	TAcademicDepartment,
	TAcademicFaculty,
	TAcademicSemester,
} from "./academicManagement.type";

export interface TStudent {
	_id: string;
	id: string;
	user: TUser;
	name: TName;
	gender: string;
	dateOfBirth: string;
	email: string;
	contactNo: string;
	emergencyContactNo: string;
	bloodGroup: string;
	presentAddress: string;
	permanentAddress: string;
	guardian: TGuardian;
	localGuardian: LocalGuardian;
	profileImg: string;
	isDeleted: boolean;
	admissionSemester: TAcademicSemester;
	academicDepartment: TAcademicDepartment;
	academicFaculty: TAcademicFaculty;
	fullName: string;
	meta?: TMeta;
}

export type TUser = {
	_id: string;
	id: string;
	email: string;
	needsPasswordChange: boolean;
	role: string;
	status: string;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export type TName = {
	firstName: string;
	middleName: string;
	lastName: string;
	_id: string;
};

export type TGuardian = {
	fatherName: string;
	fathersOccupation: string;
	fatherContact: string;
	motherName: string;
	mothersOccupation: string;
	motherContact: string;
	_id: string;
};

export type LocalGuardian = {
	name: string;
	occupation: string;
	contactNo: string;
	address: string;
	_id: string;
};

export type TFaculty = {
	_id: string;
	id: string;
	user: string;
	name: TUser;
	designation: string;
	gender: string;
	dateOfBirth: string;
	email: string;
	contactNo: string;
	emergencyContactNo: string;
	bloogGroup: string;
	presentAddress: string;
	permanentAddress: string;
	profileImg: string;
	academicDepartment: TAcademicDepartment;
	academicFaculty: TAcademicFaculty;
	isDeleted: boolean;
	fullName: string;
};

export type TAdmin = {
	_id: string;
	id: string;
	user: TUser;
	designation: string;
	name: TName;
	gender: string;
	dateOfBirth: string;
	email: string;
	contactNo: string;
	emergencyContactNo: string;
	bloogGroup: string;
	presentAddress: string;
	permanentAddress: string;
	profileImg: string;
	isDeleted: boolean;
	fullName: string;
};

export type RTFaculty = {
	_id: string;
	id: string;
	user: string;
	name: TName;
	designation: string;
	gender: string;
	dateOfBirth: string;
	email: string;
	contactNo: string;
	emergencyContactNo: string;
	bloogGroup: string;
	presentAddress: string;
	permanentAddress: string;
	profileImg: string;
	academicDepartment: TAcademicDepartment;
	academicFaculty: TAcademicFaculty;
	isDeleted: boolean;
	fullName: string;
};
