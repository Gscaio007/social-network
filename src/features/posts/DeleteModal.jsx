import React from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const DeleteModal = ({ postId, onClose }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => axios.delete(`https://dev.codeleap.co.uk/careers/${postId}/`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      onClose();
    },

    onError: (error) => {
      console.error('Error deleting post:', error);
      alert('Failed to delete the post.');
    },
  });

  return (
    <Overlay>
      <Modal>
        <Title>Are you sure you want to delete this item?</Title>

        <Actions>
          <CancelButton onClick={onClose} disabled={mutation.isPending}>
            Cancel
          </CancelButton>

          <DeleteButton
            onClick={mutation.mutate}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </DeleteButton>
        </Actions>

      </Modal>
    </Overlay>
  );
};

export default DeleteModal;


// --- Estilos ---

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(119, 119, 119, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Modal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  width: 660px;
  max-width: 90%;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const Button = styled.button`
  padding: 8px 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  border: 1px solid #999;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const CancelButton = styled(Button)`
  background: white;
  color: black;
`;

const DeleteButton = styled(Button)`
  background: #FF5151;
  color: white;
  border: none;

  &:disabled {
    background: #ffaaaa;
  }
`;