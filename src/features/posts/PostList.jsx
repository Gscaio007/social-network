import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { FaRegEdit, FaHeart, FaRegHeart } from "react-icons/fa"; // Adicionei os corações
import { RiDeleteBin7Fill } from "react-icons/ri";
import { motion, AnimatePresence } from 'framer-motion'; 
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const cardVariants = {
  hidden: { opacity: 0, y: 50 }, 
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 } 
  },
  exit: { opacity: 0, x: -100, transition: { duration: 0.2 } } 
};

const PostList = () => {
  const currentUsername = useSelector((state) => state.user.username);
  const [deletingId, setDeletingId] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  
  //  Likes (LocalStorage) 
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('@codeleap:likes');
    if (saved) setLikedPosts(JSON.parse(saved));
  }, []);

  const toggleLike = (postId) => {
    const isAlreadyLiked = likedPosts.includes(postId);
    const newLikes = isAlreadyLiked 
      ? likedPosts.filter(id => id !== postId) 
      : [...likedPosts, postId];
    
    setLikedPosts(newLikes);
    localStorage.setItem('@codeleap:likes', JSON.stringify(newLikes));
  };
  // ---------------------------------------

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 'https://dev.codeleap.co.uk/careers/' }) => {
      const response = await axios.get(pageParam);
      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage.next || undefined,
    refetchInterval: 10000, 
  });

  if (isLoading) return <StatusMsg>Loading posts...</StatusMsg>;
  if (error) return <StatusMsg>Error loading posts.</StatusMsg>;

  return (
    <ListContainer>
      {deletingId && (
        <DeleteModal 
          postId={deletingId} 
          onClose={() => setDeletingId(null)} 
        />
      )}
      
      {editingPost && (
        <EditModal 
          post={editingPost} 
          onClose={() => setEditingPost(null)} 
        />
      )}

      <AnimatePresence>
        {data?.pages.map((page) =>
          page.results.map((post, index) => (
            <AnimatedPostCard 
              key={post.id}
              variants={cardVariants} 
              initial="hidden"       
              animate="visible"       
              exit="exit"             
              transition={{ delay: index * 0.05 }} 
              layout 
            >
              <PostHeader>
                <PostTitle>{post.title}</PostTitle>
                
                <Actions>
                  {/* Likes aways visible */}
                  <IconButton onClick={() => toggleLike(post.id)}>
                    {likedPosts.includes(post.id) ? (
                      <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                        <FaHeart color="#ff4b4b" />
                      </motion.div>
                    ) : (
                      <FaRegHeart />
                    )}
                  </IconButton>

    
                  {post.username === currentUsername && (
                    <>
                      <IconButton onClick={() => setDeletingId(post.id)}>
                        <RiDeleteBin7Fill />
                      </IconButton>
                      <IconButton onClick={() => setEditingPost(post)}>
                        <FaRegEdit />
                      </IconButton>
                    </>
                  )}
                </Actions>
              </PostHeader>
              
              <PostInfo>
                <Username>@{post.username}</Username>
                <Time>
                  {formatDistanceToNow(new Date(post.created_datetime), { addSuffix: true })}
                </Time>
              </PostInfo>
              
              <PostContent>{post.content}</PostContent>
            </AnimatedPostCard>
          ))
        )}
      </AnimatePresence>

      <PaginationContainer>
        {hasNextPage && (
          <LoadMoreButton 
            onClick={() => fetchNextPage()} 
            disabled={isFetchingNextPage}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}   
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load more'}
          </LoadMoreButton>
        )}
      </PaginationContainer>
    </ListContainer>
  );
};

export default PostList;

//    Styles 
const ListContainer = styled.div` display: flex; flex-direction: column; gap: 24px; margin-top: 24px; `;
const StatusMsg = styled.p` text-align: center; padding: 20px; color: #777; `;
const AnimatedPostCard = styled(motion.div)` border: 1px solid #999; border-radius: 16px; overflow: hidden; background: white; position: relative; `;
const PostHeader = styled.div` background: #7695EC; padding: 24px; color: white; display: flex; justify-content: space-between; align-items: center; `;
const PostTitle = styled.h2` font-size: 22px; font-weight: 700; max-width: 70%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; `;
const PostInfo = styled.div` display: flex; justify-content: space-between; padding: 24px 24px 0 24px; color: #777; font-size: 18px; `;
const Username = styled.span` font-weight: 700; `;
const Time = styled.span``;
const PostContent = styled.div` padding: 24px; font-size: 18px; line-height: 1.2; white-space: pre-wrap; `;
const Actions = styled.div` display: flex; gap: 15px; align-items: center; `;
const IconButton = styled.button` background: none; font-size: 22px; color: white; display: flex; align-items: center; justify-content: center; padding: 0; border: none; cursor: pointer; transition: transform 0.2s; &:hover { transform: scale(1.2); } `;
const PaginationContainer = styled.div` display: flex; justify-content: center; padding: 20px 0 40px 0; `;
const LoadMoreButton = styled(motion.button)` background-color: #7695EC; color: white; border-radius: 8px; padding: 10px 30px; font-weight: 700; font-size: 16px; border: none; cursor: pointer; &:disabled { background-color: #ccc; cursor: not-allowed; } `;