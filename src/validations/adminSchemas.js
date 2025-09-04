import z from "zod";

// Edit User Validation Schema
export const EditUserSchema = z.object({
    teamName: z.string().min(1, "Team Name is required"),
    leaderName: z.string().min(1, "Leader Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Edit Evaluator Validation Schema
export const EditEvaluatorSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    qualification: z.string().min(1, "Qualification is required"),
    experience: z.string().min(1, "Experience is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Set Deadline Validation Schema

export const setDeadlineSchema = z.object({
    date: z.string()
        .min(1, "Date is required")
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Invalid date format (dd-mm-yyyy)"),
});


// Set Deadline Validation Schema

export const EditMemberSchema = z.object({
    memberName: z.string().min(1, "Name is required"),
    memberEmail: z.string().min(1, "Invalid email address"),
    memberRole: z.string().min(1, "Role is required"),
});


// Content Submission Validation Schema

export const ContentSubmissionSchema = z.object({
    topic: z.string().nonempty({ message: "Topic is required" }),
    videoURL: z.string().nonempty({ message: "Video URL is required" }).url({ message: "Invalid URL" }),
    description: z.string().nonempty({ message: "Description is required" }),
    learningOutcomes: z.string().nonempty({ message: "Learning Outcomes are required" }),
});


// Assign Evaluator Validation Schema

export const AssignEvaluatorSchema = z.object({
    evaluator1: z.string().min(1, "Evaluator no. 1 is required"),
    evaluator2: z.string().min(1, "Evaluator no. 2 is required"),
    evaluator3: z.string().min(1, "Evaluator no. 3 is required"),
});

//  Evaluate Submission Validation Schema

const numberField = (max) =>
    z.preprocess((val) => {
        if (val === "") return -1;
        const num = Number(val);
        return isNaN(num) ? val : num;
    },
        z.number({
            invalid_type_error: `must be a number`,
            required_error: `is required`,
        })
            .int({ message: `must be an integer` })
            .min(0, { message: `this field cannot be less than 0` })
            .max(max, { message: `this field cannot exceed ${max}` })
    );
export const EvaluateSubmissionSchema = z.object({
    relevanceToObjectives: numberField(5),
    innovationCreativity: numberField(15),
    clarityAccessibility: numberField(10),
    depth: numberField(5),
    interactivityEngagement: numberField(25),
    useOfTechnology: numberField(5),
    scalabilityAdaptability: numberField(10),
    ethicalStandards: numberField(5),
    practicalApplication: numberField(10),
    videoQuality: numberField(10),
    feedback: z.string().min(1, "feedback is required"),
});


// Edit Profile Validation Schema
export const UpdateProfileSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});