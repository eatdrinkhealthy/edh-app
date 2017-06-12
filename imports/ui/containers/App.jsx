// @flow
import React from "react";

type IProps = {
  children: React$Element<*>,
};

const App = (props: IProps): React$Element<*> => {
  const { children, ...otherProps } = props;
  const newChild = React.cloneElement(children, otherProps);

  return (
    <div>
      {newChild}
    </div>
  );
};

export default App;

