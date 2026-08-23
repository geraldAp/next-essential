import { format, formatDistanceToNow } from "date-fns";

export const formatDate = (date: Date | string, fmt = "PPP"): string => {
  try {
    return format(new Date(date), fmt);
  } catch {
    return String(date);
  }
};

export const formatRelativeTime = (date: Date | string): string => {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch {
    return String(date);
  }
};

export const formatCurrency = (value: number, currency = "GHS"): string =>
  new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
  }).format(value);

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("en-GH").format(value);

export const formatCompactNumber = (value: number): string =>
  new Intl.NumberFormat("en-GH", {
    notation: "compact",
  }).format(value);

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const truncate = (str: string, length = 50): string =>
  str.length > length ? `${str.slice(0, length)}...` : str;

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
