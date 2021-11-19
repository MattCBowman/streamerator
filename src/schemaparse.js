function schemaparse(schema) {
    return parseFields(schema, "");
}

function parseFields(properties, namespace) {
    var fields = [] 
    if (properties == null) {
        return fields;
    }
    for (const [key, value] of Object.entries(properties)) {
        var subfields = [];
        if (value.type != null && 'structType' in value.type) {
            subfields = parseFields(value.type.structType.property, namespace + value.name + '.');
        }  
        fields.push({name: namespace + value.name, displayName: value.displayName, type:value.typeId, subfields:subfields});
    }
    return fields;
}

export default schemaparse;