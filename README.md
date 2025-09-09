# Workout Tracker Backend - Checklist con Supabase

## 🚀 FASE 1: CONFIGURACIÓN INICIAL
- [X] Configurar proyecto Node.js con TypeScript
- [X] Instalar dependencias principales (Express, @supabase/supabase-js)
- [X] Crear cuenta en Supabase y nuevo proyecto
- [X] Obtener Project URL y anon public key de Supabase
- [X] Crear estructura de carpetas organizada
- [X] Configurar variables de entorno (SUPABASE_URL, SUPABASE_ANON_KEY)
- [X] Configurar scripts de desarrollo
- [X] Inicializar cliente de Supabase

## 📊 FASE 2: DISEÑO DE BASE DE DATOS EN SUPABASE
- [ ] Acceder al SQL Editor de Supabase
- [ ] Crear tabla `users` con campos necesarios
- [ ] Crear tabla `exercises` con categorías y grupos musculares
- [ ] Crear tabla `workout_plans` relacionada con users
- [ ] Crear tabla `workout_exercises` (relación many-to-many)
- [ ] Crear tabla `scheduled_workouts` para programación
- [ ] Crear tabla `workout_sessions` para tracking
- [ ] Configurar relaciones y foreign keys
- [ ] Crear índices para optimizar consultas
- [ ] Poblar tabla exercises con datos semilla (INSERT statements)

## 🔐 FASE 3: SISTEMA DE AUTENTICACIÓN MANUAL
- [ ] Implementar registro de usuarios (INSERT en tabla users)
- [ ] Hashear contraseñas con bcrypt antes de guardar
- [ ] Implementar login verificando email/password
- [ ] Crear y validar JWT tokens manualmente
- [ ] Crear middleware de autenticación personalizado
- [ ] Implementar logout (blacklist de tokens o expiración)
- [ ] Validar que usuarios solo accedan a sus datos

## 🏋️ FASE 4: GESTIÓN DE ENTRENAMIENTOS
- [ ] CRUD de planes de entrenamiento usando Supabase client
- [ ] Agregar/remover ejercicios a planes (INSERT/DELETE en workout_exercises)
- [ ] Programar entrenamientos usando INSERT en scheduled_workouts
- [ ] Listar entrenamientos con filtros (SELECT con WHERE)
- [ ] Marcar entrenamientos como completados (UPDATE status)
- [ ] Validar ownership de datos con user_id

## 📈 FASE 5: TRACKING Y REPORTES
- [ ] Registrar sesiones de entrenamiento (INSERT en workout_sessions)
- [ ] Guardar progreso de cada ejercicio
- [ ] Consultas para generar reportes de progreso
- [ ] Estadísticas usando agregaciones SQL (COUNT, AVG, MAX)
- [ ] Análisis temporal con GROUP BY fecha
- [ ] Comparativas de rendimiento entre períodos

## 🛡️ FASE 6: VALIDACIÓN Y SEGURIDAD
- [ ] Validar datos de entrada en todos los endpoints
- [ ] Implementar rate limiting
- [ ] Sanitizar inputs para prevenir SQL injection
- [ ] Configurar Row Level Security (RLS) en Supabase como capa adicional
- [ ] Manejar errores de Supabase de forma consistente
- [ ] Logging de operaciones importantes

## 🧪 FASE 7: TESTING
- [ ] Configurar entorno de testing con BD separada
- [ ] Tests unitarios para servicios de negocio
- [ ] Tests de integración con Supabase
- [ ] Mocks del cliente Supabase para tests unitarios
- [ ] Tests de autenticación y autorización
- [ ] Tests de queries complejas

## 📚 FASE 8: DOCUMENTACIÓN
- [ ] Configurar OpenAPI/Swagger
- [ ] Documentar todos los endpoints
- [ ] Incluir ejemplos de requests/responses
- [ ] Documentar esquema de base de datos
- [ ] Crear README con setup de Supabase
- [ ] Documentar configuración de variables de entorno

## 🚀 FASE 9: OPTIMIZACIÓN Y DEPLOY
- [ ] Optimizar queries usando índices de Supabase
- [ ] Implementar connection pooling si es necesario
- [ ] Configurar CORS apropiadamente
- [ ] Utilizar funciones de Supabase si conviene
- [ ] Monitorear performance en Supabase Dashboard
- [ ] Configurar backup automático
- [ ] Preparar para deployment en producción

## 💡 CONCEPTOS CLAVE A APRENDER
- **Supabase Architecture**: Cliente JavaScript, REST API, Real-time
- **SQL Directo**: Escribir queries, joins, agregaciones
- **Database Design**: Normalización, índices, relaciones en PostgreSQL
- **Security**: RLS, JWT manual, validación, sanitización
- **REST APIs**: Diseño de endpoints, códigos de estado HTTP
- **Error Handling**: Manejo de errores de Supabase
- **Testing**: Mocking Supabase client, testing async operations
- **Performance**: Query optimization, connection management

## 📋 ENDPOINTS PRINCIPALES A IMPLEMENTAR

### Authentication (JWT Manual)
- `POST /auth/register` - Crear usuario y retornar JWT
- `POST /auth/login` - Validar credenciales y retornar JWT
- `POST /auth/logout` - Invalidar JWT

### Workout Plans
- `GET /workouts` - Listar planes del usuario
- `POST /workouts` - Crear nuevo plan
- `GET /workouts/:id` - Obtener plan específico
- `PUT /workouts/:id` - Actualizar plan
- `DELETE /workouts/:id` - Eliminar plan

### Exercises
- `GET /exercises` - Listar ejercicios disponibles
- `GET /exercises/:id` - Detalle de ejercicio
- `GET /exercises?category=strength` - Filtrar por categoría

### Scheduled Workouts
- `POST /schedule` - Programar entrenamiento
- `GET /schedule` - Ver entrenamientos programados
- `PUT /schedule/:id/complete` - Marcar como completado
- `GET /schedule?date=2025-01-15` - Entrenamientos por fecha

### Reports
- `GET /reports/progress` - Reporte de progreso general
- `GET /reports/stats` - Estadísticas de entrenamientos
- `GET /reports/exercise/:id` - Progreso de ejercicio específico

## 🔧 SETUP DE SUPABASE

### Configuración Inicial
- [ ] Crear proyecto en supabase.com
- [ ] Obtener Project URL y API Keys
- [ ] Configurar variables de entorno
- [ ] Testear conexión con cliente Supabase

### Configuración de Seguridad
- [ ] Configurar RLS policies para cada tabla
- [ ] Deshabilitar registro público si no lo necesitas
- [ ] Configurar CORS en Supabase settings
- [ ] Generar service role key para operaciones admin

---

## 🎯 ORDEN RECOMENDADO DE IMPLEMENTACIÓN
1. Setup inicial y conexión a Supabase
2. Crear tablas y relaciones en SQL Editor
3. Autenticación manual con JWT
4. CRUD básico de workout plans
5. Sistema de scheduling
6. Tracking de sesiones
7. Reportes con queries avanzadas
8. Testing y documentación
9. Optimizaciones y RLS

---

## 📝 NOTAS IMPORTANTES

### Dependencias principales a instalar:
```bash
npm install express @supabase/supabase-js
npm install jsonwebtoken bcryptjs
npm install cors helmet express-rate-limit
npm install -D @types/node @types/express typescript ts-node nodemon
```

### Estructura de carpetas sugerida:
```
src/
├── controllers/
├── middleware/
├── routes/
├── services/
├── utils/
├── types/
└── app.ts
```

### Variables de entorno (.env):
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=3000
```