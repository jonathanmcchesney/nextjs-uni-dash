import { Paper, Typography } from "@mui/material";
import OnboardingChecklist from "../../components/OnboardingChecklist/OnboardingChecklist";
import { currentlyLoggedInUserId } from "@/utils/constants";

export default async function OnboardingPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        Onboarding resources
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Onboarding checklist
        </Typography>
        <OnboardingChecklist userId={currentlyLoggedInUserId} />
      </Paper>
    </>
  );
}
