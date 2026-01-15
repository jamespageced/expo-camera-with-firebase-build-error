import React, { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useScanStore } from '@app/stores';
import { navScreens } from '@app/utils';
import type { ScanStore, StackParamsList } from '@app/types';

export default function App(): ReactComponent {
  //===========================================================================
  //================================ variables ================================
  //===========================================================================
  const isFocused = useIsFocused();
  const navigation: any = useNavigation<StackNavigationProp<StackParamsList>>();
  const refReturnFromScanScreen = useRef<Boolean>(false);
  const { globalScanResults, clearGlobalScanResults } = useScanStore((store: ScanStore) => store);
  const [scanResults, setScanResults] = useState<string>('');

  //===========================================================================
  //================================ functions ================================
  //===========================================================================
  const handleTapToScanBtn = () => {
    refReturnFromScanScreen.current = true;
    navigation.navigate(navScreens.scan.route);
  };

  //===========================================================================
  //================================== setup ==================================
  //===========================================================================
  useEffect(() => {
    // update scan results
    if (!isFocused || !refReturnFromScanScreen.current) return;
    refReturnFromScanScreen.current = false;
    const results = globalScanResults;
    setScanResults(results);
    clearGlobalScanResults();
  }, [isFocused, globalScanResults]);

  //===========================================================================
  //================================== render =================================
  //===========================================================================
  return (
    <View style={styles.container}>
      <Pressable style={styles.btnTapToScan} onPress={handleTapToScanBtn}>
        <Text style={styles.btnTapToScanTxt}>TAP&nbsp;TO&nbsp;SCAN</Text>
      </Pressable>
      <Text style={styles.textTitle}>SCAN&nbsp;RESULTS</Text>
      <Text style={!!scanResults ? styles.textScanResultsFound : styles.textScanResultsNotFound}>
        {!scanResults ? 'No Results Yet' : scanResults}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

//===========================================================================
//================================== style ==================================
//===========================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  btnTapToScan: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 80,
    padding: 16,
    backgroundColor: '#2370B3',
    borderColor: '#2370B3',
    borderWidth: 1
  },
  btnTapToScanTxt: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
    fontWeight: 'normal',
    letterSpacing: 0.4,
    color: '#ffffff'
  },
  textTitle: {
    marginBottom: 20,
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
    fontWeight: 'normal',
    color: '#000000',
    textDecorationLine: 'underline'
  },
  textScanResultsFound: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
    fontWeight: 'normal',
    color: '#ff0000'
  },
  textScanResultsNotFound: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
    fontWeight: 'normal',
    color: '#000000'
  }
});
