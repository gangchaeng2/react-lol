import React, { Component } from 'react';
import * as service from '../service/post';

class SearchSummoner extends Component {
    fetchPostInfo = async (name) => {
        const summoner = await service.getSummoner(name);
        console.log(summoner);
    }

    componentDidMount() {
        this.fetchPostInfo('Eye돌');
    }

    render() {
        return(
            <div>SearchSummoner</div>
        );
    }
}

export default SearchSummoner;
