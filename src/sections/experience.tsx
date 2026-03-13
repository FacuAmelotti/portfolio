import experience from "../data/experience"

export default function Experience() {
  return (
    <section id="experience">
      <h2>Experience</h2>

      {experience.map((job) => (
        <div key={job.company}>
          <h3>{job.role}</h3>

          <p>
            {job.company} • {job.year}
          </p>

          <ul>
            {job.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}