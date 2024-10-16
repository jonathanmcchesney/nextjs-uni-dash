const customLog = (message: string, colour: string = "reset") => {
  const colors: { [key: string]: string } = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    blue: "\x1b[34m",
  };
  console.log(colors[colour] + message + colors["reset"]);
};

export { customLog };
