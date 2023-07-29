import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import ReactDOM from 'react-dom/client';
import { applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import App from './App.jsx';
import { firebaseConfig, firebaseVapidKey } from './data/firebaseConfig';
import { rootReducer } from './redux/reducer';
import './css/index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  },
  applyMiddleware(),
);
const Persistor = persistStore(store);

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

getToken(messaging, {
  vapidKey: firebaseVapidKey,
})
  .then((currentToken) => {
    if (currentToken) {
      // console.log('FCM 토큰: ', currentToken);
      // TODO: 서버에 토큰 전송
    } else {
      // console.log('FCM 토큰이 없습니다.');
    }
  })
  .catch(() => {
    // console.log('FCM 토큰 가져오기 오류 : ', error);
  });

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={Persistor}>
      <App />
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
