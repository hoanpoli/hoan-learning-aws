import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

import RibbonSepImg from '@/assets/ribbon-sep.png';

const ContactDetailsFooter: React.FC = () => {
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
					    left: 60,
					    top: -10
					  }}
          >
            <img style={{ width: '23px', height: '46px' }} src={RibbonSepImg} />
          </div>
          <Typography
					  sx={{
					    zIndex: 10,
					    color: '#111927',
					    fontSize: '16px',
					    fontWeight: 700,
					    lineHeight: '24px'
					  }}
          >
            CONTACT DETAILS
          </Typography>
        </div>
      </Box>
      <Grid container>
        <Grid item md={6}>
          <Box>
            <Typography
						  sx={{
						    color: '#111927',
						    fontSize: '16px',
						    fontWeight: 600,
						    lineHeight: '24px'
						  }}
            >
              Get In Touch
            </Typography>
            <Typography
						  mt={1}
						  sx={{
						    color: '#6C737F',
						    fontSize: '16px',
						    fontWeight: 400,
						    lineHeight: '24px'
						  }}
            >
			  6352 6560
            </Typography>
            <Typography mt={1}>
              <a
							  style={{
							    color: '#73A4AC',
							    fontWeight: 400,
							    fontSize: '16px',
							    lineHeight: '24px'
							  }}
              >
                enquiries@bcf.org.sg
              </a>
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
						  sx={{
						    color: '#111927',
						    fontSize: '16px',
						    fontWeight: 600,
						    lineHeight: '24px'
						  }}
            >
              Seek Help
            </Typography>
            <Typography
						  mt={1}
						  sx={{
						    color: '#6C737F',
						    fontSize: '16px',
						    fontWeight: 400,
						    lineHeight: '24px'
						  }}
            >
              6356 0123 [Calls Only]
            </Typography>
            <Typography
						  mt={1}
						  sx={{
						    color: '#6C737F',
						    fontSize: '16px',
						    fontWeight: 400,
						    lineHeight: '24px'
						  }}
            >
              9695 3264 [Whatsapp Only]
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
						  sx={{
						    color: '#111927',
						    fontSize: '16px',
						    fontWeight: 600,
						    lineHeight: '24px'
						  }}
            >
              For Volunteers
            </Typography>
            <Typography
						  mt={1}
						  sx={{
						    color: '#6C737F',
						    fontSize: '16px',
						    fontWeight: 400,
						    lineHeight: '24px'
						  }}
            >
              9365 0864
            </Typography>
          </Box>
        </Grid>

        <Grid item md={6}>
          <Box>
            <Typography
						  sx={{
						    color: '#111927',
						    fontSize: '16px',
						    fontWeight: 600,
						    lineHeight: '24px'
						  }}
            >
              Locate Us
            </Typography>
            <Typography
						  mt={1}
						  sx={{
						    color: '#6C737F',
						    fontSize: '16px',
						    fontWeight: 400,
						    lineHeight: '24px'
						  }}
            >
              Blk 441 Sin Ming Avenue, #01-417 <br /> Singapore 570441
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
						  sx={{
						    color: '#111927',
						    fontSize: '16px',
						    fontWeight: 600,
						    lineHeight: '24px'
						  }}
            >
              Operating Hours:
            </Typography>
            <Typography
						  mt={1}
						  sx={{
						    color: '#6C737F',
						    fontSize: '16px',
						    fontWeight: 400,
						    lineHeight: '24px'
						  }}
            >
              Monday to Fridays: <br />
              9.00 a.m. to 6.00 p.m
              <br />
              Closed On Saturdays, <br />
              Sundays & Public Holidays
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactDetailsFooter;
