# Proyecto Node.js

Este proyecto es una aplicación Node.js. A continuación, se detallan los pasos para levantar la aplicación y configurar las variables de entorno.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone 
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd tu-repositorio
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## Configuración de Variables de Entorno

1. Crea un archivo `.env` o clonar el archivo `env.template` en la raíz del proyecto.
2. Agrega las siguientes variables de entorno al archivo `.env`:
    ```env
    MAILER_EMAIL=
    MAILER_SECRET_KEY=
    PROD = false
    PORT = 3000
    ```

## Ejecución

Para levantar la aplicación, ejecuta el siguiente comando:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Scripts Disponibles

- `npm run dev`: Inicia la aplicación en modo desarrollo.
- `npm run tests`: Ejecuta las pruebas.

