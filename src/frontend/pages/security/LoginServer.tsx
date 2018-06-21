import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { getStyles } from 'typestyle';
import { renderHtml } from '../../RenderHtml';
import { LoginPage } from '../../components/Login';

const styles = [
    'https://cdnjs.cloudflare.com/ajax/libs/antd/2.12.3/antd.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'
];

const js: string[] = [
    '/login.js'
];

export const renderLogin = () => {
    const bodyHtml = ReactDOMServer.renderToString(
        <LoginPage />
    );

    const appStyle = getStyles();
    const html = renderHtml(
        '', styles, appStyle, {}, bodyHtml, js);
    return html;
}
