import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const EditModal = ({ post, onClose }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedData) => {
      //  API requires "/" in URL
      return axios.patch(`https://dev.codeleap.co.uk/careers/${post.id}/`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      onClose();
    },
  });

  const handleSave = () => {
    mutation.mutate({ title, content });
  };

  return (
    <Overlay>
      <Modal>
        <Title>Edit item</Title>
        
        <Label>Title</Label>
        <Input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Hello world"
        />
        
        <Label>Content</Label>
        <TextArea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Content here"
        />
        
        <Actions>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SaveButton 
            disabled={!title || !content || mutation.isPending} 
            onClick={handleSave}
          >
            {mutation.isPending ? 'Saving...' : 'Save'}
          </SaveButton>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default EditModal;

// --- Estilos (Fiel ao Figma image_5d6f9e.png) ---

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(119, 119, 119, 0.8);
  display: flex; align-items: center; justify-content: center; z-index: 100;
`;

const Modal = styled.div`
  background: white; padding: 24px; border-radius: 16px; width: 660px; max-width: 90%;
`;

const Title = styled.h2` font-size: 22px; font-weight: 700; margin-bottom: 24px; `;

const Label = styled.p` font-size: 16px; margin-bottom: 8px; `;

const Input = styled.input`
  width: 100%; padding: 8px; border: 1px solid #777; border-radius: 8px; margin-bottom: 16px;
`;

const TextArea = styled.textarea`
  width: 100%; padding: 8px; border: 1px solid #777; border-radius: 8px; margin-bottom: 16px;
  min-height: 74px; resize: none;
`;

const Actions = styled.div` display: flex; justify-content: flex-end; gap: 16px; `;

const Button = styled.button`
  padding: 8px 32px; border-radius: 8px; font-weight: 700; border: 1px solid #999;
`;

const CancelButton = styled(Button)` background: white; color: black; `;

const SaveButton = styled(Button)` 
  background: #47B960; color: white; border: none;
  &:disabled { background: #9fdfaf; }
`;