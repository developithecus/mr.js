import di from "..";

export default (key) => {
    return (service) => {
        service.key = key;
        di().hold(service);
    }
}