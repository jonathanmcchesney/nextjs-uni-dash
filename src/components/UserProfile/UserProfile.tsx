"use client";

import { useQuery, useSuspenseQuery } from "@apollo/client";
import { GET_USER } from "../../gql/userQueries";
import { GET_UNIVERSITY } from "../../gql/universityQueries";
import { Skeleton, Typography, Paper, Box, Divider } from "@mui/material";

interface UserProfileProps {
  userId: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  const { data: userData }: any = useSuspenseQuery(GET_USER, {
    variables: { id: userId },
    fetchPolicy: "cache-first",
  });

  const { name, email, age, major, universityId } = userData?.getUser;

  const { data: universityData }: any = useQuery(GET_UNIVERSITY, {
    variables: { id: universityId },
    fetchPolicy: "cache-first",
    skip: !universityId,
  });

  if (!userData) return null;

  const { name: universityName } = universityData?.getUniversity || {};

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      <Box sx={{ marginBottom: 2 }}>
        {!userData ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              <strong>Name:</strong> {name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Age:</strong> {age}
            </Typography>
          </>
        )}
      </Box>

      <Divider sx={{ marginBottom: 2 }} />

      <Box>
        {!universityData ? (
          <>
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              <strong>Enrolled at:</strong> {universityName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Major:</strong> {major}
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  );
};
