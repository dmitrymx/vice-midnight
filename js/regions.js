export const WINDOWS = [
  {
    id: "nz",
    iso: "2026-11-18T11:00:00Z",
    name: "Новая Зеландия",
    flag: "🇳🇿",
    local: "00:00 NZDT",
    place: "Окленд",
    group: "Первые в мире",
    featured: true,
  },
  {
    id: "au",
    iso: "2026-11-18T13:00:00Z",
    name: "Австралия",
    flag: "🇦🇺",
    local: "00:00 AEDT",
    place: "Сидней",
    group: "Мельбурн в полночь, Перт ещё вечер",
  },
  {
    id: "jp",
    iso: "2026-11-18T15:00:00Z",
    name: "Япония и Корея",
    flag: "🇯🇵",
    local: "00:00 JST",
    place: "Токио",
    group: "Сеул открывается в ту же минуту",
  },
  {
    id: "sea",
    iso: "2026-11-18T16:00:00Z",
    name: "Сингапур и Гонконг",
    flag: "🇸🇬",
    local: "00:00 UTC+8",
    place: "Сингапур",
    group: "Малайзия и Тайвань",
  },
  {
    id: "th",
    iso: "2026-11-18T17:00:00Z",
    name: "Таиланд",
    flag: "🇹🇭",
    local: "00:00 UTC+7",
    place: "Бангкок",
    group: "Индонезия, западный пояс",
  },
  {
    id: "in",
    iso: "2026-11-18T18:30:00Z",
    name: "Индия",
    flag: "🇮🇳",
    local: "00:00 IST",
    place: "Дели",
    group: "На 3 ч 30 мин раньше Украины",
    featured: true,
  },
  {
    id: "ae",
    iso: "2026-11-18T20:00:00Z",
    name: "ОАЭ",
    flag: "🇦🇪",
    local: "00:00 GST",
    place: "Дубай",
    group: "За час до Турции",
  },
  {
    id: "tr",
    iso: "2026-11-18T21:00:00Z",
    name: "Турция",
    flag: "🇹🇷",
    local: "00:00 TRT",
    place: "Стамбул",
    group: "Саудовская Аравия в том же окне",
    featured: true,
  },
  {
    id: "ua",
    iso: "2026-11-18T22:00:00Z",
    name: "Украина",
    flag: "🇺🇦",
    local: "00:00 UTC+2",
    place: "Киев",
    group: "Греция, Израиль, Финляндия, Румыния, ЮАР",
    featured: true,
  },
  {
    id: "eu",
    iso: "2026-11-18T23:00:00Z",
    name: "Центр Европы",
    flag: "🇪🇺",
    local: "00:00 CET",
    place: "Варшава",
    group: "Польша, Германия, Франция, Италия, Испания",
  },
  {
    id: "uk",
    iso: "2026-11-19T00:00:00Z",
    name: "Великобритания",
    flag: "🇬🇧",
    local: "00:00 GMT",
    place: "Лондон",
    group: "Ирландия, Португалия, Исландия",
  },
  {
    id: "br",
    iso: "2026-11-19T03:00:00Z",
    name: "Бразилия",
    flag: "🇧🇷",
    local: "00:00 UTC−3",
    place: "Сан-Паулу",
    group: "Аргентина, Чили, Уругвай, Парагвай",
  },
  {
    id: "bo",
    iso: "2026-11-19T04:00:00Z",
    name: "Боливия",
    flag: "🇧🇴",
    local: "00:00 BOT",
    place: "Ла-Пас",
    group: "Отдельное окно магазина",
  },
  {
    id: "us",
    iso: "2026-11-19T05:00:00Z",
    name: "США",
    flag: "🇺🇸",
    local: "00:00 EST",
    place: "Нью-Йорк",
    group: "Канада в тот же момент. Лос-Анджелес ещё 21:00 18 ноября",
    featured: true,
  },
  {
    id: "mx",
    iso: "2026-11-19T06:00:00Z",
    name: "Мексика",
    flag: "🇲🇽",
    local: "00:00 CST",
    place: "Мехико",
    group: "Последние: Гватемала, Гондурас, Коста-Рика",
  },
];

export const PLACES = [
  ["Europe/Samara", "Самара"],
  ["Europe/Astrakhan", "Астрахань"],
  ["Europe/Moscow", "Москва"],
  ["Europe/Kyiv", "Киев"],
  ["Europe/Istanbul", "Стамбул"],
  ["Asia/Kolkata", "Индия"],
  ["Pacific/Auckland", "Окленд"],
  ["Asia/Dubai", "Дубай"],
  ["Europe/Warsaw", "Варшава"],
  ["Europe/Berlin", "Берлин"],
  ["Europe/Paris", "Париж"],
  ["Europe/London", "Лондон"],
  ["America/New_York", "Нью-Йорк"],
  ["America/Chicago", "Чикаго"],
  ["America/Los_Angeles", "Лос-Анджелес"],
  ["Asia/Tokyo", "Токио"],
  ["Asia/Seoul", "Сеул"],
  ["Asia/Singapore", "Сингапур"],
  ["Australia/Sydney", "Сидней"],
  ["Asia/Almaty", "Алматы"],
  ["Asia/Yekaterinburg", "Екатеринбург"],
  ["Asia/Novosibirsk", "Новосибирск"],
  ["Asia/Vladivostok", "Владивосток"],
  ["Europe/Minsk", "Минск"],
  ["Asia/Tbilisi", "Тбилиси"],
  ["Asia/Baku", "Баку"],
  ["Asia/Yerevan", "Ереван"],
  ["America/Sao_Paulo", "Сан-Паулу"],
  ["America/Mexico_City", "Мехико"],
];

const placeName = {
  ...Object.fromEntries(PLACES),
  "Europe/Astrakhan": "Астрахань",
  "Europe/Ulyanovsk": "Ульяновск",
  "Europe/Saratov": "Саратов",
  "Europe/Volgograd": "Волгоград",
  "Europe/Kirov": "Киров",
  "Europe/Kaliningrad": "Калининград",
  "Europe/Simferopol": "Симферополь",
  "Asia/Omsk": "Омск",
  "Asia/Barnaul": "Барнаул",
  "Asia/Tomsk": "Томск",
  "Asia/Krasnoyarsk": "Красноярск",
  "Asia/Irkutsk": "Иркутск",
  "Asia/Chita": "Чита",
  "Asia/Yakutsk": "Якутск",
  "Asia/Magadan": "Магадан",
  "Asia/Sakhalin": "Сахалин",
  "Asia/Kamchatka": "Камчатка",
  "Asia/Anadyr": "Анадырь",
};

export function windowById(id) {
  return WINDOWS.find((item) => item.id === id) ?? WINDOWS.find((item) => item.id === "ua");
}

export function placeLabel(tz) {
  return placeName[tz] || tz.split("/").pop().replaceAll("_", " ");
}

export function offsetOf(tz, date) {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "shortOffset",
      hour: "2-digit",
    }).formatToParts(date);
    const raw = parts.find((part) => part.type === "timeZoneName")?.value ?? "";
    return raw.replace("GMT", "UTC");
  } catch {
    return "";
  }
}

export function formatWhen(date, tz) {
  const time = new Intl.DateTimeFormat("ru-RU", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .format(date)
    .replace("\u202f", "");
  const day = new Intl.DateTimeFormat("ru-RU", {
    timeZone: tz,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
  return {
    time,
    day: day.charAt(0).toUpperCase() + day.slice(1),
  };
}

export function formatClock(date, tz) {
  return new Intl.DateTimeFormat("ru-RU", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  })
    .format(date)
    .replace("\u202f", "");
}

export function partsLeft(ms) {
  const safe = Math.max(0, ms);
  const total = Math.floor(safe / 1000);
  return {
    d: Math.floor(total / 86400),
    h: Math.floor(total / 3600) % 24,
    m: Math.floor(total / 60) % 60,
    s: total % 60,
    frac: (safe % 1000) / 1000,
    done: ms <= 0,
  };
}

export function spanWords(ms) {
  const totalMin = Math.round(Math.abs(ms) / 60000);
  if (totalMin === 0) return "одновременно";
  const days = Math.floor(totalMin / 1440);
  const hours = Math.floor((totalMin % 1440) / 60);
  const mins = totalMin % 60;
  const bits = [];
  if (days) bits.push(`${days} д`);
  if (hours) bits.push(`${hours} ч`);
  if (mins) bits.push(`${mins} мин`);
  return bits.join(" ");
}

export function relation(ms) {
  const words = spanWords(ms);
  if (words === "одновременно") return "вместе с тобой";
  if (ms > 0) return `раньше на ${words}`;
  return `позже на ${words}`;
}
