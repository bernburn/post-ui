import React, { useState } from "react";

const PostForm = ({ onAddPost }) => {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content || !author) {
      alert("Content and Author are required!");
      return;
    }

    const newPost = { content, imageUrl, author };
    onAddPost(newPost);

    // Clear the form
    setContent("");
    setImageUrl("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={styles.input}
        required
      />
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={styles.textarea}
        required
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Post
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
  },
  input: {
    marginBottom: "8px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  textarea: {
    marginBottom: "8px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    minHeight: "80px",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default PostForm;