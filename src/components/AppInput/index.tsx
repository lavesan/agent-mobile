import { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { useController, Control, FieldValues } from "react-hook-form";
import { Path } from "react-hook-form";

import { formStyles } from "@styles/form.styles";

interface IAppInputProps<IForm extends FieldValues> {
  control: Control<IForm, string>;
  label: string;
  name: Path<IForm>;
  style?: StyleProp<ViewStyle>;
}

export function AppInput<IForm extends FieldValues>({
  control,
  name,
  label,
  style = {},
}: IAppInputProps<IForm>) {
  const {
    field: { onChange, value },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const errorMsg = useMemo<string>(
    () => errors[name]?.message?.toString() || "",
    [errors]
  );

  return (
    <View style={style}>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        onChangeText={onChange}
        error={!!errorMsg}
      />
      {errorMsg && <Text style={formStyles.fieldErrorMsg}>{errorMsg}</Text>}
    </View>
  );
}
