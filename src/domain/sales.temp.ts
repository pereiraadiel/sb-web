type Metric = {
  sales: number;
  amount: number;
  date: string;
};

type Stand = {
  name: string;
  code: string;
  metrics: Metric[];
};

const salesTemp: Stand[] = [
  {
    name: "Macarrão",
    code: "1",
    metrics: [
      {
        sales: 48,
        amount: 480,
        date: "2021-10-11",
      },
      {
        sales: 97,
        amount: 970,
        date: "2021-10-12",
      },
      {
        sales: 112,
        amount: 1120,
        date: "2021-10-13",
      },
    ],
  },
  {
    name: "Pastel",
    code: "2",
    metrics: [
      {
        sales: 35,
        amount: 350,
        date: "2021-10-11",
      },
      {
        sales: 111,
        amount: 1110,
        date: "2021-10-12",
      },
      {
        sales: 111,
        amount: 1110,
        date: "2021-10-13",
      },
    ],
  },
  {
    name: "Espetinho",
    code: "3",
    metrics: [
      {
        sales: 43,
        amount: 516,
        date: "2021-10-11",
      },
      {
        sales: 73,
        amount: 876,
        date: "2021-10-12",
      },
      {
        sales: 84,
        amount: 1008,
        date: "2021-10-13",
      },
    ],
  },
  {
    name: "Cachorro quente",
    code: "4",
    metrics: [
      {
        sales: 3,
        amount: 24,
        date: "2021-10-11",
      },
      {
        sales: 54,
        amount: 432,
        date: "2021-10-12",
      },
      {
        sales: 34,
        amount: 272,
        date: "2021-10-13",
      },
    ],
  },
  {
    name: "Algodão doce",
    code: "5",
    metrics: [
      {
        sales: 0,
        amount: 0,
        date: "2021-10-11",
      },
      {
        sales: 45,
        amount: 97,
        date: "2021-10-12",
      },
      {
        sales: 20,
        amount: 40,
        date: "2021-10-13",
      },
    ],
  },
  {
    name: "Canjicada",
    code: "6",
    metrics: [
      {
        sales: 11,
        amount: 88,
        date: "2021-10-11",
      },
      {
        sales: 26,
        amount: 208,
        date: "2021-10-12",
      },
      {
        sales: 29,
        amount: 232,
        date: "2021-10-13",
      },
    ],
  },
  {
    name: "Brincadeiras",
    code: "7",
    metrics: [
      {
        sales: 0,
        amount: 0,
        date: "2021-10-11",
      },
      {
        sales: 46,
        amount: 92,
        date: "2021-10-12",
      },
      {
        sales: 21,
        amount: 42,
        date: "2021-10-13",
      },
    ],
  },
  {
    name: "Bar",
    code: "8",
    metrics: [
      {
        sales: 27,
        amount: 216,
        date: "2021-10-11",
      },
      {
        sales: 88,
        amount: 617,
        date: "2021-10-12",
      },
      {
        sales: 94,
        amount: 752,
        date: "2021-10-13",
      },
    ],
  },
];

export { salesTemp };
