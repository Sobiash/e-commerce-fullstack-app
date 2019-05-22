const sizes = [
  {
    _id: 1,
    name: "XS"
  },
  {
    _id: 2,
    name: "S"
  },
  {
    _id: 3,
    name: "M"
  },
  {
    _id: 4,
    name: "L"
  },
  {
    _id: 5,
    name: "XL"
  }
];
const colors = [
  {
    _id: 1,
    name: "Red"
  },
  {
    _id: 2,
    name: "Green"
  },
  {
    _id: 3,
    name: "Blue"
  },
  {
    _id: 4,
    name: "Yellow"
  },
  {
    _id: 5,
    name: "White"
  },
  {
    _id: 6,
    name: "Black"
  },
  {
    _id: 7,
    name: "Khaki"
  },
  {
    _id: 8,
    name: "Dark Blue"
  },
  {
    _id: 9,
    name: "Light Blue"
  },
  {
    _id: 10,
    name: "Brown"
  }
];

const price = [
  {
    _id: 0,
    name: "Any Price",
    array: []
  },
  {
    _id: 1,
    name: "$0 to $299",
    array: [0, 299]
  },
  {
    _id: 2,
    name: "$300 to $599",
    array: [300, 599]
  },
  {
    _id: 3,
    name: "$600 to $999",
    array: [600, 999]
  },
  {
    _id: 4,
    name: "$1000 to $1999",
    array: [1000, 1999]
  },
  {
    _id: 5,
    name: "More than $2000",
    array: [2000, 1500000]
  }
];

export { sizes, colors, price };
