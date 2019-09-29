import React from "react";

import { withRouter } from "react-router";

class ClubCard extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.props.content}
      </div>
    );
  }
}

export default withRouter(ClubCard);
