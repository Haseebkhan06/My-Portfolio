/* Three.js animated background scene */

function Scene() {
  const ref = useRef();
  useEffect(() => {
    const r = new THREE.WebGLRenderer({
      canvas: ref.current,
      antialias: true,
      alpha: true,
    });
    r.setPixelRatio(Math.min(devicePixelRatio, 2));
    const sc = new THREE.Scene();
    sc.fog = new THREE.FogExp2(0x05060f, 0.016);
    const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
    const L1 = new THREE.PointLight(0x7c5cff, 2.4, 70);
    L1.position.set(6, 5, 6);
    const L2 = new THREE.PointLight(0x22d3ee, 2.2, 70);
    L2.position.set(-7, -3, 4);
    sc.add(L1, L2, new THREE.AmbientLight(0x404070, 0.9));
    const core = new THREE.Group();
    sc.add(core);
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.6, 0.45, 200, 32),
      new THREE.MeshStandardMaterial({
        color: 0x6a4cff,
        metalness: 0.85,
        roughness: 0.22,
        emissive: 0x1d1075,
      }),
    );
    const w = (g, c, o) =>
      new THREE.Mesh(
        g,
        new THREE.MeshBasicMaterial({
          color: c,
          wireframe: true,
          transparent: true,
          opacity: o,
        }),
      );
    const i1 = w(new THREE.IcosahedronGeometry(4, 1), 0x22d3ee, 0.28),
      i2 = w(new THREE.OctahedronGeometry(5.2), 0xf5c04a, 0.16);
    core.add(knot, i1, i2);
    const N = 3000,
      P = new Float32Array(N * 3),
      C = new Float32Array(N * 3),
      a = new THREE.Color(0x7c5cff),
      b = new THREE.Color(0x22d3ee);
    for (let i = 0; i < N; i++) {
      const d = 8 + Math.random() * 50,
        t = Math.random() * 6.283,
        p = Math.acos(2 * Math.random() - 1);
      P.set(
        [
          d * Math.sin(p) * Math.cos(t),
          d * Math.sin(p) * Math.sin(t),
          d * Math.cos(p),
        ],
        i * 3,
      );
      const c = a.clone().lerp(b, Math.random());
      C.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(P, 3));
    g.setAttribute("color", new THREE.BufferAttribute(C, 3));
    const pts = new THREE.Points(
      g,
      new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    sc.add(pts);
    const G = [
        new THREE.OctahedronGeometry(0.7),
        new THREE.TetrahedronGeometry(0.8),
        new THREE.TorusGeometry(0.55, 0.18, 12, 32),
        new THREE.BoxGeometry(0.9, 0.9, 0.9),
        new THREE.IcosahedronGeometry(0.65),
      ],
      cols = [0x7c5cff, 0x22d3ee, 0xf5c04a],
      fl = [];
    for (let i = 0; i < 18; i++) {
      const m =
        i % 3
          ? new THREE.Mesh(
              G[i % 5],
              new THREE.MeshStandardMaterial({
                color: cols[i % 3],
                metalness: 0.7,
                roughness: 0.3,
              }),
            )
          : w(G[i % 5], 0x22d3ee, 0.8);
      const an = (i / 18) * 6.283,
        rr = 9 + Math.random() * 8;
      m.position.set(
        Math.cos(an) * rr,
        (Math.random() - 0.5) * 16,
        Math.sin(an) * rr,
      );
      m.userData = {
        y: m.position.y,
        s: 0.2 + Math.random() * 0.6,
        o: Math.random() * 6,
      };
      sc.add(m);
      fl.push(m);
    }
    const rg = [0x7c5cff, 0x22d3ee, 0xf5c04a].map((c, i) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(6 + i * 0.9, 0.035, 8, 160),
        new THREE.MeshBasicMaterial({
          color: c,
          transparent: true,
          opacity: 0.7,
        }),
      );
      m.rotation.set(i * 1.1, i * 0.7, 0);
      core.add(m);
      return m;
    });
    let mx = 0,
      my = 0,
      sp = 0,
      tp = 0,
      raf,
      pulse = 0;
    addEventListener("click", () => (pulse = 1));
    const rm = matchMedia("(prefers-reduced-motion:reduce)").matches,
      gl = document.getElementById("glow");
    const rs = () => {
      r.setSize(innerWidth, innerHeight, false);
      cam.aspect = innerWidth / innerHeight;
      cam.updateProjectionMatrix();
    };
    rs();
    const mm = (e) => {
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
      gl.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    };
    const sd = () => {
      tp =
        scrollY /
        Math.max(1, document.documentElement.scrollHeight - innerHeight);
    };
    addEventListener("resize", rs);
    addEventListener("mousemove", mm);
    addEventListener("scroll", sd);
    sd();
    const clk = new THREE.Clock();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const t = clk.getElapsedTime() * (rm ? 0.1 : 1);
      sp += (tp - sp) * 0.05;
      knot.rotation.x = t * 0.35;
      knot.rotation.y = t * 0.5;
      i1.rotation.y = -t * 0.12;
      i1.rotation.x = t * 0.08;
      i2.rotation.z = t * 0.1;
      pts.rotation.y = t * 0.012 + sp * 1.5;
      fl.forEach((m) => {
        m.rotation.x = t * m.userData.s;
        m.rotation.y = t * m.userData.s * 0.8;
        m.position.y = m.userData.y + Math.sin(t * 0.6 + m.userData.o) * 0.8;
      });
      const an = sp * Math.PI * 3,
        rad = 11.5 - Math.sin(sp * Math.PI) * 3,
        asp = innerWidth / innerHeight,
        ox = 0;
      cam.position.set(
        Math.sin(an) * rad + ox + mx * 1.6,
        3 - sp * 6 + Math.sin(sp * 9) * 1.2 - my * 1.4,
        Math.cos(an) * rad,
      );
      cam.lookAt(ox, 0, 0);
      rg.forEach((m, i) => {
        m.rotation.x += 0.003 * (i + 1);
        m.rotation.y += 0.002 * (3 - i);
      });
      const k = 1 + Math.min(sp * 7, 1) * 0.2 + pulse * 0.3;
      pulse *= 0.93;
      core.scale.setScalar(k);
      r.render(sc, cam);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", rs);
      removeEventListener("mousemove", mm);
      removeEventListener("scroll", sd);
      r.dispose();
    };
  }, []);
  return null;
}

