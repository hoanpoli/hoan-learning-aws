import React, { useState } from 'react';
import { Box, CardMedia, useMediaQuery } from '@mui/material';
import { secondary } from '@/theme/colors';

interface CardZoomEffectProps {
  img: string;
  children?: React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
  programmeName: string;
}

const CardZoomEffect = (props: CardZoomEffectProps) => {
  const { children, img, orientation = 'vertical', programmeName = '' } = props;
  const [isHover, setIsHover] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box
      borderRadius='16px'
      boxShadow='none'
      margin='0 auto'
      bgcolor={secondary[900]}
      maxWidth={orientation === 'vertical' ? '384px' : 'auto'}
      width={isMobile ? '275px' : orientation === 'vertical' ? '100%' : '85%'}
      display={orientation === 'vertical' ? 'block' : 'flex'}
      padding={orientation === 'horizontal' ? '16px' : '0px'}
      flexDirection='row'
      maxHeight={orientation === 'vertical' ? 'auto' : '266px'}
      sx={{
        '&:hover': {
          boxShadow: '0px 4px 16px 0px rgba(0, 0, 0, 0.06)'
        }
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Box
        overflow='hidden'
        height={
          isMobile ? '120px' : orientation === 'vertical' ? '180px' : '266px'
        }
        maxWidth='422px'
        width='100%'
      >
        <CardMedia
          component='img'
          image={img}
          alt={programmeName}
          sx={{
            width: isMobile ? '275px' : '100%',
            height: orientation === 'vertical' ? '180px' : '100%',
            maxHeight: '266px',
            objectFit: 'cover',
            transition: 'transform 0.5s ease-in-out',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: orientation === 'vertical' ? '16px' : 0,
            borderBottomLeftRadius: orientation === 'vertical' ? 0 : '16px',
            transform: isHover ? 'scale(1.2)' : 'scale(1)'
          }}
        />
      </Box>

      {/* Card Content */}
      <Box
        padding='20px'
        maxWidth={orientation === 'vertical' ? 'auto' : '100%'}
        width={orientation === 'vertical' ? 'auto' : '100%'}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CardZoomEffect;
