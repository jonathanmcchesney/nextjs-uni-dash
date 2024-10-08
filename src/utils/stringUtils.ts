const capitaliseFirstLetter = (string: string): string => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : string;
};

export { capitaliseFirstLetter };
