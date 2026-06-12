import { AppError } from "../utils/errors.js";

export function validate(schema, source = "body") {
  return (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(new AppError("Validation failed", 422, result.error.flatten()));
    }
    req[source] = result.data;
    return next();
  };
}
