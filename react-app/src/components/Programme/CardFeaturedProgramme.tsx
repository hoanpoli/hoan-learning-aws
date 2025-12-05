import React from 'react';
import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { CalendarBlank } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { primary, secondary } from '@/theme/colors';
import ButtonPrimaryLight from '../Button/ButtonPrimaryLight';
import ButtonSecondaryLight from '../Button/ButtonSecondaryLight';
import CardZoomEffect from '../Card/CardZoomEffect';
import styles from './styles.module.scss';

interface ProgrammeProps {
  id?: string;
  programmeName?: string;
  desc?: string;
  date?: string;
  currentDonate?: number;
  goalOfDonate?: number;
  valueDonate?: number;
  image?: string;
  totalProgramme: number;
  liveDonation?: boolean;
}

const CardFeaturedProgramme: React.FC<ProgrammeProps> = ({
  currentDonate,
  date,
  desc,
  goalOfDonate,
  id,
  image,
  liveDonation,
  programmeName,
  totalProgramme,
  valueDonate
}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:1000px)');

  const goToDonation = (id?: string) => {
    navigate(`/donation?programme=${id}`);
  };

  return (
    <CardZoomEffect
      img={image || ''}
      programmeName={programmeName || ''}
      orientation={
        isMobile ? 'vertical' : totalProgramme > 1 ? 'vertical' : 'horizontal'
      }
    >
      <Stack
        gap={isMobile ? 1 : '16px'}
        alignItems={
          isMobile ? 'start' : totalProgramme > 1 ? 'center' : 'start'
        }
        height={isMobile ? 'auto' : '250px'}
      >
        <Box
          order={totalProgramme > 1 ? 0 : 1}
          textAlign={totalProgramme > 1 ? 'center' : 'left'}
        >
          <Typography
            variant='subtitle2'
            color={primary[50]}
            className={styles.LimitTitleFeaturedProgramme}
          >
            {programmeName || ''}
          </Typography>

          <Typography
            variant='body2'
            color={secondary[200]}
            display={isMobile ? 'none' : 'block'}
            mt='8px'
            className={styles.LimitDescriptionFeaturedProgramme}
          >
            {desc || ''}
          </Typography>
        </Box>

        <Stack
          direction='row'
          alignItems='center'
          spacing={2}
          order={totalProgramme > 1 ? 1 : 0}
        >
          <CalendarBlank size='20px' color={secondary[200]} />
          <Typography variant='body2' color={secondary[200]}>
            {date || ''}
          </Typography>
        </Stack>

        <Box
          display='flex'
          alignItems='end'
          order={2}
          height='100%'
          width='100%'
        >
          <Stack
            direction={
              isMobile ? 'column' : totalProgramme > 1 ? 'column' : 'row'
            }
            justifyContent='space-between'
            width={isMobile ? '100%' : '100%'}
            alignItems='center'
            flexWrap='wrap'
          >
            {liveDonation && (
              <Box
                textAlign='center'
                maxWidth={isMobile ? '100%' : '257px'}
                width={
                  totalProgramme > 1 ? (isMobile ? '100%' : 'auto') : 'auto'
                }
                flex={1}
              >
                <Typography
                  variant='body1'
                  color={primary[100]}
                  fontWeight={600}
                >
                  S${currentDonate || 0}{' '}
                  <span
                    style={{
                      color: secondary[200],
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '18px'
                    }}
                  >
                    of{' '}
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        lineHeight: '18px',
                        color: ''
                      }}
                    >
                      {' '}
                      S${goalOfDonate || ''}{' '}
                    </span>
                    raised
                  </span>
                </Typography>
                <LinearProgress
                  variant='determinate'
                  value={(valueDonate ?? 0) > 100 ? 100 : valueDonate}
                  sx={{
                    width: isMobile ? 'auto' : '258px',
                    height: '8px',
                    borderRadius: '999px',
                    backgroundColor: secondary[700],
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: primary[100]
                    }
                  }}
                />{' '}
              </Box>
            )}

            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={3}
              width='100%'
              mt='16px'
              justifyContent='center'
            >
              <ButtonSecondaryLight
                size='md'
                onClick={() => navigate(`/programme/${id}`)}
              >
                Read More
              </ButtonSecondaryLight>
              <ButtonPrimaryLight 
                onClick={() => goToDonation(id)} 
                size='md' 
              >
                Donate Now
              </ButtonPrimaryLight>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </CardZoomEffect>
  );
};

export default CardFeaturedProgramme;
