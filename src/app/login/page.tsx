"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        const { error } = await response.json();
        setError(error || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, margin: "0 auto", mt: 4 }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        data-testid="login-email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <TextField
        data-testid="login-pass"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button
        data-testid="login-button"
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
