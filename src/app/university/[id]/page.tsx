import { initializeApollo } from "@/lib/apollo/client";
import { GET_UNIVERSITY } from "@/gql/universityQueries";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Paper,
  Button,
} from "@mui/material";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

async function fetchUniversity(id: string) {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_UNIVERSITY,
    variables: { id },
  });

  if (!data?.getUniversity) {
    return null;
  }

  return data.getUniversity;
}

const UniversityDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const universityId = params.id;
  const university = await fetchUniversity(universityId);

  if (!university) {
    notFound();
  }

  return (
    <>
      <Link href="/university" passHref>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          sx={{ marginBottom: 4 }}
        >
          Back to Selection
        </Button>
      </Link>

      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          {university.name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {university.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {university.address}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Faculty
        </Typography>
        <List>
          {university.faculty.map((facultyMember: any) => (
            <ListItem key={facultyMember.id}>
              <ListItemText
                primary={facultyMember.name}
                secondary={`Department: ${facultyMember.department}, Email: ${facultyMember.contact.email}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Programs
        </Typography>
        <List>
          {university.programs.map((program: any) => (
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
      </Paper>

      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          University Resources
        </Typography>
        <List>
          {university.resourceLinks.map((link: any) => (
            <ListItem key={link.name}>
              <MuiLink
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </MuiLink>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default UniversityDetailsPage;
