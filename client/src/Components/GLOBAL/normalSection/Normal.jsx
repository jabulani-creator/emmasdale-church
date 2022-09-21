import React from "react";

export const Normal = (props) => {
  return (
    <section className="section primary">
      <h1 className="left_align">{props.title}</h1>
      <p className="right-paragraph">{props.paragraph}</p>
    </section>
  );
};
