import React, { useState } from 'react';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { secondary } from '@/theme/colors';
import Dropdown from '../Dropdown/DropdownItem';
import { aboutUsList, menuList2, newsroomList } from './menu.data';

interface BoxSignUpNotificationProps {
  isOpenSearch: boolean;
  setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

type tabOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
const tab: tabOptions = {
  'About us': aboutUsList,
  Newsroom: newsroomList
};

const BoxSignUpNotification: React.FC<BoxSignUpNotificationProps> = ({
  isOpenSearch,
  setIsOpenSearch
}) => {
  const baseURL = import.meta.env.VITE_BCF_STG_APP_URL;
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleMouseEnter = (value: string) => {
    setHoveredItem(value);
  };
  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const openSearchBox = () => {
    setIsOpenSearch(true)
    setHoveredItem(null);
  }

  return (
    <Box>
      {isOpenSearch ? (
        <Box height={40}></Box>
      ) : (
        <Stack
          direction='row'
          justifyContent='space-between'
          flexWrap='wrap'
          gap={{ lg: 0, md: 5, sm: 5 }}
          padding='18px 80px 0px 80px'
        >
          <Box width={150}></Box>

          <Stack
            direction='row'
            gap={5}
            flexWrap='wrap'
            justifyContent='center'
            alignItems='center'
          >
            {menuList2.map((item) => (
              <Box
                key={item.index}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.index !== 1 ? (
                  <Dropdown label={item.label} options={tab[item.label]} />
                ) : (
                  <Link to={baseURL + 'membership'}>
                    <Typography variant='body1' color={secondary[100]}>
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
                            left: hoveredItem === item.label ? '0%' : '50%',
                            right: hoveredItem === item.label ? '0%' : '50%',
                            top: 0,
                            width: hoveredItem === item.label ? '100%' : '0%',
                            height: '100%',
                            backgroundColor: secondary[100],
                            transition: 'width 0.3s ease, left 0.3s ease',
                            transform:
                              hoveredItem === item.label
                                ? 'translateX(0)'
                                : 'translateX(-0%)'
                          }}
                        />
                      </Box>
                    </Typography>
                  </Link>
                )}
              </Box>
            ))}
          </Stack>

          <Box
            onMouseEnter={() => handleMouseEnter('Search')}
            onMouseLeave={handleMouseLeave}
            sx={{
              display: isMobile ? 'none' : 'flex',
              alignItems: 'baseline',
              gap: '2px',
              cursor: 'pointer',
              justifyContent: 'end'
            }}
            onClick={openSearchBox}
          >
            <Typography color={secondary[100]} fontSize={14}>
              Search
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
                    left: hoveredItem === 'Search' ? '0%' : '50%',
                    right: hoveredItem === 'Search' ? '0%' : '50%',
                    top: 0,
                    width: hoveredItem === 'Search' ? '100%' : '0%',
                    height: '100%',
                    backgroundColor: secondary[100],
                    transition: 'width 0.3s ease, left 0.3s ease',
                    transform:
                      hoveredItem === 'Search'
                        ? 'translateX(0)'
                        : 'translateX(-0%)'
                  }}
                />
              </Box>
            </Typography>
            <MagnifyingGlass size={16} color='white' />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default BoxSignUpNotification;
