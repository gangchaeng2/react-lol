import React, { Component } from 'react';

class LaneStats extends Component {
    render() {
        return(
          <div className="ui massive aligned divided list">
            <div className="item">
              <img className="ui avatar image" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/e/ef/Top_icon.png/revision/latest?cb=20170515021434" alt=""/>
              <div className="middle aligned content">
                <b>{this.props.totalStats.top}</b>
              </div>
            </div>
            <div className="item">
              <img className="ui avatar image" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/1/1b/Jungle_icon.png/revision/latest?cb=20170515021433" alt=""/>
              <div className="middle aligned content">
                <b>{this.props.totalStats.jg}</b>
              </div>
            </div>
            <div className="item">
              <img className="ui avatar image" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/9/98/Middle_icon.png/revision/latest?cb=20161112025312" alt=""/>
              <div className="middle aligned content">
                <b>{this.props.totalStats.mid}</b>
              </div>
            </div>
            <div className="item">
              <img className="ui avatar image" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/9/97/Bottom_icon.png/revision/latest?cb=20161112025314" alt=""/>
              <div className="middle aligned content">
                <b>{this.props.totalStats.ad}</b>
              </div>
            </div>
            <div className="item">
              <img className="ui avatar image" src="https://vignette.wikia.nocookie.net/leagueoflegends/images/e/e0/Support_icon.png/revision/latest?cb=20170515021434" alt=""/>
              <div className="middle aligned content">
                <b>{this.props.totalStats.sp}</b>
              </div>
            </div>
          </div>

        );
    }
}

export default LaneStats;
