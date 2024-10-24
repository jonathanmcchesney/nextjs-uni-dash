"use server";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import CodeIcon from "@mui/icons-material/Code";
import Link from "next/link";
import HandshakeIcon from "@mui/icons-material/Handshake";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const HomePage = () => {
  /* normally in production we would not expose the graphql playground */
  const cards = [
    {
      title: "University Profile",
      description: "View your enrolled university and related information.",
      icon: <SchoolIcon fontSize="large" />,
      link: "/enrolment",
      openInNewTab: false,
    },
    {
      title: "Onboarding checklist",
      description: "Access or update your onboarding checklist.",
      icon: <HandshakeIcon fontSize="large" />,
      link: "/onboarding",
      openInNewTab: false,
    },
    {
      title: "Interactive Timetable",
      description: "Access your timetable and schedule your classes.",
      icon: <ScheduleIcon fontSize="large" />,
      link: "/timetable",
      openInNewTab: false,
    },
    {
      title: "User Profile",
      description: "View and update your profile details.",
      icon: <PersonIcon fontSize="large" />,
      link: "/user",
      openInNewTab: false,
    },
    {
      title: "Campus Map",
      description: "Navigate the campus with interactive maps.",
      icon: <MapIcon fontSize="large" />,
      link: "/campus",
      openInNewTab: false,
    },
    {
      title: "Mental Health Resources",
      description:
        "Access wellness and mental health resources to stay healthy.",
      icon: <HealthAndSafetyIcon fontSize="large" />,
      link: "/health",
      openInNewTab: false,
    },
    {
      title: "Universities overview",
      description:
        "View information about related universities to help choose the best university for you.",
      icon: <SchoolIcon fontSize="large" />,
      link: "/university",
      openInNewTab: false,
    },
    {
      title: "GraphQL Playground",
      description: "Interact with the GraphQL API in the Apollo playground.",
      icon: <CodeIcon fontSize="large" />,
      link: "/api/graphql",
      openInNewTab: true,
    },
  ];

  return (
    <Box sx={{ padding: "1rem 2rem 2rem 2rem" }}>
      <Typography
        data-testid="home-title"
        variant="h3"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Welcome to Your University Dashboard
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Your one-stop platform to manage your university life—track your
        progress, stay organized, and access helpful resources.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={card.title}
            sx={{
              flex: "1 1 calc(33.33% - 16px)",
              minWidth: "280px",
              display: "flex",
            }}
          >
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  {card.icon}
                </Box>
                <Typography variant="h5" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                {card.openInNewTab ? (
                  <Button
                    data-testid={`home-page-link-button-${index}`}
                    variant="contained"
                    component={Link}
                    href={card.link}
                    color="primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<OpenInNewIcon />}
                  >
                    Go to {card.title}
                  </Button>
                ) : (
                  <Link href={card.link} passHref>
                    <Button
                      data-testid={`home-page-link-button-${index}`}
                      variant="contained"
                      color="primary"
                    >
                      Go to {card.title}
                    </Button>
                  </Link>
                )}
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
