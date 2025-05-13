export type InterfaceLevel = {
  id: number;
  name: string;
};

export type InterfaceLevelSubject = {
  level: InterfaceLevel;
  subjects: InterfaceSubject[];
};
