import { useEffect, useState } from 'react';

const useHasVerticalScrollbar = () => {
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const checkScrollbar = () => {
      const scrollExists = document.documentElement.scrollHeight > window.innerHeight;
      setHasScrollbar(scrollExists);
    };

    checkScrollbar();

    const observer = new MutationObserver(() => {
      checkScrollbar();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    window.addEventListener('resize', checkScrollbar);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkScrollbar);
    };
  }, []);

  return hasScrollbar;
};

export default useHasVerticalScrollbar