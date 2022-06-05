import React from "react";
import InputColumn from "../Atom/InputColumn";
import ChatBubblesL from "../Component/ChatBubblesR";
import ChatBubblesR from "../Component/ChatBubblesL";
import default_profile from "../Assets/avatar.png";

const ChatBody = ({ contact, user, messages, sendMessage }) => {
  return (
    <>
      {contact ? (
        <>
          <div
            id="chat-messages"
            className="position-relative overflow-auto"
            style={{ height: "70vh" }}
          >
            {messages.map((item, index) => (
              <div key={index}>
                <div className="d-flex flex-column mt-3 text-light">
                  {item.idSender === user.id ? (
                    <ChatBubblesL
                        src={contact.profile?.image || default_profile}
                        messages={item.message}
                    />
                  ) : (
                    <ChatBubblesR
                        src={contact.profile?.image || default_profile}
                        messages={item.message}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div class="flex-grow-0 py-3 px-4 border-top">
            <InputColumn
              press={sendMessage}
              type="text"
              holder="Send Message"
            />
          </div>
        </>
      ) : (
        <div
          style={{ height: "89.5vh" }}
          className="h4 d-flex justify-content-center align-items-center"
        >
          No Message
        </div>
      )}
    </>
  );
};

export default ChatBody;
