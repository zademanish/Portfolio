import React, { useEffect, useState } from 'react';

// Replaces the Typed.js CDN script, which never ran: it was initialised from
// public/Script.js on $(document).ready, i.e. before React had rendered the
// .typing spans, so it always bound to zero elements and the headline sat
// empty. This is ~40 lines instead of a 12KB render-blocking dependency.

const DEFAULT_WORDS = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'Backend Specialist',
  'React Expert',
  'Performance Optimizer',
];

function TypingText({
  className = 'typing',
  words = DEFAULT_WORDS,
  typeSpeed = 90,
  backSpeed = 45,
  holdDelay = 1400,
}) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      return undefined;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      setText(word.slice(0, charIndex));

      let delay = deleting ? backSpeed : typeSpeed;

      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = holdDelay;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = typeSpeed;
      }

      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timer);
  }, [words, typeSpeed, backSpeed, holdDelay]);

  return (
    <span className={className} aria-live="off">
      {text}
    </span>
  );
}

export default TypingText;
