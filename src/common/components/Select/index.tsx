// src/common/components/Select.tsx
import React, {useMemo, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import {fonts} from '../../../constants/fonts';
import {ToggleDownIcon} from '../../../assets/icons';

// type Option = string;

interface SelectProps {
  value: string | null;
  options: string[] | null;
  onChange: (val: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function Select({
  value,
  options,
  onChange,
  placeholder = 'Select category…',
  disabled = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const label = useMemo(() => value ?? placeholder, [value, placeholder]);

  const handleOpen = () => {
    if (!disabled) setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePick = (val: string | null) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleOpen}
        style={[styles.trigger, disabled && styles.triggerDisabled]}>
        <Text
          style={[styles.triggerText, !value && styles.placeholderText]}
          numberOfLines={1}>
          {label}
        </Text>
        <ToggleDownIcon rotated={open} />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={handleClose}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleClose}
          style={styles.backdrop}
        />
        <View style={styles.sheet}>
          {/* <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Categories</Text> */}

          <FlatList
            data={options}
            keyExtractor={item => item}
            renderItem={({item}) => {
              const selected = item === value;
              return (
                <TouchableOpacity
                  onPress={() => handlePick(item)}
                  style={[styles.itemRow, selected && styles.itemRowSelected]}>
                  <Text
                    style={[
                      styles.itemText,
                      selected && styles.itemTextSelected,
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    borderWidth: 1,
    borderColor: 'rgba(18, 20, 23, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 24,
    paddingVertical: Platform.select({ios: 12, android: 12, default: 12}),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  triggerDisabled: {opacity: 0.6},
  triggerText: {
    flex: 1,
    fontFamily: fonts.MacPawFixelDisplayMedium,
    fontSize: 16,
    color: '#121417',
  },
  placeholderText: {color: '#121417'},
  // chevron: {fontSize: 16, color: '#7C8A9F'},

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: Platform.select({ios: 280, android: 280, default: 280}),
    height: 300,
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 8},
    elevation: 8,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    marginTop: 10,
    marginBottom: 8,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#111827',
  },
  // clearRow: {paddingHorizontal: 16, paddingVertical: 10},
  // clearText: {color: '#A1A1AA'},

  listContent: {paddingHorizontal: 8, paddingVertical: 4},
  itemRow: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  itemRowSelected: {backgroundColor: '#EEF6F2'},
  itemText: {fontSize: 16, color: '#111827'},
  itemTextSelected: {color: '#21725E', fontWeight: '600'},
  sep: {height: 4},
});
