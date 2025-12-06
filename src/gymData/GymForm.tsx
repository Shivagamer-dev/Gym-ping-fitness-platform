import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingGif from "../assets/Loading.gif";

const rup = /^₹?\s*\d+(\.\d{1,2})?$/;

const DEFAULT_EQUIPMENT = [
  "Treadmill",
  "Elliptical",
  "Spin Bike",
  "Stair Climber",
  "Rowing Machine",
  "Dumbbells",
  "Kettlebells",
  "Barbell Set",
  "Bench Press",
  "Smith Machine",
  "Squat Rack",
  "Leg Press Machine",
  "Leg Extension",
  "Leg Curl",
  "Lat Pulldown",
  "Seated Row",
  "Cable Crossover",
  "Pull-up Bar",
  "Dip Station",
  "Battle Ropes",
  "Medicine Ball",
];
const DEFAULT_SET = new Set(DEFAULT_EQUIPMENT.map((s) => s.toLowerCase()));

// Category buckets for the panel
const CATEGORY_GROUPS: Record<string, string[]> = {
  Cardio: ["Treadmill", "Elliptical", "Spin Bike", "Rowing Machine", "Stair Climber"],
  "Strength Machines": [
    "Smith Machine",
    "Squat Rack",
    "Leg Press Machine",
    "Leg Extension",
    "Leg Curl",
    "Lat Pulldown",
    "Seated Row",
    "Cable Crossover",
    "Bench Press",
  ],
  "Free Weights": ["Dumbbells", "Kettlebells", "Barbell Set"],
  "Functional & Accessories": ["Battle Ropes", "Medicine Ball", "Dip Station"],
  "Body-weight": ["Pull-up Bar"],
  Custom: [],
};

const GymSchema = z.object({
  gymName: z.string().min(2, "Gym name is required"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("").transform(() => undefined)),
  phone: z.string().regex(/^\d{10}$/, "Enter 10 digits (no +91)"),
  location: z.string().min(3, "Location is required"),
  pinLocationUrl: z.string().url("Enter a valid Google Maps URL"),
  hasPersonalTrainer: z.enum(["Yes", "No"]),
  personalTrainerPrice: z.string().optional(),
  basePrice: z.string().regex(rup, "Enter price like 799 or ₹799"),
  equipment: z.array(z.string()).min(1, "Select at least one equipment"),
  images: z.array(z.object({ slot: z.number() })).length(4, "Exactly 4 images are required"),
  daysTimings: z.string().min(2, "Enter open days & timings"),
  avgMonthlyUsers: z.string().regex(/^\d+$/, "Enter a number").transform((v) => v.trim()),
});
type GymFormData = z.infer<typeof GymSchema>;

/* =========================
   Local "DB" in localStorage
========================= */

type StoredImage = { file_name: string; storage_path: string | null; public_url: string };
type StoredGym = {
  gym_id: string;
  gym_name: string;
  contact_number: string;
  email_id: string | null;
  address: string;
  pin_location: string;
  personal_trainer: { available: boolean; price: number | null };
  membership_price: number | null;
  equipment_list: string[];
  images: StoredImage[];
  days_timings: string;
  avg_monthly_users: number;
  created_at: string;
};
type DB = Record<string, StoredGym>;
const DB_KEY = "gymsDB";

function getDB(): DB {
  try {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? (JSON.parse(raw) as DB) : {};
  } catch {
    return {};
  }
}
function setDB(db: DB) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}
function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function numeric(val: string) {
  const n = Number(String(val).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? Math.round(n) : null;
}
function genUniqueGymId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  const db = getDB();
  let candidate = "";
  let tries = 0;
  do {
    candidate = "";
    for (let i = 0; i < 6; i++) candidate += alphabet[Math.floor(Math.random() * alphabet.length)];
    tries++;
  } while (db[candidate] && tries < 50);
  return candidate;
}

/* =========================
   Component
========================= */

export default function GymForm() {
  /** Loader: show until the whole page has loaded (no fixed delay). */
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    const done = () => setSplash(false);
    if (document.readyState === "complete") {
      done();
    } else {
      window.addEventListener("load", done, { once: true });
      // Safety: if load never fires for some reason, fallback shortly after paint.
      const t = setTimeout(() => setSplash(false), 5000);
      return () => {
        clearTimeout(t);
        window.removeEventListener("load", done);
      };
    }
  }, []);

  // files + previews (fixed length 4)
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [previewURLs, setPreviewURLs] = useState<(string | null)[]>([null, null, null, null]);
  const fileInputs = useRef<Array<HTMLInputElement | null>>([null, null, null, null]);

  // equipment panel
  const [equipOpen, setEquipOpen] = useState(false);
  const [equipmentOptions, setEquipmentOptions] = useState<string[]>(DEFAULT_EQUIPMENT);
  const [newEquip, setNewEquip] = useState("");
  const [equipSearch, setEquipSearch] = useState("");

  // anchor + positioning for the panel
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [panelMode, setPanelMode] = useState<"popover" | "drawer">("popover");
  const [panelRect, setPanelRect] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 640,
  });

  // loader (DB)
  const [lookupId, setLookupId] = useState("");
  const [activeGymId, setActiveGymId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GymFormData>({
    resolver: zodResolver(GymSchema),
    defaultValues: {
      hasPersonalTrainer: "No",
      equipment: [],
      images: [{ slot: 1 }, { slot: 2 }, { slot: 3 }, { slot: 4 }],
    },
  });

  const { fields, replace } = useFieldArray({ control, name: "images" });

  // autosave draft
  useEffect(() => {
    const sub = watch((val) => {
      try {
        localStorage.setItem("gymFormDraft", JSON.stringify(val));
      } catch { }
    });
    try {
      const raw = localStorage.getItem("gymFormDraft");
      if (raw) {
        const parsed = JSON.parse(raw);
        Object.entries(parsed).forEach(([k, v]) =>
          setValue(k as keyof GymFormData, v as any, { shouldDirty: false })
        );
        replace([{ slot: 1 }, { slot: 2 }, { slot: 3 }, { slot: 4 }]);
        setSelectedFiles([null, null, null, null]);
        setPreviewURLs([null, null, null, null]);
      }
    } catch { }
    return () => sub.unsubscribe();
  }, [watch, setValue, replace]);

  useEffect(() => {
    return () => {
      previewURLs.forEach((u) => u && URL.revokeObjectURL(u));
    };
  }, [previewURLs]);

  /* ---------- Equipment helpers ---------- */

  // Build category map including custom items
  const categorized = useMemo(() => {
    const map: Record<string, string[]> = JSON.parse(JSON.stringify(CATEGORY_GROUPS));
    for (const opt of equipmentOptions) {
      const inAny = Object.entries(CATEGORY_GROUPS).some(([, arr]) => arr.includes(opt));
      if (!inAny) {
        if (!map["Custom"].includes(opt)) map["Custom"].push(opt);
      }
    }
    const q = equipSearch.toLowerCase().trim();
    if (!q) return map;
    const filtered: Record<string, string[]> = {};
    for (const [cat, arr] of Object.entries(map)) {
      const sub = arr.filter((x) => x.toLowerCase().includes(q));
      if (sub.length) filtered[cat] = sub;
    }
    return filtered;
  }, [equipmentOptions, equipSearch]);

  const addNewEquipment = (currentSelected: string[]) => {
    const value = newEquip.trim();
    if (!value) return;
    if (!equipmentOptions.some((o) => o.toLowerCase() === value.toLowerCase())) {
      setEquipmentOptions((opts) => [...opts, value]);
    }
    if (!currentSelected.includes(value)) {
      setValue("equipment", [...currentSelected, value], { shouldDirty: true, shouldTouch: true });
    }
    setNewEquip("");
  };

  const deleteOption = (opt: string, currentSelected: string[]) => {
    if (DEFAULT_SET.has(opt.toLowerCase())) return;
    if (!window.confirm(`Delete "${opt}" from the master list?`)) return;

    setEquipmentOptions((opts) => opts.filter((o) => o !== opt));
    if (currentSelected.includes(opt)) {
      setValue(
        "equipment",
        currentSelected.filter((v) => v !== opt),
        { shouldDirty: true, shouldTouch: true }
      );
    }
  };

  /* ---------- Panel positioning ---------- */

  const recalcPanelPosition = () => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();

    const desiredWidth = Math.min(720, Math.max(560, Math.floor(window.innerWidth * 0.42)));
    const gap = 16;
    const spaceRight = window.innerWidth - rect.right - gap;

    if (spaceRight < desiredWidth * 0.8 || window.innerWidth < 1024) {
      // Not enough space: use drawer mode
      setPanelMode("drawer");
    } else {
      setPanelMode("popover");
      setPanelRect({
        top: Math.max(12, rect.top),
        left: rect.right + gap,
        width: desiredWidth,
      });
    }
  };

  useLayoutEffect(() => {
    if (!equipOpen) return;
    recalcPanelPosition();
    const onScroll = () => recalcPanelPosition();
    const onResize = () => recalcPanelPosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [equipOpen]);

  /* ---------- Loader ---------- */
  function loadGymById(idRaw: string) {
    const id = idRaw.trim().toUpperCase();
    if (!id) return;
    const db = getDB();
    const rec = db[id];
    if (!rec) {
      alert("No record found for this Gym ID.");
      return;
    }

    const phoneDigits = rec.contact_number.replace(/[^\d]/g, "").slice(-10);

    const formValues: Partial<GymFormData> = {
      gymName: rec.gym_name,
      email: rec.email_id ?? undefined,
      phone: phoneDigits,
      location: rec.address,
      pinLocationUrl: rec.pin_location,
      hasPersonalTrainer: rec.personal_trainer.available ? "Yes" : "No",
      personalTrainerPrice:
        rec.personal_trainer.available && rec.personal_trainer.price != null
          ? String(rec.personal_trainer.price)
          : "",
      basePrice: rec.membership_price != null ? String(rec.membership_price) : "",
      equipment: rec.equipment_list,
      images: [{ slot: 1 }, { slot: 2 }, { slot: 3 }, { slot: 4 }],
      daysTimings: rec.days_timings,
      avgMonthlyUsers: String(rec.avg_monthly_users),
    };

    reset(formValues as GymFormData);
    setSelectedFiles([null, null, null, null]);
    setPreviewURLs([null, null, null, null]);
    setActiveGymId(id);
  }

  function startNewRecord() {
    setActiveGymId(null);
    reset({
      gymName: "",
      email: undefined,
      phone: "",
      location: "",
      pinLocationUrl: "",
      hasPersonalTrainer: "No",
      personalTrainerPrice: "",
      basePrice: "",
      equipment: [],
      images: [{ slot: 1 }, { slot: 2 }, { slot: 3 }, { slot: 4 }],
      daysTimings: "",
      avgMonthlyUsers: "",
    });
    setSelectedFiles([null, null, null, null]);
    setPreviewURLs([null, null, null, null]);
  }

  const resetToFour = () => {
    replace([{ slot: 1 }, { slot: 2 }, { slot: 3 }, { slot: 4 }]);
    previewURLs.forEach((u) => u && URL.revokeObjectURL(u));
    setSelectedFiles([null, null, null, null]);
    setPreviewURLs([null, null, null, null]);
    fileInputs.current.forEach((el) => {
      if (el) el.value = "";
    });
  };

  /* ---------- Images helpers ---------- */
  const clearImageAt = (idx: number) => {
    setSelectedFiles((arr) => {
      const next = [...arr];
      next[idx] = null;
      return next;
    });
    setPreviewURLs((arr) => {
      const next = [...arr];
      if (next[idx]) URL.revokeObjectURL(next[idx] as string);
      next[idx] = null;
      return next;
    });
    const input = fileInputs.current[idx];
    if (input) input.value = "";
  };

  /* ---------- Submit ---------- */
  const onSubmit = async (values: GymFormData) => {
    const images: StoredImage[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const f = selectedFiles[i];
      if (!f) continue;
      const blobUrl = URL.createObjectURL(f);
      images.push({
        file_name: f.name,
        storage_path: null,
        public_url: blobUrl,
      });
    }

    const hasPTNow = values.hasPersonalTrainer === "Yes";
    const membershipPrice = numeric(values.basePrice);
    const ptPrice = hasPTNow ? numeric(values.personalTrainerPrice || "") : null;

    const gymId = activeGymId ?? genUniqueGymId();

    const gymObject: StoredGym = {
      gym_id: gymId,
      gym_name: values.gymName,
      contact_number: `+91 ${values.phone}`,
      email_id: values.email ?? null,
      address: values.location,
      pin_location: values.pinLocationUrl,
      personal_trainer: { available: hasPTNow, price: hasPTNow ? ptPrice : null },
      membership_price: membershipPrice,
      equipment_list: values.equipment,
      images,
      days_timings: values.daysTimings,
      avg_monthly_users: Number(values.avgMonthlyUsers),
      created_at: new Date().toISOString(),
    };

    const db = getDB();
    db[gymId] = gymObject;
    setDB(db);

    setActiveGymId(gymId);
    alert(`Saved! Your Gym ID is ${gymId}`);
  };

  function exportCurrent() {
    const db = getDB();
    if (!activeGymId || !db[activeGymId]) {
      alert("Nothing to export yet. Save the form first.");
      return;
    }
    const exportObject = { data: [db[activeGymId]] };
    downloadJSON(`gym_${activeGymId}.json`, exportObject);
  }

  /* =========================
     Render
  ========================= */

  if (splash) {
    return (
      <div className="relative min-h-screen grid place-items-center bg-[#0a0f18]">
        <img src={LoadingGif} alt="Loading…" className="w-28 h-28 object-contain" />
        <p className="mt-4 text-sm text-gray-300">Loading…</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0f18] text-white">
      {/* Aurora bg – slightly toned for cleaner look */}
      <div
        className="pointer-events-none absolute inset-0
          [background:radial-gradient(1100px_500px_at_12%_-10%,rgba(99,102,241,.18),transparent_60%),
                      radial-gradient(900px_600px_at_90%_8%,rgba(56,189,248,.18),transparent_55%),
                      radial-gradient(800px_500px_at_50%_110%,rgba(16,185,129,.16),transparent_60%)]
          blur-[2px]"
      />
      <div className="relative px-5 md:px-10 pt-28 md:pt-32 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Loader card */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3">
              <div className="font-semibold text-gray-200">Already registered? Enter your Gym ID:</div>
              <div className="flex-1 flex gap-2">
                <input
                  value={lookupId}
                  onChange={(e) => setLookupId(e.target.value.toUpperCase())}
                  placeholder="e.g. 7Q9LPA"
                  className="w-full rounded-xl bg-[#0b1220] border border-white/10 px-4 py-2.5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                />
                <button
                  type="button"
                  onClick={() => loadGymById(lookupId)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 font-semibold shadow-[0_6px_20px_rgba(99,102,241,0.28)] hover:scale-[1.02] transition"
                >
                  OK
                </button>
                <button
                  type="button"
                  onClick={startNewRecord}
                  className="px-4 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 transition"
                  title="Clear and start a new record"
                >
                  New
                </button>
              </div>
              {activeGymId && (
                <div className="md:ml-auto text-sm text-gray-300">
                  Loaded Gym ID: <span className="font-mono text-white">{activeGymId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                {activeGymId ? "Edit Gym" : "Add a Gym"}
              </span>
            </h1>
            <p className="text-gray-300 mt-2">
              Data is saved locally in this browser (as a placeholder for your real backend).
            </p>
          </div>

          {/* Form wrapper */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.35)] p-6 md:p-8 space-y-10"
          >
            {/* Basic Info */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-sky-400 grid place-items-center text-sm font-bold">
                  1
                </div>
                <h2 className="text-xl font-semibold">Basic information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-1 text-gray-300">Gym Name</label>
                  <input
                    {...register("gymName")}
                    className="w-full rounded-xl bg-[#0b1220] border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                    placeholder="Back&Bone Fitness"
                  />
                  {errors.gymName && <p className="text-red-400 text-sm mt-1">{errors.gymName.message}</p>}
                </div>

                <div>
                  <label className="block mb-1 text-gray-300">Phone (auto +91)</label>
                  <div className="flex">
                    <span className="select-none rounded-l-xl bg-[#0b1220] border border-r-0 border-white/10 px-3 py-3 text-gray-300">
                      +91
                    </span>
                    <input
                      {...register("phone")}
                      className="w-full rounded-r-xl bg-[#0b1220] border border-white/10 border-l-0 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                      inputMode="numeric"
                      pattern="\d{10}"
                      maxLength={10}
                      placeholder="1234567890"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Enter 10 digits only.</p>
                  {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block mb-1 text-gray-300">Email (optional)</label>
                  <input
                    {...register("email")}
                    className="w-full rounded-xl bg-[#0b1220] border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                    placeholder="contact@yourgym.in"
                  />
                  {errors.email && <p className="text-red-400 text-sm">{(errors.email.message as any) || ""}</p>}
                </div>

                <div>
                  <label className="block mb-1 text-gray-300">Location (address / area)</label>
                  <input
                    {...register("location")}
                    className="w-full rounded-xl bg-[#0b1220] border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                    placeholder="Rajpur Road, Dehradun"
                  />
                  {errors.location && <p className="text-red-400 text-sm">{errors.location.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-1 text-gray-300">Pin Location URL (Google Maps)</label>
                  <input
                    {...register("pinLocationUrl")}
                    className="w-full rounded-xl bg-[#0b1220] border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                    placeholder="https://maps.google.com/..."
                  />
                  {errors.pinLocationUrl && (
                    <p className="text-red-400 text-sm">{errors.pinLocationUrl.message}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-sky-400 grid place-items-center text-sm font-bold">
                  2
                </div>
                <h2 className="text-xl font-semibold">Pricing</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block mb-1 text-gray-300">Base Price (Monthly)</label>
                  <input
                    {...register("basePrice")}
                    className="w-full rounded-xl bg-[#0b1220] border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                    placeholder="₹999"
                  />
                  {errors.basePrice && <p className="text-red-400 text-sm">{errors.basePrice.message}</p>}
                </div>

                <div>
                  <label className="block mb-1 text-gray-300">Personal Trainer</label>
                  <select
                    {...register("hasPersonalTrainer")}
                    className="w-full rounded-xl bg-[#0b1220] border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-gray-300">PT Price</label>
                  <input
                    {...register("personalTrainerPrice")}
                    disabled={watch("hasPersonalTrainer") !== "Yes"}
                    className="w-full rounded-xl bg-[#0b1220] border border-white/10 px-4 py-3 placeholder-gray-400 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                    placeholder="₹1200 / session"
                  />
                </div>
              </div>
            </section>

            {/* Equipment */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-sky-400 grid place-items-center text-sm font-bold">
                  3
                </div>
                <h2 className="text-xl font-semibold">Equipments </h2>
              </div>

              <Controller
                control={control}
                name="equipment"
                render={({ field }) => {
                  const selected = field.value || [];

                  const toggle = (opt: string) => {
                    if (selected.includes(opt)) {
                      field.onChange(selected.filter((v: string) => v !== opt));
                    } else {
                      field.onChange([...selected, opt]);
                    }
                  };

                  const allOptionsFlat = equipmentOptions;

                  return (
                    <>
                      <div ref={anchorRef}>
                        <button
                          type="button"
                          onClick={() => {
                            setEquipOpen(true);
                            recalcPanelPosition();
                          }}
                          className="w-full text-left rounded-xl bg-[#0b1220] border border-white/10 px-4 py-3 hover:border-white/20 transition"
                        >
                          {selected.length === 0 ? (
                            <span className="text-gray-400">Manage equipment</span>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {selected.slice(0, 8).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm bg-white/[0.03]"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    className="opacity-70 hover:opacity-100"
                                    onClick={() => toggle(tag)}
                                    aria-label={`Remove ${tag}`}
                                    title="Remove from selection"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                              {selected.length > 8 && (
                                <span className="text-sm text-gray-300">+{selected.length - 8} more</span>
                              )}
                            </div>
                          )}
                        </button>
                      </div>

                      {/* Panel */}
                      {equipOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40 bg-black/50"
                            onClick={() => setEquipOpen(false)}
                          />
                          {/* Popover mode (opens right of the control) */}
                          {panelMode === "popover" ? (
                            <aside
                              className="z-50 rounded-xl border border-white/10 bg-[#0b1220] shadow-2xl overflow-hidden flex flex-col"
                              style={{
                                position: "fixed",
                                top: panelRect.top,
                                left: panelRect.left,
                                width: panelRect.width,
                                maxHeight: "80vh",
                              }}
                              role="dialog"
                              aria-modal="true"
                            >
                              <PanelContents
                                categorized={categorized}
                                DEFAULT_SET={DEFAULT_SET}
                                selected={selected}
                                onToggle={toggle}
                                onDelete={(opt) => deleteOption(opt, selected)}
                                equipSearch={equipSearch}
                                setEquipSearch={setEquipSearch}
                                newEquip={newEquip}
                                setNewEquip={setNewEquip}
                                addNew={() => addNewEquipment(selected)}
                                selectAll={() => field.onChange(allOptionsFlat)}
                                clearAll={() => field.onChange([])}
                                onDone={() => setEquipOpen(false)}
                              />
                            </aside>
                          ) : (
                            // Drawer fallback
                            <aside
                              className="fixed right-0 top-0 z-50 h-[85vh] w-full sm:w-[560px] md:w-[720px] bg-[#0b1220] border-l border-white/10 shadow-2xl rounded-l-2xl overflow-hidden flex flex-col"
                              role="dialog"
                              aria-modal="true"
                            >
                              <PanelContents
                                categorized={categorized}
                                DEFAULT_SET={DEFAULT_SET}
                                selected={selected}
                                onToggle={toggle}
                                onDelete={(opt) => deleteOption(opt, selected)}
                                equipSearch={equipSearch}
                                setEquipSearch={setEquipSearch}
                                newEquip={newEquip}
                                setNewEquip={setNewEquip}
                                addNew={() => addNewEquipment(selected)}
                                selectAll={() => field.onChange(allOptionsFlat)}
                                clearAll={() => field.onChange([])}
                                onDone={() => setEquipOpen(false)}
                              />
                            </aside>
                          )}
                        </>
                      )}

                      {errors.equipment && (
                        <p className="text-red-400 text-sm mt-2">{errors.equipment.message}</p>
                      )}
                    </>
                  );
                }}
              />
            </section>

            {/* Images (exactly 4) */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-sky-400 grid place-items-center text-sm font-bold">
                  4
                </div>
                <h2 className="text-xl font-semibold">Images</h2>
                <span className="ml-2 text-sm text-gray-400">(exactly 4 file uploads)</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-300">
                  Please upload 4 images. Use “Reset to 4 slots” to clear selections.
                </div>
                <button
                  type="button"
                  onClick={resetToFour}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-sky-400 
             text-sm font-semibold shadow-[0_4px_14px_rgba(99,102,241,0.25)]
             hover:scale-[1.03] active:scale-[0.97] transition"
                >
                  Reset to 4 slots
                </button>
              </div>


                <div className="grid sm:grid-cols-2 gap-4">
                  {fields.map((f, idx) => (
                    <div key={f.id} className="rounded-xl border border-white/10 bg-[#0b1220] p-3">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="rounded-md bg-white/[0.06] border border-white/10 px-2 py-1 text-sm text-gray-200">
                          File
                        </span>
                        <span className="text-sm text-gray-400">Image {idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => clearImageAt(idx)}
                          className="ml-auto inline-flex items-center gap-1 rounded-md bg-red-600/90 hover:bg-red-500 px-3 py-1.5 text-xs font-medium"
                          title="Remove this image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                            <path d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h5a1 1 0 1 1 0 2h-1.05l-1.2 12.02A3 3 0 0 1 14.76 21H9.24a3 3 0 0 1-2.99-2.98L5.05 6H4a1 1 0 1 1 0-2h5V3Zm2 1h2V3h-2v1ZM7.05 6l1.18 11.8a1 1 0 0 0 1 .9h5.52a1 1 0 0 0 1-.9L16.95 6H7.05Zm3.95 3a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" />
                          </svg>
                          Delete
                        </button>
                      </div>

                      {previewURLs[idx] && (
                        <div className="mb-3">
                          <img
                            src={previewURLs[idx] as string}
                            alt={`preview-${idx + 1}`}
                            className="w-full h-40 object-cover rounded-lg border border-white/10"
                          />
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        ref={(el) => (fileInputs.current[idx] = el)}
                        className="w-full rounded-lg bg-[#0a1120] border border-white/10 px-3 py-2 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-white/90 file:hover:bg-white/20"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setSelectedFiles((arr) => {
                            const next = [...arr];
                            next[idx] = file;
                            return next;
                          });
                          setPreviewURLs((arr) => {
                            const next = [...arr];
                            if (next[idx]) URL.revokeObjectURL(next[idx] as string);
                            next[idx] = file ? URL.createObjectURL(file) : null;
                            return next;
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
                {errors.images && <p className="text-red-400 text-sm mt-2">{errors.images.message as any}</p>}
            </section>

            {/* Operations */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-sky-400 grid place-items-center text-sm font-bold">
                  5
                </div>
                <h2 className="text-xl font-semibold">Operations</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-1 text-gray-300">Days & Timings</label>
                  <input
                    {...register("daysTimings")}
                    className="w-full rounded-xl bg-[#0b1220] border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                    placeholder="Mon–Sat, 5 AM – 11 PM"
                  />
                  {errors.daysTimings && <p className="text-red-400 text-sm">{errors.daysTimings.message}</p>}
                </div>

                <div>
                  <label className="block mb-1 text-gray-300">Avg. Monthly Users / Subscribers</label>
                  <input
                    {...register("avgMonthlyUsers")}
                    className="w-full rounded-xl bg-[#0b1220] border border-white/10 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                    placeholder="420"
                  />
                  {errors.avgMonthlyUsers && <p className="text-red-400 text-sm">{errors.avgMonthlyUsers.message}</p>}
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-sky-400 font-semibold disabled:opacity-60 hover:scale-[1.02] transition shadow-[0_10px_30px_rgba(99,102,241,0.28)]"
                title={activeGymId ? "Save changes (overwrite existing)" : "Save new gym"}
              >
                {activeGymId ? "Save Changes" : "Save (Generate Gym ID)"}
              </button>

              <button
                type="button"
                onClick={exportCurrent}
                className="px-4 py-3 rounded-xl border border-white/15 hover:bg-white/5 transition"
                title="Export current record to JSON"
              >
                Export JSON
              </button>

              <button
                type="button"
                className="px-4 py-3 rounded-xl border border-white/15 hover:bg-white/5 transition"
                onClick={() => {
                  localStorage.removeItem("gymFormDraft");
                  window.location.reload();
                }}
              >
                Clear Draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/** Reusable panel contents (used by both popover and drawer) */
function PanelContents(props: {
  categorized: Record<string, string[]>;
  DEFAULT_SET: Set<string>;
  selected: string[];
  onToggle: (opt: string) => void;
  onDelete: (opt: string) => void;
  equipSearch: string;
  setEquipSearch: (s: string) => void;
  newEquip: string;
  setNewEquip: (s: string) => void;
  addNew: () => void;
  selectAll: () => void;
  clearAll: () => void;
  onDone: () => void;
}) {
  const {
    categorized,
    DEFAULT_SET,
    selected,
    onToggle,
    onDelete,
    equipSearch,
    setEquipSearch,
    newEquip,
    setNewEquip,
    addNew,
    selectAll,
    clearAll,
    onDone,
  } = props;

  return (
    <>
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-[#0b1220]/95">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">Equipments Filters</h3>
          <div className="ml-auto flex items-center gap-4 text-sm">
            <button type="button" className="text-gray-300 hover:text-white" onClick={selectAll}>
              Select all
            </button>
            <button type="button" className="text-gray-300 hover:text-white" onClick={clearAll}>
              Clear all
            </button>
          </div>
        </div>

        {/* search + add new */}
        <div className="mt-3 grid grid-cols-5 gap-2">
          <input
            value={equipSearch}
            onChange={(e) => setEquipSearch(e.target.value)}
            placeholder="Search equipment..."
            className="col-span-3 rounded-lg bg-[#0a1120] border border-white/10 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
          <input
            value={newEquip}
            onChange={(e) => setNewEquip(e.target.value)}
            placeholder="Add new equipment"
            className="col-span-1 rounded-lg bg-[#0a1120] border border-white/10 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          />
          <button
            type="button"
            className="col-span-1 rounded-lg bg-gradient-to-r from-violet-500 to-sky-400 font-semibold"
            onClick={addNew}
            title="Add to list"
          >
            +
          </button>
        </div>

        <p className="mt-2 text-xs text-gray-400">You can delete custom items later. Default items are protected.</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(categorized).map(([cat, items]) => (
            <div key={cat} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm text-white/90">{cat}</h4>
                <span className="text-xs text-gray-400">{items.length}</span>
              </div>
              <div className="space-y-2 max-h-[360px] overflow-auto pr-1">
                {items.map((opt) => {
                  const checked = selected.includes(opt);
                  const isDefault = DEFAULT_SET.has(opt.toLowerCase());
                  return (
                    <div
                      key={opt}
                      className="flex items-center justify-between gap-2 rounded px-2 py-1 hover:bg-white/5"
                    >
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" className="accent-violet-500" checked={checked} onChange={() => onToggle(opt)} />
                        <span className="text-sm">{opt}</span>
                      </label>

                      {!isDefault && (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-md bg-red-600/90 hover:bg-red-500 px-2 py-1 text-xs font-medium"
                          onClick={() => onDelete(opt)}
                          title="Delete from master list"
                          aria-label={`Delete ${opt}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                            <path d="M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h5a1 1 0 1 1 0 2h-1.05l-1.2 12.02A3 3 0 0 1 14.76 21H9.24a3 3 0 0 1-2.99-2.98L5.05 6H4a1 1 0 1 1 0-2h5V3Zm2 1h2V3h-2v1ZM7.05 6l1.18 11.8a1 1 0 0 0 1 .9h5.52a1 1 0 0 0 1-.9L16.95 6H7.05Zm3.95 3a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" />
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>
                  );
                })}
                {items.length === 0 && <p className="text-xs text-gray-500 px-2">No items.</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="border-t border-white/10 p-4 flex items-center gap-3">
        <div className="text-sm text-gray-300">
          Selected: <span className="font-semibold">{selected.length}</span>
        </div>
        <button
          type="button"
          className="ml-auto px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-sky-400 font-semibold"
          onClick={onDone}
        >
          Done
        </button>
      </div>
    </>
  );
}
