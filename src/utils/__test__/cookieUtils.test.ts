import { getCookie, setCookie } from "../cookieUtils";

describe("Cookie Utilities", () => {
  beforeEach(() => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
  });

  describe("getCookie", () => {
    it("should return the cookie value if it exists", () => {
      document.cookie = "user=TestUser";

      const result = getCookie("user");
      expect(result).toBe("TestUser");
    });

    it("should return null if the cookie does not exist", () => {
      const result = getCookie("nonexistentCookie");
      expect(result).toBeNull();
    });

    it("should return the correct cookie value when multiple cookies are set", () => {
      document.cookie = "user=TestUser; token=12345";

      const user = getCookie("user");
      const token = getCookie("token");

      expect(user).toBe("TestUser");
      expect(token).toBe("12345");
    });
  });

  describe("setCookie", () => {
    it("should set a cookie without an expiration time", () => {
      setCookie("user", "TestUser", 0);
      expect(document.cookie).toBe("user=TestUser; path=/");
    });

    it("should set a cookie with an expiration time", () => {
      const now = new Date();
      const hours = 1;
      const expiresDate = new Date(
        now.getTime() + hours * 60 * 60 * 1000
      ).toUTCString();

      setCookie("user", "TestUser", hours);
      expect(document.cookie).toContain(
        `user=TestUser; expires=${expiresDate}; path=/`
      );
    });

    it("should overwrite an existing cookie", () => {
      document.cookie = "user=TestUser";

      setCookie("user", "JaneDoe", 0);
      expect(document.cookie).toBe("user=JaneDoe; path=/");
    });

    it("should set multiple cookies without affecting existing ones", () => {
      document.cookie = "user=TestUser";

      setCookie("token", "abc123", 0);
      expect(document.cookie).toContain("user=TestUser");
      expect(document.cookie).toContain("token=abc123; path=/");
    });
  });
});
