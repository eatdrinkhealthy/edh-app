// @flow
import React from "react";
import { Button } from "./ReactBootstrapLib";

type IPillProps = any;

const Pill = (props: IPillProps) => (
  <Button {...props} />
);

export default Pill;
