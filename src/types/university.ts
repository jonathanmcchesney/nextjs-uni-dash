export interface IContactInfo {
  email: string;
  phone: string;
}

export interface IFaculty {
  id: string;
  name: string;
  department: string;
  contact?: IContactInfo;
}

export interface ICourse {
  id: string;
  title: string;
  description: string;
  credits: number;
}

export interface IProgram {
  id: string;
  name: string;
  courses: ICourse[];
}

export interface IResourceLink {
  name: string;
  url: string;
}
