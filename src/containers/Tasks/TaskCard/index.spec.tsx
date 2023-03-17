import React from "react";
import {
  screen,
  render,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import { TaskCard } from ".";

let navigatedRoute = "";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: (route: string) => {
      navigatedRoute = route;
    },
  }),
}));

describe("Containers -> Tasks -> TaskCard", () => {
  afterEach(() => {
    navigatedRoute = "";
  });

  it("should render", () => {
    render(
      <TaskCard
        isDone
        id="mock"
        title="Mock Title"
        description="mock description"
        fetchTasks={() => {}}
      />
    );

    expect(screen.getByText("Mock Title")).toBeTruthy();
  });

  it("should navigate to task onPress", () => {
    render(
      <TaskCard
        isDone
        id="mock"
        title="Mock Title"
        description="mock description"
        fetchTasks={() => {}}
      />
    );

    const card = screen.getByTestId("card-container-mock");

    fireEvent.press(card);

    expect(navigatedRoute).toBe("Task");
  });

  it("should delete task on trash icon click", async () => {
    const mockFetchTasks = jest.fn();

    render(
      <TaskCard
        isDone
        id="mock"
        title="Mock Title"
        description="mock description"
        fetchTasks={mockFetchTasks}
      />
    );

    const trashIcon = screen.getByTestId("trash-can-mock");

    fireEvent.press(trashIcon);

    await waitFor(() => {
      expect(mockFetchTasks).toBeCalled();
    });
  });

  it("should toogle task isDone on checkbox click", async () => {
    const mockFetchTasks = jest.fn();

    render(
      <TaskCard
        isDone
        id="mock"
        title="Mock Title"
        description="mock description"
        fetchTasks={mockFetchTasks}
      />
    );

    const checkbox = screen.getByRole("checkbox");

    fireEvent.press(checkbox);

    await waitFor(() => {
      expect(mockFetchTasks).toBeCalled();
    });
  });
});
