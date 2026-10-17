/**
 * Client-safe image URL helper.
 * No "server-only" or Node.js imports — safe for both server and client components.
 */

const IMAGE_BASE_URL = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "/uploads").replace(
  /\/+$/,
  ""
);

const ABSOLUTE_URL = /^https?:\/\//i;

export function imageUrl(key: string): string {
  if (!key) return "";
  if (ABSOLUTE_URL.test(key)) return key;
  return `${IMAGE_BASE_URL}/${key.replace(/^\/+/, "")}`;
}
