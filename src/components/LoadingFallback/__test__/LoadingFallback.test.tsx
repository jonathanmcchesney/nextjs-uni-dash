import { render, screen } from "@testing-library/react";
import LoadingFallback from "..//LoadingFallback";
import "@testing-library/jest-dom";

describe("LoadingFallback Component", () => {
  it("should render CircularProgress and default loading text", () => {
    render(<LoadingFallback />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render CircularProgress and custom text", () => {
    const customText = "Please wait...";
    render(<LoadingFallback text={customText} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    expect(screen.getByText(customText)).toBeInTheDocument();
  });
});
