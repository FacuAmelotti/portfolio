import s_cognosce from "../assets/audio/songs/cognosce.mp3"
import s_acid from "../assets/audio/songs/acid.mp3"
import s_lapsus from "../assets/audio/songs/lapsus.mp3"
import s_ignis from "../assets/audio/songs/ignis.mp3"
import s_victus from "../assets/audio/songs/victus.mp3"
import s_bla from "../assets/audio/songs/bla.mp3"

import i_cognosce from "../assets/images/songs/cognosce.jpg"
import i_acid from "../assets/images/songs/acid.png"
import i_lapsus from "../assets/images/songs/lapsus.jpg"
import i_ignis from "../assets/images/songs/ignis.png"
import i_victus from "../assets/images/songs/victus.jpg"
import i_bla from "../assets/images/songs/bla.jpg"

export type Song = {
  title: string
  subtitle?: string
  description: string
  cover: string
  audio: string

  dots?: number
  dotSize?: number
  dotColor?: string
  rotationSpeed?: number
  glowInner?: string
  glowMid?: string
}

export const songs: Song[] = [
  {
    title: "Cognosce",
    subtitle: "Melodic Electronic",
    description:
      "Esta cancion la hice en el año 2022, espero les guste.",

    cover: i_cognosce,
    audio: s_cognosce,

    dots: 96,
    dotSize: 2,
    dotColor: "rgba(255,144,225,0.65)",
    rotationSpeed: 0.15,
    glowInner: "rgba(255,180,60,0.12)",
    glowMid: "rgba(255,120,20,0.05)",
  },

  {
    title: "Acid",
    subtitle: "Electronic",
    description:
      "Esta cancion la hice en 2024, espero les guste.",

    cover: i_acid,
    audio: s_acid,

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(24,240,85,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(20,160,55,0.14)",
    glowMid: "rgba(12,160,55,0.06)",
  },
{
    title: "Bla Bla",
    subtitle: "Chill Electronic",
    description:
      "Esta cancion la hice en 2019, espero les guste.",

    cover: i_bla,
    audio: s_bla,

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(235,255,255,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Victus",
    subtitle: "Electronic",
    description:
      "Esta cancion la hice en 2021, espero les guste.",

    cover: i_victus,
    audio: s_victus,

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(215,55,55,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Lapsus",
    subtitle: "Dubstep",
    description:
      "Esta cancion la hice en 2025, espero les guste.",

    cover: i_lapsus,
    audio: s_lapsus,

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(215,155,255,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },

  {
    title: "Ignis",
    subtitle: "Techno",
    description:
      "Esta cancion la hice en 2020, espero les guste.",

    cover: i_ignis,
    audio: s_ignis,

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(215,155,55,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  }




]
