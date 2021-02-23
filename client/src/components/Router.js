import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App';
import MoviePage from './MoviePage';
import FourZeroFour from './404';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/movie/*/:movieid" component={MoviePage} />
            <Route component={FourZeroFour} />
        </Switch>
    </BrowserRouter>
);

export default Router;