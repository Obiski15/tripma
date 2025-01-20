let token: {
  allocated_time: number;
  auth: string;
} | null = null;

export async function generateAmadeusToken(): Promise<string> {
  if (token && token.allocated_time - new Date().getTime() > 0)
    return token.auth;

  const res = await fetch(
    `https://test.api.amadeus.com/v1/security/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.NEXT_PUBLIC_AMADEUS_API_KEY!,
        client_secret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET!,
      }),
    }
  );

  if (!res.ok) throw new Error("Something went wrong. Pls try again");

  const result: {
    access_token: string;
    expires_in: number;
  } = await res.json();

  token = {
    auth: result.access_token,
    allocated_time: new Date().getTime() + (result.expires_in - 1) * 1000,
  };
  return result.access_token;
}
