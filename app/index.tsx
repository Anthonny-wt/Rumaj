import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Platform,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { animate } from 'animejs';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 860;

  // Animation Refs for anime.js
  const glassRef = useRef<any>(null);
  const iceTopLeftRef = useRef<any>(null);
  const iceMidLeftRef = useRef<any>(null);
  const iceBottomRef = useRef<any>(null);
  const umbrellaWhiteRef = useRef<any>(null);
  const umbrellaBlueRef = useRef<any>(null);
  const wedgeTopRightRef = useRef<any>(null);
  const wedgeBottomLeftRef = useRef<any>(null);
  const sphereTopRef = useRef<any>(null);
  const sphereMidRightRef = useRef<any>(null);
  const sphereMidLeftRef = useRef<any>(null);
  const sphereBottomRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  const logoRef = useRef<any>(null);

  // Fallback state for non-web environments
  const [glassTransform, setGlassTransform] = useState({ y: 0, rotate: 0, scale: 1.18 });
  const [buttonScale, setButtonScale] = useState(1);

  useEffect(() => {
    // 1. ANIME.JS: Vaso protagonista con efecto 3D Pop-Out (Sobresaliendo hacia el frente en Z)
    if (Platform.OS === 'web' && glassRef.current) {
      animate(glassRef.current, {
        translateY: [-12, 12],
        translateZ: [30, 85],
        rotateX: [-3.5, 3.5],
        rotateY: [-4.5, 4.5],
        scale: [1.14, 1.25], // El vaso sobresale con gran tamaño hacia el usuario en 3D
        duration: 3300,
        ease: 'inOutSine',
        loop: true,
        alternate: true,
      });

      // Sombrilla blanca floral superior derecha
      if (umbrellaWhiteRef.current) {
        animate(umbrellaWhiteRef.current, {
          translateY: [-12, 12],
          rotate: [-6, 12],
          duration: 3800,
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        });
      }

      // Sombrilla azul en primer plano sobre el vaso
      if (umbrellaBlueRef.current) {
        animate(umbrellaBlueRef.current, {
          translateY: [10, -10],
          rotate: [12, -10],
          scale: [1.02, 1.09],
          duration: 3900,
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        });
      }

      // Cubo de hielo superior izquierdo
      if (iceTopLeftRef.current) {
        animate(iceTopLeftRef.current, {
          translateY: [-14, 14],
          translateX: [-6, 6],
          rotate: [-14, 18],
          duration: 3400,
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        });
      }

      // Cubo de hielo medio izquierdo
      if (iceMidLeftRef.current) {
        animate(iceMidLeftRef.current, {
          translateY: [12, -12],
          rotate: [15, -14],
          duration: 3600,
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        });
      }

      // Cubo de hielo inferior bajo el vaso
      if (iceBottomRef.current) {
        animate(iceBottomRef.current, {
          translateY: [-10, 10],
          rotate: [-10, 14],
          duration: 3100,
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        });
      }

      // Gajo de mandarina superior derecho
      if (wedgeTopRightRef.current) {
        animate(wedgeTopRightRef.current, {
          translateY: [-14, 14],
          rotate: [-12, 16],
          duration: 4100,
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        });
      }

      // Gajo de mandarina grande inferior izquierdo
      if (wedgeBottomLeftRef.current) {
        animate(wedgeBottomLeftRef.current, {
          translateY: [14, -14],
          rotate: [14, -16],
          scale: [1.02, 1.10],
          duration: 3700,
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        });
      }

      // Esferas de agua
      if (sphereTopRef.current) {
        animate(sphereTopRef.current, {
          translateY: [-8, 8],
          scale: [0.94, 1.08],
          duration: 2600,
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        });
      }

      if (sphereMidRightRef.current) {
        animate(sphereMidRightRef.current, {
          translateY: [10, -10],
          scale: [1.06, 0.94],
          duration: 3200,
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        });
      }

      if (sphereMidLeftRef.current) {
        animate(sphereMidLeftRef.current, {
          translateY: [-9, 9],
          scale: [0.95, 1.05],
          duration: 2900,
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        });
      }

      if (sphereBottomRef.current) {
        animate(sphereBottomRef.current, {
          translateY: [8, -8],
          scale: [1.04, 0.96],
          duration: 3000,
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        });
      }

      // Logo RUMAJ
      if (logoRef.current) {
        animate(logoRef.current, {
          scale: [1, 1.06, 1],
          duration: 2800,
          ease: 'inOutSine',
          loop: true,
        });
      }
    } else {
      const floatingState = { y: 0, rotate: 0, scale: 1.18 };
      animate(floatingState, {
        y: [-12, 12],
        rotate: [-2, 2],
        scale: [1.14, 1.25],
        duration: 3300,
        ease: 'inOutSine',
        loop: true,
        alternate: true,
        onUpdate: () => setGlassTransform({ ...floatingState }),
      });
    }
  }, []);

  const handlePressIn = () => {
    if (Platform.OS === 'web' && buttonRef.current) {
      animate(buttonRef.current, {
        scale: 0.95,
        duration: 120,
        ease: 'outQuad',
      });
    } else {
      setButtonScale(0.95);
    }
  };

  const handlePressOut = () => {
    if (Platform.OS === 'web' && buttonRef.current) {
      animate(buttonRef.current, {
        scale: [0.95, 1.03, 1],
        duration: 380,
        ease: 'outElastic',
      });
    } else {
      setButtonScale(1);
    }
  };

  const handleNavigate = () => {
    if (Platform.OS === 'web' && buttonRef.current) {
      animate(buttonRef.current, {
        scale: [1, 0.92, 1],
        duration: 220,
        ease: 'outQuad',
      });
    }
    setTimeout(() => {
      router.push('/menu');
    }, 150);
  };

  // Renderizador de la Escena 3D
  const render3DScene = (isDesktopView: boolean) => (
    <View style={isDesktopView ? styles.desktopSceneContainer : styles.scene3DWrapper}>
      {/* Cubo de Hielo Superior Izquierdo */}
      <View ref={iceTopLeftRef} style={[styles.floatingItem, styles.iceTopLeft]}>
        <Image
          source={require('../assets/optimized/ice_cube_1.png')}
          style={styles.fullImg}
          resizeMode="contain"
        />
      </View>

      {/* Sombrilla Blanca Floral */}
      <View ref={umbrellaWhiteRef} style={[styles.floatingItem, styles.umbrellaWhite]}>
        <Image
          source={require('../assets/optimized/umbrella_white.png')}
          style={styles.fullImg}
          resizeMode="contain"
        />
      </View>

      {/* Esfera de agua superior */}
      <View ref={sphereTopRef} style={[styles.floatingItem, styles.sphereTop]}>
        <Image
          source={require('../assets/optimized/water_sphere.png')}
          style={styles.fullImg}
          resizeMode="contain"
        />
      </View>

      {/* Gajo Superior Derecho */}
      <View ref={wedgeTopRightRef} style={[styles.floatingItem, styles.wedgeTopRight]}>
        <Image
          source={require('../assets/optimized/orange_wedge_2.png')}
          style={styles.fullImg}
          resizeMode="contain"
        />
      </View>

      {/* Cubo de Hielo Medio Izquierdo */}
      <View ref={iceMidLeftRef} style={[styles.floatingItem, styles.iceMidLeft]}>
        <Image
          source={require('../assets/optimized/ice_cube_2.png')}
          style={styles.fullImg}
          resizeMode="contain"
        />
      </View>

      {/* Esfera Media Derecha */}
      <View ref={sphereMidRightRef} style={[styles.floatingItem, styles.sphereMidRight]}>
        <Image
          source={require('../assets/optimized/water_sphere.png')}
          style={styles.fullImg}
          resizeMode="contain"
        />
      </View>

      {/* Esfera Media Izquierda */}
      <View ref={sphereMidLeftRef} style={[styles.floatingItem, styles.sphereMidLeft]}>
        <Image
          source={require('../assets/optimized/water_sphere.png')}
          style={styles.fullImg}
          resizeMode="contain"
        />
      </View>

      {/* Vaso Central Protagonista */}
      <View
        ref={glassRef}
        style={[
          styles.centerGlassContainer,
          styles.glass3DShadow,
          Platform.OS !== 'web' && {
            transform: [
              { translateY: glassTransform.y },
              { rotate: `${glassTransform.rotate}deg` },
              { scale: glassTransform.scale },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/optimized/glass_juice.png')}
          style={styles.glassImage}
          resizeMode="contain"
        />
      </View>

      {/* Sombrilla Azul */}
      <View ref={umbrellaBlueRef} style={[styles.floatingItem, styles.umbrellaBlue]}>
        <Image
          source={require('../assets/optimized/umbrella_blue.png')}
          style={styles.fullImg}
          resizeMode="contain"
        />
      </View>

      {/* Cubo Inferior */}
      <View ref={iceBottomRef} style={[styles.floatingItem, styles.iceBottom]}>
        <Image
          source={require('../assets/optimized/ice_cube_1.png')}
          style={styles.fullImg}
          resizeMode="contain"
        />
      </View>

      {/* Gajo Inferior Izquierdo */}
      <View ref={wedgeBottomLeftRef} style={[styles.floatingItem, styles.wedgeBottomLeft]}>
        <Image
          source={require('../assets/optimized/orange_wedge_1.png')}
          style={styles.fullImg}
          resizeMode="contain"
        />
      </View>

      {/* Esfera Inferior */}
      <View ref={sphereBottomRef} style={[styles.floatingItem, styles.sphereBottom]}>
        <Image
          source={require('../assets/optimized/water_sphere.png')}
          style={styles.fullImg}
          resizeMode="contain"
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* FONDO DEGRADADO COMPLETO */}
      <View style={styles.bgContainer}>
        <Image
          source={require('../assets/optimized/bg_gradient.png')}
          style={styles.fullBgImage}
          resizeMode="cover"
        />
      </View>

      {isDesktop ? (
        /* VISTA DESKTOP WEB */
        <View style={styles.desktopWrapper}>
          {/* Header Web */}
          <View style={styles.desktopNav}>
            <View style={styles.desktopBrand}>
              <Image
                source={require('../assets/optimized/rumaj_logo.png')}
                style={styles.desktopLogo}
                resizeMode="contain"
              />
              <View>
                <Text style={styles.desktopBrandName}>RUMAJ</Text>
                <Text style={styles.desktopBrandSub}>Barra de Jugos & Kekes Caseros</Text>
              </View>
            </View>

            <View style={styles.desktopNavRight}>
              <View style={styles.tableServiceBadge}>
                <Ionicons name="restaurant" size={15} color="#D76817" />
                <Text style={styles.tableServiceText}>Servicio en mesa</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleNavigate}
                style={styles.desktopNavBtn}
              >
                <Text style={styles.desktopNavBtnText}>Ver Carta Completa →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Contenido Principal en 2 Columnas */}
          <View style={styles.desktopHeroContainer}>
            {/* Columna Izquierda: Mensaje & CTA */}
            <View style={styles.desktopHeroLeft}>
              <View style={styles.heroPillTag}>
                <Ionicons name="sparkles" size={14} color="#D76817" />
                <Text style={styles.heroPillText}>Naranjas Huando recién exprimidas</Text>
              </View>

              <Text style={styles.desktopMainTitle}>
                Sabor Natural, Fresco y al Instante.
              </Text>

              <Text style={styles.desktopSubtitle}>
                Disfruta de nuestros jugos de naranja 100% naturales exprimidos al momento y los mejores kekes caseros (naranja o zanahoria) recién horneados. Pide desde tu mesa y paga en barra.
              </Text>

              {/* Tarjetas de Precios Rápidos */}
              <View style={styles.desktopPriceGrid}>
                <View style={styles.priceHighlightCard}>
                  <Text style={styles.priceCardEmoji}>🍊</Text>
                  <View>
                    <Text style={styles.priceCardTitle}>Jugo de Naranja</Text>
                    <Text style={styles.priceCardAmount}>S/ 3.00</Text>
                  </View>
                </View>

                <View style={styles.priceHighlightCard}>
                  <Text style={styles.priceCardEmoji}>🥧</Text>
                  <View>
                    <Text style={styles.priceCardTitle}>Keke Casero</Text>
                    <Text style={styles.priceCardAmount}>S/ 2.00</Text>
                  </View>
                </View>

                <View style={[styles.priceHighlightCard, styles.comboHighlightCard]}>
                  <Text style={styles.priceCardEmoji}>✨</Text>
                  <View>
                    <Text style={styles.priceCardTitle}>Combo Especial</Text>
                    <Text style={styles.priceCardAmount}>S/ 5.00</Text>
                  </View>
                </View>
              </View>

              {/* Botón Principal CTA */}
              <View
                ref={buttonRef}
                style={[
                  styles.desktopButtonWrapper,
                  Platform.OS !== 'web' && { transform: [{ scale: buttonScale }] },
                ]}
              >
                <Pressable
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={handleNavigate}
                  style={styles.desktopCtaBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Ingresar a la Carta de RUMAJ"
                >
                  <Text style={styles.desktopCtaBtnText}>Ingresar a la Carta · Pedir Ahora →</Text>
                </Pressable>
              </View>

              {/* Insignias de confianza */}
              <View style={styles.trustRow}>
                <Text style={styles.trustItem}>✨ 100% Fruta Natural</Text>
                <Text style={styles.trustDot}>•</Text>
                <Text style={styles.trustItem}>🍽️ Atención en Mesa</Text>
                <Text style={styles.trustDot}>•</Text>
                <Text style={styles.trustItem}>🟣 Pago con Yape o Efectivo</Text>
              </View>
            </View>

            {/* Columna Derecha: Escenario 3D interactivo */}
            <View style={styles.desktopHeroRight}>
              {render3DScene(true)}
            </View>
          </View>
        </View>
      ) : (
        /* VISTA MÓVIL (La vista exacta que el usuario aprobó para smartphones) */
        <>
          {render3DScene(false)}

          <View style={styles.bottomBar}>
            <View
              ref={buttonRef}
              style={[
                styles.buttonWrapper,
                Platform.OS !== 'web' && { transform: [{ scale: buttonScale }] },
              ]}
            >
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleNavigate}
                style={styles.amberPillButton}
                accessibilityRole="button"
                accessibilityLabel="Ingresar a RUMAJ"
              >
                <Text style={styles.buttonText}>Ingresar a RUMAJ</Text>
              </Pressable>
            </View>

            <View ref={logoRef} style={styles.logoWrapper}>
              <Image
                source={require('../assets/optimized/rumaj_logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0906',
    position: 'relative',
    overflow: 'hidden',
  },
  bgContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  fullBgImage: {
    width: '100%',
    height: '100%',
  },
  scene3DWrapper: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
    // @ts-ignore
    perspective: 1200,
  },
  desktopSceneContainer: {
    width: 480,
    height: 560,
    position: 'relative',
    // @ts-ignore
    perspective: 1200,
  },
  floatingItem: {
    position: 'absolute',
  },
  fullImg: {
    width: '100%',
    height: '100%',
  },

  // Posiciones de los elementos 3D
  iceTopLeft: {
    top: '8%',
    left: '8%',
    width: 140,
    height: 130,
    zIndex: 8,
    // @ts-ignore
    filter: 'drop-shadow(0 15px 24px rgba(0,0,0,0.4))',
  },
  umbrellaWhite: {
    top: '6%',
    right: '4%',
    width: 160,
    height: 190,
    zIndex: 12,
    // @ts-ignore
    filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.42))',
  },
  sphereTop: {
    top: '18%',
    left: '42%',
    width: 50,
    height: 50,
    zIndex: 9,
    // @ts-ignore
    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
  },
  wedgeTopRight: {
    top: '23%',
    right: '8%',
    width: 105,
    height: 115,
    zIndex: 10,
    // @ts-ignore
    filter: 'drop-shadow(0 14px 22px rgba(0,0,0,0.38))',
  },
  iceMidLeft: {
    top: '44%',
    left: '4%',
    width: 105,
    height: 105,
    zIndex: 9,
    // @ts-ignore
    filter: 'drop-shadow(0 15px 22px rgba(0,0,0,0.35))',
  },
  sphereMidRight: {
    top: '36%',
    right: '8%',
    width: 72,
    height: 72,
    zIndex: 9,
    // @ts-ignore
    filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.28))',
  },
  sphereMidLeft: {
    top: '40%',
    left: '12%',
    width: 52,
    height: 52,
    zIndex: 9,
    // @ts-ignore
    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))',
  },
  centerGlassContainer: {
    position: 'absolute',
    top: '22%',
    alignSelf: 'center',
    width: 280,
    height: 390,
    zIndex: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glass3DShadow: {
    // @ts-ignore
    filter: 'drop-shadow(0 30px 42px rgba(0, 0, 0, 0.72)) drop-shadow(0 12px 18px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 55px rgba(245, 158, 11, 0.48))',
  },
  glassImage: {
    width: '100%',
    height: '100%',
  },
  umbrellaBlue: {
    top: '47%',
    right: '10%',
    width: 135,
    height: 135,
    zIndex: 30,
    // @ts-ignore
    filter: 'drop-shadow(0 18px 28px rgba(0,0,0,0.5))',
  },
  iceBottom: {
    top: '59%',
    left: '34%',
    width: 120,
    height: 120,
    zIndex: 32,
    // @ts-ignore
    filter: 'drop-shadow(0 16px 25px rgba(0,0,0,0.4))',
  },
  wedgeBottomLeft: {
    top: '60%',
    left: '5%',
    width: 180,
    height: 170,
    zIndex: 35,
    // @ts-ignore
    filter: 'drop-shadow(0 22px 34px rgba(0,0,0,0.55))',
  },
  sphereBottom: {
    top: '71%',
    left: '42%',
    width: 66,
    height: 66,
    zIndex: 28,
    // @ts-ignore
    filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.32))',
  },

  // Barra inferior para Móvil
  bottomBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 36 : 28,
    left: 20,
    right: 20,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
    marginRight: 14,
  },
  amberPillButton: {
    backgroundColor: '#F59E0B',
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    // @ts-ignore
    boxShadow: '0 8px 20px rgba(245, 158, 11, 0.45), 0 2px 6px rgba(0, 0, 0, 0.25)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  logoWrapper: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 54,
    height: 54,
  },

  // ESTILOS EXCLUSIVOS PARA DESKTOP WEB
  desktopWrapper: {
    flex: 1,
    zIndex: 20,
    justifyContent: 'space-between',
  },
  desktopNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 24,
    maxWidth: 1300,
    width: '100%',
    alignSelf: 'center',
  },
  desktopBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  desktopLogo: {
    width: 52,
    height: 52,
  },
  desktopBrandName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  desktopBrandSub: {
    fontSize: 12,
    color: '#FDE047',
    fontWeight: '600',
    marginTop: 2,
  },
  desktopNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tableServiceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    // @ts-ignore
    backdropFilter: 'blur(10px)',
  },
  tableServiceText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#A84B06',
  },
  desktopNavBtn: {
    backgroundColor: '#1E1A17',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  desktopNavBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // Desktop Hero Container en 2 Columnas
  desktopHeroContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1300,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  desktopHeroLeft: {
    flex: 1,
    maxWidth: 580,
    paddingRight: 20,
  },
  heroPillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 247, 237, 0.9)',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 20,
  },
  heroPillText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#C2410C',
  },
  desktopMainTitle: {
    fontSize: 44,
    fontWeight: '900',
    color: '#FFFFFF',
    lineHeight: 52,
    marginBottom: 16,
    // @ts-ignore
    textShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
  },
  desktopSubtitle: {
    fontSize: 16,
    color: '#FEE2E2',
    lineHeight: 25,
    marginBottom: 24,
  },
  desktopPriceGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  priceHighlightCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
    // @ts-ignore
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
  },
  comboHighlightCard: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FB923C',
  },
  priceCardEmoji: {
    fontSize: 22,
  },
  priceCardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#78350F',
    textTransform: 'uppercase',
  },
  priceCardAmount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#C2410C',
    marginTop: 2,
  },
  desktopButtonWrapper: {
    marginBottom: 20,
  },
  desktopCtaBtn: {
    backgroundColor: '#F59E0B',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    // @ts-ignore
    boxShadow: '0 12px 28px rgba(245, 158, 11, 0.5), 0 3px 8px rgba(0, 0, 0, 0.3)',
  },
  desktopCtaBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  trustItem: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FEF3C7',
  },
  trustDot: {
    color: '#F59E0B',
    fontSize: 14,
  },
  desktopHeroRight: {
    width: 480,
    height: 560,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
