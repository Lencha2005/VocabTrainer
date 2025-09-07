import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ScreenNames} from '../../../constants/screenNames';
import {LogOutIcon, UserIcon} from '../../../assets/icons';
import {fonts} from '../../../constants/fonts';
import {logoutUser} from '../../../api/auth';
import {navigationRef} from '../../components/NavigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabHeader() {
  const [name, setName] = useState('');

  useEffect(() => {
    const getName = async () => {
      const userName = await AsyncStorage.getItem('userName');
      if (userName) setName(userName);
    };

    getName();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();

      if (navigationRef.isReady()) {
        navigationRef.reset({
          index: 0,
          routes: [{name: ScreenNames.LOGGED_OUT_STACK}],
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.wrapHeader}>
      <View style={styles.wrapUser}>
        <View style={styles.wrapUserIcon}>
          <UserIcon />
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <TouchableOpacity style={styles.wrapLogout} onPress={handleLogout}>
        <Text style={styles.logOutText}>Log out</Text>
        <LogOutIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapHeader: {
    width: '100%',
    height: 73,
    paddingBottom: 10,
    paddingTop: 4,
    position: 'relative',
    backgroundColor: '#f8f8f8',
  },
  wrapUser: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    gap: 4,
  },
  wrapUserIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#85aa9f',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: fonts.MacPawFixelDisplayMedium,
    fontSize: 12,
    color: '#121417',
    alignItems: 'center',
  },
  wrapLogout: {
    flexDirection: 'row',
    gap: 6,
    position: 'absolute',
    bottom: 20,
    right: 16,
    alignItems: 'center',
  },
  logOutText: {
    fontFamily: fonts.MacPawFixelDisplayMedium,
    fontSize: 16,
    color: '#85aa9f',
  },
});
