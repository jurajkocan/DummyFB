import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { MasterPage } from './MasterPage';
import { createStore } from 'redux';
import { reducer } from '../redux/Reducer';

declare const window: {
    INIT_STATE: {}
}
const appStore = createStore(reducer, {})

ReactDOM.render(
    <Provider store={appStore} >
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => (
                    <MasterPage currentPage='userProfile' />
                )} />
                <Route exact path="/UserProfile" render={() => (
                    <MasterPage currentPage='userProfile' />
                )} />
                <Route exact path="/FindUser" render={() => (
                    <MasterPage currentPage='findFriends' />
                )} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLDivElement
);

declare var module: any;
