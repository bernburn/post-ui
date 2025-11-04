// src/pages/NewsFeed.jsx - UPDATED
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm"; // Assuming you have this component
import { Box, Container, Typography, CircularProgress } from "@mui/material";

// *** FIX 1: Define the API URL for your local Spring Boot server ***
const API_URL = "api/posts";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      // Requests now go to your running Java application
      const response = await axios.get(API_URL);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      // NOTE: If you see an error here, it's likely a CORS issue (see Step 3)
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  // Handle post creation
  const handleAddPost = async (newPost) => {
    try {
      const response = await axios.post(API_URL, newPost);
      setPosts([response.data, ...posts]); // Add the new post to the top
    } catch (error) {
      console.error("Error adding post:", error);
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
        justifyContent: "flex-start",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" sx={{ marginBottom: 2, textAlign: "center" }}>
          News Feed
        </Typography>
        <PostForm onAddPost={handleAddPost} />
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          // Make sure posts are defined and an array before mapping
          posts && Array.isArray(posts) ? (
              posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
              <Typography variant="body1" sx={{ marginTop: 2, textAlign: "center" }}>
                No posts found or API returned unexpected data.
              </Typography>
          )
        )}
      </Container>
    </Box>
  );
};

export default NewsFeed;