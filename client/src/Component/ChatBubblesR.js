import React from "react";

const ChatBubblesR = (props) => {
  return (
    <div class="d-flex flex-row-reverse flex-shrink-0 ms-0 pb-4">
      <div>
        <img
          src={props.src}
          class="rounded-circle me-2"
          width="40"
          height="40"
        />
      </div>
      <div class="flex-shrink-1 bg-dark rounded py-2 px-3 me-3">
        {props.messages}
      </div>
    </div>
  );
};

export default ChatBubblesR;
