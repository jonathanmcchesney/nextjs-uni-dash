import { resolvers } from "../University.resolvers";
import { studentPrograms, universities } from "../../__data__/university.mocks";
import { TRoot } from "@/types/graphql";

const mockUniversities = [
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
        contact: {
          email: "jhibbert@springfield.edu",
          phone: "123-456-7891",
        },
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
        contact: {
          email: "aturing@shelbytech.edu",
          phone: "987-654-3210",
        },
      },
      {
        id: "25e68f2a-7d23-425d-9ec6-acf39f0a6901",
        name: "Dr. Marie Curie",
        department: "Engineering",
        contact: {
          email: "mcurie@shelbytech.edu",
          phone: "987-654-3211",
        },
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
];

describe("University Resolvers", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    studentPrograms.length = 0;
    studentPrograms.push({
      userId: "user-1",
      programs: [
        { id: "program-1", name: "Computer Science", courses: [] },
        { id: "program-2", name: "Mathematics", courses: [] },
      ],
    });

    universities.length = 0;
    universities.push(mockUniversities[0], mockUniversities[1]);
  });

  describe("Query: getUniversity", () => {
    it("should return the correct university by ID", () => {
      const result = resolvers.Query.getUniversity(null as TRoot, {
        id: "springfield",
      });

      expect(result).toEqual(mockUniversities[0]);
    });

    it("should return undefined if university is not found", () => {
      const result = resolvers.Query.getUniversity(null as TRoot, {
        id: "non-existent-uni",
      });

      expect(result).toBeUndefined();
    });
  });

  describe("Query: getProgramsByStudent", () => {
    it("should return the programs of the student", () => {
      const result = resolvers.Query.getProgramsByStudent(null as TRoot, {
        userId: "user-1",
      });

      expect(result).toEqual([
        { id: "program-1", name: "Computer Science", courses: [] },
        { id: "program-2", name: "Mathematics", courses: [] },
      ]);
    });

    it("should return an empty array if the student has no programs", () => {
      const result = resolvers.Query.getProgramsByStudent(null as TRoot, {
        userId: "user-2",
      });

      expect(result).toEqual([]);
    });
  });

  describe("Query: getAllUniversities", () => {
    it("should return all universities", () => {
      const result = resolvers.Query.getAllUniversities();

      expect(result).toEqual(mockUniversities);
    });
  });
});
