import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Study from "./pages/Study/Study";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import Editor from "./pages/Editor/Editor";
import Header from "./components/Header/header";

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/study" element={<Study />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/editor" element={<Editor />} />
            </Routes>
        </Router>
    );
};

export default App;
