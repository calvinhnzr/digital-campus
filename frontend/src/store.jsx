import { atom } from "jotai"

export const campusDataAtom = atom()

export const roomsDataAtom = atom({})

// Query
export const queryNumberAtom = atom("")

export const queryTypeAtom = atom("")

export const queryEquipmentAtom = atom([])

// const enumAvailability = {
//   EMPTY,
//   TAKEN,
//   CLOSED,
// }
export const queryAvailabilityAtom = atom({
  status: "",
})

export const queryDateTimeAtom = atom({
  date: "",
  time: "",
})

export const queryRenderClickAtom = atom([{}])

// Results
export const resultsQueryAtom = atom((get) => {
  const campusData = get(campusDataAtom)
  return campusData
})

// Token
export const isUserLoggedInRoomAtom = atom(false)

export const tempURLToken = atom("")

// Other
export const perspectiveAtom = atom(false)

export const roomTypes = atom(["Büro", "Labor", "Verwaltung", "Hörsaal", "Seminaraum", "Projektraum", "Toilette"])
