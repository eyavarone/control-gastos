# Control Gastos

Aplicación web para planificar, registrar y analizar gastos mensuales familiares.

## 📁 Estructura del Proyecto

```
control-gastos/
├── docs/              # Documentación (BRD, resúmenes, arquitectura)
├── frontend/          # Aplicación Angular
├── backend/           # API .NET (próximamente)
└── README.md
```

## 🚀 Frontend (Angular)

### Requisitos
- Node.js 18+ o 20+ (LTS recomendado)
- Angular CLI 17+

### Instalación

```bash
cd frontend
npm install
```

### Ejecución en Desarrollo

```bash
cd frontend
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

### Scripts Disponibles

```bash
npm start          # Inicia el servidor de desarrollo
npm run build      # Construye la aplicación para producción
npm test           # Ejecuta los tests
npm run watch      # Construye y observa cambios
```

## 🎨 Diseño

- **Estilo**: Minimalista, limpio, sin sobrecarga visual
- **Responsive**: 100% responsive, optimizado para PC y móvil
- **Mobile First**: Diseño pensado primero para móviles

## 📊 Estado Actual

### ✅ Completado
- Estructura base del proyecto Angular
- Modelos TypeScript (Usuario, Hogar, Mes, Gasto, Ingreso, Categoria)
- Servicio mock con datos de ejemplo
- Componente de lista de hogares
- Rutas básicas configuradas
- Estilos globales y diseño responsive

### 🚧 En Progreso
- Vista de mes con gastos e ingresos
- Componentes de totalizadores
- Componentes de items de gasto e ingreso

### 📋 Pendiente
- Formularios para crear/editar
- Funcionalidad de template (copiar mes)
- Integración con backend
- Autenticación con Google OAuth

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Angular 17+
- **Lenguaje**: TypeScript
- **Estilo**: CSS (standalone)
- **Arquitectura**: Standalone Components

### Backend (Próximamente)
- **.NET**: 9
- **ORM**: Entity Framework Core
- **Base de Datos**: SQLite (dev) / PostgreSQL (prod)
- **Arquitectura**: DDD (Domain-Driven Design)

## 📖 Documentación

Consulta la carpeta `docs/` para:
- **BRD.md**: Business Requirements Document completo
- **RESUMEN_SOLUCION.md**: Resumen ejecutivo de la solución
- **ESTRUCTURA_REPO.md**: Organización del repositorio

## 🤝 Contribución

Este es un proyecto personal/doméstico. Las reglas de desarrollo están en `.cursorrules`.

## 📝 Convenciones

- **Commits**: `tipo: descripción` (ej: `feat: agregar lista de hogares`)
- **Branches**: feature/nombre, fix/nombre
- **Testing**: Cobertura mínima 80%

---

**Versión**: 1.0.0 (En desarrollo)
