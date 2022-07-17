import '@babel/polyfill';
import MrJS from './mr';
import MemStorage from "./services/MemStorage";
import Router from "./router";
import FileReader from "./services/FileReader";
import di from "./di";
import empty from './polyfill/empty';
import nested from './polyfill/nested';
import PersistentManager from "./persistence/PersistentManager";

global.__clientSide__ = false;

global.empty = empty;
Object.defineProperty(Object.prototype, "nested", {
    writable: false,
    enumerable: false,
    configurable: false,
    value: nested
});

di().register(MemStorage);
di().register(FileReader);
di().register(Router);
di().register(PersistentManager);

export default MrJS;

