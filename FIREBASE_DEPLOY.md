# Despliegue en Firebase Hosting

El proyecto está configurado para desplegarse en **Firebase Hosting**. Cada vez que hagas **push a la rama `main`** en GitHub, se construye el sitio y se actualiza en Firebase.

## 1. Crear proyecto en Firebase

1. Entra en [Firebase Console](https://console.firebase.google.com/).
2. Crea un proyecto nuevo (o usa uno existente).
3. En **Build** → **Hosting**, haz clic en **Empezar** y sigue los pasos (no hace falta configurar nada más por ahora).

## 2. Vincular el proyecto local

1. Instala Firebase CLI (si no lo tienes):
   ```bash
   npm install -g firebase-tools
   ```
2. Inicia sesión:
   ```bash
   firebase login
   ```
3. En el archivo **`.firebaserc`** del repositorio, sustituye `TU_PROYECTO_FIREBASE` por el **ID de tu proyecto** de Firebase (lo ves en Configuración del proyecto en la consola).

## 3. Probar el deploy en local

```bash
npm run build
firebase deploy --only hosting
```

O en un solo paso:

```bash
npm run deploy
```

## 4. Deploy automático con GitHub Actions

Para que cada **push a `main`** despliegue en Firebase sin hacer nada más:

### 4.1 Generar token de Firebase (CI)

En tu máquina, con Firebase CLI instalado y ya logueado:

```bash
firebase login:ci
```

Te saldrá un **token** largo. Cópialo.

### 4.2 Añadir el token en GitHub

1. En tu repositorio de GitHub: **Settings** → **Secrets and variables** → **Actions**.
2. **New repository secret**.
3. Nombre: `FIREBASE_TOKEN`.
4. Valor: pega el token que generaste con `firebase login:ci`.
5. Guarda.

### 4.3 Listo

A partir de ahora, cada vez que hagas:

```bash
git add .
git commit -m "Actualizar portafolio"
git push origin main
```

se ejecutará el workflow **Deploy to Firebase Hosting**, se generará el build estático y se desplegará en Firebase. La URL será algo como:

`https://TU_PROYECTO_FIREBASE.web.app`

(o el dominio que tengas configurado en Hosting).

## Resumen de archivos

- **`next.config.ts`**: `output: "export"` para generar la carpeta `out` (sitio estático).
- **`firebase.json`**: indica que el directorio a publicar es `out`.
- **`.firebaserc`**: ID del proyecto de Firebase (cámbialo por el tuyo).
- **`.github/workflows/firebase-deploy.yml`**: workflow que, en cada push a `main`, hace build y deploy usando el secret `FIREBASE_TOKEN`.
