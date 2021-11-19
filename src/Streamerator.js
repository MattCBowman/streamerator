import React, { useState } from 'react';
import AddField from './AddField';
import './App.css';
import schemaparse from './schemaparse';

function Streamerator() {

  const [locatorUrl, setLocatorUrl] = useState("https://teamangus.mattcbowman.com/search");
  const [schema, setSchema] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);

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

  const handleAddField = (field) => {
    setSelectedFields(selectedFields => [...new Set([...selectedFields, field])].filter(f => f !== null));
  }

  const handleLocatorUrlChange = (event) => {
    setLocatorUrl(event.target.value);
  }

  const handleDeleteSelectedField = (field) => {
    setSelectedFields(selectedFields => selectedFields.filter(f => f !== field));
  }

  const getFieldForFieldName = (efs, name) => { 
    return efs.find(ef => ef.name === name);
  };

  const eligibleFields = schemaparse(schema);

  const selectedFieldDisplay = selectedFields
    .map(field => getFieldForFieldName(eligibleFields, field))
    .map(field => (
      <li key={field}>
        <input type="button" value="Delete" onClick={() => handleDeleteSelectedField(field.name)}></input>&nbsp;
        {field.displayName} ({field.name})
      </li>
    ));

  return (
    <div>
      <div>
        Locator Url:
        <input type="text" className="w-96 space-x-4" name="locatorUrl" onChange={handleLocatorUrlChange} value={locatorUrl}></input>
        <input type="button" name="updateSchema" onClick={handleUpdateSchema} value="Update Schema"></input> 
      </div>
      <div>
        <AddField fields={eligibleFields} onAddField={handleAddField}></AddField>
      </div>
      <h2>Selected fields</h2>
      <ul>
        {selectedFieldDisplay}
      </ul>
    </div>
  );
}

export default Streamerator;
