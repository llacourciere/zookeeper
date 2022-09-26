const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers");

jest.mock("fs");
test("creates an zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Darlene", id: "jhgdja3ng2" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingZookeeper = [
        {
            "id": "10",
            "name": "Lauren",
            "age": 28,
            "favoriteAnimal": "great blue heron"
          },
          {
            "id": "15",
            "name": "Scott",
            "age": 28,
            "favoriteAnimal": "bear"
          },
    ];
    const updatedZookeepers = filterByQuery({name: "Lauren"}, startingZookeeper);
    
    expect(updatedZookeepers.length).toEqual(1);
});

test("filters by ID", () => {
    const startingZookeepers = [
        {
            "id": "10",
            "name": "Lauren",
            "age": 28,
            "favoriteAnimal": "great blue heron"
          },
          {
            "id": "15",
            "name": "Scott",
            "age": 28,
            "favoriteAnimal": "bear"
          },
    ];
    const result = findById("15", startingZookeepers);

    expect(result.name).toBe("Scott");
});

test("validates age", () => {
    const zookeeper = {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    };
  
    const invalidZookeeper = {
      id: "3",
      name: "Isabella",
      age: "67",
      favoriteAnimal: "bear",
    };
  
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);
  
    expect(result).toBe(true);
    expect(result2).toBe(false);
  });