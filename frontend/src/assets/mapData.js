const data = {
  campus: [
    {
      id: "objectID",
      name: "Gummersbach",
      buildings: [
        {
          id: "objectID",
          name: "Gebäude A",
          coords: {
            x: 0,
            y: 0,
            width: 127,
            depth: 14,
            direction: "EMPTY",
          },
          floors: [
            {
              id: "objectID",
              name: "1. Etage",
              level: 1,
              coords: {
                x: 0,
                y: 0,
                width: 127,
                depth: 14,
                direction: "EMPTY",
              },
              rooms: [
                {
                  id: "objectID",
                  number: "3217",
                  name: "MI-Multimediaraum",
                  type: "labor",
                  description: "",
                  currentUsers: 7,
                  assests: [
                    {
                      id: "objectID",
                      count: 10,
                    },
                  ],
                  coords: {
                    x: 0,
                    y: 0,
                    width: 14,
                    depth: 7,
                    direction: "NORTH",
                  },
                },
              ],
              halls: [
                {
                  id: "objectID",
                  number: "E300",
                  coords: {
                    x: 0,
                    y: 0,
                    width: 22,
                    depth: 3,
                    direction: "EAST",
                  },
                },
              ],
              stairs: [
                {
                  id: "objectID",
                  number: "T300",
                  name: "",
                  coords: {
                    x: 0,
                    y: 0,
                    width: 11,
                    depth: 2,
                    direction: "SOUTH",
                  },
                },
              ],
              lifts: [
                {
                  id: "objectID",
                  name: "Aufzug 1",
                  maxWeight: 960,
                  maxPeople: 12,
                  coords: {
                    x: 0,
                    y: 0,
                    width: 2,
                    depth: 2,
                    direction: "WEST",
                  },
                },
              ],
              outdoor: [
                {
                  id: "objectID",
                  number: "A001",
                  name: "Garage Fahrzeuge",
                  coords: {
                    x: 0,
                    y: 0,
                    width: 11,
                    depth: 2,
                    direction: "EMPTY",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const asset = {
  id: "1",
  name: "",
  description: "",
}

// /api/
const activeUser = [
  {
    id: "",
    room: "3217",
    activeUser: ["jwt", "jwt"],
  },
]

const mapData = [
  {
    id: "abc",
    building: "A",
    level: 3,
    coords: {
      x: 0,
      y: 0,
      width: 127,
      height: 14,
    },
    floors: [
      {
        id: "T306",
        type: "stairs",
        coords: {
          x: 0,
          y: 0,
          width: 5,
          height: 7,
        },
      },
      {
        id: "E310",
        type: "floor",
        coords: {
          x: 0,
          y: 7,
          width: 6,
          height: 3,
        },
      },
      {
        id: "E309",
        type: "floor",
        coords: {
          x: 6,
          y: 7,
          width: 19,
          height: 3,
        },
      },
      {
        id: "E308",
        type: "floor",
        coords: {
          x: 25,
          y: 7,
          width: 19,
          height: 3,
        },
      },
      {
        id: "E307",
        type: "floor",
        coords: {
          x: 51,
          y: 7,
          width: 22,
          height: 3,
        },
      },
      {
        id: "E306",
        type: "floor",
        coords: {
          x: 73,
          y: 7,
          width: 19,
          height: 3,
        },
      },
      {
        id: "T305",
        type: "stairs",
        coords: {
          x: 84,
          y: 0,
          width: 5,
          height: 7,
        },
      },
      {
        id: "T307_1",
        type: "stairs",
        coords: {
          x: 45,
          y: 10,
          width: 5,
          height: 4,
        },
      },
      {
        id: "T307_2",
        type: "stairs",
        coords: {
          x: 44,
          y: 7,
          width: 7,
          height: 3,
        },
      },
      {
        id: "T300_a",
        type: "stairs",
        coords: {
          x: 92,
          y: 7,
          width: 20,
          height: 7,
        },
      },
      {
        id: "E305",
        type: "floor",
        coords: {
          x: 112,
          y: 7,
          width: 10,
          height: 3,
        },
      },
      {
        id: "T304",
        type: "stairs",
        coords: {
          x: 122,
          y: 7,
          width: 5,
          height: 7,
        },
      },
    ],
    rooms: [
      {
        id: "3222",
        type: "labor",
        coords: {
          x: 5,
          y: 0,
          width: 11,
          height: 7,
        },
      },
      {
        id: "3221",
        type: "labor",
        coords: {
          x: 16,
          y: 0,
          width: 11,
          height: 7,
        },
      },
      {
        id: "3220",
        type: "labor",
        coords: {
          x: 27,
          y: 0,
          width: 9,
          height: 7,
        },
      },
      {
        id: "3219",
        type: "labor",
        coords: {
          x: 36,
          y: 0,
          width: 9,
          height: 7,
        },
      },
      {
        id: "3218",
        type: "labor",
        coords: {
          x: 45,
          y: 0,
          width: 5,
          height: 7,
        },
      },
      {
        id: "3217",
        type: "labor",
        coords: {
          x: 50,
          y: 0,
          width: 7,
          height: 7,
        },
      },
      {
        id: "3216",
        type: "labor",
        coords: {
          x: 57,
          y: 0,
          width: 12,
          height: 7,
        },
      },
      {
        id: "3215",
        type: "labor",
        coords: {
          x: 69,
          y: 0,
          width: 11,
          height: 7,
        },
      },
      {
        id: "3214",
        type: "",
        coords: {
          x: 80,
          y: 0,
          width: 4,
          height: 2,
        },
      },
      {
        id: "3212",
        type: "wc",
        coords: {
          x: 80,
          y: 2,
          width: 4,
          height: 3,
        },
      },
      {
        id: "3210",
        type: "wc",
        coords: {
          x: 80,
          y: 5,
          width: 4,
          height: 2,
        },
      },

      {
        id: "3209",
        type: "labor",
        coords: {
          x: 89,
          y: 0,
          width: 11,
          height: 7,
        },
      },
      {
        id: "3208",
        type: "labor",
        coords: {
          x: 100,
          y: 0,
          width: 3,
          height: 7,
        },
      },

      {
        id: "3207",
        type: "labor",
        coords: {
          x: 103,
          y: 0,
          width: 4,
          height: 7,
        },
      },
      {
        id: "3206",
        type: "labor",
        coords: {
          x: 107,
          y: 0,
          width: 7,
          height: 7,
        },
      },
      {
        id: "3205",
        type: "labor",
        coords: {
          x: 114,
          y: 0,
          width: 6,
          height: 7,
        },
      },
      {
        id: "3204",
        type: "labor",
        coords: {
          x: 120,
          y: 0,
          width: 7,
          height: 7,
        },
      },
      {
        id: "3203",
        type: "labor",
        coords: {
          x: 120,
          y: 10,
          width: 2,
          height: 4,
        },
      },
      {
        id: "3202",
        type: "labor",
        coords: {
          x: 118,
          y: 10,
          width: 2,
          height: 4,
        },
      },
      {
        id: "3201",
        type: "labor",
        coords: {
          x: 115,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3200",
        type: "labor",
        coords: {
          x: 112,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3248",
        type: "labor",
        coords: {
          x: 89,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3247",
        type: "labor",
        coords: {
          x: 86,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3246",
        type: "labor",
        coords: {
          x: 83,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3245",
        type: "labor",
        coords: {
          x: 78,
          y: 10,
          width: 5,
          height: 4,
        },
      },
      {
        id: "3244",
        type: "",
        coords: {
          x: 76,
          y: 10,
          width: 2,
          height: 4,
        },
      },
      {
        id: "3243",
        type: "labor",
        coords: {
          x: 72,
          y: 10,
          width: 4,
          height: 4,
        },
      },
      {
        id: "3242",
        type: "",
        coords: {
          x: 69,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3241",
        type: "labor",
        coords: {
          x: 64,
          y: 10,
          width: 5,
          height: 4,
        },
      },
      {
        id: "3240",
        type: "",
        coords: {
          x: 61,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3239",
        type: "",
        coords: {
          x: 54,
          y: 10,
          width: 7,
          height: 4,
        },
      },
      {
        id: "3238",
        type: "",
        coords: {
          x: 52,
          y: 10,
          width: 2,
          height: 4,
        },
      },
      {
        id: "3237",
        type: "",
        coords: {
          x: 50,
          y: 10,
          width: 2,
          height: 4,
        },
      },
      {
        id: "3236",
        type: "",
        coords: {
          x: 43,
          y: 10,
          width: 2,
          height: 4,
        },
      },

      {
        id: "3235",
        type: "3235",
        coords: {
          x: 35,
          y: 10,
          width: 8,
          height: 4,
        },
      },
      {
        id: "3234",
        type: "3234",
        coords: {
          x: 32,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3233",
        type: "3233",
        coords: {
          x: 29,
          y: 10,
          width: 3,
          height: 4,
        },
      },

      {
        id: "3232",
        type: "",
        coords: {
          x: 27,
          y: 10,
          width: 2,
          height: 4,
        },
      },
      {
        id: "3231",
        type: "",
        coords: {
          x: 24,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3230",
        type: "",
        coords: {
          x: 21,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3229",
        type: "",
        coords: {
          x: 18,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3228",
        type: "",
        coords: {
          x: 14,
          y: 10,
          width: 4,
          height: 4,
        },
      },
      {
        id: "3227",
        type: "",
        coords: {
          x: 11,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3226",
        type: "",
        coords: {
          x: 8,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3225",
        type: "",
        coords: {
          x: 6,
          y: 10,
          width: 2,
          height: 4,
        },
      },
      {
        id: "3224",
        type: "",
        coords: {
          x: 3,
          y: 10,
          width: 3,
          height: 4,
        },
      },
      {
        id: "3223",
        type: "",
        coords: {
          x: null,
          y: 10,
          width: 3,
          height: 4,
        },
      },
    ],
  },
]

// example.com/api/buildings

// example.com/api/buildings/a

// example.com/api/buildings/a/floors

// example.com/api/buildings/a/floors/3

// example.com/api/buildings/a/floors/3/rooms

// example.com/api/buildings/a/floors/3/rooms/3217

// example.com/api/buildings/a/floors/3/rooms/3217

// example.com/api/?roomquery=1234

// suche raum 1234

const building = {
  id: "1",
  name: "Gebäude A",
  storys: [
    {
      id: "a1",
      name: "A",
      rooms: [],
      floors: [],
    },
    {
      id: "a2",
      name: "A",
      rooms: [],
      floors: [],
    },
    {
      id: "a3",
      name: "A",
      rooms: [],
      floors: [],
    },
  ],
}

export default mapData
