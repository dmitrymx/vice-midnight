import {
  PLACES,
  WINDOWS,
  formatClock,
  formatWhen,
  offsetOf,
  partsLeft,
  placeLabel,
  relation,
  windowById,
} from "./regions.js";
import { startScene } from "./scene.js";

const KEY_TZ = "vice-home-tz";
const KEY_STORE = "vice-store";

const CODE = {
  nz: "NZ",
  au: "AU",
  jp: "JP",
  sea: "SG",
  th: "TH",
  in: "IN",
  ae: "AE",
  tr: "TR",
  ua: "UA",
  eu: "EU",
  uk: "UK",
  br: "BR",
  bo: "BO",
  us: "US",
  mx: "MX",
};

const $ = (id) => document.getElementById(id);

const state = {
  tz: loadTz(),
  store: loadStore(),
  picker: null,
  query: "",
  lastParts: {},
};

const nodes = {
  homeBtn: $("home-btn"),
  storeBtn: $("store-btn"),
  clock: $("live-clock"),
  kicker: $("kicker"),
  headline: $("headline"),
  whenTime: $("when-time"),
  whenDay: $("when-day"),
  whenPlace: $("when-place"),
  sentence: $("sentence"),
  count: $("count"),
  bar: $("second-bar"),
  feature: $("feature"),
  board: $("board"),
  track: $("track"),
  marker: $("marker"),
  ahead: $("ahead-line"),
  dialog: $("picker"),
  pickerTitle: $("picker-title"),
  pickerSearch: $("picker-search"),
  pickerList: $("picker-list"),
  copyBtn: $("copy-btn"),
};

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* приватный режим */
  }
}

function loadTz() {
  const saved = storageGet(KEY_TZ);
  const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const candidate = saved || detected || "Europe/Samara";
  try {
    Intl.DateTimeFormat("ru-RU", { timeZone: candidate }).format(new Date());
    return candidate;
  } catch {
    return "Europe/Samara";
  }
}

function loadStore() {
  const saved = storageGet(KEY_STORE);
  return windowById(saved || "ua").id;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function setText(node, value) {
  if (node.textContent !== value) node.textContent = value;
}

function mine() {
  return windowById(state.store);
}

function paint(now = Date.now()) {
  const home = state.tz;
  const mineWindow = mine();
  const mineAt = Date.parse(mineWindow.iso);
  const left = mineAt - now;
  const when = formatWhen(new Date(mineAt), home);
  const city = placeLabel(home);
  const offset = offsetOf(home, new Date(now));
  const open = left <= 0;

  setText(nodes.homeBtn, `${city} · ${offset || "часы"}`);
  setText(nodes.storeBtn, `${CODE[mineWindow.id]} · ${mineWindow.name}`);
  setText(nodes.clock, formatClock(new Date(now), home));
  setText(nodes.kicker, open ? "Леонида уже открыта" : "Леонида · 19 ноября 2026");
  setText(nodes.headline, open ? "Уже можно играть" : "Ты сядешь играть");
  setText(nodes.whenTime, when.time);
  setText(nodes.whenDay, when.day);
  setText(nodes.whenPlace, `по времени: ${city}`);
  setText(nodes.sentence, sentence(mineWindow, when, city, open));
  document.title = open
    ? `${mineWindow.name} уже открыта · GTA VI`
    : `${when.time} · ${mineWindow.name} · GTA VI`;

  const parts = partsLeft(left);
  paintCount(parts);
  nodes.bar.style.transform = `scaleX(${open ? 1 : 1 - parts.frac})`;

  const before = WINDOWS.filter((item) => Date.parse(item.iso) < mineAt).length;
  setText(
    nodes.ahead,
    open
      ? "Замок с этой лицензии снят."
      : before
        ? `До тебя ещё ${before} ${pluralWindows(before)}. Твоя копия от них не стартует.`
        : "Твой магазин открывается первым.",
  );

  nodes.feature.querySelectorAll("[data-id]").forEach((card) => paintCard(card, now));
  nodes.board.querySelectorAll("[data-id]").forEach((card) => paintCard(card, now));
  nodes.track.querySelectorAll(".dot").forEach((dot) => {
    dot.classList.toggle("is-mine", dot.dataset.id === state.store);
  });
  moveMarker(now);
}

function sentence(item, when, city, open) {
  if (open) {
    return `${item.name} открылась ${when.day.toLowerCase()} в ${when.time}, часы ${city}.`;
  }
  return `${item.name}, магазин PS Store · ${item.local}. У тебя в городе ${city} это ${when.day.toLowerCase()}, ${when.time}.`;
}

function pluralWindows(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "окно";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "окна";
  return "окон";
}

function paintCount(parts) {
  const units = [
    ["d", parts.d],
    ["h", parts.h],
    ["m", parts.m],
    ["s", parts.s],
  ];
  units.forEach(([key, value]) => {
    const text = pad(value);
    const el = nodes.count.querySelector(`[data-unit="${key}"]`);
    if (el.textContent !== text) {
      el.textContent = text;
      if (state.lastParts[key] !== undefined) {
        el.classList.remove("tick");
        void el.offsetWidth;
        el.classList.add("tick");
      }
    }
    state.lastParts[key] = text;
  });
}

function paintCard(card, now) {
  const item = windowById(card.dataset.id);
  const at = Date.parse(item.iso);
  const mineAt = Date.parse(mine().iso);
  const when = formatWhen(new Date(at), state.tz);
  const left = at - now;
  const open = left <= 0;
  const parts = partsLeft(left);
  card.classList.toggle("is-mine", item.id === state.store);
  card.classList.toggle("is-open", open);
  card.classList.toggle("is-next", !open && item.id === nextId(now));
  setText(card.querySelector("[data-field='time']"), when.time);
  setText(card.querySelector("[data-field='day']"), when.day);
  setText(card.querySelector("[data-field='delta']"), open ? "уже открыто" : relation(mineAt - at));
  setText(
    card.querySelector("[data-field='left']"),
    open ? item.local : `${pad(parts.d)}д ${pad(parts.h)}:${pad(parts.m)}:${pad(parts.s)}`,
  );
}

function nextId(now) {
  const next = WINDOWS.find((item) => Date.parse(item.iso) > now);
  return next ? next.id : "";
}

function moveMarker(now) {
  const start = Date.parse(WINDOWS[0].iso);
  const end = Date.parse(WINDOWS[WINDOWS.length - 1].iso);
  const ratio = Math.min(1, Math.max(0, (now - start) / (end - start)));
  nodes.marker.style.left = `${ratio * 100}%`;
}

function cardTemplate(item, featured) {
  const article = document.createElement("article");
  article.className = featured ? "spot" : "row";
  article.dataset.id = item.id;
  article.innerHTML = `
    <header>
      <span class="code">${CODE[item.id]}</span>
      <div>
        <h3>${item.name}</h3>
        <p>${item.place} · ${item.local}</p>
      </div>
    </header>
    <strong data-field="time">--:--</strong>
    <em data-field="day"></em>
    <footer>
      <span data-field="delta"></span>
      <b data-field="left"></b>
    </footer>
    ${featured ? "" : `<small>${item.group}</small>`}
  `;
  return article;
}

function buildBoard() {
  WINDOWS.filter((item) => item.featured).forEach((item) => {
    nodes.feature.append(cardTemplate(item, true));
  });
  WINDOWS.forEach((item) => nodes.board.append(cardTemplate(item, false)));
  WINDOWS.forEach((item) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.dataset.id = item.id;
    dot.style.left = `${((Date.parse(item.iso) - Date.parse(WINDOWS[0].iso)) / (Date.parse(WINDOWS[WINDOWS.length - 1].iso) - Date.parse(WINDOWS[0].iso))) * 100}%`;
    dot.title = item.name;
    dot.setAttribute("aria-label", item.name);
    dot.addEventListener("click", () => chooseStore(item.id));
    nodes.track.append(dot);
  });
}

function closePicker() {
  if (nodes.dialog.open) nodes.dialog.close();
}

function chooseStore(id) {
  state.store = windowById(id).id;
  storageSet(KEY_STORE, state.store);
  closePicker();
  paint();
}

function chooseTz(tz) {
  state.tz = tz;
  storageSet(KEY_TZ, tz);
  closePicker();
  paint();
}

function zones() {
  const supported = Intl.supportedValuesOf ? Intl.supportedValuesOf("timeZone") : PLACES.map(([zone]) => zone);
  const pinned = PLACES.map(([zone]) => zone);
  const rest = supported.filter((zone) => !pinned.includes(zone));
  return [...pinned, ...rest];
}

function openPicker(mode) {
  state.picker = mode;
  state.query = "";
  nodes.pickerSearch.value = "";
  nodes.pickerTitle.textContent = mode === "tz" ? "Где ты сейчас" : "Где куплена игра";
  nodes.pickerSearch.placeholder = mode === "tz" ? "Город или пояс" : "Страна магазина";
  nodes.pickerSearch.hidden = mode !== "tz";
  fillPicker();
  nodes.dialog.showModal();
  document.body.classList.add("lock");
  if (mode === "tz") nodes.pickerSearch.focus();
}

function fillPicker() {
  const query = state.query.trim().toLowerCase();
  const list = nodes.pickerList;
  list.replaceChildren();
  if (state.picker === "store") {
    WINDOWS.forEach((item) => {
      if (query && !`${item.name} ${item.place} ${item.group}`.toLowerCase().includes(query)) return;
      list.append(optionButton(`${CODE[item.id]} · ${item.name}`, `${item.local} · ${item.group}`, item.id === state.store, () => chooseStore(item.id)));
    });
    return;
  }
  zones().forEach((zone) => {
    const label = placeLabel(zone);
    const offset = offsetOf(zone, new Date());
    const hay = `${label} ${zone} ${offset}`.toLowerCase();
    if (query && !hay.includes(query)) return;
    list.append(optionButton(label, `${zone} · ${offset}`, zone === state.tz, () => chooseTz(zone)));
  });
}

function optionButton(title, meta, active, onPick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = active ? "option is-active" : "option";
  button.innerHTML = `<span>${title}</span><small>${meta}</small>`;
  button.addEventListener("click", onPick);
  return button;
}

function copyLine() {
  const item = mine();
  const when = formatWhen(new Date(item.iso), state.tz);
  const text = `GTA VI, ${item.name}: ${when.day} в ${when.time} (${placeLabel(state.tz)}).`;
  navigator.clipboard.writeText(text).then(() => {
    nodes.copyBtn.textContent = "Скопировано";
    setTimeout(() => {
      nodes.copyBtn.textContent = "Скопировать время";
    }, 1600);
  });
}

nodes.homeBtn.addEventListener("click", () => openPicker("tz"));
nodes.storeBtn.addEventListener("click", () => openPicker("store"));
nodes.copyBtn.addEventListener("click", copyLine);
nodes.pickerSearch.addEventListener("input", (event) => {
  state.query = event.target.value;
  fillPicker();
});
nodes.dialog.addEventListener("close", () => document.body.classList.remove("lock"));
nodes.dialog.addEventListener("click", (event) => {
  if (event.target === nodes.dialog) nodes.dialog.close();
});

const video = $("reel");
video.muted = true;
video.play().catch(() => {});

startScene($("city"));
buildBoard();
paint();

let lastSecond = -1;
function loop(now) {
  const second = Math.floor(now / 1000);
  if (second !== lastSecond) {
    lastSecond = second;
    paint(Date.now());
  } else if (!partsLeft(Date.parse(mine().iso) - Date.now()).done) {
    const frac = (Date.now() % 1000) / 1000;
    nodes.bar.style.transform = `scaleX(${1 - frac})`;
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
