import { Box, Paper, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";

const ReccomendationsPage = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        Reccomendations
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2, justifyContent: "center" }}>
          <InventoryIcon fontSize="large" />
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            Coming soon...
          </Typography>
        </Box>
        <Typography sx={{ marginBottom: 2 }}>
          In the future this will allow a user to view recommendated data based
          on personalised data.
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          This will include recommended courses, events and clubs based on your
          interests and timetable schedule.
        </Typography>
      </Paper>
    </>
  );
};

export default ReccomendationsPage;
