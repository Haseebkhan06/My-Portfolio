/* Skills marquee + chat widget (calls /api/chat, falls back to local answers) */

const MQ = [
  "Machine Learning",
  "React",
  "Python",
  "UI Design",
  "Flask",
  "System Design",
  "Branding",
  "Cryptography",
  "C++",
  "REST APIs",
];
const DEF =
  "I can only speak about Haseeb\u2019s studies, projects, skills, experience and certificates. Try one of those, or email him at haseeb.khan1906@gmail.com.";
const KB = [
  [
    /agri|farm|crop/i,
    "AgriSathi is an AI-powered smart agriculture platform (Python, Flask, JavaScript, machine learning, Open-Meteo, Open-Elevation). It recommends crops from weather, soil and terrain data, flags landslide-risk areas using GIS and elevation data, and adds market prices and a chatbot. It is designed for farmers with limited smartphone or internet access.",
  ],
  [
    /vikraya|business|entrepreneur|rural/i,
    "Vikraya is an AI advisory platform in development (React, Tailwind, FastAPI, Supabase, scikit-learn, PyTorch). It helps rural entrepreneurs check demand, competition and feasibility, and provides SWOT analysis, project costs, EMI plans, scheme matches, explainable AI, multilingual NLP and WhatsApp/IVR access.",
  ],
  [
    /resq|flood|rescue|emergenc/i,
    "ResQ is a mobile app in development (React Native, Expo) for emergency reporting and flood rescue coordination, built for fast, accessible response.",
  ],
  [
    /project|built|build/i,
    "Haseeb\u2019s projects: AgriSathi (AI for farmers), Vikraya (AI business advisor for rural entrepreneurs, in development) and ResQ (flood rescue app, in development). Ask about any of them for details.",
  ],
  [
    /skill|tech|language|stack|know/i,
    "Languages: Python, C++, Java, JavaScript, SQL. Web: HTML, CSS, React.js, Django, Flask, REST APIs. AI/ML. Core CS: data structures, operating systems, cryptography and network security, system design. Tools: Git, GitHub, Figma, Canva. Design: UI/graphic design and branding.",
  ],
  [
    /stud|educat|college|degree|school|mjcet|cgpa|marks|percent|qualif/i,
    "Haseeb is pursuing a B.E. in Computer Science Engineering at Muffakham Jah College of Engineering & Technology (MJCET), Hyderabad (2023 to present). Before that he studied at The Asian School, Bahrain: 10th 86%, 12th 75%, graduating in 2023.",
  ],
  [
    /experience|role|club|csi|acm|intern|freelanc|design|lead/i,
    "He is Secretary of Organisation (2026 to present) and was Associate Chief Coordinator (Sep 2025 to present) at CSI MJCET, and Design Associate Head there (2024-25). He has freelanced as a graphic designer since Sep 2024 (merch, yearbooks, posters, social media), and was on the design teams of SU Knowledge Hub Foundation and ACM MJCET.",
  ],
  [
    /cert|course|udemy|gdsc|workshop/i,
    "Certificates: Udemy HTML/CSS From Scratch (Dec 2024), Udemy Complete JavaScript with HTML5 and CSS3 (Sep 2024), GDSC Build Week (May 2024) and GDSC AI Genesis (Feb 2024).",
  ],
  [
    /contact|email|reach|linkedin|github|hire/i,
    "Email: haseeb.khan1906@gmail.com. GitHub: github.com/Haseebkhan06. LinkedIn: linkedin.com/in/m-a-haseeb-khan-11416a191.",
  ],
  [
    /who|about|haseeb|yourself|hi\b|hello/i,
    "Haseeb is a fourth-year Computer Science student at MJCET, Hyderabad, who builds AI products for agriculture, rural business and disaster response, and works as a freelance designer.",
  ],
];
const SUG = [
  "What has Haseeb studied?",
  "Tell me about his projects",
  "What are his skills?",
  "How can I contact him?",
];

function Chat() {
  const [o, setO] = useState(false),
    [m, setM] = useState([
      {
        r: "assistant",
        c: "Hi! I am Haseeb\u2019s AI assistant. Ask me about his studies, projects, skills or experience.",
      },
    ]),
    [v, setV] = useState(""),
    [b, setB] = useState(false),
    end = useRef();
  useEffect(() => {
    end.current && end.current.scrollIntoView({ block: "end" });
  }, [m, o, b]);
  const send = async (x) => {
    const t = (x || v).trim();
    if (!t || b) return;
    setV("");
    const nm = [...m, { r: "user", c: t }];
    setM(nm);
    setB(true);
    let a;
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nm.slice(1).map((y) => ({ role: y.r, content: y.c })),
        }),
      });
      if (!r.ok) throw 0;
      a = (await r.json()).reply;
      if (!a) throw 0;
    } catch (e) {
      await new Promise((z) => setTimeout(z, 500));
      const k = KB.find((y) => y[0].test(t));
      a = k ? k[1] : DEF;
    }
    setM((y) => [...y, { r: "assistant", c: a }]);
    setB(false);
  };
  return h(
    React.Fragment,
    null,
    o &&
      h(
        "div",
        {
          className: "panel chp",
          role: "dialog",
          "aria-label": "Chat about Haseeb",
        },
        h("div", { className: "chh" }, "Ask about Haseeb"),
        h(
          "div",
          { className: "chm" },
          m.map((y, i) => h("div", { key: i, className: "msg " + y.r }, y.c)),
          b && h("div", { className: "msg assistant" }, "Typing..."),
          h("div", { ref: end }),
        ),
        m.length < 2 &&
          h(
            "div",
            { className: "sug" },
            SUG.map((s) => h("button", { key: s, onClick: () => send(s) }, s)),
          ),
        h(
          "div",
          { className: "chi" },
          h("input", {
            value: v,
            placeholder: "Ask a question",
            onChange: (e) => setV(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && send(),
          }),
          h("button", { onClick: () => send() }, "Send"),
        ),
      ),
    h(
      "button",
      { className: "chb", onClick: () => setO(!o) },
      o ? "Close chat" : "Ask my AI",
    ),
  );
}

