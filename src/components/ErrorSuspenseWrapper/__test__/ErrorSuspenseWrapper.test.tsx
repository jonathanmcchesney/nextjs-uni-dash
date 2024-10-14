import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ErrorSuspenseWrapper from "../ErrorSuspenseWrapper"; 
import "@testing-library/jest-dom"; 
import { Suspense, useEffect, useState } from "react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
  })
) as jest.Mock;

const AsyncComponent = () => {
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 1000); 
      return () => clearTimeout(timer);
    }, []);
  
    if (!loaded) {
      throw new Promise(() => {});
    }
  
    return <div>Child content</div>;
  };

describe("ErrorSuspenseWrapper Component", () => {
    beforeEach(() => {
        Object.defineProperty(window, "location", {
          writable: true,
          value: { href: "" },
        });
    
        jest.clearAllMocks();
      });

  it("should render the fallback while loading (Suspense)", async () => {
    const FallbackComponent = <div>Loading...</div>;

    render(
      <ErrorSuspenseWrapper fallback={FallbackComponent}>
        <Suspense fallback={<div>Loading...</div>}>
          <AsyncComponent />
        </Suspense>
      </ErrorSuspenseWrapper>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display the error fallback when an error occurs", async () => {
    const ErrorComponent = () => {
      throw new Error("Test error");
    };

    render(
      <ErrorSuspenseWrapper fallback={<div>Loading...</div>} shouldDisplayLogout>
        <ErrorComponent />
      </ErrorSuspenseWrapper>
    );

    await waitFor(() =>
      expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    );

    expect(screen.getByText("Test error")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("should handle the logout button click and redirect to login", async () => {
    const ErrorComponent = () => {
      throw new Error("Test error");
    };

    render(
      <ErrorSuspenseWrapper fallback={<div>Loading...</div>} shouldDisplayLogout>
        <ErrorComponent />
      </ErrorSuspenseWrapper>
    );

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    fireEvent.click(logoutButton);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/auth/logout", { method: "POST" });
      expect(window.location.href).toBe("/login");
    });
  });

  it("should not display the Logout button if shouldDisplayLogout is false", async () => {
    const ErrorComponent = () => {
      throw new Error("Test error");
    };

    render(
      <ErrorSuspenseWrapper fallback={<div>Loading...</div>} shouldDisplayLogout={false}>
        <ErrorComponent />
      </ErrorSuspenseWrapper>
    );

    await waitFor(() =>
      expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    );

    expect(screen.getByText("Test error")).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: "Logout" })).not.toBeInTheDocument();
  });
});
