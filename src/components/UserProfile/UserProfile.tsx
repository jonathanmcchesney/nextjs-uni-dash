"use client";
import { useSuspenseQuery } from "@apollo/client";
import { GET_USER } from "@/gql/userQueries";

interface UserProfileProps {
  userId: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  const { data }: any = useSuspenseQuery(GET_USER, {
    variables: { id: userId },
    fetchPolicy: "cache-first",
  });

  if (!data) return null;

  const { name, email, age } = data.getUser;

  return (
    <div>
      <h1>{name}&apos; Profile</h1>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
    </div>
  );
};
