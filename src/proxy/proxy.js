import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.rawg.io",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Entferne den '/api'-Präfix
    },
  })
);

app.listen(3001, () => {
  console.log("Proxy server is running on http://localhost:3001");
});
