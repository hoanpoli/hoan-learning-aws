import React from 'react';
import { Box, Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import GetInvolvedIcon from '@/assets/icons/community.svg';
import EventsIcon from '@/assets/icons/events.svg';
import ProgrammesIcon from '@/assets/icons/programmes.svg';
import ResourcesIcon from '@/assets/icons/resources.svg';
import BCFProgrammesBefriender from '@/assets/images/bcf-programmes-befriender-img.jpg';
import BCFProgrammesSupport from '@/assets/images/bcf-programmes-support-group-img.jpg';
import BCFVolunteerMasthead from '@/assets/images/bcf-volunteer-masthead.jpg';
import BCFVolunteer from '@/assets/images/bcf-volunteer.jpg';
import { secondary } from '@/theme/colors';

interface MenuData {
  label: string;
  description: string;
  url: string;
  image: string;
  isLocal?: boolean;
}

interface NavbarItemProps {
  title: string;
  caption: string;
  url: string;
  type: string;
  data: MenuData[];
  tabValue: string;
  customComponents?: React.ReactNode;
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
  const baseURL = import.meta.env.VITE_BCF_STG_APP_URL;
  const localURL = import.meta.env.VITE_VMXMS_DEMO_APP_URL;
  const staging = import.meta.env.VITE_BCF_STG_APP_URL;

  const isMobile = useMediaQuery('(max-width:1000px)');;

  const getIconMenu = (label: string) => {
    switch (label) {
      case 'Programmes':
        return ProgrammesIcon;
      case 'Resources':
        return ResourcesIcon;
      case 'Events':
        return EventsIcon;
      case 'Get Involved':
        return GetInvolvedIcon;
      default:
        return '';
    }
  };

  const getImageMenu = (label: string) => {
    switch (label) {
      case 'programme-1':
        return BCFProgrammesSupport;
      case 'programme-2':
        return BCFProgrammesBefriender;
      case 'volunteer-1':
        return BCFVolunteerMasthead;
      case 'volunteer-2':
        return BCFVolunteer;
      default:
        return '';
    }
  };

  return (
    <Grid container gap={10} alignItems='start'>
      <Grid item md={4.3} sm={12}>
        <img
          src={getIconMenu(props.tabValue)}
          alt={props.title}
          style={{ width: 'min(100%, 80px)' }}
        />
        <Stack gap={7} mt={3}>
          <Typography variant='body1' color={secondary[100]} fontWeight={400}>
            {props.caption}
          </Typography>
          <div>
            <a href={staging + props.url}>
              <div style={{ maxWidth: '100%' }}>
                <Button color='secondary' size='lg'>
                  View {props.type}
                </Button>
              </div>
            </a>
            <div style={{ marginTop: '10px' }}>
              {props.customComponents}
            </div>
          </div>
        </Stack>
      </Grid>
      <Grid
        item
        md={6.5}
        sm={12}
        sx={{ 
          borderLeft: isMobile ? 'none' : `1px solid ${secondary[600]}`, 
          paddingLeft: isMobile ? 0 : '64px', 
          borderTop: isMobile ? `1px solid ${secondary[600]}` : 'none',
          paddingTop: isMobile ? '30px' : 0
        }}
      >
        <Typography
          variant='h6'
          fontWeight={600}
          color={secondary[100]}
          pl={isMobile ? 0 : '16px'}
        >
          {props.title}
        </Typography>
        <Stack gap={3} mt={3}>
          {props.data.map((item, index) => (
            <Box
              key={index}
              sx={{
                padding: '16px',
                borderRadius: '16px',
                ':hover': { backgroundColor: secondary[800] },
                display: 'flex',
                gap: '16px'
              }}
            >
              <Link
                to={item.isLocal ? localURL + item.url : baseURL + item.url}
              >
                <Typography variant='body1' color='white'>
                  {item.label}
                </Typography>
                <Typography variant='body1' color={secondary[100]} mt={3}>
                  {item.description}
                </Typography>
              </Link>
              <img
                src={getImageMenu(item.image)}
                alt={item.label}
                style={{ height: isMobile ? '75px' : '80px', width: 'auto' }}
              />
            </Box>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NavbarItem;
