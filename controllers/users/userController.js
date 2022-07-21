const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models");

const User = db.users;

const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(data);

    if (user) {
      let token = jwt.sign(
        { id: user.id },
        wbeudhewojdmewipoj8dhehewnhdvhwendehdbhbnq,
        {
          expiresIn: "72h",
        }
      );
      res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 * 72 });
      console.log("user", JSON.stringify(user, null, 2));
      console.log("token", token);
      return res.status(201).send({
        message: "User created successfully",
        user: user,
        token: token,
      });
    } else {
      return res.status(400).send({
        message: "User not created",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error",
    });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        let token = jwt.sign(
          { id: user.id },
          wbeudhewojdmewipoj8dhehewnhdvhwendehdbhbnq,
          {
            expiresIn: "72h",
          }
        );
        res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 * 72 });
        return res.status(200).send({
          message: "User logged in successfully",
          user: user,
          token: token,
        });
      } else {
        return res.status(400).send({
          message: "Invalid credentials",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal server error",
    });
  }
};

module.exports = {
  signUp,
  login,
};
