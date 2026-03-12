import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const username = useSelector((state) => state.user.username);
  const queryClient = useQueryClient();

  // Mutação para criar o post na API
  const mutation = useMutation({
    mutationFn: (newPost) => {
      return axios.post('https://dev.codeleap.co.uk/careers/', newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']); // Atualiza a lista automaticamente
      setTitle('');
      setContent('');
    },
  });

  const handleCreate = () => {
    mutation.mutate({ username, title, content });
  };

  return (
    <Card>
      <Title>What's on your mind?</Title>
      <Label>Title</Label>
      <Input placeholder="Hello world" value={title} onChange={(e) => setTitle(e.target.value)} />
      
      <Label>Content</Label>
      <TextArea placeholder="Content here" value={content} onChange={(e) => setContent(e.target.value)} />
      
      <ButtonContainer>
        <Button disabled={!title || !content || mutation.isPending} onClick={handleCreate}>
          {mutation.isPending ? 'Creating...' : 'Create'}
        </Button>
      </ButtonContainer>
    </Card>
  );
};

export default CreatePost;

// --- Estilos ---
const Card = styled.div`
  background: white; border: 1px solid #999; border-radius: 16px; padding: 24px; margin-bottom: 24px;
`;
const Title = styled.h2` font-size: 22px; font-weight: 700; margin-bottom: 24px; `;
const Label = styled.p` font-size: 16px; margin-bottom: 8px; `;
const Input = styled.input` width: 100%; padding: 8px; border: 1px solid #777; border-radius: 8px; margin-bottom: 16px; box-sizing: border-box; `;
const TextArea = styled.textarea` width: 100%; padding: 8px; border: 1px solid #777; border-radius: 8px; margin-bottom: 16px; min-height: 74px; box-sizing: border-box; resize: none; `;
const ButtonContainer = styled.div` display: flex; justify-content: flex-end; `;
const Button = styled.button` 
  background: #7695EC; color: white; border: none; padding: 8px 32px; border-radius: 8px; font-weight: 700; cursor: pointer;
  &:disabled { background: #ccc; cursor: not-allowed; }
`;