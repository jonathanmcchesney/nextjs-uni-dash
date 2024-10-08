import OnboardingChecklist from "../../components/OnboardingChecklist/OnboardingChecklist";
import { initializeApollo } from "@/lib/apollo/client";
import { GET_TASKS } from "@/gql/taskQueries";

// SSR fetching of data, which invalidates the cache every time.
// This means we get the benefits of being SEO friendly as the HTML contains the generated data,
// but the trade off is increased performance costs and increased server load.
async function fetchTasks(userId: string) {
  const apolloClient = initializeApollo(null);

  const { data } = await apolloClient.query({
    query: GET_TASKS,
    variables: { userId },
    context: {
      fetchOptions: {
        next: { revalidate: 0 },
      },
    },
  });
  return data?.getTasks;
}

export default async function OnboardingPage() {
  const userId = "1";
  const tasks = await fetchTasks(userId);

  return (
    <div>
      <h1>Welcome to Your Onboarding Checklist</h1>
      <OnboardingChecklist tasks={tasks} userId={userId} />
    </div>
  );
}
