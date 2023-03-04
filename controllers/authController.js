const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const pool = require("../config");

const saltRounds = 10;

const registerUser = (req, res, next) => {
  const { id, email, gender, password, role } = req.body;

  const hashPassword = bcrypt.hashSync(password, saltRounds);

  pool.query(
    `INSERT INTO users(id, email, gender, password, role)
        VALUES($1, $2, $3, $4, $5);`,
    [+id, email, gender, hashPassword, role],
    (err, result) => {
      if (err) next(err);

      res.status(201).json({ message: "User registered" });
    }
  );
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  pool.query(
    `SELECT users.* FROM users WHERE email = $1;`,
    [email],
    (err, result) => {
      if (err) next(err);

      if (result.rows.length === 0) {
        next({ name: "errorAuth" });
      } else {
        const { id, email, gender, role } = result.rows[0];
        const hash = result.rows[0].password;
        const isMatch = bcrypt.compareSync(password, hash);

        if (isMatch) {
          res.status(200).json({
            id,
            email,
            gender,
            role,
            token: generateToken({ id, email, gender, role }),
          });
        } else {
          next({ name: "errorAuth" });
        }
      }
    }
  );
};

module.exports = { registerUser, loginUser };
