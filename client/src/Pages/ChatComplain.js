import React, { useState, useEffect, useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ChatBody from "../Component/ChatBody";
import ChatList from "../Component/ChatList";
import MainNavbar from "../Component/MainNavbar";
import { UserContext } from "../context/userContext";

// import package here
import { io } from "socket.io-client";

// init variable here
let socket;
const ChatComplain = () => {
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);

  const title = "Complain";
  document.title = "DumbMerch | " + title;

  // code here
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
      // code here
      query: {
        id: state.user.id,
      },
    });

    // code here
    // define corresponding socket listener
    socket.on("new message", () => {
      console.log("contact", contact);
      console.log("triggered", contact?.id);
      socket.emit("load messages", contact?.id);
    });

    // listen error sent from server
    socket.on("connect_error", (err) => {
      console.error(err.message); // not authorized
    });
    // code here
    loadContact();
    loadMessages();

    return () => {
      socket.disconnect();
    };
  }, [messages]); // code here

  const loadContact = () => {
    // emit event load admin contact
    socket.emit("load admin contact");
    // listen event to get admin contact

    socket.on("admin contact", async (data) => {
      const dataContact = {
        ...data,
        message:
          messages.length > 0
            ? messages[messages.length - 1].message
            : "Click here to start message",
      };
      setContacts([dataContact]);
    });
  };

  // used for active style when click contact
  const onClickContact = (data) => {
    setContact(data);
    // code here
    socket.emit("load messages", data.id);
  };

  // code here
  const loadMessages = (value) => {
    socket.on("admin contact", (data) => {
      socket.on("messages", async (data) => {
        if (data.length > 0) {
          const dataMessages = data.map((item) => ({
            idSender: item.sender.id,
            message: item.message,
          }));
          console.log(dataMessages);
          setMessages(dataMessages);
        }
        const chatMessages = document.getElementById("chat-messages");
        chatMessages.scrollTop = chatMessages?.scrollHeight;
      });
    });
  };

  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      };

      socket.emit("send messages", data);
      e.target.value = "";
    }
  };

  return (
    <>
      <MainNavbar title={title} />
      <Row className="mx-5 bg-none" style={{ height: "85vh" }}>
        <Col
          md={4}
          className="border border-bottom-0 border-top-0 border-start-0 border-white"
          style={{ height: "85vh" }}
        >
          <Card className="my-2 h-auto bg-transparent">
            <ChatList
              dataContact={contacts}
              clickContact={onClickContact}
              contact={contact}
            />
          </Card>
        </Col>
        <Col md={8} className="border border-0">
          <ChatBody
            contact={contact}
            messages={messages}
            user={state.user}
            sendMessage={onSendMessage}
          />
        </Col>
      </Row>
    </>
  );
};

export default ChatComplain;
