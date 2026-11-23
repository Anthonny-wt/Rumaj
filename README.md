# 🍊 Rumaj — Barra de Jugos & Kekes Caseros

Aplicación móvil y web responsiva para pedidos directos en mesa y mostrador, desarrollada con **Expo (SDK 58)**, **React Native**, **Expo Router** y animaciones 3D con **Anime.js** y **React Native Reanimated**.

---

## ✨ Características

* **Experiencia Web & Móvil Adaptativa:**
  * **En Web/Desktop:** Diseño widescreen en 2 columnas con escaparate 3D, consola de pedido, catálogo completo y modal flotante centrado.
  * **En Móvil:** Interfaz vertical ergonómica inspirada en el diseño de Figma con navegación táctil fluida.
* **Escaparate 3D Interactivo (Anime.js):**
  * Vaso protagonista con efecto de profundidad Z (*pop-out*).
  * Elementos flotantes independientes: gajos de naranja, cubos de hielo, sombrillas florales y burbujas de agua.
* **Carta Digital & Pedidos en Mesa:**
  * Jugo de Naranja 100% Natural Huando (S/ 3.00) con opciones de hielo (*Con hielo / Sin hielo*).
  * Kekes Caseros (S/ 2.00) con selector de sabor (*Naranja o Zanahoria*) y temperatura (*Tibiecito / Al tiempo*).
  * Combo Jugo + Keke (S/ 5.00).
* **Flujo de Pago Simplificado:**
  * Métodos rápidos: **Yape** o **Efectivo**.
  * Instrucción clara con número de orden generado al instante (*"Acércate a la barra a pagar"*).
  * Opción para enviar copia de la orden a la barra vía WhatsApp.

---

## 🛠️ Tecnologías

* **Framework:** [Expo](https://expo.dev/) (SDK 58) / [React Native](https://reactnative.dev/)
* **Enrutamiento:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
* **Animaciones:** [Anime.js](https://animejs.com/) v4 & [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
* **Lenguaje:** TypeScript
* **Gestor de Paquetes:** pnpm / npm

---

## 🚀 Inicio Rápido

### 1. Clonar el repositorio
```bash
git clone https://github.com/Anthonny-wt/Rumaj.git
cd Rumaj
```

### 2. Instalar dependencias
```bash
pnpm install
# o con npm:
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npx expo start
```
* Presiona `w` para abrir la versión Web en tu navegador (`http://localhost:8081`).
* Escanea el código QR con **Expo Go** en tu celular Android o iOS para probarlo en tu móvil.

---

## 📱 Compilación Nativa (Android APK)

El proyecto está configurado con soporte para generación de instaladores APK:

```bash
# Vía EAS Build (Nube)
npx eas-cli build -p android --profile preview

# O localmente con el script incluido (requiere Android SDK y JDK)
.\build_apk.bat
```

---

## 📄 Licencia

MIT © 2026 Rumaj
