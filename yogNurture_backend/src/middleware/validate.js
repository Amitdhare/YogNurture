module.exports.requireFields = (fields) => (req, res, next) => {
  for (let f of fields) {
    if (!req.body[f]) {
      return res.status(400).json({ message: `Missing field: ${f}` });
    }
  }
  next();
};
