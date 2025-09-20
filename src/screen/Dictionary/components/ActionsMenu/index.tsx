import React, {useRef, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  findNodeHandle,
  UIManager,
} from 'react-native';
import {EditIcon, MoreIcon, TrashIcon} from '../../../../assets/icons';

type ActionsMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export function ActionsMenu({onEdit, onDelete}: ActionsMenuProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({top: 0, left: 0});
  const triggerRef = useRef<TouchableOpacity>(null);

  // const openMenu = () => setVisible(true);
  const openMenu = () => {
    if (triggerRef.current) {
      const handle = findNodeHandle(triggerRef.current);
      if (handle) {
        UIManager.measure(handle, (_x, _y, _w, h, px, py) => {
          // меню під кнопкою
          setPosition({top: py + h + 4, left: px - 58});
          setVisible(true);
        });
      }
    }
  };

  const closeMenu = () => setVisible(false);

  return (
    <View>
      {/* кнопка відкриття меню */}
      <TouchableOpacity
        ref={triggerRef}
        onPress={openMenu}
        style={styles.iconBtn}>
        <MoreIcon />
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

        <View style={[styles.menu, {top: position.top, left: position.left}]}>
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
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: 'rgba(18, 20, 23, 0.08)',
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
