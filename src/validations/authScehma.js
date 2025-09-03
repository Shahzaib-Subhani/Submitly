import z from "zod";

// Evaluator Login Validation Schema
export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Evaluator Registration Schema
export const EvaluatorRegistrationSchema = z.object({
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


// Team Registration Schema
export const TeamRegistrationSchema = z.object({
    teamName: z.string().min(1, "Team Name is required"),
    leaderName: z.string().min(1, "Leader Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
