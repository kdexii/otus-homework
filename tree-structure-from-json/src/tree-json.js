const exampleData = 
  { 
    name: 1,
    items: [
      {
        name: 2,
        items: [{ name: 3 }, { name: 4 }],
      },
      {
        name: 5,
        items: [{ name: 6 }],
      },
    ],
  };

function parseToTree(jsonInput) {
    let strJson = `${jsonInput.name}
└──${jsonInput.items[0].name}
│ └──${jsonInput.items[0].items[0].name}
│ └──${jsonInput.items[0].items[1].name}
└──${jsonInput.items[1].name}
└──${jsonInput.items[1].items[0].name}`;
  return strJson;
}

console.log(parseToTree(exampleData));