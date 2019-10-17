import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

class Header extends React.Component {
  render() {
    // TODO : should check whehter logged in or not
    let isLogin = true;

    // TODO : should change with user's id
    let id = 0;

    const not_login_tab = (
      <span>
        ID : <input></input>
        PW : <input></input>
      </span>
    );
    const login_tab = (
      <span>
        {"User : My Name"}
        <button onClick={() => {}}>Sign Out</button>
        <button onClick={() => this.props.history.push("/mypage/" + id)}>
          my page
        </button>
      </span>
    );

    return (
      <div>
        <button onClick={() => this.props.history.push("/club")}>Club</button>
        <button onClick={() => this.props.history.push("/somoim")}>
          Somoim
        </button>
        {isLogin ? login_tab : not_login_tab}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
