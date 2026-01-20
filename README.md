# Sistema de Gestión de Inventario - Arquitectura de Microservicios

Este proyecto es una solución integral de gestión de productos construida bajo una arquitectura de microservicios. Implementa una comunicación híbrida (HTTP para el exterior y TCP para el interior), garantizando escalabilidad y separación de responsabilidades.

## 🏗️ Arquitectura del Sistema

La solución se despliega como un monorepo gestionado en **Railway**, donde cada componente opera de forma independiente:



### Componentes:
* **Frontend (inventory-web):** Desarrollado en **Angular**. Se encarga de la interacción con el usuario y consume el API Gateway.
* **API Gateway:** Desarrollado en **NestJS**. Actúa como proxy reverso y orquestador. Recibe peticiones REST y las redirige al microservicio correspondiente mediante **TCP**.
* **Products Microservice:** Desarrollado en **NestJS**. Gestiona la lógica de negocio y la persistencia de datos.
* **Base de Datos:** **PostgreSQL** alojado en **Supabase**, gestionado a través de **Prisma ORM**.

---

## 🛠️ Tecnologías y Herramientas

### Backend
* **Framework:** NestJS.
* **Comunicación:** Microservicios TCP (puerto interno 8877).
* **ORM:** Prisma Client.
* **Documentación:** Swagger UI (disponible en el Gateway).

### Frontend
* **Framework:** Angular.
* **Arquitectura:** Limpia (Data, Domain, Presentation)
* **Estilos:** CSS / Tailwind 
* **Entorno:** Configuración de ambientes para producción y local.

### Infraestructura
* **Contenedores:** Docker & Docker Compose.
* **Cloud Hosting:** Railway (PaaS).
* **Base de Datos:** Supabase (PostgreSQL).

---
###
URL en producción

## 🌐 Detalles del Despliegue en Producción

El sistema utiliza la red privada de Railway para la comunicación interna, optimizando la seguridad al no exponer los microservicios directamente a internet.

| Servicio | Rol | Acceso | URL / Host de Red |
| :--- | :--- | :--- | :--- |
| **Frontend** | Interfaz | Público | https://peaceful-spontaneity-production.up.railway.app |
| **API Gateway** | Orquestador | Público | `https://inventory-microservices-angular-nest-production.up.railway.app` |
| **Products MS** | Lógica/DB | Privado | `selfless-kindness.railway.internal` |

### Variables de Entorno Clave
* **Gateway:** `PRODUCTS_MS_HOST` apunta al host privado del microservicio.
* **Products MS:** `DATABASE_URL` contiene la cadena de conexión cifrada a Supabase.
* **Frontend:** `API_URL` apunta a la dirección pública del Gateway.

---

## 🚀 Instalación y Ejecución Local

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/EdisonyGomez/inventory-microservices-angular-nest.git](https://github.com/EdisonyGomez/inventory-microservices-angular-nest.git)
    ```

2.  **Levantar con Docker:**
    Desde la raíz, ejecuta:
    ```bash
    docker-compose up --build
    ```

3.  **Acceso:**
    * Frontend: `http://localhost:4200`
    * API Gateway: `http://localhost:3000/api`
    * Swagger: `http://localhost:3000/api/docs`

---
