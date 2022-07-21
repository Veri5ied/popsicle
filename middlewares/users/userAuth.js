const express = require("express");
const db = require("../../models");

const User = db.users;

const saveUser = async (req, res, next) => {
  try {
    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailCheck) {
      return res.status(400).json({
        message: "Email already exists",
      });
    } else {
      const user = await User.create(req.body);
      res.status(201).json({ data: user });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveUser,
};
