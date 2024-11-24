import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, Grid2 } from "@mui/material";
import { InsightsTable } from "../components/InsightTable";
import toast, { Toaster } from "react-hot-toast";
import { REST_API } from "../constant/DefaultValues";

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = () => {
    axios
      .get(REST_API + "/api/insights")
      .then((response) => setInsights(response.data.insights))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    if (!url) return;
    if (!url.startsWith("https://")) {
      setError('The URL must start with "https://".');
      return;
    }
    setError("");
    setLoading(true);
    axios
      .post(REST_API + "/api/create-insight", {website_url: url })
      .then((response) => {
        setUrl("");
        if (response.data.success === 1) {
          fetchData();
          toast.success("Successfully Created!");
          setUrl("");
        } else {
          setUrl("");
        }
      })
      .catch((error) => {
        setUrl('')
        console.error(error);
        toast.error("Failed to Add");
      })
      .finally(() => setLoading(false));
  };

  const handleFavorite = (id) => {
    axios
      .patch(REST_API + `/api/insights/${id}/favorite`)
      .then(() => {
        setInsights((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, favorite: !item.favorite } : item
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(REST_API + `/api/insights/${id}`)
      .then(() => {
        setInsights((prev) => prev.filter((item) => item.id !== id));
        toast.success("Successfully Deleted!");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        backgroundColor: "#f8f9fc",
        padding: { xs: "20px", md: "40px" },
        textAlign: "center",
        gap: 4,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "24px", sm: "30px", md: "36px" },
          lineHeight: 1.3,
          color: "#333",
        }}
      >
        Take your pages onto{" "}
        <span style={{ color: "#5a67d8" }}>Word Count Checker</span>
      </Typography>

      <Grid2
        container
        spacing={2}
        sx={{
          maxWidth: "600px",
          justifyContent: "center",
        }}
      >
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 item xs={12} sm={8}>
            <TextField
              fullWidth
              placeholder="Put your website URL here. Eg. www.growth.cx"
              variant="outlined"
              value={url}
              error={!!error}
              helperText={error}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />
          </Grid2>
          <Grid2 item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                background: "linear-gradient(to right, #ec4899, #8b5cf6)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "5px",
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(to right, #d946ef, #7c3aed)",
                },
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>

      {insights.length > 0 && (
        <Box
          sx={{
            width: "100%",
            maxWidth: "800px",
            mt: 4,
          }}
        >
          <InsightsTable
            insights={insights}
            onFavorite={handleFavorite}
            onDelete={handleDelete}
          />
        </Box>
      )}
      <Toaster />
    </Box>
  );
};

export default HomePage;
