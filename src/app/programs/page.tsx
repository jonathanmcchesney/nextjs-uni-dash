import Programs from "@/components/Programs/Programs";
import { GET_PROGRAMS_BY_STUDENT } from "@/gql/universityQueries";
import { initializeApollo } from "@/lib/apollo/client";
import { Typography } from "@mui/material";

async function fetchPrograms(studentId: string) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_PROGRAMS_BY_STUDENT,
    variables: { studentId },
  });

  return data.getProgramsByStudent;
}

export default async function UniversityProgramsPage() {
  const studentId = "user-123";
  const programs = await fetchPrograms(studentId);

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        My programs
      </Typography>
      <Programs programs={programs} />
    </>
  );
}
