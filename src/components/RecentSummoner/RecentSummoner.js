import React, { Component } from 'react';

class RecentSummoner extends Component {
    render() {
        return(
            <li>
              {this.props.summoner}<br/>
            </li>
        );
    }
}

export default RecentSummoner;
