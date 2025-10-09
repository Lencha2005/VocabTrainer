import React from 'react';
import {WordItem} from '../../../../redux/types';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SwitchHorizontalIcon} from '../../../../assets/icons';
import ProgressBar from '../../../Dictionary/components/ProgressBar';
import {ActionsMenu} from '../../../Dictionary/components/ActionsMenu';
import ListFooter from '../../../../common/components/ListFooter';

type WordsTableProps = {
  words: WordItem[];
  onAdd?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEndReached?: () => void;
  isLoadingMore?: boolean;
  variant?: 'dictionary' | 'recommend';
};

export default function WordsTable({
  words,
  onAdd,
  onEdit,
  onDelete,
  onEndReached,
  isLoadingMore,
  variant = 'dictionary',
}: WordsTableProps) {
  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerCell, {width: 80, marginRight: 10}]}>
        Word
      </Text>
      <Text style={[styles.headerCell, {flex: 1, marginRight: 4}]}>
        Translation
      </Text>

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

  const renderItem = ({item}: {item: WordItem}) => {
    const rowHeight = item.category === 'verb' && item.isIrregular ? 74 : 56;
    return (
      <View style={[styles.row, {height: rowHeight ?? 74}]}>
        <Text style={[styles.cell, {width: 80}]}>{item.en}</Text>
        <Text style={[styles.cell, {flex: 1}]}>{item.ua}</Text>
        {variant === 'dictionary' ? (
          <>
            <ProgressBar value={item.progress ?? 0} labelPosition="left" />
            <View>
              <TouchableOpacity
                style={[styles.addBtn, {width: 50}]}></TouchableOpacity>

              {onEdit && onDelete && (
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
              style={[
                styles.cell,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
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
  };
  return (
    <View style={styles.table}>
      {renderHeader()}
      <FlatList
        data={words}
        keyExtractor={item => item._id!}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 1}}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={<ListFooter isLoadingMore={isLoadingMore} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
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
    paddingHorizontal: 4,
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
    paddingHorizontal: 4,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addBtnText: {
    fontSize: 14,
    color: '#21725E',
  },
});
