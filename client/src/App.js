import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Home from './components/Home';
import Landing from './components/Landing';
import DogDetail from './components/DogDetail';
import CreateBreed from './components/CreateBreed';
// import LazyLoad from 'react-lazyload';




function App() {
  return (
    
    <React.Fragment>
     

      <Route exact path='/' component={Landing}/>
      <Route  path='/home' component={Home}/>
      <Route path='/dogs/:id' component={DogDetail}/>
      <Route path='/createBreed' component={CreateBreed}/>
      
            

    </React.Fragment>
  );
}

export default App;
