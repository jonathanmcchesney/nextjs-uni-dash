const universities = [
  {
    id: "springfield",
    name: "Springfield University",
    description:
      "Springfield University is a prestigious institution known for its excellence in research and teaching across a variety of disciplines.",
    address: "742123 Evergreen Terrace, Springfield, USA",
    faculty: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e0",
        name: "Dr. Nick Riviera",
        department: "Physics",
        contact: {
          email: "nickriviera@springfield.edu",
          phone: "123-456-7890",
        },
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e1",
        name: "Dr. Julius Hibbert",
        department: "Literature",
        contact: { email: "jhibbert@springfield.edu", phone: "123-456-7891" },
      },
    ],
    contact: { email: "info@springfield.edu", phone: "123-456-7890" },
    programs: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e2",
        name: "Bachelor of Science in Physics",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e3",
            title: "Quantum Mechanics",
            description: "An introduction to quantum mechanics.",
            credits: 4,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e04",
            title: "Thermodynamics",
            description: "Study of energy and heat transfer.",
            credits: 3,
          },
        ],
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e5",
        name: "Bachelor of Arts in Literature",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e6",
            title: "Shakespearean Literature",
            description: "A deep dive into the works of William Shakespeare.",
            credits: 3,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e7",
            title: "Modern American Fiction",
            description: "Exploring contemporary American fiction.",
            credits: 3,
          },
        ],
      },
    ],
    resourceLinks: [
      { name: "Library", url: "" },
      { name: "Career Services", url: "" },
      { name: "Health Services", url: "" },
    ],
  },
  {
    id: "shelbyville",
    name: "Shelbyville Institute of Technology",
    description:
      "Shelbyville Institute of Technology (SIT) is a leading technical school offering cutting-edge programs in engineering, computer science, and information technology.",
    address: "12345 Shelbyville Ave, Shelbyville, USA",
    faculty: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6900",
        name: "Dr. Alan Turing",
        department: "Computer Science",
        contact: { email: "aturing@shelbytech.edu", phone: "987-654-3210" },
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6901",
        name: "Dr. Marie Curie",
        department: "Engineering",
        contact: { email: "mcurie@shelbytech.edu", phone: "987-654-3211" },
      },
    ],
    contact: { email: "contact@shelbytech.edu", phone: "987-654-3210" },
    programs: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6902",
        name: "Bachelor of Science in Computer Science",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6903",
            title: "Introduction to Algorithms",
            description: "Understanding algorithms and their applications.",
            credits: 3,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6904",
            title: "Data Structures",
            description: "A comprehensive course on data structures.",
            credits: 4,
          },
        ],
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6905",
        name: "Bachelor of Engineering",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6906",
            title: "Engineering Mechanics",
            description: "Foundational course in engineering mechanics.",
            credits: 4,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6907",
            title: "Fluid Dynamics",
            description: "Study of fluid movement and its applications.",
            credits: 3,
          },
        ],
      },
    ],
    resourceLinks: [
      { name: "Online Library", url: "" },
      { name: "Student Portal", url: "" },
      { name: "Tech Support", url: "" },
    ],
  },
  {
    id: "super-real",
    name: "Super Real College",
    description:
      "Super Real Arts College is a small liberal arts school dedicated to fostering creativity, critical thinking, and collaboration in the fine arts.",
    address: "1000 Super Real Road, RealTown, USA",
    faculty: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6910",
        name: "Prof. Emily Bronte",
        department: "Fine Arts",
        contact: { email: "ahill@realarts.edu", phone: "555-123-4567" },
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6911",
        name: "Prof. Vincent van Gogh",
        department: "Visual Arts",
        contact: { email: "jsmith@realarts.edu", phone: "555-123-4568" },
      },
    ],
    contact: { email: "admissions@realarts.edu", phone: "555-123-4560" },
    programs: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6912",
        name: "Bachelor of Fine Arts in Painting",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6913",
            title: "Renaissance Art",
            description: "Exploring the masterpieces of the Renaissance.",
            credits: 3,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6914",
            title: "Modern Art Movements",
            description: "A look into the development of modern art.",
            credits: 3,
          },
        ],
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6915",
        name: "Bachelor of Fine Arts in Sculpture",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6916",
            title: "Classical Sculpture",
            description: "Study of classical techniques in sculpture.",
            credits: 4,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6917",
            title: "Contemporary Sculpture",
            description: "Exploration of contemporary methods in sculpture.",
            credits: 3,
          },
        ],
      },
    ],
    resourceLinks: [
      { name: "Art Gallery", url: "" },
      { name: "Student Counseling", url: "" },
      { name: "Alumni Network", url: "" },
    ],
  },
  {
    id: "jedi-academy",
    name: "Jedi Academy",
    description:
      "Jedi Academy is an ancient institution dedicated to the study of the Force and the training of Jedi Knights. Learn to master the Force and protect the galaxy.",
    address: "Jedi Temple, Coruscant",
    faculty: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6920",
        name: "Master Yoda",
        department: "Force Studies",
        contact: { email: "yoda@jediacademy.edu", phone: "000-111-2222" },
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6921",
        name: "Obi-Wan Kenobi",
        department: "Lightsaber Combat",
        contact: { email: "kenobi@jediacademy.edu", phone: "000-111-2223" },
      },
    ],
    contact: { email: "info@jediacademy.edu", phone: "000-111-2220" },
    programs: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6922",
        name: "Master of the Force",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6923",
            title: "Force Sensitivity",
            description:
              "Learn the basics of sensing and controlling the Force.",
            credits: 5,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6924",
            title: "Lightsaber Combat",
            description: "Master the art of lightsaber dueling.",
            credits: 4,
          },
        ],
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6925",
        name: "Jedi Philosophy",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6926",
            title: "The Jedi Code",
            description: "Understand the principles of the Jedi Order.",
            credits: 3,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6927",
            title: "Diplomacy and Negotiation",
            description: "Develop skills in intergalactic diplomacy.",
            credits: 3,
          },
        ],
      },
    ],
    resourceLinks: [
      { name: "Jedi Holocron Vault", url: "" },
      { name: "Lightsaber Forge", url: "" },
      { name: "The Force Archives", url: "" },
    ],
  },
  {
    id: "sith-academy",
    name: "Sith Academy",
    description:
      "Sith Academy is a dark institution where the ways of the Sith are taught. Power, ambition, and control are central to the Sith teachings.",
    address: "Korriban, Outer Rim",
    faculty: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6930",
        name: "Darth Sidious",
        department: "Dark Side Studies",
        contact: { email: "sidious@sithacademy.edu", phone: "666-666-6666" },
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6931",
        name: "Darth Maul",
        department: "Combat Arts",
        contact: { email: "maul@sithacademy.edu", phone: "666-666-6667" },
      },
    ],
    contact: { email: "info@sithacademy.edu", phone: "666-666-6660" },
    programs: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6932",
        name: "Mastery of the Dark Side",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6933",
            title: "Dark Side Force Powers",
            description: "Harness the raw power of the Dark Side.",
            credits: 5,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6934",
            title: "Sith Alchemy",
            description: "Explore the ancient art of Sith alchemy.",
            credits: 4,
          },
        ],
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6935",
        name: "Sith Tactics and Strategy",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6936",
            title: "Galactic Domination",
            description:
              "Learn the strategies for controlling entire star systems.",
            credits: 4,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6937",
            title: "Deception and Manipulation",
            description: "Master the art of subterfuge.",
            credits: 3,
          },
        ],
      },
    ],
    resourceLinks: [
      { name: "Sith Holocrons", url: "" },
      { name: "Dark Side Meditation Chambers", url: "" },
      { name: "Sith Ritual Sites", url: "" },
    ],
  },
  {
    id: "galactic-imperial-academy",
    name: "Galactic Imperial Academy",
    description:
      "The Galactic Imperial Academy trains officers and pilots for the Empire's fleet. Known for its rigorous discipline and military excellence, the academy produces the galaxy's finest soldiers.",
    address: "Imperial City, Coruscant",
    faculty: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6940",
        name: "Grand Moff Tarkin",
        department: "Military Strategy",
        contact: { email: "tarkin@imperialacademy.edu", phone: "123-321-1234" },
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6941",
        name: "Darth Vader",
        department: "Leadership",
        contact: { email: "vader@imperialacademy.edu", phone: "123-321-1235" },
      },
    ],
    contact: { email: "info@imperialacademy.edu", phone: "123-321-1230" },
    programs: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6942",
        name: "Imperial Officer Training",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6943",
            title: "Fleet Command",
            description:
              "Learn the techniques of commanding the Imperial fleet.",
            credits: 4,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6944",
            title: "Ground Assault Tactics",
            description: "Strategies for leading ground troops in battle.",
            credits: 4,
          },
        ],
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6945",
        name: "Advanced Pilot Training",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6946",
            title: "TIE Fighter Maneuvers",
            description: "Master advanced maneuvers in a TIE fighter.",
            credits: 3,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6947",
            title: "Starfighter Combat",
            description: "Tactics for dogfighting in space.",
            credits: 3,
          },
        ],
      },
    ],
    resourceLinks: [
      { name: "Imperial Archives", url: "" },
      { name: "Star Destroyer Training Simulator", url: "" },
      { name: "Imperial Officer's Club", url: "" },
    ],
  },
];

const studentPrograms = [
  {
    userId: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1",
    programs: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e2",
        name: "Bachelor of Science in Physics",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e3",
            title: "Quantum Mechanics",
            description: "An introduction to quantum mechanics.",
            credits: 4,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e04",
            title: "Thermodynamics",
            description: "Study of energy and heat transfer.",
            credits: 3,
          },
        ],
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e5",
        name: "Bachelor of Arts in Literature",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e6",
            title: "Shakespearean Literature",
            description: "A deep dive into the works of William Shakespeare.",
            credits: 3,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a69e7",
            title: "Modern American Fiction",
            description: "Exploring contemporary American fiction.",
            credits: 3,
          },
        ],
      },
    ],
  },
  {
    userId: "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f2",
    programs: [
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6942",
        name: "Imperial Officer Training",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6943",
            title: "Fleet Command",
            description:
              "Learn the techniques of commanding the Imperial fleet.",
            credits: 4,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6944",
            title: "Ground Assault Tactics",
            description: "Strategies for leading ground troops in battle.",
            credits: 4,
          },
        ],
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6945",
        name: "Advanced Pilot Training",
        courses: [
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6946",
            title: "TIE Fighter Maneuvers",
            description: "Master advanced maneuvers in a TIE fighter.",
            credits: 3,
          },
          {
            id: "25e68f2a-7d23-425d-9ec6-acf39f0a6947",
            title: "Starfighter Combat",
            description: "Tactics for dogfighting in space.",
            credits: 3,
          },
        ],
      },
    ],
  },
];

export { universities, studentPrograms };
