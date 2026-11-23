import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types/product';
import { Colors } from '../constants/colors';

interface OrderSummaryModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product;
  quantity: number;
}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  visible,
  onClose,
  product,
  quantity,
}) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 860;

  const [step, setStep] = useState<'summary' | 'instructions'>('summary');
  const [iceOption, setIceOption] = useState<'con_hielo' | 'sin_hielo'>('con_hielo');
  const [kekeTemp, setKekeTemp] = useState<'tibio' | 'tiempo'>('tibio');
  const [comboCake, setComboCake] = useState<'naranja' | 'zanahoria'>('naranja');
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'efectivo'>('yape');
  const [orderNumber, setOrderNumber] = useState<string>('#NM-24');

  // Regenerar número de orden aleatorio al abrir
  useEffect(() => {
    if (visible) {
      setStep('summary');
      const randomNum = Math.floor(10 + Math.random() * 89);
      setOrderNumber(`#NM-${randomNum}`);
    }
  }, [visible]);

  const subtotal = product.price * quantity;
  const packagingFee = 0.0;
  const total = subtotal + packagingFee;

  const isJuice = product.category === 'jugos' || product.category === 'combos';
  const isCake = product.category === 'kekes';
  const isCombo = product.category === 'combos';

  const handleConfirmOrder = () => {
    // Pasar a la siguiente ventana con la instrucción de pago
    setStep('instructions');
  };

  const handleSendWhatsAppNotification = () => {
    const iceText = isJuice
      ? `\n🧊 *Hielo:* ${iceOption === 'con_hielo' ? 'Con hielo' : 'Sin hielo'}`
      : '';
    const cakeText = isCake
      ? `\n🥧 *Temperatura:* ${kekeTemp === 'tibio' ? 'Tibiecito' : 'Al tiempo'}`
      : isCombo
      ? `\n🥧 *Keke elegido:* Keke Casero de ${comboCake === 'naranja' ? 'Naranja' : 'Zanahoria'}`
      : '';

    const message = `🍊 *¡Hola Rumaj! Pedido en Mesa ${orderNumber}:*
━━━━━━━━━━━━━━━━━━
🛍️ *Producto:* ${product.name}
📦 *Cantidad:* ${quantity} unidad(es)
💰 *Precio Unit.:* S/ ${product.price.toFixed(2)}${iceText}${cakeText}
🍽️ *Modalidad:* En mesa
💳 *Pago en barra:* ${paymentMethod === 'yape' ? 'Yape' : 'Efectivo'}
━━━━━━━━━━━━━━━━━━
✨ *TOTAL:* S/ ${total.toFixed(2)}
📍 *Estado:* Me acerco a la barra a pagar.`;

    const encoded = encodeURI(message);
    const whatsappUrl = `https://wa.me/51987654321?text=${encoded}`;
    Linking.openURL(whatsappUrl).catch(() => {});
  };

  const handleFinish = () => {
    setStep('summary');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={[styles.overlay, isDesktop && styles.overlayDesktop]}>
        <View style={[styles.modalCard, isDesktop && styles.modalCardDesktop]}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>
                {step === 'summary' ? 'Resumen de Pedido' : '¡Pedido Registrado!'}
              </Text>
              <Text style={styles.headerSubtitle}>
                {step === 'summary'
                  ? 'Rumaj · Servicio en Mesa'
                  : `Orden ${orderNumber} · Mesa`}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} accessibilityLabel="Cerrar modal">
              <Ionicons name="close" size={20} color={Colors.textDark} />
            </TouchableOpacity>
          </View>

          {step === 'summary' ? (
            /* 1. VENTANA DE RESUMEN Y CONFIGURACIÓN */
            <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
              {/* Product item breakdown */}
              <View style={styles.itemRow}>
                <View style={styles.itemBadgeCircle}>
                  <Text style={styles.itemQtyBadge}>{quantity}x</Text>
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{product.name}</Text>
                  <Text style={styles.itemSub}>{product.unit}</Text>
                </View>
                <Text style={styles.itemPrice}>S/ {subtotal.toFixed(2)}</Text>
              </View>

              {/* Modalidad de entrega: Solo En mesa */}
              <Text style={styles.sectionLabel}>Modalidad de Servicio</Text>
              <View style={styles.singleMesaBanner}>
                <Ionicons name="restaurant" size={17} color="#D76817" />
                <Text style={styles.singleMesaText}>Servicio en mesa (Atención directa)</Text>
              </View>

              {/* Hielo & Frescura: Solo Con hielo o Sin hielo */}
              {isJuice && (
                <>
                  <Text style={styles.sectionLabel}>Hielo & Frescura</Text>
                  <View style={styles.toggleRow}>
                    <TouchableOpacity
                      style={[styles.toggleBtn, iceOption === 'con_hielo' && styles.toggleBtnActive]}
                      onPress={() => setIceOption('con_hielo')}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.toggleText,
                          iceOption === 'con_hielo' && styles.toggleTextActive,
                        ]}
                      >
                        ❄️ Con hielo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.toggleBtn, iceOption === 'sin_hielo' && styles.toggleBtnActive]}
                      onPress={() => setIceOption('sin_hielo')}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.toggleText,
                          iceOption === 'sin_hielo' && styles.toggleTextActive,
                        ]}
                      >
                        ☀️ Sin hielo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {/* Preferencias para kekes */}
              {isCake && (
                <>
                  <Text style={styles.sectionLabel}>Servicio del Keke</Text>
                  <View style={styles.toggleRow}>
                    <TouchableOpacity
                      style={[styles.toggleBtn, kekeTemp === 'tibio' && styles.toggleBtnActive]}
                      onPress={() => setKekeTemp('tibio')}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.toggleText, kekeTemp === 'tibio' && styles.toggleTextActive]}>
                        ♨️ Tibiecito
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.toggleBtn, kekeTemp === 'tiempo' && styles.toggleBtnActive]}
                      onPress={() => setKekeTemp('tiempo')}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.toggleText, kekeTemp === 'tiempo' && styles.toggleTextActive]}>
                        ☀️ Al tiempo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {/* Elección de sabor si es combo */}
              {isCombo && (
                <>
                  <Text style={styles.sectionLabel}>Elige tu Keke para el Combo</Text>
                  <View style={styles.toggleRow}>
                    <TouchableOpacity
                      style={[styles.toggleBtn, comboCake === 'naranja' && styles.toggleBtnActive]}
                      onPress={() => setComboCake('naranja')}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.toggleText, comboCake === 'naranja' && styles.toggleTextActive]}>
                        🍊 Keke Naranja
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.toggleBtn, comboCake === 'zanahoria' && styles.toggleBtnActive]}
                      onPress={() => setComboCake('zanahoria')}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.toggleText, comboCake === 'zanahoria' && styles.toggleTextActive]}>
                        🥕 Keke Zanahoria
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {/* Método de pago: Solo Yape o Efectivo */}
              <Text style={styles.sectionLabel}>Método de Pago en Barra</Text>
              <View style={styles.paymentRow}>
                <TouchableOpacity
                  style={[styles.payChip, paymentMethod === 'yape' && styles.payChipActive]}
                  onPress={() => setPaymentMethod('yape')}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.payChipText,
                      paymentMethod === 'yape' && styles.payChipTextActive,
                    ]}
                  >
                    🟣 Yape
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.payChip, paymentMethod === 'efectivo' && styles.payChipActive]}
                  onPress={() => setPaymentMethod('efectivo')}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.payChipText,
                      paymentMethod === 'efectivo' && styles.payChipTextActive,
                    ]}
                  >
                    💵 Efectivo
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Cost breakdown */}
              <View style={styles.breakdownBox}>
                <View style={styles.calcRow}>
                  <Text style={styles.calcLabel}>Subtotal ({quantity} items)</Text>
                  <Text style={styles.calcVal}>S/ {subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.calcRow}>
                  <Text style={styles.calcLabel}>Atención en mesa</Text>
                  <Text style={[styles.calcVal, { color: '#2EA44F' }]}>Incluido</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.calcRow}>
                  <Text style={styles.totalLabel}>Total a pagar</Text>
                  <Text style={styles.totalVal}>S/ {total.toFixed(2)}</Text>
                </View>
              </View>

              {/* Action Button: Confirmar y pasar a la siguiente ventana */}
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={handleConfirmOrder}
                style={styles.confirmBtn}
              >
                <Text style={styles.confirmBtnText}>Confirmar y Ordenar · S/ {total.toFixed(2)} →</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            /* 2. SIGUIENTE VENTANA: INSTRUCCIÓN CLARA "ACÉRCATE A LA BARRA A PAGAR" */
            <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
              <View style={styles.instructionContainer}>
                {/* Gran tarjeta destacada con instrucción de pago */}
                <View style={styles.payNoticeCard}>
                  <View style={styles.payNoticeIconWrapper}>
                    <Ionicons name="storefront" size={28} color="#D76817" />
                  </View>
                  <Text style={styles.payNoticeHeading}>Acércate a la barra a pagar</Text>
                  <Text style={styles.payNoticeSubtext}>
                    Tu orden es la{' '}
                    <Text style={styles.boldText}>{orderNumber}</Text>.
                    {'\n'}Por favor acércate a la barra para cancelar{' '}
                    <Text style={styles.boldText}>S/ {total.toFixed(2)}</Text> con{' '}
                    <Text style={styles.boldText}>
                      {paymentMethod === 'yape' ? 'Yape' : 'Efectivo'}
                    </Text>
                    . ¡Tu pedido ya comenzó a prepararse!
                  </Text>
                </View>

                {/* Resumen compacto del pedido */}
                <View style={styles.recapCard}>
                  <Text style={styles.recapTitle}>Detalle de tu orden ({orderNumber}):</Text>
                  <View style={styles.recapItemRow}>
                    <Text style={styles.recapItemName}>
                      {quantity}x {product.name}
                    </Text>
                    <Text style={styles.recapItemPrice}>S/ {total.toFixed(2)}</Text>
                  </View>
                  <Text style={styles.recapMeta}>
                    • Servicio en mesa{'\n'}
                    {isJuice ? `• ${iceOption === 'con_hielo' ? 'Con hielo' : 'Sin hielo'}\n` : ''}
                    {isCake ? `• ${kekeTemp === 'tibio' ? 'Servir tibiecito' : 'Al tiempo'}\n` : ''}
                    {isCombo ? `• Keke de ${comboCake === 'naranja' ? 'Naranja' : 'Zanahoria'}\n` : ''}
                    • Pago: {paymentMethod === 'yape' ? '🟣 Yape' : '💵 Efectivo'}
                  </Text>
                </View>

                {/* Botón opcional de notificación por WhatsApp */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSendWhatsAppNotification}
                  style={styles.whatsAppSecondaryBtn}
                >
                  <Ionicons name="logo-whatsapp" size={18} color="#25D366" />
                  <Text style={styles.whatsAppSecondaryBtnText}>
                    Enviar copia de orden a la barra
                  </Text>
                </TouchableOpacity>

                {/* Botón principal: Listo / Volver */}
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={handleFinish}
                  style={styles.confirmBtn}
                >
                  <Text style={styles.confirmBtnText}>Listo / Volver a la Carta</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  overlayDesktop: {
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    maxHeight: '88%',
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
    // @ts-ignore
    boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.45)',
  },
  modalCardDesktop: {
    borderRadius: 28,
    maxWidth: 520,
    maxHeight: '90%',
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 28,
    // @ts-ignore
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.55)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0ECE8',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textDark,
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
    marginTop: 2,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3EFEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    marginTop: 14,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F4',
    padding: 12,
    borderRadius: 18,
    marginBottom: 16,
  },
  itemBadgeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemQtyBadge: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textDark,
  },
  itemSub: {
    fontSize: 12,
    color: Colors.textDarkSecondary,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textDark,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textDark,
    marginBottom: 8,
    marginTop: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },

  // Modalidad fija: solo en mesa
  singleMesaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF4EC',
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFE0C8',
    marginBottom: 14,
  },
  singleMesaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#A84B06',
  },

  toggleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: '#F3EFEA',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  toggleBtnActive: {
    backgroundColor: '#1E1A17',
    borderColor: '#1E1A17',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textDarkSecondary,
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  paymentRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  payChip: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3EFEA',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  payChipActive: {
    backgroundColor: '#1E1A17',
    borderColor: '#1E1A17',
  },
  payChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textDarkSecondary,
  },
  payChipTextActive: {
    color: '#FFFFFF',
  },

  breakdownBox: {
    backgroundColor: '#FAF7F4',
    padding: 14,
    borderRadius: 18,
    marginBottom: 16,
  },
  calcRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  calcLabel: {
    fontSize: 13,
    color: Colors.textDarkSecondary,
  },
  calcVal: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textDark,
  },
  divider: {
    height: 1,
    backgroundColor: '#EBE5DF',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textDark,
  },
  totalVal: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.primaryDark,
  },

  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1815',
    paddingVertical: 16,
    borderRadius: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 8,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.4,
  },

  // ESTILOS PARA LA SIGUIENTE VENTANA (ACÉRCATE A LA BARRA A PAGAR)
  instructionContainer: {
    paddingVertical: 4,
    paddingBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  payNoticeCard: {
    width: '100%',
    backgroundColor: '#FFF7EE',
    borderWidth: 1.5,
    borderColor: '#FED7AA',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  payNoticeIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  payNoticeHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#C2410C',
    textAlign: 'center',
    marginBottom: 8,
  },
  payNoticeSubtext: {
    fontSize: 13,
    color: '#7C2D12',
    textAlign: 'center',
    lineHeight: 19,
  },
  boldText: {
    fontWeight: '800',
    color: '#431407',
  },

  recapCard: {
    width: '100%',
    backgroundColor: '#FAF7F4',
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
  },
  recapTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textDarkSecondary,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  recapItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  recapItemName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textDark,
  },
  recapItemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  recapMeta: {
    fontSize: 12,
    color: '#6E665E',
    lineHeight: 18,
    marginTop: 4,
  },

  whatsAppSecondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    width: '100%',
    marginBottom: 12,
  },
  whatsAppSecondaryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#15803D',
  },
});
