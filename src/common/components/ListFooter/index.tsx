import {ActivityIndicator, View, Text} from 'react-native';

export default function ListFooter({isLoadingMore}: {isLoadingMore?: boolean}) {
  if (!isLoadingMore) return null;

  return (
    <View
      style={{
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="small" color="#85aa9f" />
      <Text style={{marginTop: 4, color: '#85aa9f', fontSize: 12}}>
        Loading more words...
      </Text>
    </View>
  );
}
