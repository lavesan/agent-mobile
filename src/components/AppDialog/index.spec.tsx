import { fireEvent, render, screen } from "@testing-library/react-native";
import { Provider } from "react-native-paper";
import { AppDialog } from ".";

describe("Components -> AppDialog", () => {
  it("should render", () => {
    render(
      <Provider>
        <AppDialog
          show
          title="Mock title"
          description="mock description"
          primaryButton="Primary mock"
          secondaryButton="Secondary mock"
          onClose={() => {}}
          onPrimaryButtonPress={() => {}}
        />
      </Provider>
    );

    expect(screen.getByText("Mock title")).toBeTruthy();
  });

  it("should trigger primary function on primary button press", () => {
    const mockedPrimaryFunc = jest.fn();
    render(
      <Provider>
        <AppDialog
          show
          title="Mock title"
          description="mock description"
          primaryButton="Primary mock"
          secondaryButton="Secondary mock"
          onClose={() => {}}
          onPrimaryButtonPress={() => mockedPrimaryFunc()}
        />
      </Provider>
    );

    const button = screen.getByRole("button", { name: /primary mock/i });

    fireEvent.press(button);

    expect(mockedPrimaryFunc).toBeCalled();
  });

  it("should trigger onClose on secondary button press", () => {
    const mockedSecondaryFunc = jest.fn();
    render(
      <Provider>
        <AppDialog
          show
          title="Mock title"
          description="mock description"
          primaryButton="Primary mock"
          secondaryButton="Secondary mock"
          onClose={() => mockedSecondaryFunc()}
          onPrimaryButtonPress={() => {}}
        />
      </Provider>
    );

    const button = screen.getByRole("button", { name: /secondary mock/i });

    fireEvent.press(button);

    expect(mockedSecondaryFunc).toBeCalled();
  });
});
