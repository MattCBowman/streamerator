import { render } from '@testing-library/react';
import React, { useState } from 'react';
import './App.css';

function Streamerator() {

  const [locatorUrl, setLocatorUrl] = useState("");
  const [fields, setFields] = useState([]);
  const [schema, setSchema] = useState(null);

  const handleUrlUpdate = () => {
    // request schema and set schema
    console.log("Handling Update URL Click: " + locatorUrl);
  }

  const handleLocatorUrlChange = (event) => {
    //console.log(event);
    setLocatorUrl(event.target.value);
  }
    
  return (
    <div>
      Locator Url:
      <input type="text" onChange={handleLocatorUrlChange} value={locatorUrl}></input>
      <input type="button" name="updateUrl" onClick={handleUrlUpdate} value="Update URL"></input> 
    </div>
  );
}

export default Streamerator;
