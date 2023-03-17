import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import Tasks from ".";

describe("Containers -> Tasks", () => {
  it("should render", async () => {
    render(
      <Tasks
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

    expect(screen.getByText("Adicionar tarefa")).toBeTruthy();
  });

  it("should navigate to CreateTask page when Add Task button is clicked", async () => {
    let navigatedRoute = "";
    const mockedFunc = (route: string) => {
      navigatedRoute = route;
    };
    render(
      <Tasks
        navigation={
          {
            navigate: mockedFunc,
            addListener: jest.fn().mockImplementation((event, callback) => {
              callback();
              return jest.fn();
            }),
          } as any
        }
        route={{} as any}
      />
    );

    const addTaskBtn = screen.getByRole("button", {
      name: /adicionar tarefa/i,
    });

    fireEvent.press(addTaskBtn);

    await waitFor(() => {
      expect(navigatedRoute).toBe("CreateTask");
    });
  });

  it("should navigate to TaskReport page when See reports button is clicked", async () => {
    let navigatedRoute = "";
    const mockedFunc = (route: string) => {
      navigatedRoute = route;
    };
    render(
      <Tasks
        navigation={
          {
            navigate: mockedFunc,
            addListener: jest.fn().mockImplementation((event, callback) => {
              callback();
              return jest.fn();
            }),
          } as any
        }
        route={{} as any}
      />
    );

    const addTaskBtn = screen.getByRole("button", {
      name: /ver relatório/i,
    });

    fireEvent.press(addTaskBtn);

    await waitFor(() => {
      expect(navigatedRoute).toBe("TaskReport");
    });
  });
});
