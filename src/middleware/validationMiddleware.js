const Joi = require("joi");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
};

const schemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  updateUser: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
  }),

  createProduct: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).default(0),
    category: Joi.string(),
  }),

  updateProduct: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().positive(),
    stock: Joi.number().integer().min(0),
    category: Joi.string(),
  }),

  createOrder: Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.number().integer().required(),
          quantity: Joi.number().integer().positive().required(),
        })
      )
      .min(1)
      .required(),
  }),
};

module.exports = {
  validate,
  schemas,
};
