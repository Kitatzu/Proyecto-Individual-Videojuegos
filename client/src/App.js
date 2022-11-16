import './App.css';
import {Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home'
import VideogameDetails from './components/VideogameDetails'
import CreateVideogame from './components/CreateVideogame'
import Route404 from './components/Route404'

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path = '/' component={LandingPage} />
          <Route exact path = '/home' component={Home} />
          <Route exact path = '/videogame/:id' component = {VideogameDetails} />
          <Route exact path = '/videogame' component= {CreateVideogame} />
          <Route path = "*" component = {Route404} />
      </Switch>
    </div>
  );
}

export default App;
