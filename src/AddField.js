import React, { useState } from 'react';
import './App.css';

function AddField(props) {

    const [selectedField, setSelectedField] = useState(null);
    const [addFieldEnabled, setAddFieldEnabled] = useState(false);

    const handleSelectedFieldChange = (event) => {
        setSelectedField(event.target.value);
        setAddFieldEnabled(event.target.value !== "");
    }
    
    let options = props.fields.map((field) => (
        <option key={field.name} value={field.name}>{field.displayName} ({field.name})</option>
    ));

  return (
    <div>
        <select onChange={handleSelectedFieldChange}>
            <option value="">Select a field</option>
            {options}
        </select>
        <input type="button" disabled={!addFieldEnabled} onClick={() => props.onAddField(selectedField)} value="Add Field"></input>
    </div>
  );
}

export default AddField;
