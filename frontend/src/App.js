import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ArticleList from "./components/ArticleList";
import SinglePost from "./components/Post";
import WriteNew from "./components/WriteNew";
import NotFound from './components/NotFound'
import AboutPage from './components/AboutPage'
import UserProfile from "./components/UserProfile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div>
          <Switch>
            <Route exact path="/login">
              <LoginFormPage />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/">
              <ArticleList />
            </Route>
            <Route exact path ="/posts/:postId">
              <SinglePost />
            </Route>
            <Route path ="/write">
              <WriteNew />
            </Route>
            <Route path='/about'>
              <AboutPage />
            </Route>
            <Route exact path ="/users/:profileId">
              <UserProfile />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
