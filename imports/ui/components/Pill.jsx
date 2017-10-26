// @flow
import React from "react";
import { Button } from "./ReactBootstrapLib";

type IPillProps = any;

const Pill = ({
  className,    // extract className to override
  ...props
}: IPillProps) => (
  <Button className="pill" {...props} />
);

export default Pill;
