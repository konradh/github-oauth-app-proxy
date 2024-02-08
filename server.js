import { OAuthApp, createNodeMiddleware } from "@octokit/oauth-app";
import { config } from "dotenv";
import express from "express";
import { exit } from "process";

config();

const clientId = process.env["CLIENT_ID"];
const clientSecret = process.env["CLIENT_SECRET"];

if (!clientId || !clientSecret) {
    console.error("CLIENT_ID and CLIENT_SECRET environment variables must be set");
    exit(1);
}

const app = new OAuthApp({ clientId, clientSecret });

const server = express();
server.use(createNodeMiddleware(app));
server.listen(process.env["PORT"] ?? 3000, process.env["HOST"] ?? "127.0.0.1");