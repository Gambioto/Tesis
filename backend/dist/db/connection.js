"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
const mongoose_1 = require("mongoose");
async function connectDatabase() {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error('Cannot connect to MongoDB');
    }
}
async function disconnectDatabase() {
    try {
        await (0, mongoose_1.disconnect)();
    }
    catch (error) {
        console.log(error);
        throw new Error('Cannot disconnect MongoDB');
    }
}
//# sourceMappingURL=connection.js.map