// src/pages/NewsFeed.jsx - UPDATED
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm"; // Assuming you have this component
import { Box, Container, Typography, CircularProgress } from "@mui/material";

// *** FIX 1: Define the API URL for your local Spring Boot server ***
const API_URL = "http://localhost:8080/api/posts";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  // Fetch posts from the API
  const fetchPosts = async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const response = await axios.get(API_URL);
      // Ensure the oldest posts are at the bottom (by sorting by ID or date if needed)
      // Since the API returns them already sorted or we assume they are, we'll keep the current setup.
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
      setFetchError(true);
    }
  };

  // Handle post creation and update the displayed list immediately
  const handleAddPost = async (newPost) => {
    try {
      const response = await axios.post(API_URL, newPost);
      // Add the new post (with server-generated ID/timestamp) to the top of the list
      setPosts([response.data, ...posts]); 
    } catch (error) {
      console.error("Error adding post:", error);
      // Here you would typically notify the user of a failed post attempt
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f0f2f5", // Light social media background
        paddingY: 4,
        paddingX: 2,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" component="h1" sx={{ marginBottom: 4, textAlign: "center", color: '#1877F2', fontWeight: 700 }}>
          Social Feed
        </Typography>
        
        {/* Input form to create new posts */}
        <PostForm onAddPost={handleAddPost} />
        
        {/* Loading Indicator */}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {/* Error Message for Fetching */}
        {!loading && fetchError && (
            <Alert severity="error" sx={{ marginTop: 4 }}>
                Failed to load posts. Is your Java backend running on **http://localhost:5173**?
            </Alert>
        )}
        
        {/* Posts List */}
        {!loading && !fetchError && posts && Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id || Math.random()} post={post} />)
        ) : (
             !loading && !fetchError && (
                <Typography variant="body1" sx={{ marginTop: 4, textAlign: "center", color: 'text.secondary' }}>
                    No posts yet. Be the first one to share!
                </Typography>
            )
        )}
      </Container>
    </Box>
  );
};

export default NewsFeed;