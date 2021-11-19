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
        let x = {value: namespace + value.name, label: value.displayName};
        if (subfields.length > 0) {
            x.children = subfields;
        }
        fields.push(x);
    }
    return fields;
}

export default schemaparse;