import './styles/app.styl';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './store';
import { updateState } from './actions/updateState';
import { Root } from './components/Root';
import { Provider } from 'react-redux';
import backgroundService from './services/Background';
import './i18n';

export async function initApp(background: any) {
    backgroundService.init(background);
    backgroundService.on(updateState);
    backgroundService.getState();
}

ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById('app-content'));