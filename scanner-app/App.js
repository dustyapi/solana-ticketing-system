import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QRCodeScanner from "./QRCodeScanner";
import { getAllValidatedQR } from "./handleValidation";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();

function ScannerScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#000000","#000000"]} // Define the gradient colors
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>QR CODE VALIDATOR</Text>
        <QRCodeScanner />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CodeList")}
        >
          <Text style={styles.buttonText}>List of people inside the venue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

function CodeListScreen() {
  const [validatedQRList, setValidatedQRList] = useState([]);

  useEffect(() => {
    fetchValidatedQRList();
  }, []);

  const fetchValidatedQRList = async () => {
    try {
      const qrList = await getAllValidatedQR();
      setValidatedQRList(qrList);
    } catch (error) {
      console.error("Error fetching validated QR codes:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of users in venue</Text>
      <FlatList
        data={validatedQRList}
        keyExtractor={(item) => item.hash}
        renderItem={({ item }) => (
          <View style={styles.qrCodeItem}>
            <Text style={styles.qrCodeText}>Email: {item.email}</Text>
            <Text style={styles.qrCodeText}>Name: {item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Scanner"
          options={ScannerScreen.navigationOptions}
          component={ScannerScreen}
        />
        <Stack.Screen
          name="CodeList"
          options={ScannerScreen.navigationOptions}
          component={CodeListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

ScannerScreen.navigationOptions = {
  title: "Scanner",
  headerStyle: {
    backgroundColor: "#4E44CE", // Change the color value to the desired color
  },
  headerTintColor: "white", // Change the color value to the desired color
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"

  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"

  },
  buttonContainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "white",
    margin:30
  },
  button: {
    backgroundColor:"#4E56CE",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  qrCodeItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#4E44CE",
    borderRadius: 5,

  },
  qrCodeText: {
    fontSize: 16,
    color:"white",
  },
});
