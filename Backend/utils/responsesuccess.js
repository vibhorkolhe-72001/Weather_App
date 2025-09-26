export function responseSuccess(data, req, res) {
  res.status(200).json({ success: true, data });
}

export default responseSuccess;
