//React
const React = require('react');
const ReactDOM = require('react-dom');
//Router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
//Components
const App = require('./components/app');
const LoginForm = require('./components/login_form');
const SplashPage = require('./components/splash_page');
const BrowserApp = require('./components/browser_app')
const ProjectForm = require('./components/project_form')
const ProfilePage = require('./components/profile_page');
//Auth
const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');
const ProjectActions = require('./actions/project_actions');
const ProjectUtil = require('./util/project_util.js')
const ProjectDetail = require('./components/project_detail')

const appRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SplashPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/discover" component={BrowserApp} />
      <Route path="/discover/:projectId" component={ProjectDetail} />
      <Route path="/build" component={ProjectForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/sign-up" component={LoginForm} />
    </Route>
  </Router>
);

function _ensureLoggedIn(nextstate, replace) {
  if(SessionStore.isUserLoggedIn()) {
    replace('/login');
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  const root = document.getElementById('content');
  ReactDOM.render(appRouter, root);
});
