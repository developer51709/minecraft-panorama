// Release notes, history, and facts for every panorama in the archive.
// Keyed by the catalog id (category/pack). "year" drives the timeline stats.
export const HISTORY = {
  // --- Java Edition ---
  "Java/classic": {
    year: 2011,
    release: "Beta 1.8 · September 2011",
    version: "Java Edition, used through 1.12.2",
    summary: "The original title-screen landscape: a wide valley with a floating sand formation, a village, and a lone tree slowly panning behind the main menu.",
    facts: [
      "It was the menu backdrop for more than six years, from Beta 1.8 in 2011 until 1.13 retired it in 2018.",
      "The world seed behind it (2151901553968352745) was rediscovered by the community in 2019, letting players revisit the exact spot.",
    ],
  },
  "Java/classic_blurred": {
    year: 2011,
    release: "Beta 1.8 · September 2011",
    version: "Java Edition",
    summary: "The heavily blurred version of the original landscape, used as the dimmed backdrop for menus layered over the title screen.",
    facts: [
      "Menus such as Options and Singleplayer blur the panorama so foreground text stays readable.",
      "It shares the same 2011 world as the unblurred Classic panorama.",
    ],
  },
  "Java/indev": {
    year: 2009,
    release: "Indev · 2009–2010",
    version: "Java Edition (pre-release era)",
    summary: "A look back at Minecraft before the cubemap menu existed, from the Indev and Infdev years.",
    facts: [
      "Indev ran from late 2009 into early 2010, years before the six-face panorama was introduced.",
      "Early builds used a simple tiled dirt background instead of a rendered world.",
    ],
  },
  "Java/aquatic_java": {
    year: 2018,
    release: "1.13 Update Aquatic · July 18, 2018",
    version: "Java Edition 1.13",
    summary: "A warm ocean teeming with coral and kelp, celebrating the update that rewrote Minecraft's seas.",
    facts: [
      "Update Aquatic replaced the old ocean biomes and added swimming, turtles, tridents, and drowned.",
      "It was the first new title-screen panorama after the original 2011 one was retired.",
    ],
  },
  "Java/village_and_pillage_java": {
    year: 2019,
    release: "1.14 Village & Pillage · April 23, 2019",
    version: "Java Edition 1.14",
    summary: "A village at golden hour with the pandas, foxes, and pillager outposts that arrived in Village & Pillage.",
    facts: [
      "1.14 overhauled villager professions and the entire trading system.",
      "It introduced pillagers, their outposts, and the village raid event.",
    ],
  },
  "Java/caves_java": {
    year: 2021,
    release: "1.17 Caves & Cliffs: Part I · June 8, 2021",
    version: "Java Edition 1.17",
    summary: "A glowing cave interior with amethyst and axolotls, showcasing the first half of the Caves & Cliffs update.",
    facts: [
      "Caves & Cliffs was split in two; 1.17 added axolotls, goats, glow squid, and copper.",
      "The full cave and mountain overhaul arrived later in 1.18.",
    ],
  },
  "Java/chase_the_skies_java": {
    year: 2025,
    release: "1.21.6 Chase the Skies · June 17, 2025",
    version: "Java Edition 1.21.6",
    summary: "A bright sky scene featuring the happy ghast, the rideable mob introduced by the Chase the Skies game drop.",
    facts: [
      "Chase the Skies was the second 2025 game drop, released June 17, 2025.",
      "Happy ghasts can be fitted with a harness and steered through the sky.",
    ],
  },
  "Java/tiny_takeover_java": {
    year: 2026,
    release: "26.1 Tiny Takeover · March 24, 2026",
    version: "Java Edition 26.1",
    summary: "A miniature world populated by the redesigned baby mobs of the Tiny Takeover game drop.",
    facts: [
      "Tiny Takeover was the first 2026 game drop, themed around cuteness and baby mobs.",
      "It shipped as Java 26.1 and Bedrock 26.10, the first of the new 26.x version numbers.",
    ],
  },

  // --- Java + Bedrock ---
  "Java_and_Bedrock/buzzy_bees": {
    year: 2019,
    release: "1.15 Buzzy Bees · December 10, 2019",
    version: "Java 1.15 / Bedrock 1.14",
    summary: "A flower forest alive with bees and honey, the newest mobs of the Buzzy Bees update.",
    facts: [
      "Buzzy Bees added bees, beehives, honey blocks, and honeycomb.",
      "It was a smaller quality-of-life update with no new terrain.",
    ],
  },
  "Java_and_Bedrock/nether": {
    year: 2020,
    release: "1.16 Nether Update · June 23, 2020",
    version: "Java 1.16 / Bedrock 1.16",
    summary: "A crimson forest deep in the Nether, the headline biome of the Nether Update.",
    facts: [
      "The Nether Update added four Nether biomes, including crimson and warped forests.",
      "It introduced netherite, the strongest gear tier in the game.",
    ],
  },
  "Java_and_Bedrock/caves": {
    year: 2021,
    release: "1.17 Caves & Cliffs: Part I · June 8, 2021",
    version: "Java 1.17 / Bedrock 1.17",
    summary: "A moody underground scene with copper ore and deepslate, setting the tone for Caves & Cliffs.",
    facts: [
      "Copper ore and the deepslate layer both debuted in 1.17.",
      "1.17 also raised the world's build-height limit.",
    ],
  },
  "Java_and_Bedrock/cliffs": {
    year: 2021,
    release: "1.18 Caves & Cliffs: Part II · November 30, 2021",
    version: "Java 1.18 / Bedrock 1.18",
    summary: "A dramatic mountain vista, the signature of Caves & Cliffs' revamped world generation.",
    facts: [
      "1.18 rewrote world generation to build taller mountains and far deeper caves.",
      "It completed the update that had begun in 1.17.",
    ],
  },
  "Java_and_Bedrock/wild": {
    year: 2022,
    release: "1.19 The Wild Update · June 7, 2022",
    version: "Java 1.19 / Bedrock 1.19",
    summary: "A dark mangrove swamp, the headline of The Wild Update.",
    facts: [
      "The Wild Update added mangrove swamps, frogs, tadpoles, and the deep dark.",
      "The warden, a blind mob that hunts by sound, guards the ancient cities.",
    ],
  },
  "Java_and_Bedrock/trails_and_tales": {
    year: 2023,
    release: "1.20 Trails & Tales · June 7, 2023",
    version: "Java 1.20 / Bedrock 1.20",
    summary: "A cherry grove in bloom beside an archaeology dig site, the face of Trails & Tales.",
    facts: [
      "Trails & Tales added cherry groves, camels, the sniffer, and archaeology.",
      "It launched on June 7, 2023 — exactly one year after The Wild Update.",
    ],
  },
  "Java_and_Bedrock/tricky_trials": {
    year: 2024,
    release: "1.21 Tricky Trials · June 13, 2024",
    version: "Java 1.21 / Bedrock 1.21",
    summary: "The interior of a trial chamber, the combat centrepiece of the Tricky Trials update.",
    facts: [
      "Tricky Trials added trial chambers, the breeze mob, and the mace.",
      "It focused on combat and exploration rather than new biomes.",
    ],
  },
  "Java_and_Bedrock/garden_awakens": {
    year: 2024,
    release: "1.21.4 The Garden Awakens · December 3, 2024",
    version: "Java 1.21.4 / Bedrock 1.21.50",
    summary: "A pale garden at dusk with the creaking, the eerie guardian of The Garden Awakens.",
    facts: [
      "The Garden Awakens added the pale garden biome and the creaking mob.",
      "It was 2024's winter game drop.",
    ],
  },
  "Java_and_Bedrock/spring_to_life": {
    year: 2025,
    release: "1.21.5 Spring to Life · March 25, 2025",
    version: "Java 1.21.5 / Bedrock 1.21.70",
    summary: "A spring meadow alive with new plant life and ambience, the first 2025 game drop.",
    facts: [
      "Spring to Life added warm and cold variants of several mobs plus new vegetation.",
      "It was the first of three game drops released in 2025.",
    ],
  },
  "Java_and_Bedrock/copper_age": {
    year: 2025,
    release: "1.21.9 The Copper Age · September 30, 2025",
    version: "Java 1.21.9 / Bedrock 1.21.111",
    summary: "A copper-lit workshop with the copper golem, the mascot of The Copper Age drop.",
    facts: [
      "The Copper Age added copper tools, armour, and the copper golem.",
      "It released on September 30, 2025 as 2025's third drop.",
    ],
  },
  "Java_and_Bedrock/mounts_of_mayhem": {
    year: 2025,
    release: "1.21.11 Mounts of Mayhem · December 9, 2025",
    version: "Java 1.21.11 / Bedrock 1.21.130",
    summary: "A charge across land and sea featuring the new mounts of the Mounts of Mayhem drop.",
    facts: [
      "Mounts of Mayhem expanded mounted combat and added new rideable mounts.",
      "It closed out 2025 on December 9.",
    ],
  },

  // --- Bedrock Edition ---
  "Bedrock/aquatic_bedrock": {
    year: 2018,
    release: "Bedrock 1.4 Update Aquatic · 2018",
    version: "Bedrock Edition 1.4",
    summary: "Bedrock's take on the Update Aquatic, showing off the ocean life added in 2018.",
    facts: [
      "The Update Aquatic reached Bedrock in phases across 2018.",
      "It added turtles, tridents, and coral reefs to the edition.",
    ],
  },
  "Bedrock/bedrock_beta": {
    year: 2011,
    release: "Pocket Edition alpha/beta · 2011–2012",
    version: "Bedrock Edition (early Pocket Edition)",
    summary: "An early Pocket Edition menu scene from the days before the Bedrock branding.",
    facts: [
      "Pocket Edition launched on Android and iOS in 2011.",
      "It later grew into today's cross-platform Bedrock Edition.",
    ],
  },
  "Bedrock/better_together": {
    year: 2017,
    release: "Bedrock 1.2 Better Together · September 20, 2017",
    version: "Bedrock Edition 1.2.0",
    summary: "A world shared across devices, the theme of the Better Together Update.",
    facts: [
      "Better Together unified Pocket, Windows 10, Xbox, and other platforms into one Bedrock Edition.",
      "It released on September 20, 2017.",
    ],
  },
  "Bedrock/buzzy_bees_bedrock": {
    year: 2019,
    release: "Bedrock 1.14 Buzzy Bees · December 2019",
    version: "Bedrock Edition 1.14",
    summary: "Bedrock's Buzzy Bees panorama, buzzing with the new bees and honey blocks.",
    facts: [
      "Bees, beehives, and honey blocks reached Bedrock alongside Java 1.15.",
      "Bee nests generate naturally in flower forests and plains.",
    ],
  },
  "Bedrock/cats_and_pandas": {
    year: 2018,
    release: "Bedrock 1.8 · December 11, 2018",
    version: "Bedrock Edition 1.8.0",
    summary: "Pandas munching bamboo, the mascots of Bedrock's first Village & Pillage release.",
    facts: [
      "Bedrock 1.8.0 landed on December 11, 2018.",
      "It added pandas, cats, and scaffolding ahead of the full update.",
    ],
  },
  "Bedrock/chase_the_skies_bedrock": {
    year: 2025,
    release: "Bedrock 1.21.90 Chase the Skies · June 2025",
    version: "Bedrock Edition 1.21.90",
    summary: "Bedrock's Chase the Skies scene, featuring the happy ghast.",
    facts: [
      "Bedrock received Chase the Skies in 1.21.90, alongside Java 1.21.6.",
      "Vibrant Visuals debuted on Bedrock around this drop.",
    ],
  },
  "Bedrock/chase_the_skies_bedrock_1.21.90.25": {
    year: 2025,
    release: "Bedrock preview 1.21.90.25 · 2025",
    version: "Bedrock Edition (preview build)",
    summary: "A preview build of the Chase the Skies panorama, captured mid-development.",
    facts: [
      "Bedrock previews let players test upcoming drops before release.",
      "This snapshot belongs to the 1.21.90 cycle.",
    ],
  },
  "Bedrock/christmas_bedrock": {
    year: 2020,
    release: "Bedrock seasonal · December",
    version: "Bedrock Edition (holiday)",
    summary: "A snowy holiday world used as a seasonal Bedrock menu background.",
    facts: [
      "Bedrock swaps in seasonal title art for the holidays.",
      "The scene is dressed with snow, spruce trees, and festive lights.",
    ],
  },
  "Bedrock/halloween_2021_bedrock": {
    year: 2021,
    release: "Bedrock seasonal · October 2021",
    version: "Bedrock Edition (holiday)",
    summary: "A spooky Halloween-themed Bedrock scene from 2021.",
    facts: [
      "Halloween art returns each October with pumpkins and jack-o'-lanterns.",
      "This one ran during the 1.17 era.",
    ],
  },
  "Bedrock/halloween_2022_bedrock": {
    year: 2022,
    release: "Bedrock seasonal · October 2022",
    version: "Bedrock Edition (holiday)",
    summary: "The 2022 Halloween Bedrock scene, darker and more autumnal than the year before.",
    facts: [
      "Bedrock's holiday scenes are temporary and rotate every year.",
      "This panorama was stored as JPEGs rather than PNGs.",
    ],
  },
  "Bedrock/preview_bedrock": {
    year: 2025,
    release: "Bedrock preview · ongoing",
    version: "Bedrock Edition (preview builds)",
    summary: "The default backdrop used by Bedrock preview builds while a drop's panorama is still in progress.",
    facts: [
      "Preview builds ship features ahead of the stable release.",
      "Their panorama often previews the upcoming game drop.",
    ],
  },
  "Bedrock/tiny_takeover_bedrock": {
    year: 2026,
    release: "Bedrock 26.10 Tiny Takeover · March 24, 2026",
    version: "Bedrock Edition 26.10",
    summary: "The baby mobs of Tiny Takeover in a miniature world.",
    facts: [
      "Tiny Takeover arrived on March 24, 2026 for both editions.",
      "Bedrock's version number jumped to 26.10 with the new naming scheme.",
    ],
  },
  "Bedrock/village_and_pillage_bedrock": {
    year: 2018,
    release: "Bedrock 1.8–1.11 · 2018–2019",
    version: "Bedrock Edition",
    summary: "A Bedrock village scene from the multi-part Village & Pillage rollout.",
    facts: [
      "Bedrock spread Village & Pillage across versions 1.8.0 through 1.11.0.",
      "1.8.0, 1.9.0, 1.10.0, and 1.11.0 each delivered a slice of the update.",
    ],
  },

  // --- Bedrock Vibrant Visuals ---
  "Bedrock_Vibrant_Visuals/chase_the_skies_bedrock-vv": {
    year: 2025,
    release: "Bedrock 1.21.90 · June 2025",
    version: "Bedrock Edition (Vibrant Visuals)",
    summary: "The Chase the Skies panorama rendered with Vibrant Visuals, Bedrock's upgraded lighting.",
    facts: [
      "Vibrant Visuals is Bedrock's official graphics overhaul, adding real-time shadows and lighting.",
      "It arrived for Bedrock in 2025.",
    ],
  },
  "Bedrock_Vibrant_Visuals/copper_age_bedrock-vv": {
    year: 2025,
    release: "Bedrock 1.21.111 · September 30, 2025",
    version: "Bedrock Edition (Vibrant Visuals)",
    summary: "The Copper Age scene with Vibrant Visuals lighting enabled.",
    facts: [
      "Copper blocks, tools, and armour headline this drop.",
      "Vibrant Visuals changes how copper's metallic sheen is lit.",
    ],
  },
  "Bedrock_Vibrant_Visuals/mounts_of_mayhem_bedrock-vv": {
    year: 2025,
    release: "Bedrock 1.21.130 · December 9, 2025",
    version: "Bedrock Edition (Vibrant Visuals)",
    summary: "Mounts of Mayhem captured with Vibrant Visuals' dynamic lighting.",
    facts: [
      "Mounts of Mayhem released on December 9, 2025.",
      "Vibrant Visuals makes the new mounts' armour and terrain stand out.",
    ],
  },
  "Bedrock_Vibrant_Visuals/tiny_takeover_bedrock-vv": {
    year: 2026,
    release: "Bedrock 26.10 · March 24, 2026",
    version: "Bedrock Edition (Vibrant Visuals)",
    summary: "Tiny Takeover's baby mobs lit with Vibrant Visuals.",
    facts: [
      "Tiny Takeover was the first game drop of 2026.",
      "Vibrant Visuals is enabled by default on supported hardware.",
    ],
  },

  // --- Education Edition ---
  "Education/1.14_education": {
    year: 2020,
    release: "Minecraft Education 1.14 · 2020",
    version: "Education Edition 1.14",
    summary: "A classroom menu scene from Education Edition's 1.14 line.",
    facts: [
      "Minecraft: Education Edition is built on the Bedrock engine and aimed at schools.",
      "The 1.14 line brought Village & Pillage features to the classroom.",
    ],
  },
  "Education/1.14_demo_education": {
    year: 2020,
    release: "Minecraft Education 1.14 demo · 2020",
    version: "Education Edition 1.14 (trial)",
    summary: "The panorama used by the Education Edition trial build.",
    facts: [
      "Education Edition offers a free trial for classrooms to evaluate it.",
      "The demo shares its world art with the 1.14 release.",
    ],
  },
  "Education/chase_the_clouds_education": {
    year: 2025,
    release: "Minecraft Education Chase the Clouds · 2025",
    version: "Minecraft Education",
    summary: "Education Edition's Chase the Clouds update scene, carrying the Spring to Life features into classrooms.",
    facts: [
      "Chase the Clouds is the Minecraft Education update built on the Spring to Life game drop.",
      "It added warm and cold mob variants to Education Edition.",
    ],
  },
  "Education/cloud_education": {
    year: 2025,
    release: "Minecraft Education · 2025",
    version: "Minecraft Education",
    summary: "An Education Edition panorama focused on open sky and cloudscapes.",
    facts: [
      "Education Edition's backdrop rotates with each classroom update.",
      "It shares the Bedrock engine's world style.",
    ],
  },
  "Education/copper_collaborate_complete_education": {
    year: 2025,
    release: "Minecraft Education · 2025",
    version: "Minecraft Education",
    summary: "A collaborative Education scene themed around copper and teamwork.",
    facts: [
      "Education Edition emphasises multiplayer classroom projects.",
      "It pairs with The Copper Age content for schools.",
    ],
  },
  "Education/goat_education": {
    year: 2021,
    release: "Education GOAT Update 1.17.30 · November 2, 2021",
    version: "Education Edition 1.17.30",
    summary: "A goat on a mountainside, from Education Edition's 'GOAT Update'.",
    facts: [
      "The GOAT Update celebrated Education Edition's five-year anniversary on November 2, 2021.",
      "It brought goats, axolotls, and the Caves & Cliffs features to classrooms.",
    ],
  },
  "Education/learn_to_code_education": {
    year: 2020,
    release: "Education 1.14.50 Learn to Code · November 10, 2020",
    version: "Education Edition 1.14.50",
    summary: "A scene from the Learn to Code Update, promoting coding in the classroom.",
    facts: [
      "The Learn to Code Update shipped the Code Builder and Python/C++ lessons.",
      "It released on November 10, 2020.",
    ],
  },
  "Education/mobile_multiplayer_more_education": {
    year: 2016,
    release: "Minecraft Education · 2016",
    version: "Education Edition (early)",
    summary: "An early Education Edition scene highlighting mobile play and classroom multiplayer.",
    facts: [
      "Minecraft: Education Edition launched for classrooms in 2016.",
      "Multiplayer and broad device support were among its earliest selling points.",
    ],
  },
  "Education/school_education": {
    year: 2016,
    release: "Minecraft Education · 2016",
    version: "Minecraft Education",
    summary: "A schoolroom-flavoured world used on the Education Edition menu.",
    facts: [
      "Education Edition replaced the earlier MinecraftEdu after Microsoft acquired Mojang.",
      "It ships with ready-made lessons and classroom management tools.",
    ],
  },
  "Education/school_demo_education": {
    year: 2016,
    release: "Minecraft Education demo · 2016",
    version: "Minecraft Education (trial)",
    summary: "The menu backdrop for the Education Edition trial.",
    facts: [
      "The trial lets teachers evaluate Education Edition before licensing it.",
      "It shares the school-themed art of the full release.",
    ],
  },
  "Education/trails_and_tales_education": {
    year: 2023,
    release: "Education 1.19.52 Trails & Tales · August 8, 2023",
    version: "Education Edition 1.19.52",
    summary: "Education Edition's Trails & Tales scene, complete with cherry blossoms and archaeology.",
    facts: [
      "Education 1.19.52 brought Trails & Tales into classrooms in August 2023.",
      "It added the cherry grove, the sniffer, and archaeology.",
    ],
  },
  "Education/wild_education": {
    year: 2022,
    release: "Minecraft Education The Wild Update · 2022",
    version: "Minecraft Education",
    summary: "Education Edition's Wild Update backdrop, with mangroves and frogs.",
    facts: [
      "The Wild Update features reached Education Edition after the Java and Bedrock release.",
      "Mangrove swamps and frogs were the classroom highlights.",
    ],
  },

  // --- April Fools' ---
  "April_Fools/craftmine": {
    year: 2025,
    release: "25w14craftmine · April 1, 2025",
    version: "Java Edition (April Fools' snapshot)",
    summary: "A pixelated cave-crafting world from the Craftmine April Fools' snapshot.",
    facts: [
      "The Craftmine Update turned the Overworld into a mining-and-crafting puzzle game.",
      "It released on April 1, 2025 as snapshot 25w14craftmine.",
    ],
  },
  "April_Fools/herdcraft": {
    year: 2026,
    release: "26w14a · April 1, 2026",
    version: "Java Edition (April Fools' snapshot)",
    summary: "A pastoral, animal-filled world from the HerdCraft April Fools' snapshot.",
    facts: [
      "HerdCraft was the 2026 April Fools' joke, released as snapshot 26w14a.",
      "It leaned into herding, breeding, and a barn full of new animal behaviour.",
    ],
  },
  "April_Fools/poisonous_potato": {
    year: 2024,
    release: "24w14potato · April 1, 2024",
    version: "Java Edition (April Fools' snapshot)",
    summary: "A bizarre potato dimension from the Poisonous Potato Update.",
    facts: [
      "The Poisonous Potato Update was the 2024 April Fools' joke.",
      "It added a full potato-themed dimension with its own blocks and mobs.",
    ],
  },

  // --- Other editions ---
  "Others/nether_nintendo_3ds": {
    year: 2017,
    release: "New Nintendo 3DS Edition · 2017",
    version: "New Nintendo 3DS Edition",
    summary: "A Nether scene from the menu of the New Nintendo 3DS Edition.",
    facts: [
      "The New Nintendo 3DS Edition launched in 2017 and was discontinued in 2019.",
      "It was a separate port from Bedrock, with a smaller world and no multiplayer.",
    ],
  },
};
