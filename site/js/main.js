/* UI components and app entry point */

const Logo = ({ k, tx, cls }) =>
  h(
    "div",
    { className: "lg " + (cls || "") },
    LOGO[k] ? h("img", { src: LOGO[k], alt: "" }) : h("span", null, tx || "HK"),
  );


function Play() {
  const box = useRef(),
    els = useRef([]);
  const L = SK.flatMap(([g, l], gi) => l.map((x) => [x, gi])),
    C = ["#7c5cff", "#22d3ee", "#f5c04a", "#ff6bd6", "#5eead4", "#a78bfa"];
  useEffect(() => {
    const W = () => box.current.clientWidth,
      H = () => box.current.clientHeight;
    const it = els.current.map((el) => ({
      el,
      w: el.offsetWidth,
      h: el.offsetHeight,
      x: Math.random() * (W() - 130),
      y: Math.random() * (H() - 50),
      vx: (Math.random() - 0.5) * 2.4,
      vy: (Math.random() - 0.5) * 2.4,
      d: 0,
    }));
    it.forEach((o) => {
      let px, py, ox, oy;
      o.el.onpointerdown = (e) => {
        o.d = 1;
        o.el.setPointerCapture(e.pointerId);
        ox = e.clientX - o.x;
        oy = e.clientY - o.y;
        px = e.clientX;
        py = e.clientY;
      };
      o.el.onpointermove = (e) => {
        if (!o.d) return;
        o.x = Math.max(0, Math.min(W() - o.w, e.clientX - ox));
        o.y = Math.max(0, Math.min(H() - o.h, e.clientY - oy));
        o.vx = (e.clientX - px) * 0.7;
        o.vy = (e.clientY - py) * 0.7;
        px = e.clientX;
        py = e.clientY;
      };
      o.el.onpointerup = () => {
        o.d = 0;
      };
    });
    let raf;
    const step = () => {
      raf = requestAnimationFrame(step);
      const w = W(),
        hh = H();
      it.forEach((o) => {
        if (!o.d) {
          o.x += o.vx;
          o.y += o.vy;
          o.vx *= 0.992;
          o.vy *= 0.992;
          const s = Math.hypot(o.vx, o.vy);
          if (s < 0.6) {
            o.vx *= 1.03;
            o.vy *= 1.03;
            if (s < 0.05) {
              o.vx = Math.random() - 0.5;
              o.vy = Math.random() - 0.5;
            }
          }
          if (o.x < 0 || o.x > w - o.w) {
            o.vx *= -1;
            o.x = Math.max(0, Math.min(w - o.w, o.x));
          }
          if (o.y < 0 || o.y > hh - o.h) {
            o.vy *= -1;
            o.y = Math.max(0, Math.min(hh - o.h, o.y));
          }
        }
        o.el.style.transform = `translate(${o.x}px,${o.y}px) rotate(${o.vx * 3}deg)`;
      });
    };
    step();
    return () => cancelAnimationFrame(raf);
  }, []);
  return h(
    "div",
    { id: "pg", ref: box, className: "panel" },
    h("p", null, "Grab and throw my skills"),
    L.map(([x, g], i) =>
      h(
        "div",
        {
          key: x,
          className: "bub",
          ref: (e) => (els.current[i] = e),
          style: {
            borderColor: C[g],
            color: C[g],
            boxShadow: "0 0 18px " + C[g] + "55",
          },
        },
        x,
      ),
    ),
  );
}

const Star = () =>
  h(
    "svg",
    { viewBox: "0 0 24 24", width: 16, height: 16, "aria-hidden": true },
    h("path", {
      d: "M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z",
      fill: "currentColor",
    }),
  );
const STATS = [
  ["3", "AI products built"],
  ["6", "Leadership and design roles"],
  ["4", "Certifications"],
];
function Name() {
  const A = "MOHAMMED ABDUL",
    B = "HASEEB KHAN",
    [n, setN] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      setN(99);
      return;
    }
    let i = 0,
      iv;
    const st = setTimeout(() => {
      iv = setInterval(() => {
        i++;
        setN(i);
        if (i >= A.length + B.length) clearInterval(iv);
      }, 90);
    }, 800);
    return () => {
      clearTimeout(st);
      clearInterval(iv);
    };
  }, []);
  const a = A.slice(0, n),
    b = B.slice(0, Math.max(0, n - A.length)),
    c = h("span", { className: "cr" });
  return h(
    "div",
    {
      className: "tn",
      role: "img",
      "aria-label": "Mohammed Abdul Haseeb Khan",
    },
    h("div", null, a || "\u200b", n <= A.length && c),
    h("div", null, b || "\u200b", n > A.length && c),
  );
}

function Contact() {
  const [c, setC] = useState(false),
    E = "haseeb.khan1906@gmail.com";
  const ok = () => {
    setC(true);
    setTimeout(() => setC(false), 1800);
  };
  const fb = () => {
    const a = document.createElement("textarea");
    a.value = E;
    document.body.appendChild(a);
    a.select();
    try {
      document.execCommand("copy");
      ok();
    } catch (e) {}
    a.remove();
  };
  const cp = () => {
    try {
      navigator.clipboard.writeText(E).then(ok, fb);
    } catch (e) {
      fb();
    }
  };
  return h(
    "div",
    { className: "cgrid" },
    h(
      "div",
      { className: "panel cmain" },
      h(
        "p",
        { className: "cl" },
        "Have an idea, an internship or a project to build together? Send me a message and I will reply as soon as I can.",
      ),
      h(
        "div",
        { className: "cmail" },
        h("a", { href: "mailto:" + E }, E),
        h(
          "button",
          { onClick: cp, "aria-label": "Copy email address" },
          c ? "Copied" : "Copy",
        ),
      ),
      h("a", { className: "btn p", href: "mailto:" + E }, "Send an email"),
    ),
    h(
      "div",
      { className: "clinks" },
      [
        ["GitHub", "Haseebkhan06", "https://github.com/Haseebkhan06"],
        [
          "LinkedIn",
          "M A Haseeb Khan",
          "https://www.linkedin.com/in/m-a-haseeb-khan-11416a191/",
        ],
      ].map(([n, s, u]) =>
        h(
          "a",
          {
            key: n,
            className: "panel clk",
            href: u,
            target: "_blank",
            rel: "noopener",
          },
          h("b", null, n),
          h("span", null, s),
        ),
      ),
    ),
  );
}

function Tilt({ children, cls }) {
  const e = useRef();
  const mv = (ev) => {
    const b = e.current.getBoundingClientRect(),
      x = (ev.clientX - b.left) / b.width - 0.5,
      y = (ev.clientY - b.top) / b.height - 0.5;
    e.current.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
  };
  return h(
    "div",
    {
      ref: e,
      className: "panel tilt card " + (cls || ""),
      onMouseMove: mv,
      onMouseLeave: () => (e.current.style.transform = ""),
    },
    children,
  );
}
const Sec = (id, title, ...c) =>
  h("section", { id, className: "sec" }, h("h2", null, title), ...c);

function App() {
  const [ri, setRi] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setRi((x) => (x + 1) % ROLES.length), 2400);
    return () => clearInterval(i);
  }, []);
  useEffect(() => {
    const c = document.getElementById("cur"),
      b = document.getElementById("bar");
    const mv = (e) => {
      c.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
      const hh = document.getElementById("hero");
      if (hh) {
        hh.style.setProperty("--px", e.clientX / innerWidth - 0.5);
        hh.style.setProperty("--py", e.clientY / innerHeight - 0.5);
      }
      c.classList.toggle(
        "big",
        !!(e.target.closest && e.target.closest("a,button,.bub,.tilt,input")),
      );
    };
    const sc = () => {
      b.style.transform =
        "scaleX(" +
        scrollY /
          Math.max(1, document.documentElement.scrollHeight - innerHeight) +
        ")";
    };
    addEventListener("mousemove", mv);
    addEventListener("scroll", sc);
    return () => {
      removeEventListener("mousemove", mv);
      removeEventListener("scroll", sc);
    };
  }, []);
  return h(
    React.Fragment,
    null,
    h(Scene),
    h("div", { id: "bar" }),
    h("div", { id: "cur" }),
    h(Chat),
    h(
      "nav",
      null,
      h("b", null, "HK"),
      h(
        "div",
        null,
        [
          "about",
          "projects",
          "skills",
          "experience",
          "education",
          "contact",
        ].map((s) =>
          h(
            "a",
            {
              key: s,
              href: "#" + s,
              className: ["skills", "education"].includes(s) ? "x" : "",
            },
            s[0].toUpperCase() + s.slice(1),
          ),
        ),
      ),
    ),
    h(
      "header",
      { id: "hero", className: "hero2" },
      h(
        "div",
        { className: "hbar" },
        h(
          "div",
          null,
          h("b", null, "COMPUTER SCIENCE ENGINEER"),
          h("span", null, "UI & GRAPHIC DESIGNER"),
        ),
        h("div", { className: "av" }, "AVAILABLE FOR FREELANCE", h(Star)),
      ),
      h(
        "svg",
        { className: "big", viewBox: "0 0 1000 330", "aria-hidden": true },
        h(
          "defs",
          null,
          h(
            "linearGradient",
            { id: "bg1", x1: 0, y1: 0, x2: 0, y2: 1 },
            h("stop", { offset: 0, stopColor: "#9b83ff" }),
            h("stop", {
              offset: 0.55,
              stopColor: "#5b3fe0",
              stopOpacity: 0.75,
            }),
            h("stop", { offset: 1, stopColor: "#7c5cff", stopOpacity: 0 }),
          ),
        ),
        h(
          "text",
          {
            x: 0,
            y: 322,
            textLength: 1000,
            lengthAdjust: "spacingAndGlyphs",
            fill: "url(#bg1)",
          },
          "PORTFOLIO",
        ),
      ),
      h("img", {
        className: "him",
        src: PHOTO,
        alt: "Mohammed Abdul Haseeb Khan",
      }),
      h(
        "div",
        { className: "hl" },
        h("div", { className: "hello" }, "Hello, I\u2019m"),
        h("h1", { className: "h1n" }, h(Name)),
        h(
          "div",
          { className: "rl" },
          "COMPUTER SCIENCE ENGINEER &",
          h("br"),
          "UI / GRAPHIC DESIGNER",
        ),
        h(
          "p",
          { className: "lead" },
          "Fourth-year CSE student at MJCET, Hyderabad. I build AI products for farmers, rural entrepreneurs and flood-rescue teams, and design the brands around them.",
        ),
        h(
          "div",
          { className: "btns" },
          h("a", { className: "btn p", href: "#projects" }, "See my projects"),
          h("a", { className: "btn", href: "#contact" }, "Get in touch"),
        ),
      ),
      h(
        "div",
        { className: "hr" },
        h(
          "div",
          { className: "tg" },
          h("span", { className: "st2" }, h(Star)),
          h("p", null, "Building AI products that solve real problems."),
        ),
        STATS.map(([n, l]) =>
          h(
            "div",
            { className: "sx", key: l },
            h("b", null, n),
            h("span", null, l),
          ),
        ),
      ),
    ),
    h(
      "div",
      { className: "mq", "aria-hidden": true },
      h(
        "div",
        null,
        [...MQ, ...MQ].map((x, i) => h("span", { key: i }, x)),
      ),
    ),
    Sec(
      "about",
      "About me",
      h(
        "div",
        { className: "grid" },
        h(
          "div",
          { className: "panel" },
          h("p", { className: "k" }, "What I do"),
          h(
            "p",
            { style: { color: "var(--mut)" } },
            "I am a fourth-year B.E. student in Computer Science Engineering. My work sits between machine learning, full-stack development and design: I like turning real problems in agriculture, small business and disaster response into products people can actually use, even on a basic phone.",
          ),
        ),
        h(
          "div",
          { className: "panel" },
          h("p", { className: "k" }, "How I work"),
          h(
            "p",
            { style: { color: "var(--mut)" } },
            "Two years of leading design and event teams at CSI, ACM and SU Knowledge Hub taught me to plan, coordinate people and ship on a deadline. As a freelance designer I have handled client projects from brief to delivery.",
          ),
        ),
      ),
    ),
    Sec(
      "projects",
      "Projects",
      h(
        "div",
        { className: "grid" },
        PROJ.map((p) =>
          h(
            Tilt,
            { key: p.n },
            h("span", { className: "st" }, p.s),
            h("h3", null, p.n),
            h("p", { className: "org" }, p.t),
            h(
              "ul",
              null,
              p.b.map((x) => h("li", { key: x }, x)),
            ),
            p.k.map((x) => h("span", { className: "tag", key: x }, x)),
          ),
        ),
      ),
    ),
    Sec(
      "skills",
      "Skills",
      h(Play),
      h(
        "div",
        { className: "grid", style: { marginTop: 22 } },
        SK.map(([t, l]) =>
          h(
            "div",
            { className: "panel", key: t },
            h("p", { className: "k" }, t),
            l.map((x) => h("span", { className: "tag", key: x }, x)),
          ),
        ),
      ),
    ),
    Sec(
      "experience",
      "Experience",
      h(
        "div",
        { className: "tl" },
        EXP.map(([r, o, w, b, tg, lg, n]) =>
          h(
            "div",
            { className: "it" + (n ? " now" : ""), key: r + o },
            h(
              "div",
              { className: "panel xp" },
              h(Logo, { k: lg }),
              h(
                "div",
                null,
                h("div", { className: "when" }, w),
                h("h3", { style: { margin: "2px 0" } }, r),
                h("p", { className: "org" }, o),
                h(
                  "ul",
                  null,
                  b.map((x) => h("li", { key: x }, x)),
                ),
                tg.map((x) => h("span", { className: "tag", key: x }, x)),
              ),
            ),
          ),
        ),
      ),
    ),
    Sec(
      "education",
      "Education & certificates",
      h(
        "div",
        { className: "grid", style: { marginBottom: 22 } },
        h(
          "div",
          { className: "panel" },
          h("div", { className: "when" }, "2023 to present"),
          h("h3", null, "B.E. in Computer Science Engineering"),
          h(
            "p",
            { className: "org" },
            "Muffakham Jah College of Engineering & Technology, Hyderabad",
          ),
        ),
        h(
          "div",
          { className: "panel" },
          h("div", { className: "when" }, "Graduated 2023"),
          h("h3", null, "The Asian School, Bahrain"),
          h("p", { className: "org" }, "10th: 86%, 12th: 75%"),
        ),
      ),
      h(
        "div",
        { className: "grid" },
        CERT.map(([t, i, d, lg]) =>
          h(
            "div",
            { className: "panel cert", key: t },
            h(
              "div",
              { className: "crow" },
              h(Logo, { k: lg, tx: "U", cls: "sm" }),
              h("span", { className: "when" }, d),
            ),
            h("b", null, t),
            h("small", null, i),
          ),
        ),
      ),
    ),
    Sec("contact", "Let\u2019s talk", h(Contact)),
    h("footer", null, "Mohammed Abdul Haseeb Khan, 2026"),
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(h(App));

