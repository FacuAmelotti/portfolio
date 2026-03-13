import type { TechFolder } from "../types/tech"

export const techTree: TechFolder[] = [
  {
    name: "backend",
    children: [
      {
        name: "java",
        children: [
          {
            name: "java_core.txt",
            content: `
Java es una de mis tecnologías backend principales.

La utilicé para construir APIs, lógica de negocio, servicios por capas
y estructuras más cercanas a entornos profesionales reales.

Experiencia:
• Programación orientada a objetos
• Collections, streams y manejo de datos
• Diseño por capas
• DTOs, services, controllers, repositories
• Manejo de errores
• Integración con frameworks empresariales

Lo usé especialmente en:
- APIs de tipo fintech
- backends de juegos
- servicios con autenticación
- proyectos con arquitectura modular
`
          },
          {
            name: "spring_boot.txt",
            content: `
Spring Boot es mi framework principal para backend profesional.

Con Spring Boot construí APIs REST robustas, seguras y organizadas,
siguiendo buenas prácticas de arquitectura y separación de responsabilidades.

Experiencia:
• REST APIs
• Controllers, services y repositories
• Validaciones
• JWT authentication
• Configuración por properties / YAML
• Manejo global de errores
• Integración con MySQL y MongoDB
• Seguridad y middlewares
• Estructura escalable

Proyectos relacionados:
- Bricks APIs
- servicios de autenticación
- backends administrativos
- Valdoria backend
`
          },
          {
            name: "security_jwt.txt",
            content: `
Tengo experiencia implementando autenticación y autorización con JWT.

Capacidades:
• Access token + refresh token
• Rotación de refresh tokens
• Middleware de autenticación
• Protección por roles y permisos
• Rutas privadas
• Seguridad para paneles de administración
• Validación de sesión
• Flujos seguros de login / logout

Lo apliqué en:
- starter kits backend
- paneles administrativos
- APIs con roles
- sistemas con perfil de usuario
`
          },
          {
            name: "rest_apis.txt",
            content: `
El diseño de APIs REST es una parte central de mi perfil técnico.

Experiencia:
• Diseño de endpoints
• Contratos request / response
• Manejo de códigos HTTP
• Paginación, filtros y búsqueda
• Rutas administrativas
• CRUD completos
• Integración con frontend
• Documentación pensada para consumo real

Objetivo:
Construir APIs claras, mantenibles y preparadas para crecer.
`
          },
          {
            name: "microservices.txt",
            content: `
Tengo especial interés en arquitecturas desacopladas y microservicios.

Experiencia / enfoque:
• separación por dominio
• servicios independientes
• integración entre APIs
• autenticación distribuida
• diseño modular
• intercambio de datos entre sistemas
• enfoque en escalabilidad y mantenibilidad

Este enfoque aparece mucho en proyectos relacionados con:
- fintech
- wallet / fraud / user APIs
- plataformas con múltiples dominios
`
          },
          {
            name: "architecture_patterns.txt",
            content: `
Me interesa mucho la arquitectura de software.

Patrones y conceptos con los que trabajo:
• arquitectura por capas
• separación de responsabilidades
• DTO / mapper / service pattern
• modularidad
• dominio y subdominios
• escalabilidad
• mantenibilidad
• consistencia entre backend y frontend

No me interesa solo que el código funcione:
también busco que tenga estructura y futuro.
`
          }
        ]
      },
      {
        name: "nodejs",
        children: [
          {
            name: "nodejs.txt",
            content: `
Node.js fue una de mis tecnologías importantes en desarrollo fullstack y APIs.

Lo utilicé para:
• construir APIs
• herramientas internas
• automatizaciones
• proyectos web
• integraciones con frontend

Me resulta útil especialmente para iterar rápido
y para proyectos donde la velocidad de desarrollo importa mucho.
`
          },
          {
            name: "express.txt",
            content: `
Express me permitió construir APIs de forma simple y flexible.

Experiencia:
• rutas organizadas por dominio
• middlewares
• autenticación
• validaciones
• integración con MySQL y MongoDB
• endpoints administrativos
• lógica de negocio

Lo usé bastante en proyectos de práctica real y productos propios.
`
          }
        ]
      },
      {
        name: "python",
        children: [
          {
            name: "python.txt",
            content: `
Python me sirve como lenguaje versátil para scripts, automatización,
herramientas auxiliares y exploración técnica.

Lo valoro por:
• rapidez de desarrollo
• sintaxis clara
• automatización
• prototipado
• utilidades técnicas
`
          }
        ]
      }
    ]
  },

  {
    name: "frontend",
    children: [
      {
        name: "react",
        children: [
          {
            name: "react.tsx",
            content: `
React es hoy una de mis principales tecnologías para frontend moderno.

Lo uso para construir:
• interfaces modulares
• páginas administrativas
• dashboards
• landing pages
• sistemas con componentes reutilizables
• experiencias interactivas

Capacidades:
• componentización
• props / state
• hooks
• composición de UI
• manejo de eventos
• integración con APIs
• diseño escalable
`
          },
          {
            name: "typescript.ts",
            content: `
TypeScript mejoró mucho mi forma de construir frontend y backend.

Ventajas que aprovecho:
• tipado explícito
• mayor mantenibilidad
• contratos más claros
• menos errores por estructura
• mejor escalabilidad en componentes y datos

Lo uso especialmente en:
- React
- frontends administrativos
- portfolios modernos
- herramientas con datos estructurados
`
          },
          {
            name: "ui_architecture.txt",
            content: `
Me gusta diseñar interfaces con estructura real, no solo pantallas lindas.

En frontend suelo trabajar con:
• separación por secciones y componentes
• componentes reutilizables
• modales, paneles, cards, tablas
• diseño responsivo
• flujos claros para usuario
• consistencia visual
• dark mode / themes

Busco que el frontend se sienta como producto, no como maqueta.
`
          }
        ]
      },
      {
        name: "vue",
        children: [
          {
            name: "vue.txt",
            content: `
También tengo experiencia con Vue.

Lo utilicé para:
• vistas administrativas
• páginas conectadas al backend
• formularios
• vistas con integración de datos
• sistemas con Composition API

Me gusta su claridad y la velocidad con la que permite construir UI.
`
          }
        ]
      },
      {
        name: "web_basics",
        children: [
          {
            name: "javascript.txt",
            content: `
JavaScript fue una de mis bases principales para desarrollo web.

Lo usé en:
• frontend interactivo
• lógica del navegador
• conexión con APIs
• herramientas web
• aplicaciones fullstack
`
          },
          {
            name: "html_css.txt",
            content: `
HTML y CSS son parte esencial de mi trabajo en web.

Experiencia:
• layouts responsivos
• landing pages
• secciones personalizadas
• componentes visuales
• portfolios
• interfaces oscuras / modernas
• efectos y animaciones

Me interesa mucho que una interfaz tenga identidad visual.
`
          }
        ]
      }
    ]
  },

  {
    name: "devops",
    children: [
      {
        name: "containers",
        children: [
          {
            name: "docker.yml",
            content: `
Docker es una de las herramientas más importantes en mi stack.

Lo utilizo para:
• levantar entornos reproducibles
• contenerizar APIs
• trabajar con múltiples servicios
• simplificar desarrollo local
• preparar despliegues
• aislar dependencias

Lo usé bastante en:
- Odoo
- backends Java / Node
- stacks fullstack
- ambientes de desarrollo
`
          }
        ]
      },
      {
        name: "ci_cd",
        children: [
          {
            name: "gitlab_ci.yml",
            content: `
Tengo experiencia práctica con GitLab CI/CD.

Capacidades:
• pipelines multi-stage
• build
• test
• deploy
• variables de entorno
• branching strategies
• automatización de procesos
• uso de runners
• despliegues remotos

Es una de las áreas en las que más crecí profesionalmente.
`
          },
          {
            name: "jenkinsfile",
            content: `
También tengo exposición a Jenkins dentro de flujos profesionales.

Lo relaciono con:
• automatización
• pipelines empresariales
• procesos de build
• integración continua
`
          }
        ]
      },
      {
        name: "monitoring",
        children: [
          {
            name: "grafana.json",
            content: `
Grafana forma parte de mi perfil DevOps y de observabilidad.

Lo usé para:
• dashboards
• monitoreo visual
• métricas operativas
• paneles de infraestructura
• seguimiento de sistemas

Me interesa mucho la parte de visibilidad y estado real del sistema.
`
          },
          {
            name: "prometheus.yml",
            content: `
Prometheus lo relaciono con recolección de métricas y monitoreo.

Experiencia:
• integración con dashboards
• lectura de métricas
• observabilidad
• seguimiento de estado de servicios
`
          },
          {
            name: "loki.log",
            content: `
Loki me resultó útil para centralización y observación de logs.

Lo veo como pieza importante dentro de stacks de monitoreo modernos.
`
          },
          {
            name: "traefik.toml",
            content: `
Traefik apareció en mi experiencia como proxy inverso y pieza de infraestructura.

Lo relaciono con:
• routing
• exposición de servicios
• integración de stacks
• entornos web y monitoreo
`
          }
        ]
      },
      {
        name: "infrastructure",
        children: [
          {
            name: "linux.sh",
            content: `
Tengo afinidad con entornos Linux para desarrollo y trabajo técnico.

Lo uso como base para:
• servidores
• desarrollo local
• despliegues
• automatización
• herramientas de línea de comandos
`
          },
          {
            name: "automation.txt",
            content: `
La automatización es una parte importante de mi perfil.

Me interesa automatizar:
• procesos repetitivos
• flujos de CI/CD
• generación de scripts
• tareas operativas
• configuración técnica
`
          }
        ]
      }
    ]
  },

  {
    name: "databases",
    children: [
      {
        name: "sql",
        children: [
          {
            name: "mysql.sql",
            content: `
MySQL fue una de mis bases de datos principales en muchos proyectos.

Experiencia:
• diseño de tablas
• relaciones
• claves foráneas
• consultas
• filtros
• paginación
• normalización
• lógica persistente para APIs

Lo usé en:
- autenticación
- sistemas administrativos
- productos web
- paneles de gestión
`
          },
          {
            name: "queries.sql",
            content: `
Me interesa construir consultas claras y útiles.

Capacidades:
• SELECT complejos
• JOINs
• filtros
• búsquedas
• ordenamiento
• paginación
• consultas para paneles administrativos
`
          }
        ]
      },
      {
        name: "nosql",
        children: [
          {
            name: "mongodb.json",
            content: `
MongoDB lo utilicé para estructuras más flexibles y modelos documentales.

Lo apliqué en:
• chats
• estructuras dinámicas
• entidades con flexibilidad
• sistemas híbridos junto con MySQL

Me interesa especialmente para casos donde el esquema cambia más rápido.
`
          }
        ]
      },
      {
        name: "data_modeling",
        children: [
          {
            name: "modeling.txt",
            content: `
El modelado de datos es algo que valoro mucho.

Busco que las estructuras:
• representen bien el dominio
• sean mantenibles
• escalen
• no se vuelvan inconsistentes
• acompañen bien al backend
`
          }
        ]
      }
    ]
  },

  {
    name: "gamedev",
    children: [
      {
        name: "unity",
        children: [
          {
            name: "unity.cs",
            content: `
Unity es una parte muy importante de mi perfil creativo y técnico.

Lo utilicé para:
• videojuegos 2D y 3D
• lógica de gameplay
• combate
• inventario
• skills
• NPCs
• mapas
• interacción
• UI de juego

Es una tecnología donde mezclo ingeniería y creatividad.
`
          },
          {
            name: "gameplay_systems.cs",
            content: `
Disfruto especialmente construir sistemas de gameplay.

Ejemplos:
• combate por turnos
• skills y cooldowns
• movimiento
• spawn de NPCs
• inventario
• equipamiento
• stats del personaje
• progression systems
`
          },
          {
            name: "world_building.txt",
            content: `
También me interesa el diseño de mundos, ambientación y experiencia.

No solo programo mecánicas:
también pienso en identidad, narrativa y sistemas conectados.
`
          }
        ]
      },
      {
        name: "csharp",
        children: [
          {
            name: "csharp.cs",
            content: `
C# fue una de mis bases fuertes por Unity y también por formación más clásica.

Lo usé para:
• lógica orientada a objetos
• gameplay
• sistemas interactivos
• programación estructurada
• proyectos educativos
`
          }
        ]
      },
      {
        name: "game_projects",
        children: [
          {
            name: "valdoria.txt",
            content: `
Valdoria / Roomverse representan mi perfil más creativo y ambicioso.

Son proyectos donde exploro:
• arquitectura de juego
• combate
• cuentas y personajes
• mapas
• progresión
• sistemas persistentes
• UX y estética propia
`
          },
          {
            name: "protocolopolis.txt",
            content: `
Protocolopolis refleja mi interés por unir tecnología y educación.

Idea central:
hacer del aprendizaje de redes y protocolos algo jugable e interesante.
`
          }
        ]
      }
    ]
  },

  {
    name: "tools",
    children: [
      {
        name: "version_control",
        children: [
          {
            name: "git.txt",
            content: `
Git es una herramienta básica e indispensable en mi flujo diario.

Experiencia:
• ramas
• merges
• rebase
• resolución de conflictos
• trabajo por features
• mantenimiento de historial
`
          },
          {
            name: "github.txt",
            content: `
GitHub es una de mis plataformas para portfolio y repositorios personales.
`
          },
          {
            name: "gitlab.txt",
            content: `
GitLab forma una parte muy fuerte de mi perfil profesional.

Lo usé para:
• repositorios
• CI/CD
• documentación
• organización de proyectos
• branching strategies
`
          }
        ]
      },
      {
        name: "api_tools",
        children: [
          {
            name: "postman.json",
            content: `
Postman me resulta útil para probar, documentar y validar APIs.

Lo uso para:
• testing manual
• colecciones
• validación de endpoints
• comparación con implementación real
`
          }
        ]
      },
      {
        name: "design",
        children: [
          {
            name: "photoshop.psd",
            content: `
Photoshop aparece en mi perfil más visual y creativo.

Lo utilicé para:
• recursos gráficos
• edición visual
• assets
• presentaciones
• elementos de UI
`
          }
        ]
      }
    ]
  },

  {
    name: "mobile",
    children: [
      {
        name: "android",
        children: [
          {
            name: "android.txt",
            content: `
Tengo interés y experiencia relacionada con desarrollo móvil y plataformas Android,
especialmente desde proyectos conectados con juegos y apps multiplataforma.
`
          }
        ]
      },
      {
        name: "cross_platform",
        children: [
          {
            name: "react_native.txt",
            content: `
React Native aparece dentro de mis intereses para apps móviles generales.

Lo relaciono con:
• apps para Android / iOS
• integración con backend
• interfaces reutilizables
`
          },
          {
            name: "flutter.txt",
            content: `
También exploré Flutter como alternativa para desarrollo móvil multiplataforma.
`
          }
        ]
      }
    ]
  }
]