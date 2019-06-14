import React, {Component} from 'react';
import './App.scss';

import Body from './components/block/Body';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Body/>
            </div>
        );
    }
}

export default App;
