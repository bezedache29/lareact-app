import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'

import AppRouter from './components/router/AppRouter';
import Welcome from './components/Welcome'
import Home from './components/Home'


function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App;
