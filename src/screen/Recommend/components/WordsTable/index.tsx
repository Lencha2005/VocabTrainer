import React, {useState} from 'react';
import {WordItem} from '../../../../redux/types';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SwitchHorizontalIcon} from '../../../../assets/icons';
import ProgressBar from '../../../Dictionary/components/ProgressBar';
import {ActionsMenu} from '../../../Dictionary/components/ActionsMenu';

type WordsTableProps = {
  words: WordItem[];
  onAdd?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  variant?: 'dictionary' | 'recommend';
};

export default function WordsTable({
  words,
  onAdd,
  onEdit,
  onDelete,
  variant = 'dictionary',
}: WordsTableProps) {
  const [openModal, setOpenModal] = useState(false);

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerCell, {flex: 1, marginRight: 10}]}>Word</Text>
      <Text style={[styles.headerCell, {flex: 2}]}>Translation</Text>

      {variant === 'dictionary' ? (
        <>
          <Text style={[styles.headerCell, {flex: 1}]}>Progress</Text>
          <Text style={[styles.headerCell, {width: 50}]} />
        </>
      ) : (
        <>
          <Text style={[styles.headerCell, {flex: 1}]}>Category</Text>
          <Text style={[styles.headerCell, {width: 50}]} />
        </>
      )}
    </View>
  );

  const renderItem = ({item}: {item: WordItem}) => (
    <View style={styles.row}>
      <Text style={[styles.cell, {flex: 1, marginRight: 10}]}>{item.en}</Text>
      <Text style={[styles.cell, {flex: 2}]}>{item.ua}</Text>
      {variant === 'dictionary' ? (
        <>
          <ProgressBar value={item.progress ?? 0} labelPosition="left" />
          <View>
            <TouchableOpacity
              onPress={() => setOpenModal(true)}
              style={[styles.addBtn, {width: 50}]}></TouchableOpacity>

            {openModal && onEdit && onDelete && (
              <ActionsMenu
                onEdit={() => onEdit(item._id!)}
                onDelete={() => onDelete(item._id!)}
              />
            )}
          </View>
        </>
      ) : (
        <>
          <Text style={[styles.cell, {flex: 1}]}>{[item.category]}</Text>
          <View
            style={[styles.cell, {flexDirection: 'row', alignItems: 'center'}]}>
            {onAdd && (
              <TouchableOpacity
                onPress={() => onAdd(item._id!)}
                style={[styles.addBtn, {width: 30}]}>
                <SwitchHorizontalIcon />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
  return (
    <View style={styles.table}>
      {renderHeader()}
      <FlatList
        data={words}
        keyExtractor={item => item._id!}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 16}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 16,
    marginLeft: 16,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  headerCell: {
    fontWeight: '600',
    fontSize: 14,
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    gap: 8,
  },
  cell: {
    alignItems: 'center',
    fontSize: 14,
    color: '#111827',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addBtnText: {
    fontSize: 14,
    color: '#21725E',
    marginRight: 6,
  },
});
