import React, { useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import schemaparse from './schemaparse';

function Streamerator() {

  const [locatorUrl, setLocatorUrl] = useState("https://teamangus.mattcbowman.com/search");
  const [schema, setSchema] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const handleUpdateSchema = () => {
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
    setLocatorUrl(event.target.value);
  }

  const handleChecked = (checked) => {
    console.log(checked);
    setSelectedFields(checked);
  }

  const handleExpanded = (expanded) => {
    console.log(expanded);
    setExpanded(expanded);
  }

  const eligibleFields = schemaparse(schema);
  console.log(selectedFields);

  return (
    <div>
      <div>
        Locator Url:
        <input type="text" className="w-96 space-x-4" name="locatorUrl" onChange={handleLocatorUrlChange} value={locatorUrl}></input>
        <input type="button" name="updateSchema" onClick={handleUpdateSchema} value="Update Schema"></input> 
      </div>
      <CheckboxTree
        nodes={eligibleFields}
        checked={selectedFields}
        expanded={expanded}
        onCheck={handleChecked}
        onExpand={handleExpanded}
      />
    </div>
  );
}

export default Streamerator;
