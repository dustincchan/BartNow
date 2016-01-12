var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = require('react-router').IndexRoute;

var Welcome = require('./Welcome');
var Commute = require('./Commute');

var App = React.createClass({
  render: function(){
    return (
      <div className="everything">
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome}/>
    <Route path="commute" component={Commute}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'));
});