"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = exports.isValidDate = void 0;
var isValidDate_1 = require("./isValidDate");
Object.defineProperty(exports, "isValidDate", { enumerable: true, get: function () { return isValidDate_1.isValidDate; } });
const hello = (name) => {
    return `hello my name ${name}`;
};
exports.hello = hello;
