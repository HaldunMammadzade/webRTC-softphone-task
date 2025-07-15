import React from 'react';
import CallInterface from '@/components/CallInterface';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <h1>WebRTC Softphone</h1>
        <CallInterface />
      </div>
    </div>
  );
};

export default App;