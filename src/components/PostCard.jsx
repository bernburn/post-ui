import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const PostCard = ({ post }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", // Full width
        backgroundColor: "#f5f5f5", // Light background color
        padding: 1, // Reduced padding
      }}
    >
      <Card
        sx={{
          width: "100%", // Full width
          boxShadow: 3,
          borderRadius: 2,
          padding: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            {post.author}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
            {post.content}
          </Typography>
          {post.imageUrl && (
            <CardMedia
              component="img"
              image={post.imageUrl}
              alt="Post"
              sx={{ borderRadius: 2, marginTop: 2 }}
            />
          )}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ marginTop: 2, display: "block" }}
          >
            Created At: {new Date(post.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostCard;