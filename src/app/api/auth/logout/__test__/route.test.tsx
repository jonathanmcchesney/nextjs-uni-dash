import { NextResponse } from "next/server";
import { POST } from "../route";

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(() => {
      const res = {
        cookies: {
          set: jest.fn(),
        },
      };
      return res;
    }),
  },
}));

describe("POST handler", () => {
  it("should clear the token cookie", async () => {
    const response = await POST();

    expect(NextResponse.json).toHaveBeenCalledWith({ success: true });

    expect(response.cookies.set).toHaveBeenCalledWith("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1,
      path: "/",
    });
  });
});
