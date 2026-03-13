import { useState } from "react"
import type { TechFolder, TechFile } from "../../types/tech"
import FileNode from "./FileNode"
import folderIcon from "../../assets/icons/folder.png"
import folderOpenIcon from "../../assets/icons/folder-open.png"

type Props = {
  folder: TechFolder
  onOpenFile: (file: TechFile) => void
  openFolder: string | null
  setOpenFolder: (name: string | null) => void
  level: number
}

export default function FolderNode({
  folder,
  onOpenFile,
  openFolder,
  setOpenFolder,
  level
}: Props) {
  const [open, setOpen] = useState(false)

  const isRoot = level === 0
  const isOpen = isRoot ? openFolder === folder.name : open

  return (
    <div className="tech-folder">
      <div
        className="tech-folder-name"
        aria-expanded={isOpen}
        onClick={() => {
          if (isRoot) {
            setOpenFolder(isOpen ? null : folder.name)
          } else {
            setOpen(!open)
          }
        }}
      >
        <img
          src={isOpen ? folderOpenIcon : folderIcon}
          className="tech-folder-icon"
          alt=""
        />
        {folder.name}
      </div>

      {isOpen && (
        <div className="tech-children">
          {folder.children.map((item, i) => {
            if ("children" in item) {
              return (
                <FolderNode
                  key={i}
                  folder={item}
                  onOpenFile={onOpenFile}
                  openFolder={openFolder}
                  setOpenFolder={setOpenFolder}
                  level={level + 1}
                />
              )
            }

            return (
              <FileNode
                key={i}
                file={item}
                onOpen={onOpenFile}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}