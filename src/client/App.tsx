import React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.Component {
    render = () => {
        return (
            <div className="app">
                <h1>Alru Network | ShareX</h1>
            </div>
        );
    }
}

export default hot(module)(App);