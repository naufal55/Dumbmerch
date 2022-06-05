const { chat, user, profile } = require("../../models");

const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

// init variable here
const connectedUser = {};

const socketIo = (io) => {
  //kegunaan on method menerima data dengan mentrigger event methodnya
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error("Not Authorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("client connect:", socket.id);

    const userId = socket.handshake.query.id;

    connectedUser[userId] = socket.id;

    socket.on("load admin contact", async () => {
      try {
        const adminContact = await user.findOne({
          where: {
            status: "admin",
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        });

        // emit event to send admin data on event “admin contact”
        socket.emit("admin contact", adminContact);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("load customer contacts", async () => {
      try {
        let custommerContacts = await user.findAll({
          include:[
            {
              model:profile,
              as:"profile",
              attributes:{
                exclude:["createdAt","updatedAt"]
              }
            },
            {
              model:chat,
              as:"recipientMessage",
              attributes:{
                exclude:["createdAt","updatedAt"]
              }
            },
            {
              model:chat,
              as:"senderMessage",
              attributes:{
                exclude:["createdAt","updatedAt"]
              }
            },
          ],
          attributes:{
            exclude:["createdAt","updatedAt"]
          }
        });

      custommerContacts=JSON.parse(JSON.stringify(custommerContacts))

      custommerContacts= custommerContacts.map((item)=> {
        return{
          ...item,
          image: item.image ? process.env.PATH_FILE + item.image : null
        }
      })
    
      // emit event to send admin data on event “admin contact”
      socket.emit("customer contacts", custommerContacts)
      } catch (err) {
        console.log(err)
      }
    })

    socket.on("load messages", async (payload) => {
      try {
        const token = socket.handshake.auth.token;

        const tokenKey = process.env.TOKEN_KEY;
        const verified = jwt.verify(token, tokenKey);

        const idRecipient = payload; // catch recipient id sent from client
        const idSender = verified.id; //id user

        const data = await chat.findAll({
          where: {
            idSender: {
              [Op.or]: [idRecipient, idSender],
            },
            idRecipient: {
              [Op.or]: [idRecipient, idSender], // where id rec = id rec or id send
            },
          },
          include: [
            {
              model: user,
              as: "recipient",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
            {
              model: user,
              as: "sender",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
              },
            },
          ],
          order: [["createdAt", "ASC"]], // order by createdAt ascendin
          attributes: {
            exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"],
          },
        });

        socket.emit("messages", data);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("send messages", async (payload) => {
      try {
        const token = socket.handshake.auth.token

        const tokenKey = process.env.TOKEN_KEY
        const verified = jwt.verify(token, tokenKey)

        const idSender = verified.id //id user
        const {message, idRecipient}=payload

        await chat.create({
          message,
          idRecipient,
          idSender
        })

        io.to(socket.id).to(connectedUser[idRecipient]).emit("new message", idRecipient)
      } catch (error) {
        console.log(error)
      }
    })

    //deklarasi socket io client dariserver
    //apabila aplikasi tetap terasmbung server
    //maka hapus method disconnect dibawah ini
    socket.on("disconnect", () => {
      console.log("client disconnect",socket.id);
      delete connectedUser[userId]
    });
  });
};

module.exports = socketIo;
