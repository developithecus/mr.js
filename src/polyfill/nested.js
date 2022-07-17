import empty from "./empty";

function nested(property) {
    const paths = property.split(".");
    let tempValue = this;
    for (let index in paths) {
        const path = paths[index];

        tempValue = tempValue[path];
        if (empty(tempValue) && !Array.isArray(tempValue)) {
            return undefined;
        }
    }

    return tempValue;
}

export default nested;