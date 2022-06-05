const { rating } = require("../../models");

exports.getRating = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await rating.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(201).send({
      status: "success",
      rating: data,
    });
  } catch (error) {
    res.status(401).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateRating = async (req,res) => {
  try {
      const {id} = req.params
      await rating.update(req.body, {
        //update set values where
        where: {
          id,
        },
      });

      const data = await rating.findAll({
        // select ... where ...
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"], // pengecualian 3 item tdk dtampilkan
        },
      });
      res.status(201).send({
        status: "success",
        rating: data,
      });
  } catch (error) {
    res.status(401).send({
        status: "failed",
        message: "Server Error",
      });
  }
}
