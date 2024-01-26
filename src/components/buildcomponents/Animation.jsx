import React from "react";
import { motion } from "framer-motion";

const MyAnimatedDiv = ({ children }) => {
  const divVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={divVariants}
    >
      {children}
    </motion.div>
  );
};

export default MyAnimatedDiv;

