## 📱 LoansApp 📱
Este proyecto fue generado con Angular CLI versión 19.2.0.
---

✅ Pasos para usar un proyecto Angular ✅
  1. 📦 Descomprime el archivo
  2. 📁 Abre la carpeta del proyecto
  3. 💻 Abre el proyecto en tu editor
  4. 📦 Instala las dependencias
✅-------------------------------------✅

## 🛠️ Instalaciones necesarias 🛠️

  > Angular - Las depedencias de angular <
  ```bash
  ##opcion 1 con version
    npm install -g @angular/cli@19
 
  ##opcion 2
    npm install
  ```

  > TailwindCSS + DaisyUI <
  ```bash
    npm install daisyui@latest tailwindcss@latest @tailwindcss/postcss@latest postcss@latest --force
  ```

  > JSON Server (requiere Node.js v22.14.0) <
  ```bash
    npm install json-server
  ```

  > UUID <
  ```bash
    npm install uuid
  ```

## 🚀 Servidor de desarrollo 🚀
Para iniciar el servidor local de desarrollo, ejecuta: 
 ```bash
  ## Nota: Se debe ejecutar dentro del proyecto cada uno en una terminal Distinta

  #Primero
  ##opcion 1   ##opcion 2
  ng serve     ng serve -o

  #Segundo
  ##Levanta el Servicio Json-Server
  json-server --watch db.json
```
## 🔐 Acceso y Autenticación 🔐
  1. 🧑‍💻 Inicio de sesión
  El sistema cuenta con una interfaz de login.

 >Para ingresar, abre http://localhost:4200

  2. 🔑 Credenciales por defecto 
  Usuario: admin@gmail.com
  Contraseña: 123456789


(opcional)
## COPI Y PEGA MAS RAPIDO ##
```bash
    npm install -g @angular/cli@19
    npm install daisyui@latest tailwindcss@latest @tailwindcss/postcss@latest postcss@latest
    --force
    npm install json-server
    npm install uuid
    json-server --watch db.json
    ng serve -o
```
