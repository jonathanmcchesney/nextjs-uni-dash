const updateOrInsert = (array: any[], newItem: any, identifierKey: string) => {
  const index = array.findIndex(
    (item) => item[identifierKey] === newItem[identifierKey]
  );

  if (index !== -1) {
    array[index] = { ...array[index], ...newItem };
  } else {
    array.push(newItem);
  }
  console.log({ array });
  return array;
};

export { updateOrInsert };
