import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createDefaultData } from "./defaultData.js";
import { now } from "../utils/ids.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../../data");
const dataFile = path.join(dataDir, "database.json");

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(createDefaultData(), null, 2));
  }
}

function readData() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

function writeData(data) {
  ensureDataFile();
  const tempFile = `${dataFile}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2));
  fs.renameSync(tempFile, dataFile);
}

export const db = {
  path: dataFile,
  reset() {
    writeData(createDefaultData());
    return readData();
  },
  all() {
    return readData();
  },
  save(data) {
    writeData(data);
    return data;
  },
  get(collection) {
    const data = readData();
    return data[collection];
  },
  set(collection, value) {
    const data = readData();
    data[collection] = value;
    writeData(data);
    return value;
  },
  insert(collection, item) {
    const data = readData();
    const record = { ...item, createdAt: item.createdAt || now(), updatedAt: item.updatedAt || now() };
    data[collection] = [...(data[collection] || []), record];
    writeData(data);
    return record;
  },
  update(collection, id, patch) {
    const data = readData();
    const list = data[collection] || [];
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) return null;
    const next = { ...list[index], ...patch, id, updatedAt: now() };
    list[index] = next;
    data[collection] = list;
    writeData(data);
    return next;
  },
  remove(collection, id) {
    const data = readData();
    const list = data[collection] || [];
    const target = list.find((item) => item.id === id);
    if (!target) return null;
    data[collection] = list.filter((item) => item.id !== id);
    writeData(data);
    return target;
  }
};
