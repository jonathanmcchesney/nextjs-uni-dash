import { initializeApollo } from "@/lib/apollo/client";
import { GET_ALL_UNIVERSITIES } from "@/gql/universityQueries";
import Link from "next/link";
import { Box, Typography, Paper, Button } from "@mui/material";

async function fetchAllUniversities() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_ALL_UNIVERSITIES,
  });
  return data.getAllUniversities;
}

export default async function UniversitySelectionPage() {
  const universities = await fetchAllUniversities();

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        Select a University
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {universities.map((university: any) => (
          <Paper
            elevation={3}
            key={university.id}
            sx={{
              flex: "1 1 calc(33% - 32px)",
              padding: 3,
              textAlign: "center",
              minWidth: "280px",
              maxWidth: "500px",
              transition: "0.3s",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              "&:hover": {
                boxShadow: 6,
              },
            }}
          >
            <Typography variant="h5" gutterBottom>
              {university.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBottom: 2,
              }}
            >
              {university.description}
            </Typography>

            <Link href={`/university/${university.id}`} passHref>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "auto" }}
              >
                View more details
              </Button>
            </Link>
          </Paper>
        ))}
      </Box>
    </>
  );
}
