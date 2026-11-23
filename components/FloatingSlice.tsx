import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface FloatingSliceProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  size?: number;
  duration?: number;
  delay?: number;
  driftX?: number;
  driftY?: number;
  rotationDeg?: number;
}

export const FloatingSlice: React.FC<FloatingSliceProps> = ({
  top,
  bottom,
  left,
  right,
  size = 64,
  duration = 3800,
  delay = 0,
  driftX = 14,
  driftY = 22,
  rotationDeg = 35,
}) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-driftY, { duration: duration / 2, easing: Easing.inOut(Easing.quad) }),
          withTiming(driftY, { duration: duration / 2, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        true
      );

      translateX.value = withRepeat(
        withSequence(
          withTiming(driftX, { duration: duration * 0.7, easing: Easing.inOut(Easing.sin) }),
          withTiming(-driftX, { duration: duration * 0.7, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );

      rotation.value = withRepeat(
        withSequence(
          withTiming(rotationDeg, { duration: duration * 0.9, easing: Easing.inOut(Easing.sin) }),
          withTiming(-rotationDeg, { duration: duration * 0.9, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        {
          width: size,
          height: size,
          top,
          bottom,
          left,
          right,
        },
        animatedStyle,
      ]}
    >
      {/* Handcrafted Stylized Orange Slice Graphic */}
      <View style={[styles.outerRind, { width: size, height: size, borderRadius: size / 2 }]}>
        <View style={[styles.pith, { width: size * 0.88, height: size * 0.88, borderRadius: size / 2 }]}>
          <View style={[styles.pulp, { width: size * 0.76, height: size * 0.76, borderRadius: size / 2 }]}>
            {/* Center wheel segments */}
            <View style={styles.segmentH} />
            <View style={styles.segmentV} />
            <View style={[styles.segmentH, { transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.segmentH, { transform: [{ rotate: '-45deg' }] }]} />
            <View style={[styles.innerCore, { width: size * 0.2, height: size * 0.2, borderRadius: size * 0.1 }]} />
          </View>
        </View>
        {/* Gloss highlight */}
        <View style={[styles.specularShine, { width: size * 0.4, height: size * 0.2 }]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#F28533',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  outerRind: {
    backgroundColor: '#FF6D00',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFA000',
    overflow: 'hidden',
  },
  pith: {
    backgroundColor: '#FFF8E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulp: {
    backgroundColor: '#FF9100',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  segmentH: {
    position: 'absolute',
    width: '100%',
    height: 1.5,
    backgroundColor: '#FFF8E1',
    opacity: 0.9,
  },
  segmentV: {
    position: 'absolute',
    height: '100%',
    width: 1.5,
    backgroundColor: '#FFF8E1',
    opacity: 0.9,
  },
  innerCore: {
    backgroundColor: '#FFF8E1',
  },
  specularShine: {
    position: 'absolute',
    top: 3,
    left: '20%',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 8,
    transform: [{ rotate: '-25deg' }],
  },
});
