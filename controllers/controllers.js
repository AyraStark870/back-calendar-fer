const { request, response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "existe un usuario con ese correo",
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    const { _id, name } = user;
    const token = await generateJWT(_id, name);

    await user.save();

    res.status(201).json({
      token,
      ok: true,
      uid: _id,
      name: user.name,
      password: user.password,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        //bad request
        ok: false,
        msg: "no existe un usuario con ese correo",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "password incorrecto",
      });
    }

    const { _id, name } = user;
    const token = await generateJWT(_id, name);

    res.status(201).json({
      token,
      ok: true,
      uid: user._id,
      name: user.name,
    });
  } catch (error) {
    if (user) {
      return res.status(500).json({
        ok: false,
        msg: "hable con el administrador",
      });
    }
  }
};

const revalidateUser = async (req, res = response) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);

  res.json({
    token,
    ok: true,
    msg: "revalidate",
    uid,
    name,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateUser,
};
