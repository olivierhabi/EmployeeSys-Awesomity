import Joi from "joi";
import "@babel/polyfill";

const validateUser = {
  async validate(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required(),
      naId: Joi.string()
        .trim()
        .min(3)
        .max(16)
        .required(),
      phone: Joi.string()
        .trim()
        .min(3)
        .max(10)
        .required(),
      email: Joi.string()
        .trim()
        .min(3)
        .max(255)
        .required()
        .email(),
      dBirth: Joi.string()
        .trim()
        .min(3)
        .max(16)
        .required(),
      password: Joi.string()
        .trim()
        .min(6)
        .max(255)
        .required(),
      status: Joi.string()
        .trim()
        .min(3)
        .max(255)
        .required()
    });
    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res
        .status(404)
        .send({ status: 404, message: error.details[0].message });
    }
    next();
  }
};

export default validateUser;
