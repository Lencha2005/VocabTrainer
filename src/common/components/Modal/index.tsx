import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {CloseIcon} from '../../../assets/icons';

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseIcon?: boolean;
};

export default function CustomModal({
  isOpen,
  onClose,
  children,
  showCloseIcon = true,
}: CustomModalProps) {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isOpen) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, opacity]);

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="none" // ми самі робимо анімацію
      onRequestClose={onClose}>
      <Animated.View style={[styles.backdrop, {opacity}]} />

      <View style={styles.centered}>
        <Animated.View style={[styles.modalBox, {opacity}]}>
          {showCloseIcon && (
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <CloseIcon />
            </TouchableOpacity>
          )}

          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: width * 0.9,
    maxWidth: 628,
    minWidth: 343,
    backgroundColor: '#85aa9f',
    borderRadius: 20,
    padding: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
});
