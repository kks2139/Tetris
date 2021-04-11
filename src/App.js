import React from 'react';
import './App.css';
import Tetris from './tetris/Tetris';
import Welcome from './welcome/Welcome';

function App() {

  return (
    <div className="dark no-drag">
        {/* <Tetris></Tetris> */}
        <Welcome></Welcome>
    </div>
  );
}

export default App;