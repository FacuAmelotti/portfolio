import type { TechFolder } from "../../types/tech"

import reactLogo from "../assets/icons/folder.png"

export const techTree: TechFolder[] = [
  {
    name: "backend",
    children: [
      {
        name: "java",
        children: [
          {
            name: "spring_boot.txt",
              image: reactLogo,
            content: `
Spring Boot es mi framework principal para backend.

Lo utilicé para construir APIs REST robustas en varios proyectos.

Skills:
• REST APIs
• JWT authentication
• Arquitectura por capas
• Validaciones
• Integración con MySQL y MongoDB

Proyectos:
- Bricks APIs
- Valdoria backend
`
          },
          {
            name: "microservices.txt",
            content: `
Diseño de servicios desacoplados y escalables.

Experiencia en:
• separación por dominio
• APIs independientes
• comunicación entre servicios
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
        name: "docker.yml",
        content: `
Docker es fundamental para mis entornos de desarrollo.

Uso principal:
• contenedores para APIs
• entornos reproducibles
• integración con CI/CD
`
      },
      {
        name: "gitlab_ci.yml",
        content: `
Automatización de pipelines CI/CD.

Experiencia con:
• builds automáticos
• testing
• deploy
• pipelines multi-stage
`
      }
    ]
  },
  {
    name: "databases",
    children: [
      {
        name: "mysql.sql",
        content: `
Base de datos relacional principal en varios proyectos.

Experiencia en:
• modelado de datos
• consultas optimizadas
• relaciones complejas
`
      },
      {
        name: "mongodb.json",
        content: `
Base de datos NoSQL usada para estructuras flexibles.

Uso en:
• almacenamiento de documentos
• estructuras dinámicas
`
      }
    ]
  },
  {
    name: "gamedev",
    children: [
      {
        name: "unity.cs",
        content: `
Motor principal para desarrollo de videojuegos.

Experiencia en:
• gameplay programming
• sistemas de combate
• mecánicas RPG
`
      }
    ]
  }
]