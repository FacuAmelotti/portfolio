import type { TechFile } from "../../types/tech"

type Props = {
  file: TechFile | null
  onClose: () => void
}

export default function TechModal({ file, onClose }: Props) {
  if (!file) return null

  return (
    <div className="tech-modal-overlay" onClick={onClose}>
      <div
        className="tech-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tech-modal-header">
          {file.name}
        </div>

        {file.image && (
          <div className="tech-modal-image">
            <img src={file.image} alt={file.name} />
          </div>
        )}

        <pre className="tech-modal-body">
          {file.content}
        </pre>
      </div>
    </div>
  )
}