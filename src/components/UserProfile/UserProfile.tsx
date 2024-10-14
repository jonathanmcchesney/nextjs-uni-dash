"use client";

import { useQuery, useSuspenseQuery } from "@apollo/client";
import { GET_USER } from "../../gql/userQueries";
import { GET_UNIVERSITY } from "../../gql/universityQueries";
import {
  Skeleton,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

interface UserProfileProps {
  userId: string;
}

export const UserProfile = ({ userId }: UserProfileProps) => {
  const [loading, setLoading] = useState(false);

  // useSuspenseQuery is still experimental, so does not have production stability yet, this is only an example usage within this POC
  // This results in console errors as the JWT is null on first render, and highlights issues with HOT_RELOAD
  const { data: userData }: any = useSuspenseQuery(GET_USER, {
    variables: { id: userId },
    fetchPolicy: "cache-first",
  });

  const { name, email, age, major, universityId } = userData?.getUser || {};

  const { data: universityData }: any = useQuery(GET_UNIVERSITY, {
    variables: { id: universityId },
    fetchPolicy: "cache-first",
    skip: !universityId,
  });

  if (!userData) return null;

  const { name: universityName } = universityData?.getUniversity || {};

  const handleLogout = async () => {
    setLoading(true);

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setLoading(false);

    // force reload to clear client-side state and re-run the middleware
    window.location.href = "/login";
  };

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

      <Box sx={{ marginBottom: 2 }}>
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

      <Divider sx={{ marginBottom: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Logout"}
        </Button>
      </Box>
    </Paper>
  );
};
