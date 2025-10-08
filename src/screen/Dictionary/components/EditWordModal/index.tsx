import React from 'react';
import {WordItem} from '../../../../redux/types';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Input from '../../../../common/components/Input';
import {fonts} from '../../../../constants/fonts';
import {InferType} from 'yup';
import {EditSchema} from '../../../Auth/utils/validations';
import {EnglangIcon, UkraineIcon} from '../../../../assets/icons';
import {Formik} from 'formik';

type EditWordModalProps = {
  visible: boolean;
  word: WordItem | null;
  onClose: () => void;
  onSave: (payload: {id: string; formData: Omit<WordItem, '_id'>}) => void;
};

type WordEditInputs = InferType<typeof EditSchema>;

export default function EditWordModal({
  visible,
  word,
  onClose,
  onSave,
}: EditWordModalProps) {
  if (!word) return null;

  const initialValies: WordEditInputs = {
    ua: word.ua,
    en: word.en,
  };

  const handleSubmit = (values: WordEditInputs) => {
    if (word._id) {
      onSave({
        id: word._id,
        formData: {
          ...values,
          category: word.category,
          isIrregular: word.isIrregular,
        },
      });
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Formik
            initialValues={initialValies}
            validationSchema={EditSchema}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.wrapInput}>
                  <View style={styles.wrapIcon}>
                    <UkraineIcon />
                    <Text style={styles.label}>Ukrainian</Text>
                  </View>
                  <Input
                    value={values.ua}
                    onChangeText={handleChange('ua')}
                    onBlur={handleBlur('ua')}
                  />
                  {touched.ua && errors.ua && (
                    <Text style={styles.error}>{errors.ua}</Text>
                  )}
                </View>

                <View style={styles.wrapInput}>
                  <View style={styles.wrapIcon}>
                    <EnglangIcon />
                    <Text style={styles.label}>English</Text>
                  </View>
                  <Input
                    value={values.en}
                    onChangeText={handleChange('en')}
                    onBlur={handleBlur('en')}
                  />
                  {touched.en && errors.en && (
                    <Text style={styles.error}>{errors.en}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 20, 23, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 24,
    paddingVertical: 40,
    borderRadius: 24,
    width: '90%',
  },
  wrapInput: {
    marginBottom: 24,
  },
  wrapIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.MacPawFixelDisplayMedium,
  },
  error: {
    fontFamily: fonts.MacPawFixelDisplayRegular,
    color: 'red',
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: '#85aa9f',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  saveText: {
    color: '#fcfcfc',
    fontSize: 16,
    fontFamily: fonts.MacPawFixelDisplayBold,
  },
  cancelText: {
    textAlign: 'center',
    color: 'rgba(18, 20, 23, 0.5)',
    fontSize: 16,
    fontFamily: fonts.MacPawFixelDisplayBold,
  },
});
