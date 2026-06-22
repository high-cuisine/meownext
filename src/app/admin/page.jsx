"use client";

import { useEffect, useState, useCallback } from "react";

const SECTIONS = [
  { id: "header", label: "Навигация" },
  { id: "footer", label: "Футер" },
  { id: "hero", label: "Главный экран" },
  { id: "cases", label: "Кейсы" },
  { id: "balance", label: "Баланс" },
  { id: "why", label: "Почему мы" },
  { id: "process", label: "Как работаем" },
  { id: "roadmap", label: "Дорожная карта" },
  { id: "contact", label: "Контакт" },
  { id: "services", label: "Услуги" },
  { id: "projectsList", label: "Список проектов" },
  { id: "projectsDetail", label: "Проект: Walmi" },
];

// ─── shared UI ───────────────────────────────────────────────────────────────

function Field({ label, value, onChange, textarea = false, rows = 3 }) {
  const cls = "w-full rounded-xl bg-[#1f1f1f] border border-[#333333] px-4 py-3 text-sm text-[#fdfdfd] placeholder-[#7a7a7a] focus:outline-none focus:border-[#c20f36] transition-colors";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-wider text-[#7a7a7a]">{label}</label>
      {textarea ? (
        <textarea className={cls} rows={rows} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={cls} type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-[#333333] bg-[#141414] p-6">
      <h3 className="mb-5 text-base font-semibold text-[#fdfdfd]">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function ArrayItemCard({ title, onRemove, children }) {
  return (
    <div className="rounded-xl border border-[#292929] bg-[#1f1f1f] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-medium text-[#7a7a7a]">{title}</span>
        {onRemove && (
          <button type="button" onClick={onRemove} className="text-xs text-[#e0123f] hover:text-[#ff1447]">
            Удалить
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

// ─── section editors ─────────────────────────────────────────────────────────

function HeaderEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setMenu = (which, idx, field, val) => {
    const arr = [...data[which]];
    arr[idx] = { ...arr[idx], [field]: val };
    set(which, arr);
  };
  const addMenuItem = (which) => set(which, [...data[which], { href: "", label: "" }]);
  const removeMenuItem = (which, idx) => set(which, data[which].filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Кнопка CTA">
        <Field label="Текст кнопки" value={data.ctaText} onChange={(v) => set("ctaText", v)} />
      </SectionCard>
      {["desktopMenu", "mobileMenu"].map((which) => (
        <SectionCard key={which} title={which === "desktopMenu" ? "Меню (desktop)" : "Меню (mobile)"}>
          {data[which].map((item, idx) => (
            <ArrayItemCard key={idx} title={`Пункт ${idx + 1}`} onRemove={() => removeMenuItem(which, idx)}>
              <Field label="Ссылка" value={item.href} onChange={(v) => setMenu(which, idx, "href", v)} />
              <Field label="Название" value={item.label} onChange={(v) => setMenu(which, idx, "label", v)} />
            </ArrayItemCard>
          ))}
          <button type="button" onClick={() => addMenuItem(which)} className="rounded-xl border border-dashed border-[#4e4e4e] px-4 py-2 text-sm text-[#7a7a7a] hover:border-[#7a7a7a] hover:text-[#fdfdfd] transition-colors">
            + Добавить пункт
          </button>
        </SectionCard>
      ))}
    </div>
  );
}

function FooterEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setArr = (key, idx, field, val) => {
    const arr = [...data[key]];
    arr[idx] = { ...arr[idx], [field]: val };
    set(key, arr);
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Контакты">
        <Field label="Email" value={data.email} onChange={(v) => set("email", v)} />
        <Field label="Копирайт" value={data.copyright} onChange={(v) => set("copyright", v)} />
      </SectionCard>
      <SectionCard title="Социальные сети">
        {data.socials.map((item, idx) => (
          <ArrayItemCard key={idx} title={item.label}>
            <Field label="Ссылка" value={item.href} onChange={(v) => setArr("socials", idx, "href", v)} />
          </ArrayItemCard>
        ))}
      </SectionCard>
      <SectionCard title="Ссылки в футере">
        {data.links.map((item, idx) => (
          <ArrayItemCard key={idx} title={item.label}>
            <Field label="Название" value={item.label} onChange={(v) => setArr("links", idx, "label", v)} />
            <Field label="Ссылка" value={item.href} onChange={(v) => setArr("links", idx, "href", v)} />
          </ArrayItemCard>
        ))}
        <button type="button" onClick={() => set("links", [...data.links, { label: "", href: "#" }])} className="rounded-xl border border-dashed border-[#4e4e4e] px-4 py-2 text-sm text-[#7a7a7a] hover:border-[#7a7a7a] hover:text-[#fdfdfd] transition-colors">
          + Добавить ссылку
        </button>
      </SectionCard>
    </div>
  );
}

function HeroEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Главный экран">
        <Field label="Заголовок (строки через \\n)" value={data.title} onChange={(v) => set("title", v)} textarea rows={3} />
        <Field label="Текст кнопки" value={data.ctaText} onChange={(v) => set("ctaText", v)} />
      </SectionCard>
    </div>
  );
}

function CasesEditor({ data, onChange }) {
  const setCase = (idx, field, val) => {
    const arr = [...data];
    arr[idx] = { ...arr[idx], [field]: val };
    onChange(arr);
  };
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Кейсы на главной">
        {data.map((item, idx) => (
          <ArrayItemCard key={item.id} title={`Кейс ${idx + 1}`}>
            <Field label="Название" value={item.title} onChange={(v) => setCase(idx, "title", v)} />
            <Field label="Тип (необязательно)" value={item.type ?? ""} onChange={(v) => setCase(idx, "type", v || null)} />
          </ArrayItemCard>
        ))}
      </SectionCard>
    </div>
  );
}

function BalanceEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Секция «Баланс»">
        <Field label="Заголовок" value={data.heading} onChange={(v) => set("heading", v)} textarea rows={2} />
        <Field label="Описание" value={data.description} onChange={(v) => set("description", v)} textarea rows={3} />
        <Field label="Текст кнопки" value={data.ctaText} onChange={(v) => set("ctaText", v)} />
      </SectionCard>
    </div>
  );
}

function WhyEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setCard = (idx, field, val) => {
    const arr = [...data.cards];
    arr[idx] = { ...arr[idx], [field]: val };
    set("cards", arr);
  };
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Заголовок раздела">
        <Field label="Заголовок" value={data.heading} onChange={(v) => set("heading", v)} />
      </SectionCard>
      <SectionCard title="Карточки">
        {data.cards.map((card, idx) => (
          <ArrayItemCard key={idx} title={`Карточка ${idx + 1}`}>
            <Field label="Заголовок" value={card.title} onChange={(v) => setCard(idx, "title", v)} textarea rows={2} />
            <Field label="Текст" value={card.text} onChange={(v) => setCard(idx, "text", v)} textarea rows={3} />
          </ArrayItemCard>
        ))}
      </SectionCard>
    </div>
  );
}

function ProcessEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setStep = (idx, field, val) => {
    const arr = [...data.steps];
    arr[idx] = { ...arr[idx], [field]: val };
    set("steps", arr);
  };
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Заголовок раздела">
        <Field label="Заголовок" value={data.heading} onChange={(v) => set("heading", v)} />
        <Field label="Подзаголовок" value={data.subtext} onChange={(v) => set("subtext", v)} textarea rows={2} />
      </SectionCard>
      <SectionCard title="Этапы">
        {data.steps.map((step, idx) => (
          <ArrayItemCard key={idx} title={`Этап ${idx + 1}`}>
            <Field label="Название" value={step.title} onChange={(v) => setStep(idx, "title", v)} />
            <Field label="Описание" value={step.text} onChange={(v) => setStep(idx, "text", v)} textarea rows={3} />
          </ArrayItemCard>
        ))}
      </SectionCard>
    </div>
  );
}

function RoadmapEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setCard = (idx, field, val) => {
    const arr = [...data.cards];
    arr[idx] = { ...arr[idx], [field]: val };
    set("cards", arr);
  };
  const setCardPoint = (cardIdx, pointIdx, val) => {
    const arr = [...data.cards];
    const points = [...arr[cardIdx].points];
    points[pointIdx] = val;
    arr[cardIdx] = { ...arr[cardIdx], points };
    set("cards", arr);
  };
  const setDay = (idx, field, val) => {
    const arr = [...data.timelineDays];
    arr[idx] = { ...arr[idx], [field]: val || undefined };
    set("timelineDays", arr);
  };
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Заголовок раздела">
        <Field label="Заголовок (строки через \\n)" value={data.heading} onChange={(v) => set("heading", v)} textarea rows={2} />
        <Field label="Подзаголовок" value={data.subtext} onChange={(v) => set("subtext", v)} />
      </SectionCard>
      <SectionCard title="Временная шкала">
        {data.timelineDays.map((day, idx) => (
          <ArrayItemCard key={idx} title={`Метка ${idx + 1}`}>
            <Field label="Текущая метка" value={day.currentLabel} onChange={(v) => setDay(idx, "currentLabel", v)} />
            <Field label="Зачёркнутая метка (необязательно)" value={day.crossedLabel ?? ""} onChange={(v) => setDay(idx, "crossedLabel", v)} />
          </ArrayItemCard>
        ))}
      </SectionCard>
      <SectionCard title="Карточки этапов">
        {data.cards.map((card, cIdx) => (
          <ArrayItemCard key={cIdx} title={card.title}>
            <Field label="Заголовок карточки" value={card.title} onChange={(v) => setCard(cIdx, "title", v)} />
            {card.points.map((point, pIdx) => (
              <Field key={pIdx} label={`Пункт ${pIdx + 1}`} value={point} onChange={(v) => setCardPoint(cIdx, pIdx, v)} />
            ))}
          </ArrayItemCard>
        ))}
      </SectionCard>
    </div>
  );
}

function ContactEditor({ data, onChange }) {
  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Секция контакта">
        <Field label="Заголовок" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      </SectionCard>
    </div>
  );
}

function ServicesEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setItem = (idx, field, val) => {
    const arr = [...data.items];
    arr[idx] = { ...arr[idx], [field]: val };
    set("items", arr);
  };
  const setTag = (itemIdx, tagIdx, val) => {
    const arr = [...data.items];
    const tags = [...arr[itemIdx].tags];
    tags[tagIdx] = val;
    arr[itemIdx] = { ...arr[itemIdx], tags };
    set("items", arr);
  };
  const addItem = () => set("items", [...data.items, { number: String(data.items.length + 1).padStart(2, "0"), badge: "", title: "", description: "", tags: [], deadline: "", price: "" }]);
  const removeItem = (idx) => set("items", data.items.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Заголовок страницы">
        <Field label="Заголовок" value={data.heading} onChange={(v) => set("heading", v)} />
        <Field label="Дисклеймер" value={data.disclaimer} onChange={(v) => set("disclaimer", v)} textarea rows={3} />
      </SectionCard>
      <SectionCard title="Услуги">
        {data.items.map((item, idx) => (
          <ArrayItemCard key={idx} title={`${item.number} ${item.title}`} onRemove={() => removeItem(idx)}>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Номер" value={item.number} onChange={(v) => setItem(idx, "number", v)} />
              <Field label="Бейдж" value={item.badge} onChange={(v) => setItem(idx, "badge", v)} />
            </div>
            <Field label="Название" value={item.title} onChange={(v) => setItem(idx, "title", v)} />
            <Field label="Описание" value={item.description} onChange={(v) => setItem(idx, "description", v)} textarea rows={2} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Срок" value={item.deadline} onChange={(v) => setItem(idx, "deadline", v)} />
              <Field label="Цена" value={item.price} onChange={(v) => setItem(idx, "price", v)} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium uppercase tracking-wider text-[#7a7a7a]">Теги</label>
              {item.tags.map((tag, tIdx) => (
                <div key={tIdx} className="flex gap-2">
                  <input className="flex-1 rounded-xl bg-[#1f1f1f] border border-[#333333] px-4 py-2 text-sm text-[#fdfdfd] focus:outline-none focus:border-[#c20f36]" value={tag} onChange={(e) => setTag(idx, tIdx, e.target.value)} />
                  <button type="button" onClick={() => { const tags = item.tags.filter((_, i) => i !== tIdx); setItem(idx, "tags", tags); }} className="px-2 text-[#e0123f] hover:text-[#ff1447]">×</button>
                </div>
              ))}
              <button type="button" onClick={() => setItem(idx, "tags", [...item.tags, ""])} className="text-left text-xs text-[#7a7a7a] hover:text-[#fdfdfd]">+ Добавить тег</button>
            </div>
          </ArrayItemCard>
        ))}
        <button type="button" onClick={addItem} className="rounded-xl border border-dashed border-[#4e4e4e] px-4 py-2 text-sm text-[#7a7a7a] hover:border-[#7a7a7a] hover:text-[#fdfdfd] transition-colors">
          + Добавить услугу
        </button>
      </SectionCard>
    </div>
  );
}

function ProjectsListEditor({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val });
  const setRowItem = (which, idx, field, val) => {
    const arr = [...data[which]];
    arr[idx] = { ...arr[idx], [field]: val };
    set(which, arr);
  };
  const setTag = (which, itemIdx, tagIdx, val) => {
    const arr = [...data[which]];
    const tags = [...arr[itemIdx].tags];
    tags[tagIdx] = val;
    arr[itemIdx] = { ...arr[itemIdx], tags };
    set(which, arr);
  };

  const renderProjectItem = (which, item, idx) => (
    <ArrayItemCard key={item.id ?? idx} title={item.title || `Проект ${idx + 1}`}>
      <Field label="Название" value={item.title} onChange={(v) => setRowItem(which, idx, "title", v)} />
      <Field label="Ссылка" value={item.href ?? ""} onChange={(v) => setRowItem(which, idx, "href", v || undefined)} />
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium uppercase tracking-wider text-[#7a7a7a]">Теги</label>
        {item.tags.map((tag, tIdx) => (
          <input key={tIdx} className="w-full rounded-xl bg-[#1f1f1f] border border-[#333333] px-4 py-2 text-sm text-[#fdfdfd] focus:outline-none focus:border-[#c20f36]" value={tag} onChange={(e) => setTag(which, idx, tIdx, e.target.value)} />
        ))}
      </div>
    </ArrayItemCard>
  );

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Заголовок страницы">
        <Field label="Заголовок" value={data.heading} onChange={(v) => set("heading", v)} />
      </SectionCard>
      <SectionCard title="Ряд 1">
        {data.row1.map((item, idx) => renderProjectItem("row1", item, idx))}
      </SectionCard>
      <SectionCard title="Широкий проект">
        {renderProjectItem("wideProject", data.wideProject, 0)}
      </SectionCard>
      <SectionCard title="Ряд 2">
        {data.row2.map((item, idx) => renderProjectItem("row2", item, idx))}
      </SectionCard>
    </div>
  );
}

function ProjectDetailEditor({ slug, data, onChange }) {
  const project = data[slug];
  if (!project) return <div className="text-[#7a7a7a] text-sm">Проект не найден.</div>;

  const set = (key, val) => onChange({ ...data, [slug]: { ...project, [key]: val } });
  const setSection = (idx, field, val) => {
    const arr = [...project.sections];
    arr[idx] = { ...arr[idx], [field]: val };
    set("sections", arr);
  };
  const setStat = (idx, field, val) => {
    const arr = [...project.stats];
    arr[idx] = { ...arr[idx], [field]: val };
    set("stats", arr);
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Основная информация">
        <Field label="Заголовок" value={project.title} onChange={(v) => set("title", v)} />
        <Field label="Подзаголовок" value={project.subtitle} onChange={(v) => set("subtitle", v)} textarea rows={2} />
        <Field label="Описание" value={project.description} onChange={(v) => set("description", v)} textarea rows={5} />
        <Field label="Ссылка на сайт" value={project.siteUrl} onChange={(v) => set("siteUrl", v)} />
        <Field label="Ссылка на Behance" value={project.behanceUrl} onChange={(v) => set("behanceUrl", v)} />
      </SectionCard>
      <SectionCard title="Разделы проекта (01, 02, 03)">
        {project.sections.map((s, idx) => (
          <ArrayItemCard key={idx} title={`Раздел ${s.number}`}>
            <Field label="Метка" value={s.label} onChange={(v) => setSection(idx, "label", v)} />
            <Field label="Текст" value={s.text} onChange={(v) => setSection(idx, "text", v)} textarea rows={4} />
          </ArrayItemCard>
        ))}
      </SectionCard>
      <SectionCard title="Статистика">
        {project.stats.map((s, idx) => (
          <ArrayItemCard key={idx} title={`Стат. ${idx + 1}: ${s.value}`}>
            <Field label="Примечание" value={s.note} onChange={(v) => setStat(idx, "note", v)} textarea rows={2} />
            <Field label="Значение" value={s.value} onChange={(v) => setStat(idx, "value", v)} />
            <Field label="Подпись" value={s.label} onChange={(v) => setStat(idx, "label", v)} />
          </ArrayItemCard>
        ))}
      </SectionCard>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [data, setData] = useState(null);
  const [activeSection, setActiveSection] = useState("header");
  const [saveStatus, setSaveStatus] = useState(null); // null | "saving" | "ok" | "error"

  const fetchContent = useCallback(async () => {
    const res = await fetch("/api/admin/content");
    if (res.status === 401) { setAuthed(false); return; }
    const json = await res.json();
    setData(json);
    setAuthed(true);
  }, []);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      await fetchContent();
    } else {
      const json = await res.json();
      setAuthError(json.error ?? "Ошибка");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthed(false);
    setData(null);
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSaveStatus(res.ok ? "ok" : "error");
    } catch {
      setSaveStatus("error");
    }
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const setSection = (key, val) => setData((prev) => ({ ...prev, [key]: val }));

  // ── login screen ──
  if (!authed) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-[#333333] bg-[#141414] p-8">
          <h1 className="mb-6 text-2xl font-semibold text-[#fdfdfd]">Админ-панель</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-[#7a7a7a]">Пароль</label>
              <input
                type="password"
                className="w-full rounded-xl bg-[#1f1f1f] border border-[#333333] px-4 py-3 text-sm text-[#fdfdfd] focus:outline-none focus:border-[#c20f36] transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {authError && <p className="text-xs text-[#e0123f]">{authError}</p>}
            </div>
            <button type="submit" className="rounded-xl bg-[#c20f36] px-5 py-3 text-base font-medium text-white hover:bg-[#e0123f] active:bg-[#ab0d30] transition-colors">
              Войти
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]">
        <p className="text-[#7a7a7a]">Загрузка…</p>
      </div>
    );
  }

  // ── admin panel ──
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#0a0a0a] overflow-hidden">
      {/* Top bar */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#333333] px-6">
        <h1 className="text-base font-semibold text-[#fdfdfd]">Meowdes Admin</h1>
        <div className="flex items-center gap-3">
          {saveStatus === "ok" && <span className="text-sm text-[#24bc4c]">Сохранено ✓</span>}
          {saveStatus === "error" && <span className="text-sm text-[#e0123f]">Ошибка сохранения</span>}
          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="rounded-xl bg-[#c20f36] px-5 py-2 text-sm font-medium text-white hover:bg-[#e0123f] active:bg-[#ab0d30] disabled:opacity-50 transition-colors"
          >
            {saveStatus === "saving" ? "Сохраняем…" : "Сохранить"}
          </button>
          <button type="button" onClick={handleLogout} className="rounded-xl border border-[#333333] px-4 py-2 text-sm text-[#a5a5a5] hover:text-[#fdfdfd] hover:border-[#4e4e4e] transition-colors">
            Выйти
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-52 shrink-0 overflow-y-auto border-r border-[#333333] py-4">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSection(s.id)}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                activeSection === s.id
                  ? "bg-[#1f1f1f] text-[#fdfdfd] font-medium"
                  : "text-[#7a7a7a] hover:text-[#fdfdfd] hover:bg-[#141414]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-2xl">
            {activeSection === "header" && <HeaderEditor data={data.header} onChange={(v) => setSection("header", v)} />}
            {activeSection === "footer" && <FooterEditor data={data.footer} onChange={(v) => setSection("footer", v)} />}
            {activeSection === "hero" && <HeroEditor data={data.hero} onChange={(v) => setSection("hero", v)} />}
            {activeSection === "cases" && <CasesEditor data={data.cases} onChange={(v) => setSection("cases", v)} />}
            {activeSection === "balance" && <BalanceEditor data={data.balance} onChange={(v) => setSection("balance", v)} />}
            {activeSection === "why" && <WhyEditor data={data.why} onChange={(v) => setSection("why", v)} />}
            {activeSection === "process" && <ProcessEditor data={data.process} onChange={(v) => setSection("process", v)} />}
            {activeSection === "roadmap" && <RoadmapEditor data={data.roadmap} onChange={(v) => setSection("roadmap", v)} />}
            {activeSection === "contact" && <ContactEditor data={data.contact} onChange={(v) => setSection("contact", v)} />}
            {activeSection === "services" && <ServicesEditor data={data.services} onChange={(v) => setSection("services", v)} />}
            {activeSection === "projectsList" && <ProjectsListEditor data={data.projectsList} onChange={(v) => setSection("projectsList", v)} />}
            {activeSection === "projectsDetail" && <ProjectDetailEditor slug="walmi" data={data.projectsDetail} onChange={(v) => setSection("projectsDetail", v)} />}
          </div>
        </main>
      </div>
    </div>
  );
}
