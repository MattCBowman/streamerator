function schemaparse(schema) {
    var fields = []
    if (schema == null) {
        return fields;
    }

    for (const [key, value] of Object.entries(schema)) {
        fields.push({name: value.name, displayName: value.displayName, type:value.typeId});
    }
    
    return fields;
}

export default schemaparse;