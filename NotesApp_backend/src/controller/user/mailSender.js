import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

export const mailSender = async ({ email, subject, template, context }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PW,
        },
    });

    const hbsOptions = {
        viewEngine: {
            extname: ".hbs",
            layoutsDir: path.resolve("./src/templates"), 
            defaultLayout: false,
            partialsDir: path.resolve("./src/templates"), 
        },
        viewPath: path.resolve("./src/templates"),
        extName: ".hbs",
    };

    transporter.use("compile", hbs(hbsOptions));

    const mailConfiguration = {
        from: "ayaan@itobuz.com",
        to: email,
        subject,
        template,
        context,
    };

    try {
        await transporter.sendMail(mailConfiguration);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error(error.message); // Rethrow the error for handling in the calling function
    }
};