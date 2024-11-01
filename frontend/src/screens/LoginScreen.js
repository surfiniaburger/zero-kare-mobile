import React, { useState } from 'react';

  import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Dimensions,
    Alert, // Import Alert for displaying messages
  } from "react-native";
  import { useNavigation } from '@react-navigation/native'; 
  
  export default function LoginScreen() {
    const navigation = useNavigation();
    const [patientId, setPatientId] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await fetch('https://34.49.13.123.nip.io/zk/v1/record/login', { // Replace with your actual backend URL
          method: 'POST',
          headers: {
            'apikey': '9GvCqFCOzqmGjuAGOpu5x3RN4ak3mNoyQ57nO71BRuuS0ntu',
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({ patientId }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Login successful:', data); 
  
          // Navigate to HomeScreen or another screen after successful login
          navigation.navigate('Home', { patientData: data }); // You can pass data if needed
        } else {
          const errorData = await response.json();
          console.error('Login failed:', errorData);
          Alert.alert('Login Failed', errorData.error || 'Invalid patient ID.');
        }
      } catch (error) {
        console.error('Error during login:', error);
        Alert.alert('Error', 'An error occurred during login.');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Patient ID"
          value={patientId}
          onChangeText={setPatientId}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // ... (styles remain the same) 
  
  const styles = StyleSheet.create({
    errorContainer: {
      marginVertical: 5,
    },
    errorText: {
      color: "red",
    },
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 40,
    },
    input: {
      marginVertical: 10,
      width: Dimensions.get("window").width - 100,
  
      height: 40,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
    buttonContainer: {
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
  });
  