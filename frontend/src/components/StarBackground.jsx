import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StarBackground() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      let starArray = [];
      for (let i = 0; i < 50; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2, // Size between 2px to 6px
        });
      }
      setStars(starArray);
    };
    generateStars();
  }, []);

  return (
    <div className="star-container">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            position: "absolute",
            backgroundColor: "white",
            borderRadius: "50%",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 13, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 1.5, // Randomize twinkling speed
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            x: ["-20px", "20px", "-15px", "15px", "-10px", "10px", "-5px", "5px", "-3px", "3px", "0px","-20px", "20px", "-15px", "15px", "-10px", "10px", "-5px", "5px", "-3px", "3px", "0px"],
            y: ["-20px", "20px", "-15px", "15px", "-10px", "10px", "-5px", "5px", "-3px", "3px", "0px","-20px", "20px", "-15px", "15px", "-10px", "10px", "-5px", "5px", "-3px", "3px", "0px"],
            transition: {
              duration: 1,
              repeat: 1,
              ease: "anticipate",
            },
          }}
        />
      ))}
    </div>
  );
}
