#  CS Social Network
By: Caio Silva

A fully functional CRUD application. This social network allows users to create, read, update, and delete posts. 

Vercel Link: https://cssocial-network-beta.vercel.app/

(Firebase credentials on 'firebase.js' are only for dev mode testing. Of course, in production they shouldn't be there.)

#  Key Features

- **Dual Authentication:** Users can log in manually with a username or use the **Google Login (Firebase OAuth)** as an extra feature.
- **Infinite Scrolling:** Optimized post fetching using **TanStack Query** for better performance and UX.
- **Real-time Actions:** Create, Edit, and Delete posts without page reloads.
- **Form Validation:** Integrated buttons and inputs that validate content before submission.
- **Animations:** **Framer Motion**.
- **Persistence:** Login sessions and user data are persisted via **Redux Toolkit** and LocalStorage.

#  Tech Stack

- **React** 
- **Redux Toolkit** (Global State Management)
- **TanStack Query** (Server State & API Cache)
- **Styled Components** 
- **Framer Motion** 
- **Firebase** (Google Authentication)
- **Axios** 
- **Date-fns** 

#  How to run the project

1. **Clone the repository:**
   
   git clone [https://github.com/Gscaio007/codeleap-network.git](https://github.com/Gscaio007/social-network.git)


2. **Install dependencies:**

npm install
Set up Firebase (Optional for local dev):
Create a project on Firebase, enable Google Auth, and add credentials to src/services/firebase.js.

And then:
npm run dev
