export type TechFile = {
  name: string
  content: string
  image?: string
}

export type TechFolder = {
  name: string
  children: (TechFolder | TechFile)[]
}