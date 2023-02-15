import { atom } from "jotai"

// api/campus
export const campusDataAtom = atom()

// api/campus/Gummersbach/rooms
export const roomsDataAtom = atom()

export const currentRoomAtom = atom({
  number: "",
  loggedIn: false,
})

export const newRoomAtom = atom({
  number: "",
  loggedIn: false,
})

export const queryAtom = atom({
  id: "",
  number: "",
  type: "",
})

export const selectedAtom = atom([
  {
    data: {},
    clicked: false,
    hover: false,
  },
])

export const formAtom = atom({
  status: "",
  date: "",
  time: "",
  type: "",
  assets: "",
})

// Token
export const isUserLoggedInRoomAtom = atom(false)

export const tempURLToken = atom("")

// Other
export const perspectiveAtom = atom(false)

export const roomTypes = atom(["Büro", "Labor", "Verwaltung", "Hörsaal", "Seminaraum", "Projektraum", "Toilette"])
