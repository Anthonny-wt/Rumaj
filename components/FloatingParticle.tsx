import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface FloatingParticleProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  size?: number;
  duration?: number;
  delay?: number;
  color?: string;
}

export const FloatingParticle: React.FC<FloatingParticleProps> = ({
  top,
  bottom,
  left,
  right,
  size = 8,
  duration = 2400,
  delay = 0,
  color = '#FFAA33',
}) => {
  const opacity = useSharedValue(0.2);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.9, { duration: duration / 2, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.15, { duration: duration / 2, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );

      translateY.value = withRepeat(
        withSequence(
          withTiming(-16, { duration: duration * 0.6, easing: Easing.inOut(Easing.quad) }),
          withTiming(8, { duration: duration * 0.4, easing: Easing.inOut(Easing.quad) })
        ),
        -1,
        true
      );

      scale.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: duration / 2, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.7, { duration: duration / 2, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      );
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.particle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          top,
          bottom,
          left,
          right,
        },
        animatedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    zIndex: 9,
    shadowColor: '#FFAA33',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
});
