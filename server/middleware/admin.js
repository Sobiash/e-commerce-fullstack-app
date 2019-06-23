let admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.send("You are not admin so you are not allowed to do so.");
  }
  next();
};

module.exports = { admin };
