import React, {Component} from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

// Component
import Home from './Home';


class App extends Component {


    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home} />
                </div>
            </BrowserRouter>   
        )
    }

}

export default connect(null)(App)