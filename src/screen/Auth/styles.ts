import {StyleSheet} from 'react-native';
import {fonts} from '../../constants/fonts';

export default StyleSheet.create({
  mainWrap: {
    // margin: 16,
    // marginTop: 64,
    // marginBottom: 60,
    flex: 1,
    justifyContent: 'center',
  },
  wrapperLoginForm: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#ecf0ef',
    paddingVertical: 32,
    paddingHorizontal: 16,
    minHeight: 455,
  },
  wrapperRegisterForm: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#ecf0ef',
    paddingTop: 32,
    paddingHorizontal: 16,
    height: 549,
  },
  title: {
    fontFamily: fonts.MacPawFixelDisplaySemiBold,
    fontSize: 30,
    color: '#121417',
    marginBottom: 16,
  },
  text: {
    fontFamily: fonts.MacPawFixelDisplayRegular,
    fontSize: 16,
    color: '#121417',
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#85aa9f',
    padding: 16,
    borderRadius: 30,
    marginTop: 18,
  },
  btnText: {
    fontFamily: fonts.MacPawFixelDisplayBold,
    fontSize: 16,
    color: '#fcfcfc',
  },
  link: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 60,
  },
  linkText: {
    fontFamily: fonts.MacPawFixelDisplayBold,
    fontSize: 16,
    color: 'rgba(18, 20, 23, 0.5)',
    textDecorationLine: 'underline',
  },
});
