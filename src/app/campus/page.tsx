import MockCampusMap from "../../components/MockCampusMap/MockCampusMap";
import { Typography } from "@mui/material";

const CampusPage = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        Welcome to the campus!
      </Typography>
      <MockCampusMap />
    </>
  );
};

export default CampusPage;
