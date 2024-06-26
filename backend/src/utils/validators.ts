import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations)  {
            const result = await validation.run(req);
            if (!result.isEmpty) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    }
}

export const loginValidator = [ 
    body("email").trim().notEmpty().withMessage("Email is Required"),
    body('password').trim().notEmpty().isLength({min:6}).withMessage("Password should contain atleast 6 characters")
]

export const signupValidator = [
    body("name").trim().notEmpty().withMessage("Name is Required"),
    ...loginValidator,
] 

export const chatValidator = [
    body("message").trim().notEmpty().withMessage("Message is Required"), 
] 