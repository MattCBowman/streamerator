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
    setExpanded(expanded);
  }

  const json = JSON.stringify(selectedFields, null, "  ");

  return (
    <div>
      <div>
        Locator Url:
        <input type="text" name="locatorUrl" onChange={handleLocatorUrlChange} value={locatorUrl}></input>
        <input type="button" name="updateSchema" onClick={handleUpdateSchema} value="Update Schema"></input> 
      </div>
      <p>
        <textarea cols="50" rows="10" value={json}></textarea>  
      </p>
      <p>
      <CheckboxTree
        nodes={schemaparse(schema)}
        checked={selectedFields}
        expanded={expanded}
        onCheck={(checked) => handleChecked(checked)}
        onExpand={handleExpanded}
        iconsClass="fa5"
        checkModel="leaf"
        showExpandAll={true}
      />
      </p>
    </div>
  );
}

export default Streamerator;
