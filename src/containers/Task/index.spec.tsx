import { fireEvent, render, screen } from "@testing-library/react-native";
import { Provider } from "react-native-paper";
import Task from ".";

describe("Container -> Task", () => {
  it("should render", () => {
    render(
      <Provider>
        <Task
          navigation={
            {
              navigate: jest.fn(),
              addListener: jest.fn().mockImplementation((event, callback) => {
                callback();
                return jest.fn();
              }),
            } as any
          }
          route={{ params: { id: "mock" } } as any}
        />
      </Provider>
    );

    expect(screen.getByText("Editar tarefa")).toBeTruthy();
  });

  it("should update data when form is valid", async () => {
    render(
      <Provider>
        <Task
          navigation={
            {
              navigate: jest.fn(),
              addListener: jest.fn().mockImplementation((event, callback) => {
                callback();
                return jest.fn();
              }),
            } as any
          }
          route={{ params: { id: "mock" } } as any}
        />
      </Provider>
    );

    const titleInput = screen.getByTestId("input-title");
    const descriptionInput = screen.getByTestId("input-description");

    fireEvent.changeText(titleInput, "Título mock");
    fireEvent.changeText(descriptionInput, "descrição mock");

    const submitBtn = screen.getByRole("button", { name: "Editar tarefa" });

    fireEvent.press(submitBtn);

    const updatedProof = await screen.findByText(/Tarefa editada/i);
    expect(updatedProof).toBeTruthy();
  });
});
