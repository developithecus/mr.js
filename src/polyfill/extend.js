export default (parent, child, statics) => {
    Object.setPrototypeOf(child.prototype, parent.prototype);
    for (const key in statics) {
        child[key] = statics[key];
    }
}