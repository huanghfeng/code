import http from 'node:http';
import fs from 'node:fs';
import { createServer } from 'vite';
import express from 'express';

const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom"
})

const app = express();
app.use(vite.middlewares);

app.use("*", async (res, req) => {
    res.send("hello world");
})

app.listen(3000, () => {
    console.log("server is running at localhost: 3000");
})