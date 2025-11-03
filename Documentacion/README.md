# Parcial - API Bingo (Backend + Frontend)

## Estructura

- /backend → proyecto Spring Boot (este repo)
- /frontend → HTML + JavaScript (sin frameworks)
- /Documentacion → este archivo

## Backend (Spring Boot)

- Requisitos: JDK 17+, Maven
- Ejecutar:
  - `mvn spring-boot:run`
  - API base: `http://localhost:8080/api`

### Endpoints principales
- Sorteos: `POST/GET/GET{id}/PUT{id}/DELETE{id}` en `/api/sorteos`
- Premios: `POST/GET/GET{id}/PUT{id}/DELETE{id}` en `/api/premios`
- Cartones: `POST/GET/GET{nro_serie}/PUT{nro_serie}/PUT{nro_serie}/estado/DELETE{nro_serie}` y `GET /api/cartones/id/{id}`
- Ganadores: `POST/GET/GET{id}/PUT{id}/DELETE{id}` en `/api/ganadores`

## Frontend (HTML + JS)

- Abrir `frontend/index.html` en un navegador.
- Configurar `frontend/js/config.js` si cambia el puerto/base de la API.
- Funcionalidades:
  - Header con navegación, Footer con autor.
  - Una pantalla por entidad con listado y CRUD.
  - Formularios de alta/modificación y opción de eliminar.
  - Diseño responsive básico.

## Postman
- Importar `postman_collection.json` para pruebas de endpoints.

## Empaquetado .zip sugerido
```
parcial-programacion.zip
  /backend   (contenido del proyecto Spring Boot)
  /frontend  (HTML/JS/CSS)
  /Documentacion/README.md
  postman_collection.json
```



