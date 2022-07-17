class Model {
    load(data) {
        this._id = data._id;
        for (const field in this) {
            if (data[field]) {
                this[field] = data[field];
            }
        }

        return this;
    }

    getPersistedData() {
        const entityCopy = new this.constructor();
        Object.assign(entityCopy, this);
        delete entityCopy._id;

        return entityCopy;
    }

    toString() {
        return this._id;
    }
}

export default Model;