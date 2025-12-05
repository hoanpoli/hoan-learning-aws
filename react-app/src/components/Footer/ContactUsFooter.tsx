import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import RibbonSepImg from '@/assets/ribbon-sep.png';

const ContactUsFooter: React.FC = () => {
  return (
    <Container maxWidth='lg'>
      <Box
			  mb={8}
			  sx={{
			    display: 'flex',
			    justifyContent: 'center'
			  }}
      >
        <div style={{ position: 'relative' }}>
          <div
					  style={{
					    position: 'absolute',
					    zIndex: -10,
					    left: 39,
					    top: -10
					  }}
          >
            <img style={{ width: '23px', height: '46px' }} src={RibbonSepImg} />
          </div>
        </div>
        <Typography
				  sx={{
				    color: '#111927',
				    fontSize: '16px',
				    fontWeight: 700,
				    lineHeight: ''
				  }}
        >
          CONTACT US
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <iframe
				  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6959094210315!2d103.82896867496572!3d1.3590867986280535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19ef233b0d9d%3A0x4c9d66fae5c4790e!2sBreast%20Cancer%20Support%20-%20Breast%20Cancer%20Foundation%20(BCF)!5e0!3m2!1sen!2sid!4v1704869925599!5m2!1sen!2sid'
				  width='400'
				  height='300'
				  style={{ border: '0' }}
				  loading='lazy'
        />
      </Box>
    </Container>
  );
};

export default ContactUsFooter;
