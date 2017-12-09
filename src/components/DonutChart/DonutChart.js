import React, { Component } from 'react';

import './DonutChart.css';

const defaultProps = {
    circleSize: 20,
    wins:8,
    valuelabel:'8승 / 12패',
    size:200,
    strokewidth:26
};

class DonutChart extends Component {
    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
    }

    render() {
      const halfsize = (this.props.size * 0.5);
      const radius = halfsize - (this.props.strokewidth * 0.5);
      const circumference = 2 * Math.PI * radius;
      const strokeval = ((this.props.totalMatchInfo.wins * circumference) / (this.props.totalMatchInfo.circleSize));
      const dashval = (strokeval + ' ' + circumference);

      const trackstyle = {strokeWidth: this.props.strokewidth};
      const indicatorstyle = {strokeWidth: this.props.strokewidth, strokeDasharray: dashval};
      const rotateval = 'rotate(-90 '+halfsize+','+halfsize+')';

      return (
        <div>
          <svg width={this.props.size} height={this.props.size} className="donutchart">
            <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track"/>
            <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator"/>
            <text className="donutchart-text" x={halfsize} y={halfsize} style={{textAnchor:'middle'}} >
              <tspan className="donutchart-text-val"><br/></tspan>
              <tspan className="donutchart-text-percent">{this.props.totalMatchInfo.percent}</tspan>
              <tspan className="donutchart-text-label" x={halfsize} y={halfsize+30}>{this.props.totalMatchInfo.label}</tspan>
            </text>
          </svg><br/>
        <h2 className='total-stats'>{this.props.totalMatchInfo.totalKill} / <span className='total-death'>{this.props.totalMatchInfo.totalDeath}</span> / {this.props.totalMatchInfo.totalAssist} ({this.props.totalMatchInfo.totalAverage}:1)</h2>
        </div>
    );
  }
}

DonutChart.defaultProps = defaultProps;

export default DonutChart;
