import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { cn };

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};
export type WithoutChildren<T> = Omit<T, "children">;
