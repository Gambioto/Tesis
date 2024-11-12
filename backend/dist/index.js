"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_js_1 = require("./db/connection.js");
const user_model_js_1 = __importDefault(require("./models/user.model.js"));
const app_js_1 = __importDefault(require("./app.js"));
(0, connection_js_1.connectDatabase)()
    .then(() => {
    console.log("Connected to database!");
    app_js_1.default.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
    .catch((err) => console.log(err));
app_js_1.default.get('/', function (req, res) {
    res.send('Hello World');
});
app_js_1.default.post('/api/users', async (req, res) => {
    try {
        const user = await user_model_js_1.default.create(req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//# sourceMappingURL=index.js.map