
export const SECTIONS = [
  "hero",
  "about",
  "tech",
  "projects",
  "experience",
  "music",
  "contact",
] as const

export const SNEAKY_RESPONSES = [
  "Ahh... ningun noob...",
  "Este sabe cositas...",
  "Permiso denegado, campeón.",
  "No tenés ese nivel de acceso...",
  "Buen intento...",
  "Eso estuvo cuanto menos sospechoso...",
]
export function getRandomSneakyMessage() {
  return SNEAKY_RESPONSES[
    Math.floor(Math.random() * SNEAKY_RESPONSES.length)
  ]
}

export type Section = (typeof SECTIONS)[number]

export type HelpCommandItem = {
  label: string
  command: string
  description?: string
  variant?: string
  className?: string
}

export type ConsoleAction =
  | { type: "output"; lines: string[] }
  | { type: "command-grid"; title?: string; items: HelpCommandItem[] }
  | { type: "navigate"; target: Section; lines?: string[] }
  | { type: "effect"; effect: "glitch" | "flash"; lines?: string[] }
  | { type: "clear" }
  | { type: "close" }

export type ConsoleCommandContext = {
  currentSection: Section
}

export type ConsoleCommandDefinition = {
  description: string
  aliases?: string[]
  hiddenFromHelp?: boolean
  helpLabel?: string
  helpVariant?: string
  helpClassName?: string
  allowArgs?: boolean
  execute: (ctx: ConsoleCommandContext) => ConsoleAction | ConsoleAction[]
}

export const INVALID_COMMAND_RESPONSES = [
  "Invalid command.",
  "Command does not exist.",
  "Wrong command.",
  "Not a valid command.",
  "Unknown instruction.",
  "Syntax not recognized.",
]

const SECTION_ORDER: Section[] = [
  "hero",
  "about",
  "tech",
  "projects",
  "experience",
  "music",
  "contact",
]

export const CONSOLE_COMMANDS: Record<string, ConsoleCommandDefinition> = {
  "/help": {
    description: "Show available commands.",
      hiddenFromHelp: true,
    helpVariant: "system",
    execute: () => ({
      type: "command-grid",
      title: "Available commands:",
      items: getHelpCommandItems(),
    }),
  },

"/whoami": {
  description: "Reveal hidden identity.",
  aliases: ["/id", "/me"],
  hiddenFromHelp: true,
  execute: () => ({
    type: "output",
    lines: [
      "Facundo Amelotti",
      "Software Developer",
      "Backend · Systems · DevOps · Game Development",
    ],
  }),
},

"/sudo": {
  description: "Try elevated access.",
  helpVariant: "danger",
  hiddenFromHelp: true,
    allowArgs: true,
  execute: () => ({
    type: "output",
    lines: [getRandomSneakyMessage()],
  }),
},

"/hack": {
  description: "Definitely not suspicious.",
  helpVariant: "danger",
  hiddenFromHelp: true,
    allowArgs: true,
  execute: () => ([
    {
      type: "effect",
      effect: "glitch",
      lines: [
        "Injecting coolness...",
        "Bypassing reality...",
        getRandomSneakyMessage(),
      ],
    },
  ]),
},

"/root": {
  description: "Root access attempt.",
  hiddenFromHelp: true,
    allowArgs: true,
  execute: () => ({
    type: "output",
    lines: [
      "root: permission denied",
      getRandomSneakyMessage(),
    ],
  }),
},

"/admin": {
  description: "Admin access attempt.",
  hiddenFromHelp: true,
    allowArgs: true,
  execute: () => ({
    type: "output",
    lines: [
      "Admin privileges not found.",
      "But confidence levels are high.",
    ],
  }),
},

"/matrix": {
  description: "Activate matrix mode.",
  hiddenFromHelp: true,

  execute: () => ({
    type: "effect",
    effect: "glitch",
    lines: [
      "Wake up...",
      "The portfolio has you...",
    ],
  }),
},

"/ping": {
  description: "Ping system.",
  hiddenFromHelp: true,
  execute: () => ({
    type: "output",
    lines: ["pong :)"],
  }),
},

"/coffee": {
  description: "Request caffeine.",
  hiddenFromHelp: true,
  execute: () => ({
    type: "output",
    lines: [
      "Brewing coffee...",
      "Error: coffee machine not detected.",
    ],
  }),
},

"/facu": {
  description: "Summon the builder.",
  hiddenFromHelp: true,
  execute: () => ({
    type: "output",
    lines: [
      "Summoning Facu...",
      "Current status: probably building something ambitious.",
    ],
  }),
},


  "/home": {
    description: "Go to Main section.",
    helpVariant: "hero",
    execute: () => ({
      type: "navigate",
      target: "hero",
      lines: ["Navigating to HERO..."],
    }),
  },

  "/about": {
    description: "Go to About section.",
    helpVariant: "about",
    execute: () => ({
      type: "navigate",
      target: "about",
      lines: ["Navigating to ABOUT..."],
    }),
  },

  "/tech": {
    description: "Go to Tech section.",
    helpVariant: "tech",
    execute: () => ({
      type: "navigate",
      target: "tech",
      lines: ["Navigating to TECH..."],
    }),
  },

  "/projects": {
    description: "Go to Projects section.",
    helpVariant: "projects",
    execute: () => ({
      type: "navigate",
      target: "projects",
      lines: ["Navigating to PROJECTS..."],
    }),
  },

  "/experience": {
    description: "Go to Experience section.",
    helpVariant: "experience",
    execute: () => ({
      type: "navigate",
      target: "experience",
      lines: ["Navigating to EXPERIENCE..."],
    }),
  },

  "/music": {
    description: "Go to my Music Reproductor.",
    helpVariant: "music",
    execute: () => ({
      type: "navigate",
      target: "music",
      lines: ["Navigating to MUSIC..."],
    }),
  },

  "/contact": {
    description: "Go to Contact section.",
    helpVariant: "contact",
    execute: () => ({
      type: "navigate",
      target: "contact",
      lines: ["Navigating to CONTACT..."],
    }),
  },

  "/next": {
    description: "Go to next section.",
          hiddenFromHelp: true,
    helpVariant: "nav",
    execute: (ctx) => {
      const idx = SECTION_ORDER.indexOf(ctx.currentSection)
      const next = SECTION_ORDER[Math.min(idx + 1, SECTION_ORDER.length - 1)]

      return {
        type: "navigate",
        target: next,
        lines: [`Navigating to ${next.toUpperCase()}...`],
      }
    },
  },

  "/prev": {
    description: "Go to previous section.",
          hiddenFromHelp: true,
    helpVariant: "nav",
    execute: (ctx) => {
      const idx = SECTION_ORDER.indexOf(ctx.currentSection)
      const prev = SECTION_ORDER[Math.max(idx - 1, 0)]

      return {
        type: "navigate",
        target: prev,
        lines: [`Navigating to ${prev.toUpperCase()}...`],
      }
    },
  },

  "/whereami": {
    description: "Show current section.",
    helpVariant: "system",
    execute: (ctx) => ({
      type: "output",
      lines: [`Current section: ${ctx.currentSection.toUpperCase()}`],
    }),
  },

  "/clear": {
    description: "Clear console output.",
    helpVariant: "danger",
    execute: () => ({ type: "clear" }),
  },

  "/close": {
    description: "Close console.",
    helpVariant: "danger",
    execute: () => ({ type: "close" }),
  },
}

export function getHelpCommandItems(): HelpCommandItem[] {
  return Object.entries(CONSOLE_COMMANDS)
    .filter(([, def]) => !def.hiddenFromHelp)
    .map(([command, def]) => ({
      label: def.helpLabel ?? command,
      command,
      description: def.description,
      variant: def.helpVariant,
      className: def.helpClassName,
    }))
}

export function resolveConsoleCommand(input: string) {
  const normalized = input.trim().toLowerCase()
  if (!normalized) return null

  for (const [command, def] of Object.entries(CONSOLE_COMMANDS)) {
    if (normalized === command) return def

    if (def.allowArgs && normalized.startsWith(`${command} `)) {
      return def
    }

    if (def.aliases?.includes(normalized)) return def

    if (def.allowArgs && def.aliases?.some((alias) => normalized.startsWith(`${alias} `))) {
      return def
    }
  }

  return null
}

export function getRandomInvalidCommandMessage() {
  return INVALID_COMMAND_RESPONSES[
    Math.floor(Math.random() * INVALID_COMMAND_RESPONSES.length)
  ]
}