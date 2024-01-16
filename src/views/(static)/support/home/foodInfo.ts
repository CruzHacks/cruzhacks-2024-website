export enum Dietary {
  GlutenFree,
  Vegetarian,
  Vegan,
}

export const foodInfo = [
  {
    date: "Friday, Febuary 3rd",
    events: [
      {
        title: "Dinner",
        items: [
          {
            name: "IKE's Sandwiches",
            dietary: [Dietary.Vegan, Dietary.GlutenFree],
          },
          {
            name: "Secret Snack",
            dietary: [Dietary.Vegan],
          },
          {
            name: "Goyaki Yerba Mate",
            dietary: [],
          },
        ],
        provider: "Ike's Love & Sandwiches",
        time: "5:00 pm",
      },
    ],
  },
  {
    date: "Saturday, Febuary 4th",
    events: [
      {
        title: "Breakfast",
        items: [
          {
            name: "Bagels and Cream Cheese",
            dietary: [Dietary.Vegetarian],
          },
          {
            name: "Coffee",
            dietary: [],
          },
        ],
        provider: "iHOP",
        time: "8:00 am",
      },
      {
        title: "Lunch",
        items: [
          {
            name: "Various Slices of Pizza",
            dietary: [],
          },
        ],
        provider: "Woodstock's Pizza",
        time: "1:00 pm",
      },
      {
        title: "Dinner",
        items: [
          {
            name: "Roasted Chicken and Swiss Roller Platter",
            dietary: [],
          },
          {
            name: "Cheeseburgers",
            dietary: [],
          },
        ],
        provider: "Panda Express",
        time: "5:30 pm",
      },
    ],
  },
  {
    date: "Sunday, Febuary 5th",
    events: [
      {
        title: "Breakfast",
        items: [
          {
            name: "Bagels and Cream Cheese",
            dietary: [Dietary.Vegetarian],
          },
          {
            name: "Coffee",
            dietary: [],
          },
        ],
        provider: "The Bagelry",
        time: "9:00 am",
      },
      {
        title: "Lunch",
        items: [
          {
            name: "Various Sandwiches",
            dietary: [Dietary.GlutenFree, Dietary.Vegan],
          },
        ],
        provider: "Achilles by the Sea",
        time: "12:00 pm",
      },
    ],
  },
]
