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
              Java es una de mis bases más sólidas para backend.

              Es el lenguaje con el que más trabajé en entornos cercanos a producción,
              con foco en estructura, mantenibilidad y lógica de negocio real.

              Qué hago con Java:
              • Construyo APIs y servicios backend
              • Diseño lógica por capas (controller / service / repository)
              • Manejo DTOs y separación de responsabilidades
              • Trabajo con colecciones, streams y transformaciones de datos
              • Implemento manejo de errores consistente

              Dónde lo usé:
              - APIs tipo fintech (wallet, usuarios, autenticación)
              - backends de juegos (cuentas, lógica, sistemas)
              - servicios modulares con múltiples dominios

              Mi enfoque:
              No uso Java solo para que funcione,
              lo uso para que el sistema tenga estructura, escalabilidad y orden.
          `
          },
          {
            name: "spring_boot.txt",
            content: `
              Spring Boot hoy en dia es mi stack principal para backend profesional.

              Es donde realmente consolido arquitectura, seguridad y buenas prácticas.

              Qué hago con Spring:
              • Construyo APIs REST completas
              • Organizo código en controllers, services y repositories
              • Implemento validaciones y manejo global de errores
              • Configuro seguridad con JWT
              • Manejo configuración con properties / YAML
              • Integro bases de datos (MySQL, MongoDB)

              Dónde lo apliqué:
              - APIs de Bricks (entorno fintech real)
              - sistemas de autenticación
              - backends administrativos
              - proyectos propios como Valdoria

              Mi diferencial:
              No hago solo endpoints.
              Diseño sistemas que pueden crecer, mantenerse y escalar.
          `
          },
          {
            name: "security_jwt.txt",
            content: `
              Tengo experiencia real implementando autenticación con JWT.

              No solo utilizo JWT, sino que entiendo el flujo completo de seguridad.

              Qué implemento:
              • Access tokens + refresh tokens
              • Rotación de refresh tokens
              • Middleware de autenticación
              • Protección por roles y permisos
              • Rutas privadas y administrativas
              • Control de sesión y logout seguro

              Dónde lo usé:
              - starter kits backend
              - paneles administrativos
              - APIs con roles (user, admin, etc.)

              Mi enfoque:
              La seguridad no es un extra. Es parte del diseño del sistema desde el inicio.
          `
          },
          {
                    name: "rest_apis.txt",
                    content: `
          El diseño de APIs REST es una parte central de mi perfil.

          No construyo endpoints aislados, diseño contratos claros y consistentes.

          Qué trabajo:
          • Diseño de endpoints y recursos
          • Contratos request / response bien definidos
          • Uso correcto de códigos HTTP
          • Paginación, filtros y búsqueda
          • CRUD completos y rutas administrativas
          • Integración fluida con frontend

          Dónde lo apliqué:
          - APIs administrativas
          - sistemas de usuarios
          - plataformas con múltiples entidades

          Mi enfoque:
          APIs claras, mantenibles y pensadas para ser consumidas en escenarios reales.
          `
                  },
                  {
                    name: "microservices.txt",
                    content: `
          Tengo fuerte interés en arquitecturas desacopladas y microservicios.

          Es un enfoque que vengo aplicando en sistemas reales.

          Qué trabajo:
          • separación por dominio
          • servicios independientes
          • comunicación entre APIs
          • autenticación distribuida
          • diseño modular

          Dónde aparece:
          - fintech (wallet, user, fraud APIs)
          - sistemas con múltiples servicios
          - plataformas escalables

          Mi enfoque:
          Dividir el sistema correctamente para que pueda crecer sin romperse.
          `
                  },
                  {
                    name: "architecture_patterns.txt",
                    content: `
          La arquitectura es una de las partes que más cuido en backend.

          No me interesa solo que el código funcione,
          me interesa que tenga sentido a largo plazo.

          Qué aplico:
          • arquitectura por capas
          • separación de responsabilidades
          • DTO / mapper / service pattern
          • modularidad por dominio
          • consistencia estructural

          Mi enfoque:
          Código claro, mantenible y preparado para evolucionar.
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
          Node.js fue clave en mi etapa fullstack y en proyectos rápidos.

          Lo uso cuando necesito velocidad de desarrollo sin perder estructura.

          Qué hago con Node:
          • construyo APIs
          • desarrollo herramientas internas
          • automatizo procesos
          • conecto frontend rápidamente

          Dónde lo usé:
          - proyectos web propios
          - herramientas internas
          - APIs de práctica real

          Mi enfoque:
          Elegir Node cuando la velocidad y flexibilidad son prioridad.
          `
                  },
                  {
                    name: "express.txt",
                    content: `
          Express me permitió construir APIs simples pero bien organizadas.

          Qué trabajo:
          • rutas organizadas por dominio
          • middlewares
          • autenticación
          • validaciones
          • integración con bases de datos

          Dónde lo usé:
          - APIs fullstack
          - proyectos propios
          - sistemas con frontend conectado

          Mi enfoque:
          Mantener simple lo simple, sin perder orden ni claridad.
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
          Python lo uso como herramienta complementaria.

          No es mi stack principal, pero es muy útil para resolver rápido.

          Qué hago con Python:
          • scripts
          • automatización
          • herramientas auxiliares
          • prototipos técnicos

          Mi enfoque:
          Usarlo donde aporta velocidad y practicidad.
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
React es una de mis tecnologías principales para construir frontend moderno.

Es donde más cómodo me siento cuando necesito interfaces modulares,
componentes reutilizables y experiencias más dinámicas.

Qué hago con React:
• construyo interfaces por componentes
• organizo pantallas complejas sin perder claridad
• manejo estado, eventos y flujos de usuario
• conecto frontend con APIs reales
• desarrollo dashboards, paneles y landing pages

Dónde lo apliqué:
- portfolios modernos
- paneles administrativos
- interfaces para productos propios
- experiencias web más interactivas

Mi enfoque:
No uso React solo para armar pantallas.
Lo uso para construir interfaces escalables, limpias y con lógica bien pensada.
`
        },
        {
          name: "typescript.ts",
          content: `
TypeScript mejoró mucho mi forma de trabajar tanto en frontend como en backend.

Me ayuda a construir con más claridad, menos errores y mejor mantenibilidad.

Qué valoro de TypeScript:
• tipado explícito
• contratos más claros entre componentes y datos
• detección temprana de errores
• mejor organización en proyectos grandes
• escalabilidad del código

Dónde lo uso más:
- proyectos con React
- interfaces administrativas
- portfolios modernos
- herramientas con datos estructurados

Mi enfoque:
TypeScript no es solo “tipar por tipar”.
Lo uso para que el código sea más sólido, más legible y más confiable.
`
        },
        {
          name: "ui_architecture.txt",
          content: `
Me interesa mucho la arquitectura de interfaces.

No me gusta hacer pantallas sueltas:
prefiero construir frontend con estructura, consistencia y criterio.

Qué trabajo en UI:
• separación por secciones y componentes
• componentes reutilizables
• modales, paneles, cards y tablas
• flujos claros para el usuario
• consistencia visual entre vistas
• diseño responsive
• themes y dark mode

Mi enfoque:
Busco que el frontend se sienta como un producto real,
no como una maqueta armada solo para mostrar.
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
También tengo experiencia trabajando con Vue.

Lo usé sobre todo en vistas conectadas al backend,
interfaces administrativas y pantallas con lógica de datos.

Qué hice con Vue:
• vistas administrativas
• formularios
• integración con APIs
• pantallas conectadas a backend
• uso de Composition API
• estructuras de frontend claras y mantenibles

Dónde lo apliqué:
- sistemas administrativos
- proyectos fullstack conectados a APIs propias
- interfaces con manejo de datos y roles

Mi enfoque:
Me gusta Vue por su claridad, su orden y la velocidad con la que permite construir interfaces sólidas.
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
JavaScript fue una de mis bases principales en desarrollo web.

Es una tecnología con la que trabajé tanto en frontend como en proyectos fullstack.

Qué hago con JavaScript:
• lógica del navegador
• interacción en interfaces
• conexión con APIs
• comportamiento dinámico en páginas
• herramientas web
• aplicaciones fullstack

Mi enfoque:
JavaScript fue una base importante para entender cómo construir experiencias web reales,
más allá de lo visual.
`
        },
        {
          name: "html_css.txt",
          content: `
HTML y CSS son una parte central de mi trabajo en frontend.

No los veo como algo básico o secundario:
para mí son clave en la identidad visual y la calidad de una interfaz.

Qué trabajo con HTML y CSS:
• layouts responsivos
• landing pages
• secciones personalizadas
• componentes visuales
• portfolios
• interfaces oscuras y modernas
• efectos, detalles visuales y animaciones

Mi enfoque:
Me interesa que una interfaz no solo funcione bien,
sino que también tenga presencia, estilo e identidad propia.
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
  name: "testing",
  children: [
    {
      name: "unit_testing.txt",
      content: `
Trabajo con testing para validar comportamiento y asegurar calidad.

Qué hago:
• tests unitarios
• validación de lógica de negocio
• cobertura básica
• pruebas de endpoints

Lo aplico en:
- APIs backend
- servicios críticos
`
    }
  ]
}
,
{
  name: "system_design",
  children: [
    {
      name: "design.txt",
      content: `
Me interesa diseñar sistemas completos, no solo escribir código.

Qué trabajo:
• separación por dominios
• diseño de APIs
• escalabilidad
• comunicación entre servicios
• organización de arquitectura

Dónde lo aplico:
- sistemas backend
- microservicios
- plataformas como Valdoria

Mi enfoque:
Pensar primero el sistema,
y después implementarlo de forma clara y mantenible.
`
    }
  ]
}
,
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
          },
      {
        name: "fl_studio.flp",
        content: `
      FL Studio forma parte de mi perfil creativo dentro del desarrollo de videojuegos.

      Lo utilizo para:
      • diseño de sonido
      • creación de música
      • ambientación sonora
      • efectos (SFX)
      • loops y pistas

      Dónde lo aplico:
      - proyectos de videojuegos (Valdoria / Roomverse)
      - prototipos interactivos
      - experiencias con identidad propia

      Mi enfoque:
      El sonido no es un detalle.
      Es parte de la experiencia del sistema.
      Busco que cada interacción tenga feedback auditivo y atmósfera.
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