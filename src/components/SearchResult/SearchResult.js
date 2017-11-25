import React,{Component} from 'react';
import './SearchResult.css';
import { MatchList, RecentSummoner } from '../';

class SearchResult extends Component{
    render() {
      const st = {
          color: 'red'
      };

      const st2 = {
          color: 'black'
      };

      const recentSummoners = (data) => {
        return data.map((summoner, i) => {
            return (
              <RecentSummoner
                  summoner={summoner}
                  key={i}
              />
            );
        });
      };

      return (
          <div className="SearchResult">
            <div className="ui segment">
              <div className="ui right rail">
                <div className="ui segment">최근 검색한 소환사</div>
                  <div className="ui segment">
                    <ul>
                      {recentSummoners(this.props.recentSummoner)}
                    </ul>
                  </div>
              </div>
              <div className="ui centered cards">
                <div className="card">
                  <div className="image">
                    <img src={`//opgg-static.akamaized.net/images/profile_icons/profileIcon${this.props.summoner.profileIconId}.jpg`} alt=""/>
                  </div>
                  <div className="content">
                    <div className="header">{this.props.name}</div>
                    <div className="meta">
                        {this.props.summoner.revisionDate}
                    </div>
                    <div className="description" style={this.props.summoner.status ? st : st2}>
                      {this.props.summoner.status ? "현재 게임중 입니다." : "현재 게임중이 아닙니다."}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="image">
                    <img src={this.props.rating.tierSrc} alt=""/>
                  </div>
                  <div className="content">
                    <div className="header">{this.props.rating.tier} {this.props.rating.rank}</div>
                    <div className="meta">
                      <span className="date">{this.props.rating.leagueName}</span>
                    </div>
                    <div className="description">
                      {this.props.rating.leaguePoints}LP / {this.props.rating.wins}승 {this.props.rating.losses}패
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <MatchList
              matchList={this.props.matchList}
              totalMatchInfo={this.props.totalMatchInfo}
              totalStats={this.props.totalStats}
              myInfo={this.props.myInfo}
            />
        </div>
    );
  }
}

export default SearchResult;
