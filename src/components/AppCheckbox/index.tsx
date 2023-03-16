import { Path, FieldValues, useController, Control } from "react-hook-form";
import { Checkbox } from "react-native-paper";

interface IAppCheckboxProps<IForm extends FieldValues> {
  control: Control<IForm, string>;
  label: string;
  name: Path<IForm>;
}

export function AppCheckbox<IForm extends FieldValues>({
  label,
  name,
  control,
}: IAppCheckboxProps<IForm>) {
  const {
    field: { onChange, value },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <Checkbox
      status={value ? "checked" : "unchecked"}
      onPress={() => onChange(!value)}
    />
  );
}
