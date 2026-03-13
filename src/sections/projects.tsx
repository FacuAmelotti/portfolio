import projects from "../data/projects"

export default function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>

      {projects.map((project) => (
        <div key={project.title}>
          <h3>{project.title}</h3>

          <p>{project.description}</p>

          <div>
            {project.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}