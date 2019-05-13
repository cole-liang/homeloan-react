import { Component } from "react";
import { connect } from "react-redux";

import * as userAction from "../../actions/userAction";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
    this.props.history.push("/");
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userAction.logoutUser())
});

export default connect(
  null,
  mapDispatchToProps
)(Logout);
