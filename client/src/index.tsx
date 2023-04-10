import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
};
// @ts-expect-error
ReactDOM.render(<App />, document.getElementById('root'));
