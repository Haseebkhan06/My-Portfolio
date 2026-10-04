// Vercel serverless function: keeps your Groq key on the server, never in the browser.
const FACTS = `
Name: Mohammed Abdul Haseeb Khan (goes by Haseeb). Fourth-year B.E. student in Computer Science Engineering at Muffakham Jah College of Engineering & Technology (MJCET), Hyderabad (2023 to present).
School: The Asian School, Bahrain. 10th: 86%, 12th: 75%. Graduated 2023.
Skills: Python, C++, Java, JavaScript, SQL; HTML, CSS, React.js, Django, Flask, REST APIs; Machine Learning, AI; Data Structures, Operating Systems, Cryptography & Network Security, Network Analysis, Digital Systems, System Design; Git, GitHub, Figma, Canva; UI/Graphic Design, Branding; Team Coordination, Project Management.
Experience: Secretary of Organisation, CSI MJCET (2026 to present). Associate Chief Coordinator, CSI MJCET (Sep 2025 to present): planned technical events, coordinated faculty, volunteers, logistics, publicity, registrations. Freelance Graphic Designer (Sep 2024 to present): jackets, hoodies, merchandise, yearbooks, posters, social media creatives, client brief to delivery. Design Associate Head, CSI MJCET (Sep 2024 to May 2025). Design Team, SU Knowledge Hub Foundation (Apr 2024 to Jun 2025), Canva and Figma. Design Team, ACM MJCET (Dec 2023 to Sep 2024).
Projects:
- AgriSathi (built): AI smart agriculture platform. Python, Flask, HTML, CSS, JavaScript, ML, Open-Meteo, Open-Elevation. Crop recommendations from environmental and soil analysis; GIS and elevation data to find terrain conditions and landslide-risk areas; market-price insights, chatbot, farmer decision support; designed for users with limited smartphone/internet access.
- Vikraya (in development): AI-powered hyper-local business advisory platform for rural entrepreneurs. React, Tailwind CSS, FastAPI, Supabase, scikit-learn, PyTorch. Analyzes local demand, competition and market conditions; SWOT analysis, scheme recommendations, project costs, EMI plans, financing options; Explainable AI, multilingual NLP, AI Document Vault, Expert-Connect, WhatsApp/IVR access.
- ResQ (in development): emergency and flood rescue mobile platform. React Native, Expo, JavaScript. Emergency reporting and rescue coordination; fast, accessible response.
Certificates: Udemy "Web Development By Doing: HTML/CSS From Scratch" (Dec 2024); Udemy "Complete JavaScript with HTML5, CSS3 from zero to Expert-2024" (17 hours, Sep 2024); GDSC MJCET "GDSC Build Week" workshop (May 2024); GDSC MJCET "AI Genesis" workshop (Feb 2024).
Contact: haseeb.khan1906@gmail.com, github.com/Haseebkhan06, linkedin.com/in/m-a-haseeb-khan-11416a191.`;

const SYSTEM = `You are the assistant on Haseeb's portfolio website. Answer visitors' questions about Haseeb in the third person, in 1 to 4 short sentences, friendly and professional. Use ONLY the facts below. If something is not covered (CGPA, salary, personal life, anything else), say you don't have that information and suggest emailing him. Politely decline unrelated requests. Never invent details.
FACTS:${FACTS}`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!process.env.GROQ_API_KEY) return res.status(500).json({ error: 'GROQ_API_KEY not set' });
  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const messages = (body.messages || [])
    .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-10)
    .map(m => ({ role: m.role, content: m.content.slice(0, 500) }));
  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + process.env.GROQ_API_KEY },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        temperature: 0.3,
        max_tokens: 300,
        messages: [{ role: 'system', content: SYSTEM }, ...messages],
      }),
    });
    if (!r.ok) return res.status(502).json({ error: 'Groq error ' + r.status });
    const data = await r.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content?.trim() || '' });
  } catch (e) {
    res.status(500).json({ error: 'Request failed' });
  }
};
