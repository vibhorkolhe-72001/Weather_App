export function errorHandler(err, req, res, status = 500) {
  const message =
    typeof err === "string" ? err : err?.message || "Something went wrong";
  res.status(status).json({ success: false, status, message });
}

export default errorHandler;
