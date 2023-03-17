import { fireEvent, render, screen } from "@testing-library/react-native";
import { IMockForm, MockForm } from "../../__mocks__/form/MockForm";
import { AppCheckbox } from ".";

describe("Components -> AppCheckbox", () => {
  it("should render", () => {
    render(
      <MockForm>
        {/** @ts-ignore */}
        <AppCheckbox<IMockForm> label="Mock" name="name" />
      </MockForm>
    );

    expect(screen.getByText("Mock")).toBeTruthy();
  });

  it("should check when pressed", () => {
    render(
      <MockForm>
        {/** @ts-ignore */}
        <AppCheckbox<IMockForm> label="Mock" name="name" />
      </MockForm>
    );

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox.props.accessibilityState.checked).toBeFalsy();

    fireEvent.press(checkbox);

    expect(checkbox.props.accessibilityState.checked).toBeTruthy();
  });
});
