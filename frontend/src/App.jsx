import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Header from "./components/Header"; // Optional, you can remove if not needed

import TaskList from "./components/TaskList";

function App() {
  return (
    <Router>
      <Header /> {/* Optional */}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/api/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  );
}

export default App;
