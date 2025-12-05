// import FacebookLogo from '@/assets/social-media-icon/fb.svg';
// import InstagramLogo from '@/assets/social-media-icon/instagram.svg';
// import LinkedinLogo from '@/assets/social-media-icon/linkedin.svg';
// import YoutubeLogo from '@/assets/social-media-icon/youtube.svg';
import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MapPinLine,
  Phone,
  YoutubeLogo
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { primary, secondary } from '@/theme/colors';

const Footer: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:1000px)');
  const baseURL = 'https://staging.bcf.org.sg/';

  return (
    <Box 
      sx={{ 
        backgroundColor: '#022624', 
        padding: isMobile ? '50px 20px' : '45px 80px 45px 80px' 
      }}
    >
      <Container>
        <Grid
          container
          alignItems={{ lg: 'flex-end', sm: 'flex-start' }}
          gap={{ lg: 0, md: 0, sm: '40px' }}
        >
          <Grid item lg={6} md={5.5} sm={12}>
            <Box
              sx={{
                borderRight: isMobile ? 'none' : '1px solid #38837F',
                borderBottom: isMobile ? '1px solid #38837F' : 'none',
                paddingRight: isMobile ? 0 : '80px',
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '24px' : '32px',
                paddingBottom: isMobile ? '30px' : 0
              }}
            >
              <Typography
                fontSize={isMobile ? '1.625rem' : '2rem'}
                color={primary[100]}
                fontFamily={'Bree Serif'}
              >
                Contact us
              </Typography>
              <Box>
                <Stack direction='row' gap='32px'>
                  <Stack gap='8px'>
                    <Typography
                      variant='subtitle2'
                      fontWeight={700}
                      color={secondary[100]}
                    >
                      General Enquiries
                    </Typography>
                    <Link to='mailto:enquiries@bcf.org.sg'>
                      <Typography
                        variant='body1'
                        sx={{
                          display: 'flex',
                          gap: '8px',
                          alignItems: 'center',
                          color: 'white',
                          ':hover': {
                            color: primary[200]
                          }
                        }}
                      >
                        <EnvelopeSimple size={24} /> enquiries@bcf.org.sg
                      </Typography>
                    </Link>
                    <Link to={`${baseURL}about-us/visit-us/`}>
                      <Typography
                        variant='body1'
                        sx={{
                          display: 'flex',
                          gap: '8px',
                          alignItems: 'center',
                          color: 'white',
                          ':hover': {
                            color: primary[200]
                          }
                        }}
                      >
                        <MapPinLine size={24} /> Locate us
                      </Typography>
                    </Link>
                  </Stack>
                  <Stack gap='8px'>
                    <Typography
                      variant='subtitle2'
                      fontWeight={700}
                      color={secondary[100]}
                    >
                      24-hour hotline
                    </Typography>
                    <Link to='tel:63526560'>
                      <Typography
                        variant='body1'
                        sx={{
                          display: 'flex',
                          gap: '8px',
                          alignItems: 'center',
                          color: 'white',
                          ':hover': {
                            color: primary[200]
                          }
                        }}
                      >
                        <Phone size={24} /> 6352 6560
                      </Typography>
                    </Link>
                  </Stack>
                </Stack>

                <Box mt='24px'>
                  <Button
                    color='secondary'
                    size='lg'
                    style={{ padding: '9px 32px' }}
                    href={`${baseURL}contact-us/`}
                  >
                    Send Enquiry
                  </Button>
                </Box>
              </Box>

              <Stack direction='row' gap='16px' mt='8px'>
                <Link to={`${baseURL}sitemap/`}>
                  <Typography
                    variant='body1'
                    color='white'
                    sx={{ color: 'white', ':hover': { color: primary[200] } }}
                  >
                    Sitemap
                  </Typography>
                </Link>
                <Link to={`${baseURL}terms-of-use/`}>
                  <Typography
                    variant='body1'
                    color='white'
                    sx={{ color: 'white', ':hover': { color: primary[200] } }}
                  >
                    Terms of Use
                  </Typography>
                </Link>
                <Link to={`${baseURL}privacy-policy/`}>
                  <Typography
                    variant='body1'
                    color='white'
                    sx={{ color: 'white', ':hover': { color: primary[200] } }}
                  >
                    Privacy Policy
                  </Typography>
                </Link>
              </Stack>
            </Box>
          </Grid>
          <Grid item lg={6} md={6.5} sm={12}>
            <Box
              paddingLeft={{ lg: '68px', md: '68px', sm: '0' }}
              sx={{
                display: 'flex',
                gap: '32px',
                flexDirection: 'column',
                marginTop: isMobile ? '30px' : 0
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '8px',
                  flexDirection: 'column'
                }}
              >
                <Typography
                  variant='subtitle2'
                  fontWeight={600}
                  color={secondary[100]}
                >
                  Be in the know
                </Typography>
                <div>
                  <Button
                    color='secondary'
                    size='lg'
                    style={{ padding: '9px 32px' }}
                    href={`${baseURL}terms-of-use/#elementor-action%3Aaction%3Dpopup%3Aopen%26settings%3DeyJpZCI6IjQ1MjgiLCJ0b2dnbGUiOmZhbHNlfQ%3D%3D`}
                  >
                    Subscribe
                  </Button>
                </div>
              </Box>

              <Box>
                <Typography
                  variant='subtitle2'
                  fontWeight={600}
                  color={secondary[100]}
                  mb='8px'
                >
                  Follow us
                </Typography>
                <Stack direction='row' gap='24px'>
                  <Link to='https://www.facebook.com/BreastCancerFoundationSG'>
                    <Typography
                      sx={{
                        color: 'white',
                        ':hover': { color: primary[200] }
                      }}
                    >
                      <FacebookLogo size={32} weight='fill' />
                    </Typography>
                  </Link>
                  <a
                    style={{ cursor: 'pointer' }}
                    href='https://www.youtube.com/channel/UCmQbI4Dg2G1OmyMn60LQVyw'
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        ':hover': { color: primary[200] }
                      }}
                    >
                      <YoutubeLogo size={32} weight='fill' />
                    </Typography>
                  </a>
                  <a
                    style={{ cursor: 'pointer' }}
                    href='https://www.instagram.com/bcfsg/?hl=en'
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        ':hover': { color: primary[200] }
                      }}
                    >
                      <InstagramLogo size={32} />
                    </Typography>
                  </a>
                  <a
                    style={{ cursor: 'pointer' }}
                    href='https://www.linkedin.com/company/breast-cancer-foundation/?originalSubdomain=sg'
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        ':hover': { color: primary[200] }
                      }}
                    >
                      <LinkedinLogo size={32} weight='fill' />
                    </Typography>
                  </a>
                </Stack>
              </Box>

              <Typography variant='body2' color={secondary[100]}>
                Copyright© 2024 Breast Cancer Foundation
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
