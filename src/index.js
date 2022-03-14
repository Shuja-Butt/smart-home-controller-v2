import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {msalConfig} from './authConfig';
import {MsalProvider} from '@azure/msal-react';
import {PublicClientApplication } from '@azure/msal-browser';
import {BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


//instantiate the msal instance by passing it the msal config object
const msalInstance = new PublicClientApplication(msalConfig)

ReactDOM.render(
// All components that require authenticaton are wrapped in MsalProvider
// All components underneath MsalProvider will have access to the 
// PublicClientApplication instance via context as well as all hooks 
// and components provided by @azure/msal-react.
  
    <MsalProvider  instance={msalInstance}>
      <Router>
        <App />
      </Router>
    </MsalProvider>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
