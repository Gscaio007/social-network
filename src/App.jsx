import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from './store/userSlice';
import { FiLogOut } from 'react-icons/fi'; 
import Signup from './features/auth/Signup';
import CreatePost from './features/posts/CreatePost';
import PostList from './features/posts/PostList';

function App() {
  const user = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  if (!user) {
    return <Signup />;
  }

  return (
    <MainContainer>
      <Header>
        <h1>CS Social Network</h1>
        <LogoutButton onClick={() => dispatch(logout())} title="Logout">
          <span>Logout</span>
          <FiLogOut size={20} />
        </LogoutButton>
      </Header>
      
      <Content>
        {}
        <CreatePost />
        
        {}
        <PostList />
      </Content>
    </MainContainer>
  );
}

export default App;

// -- Styles --

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #DDDDDD;
`;

const Header = styled.header`
  background-color: #7695EC;
  padding: 27px 37px;
  color: white;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  
  h1 { font-size: 22px; font-weight: 700; }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  span {
    @media (max-width: 500px) {
      display: none; 
    }
  }
`;

const Content = styled.main`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 24px;
  min-height: calc(100vh - 80px);
`;
