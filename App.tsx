import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  DevSettings,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import RootNavigation from './src/navigation';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/common/components/Toast/toastConfig';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(true);
      });
      DevSettings.addMenuItem('Stop Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(false);
      });
    }
    // SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.toastContainer}>
            <Toast
              position="top"
              topOffset={60}
              config={toastConfig}
              visibilityTime={3000}
            />
          </View>
          <RootNavigation />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    left: 0,
    right: 0,
  },
});
