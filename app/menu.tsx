import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { HeaderBar } from '../components/HeaderBar';
import { OrderSummaryModal } from '../components/OrderSummaryModal';
import { PRODUCTS } from '../constants/products';
import { Product, ProductCategory } from '../types/product';
import { Colors } from '../constants/colors';

export default function MenuScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 860;

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [orderModalVisible, setOrderModalVisible] = useState<boolean>(false);

  // Animations for the hero stage
  const heroScale = useSharedValue(1);
  const heroOpacity = useSharedValue(1);
  const heroTranslateY = useSharedValue(0);

  // Floating gentle bounce for the hero
  useEffect(() => {
    heroTranslateY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
        withTiming(8, { duration: 2400, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
  }, []);

  // Animate hero whenever active product changes
  const triggerProductTransition = (prod: Product) => {
    setActiveProduct(prod);
    setQuantity(1);

    heroScale.value = withSequence(
      withTiming(0.88, { duration: 120 }),
      withSpring(1, { damping: 10, stiffness: 220 })
    );

    heroOpacity.value = withSequence(
      withTiming(0.4, { duration: 100 }),
      withTiming(1, { duration: 200 })
    );
  };

  const animatedHeroStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: heroTranslateY.value },
        { scale: heroScale.value },
      ],
      opacity: heroOpacity.value,
    };
  });

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(prev + 1, 20));
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'todos') return true;
    return p.category === selectedCategory;
  });

  const currentTotal = (activeProduct.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#18120E', '#0E0B09', '#0B0908']}
        style={StyleSheet.absoluteFill}
      />

      {isDesktop ? (
        /* VISTA DESKTOP WEB: APLICACIÓN WEB RESPONSIVA */
        <View style={styles.desktopWrapper}>
          {/* Top Web Navigation Bar */}
          <View style={styles.desktopHeader}>
            <View style={styles.desktopHeaderLeft}>
              <TouchableOpacity
                onPress={() => router.push('/')}
                style={styles.desktopBackBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
                <Text style={styles.desktopBackText}>Inicio</Text>
              </TouchableOpacity>

              <View style={styles.desktopHeaderBrand}>
                <Image
                  source={require('../assets/optimized/rumaj_logo.png')}
                  style={styles.desktopHeaderLogo}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.desktopHeaderTitle}>RUMAJ</Text>
                  <Text style={styles.desktopHeaderSub}>Carta de Jugos & Kekes Caseros</Text>
                </View>
              </View>
            </View>

            {/* Categorías en el header */}
            <View style={styles.desktopCategoriesRow}>
              <TouchableOpacity
                onPress={() => setSelectedCategory('todos')}
                style={[
                  styles.categoryChip,
                  selectedCategory === 'todos' && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === 'todos' && styles.categoryChipTextActive,
                  ]}
                >
                  Todos ({PRODUCTS.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory('jugos');
                  const firstJuice = PRODUCTS.find((p) => p.category === 'jugos');
                  if (firstJuice) triggerProductTransition(firstJuice);
                }}
                style={[
                  styles.categoryChip,
                  selectedCategory === 'jugos' && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === 'jugos' && styles.categoryChipTextActive,
                  ]}
                >
                  🍊 Jugos (S/ 3)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory('kekes');
                  const firstCake = PRODUCTS.find((p) => p.category === 'kekes');
                  if (firstCake) triggerProductTransition(firstCake);
                }}
                style={[
                  styles.categoryChip,
                  selectedCategory === 'kekes' && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === 'kekes' && styles.categoryChipTextActive,
                  ]}
                >
                  🥧 Kekes Caseros (S/ 2)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory('combos');
                  const firstCombo = PRODUCTS.find((p) => p.category === 'combos');
                  if (firstCombo) triggerProductTransition(firstCombo);
                }}
                style={[
                  styles.categoryChip,
                  selectedCategory === 'combos' && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === 'combos' && styles.categoryChipTextActive,
                  ]}
                >
                  ✨ Combos (S/ 5)
                </Text>
              </TouchableOpacity>
            </View>

            {/* Right Action: Cart */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setOrderModalVisible(true)}
              style={styles.desktopCartPill}
            >
              <Ionicons name="bag-check" size={18} color="#D76817" />
              <Text style={styles.desktopCartPillText}>
                Ordenar · S/ {currentTotal}
              </Text>
              <View style={styles.desktopCartBadge}>
                <Text style={styles.desktopCartBadgeText}>{quantity}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Web Main Scrollable Body */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.desktopScrollContent}
          >
            {/* Seccion Principal en 2 Columnas: Escaparate + Consola de Pedido */}
            <View style={styles.desktopMainGrid}>
              {/* Columna Izquierda: Escaparate del Producto Protagonista */}
              <View style={styles.desktopProductStageCol}>
                <View style={styles.desktopHeroStage}>
                  <View style={styles.desktopAmbientGlow} pointerEvents="none" />

                  <Animated.View style={[styles.heroAnimatedBox, animatedHeroStyle]}>
                    <Image
                      source={activeProduct.localImage}
                      style={styles.desktopHeroImg}
                      resizeMode="contain"
                    />
                  </Animated.View>

                  <View style={styles.floatingStageTag}>
                    <Ionicons name="sparkles" size={13} color="#FFA000" />
                    <Text style={styles.floatingStageTagText}>
                      {activeProduct.freshnessNote}
                    </Text>
                  </View>
                </View>

                {/* Miniaturas de selección rápida */}
                <View style={styles.desktopThumbGallery}>
                  <Text style={styles.thumbGalleryTitle}>
                    Selecciona para personalizar:
                  </Text>
                  <View style={styles.desktopThumbRow}>
                    {PRODUCTS.map((prod) => {
                      const isSelected = prod.id === activeProduct.id;
                      return (
                        <TouchableOpacity
                          key={prod.id}
                          onPress={() => triggerProductTransition(prod)}
                          activeOpacity={0.75}
                          style={[
                            styles.desktopThumbCard,
                            isSelected && styles.desktopThumbCardActive,
                          ]}
                        >
                          <Image
                            source={prod.squareImage || prod.localImage}
                            style={styles.desktopThumbImg}
                            resizeMode="contain"
                          />
                          <Text
                            style={[
                              styles.desktopThumbName,
                              isSelected && styles.desktopThumbNameActive,
                            ]}
                            numberOfLines={1}
                          >
                            {prod.name}
                          </Text>
                          <Text style={styles.desktopThumbPrice}>
                            S/ {prod.price.toFixed(2)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>

              {/* Columna Derecha: Tarjeta Blanca de Detalles & Orden */}
              <View style={styles.desktopOrderCard}>
                <View style={styles.desktopOrderHeaderRow}>
                  <View style={styles.statusPill}>
                    <Text style={styles.statusPillText}>
                      {activeProduct.badge}
                    </Text>
                  </View>
                  <Text style={styles.desktopBigPrice}>
                    S/ {activeProduct.price.toFixed(2)}
                  </Text>
                </View>

                <Text style={styles.desktopProductTitle}>
                  {activeProduct.name}
                </Text>
                <Text style={styles.desktopProductSub}>
                  {activeProduct.subtitle} · {activeProduct.unit}
                </Text>

                {/* Banner de servicio en mesa */}
                <View style={styles.desktopMesaBanner}>
                  <Ionicons name="restaurant" size={16} color="#C2410C" />
                  <Text style={styles.desktopMesaBannerText}>
                    🍽️ Servicio en mesa (Atención directa)
                  </Text>
                </View>

                {/* Si es keke, selector de sabor */}
                {activeProduct.category === 'kekes' && (
                  <View style={styles.desktopFlavorSection}>
                    <Text style={styles.desktopFlavorHeading}>
                      Elige el sabor casero:
                    </Text>
                    <View style={styles.desktopFlavorPillRow}>
                      {PRODUCTS.filter((p) => p.category === 'kekes').map((keke) => {
                        const isActive = activeProduct.id === keke.id;
                        return (
                          <TouchableOpacity
                            key={keke.id}
                            onPress={() => triggerProductTransition(keke)}
                            style={[
                              styles.flavorPill,
                              isActive && styles.flavorPillActive,
                            ]}
                          >
                            <Text
                              style={[
                                styles.flavorPillText,
                                isActive && styles.flavorPillTextActive,
                              ]}
                            >
                              {keke.id === 'keke-naranja'
                                ? '🍊 Keke Naranja'
                                : '🥕 Keke Zanahoria'}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}

                {/* Selector de cantidad y tiempo de entrega */}
                <View style={styles.desktopQtyRow}>
                  <View>
                    <Text style={styles.desktopQtyLabel}>Cantidad:</Text>
                    <View style={styles.stepperContainer}>
                      <TouchableOpacity
                        onPress={handleDecrease}
                        style={styles.stepBtn}
                        activeOpacity={0.6}
                      >
                        <Ionicons name="remove" size={18} color={Colors.textDark} />
                      </TouchableOpacity>
                      <Text style={styles.stepCount}>{quantity}</Text>
                      <TouchableOpacity
                        onPress={handleIncrease}
                        style={[styles.stepBtn, styles.stepBtnAdd]}
                        activeOpacity={0.6}
                      >
                        <Ionicons name="add" size={18} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.timePill}>
                    <Ionicons
                      name="time-outline"
                      size={15}
                      color={Colors.textDarkSecondary}
                    />
                    <Text style={styles.timePillText}>
                      {activeProduct.prepTime}
                    </Text>
                  </View>
                </View>

                {/* Desglose de precio */}
                <View style={styles.desktopBreakdownBox}>
                  <View style={styles.desktopBreakdownRow}>
                    <Text style={styles.desktopBreakdownLabel}>
                      Subtotal ({quantity} {quantity === 1 ? 'item' : 'items'}):
                    </Text>
                    <Text style={styles.desktopBreakdownVal}>
                      S/ {(activeProduct.price * quantity).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.desktopBreakdownRow}>
                    <Text style={styles.desktopBreakdownLabel}>
                      Atención en mesa:
                    </Text>
                    <Text style={[styles.desktopBreakdownVal, { color: '#16A34A' }]}>
                      Gratis
                    </Text>
                  </View>
                  <View style={styles.desktopDivider} />
                  <View style={styles.desktopBreakdownRow}>
                    <Text style={styles.desktopTotalLabel}>Total a pagar:</Text>
                    <Text style={styles.desktopTotalVal}>S/ {currentTotal}</Text>
                  </View>
                </View>

                {/* Botón de ordenar */}
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={() => setOrderModalVisible(true)}
                  style={styles.desktopOrderActionBtn}
                >
                  <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                  <Text style={styles.desktopOrderActionBtnText}>
                    Confirmar Pedido · S/ {currentTotal} →
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Catálogo Completo en Tarjetas Web */}
            <View style={styles.desktopCatalogSection}>
              <Text style={styles.desktopCatalogTitle}>
                Nuestra Carta Completa
              </Text>
              <View style={styles.desktopCatalogGrid}>
                {filteredProducts.map((prod) => (
                  <TouchableOpacity
                    key={prod.id}
                    activeOpacity={0.85}
                    onPress={() => triggerProductTransition(prod)}
                    style={[
                      styles.catalogCard,
                      prod.id === activeProduct.id && styles.catalogCardActive,
                    ]}
                  >
                    <Image
                      source={prod.squareImage || prod.localImage}
                      style={styles.catalogCardImg}
                      resizeMode="contain"
                    />
                    <View style={styles.catalogCardBody}>
                      <Text style={styles.catalogCardBadge}>{prod.badge}</Text>
                      <Text style={styles.catalogCardName}>{prod.name}</Text>
                      <Text style={styles.catalogCardUnit}>{prod.unit}</Text>
                      <View style={styles.catalogCardFooter}>
                        <Text style={styles.catalogCardPrice}>
                          S/ {prod.price.toFixed(2)}
                        </Text>
                        <View style={styles.catalogCardSelectBtn}>
                          <Text style={styles.catalogCardSelectBtnText}>
                            {prod.id === activeProduct.id ? 'Seleccionado' : 'Elegir'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        /* VISTA MÓVIL (Smartphones y pantallas pequeñas) */
        <View style={styles.mobileWrapper}>
          {/* Top Header Bar */}
          <HeaderBar
            title="Rumaj"
            subtitle="Barra de Jugos & Kekes"
            cartCount={quantity}
            isFavorite={isFavorite}
            onToggleFavorite={() => setIsFavorite(!isFavorite)}
            onOpenCart={() => setOrderModalVisible(true)}
          />

          {/* Category Tabs Strip */}
          <View style={styles.categoriesContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              <TouchableOpacity
                onPress={() => setSelectedCategory('todos')}
                style={[
                  styles.categoryChip,
                  selectedCategory === 'todos' && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === 'todos' && styles.categoryChipTextActive,
                  ]}
                >
                  Todos ({PRODUCTS.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory('jugos');
                  const firstJuice = PRODUCTS.find((p) => p.category === 'jugos');
                  if (firstJuice) triggerProductTransition(firstJuice);
                }}
                style={[
                  styles.categoryChip,
                  selectedCategory === 'jugos' && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === 'jugos' && styles.categoryChipTextActive,
                  ]}
                >
                  🍊 Jugo de Naranja (S/ 3)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory('kekes');
                  const firstCake = PRODUCTS.find((p) => p.category === 'kekes');
                  if (firstCake) triggerProductTransition(firstCake);
                }}
                style={[
                  styles.categoryChip,
                  selectedCategory === 'kekes' && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === 'kekes' && styles.categoryChipTextActive,
                  ]}
                >
                  🥧 Kekes Caseros (S/ 2)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedCategory('combos');
                  const firstCombo = PRODUCTS.find((p) => p.category === 'combos');
                  if (firstCombo) triggerProductTransition(firstCombo);
                }}
                style={[
                  styles.categoryChip,
                  selectedCategory === 'combos' && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === 'combos' && styles.categoryChipTextActive,
                  ]}
                >
                  ✨ Combo (S/ 5)
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* PARTE SUPERIOR (HERO MÓVIL) */}
          <View style={styles.heroStage}>
            <View style={styles.ambientGlow} pointerEvents="none" />

            <Animated.View style={[styles.heroAnimatedBox, animatedHeroStyle]}>
              <Image
                source={activeProduct.localImage}
                style={styles.heroImage}
                resizeMode="contain"
              />
            </Animated.View>

            <View style={styles.floatingStageTag}>
              <Ionicons name="sparkles" size={12} color="#FFA000" />
              <Text style={styles.floatingStageTagText}>
                {activeProduct.freshnessNote}
              </Text>
            </View>
          </View>

          {/* PARTE INFERIOR: TARJETA BLANCA MÓVIL */}
          <View style={styles.bottomCard}>
            <View style={styles.dragHandle} />

            <View style={styles.productHeaderRow}>
              <View style={styles.circularThumbnailContainer}>
                <Image
                  source={activeProduct.squareImage || activeProduct.localImage}
                  style={styles.circularImage}
                  resizeMode="contain"
                />
                <View style={styles.categoryMiniBadge}>
                  <Text style={styles.categoryMiniBadgeText}>
                    {activeProduct.category === 'jugos'
                      ? '🍊'
                      : activeProduct.category === 'kekes'
                      ? '🥧'
                      : '✨'}
                  </Text>
                </View>
              </View>

              <View style={styles.productDetailsCol}>
                <View style={styles.topStatusRow}>
                  <View style={styles.statusPill}>
                    <Text style={styles.statusPillText}>
                      {activeProduct.badge}
                    </Text>
                  </View>
                  <Text style={styles.pricePerUnit}>
                    S/ {activeProduct.price.toFixed(2)}
                  </Text>
                </View>

                <Text style={styles.productTitle} numberOfLines={1}>
                  {activeProduct.name}
                </Text>
                <Text style={styles.productSubtitle} numberOfLines={2}>
                  {activeProduct.subtitle}
                </Text>
              </View>
            </View>

            {activeProduct.category === 'kekes' && (
              <View style={styles.kekeFlavorRow}>
                <Text style={styles.kekeFlavorLabel}>Sabor casero (S/ 2.00):</Text>
                <View style={styles.kekeFlavorPills}>
                  {PRODUCTS.filter((p) => p.category === 'kekes').map((keke) => {
                    const isActive = activeProduct.id === keke.id;
                    return (
                      <TouchableOpacity
                        key={keke.id}
                        onPress={() => triggerProductTransition(keke)}
                        style={[
                          styles.flavorPill,
                          isActive && styles.flavorPillActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.flavorPillText,
                            isActive && styles.flavorPillTextActive,
                          ]}
                        >
                          {keke.id === 'keke-naranja' ? '🍊 Naranja' : '🥕 Zanahoria'}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            <View style={styles.interactiveRow}>
              <View style={styles.thumbnailsColumn}>
                <Text style={styles.sectionMiniLabel}>Otras opciones:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.thumbnailsScroll}
                >
                  {PRODUCTS.map((prod) => {
                    const isSelected = prod.id === activeProduct.id;
                    return (
                      <TouchableOpacity
                        key={prod.id}
                        onPress={() => triggerProductTransition(prod)}
                        activeOpacity={0.7}
                        style={[
                          styles.selectableThumb,
                          isSelected && styles.selectableThumbActive,
                        ]}
                      >
                        <Image
                          source={prod.squareImage || prod.localImage}
                          style={styles.selectableThumbImg}
                          resizeMode="contain"
                        />
                        {isSelected && (
                          <View style={styles.activeCheckDot}>
                            <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              <View style={styles.controlsColumn}>
                <View style={styles.timePill}>
                  <Ionicons
                    name="time-outline"
                    size={13}
                    color={Colors.textDarkSecondary}
                  />
                  <Text style={styles.timePillText}>{activeProduct.prepTime}</Text>
                </View>

                <View style={styles.stepperContainer}>
                  <TouchableOpacity
                    onPress={handleDecrease}
                    style={styles.stepBtn}
                    activeOpacity={0.6}
                  >
                    <Ionicons name="remove" size={16} color={Colors.textDark} />
                  </TouchableOpacity>
                  <Text style={styles.stepCount}>{quantity}</Text>
                  <TouchableOpacity
                    onPress={handleIncrease}
                    style={[styles.stepBtn, styles.stepBtnAdd]}
                    activeOpacity={0.6}
                  >
                    <Ionicons name="add" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={() => setOrderModalVisible(true)}
              style={styles.mainOrderButton}
            >
              <View style={styles.orderBtnLeft}>
                <View style={styles.orderIconCircle}>
                  <Ionicons name="bag-check" size={18} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.orderBtnLabel}>
                    Pedir · {quantity} {quantity === 1 ? 'item' : 'items'}
                  </Text>
                  <Text style={styles.orderBtnSubtitle}>
                    Preparación artesanal en vivo
                  </Text>
                </View>
              </View>
              <View style={styles.orderBtnRight}>
                <Text style={styles.orderBtnPrice}>S/ {currentTotal}</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Modal de Pedido (Adaptado) */}
      <OrderSummaryModal
        visible={orderModalVisible}
        onClose={() => setOrderModalVisible(false)}
        product={activeProduct}
        quantity={quantity}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  mobileWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },

  // ESTILOS DESKTOP WEB
  desktopWrapper: {
    flex: 1,
  },
  desktopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 36,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#120E0C',
    zIndex: 40,
  },
  desktopHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  desktopBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  desktopBackText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  desktopHeaderBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  desktopHeaderLogo: {
    width: 40,
    height: 40,
  },
  desktopHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  desktopHeaderSub: {
    color: '#F28533',
    fontSize: 11,
    fontWeight: '700',
  },
  desktopCategoriesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  desktopCartPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFF7ED',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FED7AA',
  },
  desktopCartPillText: {
    color: '#C2410C',
    fontSize: 14,
    fontWeight: '800',
  },
  desktopCartBadge: {
    backgroundColor: '#C2410C',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  desktopCartBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  desktopScrollContent: {
    paddingVertical: 32,
    paddingHorizontal: 36,
    maxWidth: 1300,
    width: '100%',
    alignSelf: 'center',
  },
  desktopMainGrid: {
    flexDirection: 'row',
    gap: 32,
    alignItems: 'flex-start',
    marginBottom: 48,
  },
  desktopProductStageCol: {
    flex: 1.1,
    backgroundColor: '#15110E',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  desktopHeroStage: {
    height: 380,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  desktopAmbientGlow: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(242, 133, 51, 0.2)',
    // @ts-ignore
    filter: 'blur(70px)',
  },
  desktopHeroImg: {
    width: '100%',
    height: '100%',
    maxHeight: 340,
    // @ts-ignore
    filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 50px rgba(245, 158, 11, 0.35))',
  },
  desktopThumbGallery: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 16,
  },
  thumbGalleryTitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  desktopThumbRow: {
    flexDirection: 'row',
    gap: 12,
  },
  desktopThumbCard: {
    flex: 1,
    backgroundColor: '#1E1916',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  desktopThumbCardActive: {
    borderColor: '#F28533',
    backgroundColor: '#261F1A',
  },
  desktopThumbImg: {
    width: 52,
    height: 52,
    marginBottom: 6,
  },
  desktopThumbName: {
    color: '#E5DFD9',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  desktopThumbNameActive: {
    color: '#FFA000',
  },
  desktopThumbPrice: {
    color: '#D76817',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },

  // Tarjeta de Pedido en Desktop
  desktopOrderCard: {
    flex: 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    // @ts-ignore
    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.3)',
  },
  desktopOrderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  desktopBigPrice: {
    fontSize: 28,
    fontWeight: '900',
    color: '#C2410C',
  },
  desktopProductTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textDark,
    marginBottom: 4,
  },
  desktopProductSub: {
    fontSize: 13,
    color: Colors.textDarkSecondary,
    marginBottom: 16,
  },
  desktopMesaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 18,
  },
  desktopMesaBannerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#A84B06',
  },
  desktopFlavorSection: {
    marginBottom: 16,
  },
  desktopFlavorHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textDark,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  desktopFlavorPillRow: {
    flexDirection: 'row',
    gap: 10,
  },
  desktopQtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF7F4',
    padding: 14,
    borderRadius: 18,
    marginBottom: 20,
  },
  desktopQtyLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textDarkSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  desktopBreakdownBox: {
    backgroundColor: '#FAF7F4',
    padding: 16,
    borderRadius: 18,
    marginBottom: 20,
  },
  desktopBreakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  desktopBreakdownLabel: {
    fontSize: 13,
    color: Colors.textDarkSecondary,
  },
  desktopBreakdownVal: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textDark,
  },
  desktopDivider: {
    height: 1,
    backgroundColor: '#EBE5DF',
    marginVertical: 8,
  },
  desktopTotalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textDark,
  },
  desktopTotalVal: {
    fontSize: 20,
    fontWeight: '900',
    color: '#C2410C',
  },
  desktopOrderActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1E1A17',
    paddingVertical: 18,
    borderRadius: 20,
    // @ts-ignore
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
  },
  desktopOrderActionBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  // Catalogo en Grid Web
  desktopCatalogSection: {
    marginTop: 8,
  },
  desktopCatalogTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 20,
  },
  desktopCatalogGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  catalogCard: {
    flex: 1,
    backgroundColor: '#15110E',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  catalogCardActive: {
    borderColor: '#F28533',
    backgroundColor: '#1C1613',
  },
  catalogCardImg: {
    width: '100%',
    height: 120,
    marginBottom: 12,
  },
  catalogCardBody: {},
  catalogCardBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#F28533',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  catalogCardName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 2,
  },
  catalogCardUnit: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    marginBottom: 12,
  },
  catalogCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 10,
  },
  catalogCardPrice: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
  catalogCardSelectBtn: {
    backgroundColor: 'rgba(242, 133, 51, 0.15)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  catalogCardSelectBtnText: {
    color: '#FFA000',
    fontSize: 11,
    fontWeight: '700',
  },

  // ESTILOS MÓVIL
  categoriesContainer: {
    paddingVertical: 6,
    zIndex: 25,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  categoryChipActive: {
    backgroundColor: '#F28533',
    borderColor: '#F28533',
  },
  categoryChipText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  heroStage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 280,
    maxHeight: 400,
    width: '100%',
    zIndex: 10,
    paddingTop: 4,
    paddingBottom: 16,
  },
  ambientGlow: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: 'rgba(242, 133, 51, 0.16)',
    // @ts-ignore
    filter: 'blur(75px)',
  },
  heroAnimatedBox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    maxHeight: 360,
    // @ts-ignore
    filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 50px rgba(245, 158, 11, 0.35))',
  },
  floatingStageTag: {
    position: 'absolute',
    bottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 14, 11, 0.88)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(242, 133, 51, 0.35)',
    gap: 6,
    zIndex: 20,
  },
  floatingStageTagText: {
    color: '#FFE2CC',
    fontSize: 11,
    fontWeight: '700',
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 16,
    zIndex: 30,
  },
  dragHandle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5DFD9',
    alignSelf: 'center',
    marginBottom: 14,
  },
  productHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  circularThumbnailContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FAF5EE',
    borderWidth: 2,
    borderColor: '#E87A24',
    padding: 4,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  circularImage: {
    width: '100%',
    height: '100%',
  },
  categoryMiniBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0ECE8',
  },
  categoryMiniBadgeText: {
    fontSize: 10,
  },
  productDetailsCol: {
    flex: 1,
  },
  topStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statusPill: {
    backgroundColor: '#FFF4EC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE0C8',
  },
  statusPillText: {
    color: '#D76817',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  pricePerUnit: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.textDark,
  },
  productTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textDark,
    letterSpacing: -0.2,
  },
  productSubtitle: {
    fontSize: 11,
    color: Colors.textDarkSecondary,
    marginTop: 2,
  },
  kekeFlavorRow: {
    marginBottom: 12,
    backgroundColor: '#FAF7F4',
    padding: 10,
    borderRadius: 14,
  },
  kekeFlavorLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textDark,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  kekeFlavorPills: {
    flexDirection: 'row',
    gap: 8,
  },
  flavorPill: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F3EFEA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  flavorPillActive: {
    backgroundColor: '#1E1A17',
    borderColor: '#1E1A17',
  },
  flavorPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textDarkSecondary,
  },
  flavorPillTextActive: {
    color: '#FFFFFF',
  },
  interactiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF7F4',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 14,
    gap: 12,
  },
  thumbnailsColumn: {
    flex: 1,
  },
  sectionMiniLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textDarkSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  thumbnailsScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectableThumb: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8E2DC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 2,
  },
  selectableThumbActive: {
    borderColor: '#E87A24',
    borderWidth: 2,
  },
  selectableThumbImg: {
    width: '100%',
    height: '100%',
  },
  activeCheckDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#E87A24',
    borderRadius: 7,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsColumn: {
    alignItems: 'flex-end',
    gap: 6,
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEAE4',
  },
  timePillText: {
    fontSize: 11,
    color: Colors.textDarkSecondary,
    fontWeight: '600',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBE5DF',
    padding: 3,
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: '#F3EFEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnAdd: {
    backgroundColor: '#1E1A17',
  },
  stepCount: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textDark,
    paddingHorizontal: 12,
  },
  mainOrderButton: {
    backgroundColor: '#1C1815',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 8,
  },
  orderBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  orderIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D76817',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBtnLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  orderBtnSubtitle: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 11,
    marginTop: 1,
  },
  orderBtnRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orderBtnPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
});
