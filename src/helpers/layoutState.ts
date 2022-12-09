import { atom } from "nanostores";
import type { Ref } from "react";

export const isLeftNavigationOpen = atom<boolean | undefined>(undefined);

export const leftNavToggleButtonRef = atom<Ref<HTMLButtonElement>>(null);
