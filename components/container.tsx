import React from "react";

interface PropsContainer {
  className: string;
  children: JSX.Element;
}

const Container = (props: PropsContainer) => {
  return (
    <div
      className={`container p-8 mx-auto xl:px-0 ${
        props.className ? props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Container;
