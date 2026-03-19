import s_cognosce from "../assets/audio/songs/cognosce.mp3"
import s_acid from "../assets/audio/songs/acid.mp3"
import s_lapsus from "../assets/audio/songs/lapsus.mp3"
import s_ignis from "../assets/audio/songs/ignis.mp3"
import s_victus from "../assets/audio/songs/victus.mp3"
import s_bla from "../assets/audio/songs/bla.mp3"
import s_concussa from "../assets/audio/songs/concussa.mp3"
import s_perse from "../assets/audio/songs/perse.mp3"

//otras
import s_disaster from "../assets/audio/songs/disaster.mp3"
import s_inter_infinitum from "../assets/audio/songs/inter-infinitum.mp3"
import s_damnare from "../assets/audio/songs/damnare.mp3"
import s_amissa from "../assets/audio/songs/amissa-morale.mp3"
import s_internumize from "../assets/audio/songs/internumize.mp3"
import s_ignosce from "../assets/audio/songs/ignosce.mp3"
import s_vetus from "../assets/audio/songs/vetus-somnia.mp3"

//beats
import s_caessar from "../assets/audio/songs/caesar.mp3"
import s_cold from "../assets/audio/songs/cold.mp3"
import s_boulevard from "../assets/audio/songs/boulevard.mp3"
import s_cassete from "../assets/audio/songs/cassete.mp3"
import s_non_vident from "../assets/audio/songs/non-vident.mp3"
import s_vesperi from "../assets/audio/songs/vesperi.mp3"

//nostalgias
import s_cosmic from "../assets/audio/songs/cosmic-gate.mp3"
import s_inanis from "../assets/audio/songs/inanis.mp3"
import s_extraneus from "../assets/audio/songs/extraneus.mp3"
import s_damnum from "../assets/audio/songs/damnum.mp3"
import s_dimissi from "../assets/audio/songs/dimissi.mp3"
import s_elegans from "../assets/audio/songs/elegans.mp3"
import s_facinorase from "../assets/audio/songs/facinorase.mp3"
import s_instrumenta from "../assets/audio/songs/instrumenta.mp3"
import s_voluptas from "../assets/audio/songs/voluptas.mp3"

//imgs
import i_cognosce from "../assets/images/songs/cognosce.jpg"
import i_acid from "../assets/images/songs/acid.png"
import i_lapsus from "../assets/images/songs/lapsus.jpg"
import i_ignis from "../assets/images/songs/ignis.png"
import i_victus from "../assets/images/songs/victus.jpg"
import i_bla from "../assets/images/songs/bla.jpg"
import i_cold from "../assets/images/songs/cold.png"
import i_concussa from "../assets/images/songs/concussa.jpg"
import i_damnare from "../assets/images/songs/damnare.jpg"
import i_amissa from "../assets/images/songs/amissa.png"
import i_boulevard from "../assets/images/songs/boulevard.png"
import i_ceasar from "../assets/images/songs/caesar.jpg"
import i_cassete from "../assets/images/songs/cassete.jpg"
import i_extraneus from "../assets/images/songs/extraneus.jpg"
import i_internumize from "../assets/images/songs/internumize.jpg"
import i_cosmic from "../assets/images/songs/cosmic.png"
import i_damnum from "../assets/images/songs/damnum.png"
import i_dimissi from "../assets/images/songs/dimissi.png"
import i_disaster from "../assets/images/songs/disaster.png"
import i_elegans from "../assets/images/songs/elegans.png"
import i_facinorase from "../assets/images/songs/facinorase.png"
import i_ignosce from "../assets/images/songs/ignosce.jpg"
import i_inanis from "../assets/images/songs/inanis.png"
import i_instrumenta from "../assets/images/songs/instrumenta.jpg"
import i_inter_infinitum from "../assets/images/songs/inter-infinitum.png"
import i_non_vident from "../assets/images/songs/non_vident.png"
import i_perse from "../assets/images/songs/perse.png"
import i_vesperi from "../assets/images/songs/vesperi.png"
import i_vetus from "../assets/images/songs/vetus.jpg"
import i_voluptas from "../assets/images/songs/voluptas.jpg"

export type SongCategory = "favorites" | "others" | "beats" | "nostalgias"

export type Song = {
  title: string
  subtitle?: string
  description: string
  cover: string
  audio: string
  category: SongCategory

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
    description: "Esta cancion la hice en el año 2022, espero les guste.",
    cover: i_cognosce,
    audio: s_cognosce,
    category: "favorites",

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
    description: "Esta cancion la hice en 2024, espero les guste.",
    cover: i_acid,
    audio: s_acid,
    category: "favorites",

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
    description: "Esta cancion la hice en 2019, espero les guste.",
    cover: i_bla,
    audio: s_bla,
    category: "favorites",

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
    description: "Esta cancion la hice en 2021, espero les guste.",
    cover: i_victus,
    audio: s_victus,
    category: "favorites",

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
    description: "Esta cancion la hice en 2025, espero les guste.",
    cover: i_lapsus,
    audio: s_lapsus,
    category: "favorites",

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
    description: "Esta cancion la hice en 2020, espero les guste.",
    cover: i_ignis,
    audio: s_ignis,
    category: "favorites",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(215,155,55,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Concussa",
    subtitle: "Electronic",
    description: "Esta cancion la hice en 2020, espero les guste.",
    cover: i_concussa,
    audio: s_concussa,
    category: "favorites",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(178,178,178,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Disaster",
    subtitle: "Chill Dubs",
    description: "Esta cancion la hice en 2020, espero les guste.",
    cover: i_disaster,
    audio: s_disaster,
    category: "favorites",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(178,178,178,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Per Se",
    subtitle: "Electronic",
    description: "Esta cancion la hice en 2020, espero les guste.",
    cover: i_perse,
    audio: s_perse,
    category: "favorites",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,32,32,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(132,132,132,0.06)",
  },


  {
    title: "Amissa Morale",
    subtitle: "Electronic",
    description: "Esta cancion la hice en 2020, espero les guste.",
    cover: i_amissa,
    audio: s_amissa,
    category: "others",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,155,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Internumize",
    subtitle: "Electronic",
    description: "Esta cancion la hice en 2020, espero les guste.",
    cover: i_internumize,
    audio: s_internumize,
    category: "others",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,32,32,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(132,132,132,0.06)",
  },
{
    title: "Inter Infinitum",
    subtitle: "Chill",
    description: "Esta cancion la hice en 2019, espero les guste.",
    cover: i_inter_infinitum,
    audio: s_inter_infinitum,
    category: "others",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,155,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Damnare",
    subtitle: "Electronic",
    description: "Esta cancion la hice en 2020, espero les guste.",
    cover: i_damnare,
    audio: s_damnare,
    category: "others",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,155,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Ignosce",
    subtitle: "Electronic",
    description: "Esta cancion la hice en 2020, espero les guste.",
    cover: i_ignosce,
    audio: s_ignosce,
    category: "others",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,155,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Vetus Somnia",
    subtitle: "Electronic",
    description: "Esta cancion la hice en 2022, espero les guste.",
    cover: i_vetus,
    audio: s_vetus,
    category: "others",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,155,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },





  {
    title: "Cold",
    subtitle: "Beat",
    description: "...",
    cover: i_cold,
    audio: s_cold,
    category: "beats",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,155,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Caessar",
    subtitle: "Beat",
    description: "...",
    cover: i_ceasar,
    audio: s_caessar,
    category: "beats",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,155,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Non vident",
    subtitle: "Beat",
    description: "...",
    cover: i_non_vident,
    audio: s_non_vident,
    category: "beats",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,155,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Vesperi",
    subtitle: "Beat",
    description: "...",
    cover: i_vesperi,
    audio: s_vesperi,
    category: "beats",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,155,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Boulevard",
    subtitle: "Beat",
    description: "...",
    cover: i_boulevard,
    audio: s_boulevard,
    category: "beats",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,155,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Cassete",
    subtitle: "Beat",
    description: "...",
    cover: i_cassete,
    audio: s_cassete,
    category: "beats",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(32,155,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
{
    title: "Dimissi",
    subtitle: "Beat",
    description: "...",
    cover: i_dimissi,
    audio: s_dimissi,
    category: "beats",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(232,115,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },



{
    title: "Cosmic Gate",
    subtitle: "Electronic",
    description: "Esta cancion la hice en 2018! Espero les guste",
    cover: i_cosmic,
    audio: s_cosmic,
    category: "nostalgias",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(232,115,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
{
    title: "Inanis",
    subtitle: "Electronic",
    description: "Esta cancion la hice para un juego de suspenso",
    cover: i_inanis,
    audio: s_inanis,
    category: "nostalgias",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(232,115,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
{
    title: "Voluptas",
    subtitle: "Electronic",
    description: "Esta cancion la hice en el año 2017!",
    cover: i_voluptas,
    audio: s_voluptas,
    category: "nostalgias",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(232,115,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Extraneus",
    subtitle: "Electronic",
    description: "Esta cancion la hice para el menu de un juegito que hice sobre el Espacio. Espero les guste",
    cover: i_extraneus,
    audio: s_extraneus,
    category: "nostalgias",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(232,115,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
  {
    title: "Damnum",
    subtitle: "Electronic",
    description: "Esta cancion la hice en el año 2020",
    cover: i_damnum,
    audio: s_damnum,
    category: "nostalgias",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(232,115,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },

{
    title: "Elegans",
    subtitle: "Chill Suspense",
    description: "Esta cancion la hice para el menu de un juego de suspenso",
    cover: i_elegans,
    audio: s_elegans,
    category: "nostalgias",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(232,115,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
{
    title: "Facinorase",
    subtitle: "Electronic",
    description: "Esta cancion la hice en el año 2018, inspirado en una cancion del AO",
    cover: i_facinorase,
    audio: s_facinorase,
    category: "nostalgias",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(232,115,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
{
    title: "Instrumenta",
    subtitle: "Electronic",
    description: "Esta cancion la hice en el año 2017!",
    cover: i_instrumenta,
    audio: s_instrumenta,
    category: "nostalgias",

    dots: 120,
    dotSize: 1.8,
    dotColor: "rgba(232,115,225,0.72)",
    rotationSpeed: 0.22,
    glowInner: "rgba(32,32,32,0.14)",
    glowMid: "rgba(32,32,32,0.06)",
  },
]