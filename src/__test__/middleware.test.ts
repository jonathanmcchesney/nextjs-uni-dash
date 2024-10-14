import { NextResponse } from "next/server";
import { middleware } from "../middleware";
import type { NextRequest } from "next/server";

jest.mock("next/server", () => ({
  NextResponse: {
    next: jest.fn(),
    redirect: jest.fn(),
  },
}));

describe("Middleware", () => {
  let mockRequest: any;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      cookies: {
        get: jest.fn(),
        getAll: jest.fn(),
        has: jest.fn(),
        set: jest.fn(),
        delete: jest.fn(),
        clear: jest.fn(),
        [Symbol.iterator]: jest.fn(),
        size: 0,
      },
      nextUrl: {
        pathname: "",
      },
      url: "http://localhost/",
    } as unknown as NextRequest;
  });

  it("should allow the request if a token is present", () => {
    mockRequest.cookies.get = jest
      .fn()
      .mockReturnValue({ value: "valid-token" });
    mockRequest.nextUrl.pathname = "/dashboard";

    middleware(mockRequest as NextRequest);

    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  it("should redirect to /login if no token is present and not already on the /login page", () => {
    mockRequest.cookies.get = jest.fn().mockReturnValue(null);
    mockRequest.nextUrl.pathname = "/dashboard";

    middleware(mockRequest as NextRequest);

    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL("/login", mockRequest.url)
    );
    expect(NextResponse.next).not.toHaveBeenCalled();
  });

  it("should allow the request if no token is present but the path is /login", () => {
    mockRequest.cookies.get = jest.fn().mockReturnValue(null);
    mockRequest.nextUrl.pathname = "/login";

    middleware(mockRequest as NextRequest);

    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });
});
