import Programs from "@/components/Programs/Programs";
import { GET_PROGRAMS_BY_STUDENT } from "@/gql/universityQueries";
import { initializeApollo } from "@/lib/apollo/client";
import { currentlyLoggedInUserId } from "@/utils/constants";
import { Typography } from "@mui/material";

async function fetchPrograms(userId: string) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_PROGRAMS_BY_STUDENT,
    variables: { userId },
  });

  return data.getProgramsByStudent;
}

const UniversityProgramsPage = async () => {
  const programs = await fetchPrograms(currentlyLoggedInUserId);

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        My programs
      </Typography>
      <Programs programs={programs} />
    </>
  );
};

export default UniversityProgramsPage;
