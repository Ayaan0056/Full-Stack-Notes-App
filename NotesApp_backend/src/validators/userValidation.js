import zod from 'zod';

export const userValidationSchema = zod.object({
    body : zod.object({
        userName : zod.string().trim().min(1, "Username must be atleast 1 character"),
        email : zod.string().trim().email(),
        password: zod
        .string()
        .trim()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
          message:
            "Password must include 1 uppercase, 1 lowercase, 1 digit, and 1 special character.",
        }),
    })
})