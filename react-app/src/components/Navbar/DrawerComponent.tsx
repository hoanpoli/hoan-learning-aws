import React, { useState } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import { List as ListIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import ButtonCustom from '../Button/ButtonCustom';

type MenuDrawer = {
  label: string;
  index: number;
};

type Menu = {
  label: string;
  url: string;
  target?: string;
  fontWeight?: string | number;
};

type Submenus = {
  value: string;
  menus: Menu[];
};

interface DrawerProps {
  menu: MenuDrawer[];
  logo: string;
  submenus: Submenus[];
}

const DrawerComponent: React.FC<DrawerProps> = ({ logo, menu, submenus }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openSubmenu, setOpenSubmenu] = useState<string[]>([]);
  const closeDrawer = () => {
    setOpenDrawer(false);
  };
  const navigate = useNavigate();

  const handleOpenSubmenu = (value: string) => {
    if (openSubmenu.includes(value)) {
      const newSubmenu = openSubmenu.filter((item) => item !== value);
      setOpenSubmenu(newSubmenu);
    } else {
      setOpenSubmenu((prev) => [...prev, value]);
    }
  };

  return (
    <>
      <Stack direction='row' justifyContent='space-between' padding='20px 16px'>
        <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          <img src={logo} alt='BCF logo' />
        </Box>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <ListIcon color='#111927' size='32px' />
        </IconButton>
      </Stack>
      <Box display={openDrawer ? 'block' : 'none'}>
        <List>
          {menu.map((item) => (
					  <>
              <ListItem
							  key={item.index}
							  onClick={() => handleOpenSubmenu(item.label)}
							  sx={{
							    borderBottom: '1px solid #eee',
							    padding: '20px',
							    cursor: 'pointer'
							  }}
              >
                <ListItemText>
                  <Typography
									  textAlign='center'
									  textTransform='uppercase'
									  fontSize='16px'
									  fontWeight={600}
									  color='#424242'
                  >
                    {item.label}
                  </Typography>
                </ListItemText>
              </ListItem>
              {submenus.map((menu) => (
                <Box key={menu.value}>
                  {menu.value === item.label && (
                    <Collapse
										  in={openSubmenu.includes(item.label)}
										  unmountOnExit
                    >
                      <List disablePadding>
                        {menu.menus.map((c) => (
                          <ListItem
													  onClick={closeDrawer}
													  key={c.label}
													  sx={{ cursor: 'pointer' }}
                          >
                            <ListItemText>
                              <Link to={c.url} target={c.target}>
                                <Typography
																  textAlign='center'
																  fontWeight={c.fontWeight || 400}
																  color='#424242'
																  fontSize='16px'
                                >
                                  {c.label}
                                </Typography>
                              </Link>
                            </ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </Box>
              ))}
					  </>
          ))}
          <ListItem
					  onClick={closeDrawer}
					  sx={{
					    display: 'flex',
					    justifyContent: 'center',
					    marginTop: '20px'
					  }}
          >
            <ButtonCustom
						  variant='outlined'
						  fontSize='14px'
						  onClick={() => navigate('/donation')}
            >
              DONATE
            </ButtonCustom>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default DrawerComponent;
