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
import EditPost from "./components/EditPost";

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
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <ArticleList />
          </Route>
          <Route path ="/posts/:postId">
            <SinglePost />
          </Route>
          <Route path ="/write">
            <WriteNew />
          </Route>
          {/* <Route path={`/posts/:postId/edit`}>
            <EditPost />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
