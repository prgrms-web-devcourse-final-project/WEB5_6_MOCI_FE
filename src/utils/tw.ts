import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function tw(...args: any[]) {
  return twMerge(clsx(args));
}
