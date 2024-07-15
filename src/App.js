import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Paper, Grid, Pagination, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import PostList from './components/PostList.js';
import PostForm from './components/PostForm.js';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10; // 고정된 페이지 크기

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/posts`, {
        params: { page, size: pageSize }
      });
      setPosts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async (post) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/posts`, post);
      fetchPosts(currentPage);  // 데이터 추가 후 최신 데이터 가져오기
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/posts/${id}`, updatedPost);
      fetchPosts(currentPage);  // 데이터 업데이트 후 최신 데이터 가져오기
      setSelectedPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/posts/${id}`);
      fetchPosts(currentPage);  // 데이터 삭제 후 최신 데이터 가져오기
      setSelectedPost(null);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Simple Board</Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Paper style={{ padding: '16px' }}>
              <Typography variant="h6">Add or Edit Post</Typography>
              <PostForm addPost={addPost} selectedPost={selectedPost} updatePost={updatePost} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: '16px' }}>
              <Typography variant="h6">Posts</Typography>
              <PostList
                posts={posts}
                onUpdate={updatePost}
                onDelete={deletePost}
                onSelect={setSelectedPost}
              />
              <Pagination
                count={totalPages}
                page={currentPage + 1}
                onChange={(event, page) => setCurrentPage(page - 1)}
                color="primary"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
