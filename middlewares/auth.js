const pool = require("../config");
const jwt = require("jsonwebtoken");
const jwtsecret = "hehe";

function authentication(req, res, next) {
  const { token } = req.headers;

  if (token) {
    try {
      const decoded = jwt.verify(token, jwtsecret);
      const { id } = decoded;

      pool.query(`SELECT * FROM users WHERE id = $1;`, [id], (err, result) => {
        if (err) next(err);

        if (result.rows[0].length === 0) {
          next({ name: "errors" });
        } else {
          const user = result.rows[0];

          req.loggedUser = {
            id: user.id,
            email: user.email,
            gender: user.gender,
            role: user.role,
          };
          next();
        }
      });
    } catch (error) {
      next({ name: "jwtError" });
    }
  } else {
    next({ name: "Unauthenticated" });
  }
}

function authorization(req, res, next) {
  console.log("authorization");
  const { token } = req.headers;

  if (token) {
    try {
      const decoded = jwt.verify(token, jwtsecret);
      const { role } = decoded;

      pool.query(
        `SELECT * FROM users WHERE role = $1;`,
        [role],
        (err, result) => {
          if (err) next(err);

          if (result.rows[0].length === 0) {
            next({ name: "errors" });
          } else {
            const user = result.rows[0];

            if (user.role === "admin") {
              req.loggedUser = {
                id: user.id,
                email: user.email,
                gender: user.gender,
                role: user.role,
              };
              next();
            } else {
              next({ name: "Unauthorize" });
            }
          }
        }
      );
    } catch (error) {
      next({ name: "jwtError" });
    }
  } else {
    next({ name: "Unauthenticated" });
  }
}

module.exports = { authentication, authorization };
