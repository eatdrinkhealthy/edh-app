import { connect } from "react-redux";

import LayoutContainer from "./LayoutContainer";

function mapStateToProps(state) {
  return {
    filters: state.filters,
  };
}

const App = connect(mapStateToProps)(LayoutContainer);

export default App;
