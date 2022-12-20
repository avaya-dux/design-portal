import { atom } from "nanostores";

export const categoriesToFilterFor = atom<string[]>([])

export const variationsToFilterFor = atom<string[]>([])

export const themesToFilterFor = atom<string>("dynamic")
