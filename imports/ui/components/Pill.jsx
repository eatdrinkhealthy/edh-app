// @flow
import React from "react";
import classNames from "classnames";

type IPillProps = any;

const Pill = ({
  className,    // extract className to override
  ...props
}: IPillProps) => {
  const classes = classNames("pill", { pill_selected: props.active });
  return <button className={classes} {...props} />;
};

export default Pill;
