import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { Canvas, DiffRect, rect, rrect } from '@shopify/react-native-skia';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const innerDimension = 300;

const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(
  rect(width / 2 - innerDimension / 2, height / 2 - innerDimension / 2, innerDimension, innerDimension),
  50,
  50
);

interface Props {
  handleBackBtn: () => Promise<void>;
}

export default function Overlay({ handleBackBtn }: Props): ReactComponent {
  return (
    <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 5 }}>
      <Pressable
        style={{
          position: 'absolute',
          top: 30,
          left: 20,
          paddingHorizontal: 16,
          paddingVertical: 4,
          borderWidth: 2,
          borderRadius: 8,
          borderColor: '#ffffff',
          backgroundColor: 'transparent',
          zIndex: 15
        }}
        onPress={handleBackBtn}
      >
        <MaterialCommunityIcons name="keyboard-backspace" size={32} color="#ffffff" />
      </Pressable>
      <Canvas style={{ ...StyleSheet.absoluteFillObject, zIndex: 10 }}>
        <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
      </Canvas>
    </View>
  );
}
