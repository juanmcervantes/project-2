const { validationResult } = require("express-validator");
const express = require("express")

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next(); //means continua hacia el controlador
  } catch (err) {
    console.log(err)
    res.status(403)
    res.send({ errors: err.array() });
  }
};

module.exports = {validateResults};
