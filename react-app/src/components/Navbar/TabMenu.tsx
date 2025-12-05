import React from 'react';
import { keyframes } from '@emotion/react';
import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CaretLeft } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Caregiving from '@/assets/icons/caregiving.svg';
import ComfortCare from '@/assets/icons/comfort-care.svg';
import BreastCancerRisk from '@/assets/icons/detection.svg';
import PostTreatmentCare from '@/assets/icons/post-treatment.svg';
import Treatment from '@/assets/icons/treatment.svg';
import WhatToDoAfterDiagnosis from '@/assets/illustration/waht-do-after-diagnosis-illustration.png';
import { secondary } from '@/theme/colors';
import { getInvolved, guidanceMenuList, programmes } from './menu.data';
import NavbarItem from './NavbarItem';

const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
`;

const fadeOutToRight = keyframes`
  0% {
    
    transform: translateX(0);
  }
  100% {
    
    transform: translateX(100%);
  }
`;

interface TabMenuProps {
  show: boolean;
  closeMenu: () => void;
  title: string;
  type: 'Guidance' | 'Programmes' | 'Resources' | 'Events' | 'Get Involved';
  baseURL: string;
  customItem?: React.ReactNode;
}

const TabMenu: React.FC<TabMenuProps> = (props) => {

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

  return (
    <Box
      sx={{ 
        display: props.show ? 'inline-block' : 'none',
        padding: '0px 18px',
        animation: `${props.show ? slideInFromRight : fadeOutToRight} 0.2s forwards`,
        background: secondary[900],
        paddingBottom: '100px'
      }}
    >
      <Typography 
        onClick={props.closeMenu}
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          color: '#FF54AA',
          size: '18px',
          fontWeight: 600,
          gap: 1,
          cursor: 'pointer'
        }}
      >
        <CaretLeft size={14} weight='bold' />
        {props.title}
      </Typography>

      <Box mt={8}>
        {
          props.type === 'Guidance' &&
          <Stack direction='column' gap={10}>
            {guidanceMenuList.map((item) => (
              <a href={props.baseURL + item.url} key={item.label}>
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
            ))}
          </Stack>
        }

        {
          props.type === 'Programmes' && 
          (
            <NavbarItem 
              caption='Programmes to support breast cancer patients, caregivers, and anyone who wants to take charge of their breast health.'
              tabValue='Programmes'
              title='Top Programmes'
              type='Event Programmes'
              url='programmes'
              data={programmes}
              customComponents={
                <Link to='donation'>
                  <Button color='secondary' size='lg' onClick={props.closeMenu}>
                    View Donation Programmes
                  </Button>
                </Link>
              }
            />
          )
        }

        {
          props.type === 'Resources' && 
          (
            <NavbarItem
              tabValue='Resources'
              title='Popular resources'
              caption='From articles to podcasts—everything to help you learn more about breast cancer.'
              url='resources'
              type='All Resources'
              data={programmes}
            />
          )
        }

        {
          props.type === 'Events' &&
          <NavbarItem
            tabValue='Events'
            title='Highlights'
            caption='Fun activities and awareness campaigns for breast cancer warriors, supporters, and more.'
            url='events'
            type='All Events'
            data={[]}
          />
        }

        {
          props.type === 'Get Involved' &&
          <NavbarItem
            tabValue='Get Involved'
            title='Popular ways to get involved'
            caption='See the many ways in which you can join us in supporting our local breast cancer community. '
            url='get-involved'
            type='All Initiatives'
            data={getInvolved}
          />
        }
      </Box>
      
    </Box>
  )
}

export default TabMenu;