import extend from "../../polyfill/extend";

let ActiveRecord = null,
    statics = null;

if (!__clientSide__) {
    const ar = require('../../server/model/ActiveRecord');
    ActiveRecord = ar.default;
    statics = ar.statics;
} else {

}

export default (collection, connection) => {
    return (constructor) => {
        constructor.collection = collection;
        connection && (constructor.connection = connection);

        if (!__clientSide__) {
            extend(ActiveRecord, constructor, statics);
        }
    }
}