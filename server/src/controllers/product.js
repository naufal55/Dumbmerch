const { product, user } = require("../../models");

exports.getProducts = async (req, res) => {
  try {
    //gunakan let agar data bisa dirubah jgn menggunakan const
    let data = await product.findAll({
      // image: process.env.FILE_PATH + image,
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
      ...item,
      // memasukkan data namafile + dengan path filenya
      image: process.env.FILE_PATH + item.image,
      }
    }) 

    res.status(201).send({
      status: "success",
      products: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addProduct = async (req, res) => {
  try {


    let newProduct = await product.create({
      ...req.body,
      image: req.file.filename,
      idUser: req.user.id,
    });
    
    newProduct = JSON.parse(JSON.stringify(newProduct));

    newProduct = {
      //spread operator ...
      ...newProduct,
      // memasukkan data namafile + dengan path filenya
      image: process.env.FILE_PATH + newProduct.image,
    };
    const {id, image,title,desc,price,qty,idUser} = newProduct;
    
    res.status(201).send({
      status: "success",
      data: {
        product : {id,image,title,desc,price,qty,idUser},
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
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    //gunakan let agar data bisa dirubah jgn menggunakan const
    let data = await product.findOne({
      // select ... where ...
      where: {
        id,
      },
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"], // pengecualian 3 item tdk dtampilkan
      },
    });
    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      // memasukkan data namafile + dengan path filenya
      image: process.env.FILE_PATH + data.image,
    }

    res.status(201).send({
      status: "success",
      products : data
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const dataproduct = {
      //optional chaining untuk menampilkan data yg undfined jika tidak data tdk diupdate
      title: req?.body?.title,
      desc: req?.body.desc,
      price: req?.body?.price,
      image: req?.file?.filename,
      qty: req?.body?.qty,
      idUser: req?.user?.id,
    }

    await product.update(dataproduct,{
      //update set values where
      where: {
        id,
      },
    });


    let data = await product.findOne({
      // select ... where ...
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "idUser"], // pengecualian 3 item tdk dtampilkan
      },
    });

    data = JSON.parse(JSON.stringify(data));

    res.status(201).send({
      status: "success",
      data
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.deleteProduct = async (req, res) => {
  // code here
  try {
    const { id } = req.params;

    await product.destroy({
      // delete where id
      where: { id },
    });

    res.status(201).send({
      status: "success",
      data: {
        id: id,
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
