import React from "react";

const ImageGallery = ({ image, department }) => {
  return (
    <article className="photo">
      <img src={image} alt={department} />
    </article>
  );
};

export default ImageGallery;
