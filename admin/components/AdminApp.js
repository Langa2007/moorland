"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BedDouble,
  CalendarDays,
  CheckCircle2,
  GalleryHorizontal,
  ImagePlus,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Soup,
  Sparkles,
  Trash2,
  UploadCloud
} from "lucide-react";
import { createApi } from "@/lib/api";

const collectionConfig = {
  rooms: {
    label: "Rooms",
    icon: BedDouble,
    fields: [
      ["order", "number"],
      ["name", "text"],
      ["slug", "text"],
      ["rate", "number"],
      ["rateLabel", "text"],
      ["capacity", "number"],
      ["beds", "text"],
      ["size", "text"],
      ["description", "textarea"],
      ["amenities", "list"],
      ["featuredImage", "image"],
      ["gallery", "image-list"],
      ["active", "boolean"]
    ]
  },
  spaServices: {
    label: "SPA",
    icon: Sparkles,
    fields: [
      ["name", "text"],
      ["slug", "text"],
      ["durationMinutes", "number"],
      ["price", "number"],
      ["description", "textarea"],
      ["featuredImage", "image"],
      ["active", "boolean"]
    ]
  },
  menuItems: {
    label: "Menu",
    icon: Soup,
    fields: [
      ["category", "text"],
      ["name", "text"],
      ["slug", "text"],
      ["description", "textarea"],
      ["price", "number"],
      ["tags", "list"],
      ["featuredImage", "image"],
      ["active", "boolean"]
    ]
  },
  gallery: {
    label: "Gallery",
    icon: GalleryHorizontal,
    fields: [
      ["category", "text"],
      ["title", "text"],
      ["image", "image"],
      ["active", "boolean"]
    ]
  },
  blogPosts: {
    label: "Blog",
    icon: Pencil,
    fields: [
      ["title", "text"],
      ["slug", "text"],
      ["excerpt", "textarea"],
      ["content", "textarea"],
      ["tag", "text"],
      ["featuredImage", "image"],
      ["published", "boolean"]
    ]
  },
  testimonials: {
    label: "Testimonials",
    icon: CheckCircle2,
    fields: [
      ["name", "text"],
      ["role", "text"],
      ["quote", "textarea"],
      ["active", "boolean"]
    ]
  },
  availabilityBlocks: {
    label: "Availability",
    icon: CalendarDays,
    fields: [
      ["type", "select:type"],
      ["resourceId", "text"],
      ["from", "date"],
      ["to", "date"],
      ["reason", "textarea"]
    ]
  }
};

const transactionCollections = [
  "accommodationBookings",
  "spaBookings",
  "loungeReservations",
  "foodOrders",
  "contacts",
  "newsletterSubscribers",
  "payments",
  "uploads"
];

const emptyRecords = {
  rooms: { order: 1, name: "", slug: "", rate: 0, rateLabel: "", capacity: 2, beds: "", size: "", description: "", amenities: [], featuredImage: "", gallery: [], active: true },
  spaServices: { name: "", slug: "", durationMinutes: 60, price: 0, description: "", featuredImage: "", active: true },
  menuItems: { category: "", name: "", slug: "", description: "", price: 0, tags: [], featuredImage: "", active: true },
  gallery: { category: "", title: "", image: "", active: true },
  blogPosts: { title: "", slug: "", excerpt: "", content: "", tag: "", featuredImage: "", published: false },
  testimonials: { name: "", role: "", quote: "", active: true },
  availabilityBlocks: { type: "room", resourceId: "", from: "2026-07-01", to: "2026-07-02", reason: "" }
};

const imageSlotLabels = [
  ["hero", "Home hero", "Homepage first screen and opening blog image"],
  ["pool", "Pool & grounds", "Homepage pool band and Pool & Grounds hero"],
  ["spa", "SPA hero", "SPA page hero and wellness blog image"],
  ["lounge", "Lounge hero", "Lounge page hero and lounge experience card"],
  ["suite", "Suite cards", "Homepage experience cards and executive suite fallback"],
  ["garden", "Garden/exterior", "About page and exterior gallery fallback"]
];

const acceptedImageTypes = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
  ".bmp",
  ".tif",
  ".tiff",
  ".heic",
  ".heif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/heic",
  "image/heif"
].join(",");

function toTitle(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function fromFormValue(type, value) {
  if (type === "number") return Number(value || 0);
  if (type === "list" || type === "image-list") {
    return value.split("\n").map((item) => item.trim()).filter(Boolean);
  }
  return value;
}

function toFormValue(type, value) {
  if (type === "list" || type === "image-list") return (value || []).join("\n");
  return value ?? "";
}

export default function AdminApp() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [view, setView] = useState("dashboard");
  const [collection, setCollection] = useState("rooms");
  const [dashboard, setDashboard] = useState(null);
  const [records, setRecords] = useState({});
  const [transactions, setTransactions] = useState({});
  const [meta, setMeta] = useState(null);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const api = useMemo(() => createApi(token), [token]);
  const activeConfig = collectionConfig[collection];

  useEffect(() => {
    const savedToken = window.localStorage.getItem("moorland_admin_token");
    const savedUser = window.localStorage.getItem("moorland_admin_user");
    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (token) refreshAll();
  }, [token]);

  async function refreshAll() {
    setLoading(true);
    setStatus("");
    try {
      const [dash, metaRecord] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/admin/meta")
      ]);
      const collectionEntries = await Promise.all(
        Object.keys(collectionConfig).map(async (key) => [key, await api.get(`/admin/${key}`)])
      );
      const transactionEntries = await Promise.all(
        transactionCollections.map(async (key) => [key, await api.get(`/admin/transactions/${key}`).catch(() => [])])
      );
      setDashboard(dash);
      setMeta(metaRecord);
      setRecords(Object.fromEntries(collectionEntries));
      setTransactions(Object.fromEntries(transactionEntries));
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const formData = new FormData(event.currentTarget);
      const result = await createApi().login({
        email: formData.get("email"),
        password: formData.get("password")
      });
      window.localStorage.setItem("moorland_admin_token", result.token);
      window.localStorage.setItem("moorland_admin_user", JSON.stringify(result.user));
      setToken(result.token);
      setUser(result.user);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    window.localStorage.removeItem("moorland_admin_token");
    window.localStorage.removeItem("moorland_admin_user");
    setToken("");
    setUser(null);
  }

  async function saveRecord(formRecord) {
    const method = formRecord.id ? "PATCH" : "POST";
    const path = formRecord.id ? `/admin/${collection}/${formRecord.id}` : `/admin/${collection}`;
    const payload = { ...formRecord };
    delete payload.id;
    await api.send(path, method, payload);
    setEditing(null);
    await refreshAll();
  }

  async function deleteRecord(id) {
    if (!window.confirm("Delete this record?")) return;
    await api.remove(`/admin/${collection}/${id}`);
    await refreshAll();
  }

  async function saveMeta(nextMeta) {
    await api.send("/admin/meta", "PATCH", nextMeta);
    await refreshAll();
  }

  if (!token) {
    return (
      <main className="grid min-h-dvh place-items-center bg-cream p-5">
        <form className="w-full max-w-md rounded-lg bg-ivory p-6 shadow-soft" onSubmit={handleLogin}>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-14 w-14 rounded-full border border-pool/50 object-cover" />
            <div>
              <p className="text-sm font-black uppercase text-pool">Moorland Admin</p>
              <h1 className="font-serif text-4xl font-bold">Sign in</h1>
            </div>
          </div>
          <label className="mt-6 grid gap-2 text-sm font-bold text-mist">
            Email
            <input className="field" type="email" name="email" required />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-bold text-mist">
            Password
            <input className="field" type="password" name="password" required />
          </label>
          {status && <p className="mt-4 rounded-lg bg-red-100 p-3 text-sm font-bold text-red-800">{status}</p>}
          <button className="btn btn-primary mt-6 w-full" type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Sign in
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-dvh lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-line bg-charcoal p-4 text-ivory lg:min-h-dvh">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-12 w-12 rounded-full border border-pool/50 bg-cream object-cover" />
            <div>
              <p className="text-xs font-black uppercase text-pool">Moorland</p>
              <h1 className="font-serif text-2xl font-bold">Admin</h1>
            </div>
          </div>
          <button className="btn btn-ghost border-white/20 bg-white/10 text-ivory lg:hidden" onClick={refreshAll} type="button">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-6 grid gap-2">
          <NavButton active={view === "dashboard"} icon={LayoutDashboard} label="Dashboard" onClick={() => setView("dashboard")} />
          <NavButton active={view === "meta"} icon={ImagePlus} label="Site & images" onClick={() => setView("meta")} />
          {Object.entries(collectionConfig).map(([key, config]) => (
            <NavButton
              key={key}
              active={view === "content" && collection === key}
              icon={config.icon}
              label={config.label}
              onClick={() => {
                setCollection(key);
                setView("content");
              }}
            />
          ))}
          <NavButton active={view === "transactions"} icon={Mail} label="Requests" onClick={() => setView("transactions")} />
        </nav>

        <div className="mt-8 rounded-lg border border-white/10 bg-white/10 p-3 text-sm">
          <p className="font-bold">{user?.name}</p>
          <p className="text-cream/70">{user?.email}</p>
          <button className="btn btn-ghost mt-3 w-full border-white/20 bg-transparent text-ivory" type="button" onClick={logout}>
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <section className="p-4 md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase text-pool">{view}</p>
            <h2 className="font-serif text-4xl font-bold">{view === "content" ? activeConfig.label : toTitle(view)}</h2>
          </div>
          <button className="btn btn-ghost" onClick={refreshAll} type="button">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </button>
        </div>

        {status && <p className="mb-5 rounded-lg bg-red-100 p-3 text-sm font-bold text-red-800">{status}</p>}
        {view === "dashboard" && <Dashboard dashboard={dashboard} />}
        {view === "meta" && meta && (
          <MetaEditor
            meta={meta}
            api={api}
            uploads={transactions.uploads || []}
            onSave={saveMeta}
            onRefresh={refreshAll}
          />
        )}
        {view === "content" && (
          <ContentEditor
            collection={collection}
            config={activeConfig}
            records={records[collection] || []}
            editing={editing}
            setEditing={setEditing}
            onSave={saveRecord}
            onDelete={deleteRecord}
            api={api}
          />
        )}
        {view === "transactions" && <Transactions data={transactions} api={api} onRefresh={refreshAll} />}
      </section>
    </main>
  );
}

function NavButton({ active, icon: Icon, label, onClick }) {
  return (
    <button
      className={`btn justify-start ${active ? "bg-pool text-charcoal" : "bg-transparent text-ivory hover:bg-white/10"}`}
      type="button"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function Dashboard({ dashboard }) {
  const counts = dashboard?.counts || {};
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Object.entries(counts).map(([key, value]) => (
        <article key={key} className="rounded-lg bg-ivory p-5 shadow-soft">
          <p className="text-sm font-black uppercase text-mist">{toTitle(key)}</p>
          <p className="mt-3 text-4xl font-black">{value}</p>
        </article>
      ))}
    </div>
  );
}

function MetaEditor({ meta, api, uploads = [], onSave, onRefresh }) {
  const [draft, setDraft] = useState(meta);
  const [saveStatus, setSaveStatus] = useState("");
  useEffect(() => setDraft(meta), [meta]);

  function update(key, value) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function updateSlot(key, value) {
    setDraft((current) => ({
      ...current,
      imageSlots: { ...(current.imageSlots || {}), [key]: value }
    }));
  }

  async function saveSlot(key, value) {
    const nextDraft = {
      ...draft,
      imageSlots: { ...(draft.imageSlots || {}), [key]: value }
    };
    setDraft(nextDraft);
    setSaveStatus(`Saving ${toTitle(key)}...`);
    await onSave(nextDraft);
    setSaveStatus(`${toTitle(key)} updated on the public site.`);
  }

  return (
    <form
      className="grid gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft);
      }}
    >
      <section className="rounded-lg bg-ivory p-5 shadow-soft">
        <h3 className="font-serif text-2xl font-bold">Global image slots</h3>
        <p className="mt-2 text-sm leading-6 text-mist">
          These slots feed the fixed image positions on the public website. Uploading here saves the slot immediately.
        </p>
        {saveStatus && <p className="mt-3 rounded-lg bg-pool/15 p-3 text-sm font-bold text-charcoal">{saveStatus}</p>}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {imageSlotLabels.map(([key, label, hint]) => (
            <ImageField
              key={key}
              label={label}
              hint={hint}
              value={draft.imageSlots?.[key] || ""}
              onChange={(value) => saveSlot(key, value)}
              api={api}
            />
          ))}
        </div>
      </section>

      <MediaLibrary
        uploads={uploads}
        onUse={(slot, url) => saveSlot(slot, url)}
        onDelete={async (id) => {
          await api.remove(`/admin/uploads/${id}`);
          await onRefresh?.();
        }}
      />

      <section className="rounded-lg bg-ivory p-5 shadow-soft">
        <h3 className="font-serif text-2xl font-bold">Contact and SEO</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {["brandName", "tagline", "openingDate", "location", "phone", "email", "website", "whatsapp"].map((key) => (
            <label key={key} className="grid gap-2 text-sm font-bold text-mist">
              {toTitle(key)}
              <input className="field" value={draft[key] || ""} onChange={(event) => update(key, event.target.value)} />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-bold text-mist md:col-span-2">
            SEO keywords
            <textarea className="field min-h-28" value={(draft.seoKeywords || []).join("\n")} onChange={(event) => update("seoKeywords", fromFormValue("list", event.target.value))} />
          </label>
        </div>
      </section>

      <button className="btn btn-primary w-fit" type="submit">
        <Save className="h-4 w-4" />
        Save site settings
      </button>
    </form>
  );
}

function MediaLibrary({ uploads, onUse, onDelete }) {
  const [copied, setCopied] = useState("");

  return (
    <section className="rounded-lg bg-ivory p-5 shadow-soft">
      <h3 className="font-serif text-2xl font-bold">Uploaded media</h3>
      <p className="mt-2 text-sm leading-6 text-mist">
        Use uploaded images for the global slots, copy the URL for content records, or delete old uploads.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {uploads.length === 0 ? (
          <p className="text-sm text-mist">No uploaded images yet. Upload from any image field above or in a content record.</p>
        ) : uploads.map((upload) => (
          <article key={upload.id} className="rounded-lg border border-line bg-cream/50 p-3">
            <img src={upload.url} alt="" className="h-40 w-full rounded-lg object-cover" />
            <p className="mt-2 truncate text-xs font-bold text-mist">{upload.originalName || upload.url}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {imageSlotLabels.map(([slot, label]) => (
                <button key={slot} className="btn btn-ghost min-h-10 px-2 text-xs" type="button" onClick={() => onUse(slot, upload.url)}>
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                className="btn btn-ghost flex-1"
                type="button"
                onClick={async () => {
                  await navigator.clipboard?.writeText(upload.url);
                  setCopied(upload.id);
                }}
              >
                {copied === upload.id ? "Copied" : "Copy URL"}
              </button>
              <button className="btn btn-danger" type="button" onClick={() => onDelete(upload.id)}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContentEditor({ collection, config, records, editing, setEditing, onSave, onDelete, api }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_440px]">
      <section className="grid gap-4">
        <button className="btn btn-accent w-fit" type="button" onClick={() => setEditing({ ...emptyRecords[collection] })}>
          <Plus className="h-4 w-4" />
          New {config.label}
        </button>
        {records.map((record) => (
          <article key={record.id} className="grid gap-4 rounded-lg bg-ivory p-4 shadow-soft md:grid-cols-[160px_1fr_auto]">
            <PreviewImage record={record} />
            <div>
              <p className="text-xs font-black uppercase text-pool">{record.category || record.tag || record.role || record.type || config.label}</p>
              <h3 className="mt-1 font-serif text-2xl font-bold">{record.title || record.name || record.reason || record.id}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-mist">{record.description || record.excerpt || record.quote || record.message || record.id}</p>
            </div>
            <div className="flex gap-2 md:flex-col">
              <button className="btn btn-ghost" type="button" onClick={() => setEditing(record)}>
                <Pencil className="h-4 w-4" />
                Edit
              </button>
              <button className="btn btn-danger" type="button" onClick={() => onDelete(record.id)}>
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
      <aside className="rounded-lg bg-ivory p-5 shadow-soft xl:sticky xl:top-6 xl:h-fit">
        {editing ? (
          <RecordForm config={config} record={editing} onCancel={() => setEditing(null)} onSave={onSave} api={api} />
        ) : (
          <p className="text-sm leading-6 text-mist">Choose a record to edit, or create a new one. Image fields accept Cloudinary upload or a direct URL.</p>
        )}
      </aside>
    </div>
  );
}

function RecordForm({ config, record, onCancel, onSave, api }) {
  const [draft, setDraft] = useState(record);
  const [saveHint, setSaveHint] = useState("");
  useEffect(() => setDraft(record), [record]);

  function update(key, value) {
    setDraft((current) => ({ ...current, [key]: value }));
    if (key === "featuredImage" || key === "image" || key === "gallery") {
      setSaveHint("Image added. Click Save to publish this record to the public site.");
    }
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(draft);
      }}
    >
      <h3 className="font-serif text-2xl font-bold">{draft.id ? "Edit" : "Create"} {config.label}</h3>
      {saveHint && <p className="rounded-lg bg-pool/15 p-3 text-sm font-bold text-charcoal">{saveHint}</p>}
      {config.fields.map(([key, type]) => (
        <Field key={key} name={key} type={type} value={draft[key]} onChange={(value) => update(key, value)} api={api} />
      ))}
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-primary" type="submit">
          <Save className="h-4 w-4" />
          Save
        </button>
        <button className="btn btn-ghost" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function Field({ name, type, value, onChange, api }) {
  if (type === "boolean") {
    return (
      <label className="flex items-center gap-3 rounded-lg border border-line bg-cream/60 p-3 text-sm font-bold text-mist">
        <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
        {toTitle(name)}
      </label>
    );
  }

  if (type === "image") {
    return <ImageField label={toTitle(name)} value={value || ""} onChange={onChange} api={api} />;
  }

  if (type === "image-list") {
    return (
      <div className="grid gap-2 text-sm font-bold text-mist">
        <label className="grid gap-2">
          {toTitle(name)}
          <textarea className="field min-h-28" value={toFormValue(type, value)} onChange={(event) => onChange(fromFormValue(type, event.target.value))} />
        </label>
        <ImageField label="Upload and append" value="" onChange={(url) => onChange([...(value || []), url])} api={api} compact />
      </div>
    );
  }

  if (type === "textarea" || type === "list") {
    return (
      <label className="grid gap-2 text-sm font-bold text-mist">
        {toTitle(name)}
        <textarea className="field min-h-28" value={toFormValue(type, value)} onChange={(event) => onChange(fromFormValue(type, event.target.value))} />
      </label>
    );
  }

  if (type.startsWith("select:")) {
    return (
      <label className="grid gap-2 text-sm font-bold text-mist">
        {toTitle(name)}
        <select className="field" value={value || "room"} onChange={(event) => onChange(event.target.value)}>
          <option value="room">Room</option>
          <option value="spa">SPA</option>
          <option value="lounge">Lounge</option>
        </select>
      </label>
    );
  }

  return (
    <label className="grid gap-2 text-sm font-bold text-mist">
      {toTitle(name)}
      <input className="field" type={type} value={toFormValue(type, value)} onChange={(event) => onChange(fromFormValue(type, event.target.value))} />
    </label>
  );
}

function ImageField({ label, value, onChange, api, compact = false, hint = "" }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    setError("");
    try {
      const image = await api.upload(file);
      
      if (!image || !image.url) {
        throw new Error("Server response did not include an image URL: " + JSON.stringify(image));
      }
      
      await Promise.resolve(onChange(image.url));
    } catch (uploadError) {
      const errMsg = uploadError.message || "Image upload failed.";
      setError(errMsg);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="grid gap-2 text-sm font-bold text-mist">
      <span>{label}</span>
      {hint ? <p className="text-xs font-medium leading-5 text-mist/80">{hint}</p> : null}
      {!compact && value ? <img src={value} alt="" className="h-36 w-full rounded-lg object-cover" /> : null}
      {!compact && <input className="field" value={value || ""} onChange={(event) => onChange(event.target.value)} placeholder="https://res.cloudinary.com/..." />}
      <button
        type="button"
        className={`btn btn-ghost cursor-pointer ${uploading ? "pointer-events-none opacity-60" : ""}`}
        onClick={() => {
          if (!fileInputRef.current) {
            setError("File input element not found. Refresh the page and try again.");
            return;
          }
          fileInputRef.current.click();
        }}
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
        {uploading ? "Uploading..." : compact ? "Upload and append" : "Upload image"}
      </button>
      <input
        ref={fileInputRef}
        className="sr-only"
        type="file"
        accept={acceptedImageTypes}
        disabled={uploading}
        onChange={upload}
      />
      <p className="text-xs font-medium text-mist/70">Accepted: JPG, JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF, HEIC, HEIF.</p>
      {error ? <p className="rounded-lg bg-red-100 p-2 text-xs font-bold text-red-800">{error}</p> : null}
    </div>
  );
}

function PreviewImage({ record }) {
  const image = record.featuredImage || record.image || record.gallery?.[0] || "";
  if (!image) return <div className="h-32 rounded-lg bg-cream" />;
  return <img src={image} alt="" className="h-32 w-full rounded-lg object-cover md:h-full" />;
}

function Transactions({ data, api, onRefresh }) {
  async function updateStatus(collection, id, status) {
    await api.send(`/admin/transactions/${collection}/${id}/status`, "PATCH", { status });
    await onRefresh();
  }

  async function deleteUpload(id) {
    if (!window.confirm("Delete this uploaded image?")) return;
    await api.remove(`/admin/uploads/${id}`);
    await onRefresh();
  }

  return (
    <div className="grid gap-6">
      {Object.entries(data).map(([collection, records]) => (
        <section key={collection} className="rounded-lg bg-ivory p-5 shadow-soft">
          <h3 className="font-serif text-2xl font-bold">{toTitle(collection)}</h3>
          <div className="mt-4 grid gap-3">
            {records.length === 0 ? (
              <p className="text-sm text-mist">No records yet.</p>
            ) : records.map((record) => (
              <article key={record.id} className="grid gap-3 rounded-lg border border-line p-3 md:grid-cols-[1fr_auto]">
                <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
                  {record.url ? <img src={record.url} alt="" className="h-24 w-full rounded-lg object-cover" /> : null}
                  <div>
                  <p className="font-bold">{record.name || record.email || record.referenceType || record.originalName || record.id}</p>
                  <p className="mt-1 text-sm leading-6 text-mist">{record.message || record.notes || record.status || record.url || record.id}</p>
                  </div>
                </div>
                {collection === "uploads" ? (
                  <button className="btn btn-danger" type="button" onClick={() => deleteUpload(record.id)}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                ) : "status" in record && (
                  <select className="field max-w-44" value={record.status} onChange={(event) => updateStatus(collection, record.id, event.target.value)}>
                    {["new", "active", "pending", "confirmed", "cancelled", "completed", "paid", "failed"].map((status) => (
                      <option key={status} value={status}>{toTitle(status)}</option>
                    ))}
                  </select>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
