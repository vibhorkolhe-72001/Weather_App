import errorHandler from "../utils/errorhandler.js";

const validateQuery = (schema) => (req, res, next) => {
  const queryData = schema.safeParse(req.query);
  if (!queryData.success) {
    return errorHandler(queryData.error.issues[0].message, req, res, 400);
  }
  req.validateQuery = queryData;
  next();
};

export default validateQuery;
