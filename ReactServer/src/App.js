import React from 'react';
import SignIn from './Components/SignIn/SignIn';
import { Helmet } from 'react-helmet';


function App() {
  return (
    <div className="App">
       <Helmet>
        <title>smart-factory</title> 
      </Helmet>
      <SignIn />
    </div>
  );
}

export default App;
