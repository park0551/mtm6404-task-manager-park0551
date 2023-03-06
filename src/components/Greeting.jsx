import React from 'react';

function Greeting(props) {
  return (
  <div>
  <h1>Hello, {props.name}!</h1>
  {props.children}
  </div>);
}

export default Greeting;
