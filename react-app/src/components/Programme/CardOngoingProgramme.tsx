import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { CalendarBlank } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { primary, secondary } from '@/theme/colors';
import ButtonPrimaryLight from '../Button/ButtonPrimaryLight';
import ButtonSecondaryLight from '../Button/ButtonSecondaryLight';
import styles from './styles.module.scss';

interface ProgrammeProps {
  image: string;
  date: string;
  programmeName: string;
  desc: string;
  currentDonate: number;
  goalOfDonate: number;
  id: string;
  liveDonation?: boolean;
}

const CardOngoingProgramme: React.FC<ProgrammeProps> = ({
  currentDonate,
  date,
  desc,
  goalOfDonate,
  id,
  image,
  liveDonation,
  programmeName
}) => {
  const isMobile = useMediaQuery('(max-width:800px)');
  const navigate = useNavigate();
  const goToDonation = (id?: string) => {
    navigate(`/donation?programme=${id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: '16px',
        boxShadow: 'none',
        padding: '16px',
        backgroundColor: secondary[800],
        display: 'flex'
      }}
    >
      <CardMedia
        component='img'
        sx={{
          borderRadius: '8px',
          alignSelf: 'center',
          width: isMobile ? '112px' : '204px',
          height: isMobile ? '112px' : '204px',
          background:
            'linear-gradient(180deg, rgba(189, 81, 131, 0.05) 0%, rgba(150, 66, 115, 0.50) 100%), url(<path-to-image>), lightgray 50% / cover no-repeat'
        }}
        image={image}
      />

      <CardContent sx={{ padding: '0px 16px', width: '100%', height: '236px' }}>
        <Stack direction='row' spacing={2} alignItems='center'>
          <CalendarBlank size={isMobile ? '16px' : '20px'} color='#9DA4AE' />
          <Typography variant={isMobile ? 'caption' : 'body2'} color={secondary[200]}>
            {date || '-'}
          </Typography>
        </Stack>
        <Stack gap={isMobile ? '8px' : '12px'} mt={isMobile ? '12px' : '20px'}>
          <Typography
            variant={isMobile ? 'body1' : 'subtitle2'}
            color={secondary[50]}
            className={styles.LimitTitleOngoingProgramme}
          >
            {programmeName || '-'}
          </Typography>
          
          <Typography
            variant='body2'
            color={secondary[200]}
            className={styles.LimitDescription}
          >
            {desc || '-'}
          </Typography>
          
        </Stack>

        {liveDonation && (
          <Typography
            mt={isMobile ? 2 : 5}
            color={primary[100]}
            variant='body1'
          >
            S${currentDonate || 0}{' '}
            <span
              style={{
                color: secondary[200],
                fontSize: isMobile ? '10px' : '12px',
                fontWeight: 400,
                lineHeight: '18px'
              }}
            >
              of{' '}
              <span
                style={{
                  fontSize: isMobile ? '10px' : '12px',
                  fontWeight: 600,
                  lineHeight: '18px',
                  color: secondary[200]
                }}
              >
                {' '}
                S${goalOfDonate || 0}{' '}
              </span>
              raised
            </span>
          </Typography>
        )}
        
        <Stack 
          direction={isMobile ? 'column' : 'row'} 
          justifyContent='flex-end' 
          mt={liveDonation ? '8px' : '30px'} 
          gap='16px'
        >
          <ButtonSecondaryLight 
            onClick={() => navigate(`/programme/${id}`)} 
            size={isMobile ? 'sm' : 'md'}
          >
            Read More
          </ButtonSecondaryLight>
          <ButtonPrimaryLight 
            onClick={() => goToDonation(id)} 
            size={isMobile ? 'sm' : 'md'}
          >
            Donate Now
          </ButtonPrimaryLight>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CardOngoingProgramme;
