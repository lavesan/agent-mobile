import { renderHook } from "@testing-library/react-native";
import { useAppContext } from "./useAppContext";

describe("Hooks -> useAppContext", () => {
  it("should have app context properties", () => {
    const { result } = renderHook(() => useAppContext());

    expect(result.current).toHaveProperty("setIsLoading");
  });
});
