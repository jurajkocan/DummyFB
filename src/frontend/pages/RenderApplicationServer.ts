import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { getStyles } from 'typestyle';
import { renderHtml } from '../RenderHtml';
import { ReduxState } from '../redux/State';

const styles = [
    'https://cdnjs.cloudflare.com/ajax/libs/antd/2.12.3/antd.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'
];

const js: string[] = [
    '/app.js'
];

export const renderApplication = (state: ReduxState) => {
    const bodyHtml = '';

    const appStyle = getStyles();
    const html = renderHtml(
        'Dummy facebook', styles, appStyle, state, bodyHtml, js);
    return html;
}
