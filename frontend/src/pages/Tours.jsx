import React, { useState } from "react";
import Card from "../components/Card";
import { motion } from "framer-motion";
import DetailModal from "../components/DetailModal";

export default function Tours() {
  const [active, setActive] = useState(null);

const tours = [
  {
    title: "Hampi Ruins",
    subtitle: "Ancient Vijayanagara treasure",
    color: "#D79922",
    img: null,
    description: 
`Hampi is a surreal landscape of boulders, broken temple towers, musical pillars, and forgotten palaces. Once the capital of the Vijayanagara empire, it still whispers stories of kings, dancers, musicians, and merchants from centuries past. Walking through Hampi feels like wandering through a living epic — quiet, spiritual, timeless.`
  },
  {
    title: "Majuli Island",
    subtitle: "World’s largest river island",
    color: "#EFE2BA",
    img: null,
    description:
`Majuli in Assam is a floating world of satras, mask-making traditions, folk music, and warm monk communities. Its culture is untouched, its pace gentle, and its nature serene. Majuli shows how spirituality and nature coexist beautifully on the Brahmaputra River.`
  },
  {
    title: "Gokarna Trails",
    subtitle: "Coastal peace & cliff walks",
    color: "#7FB069",
    img: null,
    description:
`Gokarna remains a quiet alternative to Goa — with forested cliffs, empty beaches, temple lore, and slow village life. Sunset trails along Kudle and Om Beach reveal dramatic coastlines, fishermen at work, and an unhurried rhythm no city can offer.`
  },
  {
    title: "Bhimbetka Caves",
    subtitle: "Prehistoric rock paintings",
    color: "#A66CFF",
    img: null,
    description:
`Bhimbetka is a UNESCO site where ancient humans left their stories painted on cave walls. Wildlife scenes, dances, rituals, weapons, and daily life — all preserved for over 30,000 years. These caves are India’s oldest art gallery, echoing the creativity of our earliest ancestors.`
  },
  {
    title: "Chettinad Mansions",
    subtitle: "Palatial artisan homes",
    color: "#E76F51",
    img: null,
    description:
`Chettinad is a forgotten world of mansions built with Burma teak, Italian marble, Athangudi tiles, and meticulous craftsmanship. Every home reflects luxury, tradition, and incredible attention to detail. Exploring Chettinad is like opening a treasure chest of architectural heritage.`
  },
  {
    title: "Spiti Villages",
    subtitle: "Monasteries & moonlike deserts",
    color: "#2E8B57",
    img: null,
    description:
`Spiti’s remote villages — Langza, Komic, Dhankar — show Himalayan life untouched by modern noise. Ancient monasteries, fossil-filled hills, star-filled skies, and warm homestays create an experience that feels both spiritual and otherworldly.`
  },
  {
    title: "Chilika Backwaters",
    subtitle: "Flamingos & island life",
    color: "#F4A261",
    img: null,
    description:
`Chilika Lake is Asia’s largest brackish lagoon, home to dolphins, migratory birds, and tiny fishing islands. Visitors explore calm waters, floating villages, and vibrant bird colonies — a quiet world painted in soft blues and pinks.`
  },
  {
    title: "Ziro Valley",
    subtitle: "Tribal music & rice fields",
    color: "#1E90FF",
    img: null,
    description:
`Ziro Valley is famous for its Apatani tribal culture, bamboo houses, terraced rice fields, and India’s most soulful music festival. Time slows here — people live gently, harmoniously, and creatively amidst endless green.`
  },
  {
    title: "Chaukhamba Meadows",
    subtitle: "Untouched alpine paradise",
    color: "#8E6E53",
    img: null,
    description:
`These pristine Himalayan meadows remain one of India’s least explored trekking gems. Wildflowers, crystal streams, snowy peaks, and total silence — a place where nature feels raw, sacred, and vast.`
  },
  {
    title: "Velas Village",
    subtitle: "Turtle conservation & coastal life",
    color: "#9A6324",
    img: null,
    description:
`Velas is a small Konkani village where community members protect Olive Ridley turtles. During hatching season, baby turtles crawl towards the sea at sunrise — a breathtaking moment showing harmony between humans and nature.`
  }
];


  return (
    <div className="min-h-screen bg-[#faf4e6] py-16">
      <div className="container mx-auto px-6">

        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold font-merri mb-6 text-gray-900"
        >
          Cultural Tours & Trails
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-gray-700 max-w-3xl text-lg mb-10"
        >
          Discover slow, meaningful travel experiences — learn from artisans, participate in rituals, taste regional cuisines, and walk the landscapes that shaped traditions.
        </motion.p>

        {/* GRID */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tours.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="transition-transform hover:-translate-y-2 hover:scale-[1.01] cursor-pointer"
              onClick={() => setActive(t)}
            >
              <Card {...t} />
            </motion.div>
          ))}
        </div>

        {active && <DetailModal item={active} onClose={() => setActive(null)} />}

      </div>
    </div>
  );
}
