import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { useController, Control, FieldValues } from "react-hook-form";
import { Path } from "react-hook-form";

interface IAppInputProps<IForm extends FieldValues> {
  control: Control<IForm, string>;
  label: string;
  name: Path<IForm>;
}

export function AppInput<IForm extends FieldValues>({
  control,
  name,
  label,
}: IAppInputProps<IForm>) {
  const {
    field: { onChange, value },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <View>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChange}
        error={!!errors[name]?.message}
      />
    </View>
  );
}
