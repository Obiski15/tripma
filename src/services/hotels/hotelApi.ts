import { generateAmadeusToken } from "../generateAmadeusToken";

export async function getHotels() {
  const token = await generateAmadeusToken();

  const res = await fetch("", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Something went wrong. Pls try again");

  const result = await res.json();

  return result;
}
