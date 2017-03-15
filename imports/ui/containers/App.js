import { connect } from "react-redux";

import Layout from "../components/Layout";

function mapStateToProps(state) {
  return {
    filters: state.filters,
  };
}

const App = connect(mapStateToProps)(Layout);

export default App;
