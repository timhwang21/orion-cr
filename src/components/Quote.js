import React from 'react';
import P from 'prop-types';

import './Quote.css';

const Quote = ({ children }) => <div className="Quote">{children}</div>;

Quote.displayName = 'Quote';

Quote.propTypes = {
  children: P.any,
};

export default Quote;
