import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LoginPage } from '../../components/Login';

declare const window: any;

const initialState = window.INIT_STATE;

ReactDOM.render(
    <LoginPage />,
    document.getElementById('root') as HTMLDivElement
);
