import z from "zod";

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
export const setDeadlineSchema = z.object({
    date: z.string()
    .min(1, "Date is required")
    .regex(/^\d{2}-\d{2}-\d{4}$/, "Invalid date format (dd-mm-yyyy)"),
});