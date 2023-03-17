import { fireEvent, render, screen } from "@testing-library/react-native";
import { IMockForm, MockForm } from "../../__mocks__/form/MockForm";
import { AppInput } from ".";

describe("Components -> AppInput", () => {
  it("should render", () => {
    render(
      <MockForm>
        {/** @ts-ignore */}
        <AppInput<IMockForm> label="Mock" name="name" />
      </MockForm>
    );

    const [label] = screen.getAllByText("Mock");

    expect(label).toBeTruthy();
  });

  it("should change value", () => {
    render(
      <MockForm>
        {/** @ts-ignore */}
        <AppInput<IMockForm> label="Mock" name="name" />
      </MockForm>
    );

    const input = screen.getByTestId("input-name");
    fireEvent.changeText(input, "123");
    expect(input.props.value).toBe("123");
  });
});
