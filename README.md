# Mohammed Abdul Haseeb Khan | Portfolio

Personal portfolio of **Haseeb Khan**, a fourth-year Computer Science Engineering student at MJCET, Hyderabad, who builds AI products and designs the brands around them.

**Live site:** https://my-portfolio-haseeb-4c1f.vercel.app

---

## Highlights

- Animated 3D background built with Three.js
- Interactive sections: About, Projects, Skills, Experience, Education, Certifications and Contact
- **"Ask my AI" chat assistant** that answers visitor questions about me, powered by Groq (Llama 3.3 70B) through a serverless function, with a local keyword-based fallback if the API is unavailable
- API key stays on the server and is never exposed in the browser
- Fully responsive, with a custom cursor glow and smooth scroll animations
- Photo and logos are embedded in the code, so there are no external image files to manage

## Tech stack

| Area | Tools |
| --- | --- |
| Frontend | HTML, CSS, JavaScript, React 18 (via CDN) |
| Graphics | Three.js |
| Backend | Vercel Serverless Function (Node.js) |
| AI | Groq API, Llama 3.3 70B Versatile |
| Hosting | Vercel |

## Project structure

```
index.html        page shell
css/style.css     all styles
js/images.js      photo and logos embedded as base64
js/data.js        content: projects, skills, experience, certificates
js/scene.js       Three.js animated background
js/chat.js        skills marquee and chat widget
js/main.js        UI components and app entry point
api/chat.js       Vercel serverless function (Groq)
```

## Run locally

```bash
npm i -g vercel
vercel dev
```

Create a `.env` file in the project root:

```
GROQ_API_KEY=your_key_here
```

Open the local URL that Vercel prints. Opening `index.html` directly (or with Live Server) also works, but the chat will use its built-in fallback answers because `/api/chat` only runs under Vercel.

## Deploy

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com) with **Framework Preset: Other**.
3. Add the environment variable `GROQ_API_KEY`.
4. Deploy. Redeploy if you add the variable afterwards.

Optional: set `GROQ_MODEL` to use a different Groq model.

## Featured projects

- **AgriSathi:** AI smart agriculture platform with crop recommendations, terrain and landslide-risk analysis, market-price insights and a farmer chatbot (Python, Flask, ML).
- **Vikraya:** AI-powered hyper-local business advisory platform for rural entrepreneurs, in development (React, FastAPI, Supabase, scikit-learn, PyTorch).
- **ResQ:** emergency and flood rescue mobile platform, in development (React Native, Expo).

## Contact

- Email: haseeb.khan1906@gmail.com
- GitHub: [github.com/Haseebkhan06](https://github.com/Haseebkhan06)
- LinkedIn: [linkedin.com/in/m-a-haseeb-khan-11416a191](https://linkedin.com/in/m-a-haseeb-khan-11416a191)

---

&copy; 2026 Mohammed Abdul Haseeb Khan
