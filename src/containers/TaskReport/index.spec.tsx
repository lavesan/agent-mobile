import { render, screen, waitFor } from "@testing-library/react-native";
import TaskReport from ".";

describe("Containers -> TaskReport", () => {
  it("should render", async () => {
    render(
      <TaskReport
        navigation={
          {
            navigate: jest.fn(),
            addListener: jest.fn().mockImplementation((event, callback) => {
              callback();
              return jest.fn();
            }),
          } as any
        }
        route={{} as any}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/^Completas/i)).toBeTruthy();
      expect(screen.getByText(/Incompletas/i)).toBeTruthy();
      expect(screen.getByText(/Total/i)).toBeTruthy();
    });
  });
});
