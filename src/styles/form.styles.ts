import { StyleSheet } from "react-native";

import { theme } from "@config/theme";

export const formStyles = StyleSheet.create({
  field: {
    marginBottom: 8,
  },
  lastField: {
    marginBottom: 24,
  },
  fieldErrorMsg: {
    color: theme.colors.error,
  },
});
