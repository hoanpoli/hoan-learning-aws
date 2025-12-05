import React, { useState } from 'react';
import { Backdrop, Box } from '@mui/material';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { secondary } from '@/theme/colors';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: secondary[800]
      }}
    >
      <Navbar openBackdrop={openBackdrop} setOpenBackdrop={setOpenBackdrop} />
      <Backdrop
        open={openBackdrop}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(3px)'
        }}
      />
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
      <ScrollToTop />
      <Footer />
    </Box>
  );
};

export default Layout;
