import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import { styles } from "./styles";

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
        <Dialog.Content>
          <View style={styles.buttonsContainer}>
            <Button
              style={[
                styles.buttonsContainerElem,
                styles.buttonsContainerFirstElem,
              ]}
              onPress={onClose}
              mode="outlined"
            >
              {secondaryButton}
            </Button>
            <Button
              style={styles.buttonsContainerElem}
              onPress={onPrimaryButtonPress}
              mode="contained"
            >
              {primaryButton}
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
