import { render } from '@testing-library/react';
import React, { useState } from 'react';
import './App.css';

function Streamerator() {

  const [locatorUrl, setLocatorUrl] = useState("");
  const [fields, setFields] = useState([]);
  const [schema, setSchema] = useState(null);

  const handleUrlUpdate = () => {
    // request schema and set schema
    var headers = new Headers();

    headers.append('accept', 'application/json');
    fetch(locatorUrl, { headers: headers })
      .then((response) => response.json())
      .then((responseJson) => {
        setSchema(responseJson.schema);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleLocatorUrlChange = (event) => {
    //console.log(event);
    setLocatorUrl(event.target.value);
  }
    
  return (
    <div>
      <div>
        Locator Url:
        <input type="text" className="w-96 space-x-4" onChange={handleLocatorUrlChange} value={locatorUrl}></input>
        <input type="button" name="updateUrl" onClick={handleUrlUpdate} value="Update URL"></input> 
      </div>
      <div>
        <pre>
          {JSON.stringify(schema)}
        </pre>
      </div>
    </div>
  );
}

export default Streamerator;
