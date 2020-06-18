import React, { useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Landing from './containers/Landing';
import Cart from './containers/Cart';
import Checkout from './containers/Checkout';
import Success from './containers/Success';
import AboutUs from './containers/AboutUs';
import BoxList from './components/BoxList';
import Catalogo from './components/Catalogo';
import Contacto from './components/Contacto';

import './styles/App.css';

const App = () => {
  const contactRef = React.createRef();

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Landing carRef={contactRef} />
          <BoxList title='Boxes de frutas y vegetales frescos:' />
          <Catalogo />
          <Contacto carRef={contactRef} />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/checkout'>
          <Checkout />
        </Route>
        <Route exact path='/success'>
          <Success />
        </Route>
        <Route exact path='/about'>
          <AboutUs />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
