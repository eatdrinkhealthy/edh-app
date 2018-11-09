// @flow
import React from "react";
import classNames from "classnames";

type IPillProps = {
  className?: string, // eslint-disable-line react/require-default-props
  name: string,
  active: boolean,
  selectedColor?: string,
  onClick: (*) => void,
};

const Pill = ({
  className: excludeClassName, // extract out and override className
  active, // use active, but don't pass it on to button
  selectedColor,
  ...props // pass on the rest of the props (used by a button)
}: IPillProps) => {
  // TODO find better way to optimize styling (all here, or in .less file)
  const colorStyle = {
    background: active ? selectedColor : "white",
    borderColor: active ? selectedColor : "#ccc",
  };

  return (
    <button
      type="button"
      style={colorStyle}
      className={classNames("pill", { pill_selected: active })}
      {...props}
    />
  );
};

Pill.defaultProps = {
  selectedColor: "#5e2ca5",
};

export default Pill;
