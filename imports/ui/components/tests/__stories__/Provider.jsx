// @flow
import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({ form: formReducer });
const store = createStore(rootReducer);

type IProps = {
  story: React$Element<*>,
};

const Provider = ({ story }: IProps): React$Element<*> => (
  <ReduxProvider store={store}>{story}</ReduxProvider>
);

export default Provider;
