"use client";

import { Suspense, ReactNode, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Box,
  Alert,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

const LogoutErrorFallback = ({
  error,
  shouldDisplayLogout,
}: {
  error: Error;
  shouldDisplayLogout: boolean;
}) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setLoading(false);

    window.location.href = "/login";
  };

  return (
    <Box sx={{ p: 2 }}>
      <Alert severity="error">
        <Typography variant="h6" component="div" gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="body2" component="pre">
          {error.message}
        </Typography>
      </Alert>
      {shouldDisplayLogout && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Logout"}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

interface ErrorSuspenseWrapperProps {
  children: ReactNode;
  fallback: ReactNode;
  shouldDisplayLogout?: boolean;
}

const ErrorSuspenseWrapper = ({
  children,
  fallback,
  shouldDisplayLogout = false,
}: ErrorSuspenseWrapperProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={(props) => (
        <LogoutErrorFallback
          {...props}
          shouldDisplayLogout={shouldDisplayLogout}
        />
      )}
    >
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ErrorSuspenseWrapper;
