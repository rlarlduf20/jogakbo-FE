export const sendUserData = async (token: string) => {
  const res = await fetch(`${process.env.SERVER_URL}/login`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const signOutBE = async () => {
  const res = await fetch("/api/logout");

  return res;
};
