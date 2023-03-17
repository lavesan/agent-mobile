import { renderHook, waitFor } from "@testing-library/react-native";
import { useToogle } from "./useToogle";

describe("Hooks -> useToogle", () => {
  it("should toogle boolean", async () => {
    const { result } = renderHook(() => useToogle());

    expect(result.current).toHaveProperty("show");
    expect(result.current).toHaveProperty("toogleShow");

    expect(result.current.show).toBeFalsy();
    result.current.toogleShow();

    await waitFor(() => {
      expect(result.current.show).toBeTruthy();
    });

    result.current.toogleShow();

    await waitFor(() => {
      expect(result.current.show).toBeFalsy();
    });
  });
});
