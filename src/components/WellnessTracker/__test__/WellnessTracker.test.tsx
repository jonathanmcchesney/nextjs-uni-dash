import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import WellnessTracker from "../WellnessTracker";
import {
  GET_WELLNESS_DATA,
  SAVE_WELLNESS_DATA,
} from "../../../gql/healthQueries";
import "@testing-library/jest-dom";

const wellnessDataMock = [
  {
    userId: "user123",
    date: new Date().toISOString(),
    mood: 7,
    sleep: 8,
    stress: 5,
  },
];

const mocks = [
  {
    request: {
      query: GET_WELLNESS_DATA,
      variables: { userId: "user123" },
    },
    result: {
      data: {
        getWellnessData: wellnessDataMock,
      },
    },
  },
  {
    request: {
      query: SAVE_WELLNESS_DATA,
      variables: {
        input: {
          userId: "user123",
          mood: 7,
          sleep: 8,
          stress: 5,
          date: new Date().toISOString(),
        },
      },
    },
    result: {
      data: {
        saveWellnessData: {
          userId: "user123",
          mood: 7,
          sleep: 8,
          stress: 5,
          date: new Date().toISOString(),
        },
      },
    },
  },
];

describe("WellnessTracker Component", () => {
  it("renders initial input view and sliders with data from graphql", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WellnessTracker userId="user123" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Track Your Wellness")).toBeInTheDocument();
      expect(screen.getByText("Mood: 7")).toBeInTheDocument();
      expect(screen.getByText("Sleep (hours): 8")).toBeInTheDocument();
      expect(screen.getByText("Stress: 5")).toBeInTheDocument();
    });
  });

  it("toggles to history view and displays wellness chart", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WellnessTracker userId="user123" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Track Your Wellness")).toBeInTheDocument();
      expect(screen.getByText("Mood: 7")).toBeInTheDocument();
    });

    const toggleSwitch = screen.getByRole("checkbox");

    expect(screen.queryByText("Wellness History")).not.toBeInTheDocument();

    fireEvent.click(toggleSwitch);

    await waitFor(() => {
      expect(screen.getByText("Wellness History")).toBeInTheDocument();
      expect(screen.getByTestId("wellness-chart")).toBeInTheDocument();
    });
  });

  it("saves wellness data when Save button is clicked", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WellnessTracker userId="user123" />
      </MockedProvider>
    );

    const saveButton = screen.getByText("Save Wellness Data");

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(saveButton).toHaveTextContent("Saving...");
    });

    await waitFor(() => {
      expect(saveButton).toHaveTextContent("Save Wellness Data");
    });
  });

  it.skip("displays error message when save fails", async () => {
    const errorMocks = [
      ...mocks,
      {
        request: {
          query: SAVE_WELLNESS_DATA,
          variables: {
            input: {
              userId: "user123",
              mood: 7,
              sleep: 8,
              stress: 5,
              date: expect.any(String),
            },
          },
        },
        error: new Error("Save failed"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <WellnessTracker userId="user123" />
      </MockedProvider>
    );

    const saveButton = screen.getByText("Save Wellness Data");

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(
        screen.getByText("Error saving data: Save failed")
      ).toBeInTheDocument();
    });
  });
});
