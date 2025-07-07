import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaLock, FaEnvelope, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./Auth.css";
import StarBackground from "../components/StarBackground";

export default function Auth() {
  const [activeBox, setActiveBox] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuth = async (e, isLogin) => {
    e.preventDefault();
    setError("");

    const endpoint = isLogin ? "login" : "signup";
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          login(data.token);
          navigate("/api/tasks");
        } else {
          setActiveBox("login");
        }
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error("❌ Auth error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const toggleBox = () => {
    setActiveBox(activeBox === "login" ? "signup" : "login");
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const boxVariants = {
    initial: { opacity: 0, x: activeBox === "login" ? -100 : 100 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      x: activeBox === "login" ? 100 : -100,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const inputVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <StarBackground />
      <motion.div
        className="auth-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {activeBox === "login" && (
            <motion.div
              key="login"
              className="auth-box login-box"
              variants={boxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.h2>Welcome Back</motion.h2>
              <motion.p className="subtitle">Login to your account</motion.p>

              {error && <motion.p className="error-message">{error}</motion.p>}

              <form onSubmit={(e) => handleAuth(e, true)}>
                <motion.div className="input-container" variants={inputVariants}>
                  <FaEnvelope className="icon" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div className="input-container" variants={inputVariants}>
                  <FaLock className="icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.button type="submit" className="auth-button">
                  Login
                </motion.button>
              </form>
            </motion.div>
          )}

          {activeBox === "signup" && (
            <motion.div
              key="signup"
              className="auth-box signup-box"
              variants={boxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.h2>Create Account</motion.h2>
              <motion.p className="subtitle">Sign up to get started</motion.p>

              {error && <motion.p className="error-message">{error}</motion.p>}

              <form onSubmit={(e) => handleAuth(e, false)}>
                <motion.div className="input-container" variants={inputVariants}>
                  <FaUser className="icon" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div className="input-container" variants={inputVariants}>
                  <FaEnvelope className="icon" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.div className="input-container" variants={inputVariants}>
                  <FaLock className="icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </motion.div>

                <motion.button type="submit" className="auth-button">
                  Sign Up
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="arrow-container">
          <motion.button className="toggle-arrow" onClick={toggleBox}>
            {activeBox === "login" ? <FaArrowRight /> : <FaArrowLeft />}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
