import { createServer } from 'vite';
import express from 'express';
const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom"
})

const app = express();
app.use(vite.middlewares);

app.use("*", async (req, res) => {
    const { render } = await vite.ssrLoadModule("./render.jsx");
    const html = render();
    res.send(html);
})

app.listen(3000, () => {
    console.log("server is running at localhost: 3000");
})