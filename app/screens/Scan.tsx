import React, { useEffect, useRef } from 'react';
import { AppState, SafeAreaView, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { useScanStore } from '@app/stores';
import { Overlay } from './scanChildren';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { ScanStore, StackParamsList } from '@app/types';

export default function Scan(): ReactComponent {
  // variables
  const navigation: any = useNavigation<StackNavigationProp<StackParamsList>>();
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [permission, getCameraPermissionsAsync, requestPermission] = useCameraPermissions();
  const { globalScanResults, setGlobalScanResults } = useScanStore((store: ScanStore) => store);

  // functions
  const setupCamera = async () => {
    try {
      const { granted: cameraAccessGranted } = await getCameraPermissionsAsync();
      if (cameraAccessGranted) return;
      const requestPermissionsResponse = await requestPermission(); // if prompt is cancelled, will skip to catch error
      if (!requestPermissionsResponse.granted) navigation.goBack();
    } catch (error: any) {
      navigation.goBack();
    }
  };

  // setup
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });
    setupCamera();
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!globalScanResults) return;
    navigation.goBack();
  }, [globalScanResults]);

  // render
  return permission === null || !permission.granted ? (
    <></>
  ) : (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current && !globalScanResults) {
            qrLock.current = true;
            setTimeout(async () => {
              setGlobalScanResults(data);
            }, 500);
          }
        }}
      />
      <Overlay handleBackBtn={() => navigation.goBack()} />
    </SafeAreaView>
  );
}
