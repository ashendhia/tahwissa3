import { PrismaClient } from "@prisma/client";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const admin = {
  name: "Loukkaf Houcine Dhiaaeddine",
  username: "ADMIN",
  password: "ADMIN1041",
};

const regions = [
  {
    name: "Oranie",
    about:
      "Magnificent beaches and large ports, this is what sums up Oranie well, and a culture that goes beyond history.",
    description: `Magnificent beaches and large ports, this is what sums up Oranie well. Nicknamed "El Bahia" (the radiant one), Oran is the second city in the country. Its coast is dotted with beaches, some of which are among the wildest in the Mediterranean. Coming from a turbulent colonial past (Spanish, Turkish, and French), the region has been able to form its own identity. She is today recognized for its impressive cultural heritage, including raï. This style of music, as rebellious as it is sensual, has become the city's ambassador throughout the world.\r\n\r\nThe second city of Oranie, Tlemcen, located at an altitude of 800 m, is the only city in Algeria to be able to boast of having Moorish buildings of the quality of those of Andalusia. Nowadays, the so-called "city of cherries" is a place conducive to relaxation and one of the most pleasant to visit. Mostaganem has, for its part, kept an old character, but has also opened up to a modern economy. As proof, just go to the new district of Tijdit, where the beautiful surrounding beaches allow you to enjoy the sun.`,
  },
  {
    name: "Algérois",
    about:
      "The Algérois region boasts of stunning Mediterranean coastlines and a rich cultural heritage.",
    description: `The Algérois region, also known as the Algiers region, is located in the north of Algeria and is home to the country's capital city, Algiers. With a rich history dating back to ancient times, Algiers is a vibrant and bustling city that is a mix of old and new. The Casbah of Algiers, a UNESCO World Heritage site, is a maze of narrow streets and alleys that are home to historic mosques, palaces, and other buildings. The region is also known for its beautiful beaches, such as those in Tipaza and Cherchell, which offer crystal-clear waters and stunning scenery.
      
      Other wilayas in the Algérois region include Blida, Boumerdès, Médéa, and Bouira, each with its own unique history and culture. Whether you're interested in exploring ancient ruins, relaxing on the beach, or immersing yourself in local culture, the Algérois region has something for everyone.`,
  },
  {
    name: "Grande Kabylie",
    about:
      "The rugged terrain of Grande Kabylie, in Tizi Ouzou, Bouira and Boumerdes, offers stunning views and a unique Kabyle culture.",
    description: `Despite its title, it's in fact smaller when compared to Petite Kabylie, but it's named so for its significant cultural and historical importance, comprising Tizi Ouzou, Boumerdes, and Bouira wilayas, is a rugged and mountainous area located in the eastern part of the Kabylie region in Algeria. It is home to the majority of the Kabyle people, who have a unique culture and language. The region boasts breathtaking landscapes, including the Djurdjura Mountains, which offer stunning views and numerous trekking opportunities. Grande Kabylie is also renowned for its rich history, with several important historical sites and landmarks, such as the Kabyle forts and ancient tombs.
  
      The region is also known for its cuisine, which includes specialties like couscous, tajines, and kabyle-style dishes. Despite its relatively small size, Grande Kabylie is a treasure trove of natural beauty, culture, and history that is definitely worth exploring.`,
  },
  {
    name: "Petite Kabylie",
    about:
      "Petite Kabylie is a picturesque region in northeastern Algeria, known for diverse landscapes, rich history, and vibrant markets.",
    description: `Petite Kabylie, also known as Little Kabylie, is a region in northern Algeria that encompasses the wilayas of Bejaia, Bordj Bou Arreridj, Skikda, Mila, Jijel, and Sétif. It is characterized by its diverse landscapes, ranging from lush forests and mountain ranges to fertile plains and coastal areas. The region is known for its unique culture and history, with a mix of Berber, Arab, and Mediterranean influences.
  
      Petite Kabylie is also famous for its vibrant music and arts scene, with traditional Kabyle music and dance still popular among locals. The region is renowned for its delicious cuisine, which features a mix of Mediterranean and Berber flavors. The region's bustling ports and industrial centers have attracted many foreign investors in recent years, leading to a growth in infrastructure and job opportunities.
      
      In short, Petite Kabylie is a beautiful and diverse region with a rich history, culture, and economy, making it a must-visit destination for anyone exploring Algeria.`,
  },
  {
    name: "Constantinois",
    about:
      "Constantinois is a region in the northeast of Algeria, known for its beautiful beaches and rich history.",
    description: `Constantinois is a region in the northeast of Algeria. It is characterized by its beautiful beaches, lush forests, and rich history. The region is home to the city of Constantine, which is known for its ancient ruins and beautiful architecture. The region is also home to the city of Annaba, which is famous for its beautiful beaches and rich history.`,
  },
  {
    name: "Atlas Sahraoui",
    about:
      "Atlas Sahraoui is a region in the midwest of Algeria or known for being predesert",
    description: `Atlas Sahraoui is a region in the midwest of Algeria or known for being predesert`,
  },
  {
    name: "Aurès",
    about:
      "Aurès is a region in mideast of Algeria, known for its rich history and wonderful nature",
    description:
      "Aurès is a region in mideast of Algeria, known for its rich history and wonderful nature",
  },
  {
    name: "Toggourt",
    about:
      "Toggourt is a region in the mideast of Algeria, known for its rich history and wonderful nature",
    description:
      "Toggourt is a region in the mideast of Algeria, known for its rich history and wonderful nature",
  },
  {
    name: "Le M'Zab",
    about:
      "M'Zab is a region in middle of Algeria, encompasses the wilayas of Ghardaia and El Meniaa, and is home to Beni M'Zab",
    description:
      "M'Zab is a region in middle of Algeria, encompasses the wilayas of Ghardaia and El Meniaa, and is home to Beni M'Zab",
  },
  {
    name: "Saoura",
    about:
      "Saoura is a region in the southwest of Algeria, known for its rich history and wonderful nature",
    description:
      "Saoura is a region in the southwest of Algeria, known for its rich history and wonderful nature",
  },
  {
    name: "Oasis",
    about:
      "Oasis is a region in the southeast of Algeria, known for its rich history and wonderful nature",
    description:
      "Oasis is a region in the southeast of Algeria, known for its rich history and wonderful nature",
  },
];

const wilayas = [
  {
    name: "Tlemcen",
    nickname: "Tlemcen",
    about:
      "Historic city with rich heritage, stunning architecture, and vibrant culture. Must-visit destination in northwest Algeria.",
    description: `A city rich in history, culture, and heritage. Explore ancient ruins, magnificent mosques, and historic landmarks. Visit the grand Tlemcen National Park, admire the stunning architecture of the Great Mosque, and explore the exquisite El Mechouar Palace. Immerse yourself in Berber, Arab, and French influences.
        
        Discover local cuisine, music, and traditions. A must-visit destination for history buffs, art enthusiasts, and culture seekers.`,
    weather:
      "Tlemcen's climate is characterized by mild winters and hot summers. Experience the pleasant Mediterranean climate with comfortable temperatures, clear skies, and refreshing breezes. Ideal for outdoor activities, leisurely strolls, and enjoying the picturesque landscapes. The city's climate adds to its charm, making it a perfect destination for year-round travel.",
    transportation: "",
    special: true,
    food: [],
    regionId: 1,
  },
  {
    name: "Ain Temouchent",
    nickname: "Ain Temouchent",
    about:
      "Ain Temouchent is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 1,
  },
  {
    name: "Oran",
    nickname: "El Bahia",
    about:
      "Magnificent beaches and large ports, this is what sums up Oranie well, and a culture that goes beyond history.",
    description: `Its namesake, Oran, is a port city in northwest Algeria, known as the birthplace of rai folk music.
  
      Fort Santa Cruz, an Ottoman citadel rebuilt by the Spanish, sits atop Mount Murdjadjo and has views of the bay below. Nearby is the whitewashed Chapelle Santa Cruz, built after a cholera epidemic. In La Blanca, the Turkish old town, is the 18th-century Pacha Mosque with an octagonal minaret. Nearby, Kasr El Bey is an Ottoman palace.`,
    weather: `The climate of Oran is Mediterranean, with mild, rainy winters and hot, sunny summers. 
  
      The city also is windy, as it is affected by the typical winds of the Alboran Sea, the west and east wind.
      Sometimes, it can even snow. However, snow is much more common in the hills behind the town.`,
    transportation: `The city of Oran occupies a strategic location with a port and an airport of international standards oriented towards the transport of passengers and goods.
  
      Road transport is divided into two types, urban and semi-urban, which is secured by buses, taxis.`,
    regionId: 1,
    special: true,
    food: [
      {
        name: "Garantita",
        description: `Karantika (كرنتيكا) in Oran / 
      garantita (قرنطيطة) in Algiers or Calantica, Garantica, el-hami is an Algerian oven-baked dish which has a flan appearance composed of 3 layers {the lower layer which is thick, the second layer soft and the 3rd layer a thin layer au gratin}.`,
      },
      {
        name: "Berkoukes",
        description:
          "Berkoukes is an Algerian winter recipe that can also be found in Tunisia or Morocco. Easy and economical, it is made in very large quantities to satisfy the whole family. Its Oran version offers a delicious mixture of chicken and ground beef for an even more complete dish!",
      },
      {
        name: "Paëlla oranaise",
        description:
          "la Paëlla est un célèbre met traditionnel valencien à base de riz, viandes et de fruits de mer. Ce plat mythique aux couleurs et saveurs de l’Espagne connait un grand succès dans la cuisine algérienne notamment à l’ouest du pays, dans la ville balnéaire d’Oran.",
      },
      {
        name: "La Mouna",
        description:
          "La Mouna est une brioche en forme de dôme parsemée de sucre en grains. Parfumée à l’anis, à la fleur d’oranger et aux zestes de citron et d’orange, elle est traditionnellement préparée pour Pâques en Algérie et plus précisément à Oran.",
      },
    ],
  },
  {
    name: "Mostaganem",
    nickname: "Mostaganem",
    about:
      "Mostaganem is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 1,
  },
  {
    name: "Sidi Bel Abbès",
    nickname: "Sidi Bel Abbès",
    about:
      "Sidi Bel Abbès is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    special: true,
    food: [],
    regionId: 1,
  },
  {
    name: "Mascara",
    nickname: "Mascara",
    about:
      "Mascara is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 1,
  },
  {
    name: "Relizane",
    nickname: "Relizane",
    about:
      "Relizane is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 1,
  },
  {
    name: "Saïda",
    nickname: "Saïda",
    about:
      "Saïda is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 1,
  },
  {
    name: "Tiaret",
    nickname: "Tiaret",
    about:
      "Tiaret is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 1,
  },
  {
    name: "Tissemsilt",
    nickname: "Tissemsilt",
    about:
      "Tissemsilt is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 1,
  },
  {
    name: "Chlef",
    nickname: "Chlef",
    about: "Chlef is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 2,
  },
  {
    name: "Tipaza",
    nickname: "Tipaza",
    about: "Tipaza is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 2,
  },
  {
    name: "Algiers",
    nickname: "El Behdja",
    about:
      "Algiers is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 2,
  },
  {
    name: "Aïn Defla",
    nickname: "Aïn Defla",
    about:
      "Aïn Defla is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 2,
  },
  {
    name: "Blida",
    nickname: "Blida",
    about: "Blida is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 2,
  },
  {
    name: "Médéa",
    nickname: "Médéa",
    about: "Médéa is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 2,
  },
  {
    name: "Boumerdès",
    nickname: "Boumerdès",
    about:
      "Boumerdès is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 3,
  },
  {
    name: "Tizi Ouzou",
    nickname: "Tizi Ouzou",
    about:
      "Tizi Ouzou is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 3,
  },
  {
    name: "Bouira",
    nickname: "Bouira",
    about: "Bouira is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 3,
  },
  {
    name: "Béjaïa",
    nickname: "Béjaïa",
    about:
      "Béjaïa is a city in northeast of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 4,
  },
  {
    name: "Jijel",
    nickname: "Jijel",
    about:
      "Jijel is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 4,
  },
  {
    name: "Skikda",
    nickname: "Skikda",
    about:
      "Skikda is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 4,
  },
  {
    name: "Bordj Bou Arreridj",
    nickname: "Bordj Bou Arreridj",
    about:
      "Bordj Bou Arreridj is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 4,
  },
  {
    name: "Sétif",
    nickname: "Sétif",
    about:
      "Sétif is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 4,
  },
  {
    name: "Mila",
    nickname: "Mila",
    about:
      "Mila is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 4,
  },
  {
    name: "Annaba",
    nickname: "Annaba",
    about:
      "Annaba is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 5,
  },
  {
    name: "El Tarf",
    nickname: "El Tarf",
    about:
      "El Tarf is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 5,
  },
  {
    name: "Constantine",
    nickname: "Constantine",
    about:
      "Constantine is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 5,
  },
  {
    name: "Guelma",
    nickname: "Guelma",
    about:
      "Guelma is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 5,
  },
  {
    name: "Souk Ahras",
    nickname: "Souk Ahras",
    about:
      "Souk Ahras is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 5,
  },
  {
    name: "Naâma",
    nickname: "Naâma",
    about: "Naâma is a city in west Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 6,
  },
  {
    name: "El Bayadh",
    nickname: "El Bayadh",
    about:
      "El Bayadh is a city in west Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 6,
  },
  {
    name: "Laghouat",
    nickname: "Laghouat",
    about:
      "Laghouat is a city in midwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 6,
  },
  {
    name: "Djelfa",
    nickname: "Djelfa",
    about:
      "Djelfa is a city in midwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 6,
  },
  {
    name: "M'Sila",
    nickname: "M'Sila",
    about:
      "M'Sila is a city in midwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 6,
  },
  {
    name: "Batna",
    nickname: "Batna",
    about:
      "Batna is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 7,
  },
  {
    name: "Oum El Bouaghi",
    nickname: "Oum El Bouaghi",
    about:
      "Oum El Bouaghi is a city in northeast of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 7,
  },
  {
    name: "Biskra",
    nickname: "Biskra",
    about:
      "Biskra is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 7,
  },
  {
    name: "Khenchela",
    nickname: "Khenchela",
    about:
      "Khenchela is a city in mideast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 7,
  },
  {
    name: "Tébessa",
    nickname: "Tébessa",
    about: "Tébessa is a city in east Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 7,
  },
  {
    name: "Ouled Djellal",
    nickname: "Ouled Djellal",
    about:
      "Ouled Djellal is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 8,
  },
  {
    name: "M'ghair",
    nickname: "M'ghair",
    about:
      "M'ghair is a city in mideast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 8,
  },
  {
    name: "Toggourt",
    nickname: "Toggourt",
    about:
      "Toggourt is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 8,
  },
  {
    name: "El Oued",
    nickname: "El Oued",
    about:
      "El Oued is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 8,
  },
  {
    name: "Ghardaïa",
    nickname: "Ghardaïa",
    about:
      "Ghardaïa is a city in middle of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 9,
  },
  {
    name: "El Menia",
    nickname: "El Menia",
    about:
      "El Menia is a city in middle of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 9,
  },
  {
    name: "Béchar",
    nickname: "Béchar",
    about:
      "Béchar is a city in southwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 10,
  },
  {
    name: "Béni Abbès",
    nickname: "Béni Abbès",
    about:
      "Béni Abbès is a city in southwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 10,
  },
  {
    name: "Timimoun",
    nickname: "Timimoun",
    about:
      "Timimoun is a city in middle of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 10,
  },
  {
    name: "Tindouf",
    nickname: "Tindouf",
    about:
      "Tindouf is a city in southwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 10,
  },
  {
    name: "Adrar",
    nickname: "Adrar",
    about: "Adrar is a city in south Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 10,
  },
  {
    name: "Bordj Badji Mokhtar",
    nickname: "Bordj Badji Mokhtar",
    about:
      "Bordj Badji Mokhtar is a city in south Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 10,
  },
  {
    name: "Ouargla",
    nickname: "Ouargla",
    about:
      "Ouargla is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 11,
  },
  {
    name: "In Salah",
    nickname: "In Salah",
    about:
      "In Salah is a city in middle of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 11,
  },
  {
    name: "Illizi",
    nickname: "Illizi",
    about:
      "Illizi is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 11,
  },
  {
    name: "Tamanrasset",
    nickname: "Tamanrasset",
    about:
      "Tamanrasset is a city in south Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 11,
  },
  {
    name: "Djanet",
    nickname: "Djanet",
    about:
      "Djanet is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: true,
    food: [],
    transportation: "",
    regionId: 11,
  },
  {
    name: "In Guezzam",
    nickname: "In Guezzam",
    about:
      "In Guezzam is a city in south Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    special: false,
    food: [],
    transportation: "",
    regionId: 11,
  },
];

const sites = [
  {
    name: "Santa Cruz",
    description:
      "Santa Cruz Fort is one of the three forts in Oran, the second largest port city of Algeria; the other two forts are Fort de la Moune at the western end of the port and Fort Saint-Philippe, a replacement of the old castle of the Saints known in Spanish as Castillo de los Santos, at the centre of Oran. The three forts are connected by tunnels. Fort Santa Cruz was built between 1577 and 1604 by the Spaniards on the Pic d’Aidour above Gulf of Oran in the Mediterranean Sea, at an elevation of above 400 metres (1,312 ft). In 1831, the French occupied Oran and the fort.",
    visit: 5000,
    link: "https://en.wikipedia.org/wiki/Fort_of_Santa_Cruz_(Oran)",
    price: 200,
    position: [-0.6647360420774052, 35.7093606],
    wilayaId: 3,
  },
  {
    name: "Fort Santon",
    description:
      "Fort Santon is a historical fortification located in Oran, Algeria. Built during the French colonial period, it served as a strategic defense structure guarding the city and the harbor. The fort showcases a blend of French and Moorish architectural styles and offers panoramic views of the surrounding area. It features well-preserved ramparts, bastions, and cannons. Fort Santon is a popular attraction for history enthusiasts, offering insights into Oran's colonial past. Visitors can explore its interior, walk along the fortifications, and enjoy the beautiful vistas of Oran and the Mediterranean Sea.",
    visit: 500,
    link: "https://en.wikipedia.org/wiki/Fort_Santon",
    price: 3,
    position: [-0.6151, 35.6966],
    wilayaId: 3,
  },
  {
    name: "Fort Santiago",
    description:
      "Fort Santiago, also known as the Spanish Fort, is a historic fortress situated in Oran, Algeria. Constructed by the Spanish in the 16th century, it served as a defensive stronghold against pirate attacks. The fort features impressive architectural elements, including thick walls, bastions, and a central courtyard. Fort Santiago offers a glimpse into the region's rich history and provides commanding views of the city and the Mediterranean Sea. It is a popular tourist attraction, drawing visitors with its historical significance and picturesque setting. Exploring the fort allows visitors to delve into the city's past and appreciate its strategic importance.",
    visit: 700,
    link: "https://en.wikipedia.org/wiki/Fort_Santiago_(Oran)",
    price: 2,
    position: [-0.6145, 35.7062],
    wilayaId: 3,
  },
  {
    name: "Mosquée Abdellah Ben Salem",
    description:
      "Mosquée Abdellah Ben Salem, also known as the Abdellah Ben Salem Mosque, is a prominent mosque located in Oran, Algeria. It is named after Abdellah Ben Salem, a prominent Islamic scholar from the region. The mosque showcases exquisite Moorish architecture with intricate geometric patterns and ornate decorations. Its interior features a spacious prayer hall with beautiful columns and a stunning mihrab. Mosquée Abdellah Ben Salem is not only a place of worship but also a cultural and educational center, offering various religious and educational programs. It is a significant landmark in Oran and attracts visitors with its architectural beauty and spiritual ambiance.",
    visit: 1000,
    link: "https://en.wikipedia.org/wiki/Mosquée_Abdellah_Ben_Salem",
    price: 0,
    position: [-0.6284, 35.7073],
    wilayaId: 3,
  },
  {
    name: "Bey Palace",
    description:
      "Bey Palace, also known as Dar El Bey, is a historic palace located in Oran, Algeria. It was the residence of the local Beys who ruled the region during the Ottoman era. The palace showcases a blend of Ottoman and Moorish architectural styles, featuring beautiful courtyards, intricate tile work, and ornate decorations. Today, Bey Palace serves as a museum, housing a collection of artifacts, historical exhibits, and artwork that depict the rich history and culture of the region. It is a popular tourist attraction, offering visitors a glimpse into Algeria's past and the opulent lifestyle of the ruling Beys.",
    visit: 500,
    link: "https://en.wikipedia.org/wiki/Bey_Palace",
    price: 200,
    position: [-0.6358, 35.6997],
    wilayaId: 3,
  },
  {
    name: "Sacred Heart Cathedral of Oran",
    description:
      "The Sacred Heart Cathedral of Oran, also known as the Cathédrale Sacré-Cœur d'Oran, is a Catholic cathedral located in Oran, Algeria. It is a magnificent architectural masterpiece, showcasing a blend of Gothic and Moorish Revival styles. The cathedral's stunning facade features intricate detailing, towering spires, and beautiful stained glass windows. The interior is equally impressive, with soaring ceilings, ornate decorations, and a peaceful ambiance. The Sacred Heart Cathedral is not only a place of worship for the Catholic community but also an important cultural and historical landmark in Oran. It attracts visitors with its architectural grandeur and offers a tranquil sanctuary for reflection and prayer.",
    visit: 800,
    link: "https://en.wikipedia.org/wiki/Cathédrale_du_Sacré-Cœur_d%27Oran",
    price: 0,
    position: [-0.6293, 35.7012],
    wilayaId: 3,
  },
  {
    name: "Basilica of Our Lady of Africa",
    description:
      "The Basilica of Our Lady of Africa is a stunning Catholic basilica located in Algiers, the capital city of Algeria. Perched on a hilltop overlooking the Bay of Algiers, it is a prominent landmark and a symbol of faith. The basilica's architecture combines Byzantine and Moorish influences, featuring intricate details and beautiful stained glass windows. Visitors can admire the panoramic views of the city and the Mediterranean Sea from the basilica's terrace. The Basilica of Our Lady of Africa is a popular pilgrimage site and a must-visit destination for its historical and religious significance.",
    visit: 7000,
    link: "https://en.wikipedia.org/wiki/Basilica_of_Our_Lady_of_Africa",
    price: 0,
    position: [3.0517, 36.7525],
    wilayaId: 13,
  },
  {
    name: "Ketchaoua Mosque",
    description:
      "The Ketchaoua Mosque is a historic mosque located in the Casbah of Algiers, Algeria. It was originally built in the 17th century and has undergone several renovations and expansions over the years. The mosque features a unique blend of architectural styles, including Ottoman, Moorish, and Byzantine influences. It is known for its intricate tilework, ornate decorations, and beautiful minaret. The Ketchaoua Mosque is a significant religious and cultural landmark in Algiers and attracts visitors from around the world.",
    visit: 12000,
    link: "https://en.wikipedia.org/wiki/Ketchaoua_Mosque",
    price: 500,
    position: [3.0588, 36.7543],
    wilayaId: 13,
  },
  {
    name: "Timgad",
    description:
      "Timgad, also known as Thamugadi, is an ancient Roman city located in present-day Algeria. It was founded in the first century AD and served as a thriving regional center during the Roman Empire. Timgad is known for its well-preserved ruins, including a theater, temples, a triumphal arch, and various residential and public buildings. The city's layout follows the typical Roman grid pattern, offering a glimpse into the urban planning of the time. Timgad is a UNESCO World Heritage site and attracts visitors interested in ancient history and archaeology.",
    visit: 2100,
    link: "https://en.wikipedia.org/wiki/Timgad",
    price: 10,
    position: [6.4623, 35.4845],
    wilayaId: 36,
  },
  {
    name: "Tassili n'Ajjer",
    description:
      "Tassili n'Ajjer National Park is a UNESCO World Heritage Site located in the Sahara Desert in southern Algeria. It is renowned for its remarkable rock art and stunning landscape. The park features vast sandstone formations, deep canyons, and natural rock arches. Visitors can explore the ancient rock paintings and engravings that depict the region's prehistoric civilizations and wildlife. Tassili n'Ajjer National Park offers opportunities for hiking, camping, and experiencing the unique desert ecosystem. It is a captivating destination for nature and history enthusiasts.",
    visit: 2000,
    link: "https://en.wikipedia.org/wiki/Tassili_n%27Ajjer_National_Park",
    price: 100,
    position: [9.5649, 26.7066],
    wilayaId: 56,
  },
  {
    name: "Hoggar Mountains",
    description:
      "The Hoggar Mountains, also known as the Ahaggar Mountains, are a highland region in southern Algeria. This majestic mountain range offers breathtaking landscapes, including towering peaks, deep canyons, and vast plateaus. The Hoggar Mountains are home to unique flora and fauna, and they hold cultural significance to the indigenous Tuareg people. Visitors can enjoy activities such as hiking, rock climbing, and exploring ancient cave paintings. The clear desert skies also make the Hoggar Mountains an excellent spot for stargazing.",
    visit: 4000,
    link: "https://en.wikipedia.org/wiki/Hoggar_Mountains",
    price: 150,
    position: [5.75, 23.25],
    wilayaId: 56,
  },
];

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing the database");

  await prisma.site.deleteMany();
  await prisma.$queryRaw`ALTER TABLE Site AUTO_INCREMENT = 1`;
  await prisma.user.deleteMany();
  await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
  await prisma.wilaya.deleteMany();
  await prisma.$queryRaw`ALTER TABLE Wilaya AUTO_INCREMENT = 1`;
  await prisma.region.deleteMany();
  await prisma.$queryRaw`ALTER TABLE Region AUTO_INCREMENT = 1`;

  console.log("Seeding some data to the database");

  const hashedPassword = await bcrypt.hash(admin.password, 10);

  // Seed the admin user
  await prisma.user.create({
    data: {
      name: admin.name,
      username: admin.username,
      password: hashedPassword,
    },
  });

  // Seed the regions
  await prisma.region.createMany({
    data: regions,
  });

  // Seed the wilayas
  await prisma.wilaya.createMany({
    data: wilayas,
  });

  await prisma.site.createMany({
    data: sites,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
