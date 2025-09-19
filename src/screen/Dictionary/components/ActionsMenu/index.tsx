import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {EditIcon, TrashIcon} from '../../../../assets/icons';

type ActionsMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export function ActionsMenu({onEdit, onDelete}: ActionsMenuProps) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      {/* кнопка відкриття меню */}
      <TouchableOpacity onPress={openMenu} style={styles.iconBtn}>
        <Text style={styles.btnText}>...</Text>
      </TouchableOpacity>

      {/* меню */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}>
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onEdit();
              closeMenu();
            }}>
            <EditIcon />
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onDelete();
              closeMenu();
            }}>
            <TrashIcon />
            <Text style={styles.menuText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    padding: 6,
  },
  btnText: {
    marginHorizontal: 'auto',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  menu: {
    position: 'absolute',
    right: 16,
    top: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#121417',
  },
});
