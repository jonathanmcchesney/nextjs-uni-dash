import { capitaliseFirstLetter } from "../stringUtils";

describe("capitaliseFirstLetter", () => {
  it("should capitalise the first letter of a string", () => {
    expect(capitaliseFirstLetter("hello")).toBe("Hello");
  });

  it("should return an empty string when given an empty string", () => {
    expect(capitaliseFirstLetter("")).toBe("");
  });

  it("should return the same string when given a string with the first letter already capitalised", () => {
    expect(capitaliseFirstLetter("Hello")).toBe("Hello");
  });

  it("should handle strings with only one character", () => {
    expect(capitaliseFirstLetter("h")).toBe("H");
  });

  it("should handle strings with whitespace characters", () => {
    expect(capitaliseFirstLetter("h ello")).toBe("H ello");
  });

  it("should handle strings that are entirely uppercase", () => {
    expect(capitaliseFirstLetter("HELLO")).toBe("HELLO");
  });

  it("should handle strings that have special characters and numbers", () => {
    expect(capitaliseFirstLetter("hello world")).toBe("Hello world");
    expect(capitaliseFirstLetter("hello world")).toBe("Hello world");
    expect(capitaliseFirstLetter("hello-world")).toBe("Hello-world");
    expect(capitaliseFirstLetter("hello-world")).toBe("Hello-world");
    expect(capitaliseFirstLetter("hello world 123")).toBe("Hello world 123");
    expect(capitaliseFirstLetter("hello world !")).toBe("Hello world !");
  });

  it("should not capitalise if the first character is not a letter", () => {
    expect(capitaliseFirstLetter(" hello")).toBe(" hello");
    expect(capitaliseFirstLetter("1hello")).toBe("1hello");
    expect(capitaliseFirstLetter("-hello")).toBe("-hello");
  });
});
