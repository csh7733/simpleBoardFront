import React from 'react';
import { List, ListItem, ListItemText, Paper, Button, Typography } from '@mui/material';

const PostList = ({ posts, onUpdate, onDelete, onSelect }) => {
  return (
    <List>
      {posts.map((post, index) => (
        <ListItem key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Paper style={{ padding: '16px', width: '100%' }}>
            <Typography variant="body2" color="textSecondary" style={{ marginBottom: '8px' }}>
            Post ID : {post.id}
            </Typography>
            <ListItemText
              primary={post.title}
              secondary={post.content}
            />
            <div style={{ display: 'flex', marginTop: '8px' }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => onSelect(post)}
                style={{ marginRight: '8px' }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </Button>
            </div>
          </Paper>
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;
