# Haseeb Khan | Portfolio

Static site (React via CDN + Three.js) with one serverless endpoint.

```
index.html     page shell
css/style.css  styles
js/images.js   photo + logos embedded as base64
js/data.js     content (projects, skills, experience, certificates)
js/scene.js    animated background
js/chat.js     chat widget
js/main.js     components + app entry
api/chat.js    Vercel serverless function (Groq), key stays on the server
```

## Deploy
1. Push to GitHub.
2. Import in Vercel, Framework: Other.
3. Add env var `GROQ_API_KEY`, then deploy.

Local test: `npm i -g vercel` then `vercel dev`.
