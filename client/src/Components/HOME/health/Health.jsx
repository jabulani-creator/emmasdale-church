import React, { useState } from "react";
import moment from "moment";

export const Health = ({ healthTitle, healthDesc, createdAt, healthPhoto }) => {
  const [readMore, setReadMore] = useState(false);
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <section className="section primary">
      <div className="topic-image">
        <img src={healthPhoto} alt="" className="img" />
      </div>
      <h4>{healthTitle}</h4>
      <small>{date}</small>
      <p className="right-paragraph">
        {readMore ? healthDesc : `${healthDesc.substring(0, 500)}...`}
        <button className="btn-read" onClick={() => setReadMore(!readMore)}>
          {readMore ? "show less" : "read more"}
        </button>
      </p>
    </section>
  );
};
