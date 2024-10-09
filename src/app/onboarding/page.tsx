import { Paper, Typography } from "@mui/material";
import OnboardingChecklist from "../../components/OnboardingChecklist/OnboardingChecklist";

export default async function OnboardingPage() {
  const userId = "d47ffe3f-3b5a-430c-88a5-d4bcf4c875f1";

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        Onboarding resources
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          Onboarding checklist
        </Typography>
        <OnboardingChecklist key={userId} userId={userId} />
      </Paper>
    </>
  );
}
