import React, { useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { CaretDown, Heart, X } from '@phosphor-icons/react';

import { Link, useNavigate } from 'react-router-dom';
import BCFLogo from '@/assets/bcf-logo/bcf-logo-white.png';
import Caregiving from '@/assets/icons/caregiving.svg';
import ComfortCare from '@/assets/icons/comfort-care.svg';
import BreastCancerRisk from '@/assets/icons/detection.svg';
import PostTreatmentCare from '@/assets/icons/post-treatment.svg';
import Treatment from '@/assets/icons/treatment.svg';
import WhatToDoAfterDiagnosis from '@/assets/illustration/waht-do-after-diagnosis-illustration.png';
import BoxSignUpNotification from '@/components/Navbar/BoxSignUpNotification';
import { useDonation } from '@/features/donation/hooks/DonationHook';
import { primary, secondary } from '@/theme/colors';
import ButtonPrimaryLight from '../Button/ButtonPrimaryLight';
import {
  getInvolved,
  guidanceMenuList,
  newMenuList,
  programmes
} from './menu.data';
import MenuMobile from './MenuMobile';
import NavbarItem from './NavbarItem';
import SearchBar from './SearchBar';

interface NavbarProps {
  openBackdrop: boolean;
  setOpenBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const isMobile = useMediaQuery('(max-width:1000px)');
  const baseURL = import.meta.env.VITE_BCF_STG_APP_URL;

  const navigate = useNavigate();

  const [isSelected, setIsSelected] = useState(false);
  const [tabValue, setTabValue] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const collapseRef = useRef<HTMLDivElement>(null);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [showAppBar, setShowAppBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setShowAppBar(false);
    } else {
      // Scrolling up
      setShowAppBar(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    if(!showMobileMenu) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY, showMobileMenu]);

  const closeNavbar = () => {
    setIsSelected(false);
    setTabValue('');
    props.setOpenBackdrop(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      collapseRef.current &&
      !collapseRef.current.contains(event.target as Node)
    ) {
      closeNavbar();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapseRef]);

  const handleMouseOver = (value: string) => {
    if (tabValue !== value) {
      setIsSelected(true);
      setTabValue(value);
      props.setOpenBackdrop(true);
    } else {
      setIsSelected(false);
      setTabValue('');
      props.setOpenBackdrop(false);
    }
  };

  const handleMouseEnter = (value: string) => {
    setHoveredItem(value);
  };
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const getIllustration = (label: string) => {
    switch (label) {
      case 'Breast cancer risk':
        return (
          <img
            src={BreastCancerRisk}
            alt={label}
            style={{ width: 'min(100%, 64px)' }}
          />
        );
      case 'Post-treatment care':
        return (
          <img
            src={PostTreatmentCare}
            alt={label}
            style={{ width: 'min(100%, 64px)' }}
          />
        );
      case 'What to do after diagnosis':
        return (
          <img
            src={WhatToDoAfterDiagnosis}
            alt={label}
            style={{ width: 'min(100%, 64px)' }}
          />
        );
      case 'Palliative care':
        return (
          <img
            src={ComfortCare}
            alt={label}
            style={{ width: 'min(100%, 64px)' }}
          />
        );
      case 'Treatment':
        return (
          <img
            src={Treatment}
            alt={label}
            style={{ width: 'min(100%, 64px)' }}
          />
        );
      case 'Caregiving':
        return (
          <img
            src={Caregiving}
            alt={label}
            style={{ width: 'min(100%, 64px)' }}
          />
        );
    }
  };

  const { reset } = useDonation();

  const handleClickDonate = () => {
    navigate('/');
    closeNavbar();
    reset();
    sessionStorage.clear();
  };

  const handleClickGeneralDonation = () => {
    closeNavbar();
  }

  const handleClickMobileMenu = () => {
    props.setOpenBackdrop(!showMobileMenu);
    setShowMobileMenu(!showMobileMenu);
  }

  useEffect(() => {
    if(showMobileMenu || isSelected) {
      document.body.style.overflow = 'hidden';
    }else {
      document.body.style.overflow = 'auto';
    }
  },[showMobileMenu, isSelected])

  return (
  <AppBar
    position='sticky'
    sx={{
      backgroundColor: isSelected || showMobileMenu ? secondary[900] : secondary[800],
      boxShadow: showAppBar ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
      zIndex: (theme) => theme.zIndex.drawer + 2,
      transition: 'transform 0.3s ease-in-out',
      transform: showAppBar ? 'translateY(0)' : 'translateY(-100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: showMobileMenu ? 'auto' : 'none'
    }}
  >
    {
      isMobile &&
      <Box sx={{ minHeight: showMobileMenu ? '100vh' : 'auto' }}>
        <Box 
          sx={{ 
            padding: '30px 18px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'start'
          }}
        >
          <a href={baseURL} rel='noreferrer'>
            <img
              src={BCFLogo}
              alt='Breast Cancer Foundation Logo'
              style={{ width: 'auto', height: '30px' }}
            />
          </a>
          <Stack 
            gap='6px' 
            direction='column' 
            alignItems='end' 
            onClick={handleClickMobileMenu}
            sx={{ cursor: 'pointer' }}
          >
            {
              showMobileMenu ? 
                <X size={28} color='#fff' /> 
                :
                <>
                <Box style={{ width: '25px', height: '2.5px', background: 'white' }}></Box>
                <Box style={{ width: '18px', height: '2.5px', background: 'white' }}></Box>
                </>
            }
          </Stack>
        </Box>
        
        <MenuMobile 
          collapseIn={showMobileMenu} 
          handleClickDonate={handleClickDonate} 
          setCloseNavbar={setShowMobileMenu} 
        />
        
      </Box>
    }

    {
      !isMobile &&
      <BoxSignUpNotification
        setIsOpenSearch={setIsOpenSearch}
        isOpenSearch={isOpenSearch}
      />
    }

    <Box 
      ref={collapseRef} 
      mt={isMobile ? '4px' : '14px'} 
      style={{ 
        display: isMobile ? 'none' : ''
      }}
    >
      <Stack
        direction={'row'}
        justifyContent='space-between'
        alignItems={'center'}
        flexWrap='wrap'
        padding={'0px 80px 24px 80px'}
        gap={{ lg: 0, md: 5, sm: 5 }}
      >
        <a href={baseURL} rel='noreferrer'>
          <img
            src={BCFLogo}
            alt='Breast Cancer Foundation Logo'
            style={{ width: 'auto', height: '32px' }}
          />
        </a>

        {!isOpenSearch ? (
          <Stack direction='row' gap={4} flexWrap='wrap'>
            {newMenuList.map((item, index) => (
              <Box
                key={index}
                onClick={() => handleMouseOver(item.label)}
                sx={{ cursor: 'pointer' }}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Stack direction='row' gap={2} alignItems='center'>
                  <Typography
                    variant='body1'
                    color={
                      item.label === tabValue ? primary[300] : primary[100]
                    }
                  >
                    {item.label}
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '1.5px',
                        backgroundColor: 'transparent',
                        overflow: 'hidden',
                        marginTop: '-2px'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          left:
                            hoveredItem === item.label ||
                            tabValue === item.label
                              ? '0%'
                              : '50%',
                          right:
                            hoveredItem === item.label ||
                            tabValue === item.label
                              ? '0%'
                              : '50%',
                          top: 0,
                          width:
                            hoveredItem === item.label ||
                            tabValue === item.label
                              ? '100%'
                              : '0%',
                          height: '100%',
                          backgroundColor:
                            tabValue === item.label
                              ? primary[300]
                              : primary[100],
                          transition: 'width 0.3s ease, left 0.3s ease',
                          transform:
                            hoveredItem === item.label ||
                            tabValue === item.label
                              ? 'translateX(0)'
                              : 'translateX(-0%)'
                        }}
                      />
                    </Box>
                  </Typography>

                  <CaretDown
                    size={16}
                    color={
                      item.label === tabValue ? primary[300] : primary[100]
                    }
                    weight='bold'
                    style={{
                      transform:
                        item.label === tabValue
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                      transition: 'transform 0.3s ease-out'
                    }}
                  />
                </Stack>
              </Box>
            ))}
          </Stack>
        ) : (
          <Box mt='16px'></Box>
        )}

        {!isOpenSearch ? (
          <ButtonPrimaryLight
            variant='contained'
            color='primary'
            onClick={handleClickDonate}
            startIcon={<Heart weight='bold' size={24} />}
          >
            Donate
          </ButtonPrimaryLight>
        ) : (
          <Button
            color='secondary'
            size='lg'
            onClick={() => setIsOpenSearch(!isOpenSearch)}
          >
            Close
            <X size={22} style={{ marginLeft: '8px' }} />
          </Button>
        )}
      </Stack>
      <Collapse
        in={isSelected}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: 'absolute',
          height: '100%',
          width: '100%'
        }}
      >
        <Box bgcolor={secondary[900]} margin={0} padding='24px'>
          <Box padding='20px 112px 50px 112px' color='#111927'>
            <Grid container gap='32px' justifyContent='center'>
              {tabValue === 'Guidance' && (
                <>
                  {guidanceMenuList.map((item, index) => (
                    <Grid
                      item
                      md={5}
                      lg={5}
                      key={index}
                      sx={{
                        padding: '16px',
                        borderRadius: '16px',
                        ':hover': { backgroundColor: secondary[800] }
                      }}
                    >
                      <a href={baseURL + item.url}>
                        <Stack direction='row' gap={3} alignItems='center'>
                          {getIllustration(item.label)}
                          <Stack gap={2}>
                            <Typography
                              variant='body1'
                              color='white'
                              fontWeight={600}
                            >
                              {item.label}
                            </Typography>
                            <Typography
                              variant='body1'
                              color={secondary[100]}
                            >
                              {item.description}
                            </Typography>
                          </Stack>
                        </Stack>
                      </a>
                    </Grid>
                  ))}
                </>
              )}

              {tabValue === 'Programmes' && (
                <NavbarItem
                  caption='Programmes to support breast cancer patients, caregivers, and anyone who wants to take charge of their breast health.'
                  tabValue={tabValue}
                  title='Top Programmes'
                  type='Event Programmes'
                  url='programmes'
                  data={programmes}
                  customComponents={
                    <Link to='donation'>
                      <Button color='secondary' size='lg' onClick={handleClickGeneralDonation}>
                        View Donation Programmes
                      </Button>
                    </Link>
                  }
                />
              )}

              {tabValue === 'Resources' && (
                <NavbarItem
                  tabValue={tabValue}
                  title='Popular resources'
                  caption='From articles to podcasts—everything to help you learn more about breast cancer.'
                  url='resources'
                  type='All Resources'
                  data={programmes}
                />
              )}

              {tabValue === 'Events' && (
                <NavbarItem
                  tabValue={tabValue}
                  title='Highlights'
                  caption='Fun activities and awareness campaigns for breast cancer warriors, supporters, and more.'
                  url='events'
                  type='All Events'
                  data={[]}
                />
              )}

              {tabValue === 'Get Involved' && (
                <NavbarItem
                  tabValue={tabValue}
                  title='Popular ways to get involved'
                  caption='See the many ways in which you can join us in supporting our local breast cancer community. '
                  url='get-involved'
                  type='All Initiatives'
                  data={getInvolved}
                />
              )}
            </Grid>
          </Box>
        </Box>
      </Collapse>
      <div>
        <SearchBar isOpenSearch={isOpenSearch} baseURL={baseURL} />
      </div>
    </Box>
  </AppBar>
  );
};

export default Navbar;
