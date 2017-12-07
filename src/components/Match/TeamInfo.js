import React,{Component}  from 'react';

import { Image } from 'semantic-ui-react';

class TeamInfo extends Component {
    render() {
        return (
              <tr>
              {this.props.team.map((championId, i) => {
                  return (
                    <td key={i}>
                      <Image src={`http://iplol.co.kr/images/champ_2015/${championId}.png`} shape='rounded' size='mini' />
                    </td>
                  );
              })}
              </tr>

        );
    }
}


export default TeamInfo;
