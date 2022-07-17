import di from "../../di";
import Model from "../../shared/Model";
import empty from "../../polyfill/empty";
import { ObjectId } from "mongodb";
import Exception from "../../exception/Exception";

// @todo
class ActiveRecord extends Model {
    get connection() {
        return this.constructor.connection ?
            di().get(this.constructor.connection).getConnection() :
            di().getDefaultConnection();
    }

    async save() {
        if (empty(this._id)) {
            this._id = new ObjectId();
        }

        this.connection.collection(this.constructor.collection).replaceOne({_id: this._id}, this.getPersistedData(), {
            upsert: true
        });
    }

    async remove() {
        return new Promise((resolve, reject) => {
            if (empty(this._id)) {
                reject(new Exception('Looks like the entity you\'re trying to remove is not persisted.'));
            }

            this.connection.collection(this.constructor.collection).deleteOne({ _id: this._id }, (err, obj) => {
                if (err) {
                    reject(err);
                } else resolve(obj.result);
            });
        });
    }
}

export default ActiveRecord;

export const statics = {
    find: async function(query) {
        // in this function, `this` object will always be a class constructor
        return new Promise((resolve, reject) => {
            const connection = this.connection ? di().get(this.connection).getConnection() : di().getDefaultConnection();
            connection.collection(this.collection).find(query).toArray((err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.map(entry => new this().load(entry)));
                }
            });
        });
    }
};