import { Header, HeaderContainer, HeaderMenu, HeaderMenuButton, HeaderMenuItem, HeaderName, HeaderNavigation, HeaderSideNavItems, SideNav, SideNavItems, SkipToContent } from 'carbon-components-react';
import React from 'react';
import styles from './Navigation.module.scss';
import { BrowserRouter as Router, Link, NavLink, Route, Switch } from "react-router-dom"
import UserDashboard from '../UserDashboard/UserDashboard';
import CategorySelection from '../CategorySelection/CategorySelection';
import EpisodeSelection from '../EpisodeSelection/EpisodeSelection';
import ClueContainer from '../ClueContainer/ClueContainer';
import Quiz from '../Quiz/Quiz';

export default function Navigation() {
  return (
    <Router>
      <Header aria-label="J-Trainer!">
        <HeaderName href="#" prefix="">
          J-Trainer!
        </HeaderName>
        <NavLink className={styles.navLink} to="/">Home</NavLink>
        <NavLink className={styles.navLink} to="/dashboard">Dashboard</NavLink>
        <NavLink className={styles.navLink} to="/episodes">Episodes</NavLink>
        {/*<NavLink className={styles.navLink} to="/categories">Categories</NavLink>*/}
      </Header>
      <Switch>
        <Route path="/dashboard">
          <div className={styles.bodyContent}>
            <UserDashboard></UserDashboard>
          </div>
        </Route>
        {/*<Route exact path="/categories">
          <div className={styles.bodyContent}>
            <CategorySelection></CategorySelection>
          </div>
        </Route>
        <Route path="/categories/:id">
          <div className={styles.bodyContent}>
            <Quiz quizType={'category'}></Quiz>
          </div>
        </Route>*/}
        <Route exact path="/episodes">
          <div className={styles.bodyContent}>
            <EpisodeSelection userId={1}></EpisodeSelection>
          </div>
        </Route>
        <Route path="/episodes/:quizId">
          <div className={styles.bodyContent}>
            <Quiz quizType={'episode'}></Quiz>
          </div>
        </Route>
      </Switch>
    </Router>
  )
}
