const { rating, user, transaction, product } = require("../../models");

exports.getTransactions = async (req, res) => {
  const ftime = (timeNow = new Date()) => { //untuk format fultime tanggal
    let month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'October','Nopember','December']        
    
    let date = timeNow.getDate() 
    let monthIndex = timeNow.getMonth()
    let year = timeNow.getFullYear()
    
    return `${date} ${month[monthIndex]} ${year}`
}
  try {
    // jika i
    const {id} = req.params
    let data = await transaction.findAll({
      where: {
        //idUser in database same with id params 
        idBuyer:id,
      },
      include: [
        {
          model: product,
          as: "product",
          attributes: {
            exclude: ["createdAt", "updatedAt", "idUser", "qty"],
          },
        },
        {
          model: user,
          as: "buyer",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status"],
          },
        },
        {
          model: user,
          as: "seller",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status"],
          },
        },
        {
          model:rating,
          as:"rating",
          attributes:{
            exclude:["createdAt", "updatedAt"]
          }
        }
      ],
      attributes: {
        exclude: [ "updatedAt"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        product: {
          ...item.product,
          image: process.env.FILE_PATH + item.product.image,
        },
        CreatedAt: ftime(item.CreatedAt)
      };
    });

    res.status(201).send({
      status: "success",
      transactions: data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const data = await transaction.create(req.body);
    const { id, idProduct, idBuyer, idSeller, price } = data;

    await rating.create({
      idTransaction: id,
      totalRate:0,
      comment:''
    });

    res.status(201).send({
      status: "success",
      data: {
        transaction: { id, idProduct, idBuyer, idSeller, price },
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
