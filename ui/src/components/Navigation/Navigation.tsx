import { Header, HeaderName } from 'carbon-components-react';
import React from 'react';
import styles from './Navigation.module.scss';
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from "react-router-dom"
import UserDashboard from '../UserDashboard/UserDashboard';
import ClueContainer from '../ClueContainer/ClueContainer';
import CustomTrainingConfig from '../CustomTrainingConfig/CustomTrainingConfig';

export default function Navigation() {
  return (
    <Router>
      <Header aria-label="J-Trainer!">
        <HeaderName href="#" prefix="">
          J-Trainer!
        </HeaderName>
        <NavLink className={styles.navLink} to="/">Home</NavLink>
        <NavLink className={styles.navLink} to="/dashboard">Dashboard</NavLink>
        <NavLink className={styles.navLink} to="/training">Custom Training</NavLink>
      </Header>
      <Switch>
        <Route path="/dashboard">
          <div className={styles.bodyContent}>
            <UserDashboard></UserDashboard>
          </div>
        </Route>
        <Route exact path="/training">
          <div className={styles.bodyContent}>
            <CustomTrainingConfig></CustomTrainingConfig>
          </div>
        </Route>
        <Route path="/clues/:id">
          <div className={styles.bodyContent}>
            <ClueContainer switchToNextClue={() => { console.log("switch")}}></ClueContainer>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}
