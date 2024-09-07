import React, { useEffect, useState } from 'react';
import './TypingAnimation.css';

const TypingAnimation = ({ words }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setCurrentWord(isDeleting ? fullText.substring(0, currentWord.length - 1) : fullText.substring(0, currentWord.length + 1));

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && currentWord === fullText) {
        setIsDeleting(true);
        setTypingSpeed(1000);
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setCurrentIndex(currentIndex + 1);
        setTypingSpeed(500);
      }
    };

    const typingTimer = setTimeout(() => {
      handleTyping();
    }, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [currentWord, isDeleting, typingSpeed]);

  return (
    <span>
      {currentWord}
      <span className="cursor">&nbsp;</span>
    </span>
  );
};

export default TypingAnimation;
