import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Button } from "./components/ui/button"
import { Avatar, AvatarFallback } from "./components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { UserCircle } from 'lucide-react'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AlgorithmList from './components/AlgorithmList'
import AlgorithmEditor from './components/AlgorithmEditor'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CodeEditor from './components/CodeEditor'
import SortingVisualizer from './components/SortingVisualizer'
import AIChat from './components/AIChat'
import MCQGenerator from './components/MCQGenerator'
import ResourcesDisplay from './components/ResourcesDisplay'
import ProfilePage from './components/ProfilePage'
import MultimodalChat from './components/MultiModalChat'
import OurFeatures from './components/OurFeatures'

// Create a client
const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
          <header className="p-5 bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-3xl font-extrabold text-blue-600">
                Socratic Learning
              </Link>
              <div className="flex items-center space-x-6">
                <Link to="/">
                  <Button variant="ghost" className="text-lg font-semibold">Home</Button>
                </Link>

                <Link to="/our-features">
                  <Button variant="ghost" className="text-lg font-semibold">Our Features</Button>
                </Link>

                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="rounded-full" />
                          ) : (
                            <AvatarFallback>
                              <UserCircle className="h-6 w-6 text-gray-400" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuItem className="flex-col items-start">
                        <div className="text-sm font-medium">Welcome, {user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/profile" className="w-full">Profile</Link>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link to="/login"><Button variant="ghost">Login</Button></Link>
                    <Link to="/signup"><Button variant="ghost">Signup</Button></Link>
                  </>
                )}
              </div>
            </nav>
          </header>

          <main className="flex-grow container  py-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login user={user} setUser={setUser} />} />
              <Route path="/signup" element={<Signup user={user} setUser={setUser} />} />
              <Route path="/algorithms" element={<AlgorithmList />} />
              <Route path="/algorithm/:algoName" element={<AlgorithmEditor />} />
              <Route path="/code-editor" element={<CodeEditor />} />
              <Route path="/visualizer/:algoName" element={<SortingVisualizer />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/mcq-generator" element={<MCQGenerator />} />
              <Route path="/resources" element={<ResourcesDisplay />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/multimodal-chat" element={<MultimodalChat />} />
              <Route path="/our-features" element={<OurFeatures />} />
            </Routes>
          </main>

          <footer className="bg-white py-8 border-t mt-auto">
            <div className="container mx-auto text-center text-gray-500">
              <p>&copy; 2024 Socratic Learning. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
