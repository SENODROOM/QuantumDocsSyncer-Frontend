# QuantumLangCodeExplaination — Frontend

## Run locally

```bash
cd qlce-frontend
npm install
npm run dev
```

Opens at http://localhost:3000

The frontend reads `public/config.js` to know where the backend is.
By default it points to `http://localhost:4000`.

## Deploy to Vercel

```bash
vercel --prod
```

No environment variables needed — it's a static site.

## Point to deployed backend

After deploying the backend, edit `public/config.js`:

```js
window.QLCE_CONFIG = {
  BACKEND_URL: "https://your-backend.vercel.app",
};
```

Then redeploy the frontend.
