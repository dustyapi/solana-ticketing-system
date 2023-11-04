import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { updateVisitedField, checkIfStringExists } from "./handleValidation";
const QRCodeScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrCodeData, setQRCodeData] = useState("");
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setQRCodeData(data);
    const { exists, hash, mint, visited, name } = await checkIfStringExists(
      data
    );
    if (exists) {
      if (data === hash) {
        console.log(visited);
        if (!visited) {
          //valid unused ticket
          setScanResult(`Welcome, ${name}! ✅`);
          await updateVisitedField(hash, mint);
        } else {
          //valid but talready used
          setScanResult("Duplicate ticket, can't let you in ❌");
        }
      } else {
        //not valid
        setScanResult("Invalid ticket");
      }
    } else {
      //not a valid input or table empty or database not being accessed
      setScanResult("Not a valid QR code");
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setQRCodeData("");
    setScanResult("");
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {!scanned ? (
          <View style={styles.scannerContainer}>
  <BarCodeScanner
    style={[StyleSheet.absoluteFillObject, styles.scanner]}
    onBarCodeScanned={handleBarCodeScanned}
  />
  <TouchableOpacity
    style={styles.scanAgainButton}
    onPress={handleScanAgain}
  >
    <Text style={styles.buttonText}>Tap to Scan Again</Text>
  </TouchableOpacity>
</View>

        ) : (
          <View style={styles.qrDataContainer}>
            {/* <Text style={styles.qrDataText}>Scanned QR Data:</Text>
          <Text style={styles.qrData}>{qrCodeData}</Text> */}
            <Button title="Scan Again" onPress={handleScanAgain} />
          </View>
        )}
      </View>
      <Text style={styles.scanResultText}>{scanResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 250,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 250, // Match the dimensions of the outer container
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#4E56CE',
  },

  scannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  qrDataContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    elevation: 10, // Add elevation to create a drop shadow effect
  },
  qrDataText: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
    
  },
  qrData: {
    fontSize: 16,
    marginBottom: 20,
    color: "white",
  },
  scanResultText: {
    fontSize: 13,
    marginBottom: 20,
    color: "white",
  },
  buttonText: {
    fontSize: 16,
    color: "white",

  },
});

export default QRCodeScanner;
