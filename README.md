# fastLab 

FastLab es una aplicación web para la gestión de laboratorios clínicos que permite administrar resultados de análisis médicos, pacientes y personal médico.

## Resumen del Proyecto

**Descripción:**
Este sistema está diseñado para gestionar de manera eficiente los procesos de un laboratorio bioquímico. Permitirá a pacientes, bioquímicos, médicos, recepcionistas y administradores interactuar con información relevante, automatizar la carga de resultados desde máquinas, y acceder a historiales médicos.


## Características

-   Sistema de autenticación para pacientes y administradores
-   Gestión de resultados de análisis
-   Administración de doctores y bioquímicos
-   Portal de pacientes para ver resultados
-   Interfaz responsive y moderna

<h3><b>Puede consultar nuestra aplicación web aquí:</b></h3>
<h4 style="color: #02807D;">
  <a href="https://team-16-nu.vercel.app/" target="_blank" rel="noopener noreferrer">fastLab</a>
</h4>
<h4 style="color: #02807D;">
  <a href="https://team-16-private.onrender.com/swagger/index.html" target="_blank" rel="noopener noreferrer">API con Swagger</a>
</h4>

## 👉🏻 Tecnologías usadas: 🛠️

### 🚀 Frontend  
![React](https://img.shields.io/badge/React-149eca?style=for-the-badge&logo=react&logoColor=fff) 
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-blueviolet?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-000?style=for-the-badge&logo=reactrouter&logoColor=fff)
![Vercel](https://img.shields.io/badge/vercel%20-%23000000.svg?&style=for-the-badge&logo=vercel&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-F5F5F5?style=for-the-badge)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![React PDF](https://img.shields.io/badge/React%20PDF-FFDD00?style=for-the-badge)
![React Datepicker](https://img.shields.io/badge/React%20Datepicker-blue?style=for-the-badge)
![React Toastify](https://img.shields.io/badge/React%20Toastify-orange?style=for-the-badge&logo=react&logoColor=white)
    
### 🖥️ Backend  
![.NET](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=.net&logoColor=white) 
![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white) 
![Entity Framework](https://img.shields.io/badge/Entity%20Framework-003B57?style=for-the-badge) 
![AutoMapper](https://img.shields.io/badge/AutoMapper-FF5733?style=for-the-badge) 
![Bcrypt](https://img.shields.io/badge/Bcrypt-00A300?style=for-the-badge) 
![PostgreSql](https://img.shields.io/badge/PostgreSql-8A2BE2?style=for-the-badge)

## Requisitos previos 📋

-   Node.js (versión 16 o superior)
-   npm o yarn
-   .Net-8
-   Git
-   PostgreSql

## Instalación

 Clona el repositorio:

```bash
git clone <url-del-repositorio>
```

### FrontEnd
1. Instala las dependencias:

```bash
cd Frontend/fastlab
npm install
# o
yarn install
```

2. Crea un archivo `.env` basado en `.env.template`:

```bash
cp .env.template .env
```

3. Configura las variables de entorno en el archivo `.env`:

 ### Back End

1.
```bash
cd BackEnd/API
```

2. Se puede usar el archivo `appsettings.json` para la configuracion o crear un `appsettings.Development.json`

```bash
cp appsettings.json appsettings.Development.json
```
El DefaultConnection puede ser de la siguiente menera pero puede requerir mas parametros":
```bash
"ConnectionStrings": {
  "DefaultConnection": "Server=<>;Database=<>;User Id=<>;Password=<>"
}
```

3. Restaura y ejecuta el backend:

```bash
dotnet restore
# y
dotnet run
```

## Comunicación de equipo

[![](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=fff)](https://discord.gg/dyxDxw8w)
[![](https://img.shields.io/badge/Slack-%23ED8B00?style=for-the-badge&logo=Slack&logoColor=fff)](https://slack.com/intl/es-pe/) 
[![](https://img.shields.io/badge/Google_Meet-00897B?style=for-the-badge&logo=Google-Meet&logoColor=fff)](https://meet.google.com/) 
[![](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=WhatsApp&logoColor=fff)](https://web.whatsapp.com/)


## Equipo

### Colaboradores


| <img src="https://media.licdn.com/dms/image/v2/D4D35AQH_JQsmuyUULA/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1734511049691?e=1738724400&v=beta&t=4NHpLEpgUoi1g4-8fWZNBGHTE_QVRxIh9GRGimR2ylM" alt="Gonzalo Volante" width="60"> | <img src="https://media.licdn.com/dms/image/v2/D4D35AQGP0a96yFJLPg/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1711673091412?e=1738724400&v=beta&t=lkKNA4Xy6gWHYS19AuWgGsB0x9nhjS8z7GDK5IlU5oc" alt="Lourdes Avalos" width="60"> | <img src="https://media.licdn.com/dms/image/v2/D4E35AQGw3jDPXUalsg/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1715989830543?e=1738724400&v=beta&t=nwe32MflYWWZizZPtlPSzRPFMlfV2x2vHxDdo6lyH1U" alt="Carolina Limay Oliva" width="60"> | <img src="https://media.licdn.com/dms/image/v2/D4E03AQEI84fZA8Koyw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1699055768532?e=1743638400&v=beta&t=7QOLQGQGUDbq1_F8-u24DtsM2L4l3-HBxKd7VmWNkAg" alt="David Martinez" width="60"> | <img src="https://media.licdn.com/dms/image/v2/C4D03AQGeez_me_-qJA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1653999160269?e=1743638400&v=beta&t=jz_sg34fSm0Pbqh_DTje9h66_Y0FVGvmAyGsZu9xbbA" alt="Lucas Pirez" width="60"> | <img src="https://media.licdn.com/dms/image/v2/D4E35AQGNCbbbIANZCg/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1706640554427?e=1738940400&v=beta&t=Se8DXZIr9BrGZovP8K0ruvTSknFRJuIT6E77K0xmB3c" alt="Felipe Azocar" width="60"> |
|---|---|---|---|---|---|
| **Gonzalo Volante** | **Lourdes Avalos** | **Carolina Limay Oliva** | **David Martinez** | **Lucas Pirez** | **Felipe Azocar**
| [🔗 LinkedIn](https://www.linkedin.com/in/gonzalo-volante-76537325b) | [🔗 LinkedIn](https://www.linkedin.com/in/lourdes-avalos-91a301255/) | [🔗 LinkedIn](https://www.linkedin.com/in/carolina-limay-oliva/) | [🔗 LinkedIn](https://www.linkedin.com/in/david-martinez-mata/) | [🔗 LinkedIn](https://www.linkedin.com/in/lucaspirez-dev) | [🔗 LinkedIn](https://www.linkedin.com/in/lfazocar) |
