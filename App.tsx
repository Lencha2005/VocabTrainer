import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {DevSettings, NativeModules, SafeAreaView} from 'react-native';
import LoginPage from './src/screen/Auth/Login';
// import RagistrationPage from './src/screen/Auth/Registration';

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
    <SafeAreaView style={{flex: 1}}>
      {/* <RagistrationPage /> */}
      <LoginPage />
    </SafeAreaView>
  );
}

export default App;
