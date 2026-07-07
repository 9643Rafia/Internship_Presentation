import * as data from "./data.js";

/* ============ small helpers ============ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  return e;
}
function icon(name, cls = "") {
  return `<i data-lucide="${name}" class="${cls}"></i>`;
}
function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}
function initials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

/* ============ NAV ============ */
function renderNav() {
  const links = $("#nav-links");
  const mobile = $("#mobile-menu");
  data.navItems.forEach((item) => {
    const btn = el("button", "", `${icon(item.icon, "size-4")}<span>${item.label}</span>`);
    btn.dataset.target = item.id;
    btn.addEventListener("click", () => scrollToSection(item.id));
    links.appendChild(btn);

    const mbtn = el("button", "", `${icon(item.icon, "size-5")}<span>${item.label}</span>`);
    mbtn.dataset.target = item.id;
    mbtn.addEventListener("click", () => {
      scrollToSection(item.id);
      mobile.classList.remove("open");
    });
    mobile.appendChild(mbtn);
  });
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

function setupNavScrollBehavior() {
  const nav = $("#site-nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  const sections = data.navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
  const navButtons = $$("#nav-links button, #mobile-menu button");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navButtons.forEach((b) => b.classList.toggle("active", b.dataset.target === entry.target.id));
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((s) => io.observe(s));
}

function setupMenuToggle() {
  const menuBtn = $("#menu-toggle");
  const mobile = $("#mobile-menu");
  menuBtn.addEventListener("click", () => {
    const open = mobile.classList.toggle("open");
    menuBtn.innerHTML = open ? icon("x") : icon("menu");
    refreshIcons();
  });
}

function setupThemeToggle() {
  const btn = $("#theme-toggle");
  const stored = localStorage.getItem("theme");
  if (stored === "dark") document.documentElement.classList.add("dark");
  updateThemeIcon();
  btn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
    updateThemeIcon();
  });
  function updateThemeIcon() {
    btn.innerHTML = document.documentElement.classList.contains("dark") ? icon("sun") : icon("moon");
    refreshIcons();
  }
}

$$(".nav-jump").forEach((b) => b.addEventListener("click", () => scrollToSection(b.dataset.target)));

/* ============ REVEAL ON SCROLL ============ */
function setupReveal() {
  $$(".reveal, .reveal-auto").forEach((elm) => elm.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add("is-visible"), Number(delay));
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((elm) => io.observe(elm));
  // .rv elements (used by the RCA Assignment section) fade in the same way;
  // their d1..d5 classes handle stagger via CSS transition-delay.
  const ioRv = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          ioRv.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$(".rv").forEach((elm) => ioRv.observe(elm));
}

/* ============ COUNTER ============ */
function animateCounter(node, value, suffix = "") {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          node.textContent = Math.round(eased * value) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.4 }
  );
  io.observe(node);
}
function statCard(label, value, suffix) {
  const card = el("div", "stat-card glass shadow-soft reveal");
  const v = el("p", "stat-value text-gradient", "0");
  card.appendChild(v);
  card.appendChild(el("p", "stat-label", label));
  animateCounter(v, value, suffix);
  return card;
}

/* ============ PARTICLE BACKGROUND (hero) ============ */
function setupParticles() {
  const canvas = $("#particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  function init() {
    resize();
    particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? "255,166,48" : "0,167,225",
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},0.5)`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize);
  init();
  draw();
}

/* ============ TILT 3D ============ */
function setupTilt(node, max = 12) {
  if (!node) return;
  node.style.transformStyle = "preserve-3d";
  node.addEventListener("mousemove", (e) => {
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(1.02)`;
  });
  node.addEventListener("mouseleave", () => {
    node.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale(1)";
  });
}

/* ============ HERO ============ */
function renderHero() {
  $("#hero-org-year").textContent = `${data.siteConfig.organization} · ${data.siteConfig.year}`;
  $("#hero-team-name").textContent = data.siteConfig.teamName;
  const stats = $("#hero-stats");
  data.conclusionStats.forEach((s) => stats.appendChild(statCard(s.label, s.value, s.suffix)));
  setupTilt($("#hero-tilt"), 10);
}

/* ============ ABOUT ============ */
function renderAbout() {
  $("#about-mission").textContent = data.teamIntro.mission;
  $("#about-team-name").textContent = data.teamIntro.name;

  const members = $("#team-members");
  data.teamMembers.forEach((m, i) => {
    const card = el("article", `member-card glass card-hover ${m.theme} reveal`);
    card.dataset.delay = i * 120;
    card.innerHTML = `
      <div class="head">
        <div class="avatar">${initials(m.name)}</div>
        <div>
          <h3 class="name">${m.name}</h3>
          <p class="role">${m.role}</p>
        </div>
      </div>
      <div class="skills">${m.skills.map((s) => `<span class="tech-tag">${s}</span>`).join("")}</div>
      ${m.socials ? `<div class="socials">${m.socials.map((s) => `<a href="${s.href}">${s.label}</a>`).join("")}</div>` : ""}
    `;
    members.appendChild(card);
  });

  const timeline = $("#timeline-stops");
  data.internshipTimeline.forEach((stop, i) => {
    const row = el("div", `timeline-stop reveal ${i % 2 === 1 ? "reverse" : ""}`);
    row.dataset.delay = i * 100;
    row.innerHTML = `
      <div class="card-wrap">
        <div class="tcard glass card-hover">
          <div class="top">
            <span class="icon-badge" style="width:40px;height:40px;">${icon(stop.icon, "size-5")}</span>
            <div>
              <p class="period">${stop.period}</p>
              <h4>${stop.title}</h4>
            </div>
          </div>
          <p>${stop.description}</p>
        </div>
      </div>
      <span class="timeline-dot"></span>
      <div class="card-wrap" style="visibility:hidden;"></div>
    `;
    timeline.appendChild(row);
  });
}

/* ============ WEEKLY ============ */
function renderWeekly() {
  const weeks = Array.from(new Set(data.weeklyEntries.map((e) => e.week))).sort((a, b) => a - b);
  const members = Array.from(new Set(data.weeklyEntries.map((e) => e.member)));
  let weekFilter = "all";
  let memberFilter = "all";

  const memberRow = $("#member-filter");
  const weekRow = $("#week-filter");
  const gridWrap = $("#week-grid-wrap");

  function chip(label, active, onClick) {
    const b = el("button", `chip ${active ? "chip--active" : "chip--inactive glass"}`, label);
    b.addEventListener("click", onClick);
    return b;
  }

  function renderChips() {
    memberRow.innerHTML = "";
    memberRow.appendChild(
      chip("Everyone", memberFilter === "all", () => {
        memberFilter = "all";
        update();
      })
    );
    members.forEach((m) => {
      memberRow.appendChild(
        chip(m.split(" ")[0], memberFilter === m, () => {
          memberFilter = memberFilter === m ? "all" : m;
          update();
        })
      );
    });

    weekRow.innerHTML = "";
    weekRow.appendChild(
      chip("All Weeks", weekFilter === "all", () => {
        weekFilter = "all";
        update();
      })
    );
    weeks.forEach((w) => {
      weekRow.appendChild(
        chip(`Week ${w}`, weekFilter === w, () => {
          weekFilter = weekFilter === w ? "all" : w;
          update();
        })
      );
    });
  }

  function weekCard(entry) {
    const card = el("article", "week-card glass card-hover");
    card.innerHTML = `
      <button class="head-btn">
        <span class="week-badge">W${entry.week}</span>
        <div class="meta">
          <p class="member">${entry.member}</p>
          <p class="date">${entry.dateRange}</p>
          <div class="progress-track"><div class="progress-fill" style="width:${entry.progress}%"></div></div>
        </div>
        <span class="chevron">${icon("chevron-down", "size-5")}</span>
      </button>
      <div class="body">
        <div class="body-inner">
          <div>
            <p class="detail-label">${icon("lightbulb", "size-4")} Learned</p>
            <p class="detail-text">${entry.learned}</p>
          </div>
          <div>
            <p class="detail-label">${icon("cpu", "size-4")} New Technologies</p>
            <div class="tech-tags">${entry.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join("")}</div>
          </div>
          <div>
            <p class="detail-label">${icon("alert-triangle", "size-4")} Challenge</p>
            <p class="detail-text">${entry.challenge}</p>
          </div>
          <div>
            <p class="detail-label">${icon("award", "size-4")} Achievement</p>
            <p class="detail-text">${entry.achievement}</p>
          </div>
          <div>
            <p class="detail-label">${icon("notebook-pen", "size-4")} Reflection</p>
            <p class="detail-text">${entry.reflection}</p>
          </div>
          <div class="badge-row">${entry.badges.map((b) => `<span class="badge-pill">🏅 ${b}</span>`).join("")}</div>
        </div>
      </div>
    `;
    card.querySelector(".head-btn").addEventListener("click", () => {
      card.classList.toggle("open");
      refreshIcons();
    });
    return card;
  }

  function update() {
    renderChips();
    refreshIcons();
    const filtered = data.weeklyEntries.filter(
      (e) => (weekFilter === "all" || e.week === weekFilter) && (memberFilter === "all" || e.member === memberFilter)
    );
    gridWrap.innerHTML = "";
    if (filtered.length === 0) {
      gridWrap.appendChild(el("p", "empty-note glass", "No entries match this combination — try a different week or team member."));
      return;
    }
    const grid = el("div", "week-grid");
    filtered.forEach((entry) => grid.appendChild(weekCard(entry)));
    gridWrap.appendChild(grid);
  }

  update();
}

/* ============ INNOVATION ============ */
function renderInnovation() {
  const categories = ["All", "AI", "Automation", "Digital Transformation"];
  let category = "All";

  const statsWrap = $("#innovation-stats");
  data.innovationStats.forEach((s) => statsWrap.appendChild(statCard(s.label, s.value, s.suffix)));

  const filterRow = $("#innovation-category-filter");
  const cardsWrap = $("#innovation-cards");
  const modal = $("#innovation-modal");
  const modalContent = $("#innovation-modal-content");

  function renderFilters() {
    filterRow.innerHTML = "";
    categories.forEach((c) => {
      const b = el("button", `chip ${category === c ? "chip--active" : "chip--inactive glass"}`, c);
      b.addEventListener("click", () => {
        category = c;
        update();
      });
      filterRow.appendChild(b);
    });
  }

  function ideaCard(idea) {
    const card = el("article", "idea-card glass card-hover");
    card.innerHTML = `
      <div class="top-row">
        <span class="icon-badge">${icon(idea.icon, "size-6")}</span>
        <span class="pill pill--accent">${idea.category}</span>
      </div>
      <h3>${idea.title}</h3>
      <p class="summary">${idea.summary}</p>
      <div class="score-block">
        <div>
          <div class="score-label-row"><span class="l">${icon("gauge", "size-3")} Impact</span><span>${idea.impact}</span></div>
          <div class="score-track"><div class="score-fill impact" style="width:${idea.impact}%"></div></div>
        </div>
        <div>
          <div class="score-label-row"><span class="l">${icon("wrench", "size-3")} Effort</span><span>${idea.effort}</span></div>
          <div class="score-track"><div class="score-fill effort" style="width:${idea.effort}%"></div></div>
        </div>
      </div>
      <div class="bottom-row">
        <span class="roi-tag">${icon("trending-up", "size-4")} ${idea.roi}</span>
        <button class="details-btn">Details ${icon("arrow-right", "size-4")}</button>
      </div>
    `;
    card.querySelector(".details-btn").addEventListener("click", () => openModal(idea));
    return card;
  }

  function openModal(idea) {
    modalContent.innerHTML = `
      <button class="close-btn">${icon("x", "size-4")}</button>
      <div style="display:flex; align-items:center; gap:.75rem;">
        <span class="icon-badge" style="width:44px;height:44px;">${icon(idea.icon, "size-5")}</span>
        <span class="pill pill--accent">${idea.category}</span>
      </div>
      <h3>${idea.title}</h3>
      <p class="summary">${idea.summary}</p>
      <div class="before-after">
        <div class="box before"><p class="label">Before</p><p class="text">${idea.before}</p></div>
        <div class="box after"><p class="label">After</p><p class="text">${idea.after}</p></div>
      </div>
      <div class="roi-highlight">
        <p style="font-size:.75rem; color:var(--muted-foreground);">Estimated ROI</p>
        <p class="roi-num text-gradient">${idea.roiValue}%</p>
      </div>
      <div class="benefits-grid">
        <div>
          <h4>Expected Benefits</h4>
          <ul>${idea.benefits.map((b) => `<li><span style="color:var(--success);">✓</span> ${b}</li>`).join("")}</ul>
        </div>
        <div>
          <h4>Required Inputs</h4>
          <ul>${idea.inputs.map((b) => `<li><span style="color:var(--primary);">▸</span> ${b}</li>`).join("")}</ul>
        </div>
      </div>
    `;
    modalContent.querySelector(".close-btn").addEventListener("click", closeModal);
    modal.classList.add("open");
    refreshIcons();
  }
  function closeModal() {
    modal.classList.remove("open");
  }
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function update() {
    renderFilters();
    refreshIcons();
    const filtered = category === "All" ? data.innovationIdeas : data.innovationIdeas.filter((i) => i.category === category);
    cardsWrap.innerHTML = "";
    filtered.forEach((idea) => cardsWrap.appendChild(ideaCard(idea)));
  }

  update();
}

/* ============ CYBER ============ */
function caesar(text, shift, decrypt = false) {
  const s = (((decrypt ? -shift : shift) % 26) + 26) % 26;
  return text.replace(/[a-z]/gi, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + s) % 26) + base);
  });
}
function atbash(text) {
  return text.replace(/[a-z]/gi, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(base + (25 - (c.charCodeAt(0) - base)));
  });
}
function reverseStr(text) {
  return text.split("").reverse().join("");
}
function toBase64(text) {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch {
    return "(invalid input)";
  }
}
function fromBase64(text) {
  try {
    return decodeURIComponent(escape(atob(text.trim())));
  } catch {
    return "(invalid Base64)";
  }
}

function renderCipherPlayground() {
  const wrap = $("#cipher-playground-wrap");
  wrap.innerHTML = `
    <div class="terminal">
      <div class="terminal-head">
        <span class="terminal-dot red"></span><span class="terminal-dot yellow"></span><span class="terminal-dot green"></span>
        <span class="label">${icon("terminal", "size-3")} cipher@nexus:~$ playground</span>
      </div>
      <div class="terminal-body">
        <div class="cipher-tabs" id="cipher-type-tabs">
          ${["caesar", "atbash", "reverse", "base64"].map((t) => `<button data-type="${t}">${t}</button>`).join("")}
        </div>
        <div class="mode-row">
          <div class="mode-toggle" id="cipher-mode-toggle">
            <button data-mode="encrypt">${icon("lock", "size-3")} encrypt</button>
            <button data-mode="decrypt">${icon("unlock", "size-3")} decrypt</button>
          </div>
          <label class="shift-label" id="shift-wrap">
            shift: <span id="shift-val">3</span>
            <input type="range" min="1" max="25" value="3" id="shift-range" />
          </label>
        </div>
        <div class="cipher-io">
          <label class="io-label">&gt; input</label>
          <textarea id="cipher-input" rows="2">The internship was a success!</textarea>
        </div>
        <div>
          <div class="output-head">
            <label class="io-label">&gt; output</label>
            <button class="copy-btn" id="cipher-copy">${icon("copy", "size-3")} copy</button>
          </div>
          <div id="cipher-output"></div>
        </div>
      </div>
    </div>
  `;

  let type = "caesar";
  let mode = "encrypt";
  let shift = 3;

  const tabs = $$("#cipher-type-tabs button");
  const modeBtns = $$("#cipher-mode-toggle button");
  const shiftWrap = $("#shift-wrap");
  const shiftRange = $("#shift-range");
  const shiftVal = $("#shift-val");
  const input = $("#cipher-input");
  const output = $("#cipher-output");
  const copyBtn = $("#cipher-copy");

  function compute() {
    const dec = mode === "decrypt";
    let result = "";
    switch (type) {
      case "caesar": result = caesar(input.value, shift, dec); break;
      case "atbash": result = atbash(input.value); break;
      case "reverse": result = reverseStr(input.value); break;
      case "base64": result = dec ? fromBase64(input.value) : toBase64(input.value); break;
    }
    output.innerHTML = `${result}<span class="cursor-blink">▋</span>`;
  }

  tabs.forEach((t) =>
    t.addEventListener("click", () => {
      type = t.dataset.type;
      tabs.forEach((x) => x.classList.toggle("active", x === t));
      shiftWrap.style.display = type === "caesar" ? "flex" : "none";
      compute();
    })
  );
  modeBtns.forEach((m) =>
    m.addEventListener("click", () => {
      mode = m.dataset.mode;
      modeBtns.forEach((x) => x.classList.toggle("active", x === m));
      compute();
    })
  );
  shiftRange.addEventListener("input", () => {
    shift = Number(shiftRange.value);
    shiftVal.textContent = shift;
    compute();
  });
  input.addEventListener("input", compute);
  copyBtn.addEventListener("click", () => {
    navigator.clipboard?.writeText(output.textContent.replace("▋", ""));
    copyBtn.innerHTML = `${icon("check", "size-3")} copied`;
    refreshIcons();
    setTimeout(() => {
      copyBtn.innerHTML = `${icon("copy", "size-3")} copy`;
      refreshIcons();
    }, 1500);
  });

  tabs[0].classList.add("active");
  modeBtns[0].classList.add("active");
  compute();
  refreshIcons();
}

function renderCyber() {
  renderCipherPlayground();

  const concepts = $("#cyber-concepts");
  data.cyberConcepts.forEach((c, i) => {
    const card = el("div", "concept-card glass card-hover reveal");
    card.dataset.delay = i * 80;
    card.innerHTML = `<span class="icon-badge">${icon(c.icon, "size-5")}</span><h3>${c.title}</h3><p>${c.description}</p>`;
    concepts.appendChild(card);
  });

  const tips = $("#security-tips");
  data.securityTips.forEach((t) => {
    const li = el("li", "tip-item", `<span class="tip-check">✓</span>${t}`);
    tips.appendChild(li);
  });

  const tools = $("#cyber-tools");
  data.cyberTools.forEach((t) => {
    tools.appendChild(el("div", "tool-row", `<span class="tool-name">${t.name}</span><span class="tool-use">${t.use}</span>`));
  });

  const ctfGrid = $("#ctf-grid");
  data.ctfChallenges.forEach((c, i) => {
    const card = el("article", "ctf-card glass card-hover reveal");
    card.dataset.delay = i * 90;
    const diffClass = c.difficulty.toLowerCase();
    card.innerHTML = `
      <div class="row1">
        <span class="title">${icon("flag", "size-4")} ${c.title}</span>
        <span class="diff ${diffClass}">${c.difficulty}</span>
      </div>
      <p class="points">${c.points} pts</p>
      <p class="prompt">${c.prompt}</p>
      <div class="ctf-answer-row">
        <input type="text" placeholder="Your answer…" />
        <button>Submit</button>
      </div>
      <div class="ctf-status-row">
        <button class="hint-btn">Need a hint?</button>
        <span class="result-msg"></span>
      </div>
      <p class="ctf-hint" style="display:none;">💡 ${c.hint}</p>
    `;
    const input = card.querySelector("input");
    const submitBtn = card.querySelector(".ctf-answer-row button");
    const resultMsg = card.querySelector(".result-msg");
    const hintBtn = card.querySelector(".hint-btn");
    const hintText = card.querySelector(".ctf-hint");

    function check() {
      if (input.value.trim().toLowerCase() === c.answer.toLowerCase()) {
        resultMsg.textContent = "🎉 Flag captured!";
        resultMsg.className = "result-msg correct-msg";
        card.classList.add("correct");
      } else {
        resultMsg.textContent = "Not quite — try again";
        resultMsg.className = "result-msg wrong-msg";
        card.classList.remove("correct");
      }
    }
    submitBtn.addEventListener("click", check);
    input.addEventListener("input", () => {
      resultMsg.textContent = "";
      card.classList.remove("correct");
    });
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    hintBtn.addEventListener("click", () => {
      const showing = hintText.style.display !== "none";
      hintText.style.display = showing ? "none" : "block";
      hintBtn.textContent = showing ? "Need a hint?" : "Hide hint";
    });

    ctfGrid.appendChild(card);
  });
}

/* ============ ACTIVITIES ============ */
function skillBars(container, skills) {
  skills.forEach((s, i) => {
    const row = el("div", "skill-row reveal");
    row.dataset.delay = i * 60;
    row.innerHTML = `
      <div class="row"><span class="name">${s.name}</span><span class="pct">${s.level}%</span></div>
      <div class="skill-track"><div class="skill-fill" style="width:0%"></div></div>
    `;
    container.appendChild(row);
    const fill = row.querySelector(".skill-fill");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => (fill.style.width = s.level + "%"), 150);
          io.disconnect();
        }
      });
    });
    io.observe(row);
  });
}

function drawRadar() {
  const canvas = $("#radar-canvas");
  const ctx = canvas.getContext("2d");
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = Math.min(cx, cy) - 30;
  const axes = data.skillRadar;
  const n = axes.length;
  const isDark = () => document.documentElement.classList.contains("dark");

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gridColor = isDark() ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.09)";
    const textColor = isDark() ? "#9aa3b2" : "#6b7280";

    // grid rings
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const r = (radius * ring) / 4;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = gridColor;
      ctx.stroke();
    }
    // axis lines + labels
    axes.forEach((a, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = gridColor;
      ctx.stroke();

      const lx = cx + (radius + 16) * Math.cos(angle);
      const ly = cy + (radius + 16) * Math.sin(angle);
      ctx.fillStyle = textColor;
      ctx.font = "11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(a.axis, lx, ly);
    });
    // data polygon
    ctx.beginPath();
    axes.forEach((a, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const r = (radius * a.score) / 100;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(255,166,48,0.45)";
    ctx.fill();
    ctx.strokeStyle = "#ffa630";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  draw();
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
}

function renderActivities() {
  skillBars($("#technical-skills"), data.technicalSkills);
  skillBars($("#soft-skills"), data.softSkills);
  drawRadar();

  const certs = $("#certificates");
  data.certificates.forEach((c, i) => {
    const card = el("div", "cert-card glass card-hover reveal");
    card.dataset.delay = i * 80;
    card.innerHTML = `
      <span class="icon-badge">${icon(c.icon, "size-6")}</span>
      <div style="min-width:0;">
        <p class="name">${c.title}</p>
        <p class="meta">${c.issuer} · ${c.date}</p>
      </div>
    `;
    certs.appendChild(card);
  });

  const projects = $("#projects");
  data.projects.forEach((p, i) => {
    const card = el("article", "project-card glass card-hover reveal");
    card.dataset.delay = i * 90;
    card.innerHTML = `
      <button class="head-btn">
        <span class="icon-badge">${icon(p.icon, "size-6")}</span>
        <div style="min-width:0; flex:1;">
          <h4 class="title">${p.title}</h4>
          <p class="tags">${p.tags.join(" · ")}</p>
        </div>
        <span class="chevron">${icon("chevron-down", "size-5")}</span>
      </button>
      <div class="body">
        <div class="body-inner">
          <p>${p.description}</p>
          <ul>${p.highlights.map((h) => `<li><span style="color:var(--success);">✓</span> ${h}</li>`).join("")}</ul>
        </div>
      </div>
    `;
    card.querySelector(".head-btn").addEventListener("click", () => {
      card.classList.toggle("open");
      refreshIcons();
    });
    projects.appendChild(card);
  });

  const gallery = $("#gallery");
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightbox-img");
  const lightboxCaption = $("#lightbox-caption");
  data.gallery.forEach((item, i) => {
    const btn = el("button", "gallery-item reveal");
    btn.dataset.delay = i * 70;
    btn.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy" width="800" height="600"
           onerror="this.closest('.gallery-item').style.background='var(--secondary)'; this.remove();" />
      <div class="overlay"></div>
      <p class="cap">${item.caption}</p>
    `;
    btn.addEventListener("click", () => {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.caption;
      lightboxCaption.textContent = item.caption;
      lightbox.classList.add("open");
    });
    gallery.appendChild(btn);
  });
  $("#lightbox-close").addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("open");
  });
}

/* ============ CONCLUSION ============ */
function renderConclusion() {
  $("#conclusion-summary").textContent = data.summary;
  const stats = $("#conclusion-stats");
  data.conclusionStats.forEach((s) => stats.appendChild(statCard(s.label, s.value, s.suffix)));

  const takeaways = $("#takeaways");
  data.takeaways.forEach((t, i) => {
    const card = el("div", "takeaway-card glass card-hover reveal");
    card.dataset.delay = i * 90;
    card.innerHTML = `<span class="icon-badge">${icon(t.icon, "size-6")}</span><div><h3>${t.title}</h3><p>${t.text}</p></div>`;
    takeaways.appendChild(card);
  });

  $("#appreciation-text").textContent = data.appreciation;
  const sig = $("#signatures");
  data.signatures.forEach((name) => {
    sig.appendChild(el("div", "", `<p class="sig-name text-gradient">${name}</p><div class="sig-line"></div><p class="sig-label">Signature</p>`));
  });
  $("#conclusion-footer").textContent = `With gratitude, ${data.siteConfig.teamName} · ${data.siteConfig.organization} · ${data.siteConfig.year}`;
  $("#site-footer-text").textContent = `© ${data.siteConfig.year} ${data.siteConfig.teamName} · ${data.siteConfig.organization}`;
}

/* ============ INIT ============ */
function init() {
  renderNav();
  renderHero();
  renderAbout();
  renderWeekly();
  renderInnovation();
  renderCyber();
  renderActivities();
  renderConclusion();

  setupNavScrollBehavior();
  setupMenuToggle();
  setupThemeToggle();
  setupParticles();
  setupReveal();
  refreshIcons();
}

document.addEventListener("DOMContentLoaded", init);
