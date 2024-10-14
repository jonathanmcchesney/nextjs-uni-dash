import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingFallback = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={24} />
      <Typography variant="body1" sx={{ paddingLeft: "0.5rem" }}>
        {text}
      </Typography>
    </Box>
  );
};

export default LoadingFallback;
