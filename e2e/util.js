"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseText = exports.getClient = exports.MCPClient = void 0;
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/client/stdio.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MCPClient {
    mcp;
    constructor() {
        this.mcp = new index_js_1.Client({
            name: "bnbchain-mcp-test-client",
            version: "1.0.0"
        });
    }
    async connect() {
        try {
            const transport = new stdio_js_1.StdioClientTransport({
                command: process.env.NODE,
                args: ["dist/index.js"],
                env: {
                    PRIVATE_KEY: process.env.PRIVATE_KEY || "",
                    LOGLEVEL: "debug"
                }
            });
            await this.mcp.connect(transport);
            return this.mcp;
        }
        catch (e) {
            console.error("Failed to connect to MCP server: ", e);
            throw e;
        }
    }
}
exports.MCPClient = MCPClient;
let client;
const getClient = async () => {
    if (!client) {
        const mcp = new MCPClient();
        client = await mcp.connect();
    }
    return client;
};
exports.getClient = getClient;
const parseText = (text) => {
    try {
        return JSON.parse(text);
    }
    catch (e) {
        return text;
    }
};
exports.parseText = parseText;
