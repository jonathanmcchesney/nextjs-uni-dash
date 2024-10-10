"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Slider,
  Typography,
  Box,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { GET_WELLNESS_DATA, SAVE_WELLNESS_DATA } from "../../gql/healthQueries";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const WellnessTracker = ({ userId }: { userId: string }) => {
  const [viewHistory, setViewHistory] = useState(false);

  const [mood, setMood] = useState(5);
  const [sleep, setSleep] = useState(8);
  const [stress, setStress] = useState(5);

  const [saveWellnessData, { loading, error }] =
    useMutation(SAVE_WELLNESS_DATA);

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_WELLNESS_DATA, {
    variables: { userId },
  });

  useEffect(() => {
    if (data && data?.getWellnessData?.length > 0) {
      const latestEntry = data.getWellnessData[data.getWellnessData.length - 1];
      setMood(latestEntry.mood);
      setSleep(latestEntry.sleep);
      setStress(latestEntry.stress);
    }
  }, [data]);

  const toggleView = () => setViewHistory(!viewHistory);

  const handleSave = async () => {
    try {
      await saveWellnessData({
        variables: {
          input: {
            userId,
            mood,
            sleep,
            stress,
            date: new Date().toISOString(),
          },
        },
        refetchQueries: [
          {
            query: GET_WELLNESS_DATA,
            variables: { userId },
          },
        ],
      });
    } catch (error) {
      console.error("Error saving wellness data:", error);
    }
  };

  const chartData =
    data?.getWellnessData.length >= 0
      ? data?.getWellnessData?.map((entry: any) => ({
          date: new Date(entry.date).toLocaleDateString(),
          mood: entry.mood,
          sleep: entry.sleep,
          stress: entry.stress,
        }))
      : [];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {viewHistory ? "Wellness History" : "Track Your Wellness"}
      </Typography>

      <FormControlLabel
        control={<Switch checked={viewHistory} onChange={toggleView} />}
        label={viewHistory ? "Switch to Input View" : "Switch to History View"}
      />

      {viewHistory ? (
        queryLoading ? (
          <Typography>Loading wellness history...</Typography>
        ) : (
          <Box data-testid="wellness-chart">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mood" stroke="#82ca9d" />
                <Line type="monotone" dataKey="sleep" stroke="#8884d8" />
                <Line type="monotone" dataKey="stress" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )
      ) : (
        <>
          <Box sx={{ marginBottom: 2 }}>
            <Typography>Mood: {mood}</Typography>
            <Slider
              value={mood}
              onChange={(e, newValue) => setMood(newValue as number)}
              min={1}
              max={10}
              step={1}
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography>Sleep (hours): {sleep}</Typography>
            <Slider
              value={sleep}
              onChange={(e, newValue) => setSleep(newValue as number)}
              min={1}
              max={12}
              step={1}
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography>Stress: {stress}</Typography>
            <Slider
              value={stress}
              onChange={(e, newValue) => setStress(newValue as number)}
              min={1}
              max={10}
              step={1}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Wellness Data"}
          </Button>

          {error && (
            <Typography color="error">
              Error saving data: {error.message}
            </Typography>
          )}
        </>
      )}

      {queryError && (
        <Typography color="error">
          Error loading data: {queryError.message}
        </Typography>
      )}
    </Box>
  );
};

export default WellnessTracker;
