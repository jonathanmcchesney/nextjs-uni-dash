import { GET_PROGRAMS_BY_STUDENT } from "@/gql/programQueries";
import Programs from "../../components/Programs/Programs";
import { GET_UNIVERSITY } from "../../gql/universityQueries";
import { initializeApollo } from "../../lib/apollo/client";
import {
  currentlyEnrolledUniversityId,
  currentlyLoggedInUserId,
} from "../../utils/constants";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import Link from "next/link";

async function fetchUniversity(universityId: string) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_UNIVERSITY,
    variables: { id: universityId },
  });
  return data.getUniversity;
}

async function fetchPrograms(userId: string) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_PROGRAMS_BY_STUDENT,
    variables: { userId },
  });
  return data.getProgramsByStudent;
}

const EnrolmentPage = async () => {
  const university = await fetchUniversity(currentlyEnrolledUniversityId);
  const programs = await fetchPrograms(currentlyLoggedInUserId);

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        My university
      </Typography>
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          {university.name}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {university.description}
        </Typography>

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Programs and Courses
        </Typography>
        <List>
          {programs.map((program: any) => (
            <ListItem key={program.id}>
              <ListItemText
                primary={program.name}
                secondary={program.courses
                  .map((course: any) => course.title)
                  .join(", ")}
              />
            </ListItem>
          ))}
        </List>

        <Link href={`/university/${university.id}`} passHref>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            View University Details
          </Button>
        </Link>
      </Paper>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        My programs
      </Typography>
      <Programs programs={programs} />
    </>
  );
};

export default EnrolmentPage;
