
import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const PostForm = ({ onAddPost }) => {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null); // State for displaying validation error

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!content || !author) {
      // *** FIX: Replaced alert() with a state-driven Alert component ***
      setError("Content and Author are required to make a post!");
      return;
    }

    const newPost = { content, imageUrl, author };
    onAddPost(newPost);

    // Clear the form fields after successful submission attempt
    setContent("");
    setImageUrl("");
    setAuthor("");
  };

  return (
    <Box sx={formStyles.formContainer}>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

        <input
          type="text"
          placeholder="Author (Required)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={formStyles.input}
          required
        />
        <textarea
          placeholder="What's on your mind? (Required)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={formStyles.textarea}
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={formStyles.input}
        />
        <button type="submit" style={formStyles.button}>
          Post
        </button>
      </form>
    </Box>
  );
};

const formStyles = {
  formContainer: {
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 2,
    boxShadow: 3,
    marginBottom: 3,
    border: '1px solid #e0e0e0',
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "12px",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: '16px',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.07)',
  },
  textarea: {
    marginBottom: "12px",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    minHeight: "100px",
    fontSize: '16px',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.07)',
  },
  button: {
    padding: "12px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#1877F2", // Facebook Blue
    color: "#fff",
    fontWeight: 'bold',
    cursor: "pointer",
    transition: 'background-color 0.2s, transform 0.1s',
  },
};
export default PostForm;
