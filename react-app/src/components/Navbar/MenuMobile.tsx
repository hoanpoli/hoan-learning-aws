import React from 'react';
import { Box, Collapse, Stack, Typography } from '@mui/material';
import { CaretDown, CaretRight, Heart, MagnifyingGlass } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { primary, secondary } from '@/theme/colors';
import ButtonPrimaryLight from '../Button/ButtonPrimaryLight';
import { aboutUsList2, menuList2, newMenuList, newsroomList2 } from './menu.data';
import TabMenu from './TabMenu';
import TabSearch from './TabSearch';

interface MenuMobileProps {
  collapseIn: boolean;
  handleClickDonate: () => void;
  setCloseNavbar: (_show: boolean) => void;
}

const MenuMobile: React.FC<MenuMobileProps> = (props) => {
  const baseURL = import.meta.env.VITE_BCF_STG_APP_URL;
  const [tabValue, setTabValue] = React.useState<string>('');
  const [tabMenu, setTabMenu] = React.useState<string>('');
  const [showSearch, setShowSearch] = React.useState<boolean>(false);

  const handleClickTabValue = (value: string) => {
    if (value === tabValue) { setTabValue(''); }
    else { setTabValue(value); }
  }

  const handleDonate = () => {
    props.handleClickDonate();
    props.setCloseNavbar(false);
  }

  const handleOpenSearch = () => setShowSearch(true);
  const handleCloseSearch = () => setShowSearch(false);

  const handleCloseTabMenu = () => setTabMenu('');

  React.useEffect(() => {
    if (!props.collapseIn) {
      setTabMenu('');
      setTabValue('');
      setShowSearch(false);
    }
  }, [props.collapseIn]);

  return (
    <Collapse
      in={props.collapseIn}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'absolute',
        padding: '10px 0',
        width: '100%',
        height: '100%'
      }}
    >
      <Box
      >
        <TabSearch
          show={showSearch}
          closeSearch={handleCloseSearch}
          baseURL={baseURL}
        />

        {/* Guidance Menu */}
        <TabMenu
          title='Guidance'
          show={tabMenu === 'Guidance'}
          closeMenu={handleCloseTabMenu}
          type='Guidance'
          baseURL={baseURL}
        />

        {/* Programmes Menu */}
        <TabMenu
          title='Programmes'
          show={tabMenu === 'Programmes'}
          closeMenu={handleCloseTabMenu}
          type='Programmes'
          baseURL={baseURL}
        />

        {/* Resources Menu */}
        <TabMenu
          title='Resources'
          show={tabMenu === 'Resources'}
          closeMenu={handleCloseTabMenu}
          type='Resources'
          baseURL={baseURL}
        />

        {/* Events Menu */}
        <TabMenu
          title='Events'
          show={tabMenu === 'Events'}
          closeMenu={handleCloseTabMenu}
          type='Events'
          baseURL={baseURL}
        />

        {/* Get Involved Menu */}
        <TabMenu
          title='Get Involved'
          show={tabMenu === 'Get Involved'}
          closeMenu={handleCloseTabMenu}
          type='Get Involved'
          baseURL={baseURL}
        />

        {!showSearch && tabMenu === '' &&
          <Box
            sx={{
              padding: '0 22px 30px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              background: secondary[900]
            }}
          >
            {/* Search button */}
            <Box
              sx={{
                alignItems: 'baseline',
                gap: '3px',
                cursor: 'pointer',
                display: 'flex'
              }}
              onClick={handleOpenSearch}
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
                      // left: hoveredItem === 'Search' ? '0%' : '50%',
                      // right: hoveredItem === 'Search' ? '0%' : '50%',
                      top: 0,
                      // width: hoveredItem === 'Search' ? '100%' : '0%',
                      height: '100%',
                      backgroundColor: secondary[100],
                      transition: 'width 0.3s ease, left 0.3s ease'
                      // transform:
                      //   hoveredItem === 'Search'
                      //     ? 'translateX(0)'
                      //     : 'translateX(-0%)'
                    }}
                  />
                </Box>
              </Typography>
              <MagnifyingGlass size={16} color='white' />
            </Box>

            {/* menu */}
            <Stack
              direction='column'
              gap={1}
              mt='13px'
              alignItems='start'
            >
              {newMenuList.map((item, index) => (
                <Box
                  key={index}
                  onClick={() => setTabMenu(item.label)}
                  sx={{ cursor: 'pointer', padding: '14px 0', width: '100%' }}
                >
                  <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography
                      fontSize={18}
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
                            left: tabValue === item.label ? '0%' : '50%',
                            right: tabValue === item.label ? '0%' : '50%',
                            top: 0,
                            width: tabValue === item.label ? '100%' : '0%',
                            height: '100%',
                            backgroundColor:
                              tabValue === item.label ? primary[300] : primary[100],
                            transition: 'width 0.3s ease, left 0.3s ease',
                            transform:
                              tabValue === item.label ? 'translateX(0)' : 'translateX(-0%)'
                          }}
                        />
                      </Box>
                    </Typography>

                    <CaretRight
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
              {/* HoanNguyen 2025-Dec-03 Commented this */}
              {/* <Box margin='14px 0'>
                <ButtonPrimaryLight
                  variant='contained'
                  color='primary'
                  onClick={handleDonate}
                  startIcon={<Heart weight='bold' size={24} />}
                >
                  Donate
                </ButtonPrimaryLight>
              </Box> */}
            </Stack>
            <Stack
              sx={{
                borderTop: '1px solid #055B56',
                paddingTop: '24px',
                marginTop: '18px'
              }}
              gap={5}
            >
              {menuList2.map((item) => (
                <Box key={item.index}>
                  {
                    item.index === 1 ?
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
                                top: 0,
                                height: '100%',
                                backgroundColor: secondary[100],
                                transition: 'width 0.3s ease, left 0.3s ease'
                              }}
                            />
                          </Box>
                        </Typography>
                      </Link>
                      :
                      <Box>
                        <Stack
                          direction='row'
                          gap={2}
                          alignItems='center'
                          onClick={() => handleClickTabValue(item.label)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <Typography
                            variant='body1'
                            color={tabValue === item.label ? '#fff' : secondary[100]}
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
                                  left: tabValue === item.label ? '0%' : '50%',
                                  right: tabValue === item.label ? '0%' : '50%',
                                  top: 0,
                                  width: tabValue === item.label ? '100%' : '0%',
                                  height: '100%',
                                  backgroundColor: tabValue === item.label ? '#fff' : secondary[100],
                                  transition: 'width 0.3s ease, left 0.3s ease',
                                  transform:
                                    tabValue === item.label
                                      ? 'translateX(0)'
                                      : 'translateX(-0%)'
                                }}
                              />
                            </Box>
                          </Typography>
                          <CaretDown
                            size={15}
                            color={tabValue === item.label ? '#fff' : secondary[100]}
                            style={{
                              transform:
                                item.label === tabValue
                                  ? 'rotate(180deg)'
                                  : 'rotate(0deg)',
                              transition: 'transform 0.3s ease-out'
                            }}
                          />
                        </Stack>

                        <Collapse
                          sx={{
                            marginTop: tabValue === 'About us' &&
                              item.label === tabValue ? '16px' : 0
                          }}
                          in={tabValue === 'About us' && item.label === tabValue}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '14px',
                              marginLeft: '12px'
                            }}
                          >
                            {aboutUsList2.map((aboutMenu) => (
                              <Link to={baseURL + aboutMenu.url} key={aboutMenu.label}>
                                <Typography color='#fff'>
                                  {aboutMenu.label}
                                </Typography>
                              </Link>
                            ))}
                          </Box>
                        </Collapse>

                        <Collapse
                          sx={{
                            marginTop: tabValue === 'Newsroom' &&
                              item.label === tabValue ? '16px' : 0
                          }}
                          in={tabValue === 'Newsroom' && item.label === tabValue}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '14px',
                              marginLeft: '12px'
                            }}
                          >
                            {newsroomList2.map((menu) => (
                              <Link to={baseURL + menu.url} key={menu.label}>
                                <Typography color='#fff'>
                                  {menu.label}
                                </Typography>
                              </Link>
                            ))}
                          </Box>
                        </Collapse>
                      </Box>
                  }
                </Box>
              ))}
            </Stack>
          </Box>
        }

      </Box>

    </Collapse>
  )
}

export default MenuMobile;