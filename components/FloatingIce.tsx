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

interface FloatingIceProps {
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

export const FloatingIce: React.FC<FloatingIceProps> = ({
  top,
  bottom,
  left,
  right,
  size = 42,
  duration = 3200,
  delay = 200,
  driftX = 12,
  driftY = 18,
  rotationDeg = 24,
}) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      translateY.value = withRepeat(
        withSequence(
          withTiming(-driftY, { duration: duration * 0.55, easing: Easing.inOut(Easing.quad) }),
          withTiming(driftY, { duration: duration * 0.45, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        true
      );

      translateX.value = withRepeat(
        withSequence(
          withTiming(driftX, { duration: duration * 0.65, easing: Easing.inOut(Easing.sin) }),
          withTiming(-driftX, { duration: duration * 0.65, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );

      rotation.value = withRepeat(
        withSequence(
          withTiming(rotationDeg, { duration: duration * 0.8, easing: Easing.inOut(Easing.sin) }),
          withTiming(-rotationDeg, { duration: duration * 0.8, easing: Easing.inOut(Easing.sin) })
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
      {/* 3D Crystal Ice Cube */}
      <View
        style={[
          styles.cube,
          {
            width: size,
            height: size,
            borderRadius: Math.max(6, size * 0.18),
          },
        ]}
      >
        {/* Top-left high specular glint */}
        <View style={styles.glintTop} />
        {/* Inner ice fracture line */}
        <View style={styles.fractureLine} />
        {/* Bottom soft refraction shadow */}
        <View style={styles.refractionBase} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 12,
    shadowColor: '#A7E8FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  cube: {
    backgroundColor: 'rgba(230, 245, 255, 0.35)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    overflow: 'hidden',
    position: 'relative',
  },
  glintTop: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: '45%',
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderTopLeftRadius: 5,
    transform: [{ rotate: '-15deg' }],
  },
  fractureLine: {
    position: 'absolute',
    top: '30%',
    left: '25%',
    width: '55%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    transform: [{ rotate: '38deg' }],
  },
  refractionBase: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '60%',
    height: '50%',
    backgroundColor: 'rgba(120, 200, 255, 0.22)',
    borderBottomRightRadius: 6,
  },
});
