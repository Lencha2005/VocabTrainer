import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  //   useWindowDimensions,
} from 'react-native';
import {ArrowDoubleIcon, ArrowIcon} from '../../../../assets/icons';

type WordsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (value: number) => void;
};

export default function WordsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: WordsPaginationProps) {
  const generatePages = () => {
    const pages: (number | string)[] = [];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (start > 1) {
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
    }
    return pages;
  };

  const allPages = generatePages();

  if (!currentPage || !totalPages) return null;

  return (
    <View style={styles.container}>
      <PaginationArrowDouble
        direction="left"
        disabled={currentPage <= 1}
        onPress={() => onPageChange(1)}
      />
      <PaginationArrow
        direction="left"
        disabled={currentPage <= 1}
        onPress={() => onPageChange(currentPage - 1)}
      />

      {allPages.map((page, index) =>
        page === '...' ? (
          <Text key={index} style={styles.dots}>
            ...
          </Text>
        ) : (
          <TouchableOpacity
            key={index}
            style={[
              styles.pageBtn,
              currentPage === page && styles.pageBtnActive,
            ]}
            onPress={() => onPageChange(page as number)}>
            <Text
              style={[
                styles.pageText,
                currentPage === page && styles.pageTextActive,
              ]}>
              {page}
            </Text>
          </TouchableOpacity>
        ),
      )}

      <PaginationArrow
        direction="right"
        disabled={currentPage >= totalPages}
        // currentPage={currentPage}
        onPress={() => onPageChange(currentPage + 1)}
      />
      <PaginationArrowDouble
        direction="right"
        disabled={currentPage >= totalPages}
        // totalPages={totalPages}
        onPress={() => onPageChange(totalPages)}
      />
    </View>
  );
}

function PaginationArrow({
  direction,
  disabled,
  onPress,
}: {
  direction: 'left' | 'right';
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.pageBtn, disabled && styles.disabled]}>
      {direction === 'left' ? <ArrowIcon /> : <ArrowIcon rotated={true} />}
    </TouchableOpacity>
  );
}

function PaginationArrowDouble({
  direction,
  disabled,
  onPress,
}: {
  direction: 'left' | 'right';
  disabled?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.pageBtn, disabled && styles.disabled]}>
      {direction === 'left' ? (
        <ArrowDoubleIcon />
      ) : (
        <ArrowDoubleIcon rotated={true} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 8,
  },
  pageBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  pageBtnActive: {
    backgroundColor: '#21725E',
    borderColor: '#21725E',
  },
  pageText: {
    fontSize: 14,
    color: '#111',
  },
  pageTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  dots: {
    alignSelf: 'center',
    fontSize: 14,
    color: '#888',
    marginHorizontal: 4,
  },
  disabled: {
    opacity: 0.5,
  },
});
