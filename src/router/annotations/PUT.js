import di from "../../di";
import Router from "../Router";

export default path => {
    return async (controller, action) => {
        di().get(Router.key).defineRoute("PUT", path, controller[action]);
    }
}