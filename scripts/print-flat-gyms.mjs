import fs from "node:fs";

if (process.argv.length < 3) {
  console.error("Usage: node scripts/print-flat-gyms.mjs <path-to-input.json>");
  process.exit(1);
}

const inputPath = process.argv[2];
const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));

// ---- Flatten helpers ----
function flattenGym(g) {
  const out = {
    gym_id: g.gym_id,
    gym_name: g.gym_name,
    contact_number: g.contact_number,
    email_id: g.email_id ?? null,
    address: g.address,
    pin_location: g.pin_location,

    // flatten personal trainer block
    personal_trainer_available: !!g?.personal_trainer?.available,
    personal_trainer_price: g?.personal_trainer?.price ?? null,

    membership_price: g.membership_price ?? null,

    // arrays are fine in "flat" output
    equipment_list: Array.isArray(g.equipment_list) ? g.equipment_list : [],

    days_timings: g.days_timings,
    avg_monthly_users: g.avg_monthly_users,
    created_at: g.created_at,
  };

  // expand images[] -> image1_file_name, image1_storage_path, image1_public_url, ...
  const imgs = Array.isArray(g.images) ? g.images : [];
  imgs.forEach((im, i) => {
    const k = i + 1;
    out[`image${k}_file_name`] = im?.file_name ?? null;
    out[`image${k}_storage_path`] = im?.storage_path ?? null;
    out[`image${k}_public_url`] = im?.public_url ?? null;
  });

  return out;
}

const gyms = Array.isArray(input?.data) ? input.data : [];
const flat = gyms.map(flattenGym);

// Print to terminal
console.log(JSON.stringify({ data: flat }, null, 2));
