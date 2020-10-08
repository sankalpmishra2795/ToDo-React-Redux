import React from 'react';
import './App.css';
import Ui from './Component/Ui';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';

function App() {
  return (
    <Provider store={store}>
      <Ui />
    </Provider>
  );
}

export default App;
