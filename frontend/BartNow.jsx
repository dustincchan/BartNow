var React = require('react');
var ReactDOM = require('react-dom');

var Welcome = require('./Welcome');
var Commute = require('./Commute');


document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Welcome/>, document.getElementById('root'));
});