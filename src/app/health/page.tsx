"use server";
import { initializeApollo } from "@/lib/apollo/client";
import {
  GET_HEALTH_RESOURCES,
  GET_MINDFULNESS_TIPS,
} from "@/gql/healthQueries";
import WellnessTracker from "@/components/WellnessTracker/WellnessTracker";
import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material";
import { currentlyLoggedInUserId } from "@/utils/constants";

async function fetchMindfulnessTips() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_MINDFULNESS_TIPS,
  });
  return data?.getMindfulnessTips;
}

async function fetchHealthResources() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_HEALTH_RESOURCES,
  });
  return data?.getHealthResources;
}

export default async function HealthWellnessPage() {
  const mindfulnessTips = await fetchMindfulnessTips();
  const healthResources = await fetchHealthResources();

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 4 }}>
        Mental health and well-being resources
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h5">Health resources</Typography>
        <List>
          {healthResources?.map((resource: any) => (
            <ListItem key={resource.id}>
              <ListItemText
                primary={resource.name}
                secondary={`${resource.description} - Contact: ${resource.contact}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h5">Wellness Tracker</Typography>
        <WellnessTracker userId={currentlyLoggedInUserId} />
      </Paper>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h5">Mindfulness Tips</Typography>
        <List>
          {mindfulnessTips?.map((tip: any) => (
            <ListItem key={tip.id}>
              <ListItemText primary={tip.title} secondary={tip.description} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}
