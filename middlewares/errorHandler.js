const errorHandler = (err, req, res, next) => {
  if (err.name === "errorAuth") {
    res.status(401).json({ message: "Wrong email or password" });
  } else if (err.name === "Unauthenticated") {
    res.status(401).json({ message: "User Unauthenticated" });
  } else if (err.name === "Unauthorize") {
    res.status(401).json({ message: "You're not admin" });
  } else if (err.name === "jwtError") {
    res.status(400).json({ message: "JWT Error" });
  } else if (err.name === "errors") {
    res.status(400).json({ message: err });
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
  console.log({
    message: err.message,
  });
};

module.exports = errorHandler;
