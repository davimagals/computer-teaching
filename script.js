const grid = document.getElementById("grid");
const qInput = document.getElementById("q");
const filter = document.getElementById("filter-type");
const resetBtn = document.getElementById("reset");

function mkTag(text) {
  const span = document.createElement("span");
  span.className = "tag";
  span.textContent = text;
  return span;
}

function iconFor(type) {
  switch (type) {
    case "pdf":
      return "📄";
    case "video":
      return "🎥";
    case "image":
      return "🖼️";
    case "music":
      return "🎵";
    case "zip":
      return "📦";
    case "code":
      return "💻";
    default:
      return "📁";
  }
}

function render(data) {
  grid.innerHTML = "";
  data.forEach((d) => {
    const card = document.createElement("article");
    card.className = "card";
    const h = document.createElement("h3");
    h.innerHTML = `<span>${d.title}</span>`;
    card.appendChild(h);
    if (d.description) {
      const desc = document.createElement("div");
      desc.className = "meta";
      desc.textContent = d.description;
      card.appendChild(desc);
    }

    const addSection = (label, items) => {
      if (!items || items.length === 0) return;
      const secTitle = document.createElement("div");
      secTitle.style.fontWeight = "600";
      secTitle.style.marginTop = "8px";
      secTitle.textContent = label;
      card.appendChild(secTitle);
      const list = document.createElement("div");
      list.className = "list";
      items.forEach((it) => {
        const el = document.createElement("div");
        el.className = "item";
        const t = document.createElement("div");
        t.className = "type";
        t.textContent = iconFor(it.type);
        const info = document.createElement("div");
        info.style.flex = "1";
        const a = document.createElement("a");
        a.href = it.path.startsWith("http")
          ? it.path
          : `disciplines/${d.id}/${it.path}`;
        a.textContent = it.title;
        info.appendChild(a);
        const small = document.createElement("div");
        small.style.color = "var(--muted)";
        small.style.fontSize = "12px";
        small.textContent = it.path;
        info.appendChild(small);
        el.appendChild(t);
        el.appendChild(info);
        list.appendChild(el);
      });
      card.appendChild(list);
    };

    addSection("Aulas", d.lessons);
    addSection("Provas", d.exams);
    addSection("Atividades", d.others);

    if (d.tags && d.tags.length) {
      const tags = document.createElement("div");
      tags.className = "tags";
      d.tags.forEach((t) => tags.appendChild(mkTag(t)));
      card.appendChild(tags);
    }

    grid.appendChild(card);
  });
}

render(DATA);

function matches(d, q, type) {
  if (q) {
    const s = (
      d.title +
      " " +
      (d.description || "") +
      " " +
      (d.tags || []).join(" ")
    ).toLowerCase();
    if (!s.includes(q)) return false;
  }
  if (type && type !== "all") {
    if (type === "ds" && !d.tags.includes("ds")) return false;
    if (type === "redes" && !d.tags.includes("redes")) return false;
  }
  return true;
}

qInput.addEventListener("input", () => {
  const q = qInput.value.trim().toLowerCase();
  const t = filter.value;
  render(DATA.filter((d) => matches(d, q, t)));
});

filter.addEventListener("change", () => {
  const q = qInput.value.trim().toLowerCase();
  const t = filter.value;
  render(DATA.filter((d) => matches(d, q, t)));
});

resetBtn.addEventListener("click", () => {
  qInput.value = "";
  filter.value = "all";
  render(DATA);
});
