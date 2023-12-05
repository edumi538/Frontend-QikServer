import React from "react";

interface IPropsContainer {
  className: string;
  children: JSX.Element;
}

const Container = (props: IPropsContainer) => {
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
