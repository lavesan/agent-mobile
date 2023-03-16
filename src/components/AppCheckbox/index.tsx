import { View, StyleProp, ViewStyle } from "react-native";
import { Checkbox, Text } from "react-native-paper";
import { Path, FieldValues, useController, Control } from "react-hook-form";

import { styles } from "./styles";

interface IAppCheckboxProps<IForm extends FieldValues> {
  control: Control<IForm, string>;
  label: string;
  name: Path<IForm>;
  style?: StyleProp<ViewStyle>;
}

export function AppCheckbox<IForm extends FieldValues>({
  label,
  name,
  control,
  style = {},
}: IAppCheckboxProps<IForm>) {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
  });

  return (
    <View style={[style, styles.container]}>
      <Checkbox
        status={value ? "checked" : "unchecked"}
        onPress={() => onChange(!value)}
      />
      <Text style={styles.containerLabel}>{label}</Text>
    </View>
  );
}
