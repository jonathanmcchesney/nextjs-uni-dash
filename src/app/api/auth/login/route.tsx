import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { initializeApollo } from "../../../../lib/apollo/client";
import { GET_USERS_FOR_AUTH } from "../../../../gql/userQueries";
import { oneHourInSeconds } from "../../../../utils/constants";

const JWT_SECRET = process.env.JWT_SECRET || "fake-secret-key";

const fetchUsersFromGraphQL = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_USERS_FOR_AUTH,
  });
  return data.getUsersForAuth || [];
};

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const users = await fetchUsersFromGraphQL();

  const user = users.find((_user: { email: string }) => _user.email === email);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  // as this is a proof of concept, we currently arent storing passwords, as such we will mock the passwords
  const passwordHash = await bcrypt.hash(user.email, 10);
  const validPassword = await bcrypt.compare(password, passwordHash);

  if (!validPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const response = NextResponse.json({ success: true });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: oneHourInSeconds,
    sameSite: "strict",
    path: "/",
  });

  return response;
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
