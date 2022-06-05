const { user, profile } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userReg = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        status: "error required",
        message: error.details[0].message,
      },
    });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userExist) {
      return res.status(400).send({
        status: "failed already",
        message: "user already exist",
      });
    }
    //create = insert into
    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      status: 'customer'
    });

    const { id } = newUser; // create new profile
    await profile.create({
      image:'avatar.png',
      phone:'',
      gender:'',
      address:'',
      idUser: id,
    });

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);

    res.status(201).send({
      status: "success",
      data: {
        user: {
          id,
          name: req.body.name,
          email: req.body.email,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed server",
      message: "Server Error",
    });
  }
};

exports.userLog = async (req, res) => {
  //filter inputan sesuai dengan syarat input
  const schema = Joi.object({
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(6).required(),
  });

  //export data error
  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    //jika email tidak ditemukan
    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "Email tidak ditemukan",
      });
    }

    //output nilai boolean hasil dari compare req.body dan database
    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    //compare
    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "password tidak sesuai",
      });
    }
    const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
        name: userExist.name,
        email: userExist.email,
        status: userExist.status,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
          status: dataUser.status,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};