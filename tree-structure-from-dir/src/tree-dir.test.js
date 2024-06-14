const { displayTreeFromJson, exampleData } = require('./tree-dir.js');

describe('displayTreeFromJson', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('should display tree correctly', () => {
    displayTreeFromJson(exampleData);
    expect(consoleSpy).toHaveBeenCalledWith('├── 1');
    expect(consoleSpy).toHaveBeenCalledWith('│  ├── 2');
    expect(consoleSpy).toHaveBeenCalledWith('│  │  ├── 3');
    expect(consoleSpy).toHaveBeenCalledWith('│  │  ├── 4');
    expect(consoleSpy).toHaveBeenCalledWith('│  ├── 5');
    expect(consoleSpy).toHaveBeenCalledWith('│  │  ├── 6');
    expect(consoleSpy).toHaveBeenCalledWith('│  ├── 7');
    expect(consoleSpy).toHaveBeenCalledWith('│  │  ├── 8');
  });

  test('should handle node with no items', () => {
    const node = { name: 'test' };
    displayTreeFromJson(node);
    expect(consoleSpy).toHaveBeenCalledWith('├── test');
  });

  test('should handle nested items correctly', () => {
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
});
