import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Formik } from "formik";
import * as Yup from "yup";
import * as Keychain from 'react-native-keychain';
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const validationSchema = Yup.object().shape({
  patientId: Yup.string().required('Patient ID is required'),
  name: Yup.string().required('Name is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .required('Age is required')
    .min(0, 'Age must be a positive number'),
  dueDate: Yup.string().required('Due Date is required'),
  medicalHistoryText: Yup.string(),
});

const ErrorMessage = ({ errorValue }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{errorValue}</Text>
  </View>
);

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const { setTempToken } = useAuth();
// Updated handleRegister function in RegistrationScreen
const handleRegister = async (values) => {
  try {
    // Get temporary token
    const tokenResponse = await authApi.getTempToken(values.patientId);
    setTempToken(tokenResponse.token);

    // Register with temporary token
    const response = await authApi.register({
      patientId: values.patientId,
      basicInfo: {
        name: values.name,
        age: values.age,
        dueDate: values.dueDate
      },
      medicalHistoryText: values.medicalHistoryText
    }, tokenResponse.token);

    Alert.alert('Success', 'Registration successful!');
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error during registration:', error);
    Alert.alert(
      'Error',
      error.response?.data?.error || 'An error occurred during registration.'
    );
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <Formik
        initialValues={{ 
          patientId: '', 
          name: '', 
          age: '', 
          dueDate: '', 
          medicalHistoryText: '' 
        }}
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        {({ handleChange, values, errors, touched, handleSubmit, handleBlur }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Patient ID"
              onChangeText={handleChange('patientId')}
              value={values.patientId}
              onBlur={handleBlur('patientId')}
            />
            <ErrorMessage errorValue={touched.patientId && errors.patientId} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={handleChange('name')}
              value={values.name}
              onBlur={handleBlur('name')}
            />
            <ErrorMessage errorValue={touched.name && errors.name} />
            <TextInput
              style={styles.input}
              placeholder="Age"
              onChangeText={handleChange('age')}
              value={values.age.toString()} 
              keyboardType="numeric"
              onBlur={handleBlur('age')}
            />
            <ErrorMessage errorValue={touched.age && errors.age} />
            <TextInput
              style={styles.input}
              placeholder="Due Date (YYYY-MM-DD)"
              onChangeText={handleChange('dueDate')}
              value={values.dueDate}
              onBlur={handleBlur('dueDate')}
            />
            <ErrorMessage errorValue={touched.dueDate && errors.dueDate} />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Medical History"
              onChangeText={handleChange('medicalHistoryText')}
              value={values.medicalHistoryText}
              multiline
              onBlur={handleBlur('medicalHistoryText')}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    width: Dimensions.get("window").width - 100,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100, 
    textAlignVertical: 'top', 
  },
  button: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: Dimensions.get("window").width - 200,
    height: 44,
    borderRadius: 5,
    backgroundColor: "#343434",
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
  },
});
