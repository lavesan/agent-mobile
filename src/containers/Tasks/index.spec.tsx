import React from "react";
import { render } from "@testing-library/react-native";

import Tasks from ".";

const navigateMock = jest.fn();

const mockNavigation = {
  navigate: navigateMock,
} as any;

describe("Containers -> Tasks", () => {
  it("should render", () => {
    const { getByText } = render(
      <Tasks navigation={mockNavigation} route={{} as any} />
    );

    expect(getByText("Adicionar tarefa")).toBeTruthy();
  });
});
