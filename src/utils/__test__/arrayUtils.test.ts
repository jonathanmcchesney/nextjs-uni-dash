import { updateOrInsert } from "../arrayUtils";

describe("arrayUtils", () => {
  describe("updateOrInsert", () => {
    it("should update an existing item in the array", () => {
      const array = [
        { id: 1, name: "Item 1", value: 100 },
        { id: 2, name: "Item 2", value: 200 },
      ];
      const newItem = { id: 2, value: 300 };

      const result = updateOrInsert(array, newItem, "id");

      expect(result).toHaveLength(2);
      expect(result[1]).toEqual({ id: 2, name: "Item 2", value: 300 });
    });

    it("should insert a new item if it does not exist in the array", () => {
      const array = [
        { id: 1, name: "Item 1", value: 100 },
        { id: 2, name: "Item 2", value: 200 },
      ];
      const newItem = { id: 3, name: "Item 3", value: 400 };

      const result = updateOrInsert(array, newItem, "id");

      expect(result).toHaveLength(3);
      expect(result[2]).toEqual(newItem);
    });

    it("should handle empty array and insert the new item", () => {
      const array: any[] = [];
      const newItem = { id: 1, name: "New Item", value: 500 };

      const result = updateOrInsert(array, newItem, "id");

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(newItem);
    });

    it("should not modify the array if the new item has the same data", () => {
      const array = [
        { id: 1, name: "Item 1", value: 100 },
        { id: 2, name: "Item 2", value: 200 },
      ];
      const newItem = { id: 2, name: "Item 2", value: 200 };

      const result = updateOrInsert(array, newItem, "id");

      expect(result).toHaveLength(2);
      expect(result[1]).toEqual(newItem);
    });

    it("should update only the matching item and keep other items unchanged", () => {
      const array = [
        { id: 1, name: "Item 1", value: 100 },
        { id: 2, name: "Item 2", value: 200 },
      ];
      const newItem = { id: 2, name: "Updated Item 2", value: 300 };

      const result = updateOrInsert(array, newItem, "id");

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 1, name: "Item 1", value: 100 });
      expect(result[1]).toEqual({ id: 2, name: "Updated Item 2", value: 300 });
    });
  });
});
