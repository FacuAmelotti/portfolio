import { useEffect, useRef, useState } from "react"
import {
  CONSOLE_COMMANDS,
  getRandomInvalidCommandMessage,
  resolveConsoleCommand,
  type ConsoleAction,
  type HelpCommandItem,
  type Section,
} from "../data/consoleCommands"
import "../sections/styles/consola.css"

type Props = {
  open: boolean
  onClose: () => void
  currentSection: Section
  onNavigate: (target: Section) => void
  onEffect: (effect: "glitch" | "flash") => void
}

type ConsoleRenderable =
  | {
      type: "text"
      content: string
    }
  | {
      type: "command-grid"
      title?: string
      items: HelpCommandItem[]
    }
  | {
      type: "inline-command"
      before: string
      label: string
      command: string
      after?: string
      variant?: string
      className?: string
    }

const CLEAR_HELP_LINE: ConsoleRenderable = {
  type: "inline-command",
  before: "If you're lost, type",
  label: "/help",
  command: "/help",
  after: "or leave...",
  variant: "system",
}

export default function InteractiveConsoleModal({
  open,
  onClose,
  currentSection,
  onNavigate,
  onEffect,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  const [inputVisible, setInputVisible] = useState(false)
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)

  const [lines, setLines] = useState<ConsoleRenderable[]>([
    { type: "text", content: "Welcome to the system..." },
    {
      type: "text",
      content: "Press ENTER to initialize command mode, and type an instruction to continue...",
    },
    { type: "text", content: " " },
    { ...CLEAR_HELP_LINE },
  ])

  useEffect(() => {
    if (!open) {
      setInputVisible(false)
      setCommand("")
      setHistoryIndex(null)
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    if (open && inputVisible) {
      inputRef.current?.focus()
    }
  }, [open, inputVisible])

  useEffect(() => {
    if (!open) return
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [lines, inputVisible, open])

  const appendTextLines = (newLines: string[]) => {
    if (!newLines.length) return
    setLines((prev) => [
      ...prev,
      ...newLines.map((line) => ({
        type: "text" as const,
        content: line,
      })),
    ])
  }

  const appendRenderable = (item: ConsoleRenderable) => {
    setLines((prev) => [...prev, item])
  }

  const runAction = (action: ConsoleAction) => {
    switch (action.type) {
      case "output":
        appendTextLines(action.lines)
        break

      case "command-grid":
        if (action.title) appendTextLines([action.title])
        appendRenderable({
          type: "command-grid",
          title: action.title,
          items: action.items,
        })
        break

      case "navigate":
        if (action.lines) appendTextLines(action.lines)
        onNavigate(action.target)
        onClose()
        break

      case "effect":
        if (action.lines) appendTextLines(action.lines)
        onEffect(action.effect)
        break

      case "clear":
        setLines([{ ...CLEAR_HELP_LINE }])
        break

      case "close":
        onClose()
        break
    }
  }

  const executeCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim()
    if (!trimmed) return

    setLines((prev) => [...prev, { type: "text", content: `> ${trimmed}` }])

    const resolved = resolveConsoleCommand(trimmed)

    if (!resolved) {
      appendTextLines([getRandomInvalidCommandMessage()])
      return
    }

    const result = resolved.execute({ currentSection })

    if (Array.isArray(result)) {
      result.forEach(runAction)
    } else {
      runAction(result)
    }
  }

  const submitCommand = () => {
    const trimmed = command.trim()

    if (!trimmed) {
      setCommand("")
      setInputVisible(false)
      return
    }

    executeCommand(trimmed)
    setHistory((prev) => [...prev, trimmed])
    setHistoryIndex(null)
    setCommand("")
    setInputVisible(false)
  }

  useEffect(() => {
    if (!open) return

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()

        if (!history.length) return

        setHistoryIndex((prev) => {
          const next = prev === null ? history.length - 1 : Math.max(prev - 1, 0)
          setCommand(history[next] ?? "")
          return next
        })
        return
      }

      if (e.key === "ArrowDown") {
        e.preventDefault()

        if (!history.length) return

        setHistoryIndex((prev) => {
          if (prev === null) return null

          const next = prev + 1

          if (next >= history.length) {
            setCommand("")
            return null
          }

          setCommand(history[next] ?? "")
          return next
        })
        return
      }

      if (e.key === "Tab") {
        e.preventDefault()

        const currentValue = command.trim().toLowerCase()
        if (!currentValue) return

        const match = Object.keys(CONSOLE_COMMANDS).find((cmd) =>
          cmd.startsWith(currentValue)
        )

        if (match) setCommand(match)
        return
      }

      if (e.key !== "Enter") return

      e.preventDefault()

      if (!inputVisible) {
        setInputVisible(true)
        return
      }

      submitCommand()
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, inputVisible, command, currentSection, history, onClose])

  if (!open) return null

  return (
    <div className="console-overlay" onClick={onClose}>
      <div
        className="console-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Interactive console"
        data-no-nav
      >
        <div className="console-header">
          <div className="console-header-left">
            <span className="console-dot console-dot-red" />
            <span className="console-dot console-dot-yellow" />
            <span className="console-dot console-dot-green" />
          </div>

          <div className="console-title">f4k1t0.sh</div>

          <button className="console-close" onClick={onClose} aria-label="Close console">
            ✕
          </button>
        </div>

        <div className="console-body" ref={bodyRef}>
          {lines.map((item, index) => {
            if (item.type === "text") {
              return (
                <div key={`text-${index}`} className="console-line">
                  {item.content}
                </div>
              )
            }

            if (item.type === "inline-command") {
              return (
                <div key={`inline-${index}`} className="console-line console-inline-line">
                  <span>{item.before} </span>
                  <button
                    type="button"
                    className={`console-inline-chip ${item.variant ? `is-${item.variant}` : ""} ${item.className ?? ""}`}
                    onClick={() => executeCommand(item.command)}
                  >
                    {item.label}
                  </button>
                  {item.after && <span> {item.after}</span>}
                </div>
              )
            }

            return (
              <div key={`grid-${index}`} className="console-command-grid">
                {item.items.map((cmd) => (
                  <button
                    key={`${cmd.command}-${cmd.label}`}
                    type="button"
                    className={`console-command-chip ${cmd.variant ? `is-${cmd.variant}` : ""} ${cmd.className ?? ""}`}
                    onClick={() => executeCommand(cmd.command)}
                  >
                    <span className="console-command-chip-label">{cmd.label}</span>
                    {cmd.description && (
                      <span className="console-command-chip-description">
                        {cmd.description}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )
          })}

          {inputVisible && (
            <div className="console-input-row">
              <span className="console-prompt">{">"}</span>
              <input
                ref={inputRef}
                className="console-input"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}