import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)