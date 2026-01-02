# Estructura del Repositorio - Control Gastos

## Propuesta de Organización

```
control-gastos/                          # Raíz del repositorio
│
├── docs/                                # Documentación del proyecto
│   ├── BRD.md
│   ├── RESUMEN_SOLUCION.md
│   └── README.md
│
├── frontend/                            # Proyecto Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/                   # Módulo Core (servicios singleton)
│   │   │   ├── shared/                 # Módulo Shared (componentes/servicios compartidos)
│   │   │   ├── features/               # Módulos de funcionalidad
│   │   │   │   ├── hogares/
│   │   │   │   ├── presupuestos/
│   │   │   │   └── auth/
│   │   │   ├── models/                 # Interfaces y modelos
│   │   │   └── services/               # Servicios
│   │   ├── assets/
│   │   └── environments/
│   ├── package.json
│   ├── angular.json
│   └── tsconfig.json
│
├── backend/                             # Solución .NET
│   ├── ControlGastos.Web/              # Proyecto Web API
│   │   ├── Controllers/
│   │   ├── Program.cs
│   │   └── ControlGastos.Web.csproj
│   │
│   ├── ControlGastos.Domain/           # Proyecto Domain (DDD)
│   │   ├── Entities/
│   │   ├── ValueObjects/
│   │   ├── Interfaces/
│   │   └── ControlGastos.Domain.csproj
│   │
│   ├── ControlGastos.Infrastructure/   # Proyecto Infrastructure
│   │   ├── Data/
│   │   ├── Repositories/
│   │   ├── Migrations/
│   │   └── ControlGastos.Infrastructure.csproj
│   │
│   └── ControlGastos.sln               # Solución .NET
│
├── .gitignore                           # Git ignore global
├── README.md                            # README principal
└── .cursorrules                         # Reglas del proyecto

```

## Ventajas de esta estructura

1. **Separación clara**: Frontend y Backend en carpetas independientes
2. **Escalable**: Fácil agregar más proyectos si es necesario
3. **CI/CD friendly**: Pipelines pueden trabajar independientemente con cada carpeta
4. **Documentación centralizada**: Toda la documentación en `docs/`
5. **Estándar de la industria**: Estructura común en proyectos full-stack

## Alternativa más simple

Si prefieres algo más simple, podríamos usar:

```
control-gastos/
├── frontend/           # Todo el proyecto Angular
├── backend/            # Todo el backend .NET
└── docs/              # Documentación
```

## ¿Qué te parece?

¿Prefieres esta estructura o alguna variación? Una vez que decidamos, reorganizamos los archivos existentes y creamos el proyecto Angular en `frontend/` y luego el backend en `backend/`.

