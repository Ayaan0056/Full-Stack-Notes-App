import * as yup from "yup"

const userValidationSchema = yup.object({
    userName: yup.string().trim().min(1, "User name is required"),

    email: yup
        .string()
        .email("The email is not a valid one")
        .required("Email is required"),
        
    password: yup
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters long.")
})

export default userValidationSchema;