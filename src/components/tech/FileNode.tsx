import type { TechFile } from "../../types/tech"

import txtIcon from "../../assets/icons/txt.png"
import sqlIcon from "../../assets/icons/sql.png"
import jsonIcon from "../../assets/icons/json.png"
import ymlIcon from "../../assets/icons/yml.png"
import csIcon from "../../assets/icons/cs.png"
import tsIcon from "../../assets/icons/ts.png"
import jsIcon from "../../assets/icons/js.png"
import defaultIcon from "../../assets/icons/txt.png"

type Props = {
  file: TechFile
  onOpen: (file: TechFile) => void
}

function getIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase()

  switch (ext) {
    case "txt":
      return txtIcon

    case "sql":
      return sqlIcon

    case "json":
      return jsonIcon

    case "yml":
    case "yaml":
      return ymlIcon

    case "cs":
      return csIcon

    case "ts":
    case "tsx":
      return tsIcon

    case "js":
      return jsIcon

    default:
      return defaultIcon
  }
}

export default function FileNode({ file, onOpen }: Props) {
  const icon = getIcon(file.name)

  return (
    <div className="tech-file" onClick={() => onOpen(file)}>
      <img
        src={icon}
        className="tech-file-icon"
        alt=""
      />
      {file.name}
    </div>
  )
}