const getCookie = (name: string): string | null => {
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  }
  return null;
};

const setCookie = (name: string, value: string, hoursExpiresIn: number) => {
  let expires = "";
  if (hoursExpiresIn) {
    const date = new Date();
    date.setTime(date.getTime() + hoursExpiresIn * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  const existingCookies = document.cookie
    .split("; ")
    .filter((cookie) => !cookie.startsWith(`${name}=`) && cookie.trim() !== "");

  const newCookie = `${name}=${value || ""}${expires}; path=/`;

  document.cookie =
    existingCookies.length > 0
      ? `${existingCookies.join("; ")}; ${newCookie}`
      : newCookie;
};

export { getCookie, setCookie };
