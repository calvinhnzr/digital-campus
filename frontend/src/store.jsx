import { atom } from "jotai"

export const searchRoomAtom = atom("")

export const perspectiveAtom = atom(false)

export const roomTypesAtom = atom(["Büro", "Labor", "Verwaltung", "Hörsaal", "Seminaraum", "Projektraum", "Toilette"])

export const selectedRoomTypeAtom = atom("")

export const roomsDataAtom = atom({})
