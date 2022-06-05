import React from "react";

const ChatBubblesL = (props) => {
  return (
    <div class="d-flex flex-shrink-0 me-auto pb-4">
      <div>
        <img
          src={props.src}
          class="rounded-circle ms-2"
          width="40"
          height="40"
        />
      </div>
      <div class="flex-shrink-1 bg-secondary rounded py-2 px-3 ms-3">
        {props.messages}
      </div>
    </div>
  );
};

export default ChatBubblesL;
