export default (dependencies) => {
    return (service) => {
        service.dependencies = dependencies;
    }
}