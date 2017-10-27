// @flow
import React from "react";
import classNames from "classnames";

type IPillProps = {
  className?: string,   // eslint-disable-line react/require-default-props
  active: boolean,
  onClick: (*) => void,
};

const Pill = ({
  className,    // extract out and override className
  ...props      // pass on the rest of the props (used by a button)
}: IPillProps) => {
  const classes = classNames("pill", { pill_selected: props.active });
  return <button className={classes} {...props} />;
};

export default Pill;
