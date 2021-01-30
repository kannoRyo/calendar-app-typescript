import React from 'react';
import './App.css';
import {Header, CalendarBoard} from './components/index'
import {renderCalendar} from './utils/renderCalendar'

const App = () => {
  renderCalendar(2021, 0)

  return (
    <div>
      <Header/>
      <CalendarBoard/>
    </div>
  );
}

export default App;
