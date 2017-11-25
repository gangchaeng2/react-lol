import React, { Component } from 'react';

class ChampStat extends Component {
    render() {
        return(
            <div className="item">
              <div className="ui tiny image">
                <img src={`http://iplol.co.kr/images/champ_2015/${this.props.champList.champion}.png`} alt=""/>
              </div>
              <div className="content">
                  <a className="header">{this.props.champList.name}</a>
                  <div className="meta">
                      <span>{this.props.champList.title}</span>
                  </div>
                  <b>{this.props.champList.win} 승 / {this.props.champList.loss} 패 ( {this.props.champList.winPercent} )</b>
                  <br/>
                  <b>{this.props.champList.kill} / {this.props.champList.death} / {this.props.champList.assist} ( {this.props.champList.average} )</b>
              </div>
            </div>
        );
    }
}

export default ChampStat;
