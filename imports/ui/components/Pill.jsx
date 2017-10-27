// @flow
import React from "react";
import classNames from "classnames";

type IPillProps = {
  className?: string,   // eslint-disable-line react/require-default-props
  name: string,
  active: boolean,
  onClick: (*) => void,
};

const Pill = ({
  className: excludeClassName,  // extract out and override className
  active,                       // use active, but don't pass it on to button
  ...props                      // pass on the rest of the props (used by a button)
}: IPillProps) => (
  <button className={classNames("pill", { pill_selected: active })} {...props} />
);

export default Pill;
