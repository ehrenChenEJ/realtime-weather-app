// Step1: 載入React 相關套件
import React from 'react';
import ReactDOM from 'react-dom';

// Step2: 載入CSS和React元件
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 載入normalize
import 'normalize.css';

// Step3: 將React元件和HTML互相綁定
ReactDOM.render(
  <React.StrictMode>
    {/* React 元件 */}
    <App />
  </React.StrictMode>,
  // HTML DOME
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
serviceWorker.register();