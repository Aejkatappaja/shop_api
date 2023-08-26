"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ credentials: true }));
const server = http_1.default.createServer(app);
app.get("/", (req, res) => {
    return res.send("Welcome to my API !");
});
app.all("*", (req, res) => {
    return res.status(404).json("Not Found");
});
// require.main === module && --- -> mandatory for tests.
server.listen(4000, () => {
    console.log(`⚡️[server]: Server started 🚀 running at http://localhost:4000`);
});
exports.default = app;
//# sourceMappingURL=index.js.map