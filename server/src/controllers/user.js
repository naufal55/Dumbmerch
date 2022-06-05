const { user } = require("../../models");

exports.userReg = async (req, res) => {
  try {
    await user.create(req.body); //create = insert into
    res.status(201).send({
      status: "success",
      data: {
        user: {
          name: req.body.name,
          email: req.body.email,

        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.userLog = async (req, res) => {

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "Email tidak ditemukan",
      });
    }

    if (userExist.password !== req.body.password) {
      return res.status(400).send({
        status: "failed",
        message: "Email & Password tidak sesuai",
      });
    }

    res.status(200).send({
      status: "success",
      data: {
        name: userExist.name,
        email: userExist.email,
        status: userExist.status
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
