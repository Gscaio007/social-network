import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../../store/userSlice';
import { auth, googleProvider } from '../../services/firebase';
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc"; 
import { motion } from 'framer-motion';

const Signup = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handleManualLogin = () => {
    if (username.trim()) {
      dispatch(login(username));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      dispatch(login(user.displayName));
    } catch (error) {
      console.error("Erro no login social:", error);
      alert("Social login failed. Please try manual login.");
    }
  };

  return (
    <Overlay>
      <Modal
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Title>Welcome to Cs Social Network!</Title>
        
        <Label>Please enter your username</Label>
        <Input 
          placeholder="Caio Silva" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleManualLogin()}
        />

        <Actions>
          <EnterButton 
            disabled={!username} 
            onClick={handleManualLogin}
          >
            ENTER
          </EnterButton>
        </Actions>

        {}
        <Divider>
          <hr /> <span>or</span> <hr />
        </Divider>

        <GoogleButton onClick={handleGoogleLogin}>
          <FcGoogle size={22} />
          Sign in with Google
        </GoogleButton>
      </Modal>
    </Overlay>
  );
};

export default Signup;

// --- Estilos ---

const Overlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: #DDDDDD;
  display: flex; align-items: center; justify-content: center;
`;

const Modal = styled(motion.div)`
  background: white; padding: 24px; border-radius: 16px;
  width: 500px; max-width: 90%;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
`;

const Title = styled.h2` font-size: 22px; font-weight: 700; margin-bottom: 24px; `;

const Label = styled.p` font-size: 16px; margin-bottom: 8px; `;

const Input = styled.input`
  width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 8px;
  margin-bottom: 16px; font-size: 14px;
`;

const Actions = styled.div` display: flex; justify-content: flex-end; `;

const EnterButton = styled.button`
  background-color: #7695EC; color: white; padding: 8px 30px;
  border-radius: 8px; font-weight: 700; border: none; cursor: pointer;
  &:disabled { background-color: #ccc; cursor: not-allowed; }
`;

const Divider = styled.div`
  display: flex; align-items: center; margin: 24px 0;
  width: 100%;
  hr { flex: 1; border: none; border-top: 1px solid #ccc; }
  span { padding: 0 10px; color: #999; font-size: 14px; }
`;

const GoogleButton = styled.button`
  width: 100%; display: flex; align-items: center; justify-content: center;
  gap: 12px; padding: 10px; border: 1px solid #ccc; border-radius: 8px;
  background: white; font-weight: 700; color: #333; cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #f5f5f5; }
`;
