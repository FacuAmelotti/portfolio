import { useState } from "react"
import FolderNode from "../components/tech/FolderNode"
import TechModal from "../components/tech/TechModal"
import { techTree } from "../data/techTree"
import type { TechFile } from "../types/tech"
import "./styles/tech.css"

export default function Tech() {
  const [openFile, setOpenFile] = useState<TechFile | null>(null)
  const [openFolder, setOpenFolder] = useState<string | null>(null)

  return (
    <section id="tech">
      <h2 className="s-title">
        Tech
        <br />
        Stack
        <br />
        Explorer
      </h2>

      <div className="tech-tree">
        {techTree.map((folder, i) => (
          <FolderNode
            key={i}
            folder={folder}
            onOpenFile={setOpenFile}
            openFolder={openFolder}
            setOpenFolder={setOpenFolder}
            level={0}
          />
        ))}
      </div>

      <TechModal
        file={openFile}
        onClose={() => setOpenFile(null)}
      />
    </section>
  )
}