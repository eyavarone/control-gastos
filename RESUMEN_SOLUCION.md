# Resumen Ejecutivo - Control Gastos
## Solución Completa

---

## 1. Visión General

**Control Gastos** es una aplicación web para planificar, registrar y analizar los gastos mensuales de una familia. Reemplaza el proceso manual actual basado en Excel, automatizando la gestión de presupuestos mensuales con seguimiento de estados (pendiente, confirmado, pagado) y facilitando el análisis de gastos familiares.

---

## 2. Stack Tecnológico

### Backend
- **.NET 9** (C#)
- **Entity Framework Core** (ORM)
- **Arquitectura**: Domain-Driven Design (DDD)
  - **Web**: Controllers, API endpoints, configuración
  - **Domain**: Entidades, value objects, interfaces de repositorios, lógica de negocio
  - **Infrastructure**: Implementación de repositorios, acceso a datos, servicios externos

### Frontend
- **Angular** (estructura modular)
- **100% Responsive** (Mobile First)
- Diseño limpio, minimalista e intuitivo

### Base de Datos
- **Desarrollo**: SQLite
- **Producción**: PostgreSQL
- **Migrations**: EF Core Migrations para versionado y deployment

### Autenticación
- **Google OAuth 2.0** (integración con Gmail)

---

## 3. Modelo de Datos

### Entidades Principales

1. **Usuario**
   - Autenticado mediante Google OAuth
   - Puede ser propietario de múltiples Hogares
   - Puede ser colaborador en múltiples Hogares

2. **Hogar**
   - Agrupa presupuestos mensuales
   - Un usuario puede tener múltiples hogares (ej: "Mi Hogar", "Presupuesto Personal")
   - Puede ser compartido con otros usuarios

3. **PresupuestoUsuario**
   - Relación muchos a muchos entre Hogar y Usuario (colaboradores)

4. **Mes**
   - Período mensual (año-mes) dentro de un Hogar
   - Contiene gastos e ingresos
   - Único por Hogar (año-mes único)

5. **Gasto**
   - Concepto, MontoAdeudado, MontoPagado
   - Tipo: Fijo o Variable
   - Estado calculado: Pendiente/Confirmado/Pagado
   - Puede tener múltiples Categorías

6. **Ingreso**
   - Concepto, MontoEsperado, MontoRecibido
   - Tipo: Fijo o Variable
   - Estado calculado: Pendiente/Confirmado/Recibido

7. **Categoria**
   - Clasificación de gastos
   - Relación muchos a muchos con Gastos

---

## 4. Funcionalidades Principales

### 4.1 Gestión de Presupuestos Mensuales

#### Crear Mes (Manual)
- Usuario crea un mes desde cero
- Agrega gastos e ingresos manualmente
- Todos quedan en estado Pendiente

#### Crear Mes desde Template
- Copiar un mes anterior como base
- Pantalla de previsualización donde el usuario puede:
  - Eliminar gastos/ingresos que no quiere copiar
  - Agregar nuevos gastos/ingresos
  - Modificar montos antes de confirmar
- Se copia MontoAdeudado/Esperado, MontoPagado/Recibido = 0
- Todos quedan en estado Pendiente

### 4.2 Estados de Gastos e Ingresos

- **Pendiente (Rojo)**: Monto no confirmado, estimación inicial
- **Confirmado (Verde)**: Monto verificado (manual o automático al pagar completamente)
- **Pagado/Recibido**: Estado calculado cuando hay monto pagado/recibido

### 4.3 Reglas de Negocio

- Pago sin confirmar → automáticamente queda confirmado
- Modificación de monto confirmado: nuevo monto ≥ monto pagado
- Pagos parciales permitidos
- Totalizadores del mes: Ingresos, Gastos Fijos, Gastos Variables
- Muestra ambos montos (adeudado/esperado y pagado/recibido)

### 4.4 Multi-usuario

- Cada usuario puede gestionar múltiples Hogares
- Un Hogar puede ser compartido con múltiples usuarios
- Múltiples usuarios pueden gestionar el mismo Hogar

### 4.5 Categorías

- Los gastos deben tener al menos una categoría
- Un gasto puede tener múltiples categorías

---

## 5. Arquitectura y Performance

### 5.1 Entity Framework - Buenas Prácticas

- **Lazy Loading**: DESHABILITADO
- **Query Tracking**: Usar `AsNoTracking()` para consultas de solo lectura
- **Eager Loading**: Usar `Include()` explícitamente
- **Projection**: Usar `Select()` para cargar solo campos necesarios
- **Paginación**: Para listas grandes
- **Índices**: Definidos para campos frecuentemente consultados

### 5.2 Migrations

- **Versionado claro**: Cada migration representa un cambio incremental
- **Naming**: `YYYYMMDD_HHMMSS_DescripcionDelCambio`
- **Deployment**: Aplicación automática o manual en producción
- **Historial completo**: Todas las migrations en el repositorio

### 5.3 Optimizaciones

- Evitar N+1 queries
- Connection pooling habilitado
- Caching para datos que cambian poco (categorías)
- Consultas optimizadas con filtrado temprano

---

## 6. Diseño de Interfaz

### 6.1 Principios

- **Minimalismo**: Diseño limpio, sin sobrecarga visual
- **Espaciado adecuado**: Uso generoso de espacios en blanco
- **Jerarquía visual clara**: Elementos importantes destacados
- **Consistencia**: Mismos patrones en toda la aplicación

### 6.2 Responsive Design

- **Mobile First**: Diseño pensado primero para móviles
- **100% Responsive**: Optimizado para todos los tamaños
- **Touch-friendly**: Botones con tamaño adecuado (mínimo 44x44px)
- **Navegación adaptativa**: Menús que se adaptan al tamaño

### 6.3 Elementos Visuales

- **Estados**: Rojo (Pendiente), Verde (Confirmado)
- **Totalizadores**: Visualización clara y destacada
- **Feedback visual**: Indicadores de acciones (hover, loading)

---

## 7. Seguridad

- **Autenticación**: Google OAuth 2.0
- **Autorización**: Usuarios solo acceden a sus propios Hogares o compartidos con ellos
- **Validación**: FluentValidation para todas las entradas
- **HTTPS**: Obligatorio en producción
- **Protección de datos**: Validación y sanitización de entradas

---

## 8. Calidad y Mantenibilidad

### 8.1 Código

- **Clean Code**: Principios de código limpio
- **Documentación**: Comentarios XML en todos los métodos (C#)
- **SOLID**: Aplicación de principios SOLID
- **DRY**: Evitar duplicación

### 8.2 Testing

- **Backend**: xUnit (cobertura mínima 80%)
- **Frontend**: Jasmine + Karma (cobertura mínima 80%)
- **Naming**: `MethodName_Scenario_ExpectedResult`

### 8.3 Manejo de Errores

- **Middleware centralizado**: Manejo global de excepciones
- **Excepciones personalizadas**: BusinessException, ValidationException, etc.
- **Logging**: Registro de todas las excepciones con contexto
- **Mapeo**: Excepciones mapeadas a respuestas HTTP apropiadas

---

## 9. Integraciones

- **Google OAuth 2.0**: Autenticación de usuarios
- **Datos obtenidos**: Email, nombre, ID de Google

---

## 10. Deployment

### 10.1 Migrations

- **Desarrollo**: Aplicación manual
- **Producción**: Automática al iniciar o manual en proceso de deployment
- **Backup**: Antes de aplicar migrations importantes

### 10.2 Configuración

- **Environments**: Archivos de configuración por ambiente
- **Connection Strings**: Configurados en appsettings por ambiente
- **Secrets**: No committear información sensible

---

## 11. Decisiones Pendientes

- **Roles y permisos**: Definir si habrá diferentes niveles en presupuestos compartidos
- **Categorías**: Globales vs. específicas por presupuesto
- **Análisis y reportes**: Para Fase 2
- **Dashboard**: Para Fase 2

---

## 12. Funcionalidades Futuras (Fase 2)

- Análisis y reportes (comparación entre meses, totales)
- Cálculo de saldos y disponibilidad
- Dashboard con resumen mensual/anual
- Totalizadores por categoría

---

## 13. Restricciones

- **Hosting económico**: Optimizado para recursos limitados
- **Proyecto doméstico**: Pequeño, pero con código escalable
- **Mantenibilidad**: Priorizar código mantenible sobre optimizaciones prematuras

---

## 14. Casos de Uso Documentados

1. **Crear Mes Nuevo (Manual)**: Usuario crea mes desde cero agregando gastos e ingresos
2. **Crear Mes desde Template**: Usuario copia mes anterior con previsualización y edición

---

## 15. Validaciones

- Concepto y monto requeridos
- Monto pagado ≤ monto adeudado
- Meses únicos por año dentro de un Hogar
- Gasto debe tener al menos una categoría
- Modificación de monto confirmado: nuevo monto ≥ monto pagado
- Montos deben ser positivos o cero

---

## Conclusión

La solución **Control Gastos** está diseñada para ser:
- **Simple y fácil de usar**: Interfaz intuitiva, responsive
- **Robusta**: Arquitectura sólida, buenas prácticas, testing
- **Performante**: Optimizaciones de EF Core, índices, caching
- **Escalable**: Código mantenible, arquitectura DDD
- **Segura**: Autenticación OAuth, validaciones, manejo de errores

Lista para comenzar el desarrollo siguiendo las reglas y mejores prácticas definidas.

