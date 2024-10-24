import { resolvers } from "../University.resolvers";
import { University } from "../../../../../lib/mongodb/models/University";
import { TRoot } from "../../../../../types/graphql";

jest.mock("../../../../../lib/mongodb/models/University");

describe("University Resolvers", () => {
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
          ],
        },
      ],
      resourceLinks: [{ name: "Library", url: "" }],
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
          ],
        },
      ],
      resourceLinks: [{ name: "Online Library", url: "" }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUniversity", () => {
    it("should return the correct university by ID", async () => {
      (University.findOne as jest.Mock).mockResolvedValue(mockUniversities[0]);

      const result = await resolvers.Query.getUniversity(null as TRoot, {
        id: "springfield",
      });

      expect(University.findOne).toHaveBeenCalledWith({ id: "springfield" });
      expect(result).toEqual(mockUniversities[0]);
    });

    it("should throw an error if university is not found", async () => {
      (University.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        resolvers.Query.getUniversity(null as TRoot, {
          id: "non-existent-uni",
        })
      ).rejects.toThrow("University not found");
    });
  });

  describe("getAllUniversities", () => {
    it("should return all universities", async () => {
      (University.find as jest.Mock).mockResolvedValue(mockUniversities);

      const result = await resolvers.Query.getAllUniversities();

      expect(University.find).toHaveBeenCalled();
      expect(result).toEqual(mockUniversities);
    });
  });
});
