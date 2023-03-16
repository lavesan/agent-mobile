import { Button, Dialog, Portal, Text } from "react-native-paper";

interface IAppDialogProps {
  show: boolean;
  title: string;
  description: string;
  primaryButton: string;
  onPrimaryButtonPress: VoidFunction;
  secondaryButton: string;
  onClose: VoidFunction;
}

export const AppDialog = ({
  title,
  description,
  show,
  primaryButton,
  secondaryButton,
  onClose,
  onPrimaryButtonPress,
}: IAppDialogProps) => {
  return (
    <Portal>
      <Dialog visible={show} onDismiss={onClose}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{description}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>{secondaryButton}</Button>
          <Button onPress={onPrimaryButtonPress}>{primaryButton}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
