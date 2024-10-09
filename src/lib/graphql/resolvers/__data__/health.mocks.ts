import { IWellness } from "@/types/health";

const mindfulnessTips = [
  {
    id: "1",
    title: "Deep Breathing",
    description: "Take deep breaths to relax.",
  },
  {
    id: "2",
    title: "Mindful Walking",
    description: "Walk slowly and focus on your surroundings.",
  },
  {
    id: "3",
    title: "Body Scan",
    description: "Pay attention to each part of your body and relax.",
  },
];

const healthResources = [
  {
    id: "1",
    name: "University Counseling",
    description: "Free counseling services for students.",
    contact: "123-456-7890",
  },
  {
    id: "2",
    name: "Mental Health Hotline",
    description: "24/7 mental health support hotline.",
    contact: "987-654-3210",
  },
  {
    id: "3",
    name: "Emergency Services",
    description: "Contact emergency services in case of crisis.",
    contact: "123",
  },
];

const wellnessData: IWellness[] = [];

export { mindfulnessTips, healthResources, wellnessData };
