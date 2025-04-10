import statusCode from "../config/statusCodes.js";

export const userValidation = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        next();
    } catch (err) {
        return res.status(statusCode.BAD_REQUEST).send(err.errors);
    }
};