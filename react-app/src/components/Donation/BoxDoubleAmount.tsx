import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { Heart, Square } from '@phosphor-icons/react';
import Reactangle from '@/assets/donation-form/rectangle.svg';
import { info, neutral, primary, secondary } from '@/theme/colors';

interface BoxDoubleAmountProps {
  show?: boolean;
  isDoubleAmount?: boolean;
  onClickDoubleDonation?: () => void;
}

const BoxDoubleAmount: React.FC<BoxDoubleAmountProps> = ({
  isDoubleAmount,
  onClickDoubleDonation,
  show
}) => {
  const isMobile = useMediaQuery('(max-width:800px)');
  return (
    <Box width='100%'>
      {show ? (
        isDoubleAmount ? (
          <Box 
            display='flex' 
            flexDirection={isMobile ? 'column' : 'row'} 
            ml='15px' 
            mr='20px' 
            alignItems='center'
          >
            <Square
              fill={isMobile ? primary[200] : '#fff'}
              weight='fill'
              style={{ 
                zIndex: 2, 
                rotate: '45deg'
              }}
            />
            <Box
              ml={isMobile ? 0 : '-8px'}
              mt={isMobile ? '-8px' : 0}
              zIndex='1'
              padding='16px'
              borderRadius='24px'
              width='100%'
              sx={{
                backgroundColor: isMobile ? primary[200] : '#FFFFFF',
                backdropFilter: 'blur(20px)'
              }}
            >
              <Stack 
                direction='row' 
                spacing={2} 
                justifyContent='space-between' 
                alignItems='center' 
                width='100%'
              >
                <Box position='relative'>
                  <Stack direction='row' spacing={3} width='100%'>
                    <Heart
                      size={24}
                      color='#BD5183'
                      weight='duotone'
                      style={{
                        backgroundColor: isMobile ? neutral[100] : 'rgba(255, 255, 255, 0.50)',
                        padding: '8px',
                        borderRadius: '12px'
                      }}
                    />
                    <Box sx={{ alignSelf: 'center' }}>
                      <Typography
                        sx={{
                          color: isMobile ? '#fff' : primary[800],
                          fontSize: '14px',
                          fontWeight: 500,
                          lineHeight: '20px'
                        }}
                      >
                        You doubled your donation’s impact!
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
              <span style={{ position: 'absolute', right: '-14px', top: 10 }}>
                <img src={Reactangle} alt='double donation' />
              </span>
            </Box>
          </Box>
        ) : (
          <Box 
            gap={0} 
            display='flex' 
            flexDirection={isMobile ? 'column' : 'row'} 
            ml='15px' 
            mr='20px' 
            alignItems='center'
          >
            <Square
              fill={isMobile ? primary[500] : '#fff'}
              weight='fill'
              style={{ zIndex: 2, rotate: '45deg' }}
            />
            <Box
              marginLeft={isMobile ? 0 : '-8px'}
              zIndex='1'
              marginTop={isMobile ? '-8px' : 0}
              sx={{
                padding: '16px',
                borderRadius: '24px',
                backgroundColor: isMobile ? primary[500] : '#FFFFFF',
                backdropFilter: 'blur(20px)',
                width: '100%'
              }}
            >
              <Grid container rowGap={isMobile ? 3 : 0} columnGap={isMobile ? 0 : 2} alignItems='center'>
                <Grid item md={1} xs={2.3}>
                  <Heart
                    size={24}
                    color={primary[300]}
                    weight='duotone'
                    style={{
                      backgroundColor: isMobile ? neutral[100] : 'rgba(255, 255, 255, 0.50)',
                      padding: '8px',
                      borderRadius: '12px'
                    }}
                  />
                </Grid>
                <Grid item md={5} xs={9.5}>
                  <Typography
                    sx={{
                      color: isMobile ? '#fff' : primary[800],
                      fontSize: isMobile ? '12px' : '14px',
                      fontWeight: 500,
                      lineHeight: isMobile ? '18px' : '20px',
                      letterSpacing: isMobile ? '1.2px' : 'auto'
                    }}
                  >
                    You can double your impact!
                  </Typography>
                </Grid>
                <Grid item md={5} xs={12}>
                  <Box
                    onClick={onClickDoubleDonation}
                    sx={{
                      cursor: 'pointer',
                      padding: isMobile ? '5px 16px' : '10px 16px',
                      justifyContent: 'center',
                      borderRadius: '999px',
                      border: isMobile ? `1px solid ${info[50]}` : `1px solid ${primary[100]}`,
                      backgroundColor: isMobile ? info[50] : primary[100],
                      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)'
                    }}
                  >
                    <Typography
                      sx={{
                        color: isMobile ? info[700] : secondary[800],
                        fontSize: '14px',
                        fontWeight: 600,
                        lineHeight: '20px',
                        textAlign: 'center'
                      }}
                    >
                      Double my impact!
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )
      ) : null}
    </Box>
  );
};

export default BoxDoubleAmount;
