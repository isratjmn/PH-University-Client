import { z } from "zod";

export const academicSmesterSchema = z.object({
	name: z.string({
		required_error: "Plase select a Academic Name",
	}),
	year: z.string({
		required_error: "Plase select a Year",
	}),
	startMonth: z.string({
		required_error: "Plase select a Start Month",
	}),
	endMonth: z.string({
		required_error: "Plase select an End Month",
	}),
});

export const academicFacultySchema = z.object({
	name: z.string({
		required_error: "Please input a Faculty Name",
	}),
});

export const academicDepartmentSchema = z.object({
	name: z.string({
		required_error: "Please input a Department Name",
	}),
	academicFaculty: z.string({
		required_error: "Please select an Academic Faculty",
	}),
});
