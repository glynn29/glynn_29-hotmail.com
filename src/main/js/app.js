import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ViewComponent from "./components/ViewComponent";
import AddComponent from "./components/AddComponent";
import EditComponent from "./components/EditComponent";
const ReactDOM = require('react-dom');


function App() {
    return (
        <div className="container">
            <ViewComponent />
        </div>
    );
}

export default App;

ReactDOM.render(
    <App />,
    document.getElementById('react')
)

