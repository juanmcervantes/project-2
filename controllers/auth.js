const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const path = require("path");


/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req
 * @param {*} res
 */
const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const passwordHash = await encrypt(req.password);
    const body = { ...req, password: passwordHash };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

/**
 * Este controlador es el encargado de loggear a una personas
 * @param {*} req
 * @param {*} res
 */

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req); //curar la data
    const user = await usersModel.findOne({
      where: {
        email: req.email,
      },
    });
    if (!user) {
      handleHttpError(res, "USER_NOT_EXIST", 401);
      return;
    } // else {

    // }
    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword);
    if (!check) {
      console.error();
      handleHttpError(res, "PASSWORD_INVALID", 402);
      return;
    }

    user.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send({ status: "ok", message: "Usuario loggeado", redirect: "/notes" });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerCtrl, loginCtrl };
