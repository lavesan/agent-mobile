import { renderHook } from "@testing-library/react-native";
import { useNavigateHome } from "./useNavigateHome";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe("Hooks -> useNavigateHome", () => {
  it("should navigate home", () => {
    const { result } = renderHook(() => useNavigateHome());

    expect(result.current).toHaveProperty("navigateHome");

    result.current.navigateHome();

    expect(mockNavigate).toBeCalled();
  });
});
