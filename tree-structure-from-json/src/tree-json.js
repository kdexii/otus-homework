function displayTreeFromJson(node, depth = 0) {
  console.log(`${"│  ".repeat(depth)}├── ${node.name}`);
  if (node.items) {
    node.items.forEach((item) => displayTreeFromJson(item, depth + 1));
  }
}

const exampleData = {
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
    {
      name: 7,
      items: [{ name: 8 }],
    },
  ],
};

console.log(exampleData.name);
exampleData.items.forEach((item) => displayTreeFromJson(item));
