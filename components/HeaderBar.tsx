import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../constants/colors';

interface HeaderBarProps {
  title?: string;
  subtitle?: string;
  cartCount?: number;
  onOpenCart?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  showBack?: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title = 'Rumaj',
  subtitle = 'JUGOS & KEKES CASEROS',
  cartCount = 0,
  onOpenCart,
  isFavorite = false,
  onToggleFavorite,
  showBack = true,
}) => {
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      {showBack ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBack}
          style={styles.circleButton}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.textLight} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      {/* Brand Center */}
      <View style={styles.centerContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.brandTitle}>{title}</Text>
          <View style={styles.orangeDot} />
        </View>
        <Text style={styles.brandSubtitle}>{subtitle}</Text>
      </View>

      {/* Right Actions */}
      <View style={styles.actionsRow}>
        {onToggleFavorite && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onToggleFavorite}
            style={[styles.circleButton, styles.marginRight]}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={18}
              color={isFavorite ? '#FF4D4D' : Colors.textLight}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onOpenCart}
          style={[styles.circleButton, cartCount > 0 && styles.activeCartButton]}
        >
          <Ionicons
            name="cart-outline"
            size={18}
            color={cartCount > 0 ? Colors.primary : Colors.textLight}
          />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: 10,
    zIndex: 30,
  },
  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeCartButton: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(242, 133, 51, 0.18)',
  },
  placeholder: {
    width: 42,
  },
  centerContainer: {
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  orangeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginLeft: 4,
  },
  brandSubtitle: {
    color: Colors.primary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.primary,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
});
