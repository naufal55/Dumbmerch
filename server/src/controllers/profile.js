const { profile, user } = require("../../models");

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await profile.findOne({
      // select ... where ...
      where: {
        //idUser in database same with id params
        idUser: id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["id","password", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: data ? process.env.FILE_PATH + data.image : null,
    };

    res.status(201).send({
      status: "success",
      profile: data,

    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await profile.update(req.body, {
      //update set values where
      where: {
        idUser: id,
      },
    });
    const data = await profile.findOne({
      // select ... where ...
      where: {
        //idUser in database same with id params
        idUser: id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["id", "password", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"], // pengecualian 3 item tdk dtampilkan
      },
    });
    res.status(201).send({
      status: "success",
      data: {
        profile: data,
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
