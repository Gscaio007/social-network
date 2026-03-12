import { useState, useEffect } from 'react';

export const useLikes = () => {
  const [likedPosts, setLikedPosts] = useState([]);

  // Carrega os likes ao iniciar
  useEffect(() => {
    const savedLikes = localStorage.getItem('@codeleap:likes');
    if (savedLikes) {
      setLikedPosts(JSON.parse(savedLikes));
    }
  }, []);

  const toggleLike = (postId) => {
    let updatedLikes;
    
    if (likedPosts.includes(postId)) {
      // Se já tem, remove (Unlike)
      updatedLikes = likedPosts.filter(id => id !== postId);
    } else {
      // Se não tem, adiciona (Like)
      updatedLikes = [...likedPosts, postId];
    }

    setLikedPosts(updatedLikes);
    localStorage.setItem('@codeleap:likes', JSON.stringify(updatedLikes));
  };

  const isLiked = (postId) => likedPosts.includes(postId);

  return { toggleLike, isLiked };
};