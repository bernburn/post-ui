import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const PostCard = ({ post }) => {
  return (
    <Box sx={{ width: "100%", paddingY: 1 }}>
      <Card
        sx={{
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          padding: 2,
          backgroundColor: '#fff',
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {post.author || "Anonymous"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1, whiteSpace: 'pre-wrap' }}>
            {post.content}
          </Typography>
          {post.imageUrl && (
            <CardMedia
              component="img"
              image={post.imageUrl}
              alt="Post Image"
              onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; console.error('Image failed to load:', post.imageUrl); }}
              sx={{ 
                borderRadius: 1, 
                marginTop: 2, 
                maxHeight: 350, 
                objectFit: 'cover',
                width: '100%' 
              }}
            />
          )}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ marginTop: 2, display: "block" }}
          >
            Posted: {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Just Now'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostCard;