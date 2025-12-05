import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowUp } from '@phosphor-icons/react';
import { secondary } from '@/theme/colors';

const ScrollToTopButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.tooltip,
  transition: 'opacity 0.3s ease-in-out',
  backgroundColor: secondary[500],
  opacity: 0,
  '&.show': {
    opacity: 1
  },
  '&:hover': {
    backgroundColor: secondary[200],
    color: secondary[700]
  }
}));

const ScrollToTop: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ScrollToTopButton
      className={showButton ? 'show' : ''}
      color='primary'
      onClick={handleClick}
    >
      <ArrowUp size={26} weight='bold' />
    </ScrollToTopButton>
  );
};

export default ScrollToTop;
