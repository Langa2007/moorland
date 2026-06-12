import { nanoid } from "nanoid";
import slugify from "slugify";

export function createId(prefix = "item") {
  return `${prefix}_${nanoid(10)}`;
}

export function createSlug(value) {
  return slugify(value || createId("slug"), { lower: true, strict: true });
}

export function now() {
  return new Date().toISOString();
}
