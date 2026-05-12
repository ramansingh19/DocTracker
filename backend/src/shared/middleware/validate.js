function validate(schema) {
  return (req, _res, next) => {
    try {
      req.validatedBody = schema.parse(req.body);
      next();
    } catch (error) {
      if (error.name === "ZodError") {
        return next({
          status: 400,
          message: "Validation failed",
          details: error.issues,
        });
      }

      return next(error);
    }
  };
}

export default validate;