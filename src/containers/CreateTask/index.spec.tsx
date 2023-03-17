import { fireEvent, render, screen } from "@testing-library/react-native";
import { Provider } from "react-native-paper";
import CreateTask from ".";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("Containers -> CreateTask", () => {
  it("should render", () => {
    render(
      <Provider>
        <CreateTask
          navigation={
            {
              navigate: jest.fn(),
              addListener: jest.fn(),
            } as any
          }
          route={{ params: { id: "mock" } } as any}
        />
      </Provider>
    );

    expect(screen.getByText("Criar")).toBeTruthy();
  });

  it("should create when form is valid", async () => {
    render(
      <Provider>
        <CreateTask
          navigation={
            {
              navigate: jest.fn(),
              addListener: jest.fn(),
            } as any
          }
          route={{ params: { id: "mock" } } as any}
        />
      </Provider>
    );

    const titleInput = screen.getByTestId("input-title");
    const descriptionInput = screen.getByTestId("input-description");

    fireEvent.changeText(titleInput, "Título mock 2");
    fireEvent.changeText(descriptionInput, "descrição mock 2");

    const submitBtn = screen.getByRole("button", { name: "Criar" });

    fireEvent.press(submitBtn);

    const createdProof = await screen.findByText(/Tarefa criada/i);
    expect(createdProof).toBeTruthy();
  });
});
