import Timetable from "@/components/Timetable/Timetable";
import { currentlyLoggedInUserId } from "@/utils/constants";
import { Typography } from "@mui/material";

const TimetablePage = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        My timetable
      </Typography>
      <Timetable userId={currentlyLoggedInUserId} />
    </>
  );
};

export default TimetablePage;
