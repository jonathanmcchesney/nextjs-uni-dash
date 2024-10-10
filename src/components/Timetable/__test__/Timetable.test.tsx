import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Timetable from "../Timetable";
import { GET_SCHEDULE, UPDATE_CLASS } from "../../../gql/timetableQueries";
import "@testing-library/jest-dom";

const mocks = [
  {
    request: {
      query: GET_SCHEDULE,
      variables: { userId: "user123" },
    },
    result: {
      data: {
        getTimetable: [
          {
            id: "event1",
            name: "Math 101",
            startTime: "9:00 AM",
            endTime: "10:00 AM",
            day: "Monday",
            category: "class",
          },
          {
            id: "event2",
            name: "Physics 201",
            startTime: "10:00 AM",
            endTime: "11:00 AM",
            day: "Tuesday",
            category: "class",
          },
        ],
      },
    },
  },
  {
    request: {
      query: UPDATE_CLASS,
      variables: {
        userId: "user123",
        classId: "event1",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        day: "Tuesday",
      },
    },
    result: {
      data: {
        updateClass: {
          id: "event1",
          name: "Math 101",
          startTime: "10:00 AM",
          endTime: "11:00 AM",
          day: "Tuesday",
        },
      },
    },
  },
];

describe("Timetable Component", () => {
  it("displays loading state initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Timetable userId="user123" />
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the timetable correctly after loading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Timetable userId="user123" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Math 101")).toBeInTheDocument();
      expect(screen.getByText("Physics 201")).toBeInTheDocument();
    });

    expect(screen.getByTestId("timeslot-1").firstChild).toMatchInlineSnapshot(
      `10:00 AM - 11:00 AM`
    );
    expect(screen.getByTestId("timeslot-2").firstChild).toMatchInlineSnapshot(
      `11:00 AM - 12:00 PM`
    );
    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(screen.getByText("Wednesday")).toBeInTheDocument();
    expect(screen.getByText("Thursday")).toBeInTheDocument();
    expect(screen.getByText("Friday")).toBeInTheDocument();
  });
});
