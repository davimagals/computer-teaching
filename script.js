const grid = document.getElementById("grid");
const qInput = document.getElementById("q");
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
    case "zip":
      return "📦";
    case "code":
      return "💻";
    default:
      return "📁";
  }
}

function openViewer(id, path) {
  path = "public/disciplines/" + id + "/" + path;
  window.open(path, "_blank");
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
        a.href = it.path;
        a.textContent = it.title;
        a.onclick = (ev) => {
          ev.preventDefault();
          openViewer(d.id, it.path);
        };
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

function matches(d, q) {
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
  return true;
}

qInput.addEventListener("input", () => {
  const q = qInput.value.trim().toLowerCase();
  render(DATA.filter((d) => matches(d, q)));
});
