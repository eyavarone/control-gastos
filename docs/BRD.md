# Business Requirements Document (BRD)
## Control Gastos

**Versión:** 1.0  
**Fecha:** 2024  
**Estado:** En elaboración

---

## 1. Visión del Proyecto

### 1.1 Descripción General
Control Gastos es una aplicación web para planificar, registrar y analizar los gastos mensuales de una familia. Permite gestionar presupuestos mensuales, confirmar montos de gastos según facturas recibidas, y llevar el control de pagos realizados.

### 1.2 Objetivos del Negocio
- Digitalizar el proceso actual de control de gastos en Excel
- Facilitar la planificación mensual de gastos e ingresos
- Permitir el seguimiento del estado de cada gasto (planeado, confirmado, pagado)
- Mejorar el análisis y visualización de los gastos familiares

### 1.3 Justificación
Actualmente se utiliza un Excel manual donde se copia mes a mes como template, lo cual es propenso a errores y difícil de mantener. La aplicación busca automatizar este proceso y proporcionar una mejor experiencia de usuario.

---

## 2. Alcance

### 2.1 Alcance Incluido
_[A completar - Funcionalidades y características que estarán incluidas]_

### 2.2 Alcance Excluido
_[A completar - Funcionalidades que NO estarán incluidas en esta versión]_

### 2.3 Supuestos
- Proyecto pequeño, doméstico, para hosting económico
- Usuarios: Múltiples usuarios, cada uno puede gestionar varios presupuestos
- Acceso: Aplicación web
- Autenticación: Integración con Google (OAuth)

---

## 3. Stakeholders

### 3.1 Usuarios Finales
Usuarios que gestionan sus propios presupuestos y pueden compartir presupuestos con otros usuarios.

### 3.2 Roles y Responsabilidades
- **Propietario**: Usuario que crea un presupuesto compartido
- **Colaborador**: Usuario que tiene acceso a un presupuesto compartido
- _[A definir - Si habrá diferentes niveles de permisos dentro de un presupuesto compartido]_

---

## 4. Requisitos Funcionales

### 4.1 Módulos Principales
_[A completar - Lista de módulos/features principales]_

#### 4.1.1 [Módulo 1]
- **Descripción:** _[A completar]_
- **Funcionalidades:**
  - _[A completar]_

#### 4.1.2 [Módulo 2]
- **Descripción:** _[A completar]_
- **Funcionalidades:**
  - _[A completar]_

_[Se irán agregando más módulos según se vayan definiendo]_

---

## 5. Requisitos No Funcionales

### 5.1 Performance
- Aplicación web responsiva
- Tiempos de respuesta aceptables para uso doméstico
- Optimización de consultas a base de datos
- Uso eficiente de Entity Framework (ver sección 15 - Arquitectura de Datos)

### 5.2 Seguridad
- Validación de todas las entradas
- Autenticación mediante Google OAuth 2.0
- Autorización: usuarios solo pueden acceder a presupuestos propios o compartidos con ellos
- Protección de datos sensibles
- HTTPS obligatorio en producción

### 5.3 Usabilidad
- **Diseño Visual:**
  - Estética limpia y minimalista, sin sobrecarga visual
  - Interfaz intuitiva y fácil de usar
  - Diseño moderno y profesional
- **Responsive Design:**
  - 100% responsive, optimizado para todos los tamaños de pantalla
  - Experiencia de usuario excelente tanto en PC como en dispositivos móviles
  - Adaptación fluida de layouts según el dispositivo
  - Touch-friendly en dispositivos móviles

### 5.4 Compatibilidad
- **Backend:** .NET 9
- **Frontend:** Angular (versión a definir)
- **Base de Datos:** SQLite (desarrollo), PostgreSQL (producción)

### 5.5 Mantenibilidad
- Código limpio y bien documentado
- Arquitectura escalable
- Cobertura de tests mínima del 80%

---

## 6. Casos de Uso

### 6.1 Crear Mes Nuevo (Manual)
**Actor:** Usuario  
**Precondiciones:** 
- Usuario autenticado
- Usuario tiene acceso a un Hogar
- No existe un mes con el mismo año-mes en ese Hogar

**Flujo Principal:**
1. Usuario selecciona "Crear Mes Nuevo"
2. Usuario ingresa año y mes
3. Usuario agrega gastos e ingresos manualmente uno por uno
4. Usuario confirma la creación del mes

**Flujos Alternativos:**
- Usuario cancela la creación antes de confirmar

**Postcondiciones:**
- Se crea un nuevo mes con los gastos e ingresos ingresados
- Todos los gastos e ingresos quedan en estado Pendiente
- Todos los montos pagados/recibidos están en 0

---

### 6.2 Crear Mes desde Template
**Actor:** Usuario  
**Precondiciones:** 
- Usuario autenticado
- Usuario tiene acceso a un Hogar (puede ser diferente al del template)
- Existe al menos un mes anterior para usar como template
- No existe un mes con el mismo año-mes en el Hogar destino

**Flujo Principal:**
1. Usuario selecciona "Crear Mes desde Template"
2. Usuario selecciona el Hogar y mes a copiar
3. Sistema muestra pantalla de previsualización con:
   - Lista de gastos a copiar (con MontoAdeudado del mes anterior)
   - Lista de ingresos a copiar (con MontoEsperado del mes anterior)
   - Totalizadores previos
4. Usuario puede:
   - Eliminar gastos/ingresos que no desea copiar
   - Agregar nuevos gastos/ingresos manualmente
   - Modificar montos antes de confirmar
5. Usuario ingresa año y mes para el nuevo mes
6. Usuario confirma la creación
7. Sistema crea el nuevo mes con los gastos/ingresos seleccionados

**Flujos Alternativos:**
- Usuario cancela antes de confirmar → no se crea el mes
- Usuario elimina todos los gastos/ingresos → puede crear un mes vacío (o validar que tenga al menos uno)

**Postcondiciones:**
- Se crea un nuevo mes con los gastos e ingresos seleccionados
- Todos los gastos e ingresos quedan en estado Pendiente
- Todos los MontoPagado/Recibido están en 0
- Los MontoAdeudado/Esperado son los del template (o modificados por el usuario)

---

_[Se irán agregando más casos de uso]_

---

## 7. Reglas de Negocio

### 7.1 Reglas Generales

#### 7.1.1 Gestión de Gastos e Ingresos
- Cada mes se puede crear desde cero (manual) o basándose en un mes anterior como template
- Los gastos e ingresos pueden ser **fijos** (se repiten todos los meses) o **variables** (pueden variar en monto o existencia)
- Los gastos e ingresos tienen los mismos estados y reglas de negocio

#### 7.1.2 Estados de Gastos e Ingresos
- **Pendiente (Rojo)**: Monto no confirmado, es una estimación inicial. El gasto/ingreso tiene MontoAdeudado/Esperado pero aún no está confirmado.
- **Confirmado (Verde)**: Monto verificado según facturas recibidas (para gastos) o confirmado (para ingresos). El usuario marca manualmente como confirmado, o automáticamente cuando se paga/recibe completamente.
- **Pagado/Recibido**: Estado calculado automáticamente cuando MontoPagado/Recibido > 0. Si MontoPagado/Recibido == MontoAdeudado/Esperado, está completamente pagado/recibido.

#### 7.1.3 Reglas de Transición de Estados
- **Confirmación**: El usuario puede marcar manualmente un gasto/ingreso como Confirmado, o automáticamente queda confirmado cuando se paga/recibe completamente (MontoPagado == MontoAdeudado)
- **Pago sin confirmar**: Un gasto/ingreso puede pagarse/recibirse sin confirmar previamente → automáticamente queda confirmado por el monto pagado/recibido
- **Modificación de monto confirmado**: El monto de un gasto/ingreso confirmado se puede modificar siempre que el nuevo monto sea mayor o igual al monto pagado/recibido
- **Pago parcial**: Un gasto/ingreso puede quedar parcialmente pagado/recibido (MontoPagado < MontoAdeudado)

#### 7.1.4 Template y Copia de Mes
- Un mes se puede crear de dos formas:
  - **Manual**: Crear desde cero, agregando gastos e ingresos manualmente
  - **Desde template**: Copiar desde un mes anterior (puede ser del mismo hogar u otro)
- Al copiar un mes como template:
  - Se copian tanto gastos como ingresos
  - Se copia el **MontoAdeudado/Esperado** del mes anterior como estimación inicial
  - El **MontoPagado/Recibido** se inicializa en **0** (cero)
  - Todos los gastos e ingresos copiados quedan en estado **Pendiente (Rojo)**
  - Se debe mostrar una pantalla de **previsualización** donde el usuario puede:
    - Eliminar gastos/ingresos que no quiere copiar
    - Agregar nuevos gastos/ingresos manualmente
    - Modificar montos antes de confirmar la creación del mes

#### 7.1.5 Categorías
- Los gastos deben tener al menos una categoría
- Un gasto puede tener múltiples categorías (relación muchos a muchos)

#### 7.1.6 Totalizadores
- Los totalizadores se calculan para el mes en curso y muestran:
  - **Ingresos**: Total de MontoEsperado y MontoRecibido de ingresos
  - **Gastos Fijos**: Total de MontoAdeudado y MontoPagado de gastos fijos
  - **Gastos Variables**: Total de MontoAdeudado y MontoPagado de gastos variables
- Se muestran ambos montos (adeudado/esperado y pagado/recibido) para permitir comparación

#### 7.1.7 Multi-usuario y Presupuestos Compartidos
- Cada usuario puede gestionar múltiples presupuestos (ej: "Hogar", "Personal")
- Un presupuesto puede ser compartido con múltiples usuarios
- Múltiples usuarios pueden gestionar el mismo presupuesto

### 7.2 Validaciones
- Un gasto/ingreso debe tener concepto y monto adeudado/esperado
- El monto pagado/recibido no puede exceder el monto adeudado/esperado
- Los meses deben ser únicos por año dentro de un mismo hogar (año-mes único por hogar)
- Un gasto debe tener al menos una categoría
- Al modificar el monto adeudado/esperado de un gasto/ingreso confirmado, el nuevo monto debe ser mayor o igual al monto pagado/recibido
- MontoAdeudado/Esperado y MontoPagado/Recibido deben ser valores positivos o cero

---

## 8. Modelo de Datos

### 8.1 Entidades Principales

#### 8.1.1 Usuario
- **Descripción:** Usuario del sistema autenticado mediante Google OAuth
- **Atributos:**
  - Id (identificador único)
  - Email (desde Google)
  - Nombre (desde Google)
  - GoogleId (ID de Google OAuth)
  - Fecha de creación
- **Relaciones:**
  - Puede ser propietario de múltiples Presupuestos
  - Puede ser colaborador en múltiples Presupuestos (a través de PresupuestoUsuario)

#### 8.1.2 Hogar
- **Descripción:** Entidad que agrupa los presupuestos mensuales. Puede representar un hogar, presupuesto personal, etc.
- **Atributos:**
  - Id
  - Nombre (ej: "Mi Hogar", "Presupuesto Personal")
  - Descripción (opcional)
  - Usuario propietario
  - Fecha de creación
  - Fecha de última modificación
- **Relaciones:**
  - Tiene múltiples Meses
  - Pertenece a un Usuario (propietario)
  - Puede tener múltiples Usuarios colaboradores (a través de PresupuestoUsuario)

#### 8.1.3 PresupuestoUsuario
- **Descripción:** Relación muchos a muchos entre Presupuesto y Usuario (colaboradores)
- **Atributos:**
  - PresupuestoId
  - UsuarioId
  - Fecha de invitación
  - Rol _(pendiente definir si hay diferentes roles)_
- **Relaciones:**
  - Pertenece a un Presupuesto
  - Pertenece a un Usuario

#### 8.1.4 Mes
- **Descripción:** Período mensual (año-mes) que contiene los gastos e ingresos dentro de un presupuesto
- **Atributos:**
  - Id
  - Año
  - Mes (1-12)
  - PresupuestoId
  - Fecha de creación
  - Fecha de última modificación
- **Relaciones:**
  - Pertenece a un Presupuesto
  - Tiene múltiples Gastos
  - Tiene múltiples Ingresos
- **Constraints:**
  - Único por Presupuesto (año-mes único dentro de un presupuesto)

#### 8.1.5 Gasto
- **Descripción:** Egreso registrado en un mes
- **Atributos:**
  - Id
  - Concepto (descripción del gasto)
  - MontoAdeudado (monto a pagar)
  - MontoPagado (monto efectivamente pagado, inicializado en 0)
  - EstaConfirmado (bool - indica si el usuario confirmó el monto)
  - Tipo (Fijo/Variable)
  - MesId
  - Fecha de creación
  - Fecha de última modificación
- **Relaciones:**
  - Pertenece a un Mes
  - Puede tener múltiples Categorías (a través de GastoCategoria)
- **Notas:**
  - El estado "Pendiente/Confirmado/Pagado" es calculado: 
    - Pendiente: !EstaConfirmado && MontoPagado == 0
    - Confirmado: EstaConfirmado || (MontoPagado > 0)
    - Pagado: MontoPagado > 0 (completamente pagado si MontoPagado == MontoAdeudado)

#### 8.1.6 Ingreso
- **Descripción:** Ingreso registrado en un mes
- **Atributos:**
  - Id
  - Concepto (descripción del ingreso)
  - MontoEsperado (monto esperado/planeado)
  - MontoRecibido (monto efectivamente recibido, inicializado en 0)
  - EstaConfirmado (bool - indica si el usuario confirmó el monto)
  - Tipo (Fijo/Variable)
  - MesId
  - Fecha de creación
  - Fecha de última modificación
- **Relaciones:**
  - Pertenece a un Mes
- **Notas:**
  - El estado "Pendiente/Confirmado/Recibido" es calculado:
    - Pendiente: !EstaConfirmado && MontoRecibido == 0
    - Confirmado: EstaConfirmado || (MontoRecibido > 0)
    - Recibido: MontoRecibido > 0 (completamente recibido si MontoRecibido == MontoEsperado)

#### 8.1.7 Categoria
- **Descripción:** Categoría para clasificar gastos
- **Atributos:**
  - Id
  - Nombre (ej: "Alimentación", "Servicios", "Transporte")
  - Descripción (opcional)
  - Color (opcional, para visualización)
  - PresupuestoId (opcional - si las categorías son específicas por presupuesto) o Global
- **Relaciones:**
  - Puede estar asociada a múltiples Gastos (a través de GastoCategoria)

#### 8.1.8 GastoCategoria
- **Descripción:** Relación muchos a muchos entre Gasto y Categoria
- **Atributos:**
  - GastoId
  - CategoriaId
- **Relaciones:**
  - Pertenece a un Gasto
  - Pertenece a una Categoria

_[El modelo puede expandirse según se definan más detalles]_

---

## 9. Interfaz de Usuario

### 9.1 Principios de Diseño

#### 9.1.1 Estética Visual
- **Minimalismo**: Diseño limpio, sin elementos innecesarios que distraigan
- **Espaciado adecuado**: Uso generoso de espacios en blanco para mejorar legibilidad
- **Jerarquía visual clara**: Elementos importantes destacados, información secundaria menos prominente
- **Consistencia**: Mismos patrones de diseño en toda la aplicación

#### 9.1.2 Responsive Design
- **Mobile First**: Diseño pensado primero para móviles, luego escalado a desktop
- **Breakpoints**: Adaptación fluida en tablets y pantallas grandes
- **Touch Targets**: Botones y elementos interactivos con tamaño adecuado para touch (mínimo 44x44px)
- **Navegación adaptativa**: Menús y navegación que se adaptan al tamaño de pantalla (ej: hamburger menu en móvil)

#### 9.1.3 Usabilidad
- **Navegación intuitiva**: Flujos claros y predecibles
- **Feedback visual**: Indicadores claros de acciones (hover, active, loading states)
- **Accesibilidad**: Contraste adecuado, textos legibles, soporte para lectores de pantalla
- **Carga rápida**: Optimización de imágenes y recursos para carga rápida en móvil

### 9.2 Pantallas Principales
_[A completar - Lista de pantallas/vistas principales según se vayan definiendo]_

### 9.3 Flujos de Navegación
_[A completar - Cómo navegará el usuario por la aplicación]_

### 9.4 Elementos Visuales Específicos

#### 9.4.1 Estados de Gastos/Ingresos
- **Pendiente (Rojo)**: Indicador visual rojo claro para gastos/ingresos pendientes
- **Confirmado (Verde)**: Indicador visual verde claro para gastos/ingresos confirmados
- **Pagado/Recibido**: Indicador visual adicional o cambio de estilo para elementos pagados/recibidos

#### 9.4.2 Totalizadores
- Visualización clara y destacada de totales
- Comparación visual entre montos adeudados/esperados vs pagados/recibidos
- Uso de colores o iconos para diferenciar Ingresos, Gastos Fijos y Gastos Variables

---

## 10. Integraciones

### 10.1 Integraciones Externas

#### 10.1.1 Google OAuth
- **Propósito:** Autenticación de usuarios
- **Tecnología:** Google OAuth 2.0
- **Datos obtenidos:** Email, nombre, ID de usuario de Google
- **Alcance:** Autenticación y creación de cuenta (usando email de Gmail)

### 10.2 APIs Externas
- Google Identity Platform (OAuth 2.0)

---

## 11. Restricciones y Limitaciones

### 11.1 Técnicas
- Hosting económico (limita recursos disponibles)
- Proyecto pequeño/doméstico

### 11.2 De Negocio
_[A completar - Restricciones de negocio si las hay]_

---

## 12. Glosario

- **Hogar**: Entidad que agrupa los presupuestos mensuales. Un usuario puede tener múltiples hogares (ej: "Mi Hogar", "Presupuesto Personal") y compartirlos con otros usuarios.

- **Mes**: Período mensual (año-mes) dentro de un presupuesto que contiene gastos e ingresos.

- **Gasto Fijo**: Gastos que se repiten todos los meses con monto predecible (ej: alquiler, luz, internet)

- **Gasto Variable**: Gastos que pueden variar en monto o no existir en todos los meses (ej: gastos médicos, reparaciones)

- **Monto Adeudado (Gastos)**: Cantidad de dinero que se debe pagar por un gasto

- **Monto Esperado (Ingresos)**: Cantidad de dinero que se espera recibir por un ingreso

- **Monto Pagado/Recibido**: Cantidad de dinero efectivamente pagada (gastos) o recibida (ingresos)

- **Estado Pendiente (Rojo)**: El gasto/ingreso está planeado pero el monto aún no está confirmado. Se calcula cuando: !EstaConfirmado && MontoPagado/Recibido == 0

- **Estado Confirmado (Verde)**: El gasto/ingreso tiene un monto confirmado (el usuario lo marcó manualmente o se confirmó automáticamente al pagar/recibir completamente). Se calcula cuando: EstaConfirmado || (MontoPagado/Recibido > 0)

- **Estado Pagado/Recibido**: Se ha registrado el monto efectivamente pagado/recibido. Puede ser parcial (MontoPagado < MontoAdeudado). Se calcula cuando: MontoPagado/Recibido > 0. Está completamente pagado cuando MontoPagado == MontoAdeudado

- **Template**: Estructura de un mes anterior que se utiliza como base para crear un nuevo mes. Se copian los gastos e ingresos con sus MontoAdeudado/Esperado, pero todos quedan en estado Pendiente y con MontoPagado/Recibido = 0.

- **Previsualización de Template**: Pantalla que muestra los gastos e ingresos que se van a copiar, permitiendo al usuario eliminar, agregar o modificar antes de confirmar la creación del mes.

- **Categoría**: Clasificación de gastos. Un gasto puede tener múltiples categorías.

- **Colaborador**: Usuario que tiene acceso a un presupuesto compartido por otro usuario.

---

## 13. Arquitectura de Datos y Entity Framework

### 13.1 ORM y Framework
- **Entity Framework Core**: ORM principal para acceso a datos
- **Versión**: Compatible con .NET 9
- **Proveedores**: 
  - SQLite (desarrollo)
  - Npgsql para PostgreSQL (producción)

### 13.2 Buenas Prácticas de Performance

#### 13.2.1 Configuración del DbContext
- **Lifetime**: Scoped (una instancia por request HTTP)
- **Connection Pooling**: Habilitado por defecto en EF Core
- **Query Tracking**: Deshabilitar tracking cuando no sea necesario (`AsNoTracking()`)
- **Lazy Loading**: **DESHABILITADO** por defecto para evitar N+1 queries
- **Change Tracking**: Solo habilitar cuando se necesite modificar entidades

#### 13.2.2 Estrategias de Carga (Loading Strategies)
- **Eager Loading**: Usar `Include()` explícitamente cuando se necesiten relaciones
  ```csharp
  // ✅ Correcto: Cargar relaciones necesarias explícitamente
  var mes = await context.Meses
      .Include(m => m.Gastos)
      .Include(m => m.Ingresos)
      .FirstOrDefaultAsync(m => m.Id == mesId);
  ```
- **Projection**: Usar `Select()` para cargar solo campos necesarios
  ```csharp
  // ✅ Correcto: Solo cargar campos necesarios
  var totales = await context.Gastos
      .Where(g => g.MesId == mesId)
      .Select(g => new { g.MontoAdeudado, g.MontoPagado })
      .ToListAsync();
  ```
- **Explicit Loading**: Usar `Load()` solo cuando sea necesario cargar relaciones después
- **Split Queries**: Considerar `AsSplitQuery()` para relaciones complejas que generen cartesian explosion

#### 13.2.3 Consultas Optimizadas
- **AsNoTracking()**: Usar siempre en consultas de solo lectura
  ```csharp
  // ✅ Correcto: Sin tracking para consultas de solo lectura
  var gastos = await context.Gastos
      .AsNoTracking()
      .Where(g => g.MesId == mesId)
      .ToListAsync();
  ```
- **Filtrado temprano**: Aplicar `Where()` antes de `Include()` o `Select()`
- **Paginación**: Implementar paginación para listas grandes
  ```csharp
  var gastos = await context.Gastos
      .AsNoTracking()
      .Where(g => g.MesId == mesId)
      .Skip((page - 1) * pageSize)
      .Take(pageSize)
      .ToListAsync();
  ```
- **Compiled Queries**: Considerar para consultas que se ejecutan frecuentemente con diferentes parámetros

#### 13.2.4 Índices de Base de Datos
- **Claves primarias**: Automáticas en EF Core
- **Índices explícitos**: Crear índices para campos frecuentemente consultados
  - `Hogar.UsuarioPropietarioId` (para filtrar hogares por usuario)
  - `Mes.HogarId + Mes.Año + Mes.Mes` (para búsquedas por hogar y período)
  - `Gasto.MesId` (para filtrar gastos por mes)
  - `Ingreso.MesId` (para filtrar ingresos por mes)
  - `PresupuestoUsuario.UsuarioId` (para buscar colaboraciones)
  - `PresupuestoUsuario.HogarId` (para buscar colaboradores de un hogar)

#### 13.2.5 Operaciones en Batch
- **SaveChanges()**: Agrupar múltiples cambios antes de llamar `SaveChangesAsync()`
- **Bulk Operations**: Para operaciones masivas, considerar bibliotecas como `EFCore.BulkExtensions` si es necesario
- **Transacciones**: Usar transacciones explícitas solo cuando sea necesario

#### 13.2.6 Evitar Problemas Comunes
- **N+1 Queries**: Siempre usar `Include()` o projection en lugar de cargar relaciones en loops
  ```csharp
  // ❌ Incorrecto: N+1 queries
  var meses = await context.Meses.ToListAsync();
  foreach (var mes in meses)
  {
      await context.Entry(mes).Collection(m => m.Gastos).LoadAsync(); // N queries!
  }
  
  // ✅ Correcto: Una sola query
  var meses = await context.Meses
      .Include(m => m.Gastos)
      .ToListAsync();
  ```
- **Select N+1**: Evitar cargar todas las entidades cuando solo se necesitan algunos campos
- **Cartesian Explosion**: Usar `AsSplitQuery()` cuando hay múltiples `Include()` que pueden generar productos cartesianos grandes

#### 13.2.7 Caching
- **Application-level caching**: Considerar caching en memoria para datos que cambian poco (ej: categorías)
- **Query Result Caching**: Solo para datos que no cambian frecuentemente
- **Cache invalidation**: Implementar estrategia clara de invalidación de cache

#### 13.2.8 Migrations y Schema

##### Estrategia de Migrations
- **Versionado de Esquema**: Usar EF Core Migrations como única fuente de verdad para el esquema de base de datos
- **Versionado Claro**: Cada migration representa un cambio incremental y versionado del esquema
- **Historial Completo**: Mantener todas las migrations en el repositorio para poder recrear cualquier versión del esquema

##### Creación de Migrations
- **Naming Convention**: Usar nombres descriptivos que indiquen el cambio
  - Formato: `YYYYMMDD_HHMMSS_DescripcionDelCambio`
  - Ejemplo: `20241215_143022_AddCategoriaToGasto`, `20241220_091500_AddIndexToMes`
- **Comandos**:
  ```bash
  # Crear nueva migration
  dotnet ef migrations add NombreDescriptivo --project Infrastructure --startup-project Web
  
  # Ver estado de migrations
  dotnet ef migrations list --project Infrastructure --startup-project Web
  ```
- **Revisión**: Revisar el código generado de cada migration antes de commitear
- **Una migration por cambio**: Crear migrations pequeñas y específicas en lugar de una grande con múltiples cambios

##### Aplicación de Migrations en Deployment

**Desarrollo:**
- Aplicar migrations manualmente durante desarrollo
- Comando: `dotnet ef database update --project Infrastructure --startup-project Web`

**Producción:**
- **Opción 1 (Recomendada)**: Aplicar migrations automáticamente al iniciar la aplicación
  - Usar `context.Database.Migrate()` en el startup (solo en producción)
  - O usar `IHostApplicationLifetime` para aplicar migrations al inicio
- **Opción 2**: Aplicar migrations manualmente como parte del proceso de deployment
  - Script de deployment que ejecuta `dotnet ef database update`
  - Útil para validar migrations antes de iniciar la aplicación

**Consideraciones:**
- Las migrations deben ser **idempotentes** (pueden ejecutarse múltiples veces sin error)
- Validar que la base de datos esté disponible antes de aplicar migrations
- Logging claro de qué migrations se están aplicando

##### Seed Data
- **Datos Iniciales**: Usar `HasData()` en las entidades o migrations para datos iniciales
- **Categorías por Defecto**: Crear migration inicial con categorías comunes
- **Datos de Prueba**: Separar datos de prueba (solo en desarrollo) de datos iniciales (producción)

##### Índices en Migrations
- Definir índices explícitamente en las entidades usando Data Annotations o Fluent API
- O crear migrations específicas para índices si se agregan después
- Documentar el propósito de cada índice en comentarios

##### Rollback y Reversión
- **Down Migrations**: EF Core genera automáticamente métodos `Down()` para revertir cambios
- **Rollback Manual**: Usar `dotnet ef database update NombreMigrationAnterior` para revertir a una versión específica
- **Precaución**: En producción, validar que el rollback no cause pérdida de datos

##### Estructura de Archivos
```
Infrastructure/
  Migrations/
    20241215_143022_InitialCreate.cs
    20241215_143022_InitialCreate.Designer.cs
    20241220_091500_AddIndexToMes.cs
    20241220_091500_AddIndexToMes.Designer.cs
    ApplicationDbContextModelSnapshot.cs
```

##### Buenas Prácticas
- **No modificar migrations existentes**: Si hay un error, crear una nueva migration que lo corrija
- **Probar migrations**: Probar cada migration en desarrollo antes de commitear
- **Backup antes de aplicar**: En producción, hacer backup antes de aplicar migrations importantes
- **Documentar cambios complejos**: Agregar comentarios en migrations complejas
- **Separar cambios de esquema y datos**: Si hay cambios de datos masivos, considerar scripts SQL separados

### 13.3 Configuración de Repositorios
- **Patrón Repository**: Implementar en capa Infrastructure
- **Unit of Work**: Considerar si se necesitan transacciones complejas
- **Especificaciones**: Considerar patrón Specification para queries complejas reutilizables

### 13.4 Monitoreo y Profiling
- **Logging de Queries**: Habilitar logging de SQL en desarrollo para detectar queries ineficientes
- **Query Performance**: Revisar queries generadas por EF Core
- **Connection Pooling**: Monitorear uso de conexiones en producción

### 13.5 Consideraciones Específicas del Proyecto
- **Hosting Económico**: Optimizar para recursos limitados
- **Volumen de Datos**: Proyecto doméstico, pero mantener buenas prácticas para escalabilidad futura
- **Consultas Frecuentes**:
  - Listado de hogares del usuario
  - Mes actual con gastos e ingresos
  - Totalizadores del mes
  - Búsqueda de meses anteriores para template

---

## 14. Cronograma y Fases

### 13.1 Fases del Proyecto
_[A completar - Fases o milestones principales]_

### 13.2 Prioridades
_[A completar - Qué funcionalidades son críticas vs. nice-to-have]_

---

## 15. Notas y Observaciones

### 15.1 Decisiones Pendientes
- **Nombre de la entidad que agrupa presupuestos**: ✅ **DEFINIDO: "Hogar"**
- **Roles y permisos en presupuestos compartidos**: Definir si habrá diferentes niveles de permisos (ej: Editor, Solo lectura)
- **Categorías globales vs. por presupuesto**: Definir si las categorías son globales para todos los usuarios o específicas por presupuesto

### 15.2 Funcionalidades para Fase 2
- Análisis y reportes (comparación entre meses, totales, etc.)
- Cálculo de saldos y disponibilidad
- Dashboard con resumen mensual/anual
- Totalizadores por categoría (actualmente solo por Tipo: Fijo/Variable)

---

## Historial de Cambios

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 2024 | - | Documento inicial creado |


