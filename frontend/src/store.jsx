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

export const formTypesAtom = atom(0)
export const formStatusAtom = atom(false)

export const formResponseAtom = atom()

export const hoverRoomAtom = atom({
  room: "",
})

// lagacy
export const selectedAtom = atom([
  {
    data: {},
    clicked: false,
    hover: false,
  },
])

export const hideFormAtom = atom(true)

// Token
export const isUserLoggedInRoomAtom = atom(false)

export const tempURLToken = atom("")

// Other
export const perspectiveAtom = atom(false)
