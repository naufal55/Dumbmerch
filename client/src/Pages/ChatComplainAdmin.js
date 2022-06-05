import React, { useState, useEffect, useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ChatBody from "../Component/ChatBody";
import ChatList from "../Component/ChatList";
import { UserContext } from "../context/userContext";
import MainNavbarAdmin from "../Component/MainNavbarAdmin";
// import package here
import { io } from "socket.io-client";

// init variable here
let socket;
const ChatComplainAdmin = () => {
  const [contact, setContact] = useState();
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([])

  const title = "Complain";
  document.title = "DumbMerch | " + title;

  const [state, dispatch] = useContext(UserContext)


  useEffect(() =>{
      socket = io('http://localhost:5000', {
          auth: {
              token: localStorage.getItem('token')
          },
          // code here
          query: {
              id: state.user.id
          }
      })

      // code here
      socket.on("new message", () => {
          console.log("contact", contact)
          console.log("triggered", contact?.id)
          socket.emit("load messages", contact?.id)
      })

      // code here
      loadContacts()
      loadMessages()

      return () => {
          socket.disconnect()
      }
  }, [messages]) // code here

  const loadContacts = () => {
      socket.emit("load customer contacts")
      socket.on("customer contacts", (data) => {
          // filter just customers which have sent a message
          let dataContacts = data.filter((item)=>(item.status!=='admin') && (item.recipientMessage.length  >0||item.senderMessage.length>0))
          
          // manipulate customers to add message property with the newest message
          // code here
          dataContacts = dataContacts.map((item)=>({
              ...item,
              // message: item.senderMessage.length > 0 ? item.senderMessagge[item.senderMessage.length -1].message : "Click here to start message" 
          }))
          setContacts(dataContacts)
      })
  }

  // used for active style when click contact
  const onClickContact = (data) => {
      setContact(data)
      // code here
      socket.emit("load messages",data.id)
  }

  // code here
  const loadMessages = (value) => {
          
      socket.on("messages", (data)=>{
          if(data.length>0){
              const dataMessages = data.map((item)=>({
                  idSender:  item.sender.id,
                  message: item.message
              }))
              console.log(dataMessages);
              setMessages(dataMessages)
          }
          loadContacts()
          const chatMessages = document.getElementById("chat-messages")
          chatMessages.scrollTop = chatMessages?.scrollHeight
      })
  }

  const onSendMessage = (e)=>{
      if(e.key === 'Enter'){
          const data = {
              idRecipient: contact.id,
              message: e.target.value
          }

          socket.emit("send messages",data)
          e.target.value = ""
      }
  }

  return (
    <>
      <MainNavbarAdmin title={title} />
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

export default ChatComplainAdmin;
