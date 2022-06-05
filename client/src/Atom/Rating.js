import React from "react";
import ReactStars from "react-rating-stars-component";

const Rating = (props) => {

  return (
    <ReactStars
      count={5}
      size={props.size}
      activeColor="#ffd700"
      isHalf={true}
      value={props.value}
      onChange={props.rate}
      edit={props.edit}
    />
  );
};

export default Rating;
