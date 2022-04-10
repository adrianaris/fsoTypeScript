import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Welcome = props => {
  return <h1>Hello, {props.name}</h1>
};

Welcome.propTypes = {
  name: PropTypes.string
};

const element = <Welcome name="Sara" />;

ReactDOM.render(element, document.getEmelementById("root"));
