"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_js_1 = require("./db/connection.js");
const app_js_1 = __importDefault(require("./app.js"));
(0, connection_js_1.connectDatabase)()
    .then(() => {
    console.log("Connected to database!");
    app_js_1.default.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map