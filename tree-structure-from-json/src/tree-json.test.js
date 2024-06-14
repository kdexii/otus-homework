const { displayTreeFromJson, exampleData } = require('./tree-json.js');

describe('displayTreeFromJson', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should display tree for exampleData', () => {
    console.log(exampleData.name);
    exampleData.items.forEach((item) => displayTreeFromJson(item));

    expect(consoleSpy).toHaveBeenCalledWith(1);
    expect(consoleSpy).toHaveBeenCalledWith('├── 2');
    expect(consoleSpy).toHaveBeenCalledWith('│  ├── 3');
    expect(consoleSpy).toHaveBeenCalledWith('│  ├── 4');
    expect(consoleSpy).toHaveBeenCalledWith('├── 5');
    expect(consoleSpy).toHaveBeenCalledWith('│  ├── 6');
    expect(consoleSpy).toHaveBeenCalledWith('├── 7');
    expect(consoleSpy).toHaveBeenCalledWith('│  ├── 8');
  });

  test('should display single node with no items', () => {
    const singleNode = { name: 'single' };
    displayTreeFromJson(singleNode);

    expect(consoleSpy).toHaveBeenCalledWith('├── single');
  });

  test('should display tree with nested items', () => {
    const nestedData = {
      name: 'root',
      items: [
        {
          name: 'child1',
          items: [{ name: 'grandchild1' }],
        },
        { name: 'child2' },
      ],
    };
    displayTreeFromJson(nestedData);

    expect(consoleSpy).toHaveBeenCalledWith('├── root');
    expect(consoleSpy).toHaveBeenCalledWith('│  ├── child1');
    expect(consoleSpy).toHaveBeenCalledWith('│  │  ├── grandchild1');
    expect(consoleSpy).toHaveBeenCalledWith('│  ├── child2');
  });

  test('should handle node with multiple levels of nesting', () => {
    const multiLevelData = {
      name: 'level1',
      items: [
        {
          name: 'level2',
          items: [
            {
              name: 'level3',
              items: [{ name: 'level4' }],
            },
          ],
        },
      ],
    };
    displayTreeFromJson(multiLevelData);

    expect(consoleSpy).toHaveBeenCalledWith('├── level1');
    expect(consoleSpy).toHaveBeenCalledWith('│  ├── level2');
    expect(consoleSpy).toHaveBeenCalledWith('│  │  ├── level3');
    expect(consoleSpy).toHaveBeenCalledWith('│  │  │  ├── level4');
  });
});
