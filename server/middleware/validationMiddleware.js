const { body, validationResult } = require("express-validator");

//Validation rules

const validateTask = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").isLength({min : 5}).withMessage("Description must be atleast 5 characters."),
    body("status").isIn(["pending","in-progress","completed"]).withMessage("Invalid status"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).join({errors: errors.array() });
        }
        next();
    }

];

module.exports = {validateTask};