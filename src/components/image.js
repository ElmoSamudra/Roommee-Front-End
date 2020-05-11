import React from "react";

export default function Image(props) {
  const { alt, ...otherProps } = props;

  return <img alt={alt} {...otherProps} />;
}
