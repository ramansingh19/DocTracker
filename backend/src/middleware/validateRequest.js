import ApiError from '../utils/ApiError.js';

export const validateRequest = (schema) => async (req, _res, next) => {
  try {
    const value = await schema.validateAsync(
      { body: req.body, params: req.params, query: req.query },
      { abortEarly: false, allowUnknown: true }
    );

    req.body = value.body;
    req.params = value.params;
    req.query = value.query;
    next();
  } catch (error) {
    next(ApiError.badRequest('Validation failed', error.details));
  }
};

