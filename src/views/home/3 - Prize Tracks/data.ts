/* eslint-disable max-len */
import Beginner from "../../../assets/tracks/Beginner.svg"
import Healthcare from "../../../assets/tracks/Healthcare.svg"
import Justice from "../../../assets/tracks/Justice.svg"
import Sustainability from "../../../assets/tracks/Sustainability.svg"
import UIUX from "../../../assets/tracks/UXIcon.svg"
import Fintech from "../../../assets/tracks/Fintech.svg"
import NewTech from "../../../assets/tracks/NewTech.svg"
import Slug from "../../../assets/tracks/Slug.svg"
import { HeroIcon } from "../../../utils/types"
import {
  ArrowTrendingUpIcon,
  BeakerIcon,
  CurrencyDollarIcon,
  GlobeAmericasIcon,
  HeartIcon,
  HomeIcon,
  RectangleGroupIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline"

export type PrizeTrack = {
  Icon: HeroIcon
  color: string
  title: string
  blurb: string
}

// NOTE: Due to tailwindcss's JIT mode, we can't use dynamic classes for background hover colors
export const TechCaresTracks: PrizeTrack[] = [
  {
    Icon: GlobeAmericasIcon,
    color: "hover:bg-blue-button/80",
    title: "SUSTAINABILITY",
    blurb:
      "This category is dedicated to supporting sustainability and conservation efforts. How can we live harmoniously with our planet?",
  },
  {
    Icon: HeartIcon,
    color: "hover:bg-pink/80",
    title: "HEALTH",
    blurb:
      "This category aspires to address healthcare disparities. How do we support mental & physical well-being with accessible services?",
  },
  {
    Icon: ScaleIcon,
    color: "hover:bg-orange/80",
    title: "JUSTICE",
    blurb:
      "This category aims to drive innovation for civil liberty and social justice. How can we uphold truth & order in a (mis)information age?",
  },
  {
    Icon: CurrencyDollarIcon,
    color: "hover:bg-purple/80",
    title: "FINTECH",
    blurb:
      "This category is dedicated to driving innovation in financial technology for social good. How can we make finances and banking more accessible to the general public?",
  },
]

export const CategoryTracks: PrizeTrack[] = [
  {
    Icon: ArrowTrendingUpIcon,
    title: "BEGINNER",
    color: "hover:bg-turquoise/50",
    blurb:
      "Hackathons are meant for everyone, especially our first-timers! We've created a prize category to reward teams composed of all first-time hackers.",
  },
  {
    Icon: BeakerIcon,
    title: "NEW TECHNOLOGIES",
    color: "hover:bg-purple-han/50",
    blurb:
      "Create a project using some of the newest technologies, such as AI/ML, AR/VR, or decentralized technology.",
  },
  {
    Icon: RectangleGroupIcon,
    title: "UI/UX",
    color: "hover:bg-blue-chinese/80",
    blurb:
      "Have a new paradigm for interaction design? Create a project that has an awesome user experience!",
  },
  {
    Icon: HomeIcon,
    title: "SLUGHACKS",
    color: "hover:bg-orange/70",
    blurb: "Create something that benefits the UC Santa Cruz campus community!",
  },
]
