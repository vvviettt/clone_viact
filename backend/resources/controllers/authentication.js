import Joi from "joi";
import bcrypt from "bcrypt";
import pool from "../model/connection.js";
import Chance from "chance";
import jwt from "jsonwebtoken";
import mailer from "../mail/index.js";
import "dotenv/config";

//Joi validate
const schemas = {
  register: Joi.object().keys({
    first_name: Joi.string().min(1).required(),
    last_name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    username: Joi.string()
      .pattern(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/)
      .required(),
    phone: Joi.string()
      .pattern(/((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/)
      .required(),
    password: Joi.string().min(6).required(),
  }),
  login: Joi.object().keys({
    key: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),
  forgotPassword: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
  changePassword: Joi.object().keys({
    code: Joi.string().length(5).required(),
    new_password: Joi.string().min(6).required(),
    token: Joi.string().required(),
  }),
};

//Controller
const authController = {
  //Login handle
  login: async (req, res) => {
    const validate = schemas.login.validate(req.body);
    if (validate.error) {
      return res.status(500).json({ error: true, message: "Invalid data" });
    }
    const { key, password } = validate.value;
    pool.getConnection(function (err, connection) {
      connection.query(
        `SELECT first_name , last_name , email, password FROM user WHERE username="${key}" OR email="${key}"`,
        async (error, results, fields) => {
          connection.release();
          if (error) {
            return res
              .status(401)
              .json({ error: true, message: "Email or password incorrect" });
          }
          if (results.length == 0) {
            return res.status(401).json({
              error: true,
              message: "Account does not exist",
            });
          }
          const hash = results[0].password;
          const checkPassword = await bcrypt.compare(password, hash);
          if (!checkPassword) {
            return res.status(401).json({
              error: true,
              message: "Password incorrect",
            });
          }
          const token = jwt.sign(
            { email: results[0].email },
            process.env.SECRET_KEY,
            {
              expiresIn: "30d",
            }
          );
          return res.status(200).json({
            success: true,
            name: results[0].first_name + " " + results[0].last_name,
            email: results[0].email,
            token: token,
          });
        }
      );
    });
  },

  // register handle
  register: (req, res) => {
    const validate = schemas.register.validate(req.body);
    if (validate.error) {
      return res.status(400).json({ error: { message: "Invalid data" } });
    }
    const { first_name, last_name, email, username, phone, password } =
      validate.value;

    const hashpassword = bcrypt.hashSync(password, 10);

    pool.getConnection(function (err, connection) {
      // not connected!
      if (err) {
      }
      connection.query(
        `INSERT INTO USER(first_name , last_name , email ,username,phone,  password) VALUES ("${first_name}", "${last_name}", "${email}", "${username}"," ${phone}","${hashpassword}")`,
        (error, results, fields) => {
          connection.release();

          if (error) {
            if (error.code === "ER_DUP_ENTRY") {
              return res.status(401).json({
                error: true,
                type: "EXIST_ERR",
                message: "Email , username or phone is already exists",
              });
            }
            return res.status(500).json({
              error: true,
              type: "UNKNOWN_ERR",
              message: "Unknown error  ",
            });
          }

          return res.status(200).json({ success: true });
        }
      );
    });
  },

  //Forgot Password
  forgotPassword: (req, res) => {
    const validate = schemas.forgotPassword.validate(req.body);
    if (validate.error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      return res.status(401).json({ error: { message: "Invalid data" } });
    }

    const { email } = validate.value;

    pool.getConnection(function (err, connection) {
      // not connected!
      if (err) {
      }
      connection.query(
        `select * from user where email ="${email}"`,
        (error, results, fields) => {
          if (error) {
            return res
              .status(401)
              .json({ error: true, message: "Email or password incorrect" });
          }

          if (results.length == 0) {
            return res.status(401).json({
              error: true,
              message: "Account does not exist",
            });
          }
          const chance = new Chance();
          const code = chance.natural({ min: 11111, max: 99999 });
          mailer.send("Forgot password code", `My code : ${code}`, email);
          const token = jwt.sign({ email: email }, code + "", {
            expiresIn: "120s",
          });
          return res.status(200).json({ success: true, token: token });
        }
      );
    });
  },
  changePassword: (req, res) => {
    const validate = schemas.changePassword.validate(req.body);
    if (validate.error) {
      console.log(validate.error);
      return res.status(500).json({ error: true, message: "Invalid data" });
    }
    const { token, code, new_password } = validate.value;
    // console.log(code, token);

    jwt.verify(token, code, function (err, decoded) {
      console.log(decoded);
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Change password failed! Please try again",
        });
      }
      const hashpassword = bcrypt.hashSync(new_password, 10);
      pool.getConnection(function (err, connection) {
        // not connected!
        if (err) {
        }
        connection.query(
          `update user set password="${hashpassword}" where email ="${decoded.email}"`,
          (error, results, fields) => {
            if (error) {
              return res
                .status(401)
                .json({ error: true, message: "Email or password incorrect" });
            }
            return res.status(200).json({ success: true });
          }
        );
      });
    });
  },
};

export default authController;
