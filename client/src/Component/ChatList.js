import React from "react";

import default_profile from "../Assets/avatar.png";

const ChatList = ({ dataContact, clickContact, contact }) => {
  return (
    <>
      {dataContact.length > 0 && (
        <>
          {dataContact.map((item) => (
            <div
              key={item.id}
              className={`contact my-2 p-2 bg-dark text-light 
              ${contact?.id === item?.id && "contact-active"}`}
              onClick={() => {
                clickContact(item);
              }}
            >
              <div className="d-flex align-items-start">
                <img
                  src={item.profile?.image || default_profile}
                  className="rounded-circle mt-1"
                  width="40"
                  height="40"
                />
                <div className="flex-grow-1 ms-3 text-start">
                  <p className="m-0 fw-bold">{item.name}</p>
                  <div>{item.message}</div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ChatList;
