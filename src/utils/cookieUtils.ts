const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

const setCookie = (name: string, value: string, hoursExpiresIn: number) => {
  let expires = "";
  if (hoursExpiresIn) {
    const date = new Date();
    date.setTime(date.getTime() + hoursExpiresIn * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

export { getCookie, setCookie };
