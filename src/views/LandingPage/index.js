import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <>
    <p>Landing Page</p>
    <Link to="/authentication"><p>Go to authentication</p></Link>
    <Link to="/artist/123"><p>Go artist public page</p></Link>
  </>
);

export default LandingPage;
