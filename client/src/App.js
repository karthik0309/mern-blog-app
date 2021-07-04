import React, { lazy, Suspense } from "react";
import NavBar from "./components/navbar/NavBar";
import Spinner from "./components/spinner/Spinner";
import { useGlobalStateValue } from "./globalState/Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

const Home = lazy(() => import("./pages/home/Home"));
const NewPost = lazy(() => import("./pages/newPost/NewPost"));
const Single = lazy(() => import("./pages/singlePost/Single"));
const Login = lazy(() => import("./pages/login/Login"));
const Signup = lazy(() => import("./pages/login/Signup"));
const UserSettings = lazy(() => import("./pages/settings/UserSettings"));

const App = () => {
  const { user } = useGlobalStateValue();
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/post/:postId" component={Single} />
          <Route path="/Signup">{user ? <Home /> : <Signup />}</Route>
          <Route path="/Login">{user ? <Home /> : <Login />}</Route>
          <Route path="/Write">{user ? <NewPost /> : <Signup />}</Route>
          <Route path="/Settings">{user ? <UserSettings /> : <Signup />}</Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
