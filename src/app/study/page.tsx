import { Box, Paper, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const StudyPage = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        Study and collaboration
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
            justifyContent: "center",
          }}
        >
          <SchoolIcon fontSize="large" />
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            Coming soon...
          </Typography>
        </Box>
        <Typography sx={{ marginBottom: 2 }}>
          In the future this will allow a user to can track their study progress
          and collaborate with peers.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          You can schedule group study sessions, with reminders and integration
          with the timetable, track homework, assignments and deadlines.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Finally you will be able to form study groups, share notes and chat
          with peers.
        </Typography>
      </Paper>
    </>
  );
};

export default StudyPage;
