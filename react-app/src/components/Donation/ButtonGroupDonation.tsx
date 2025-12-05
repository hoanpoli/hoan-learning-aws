import { CircularProgress, Stack, Typography, useMediaQuery } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import ButtonNeutral from '../Button/ButtonNeutral';
import ButtonPrimaryLight from '../Button/ButtonPrimaryLight';

interface ButtonProps {
  onClickContinue?: () => void;
  onClickBack?: () => void;
  isBack?: boolean;
  isLoading?: boolean;
}

const ButtonGroupDonation: React.FC<ButtonProps> = ({
  isBack = true,
  isLoading = false,
  onClickBack = () => {},
  onClickContinue = () => {}
}) => {
  const isMobile = useMediaQuery('(max-width:800px)');
  return (
    <Stack
      direction='row'
      gap={2}
      mt={['30px', '80px']}
      mb={['10px', '0px']}
      justifyContent='center'
    >
      {isBack && (
        <ButtonNeutral
          onClick={onClickBack}
          disabled={isLoading}
          width={isMobile ? '30%' : 'auto'}
        >
          <ArrowLeft size={20} />
          <Typography ml={2} fontWeight={600}>Back</Typography>
        </ButtonNeutral>
      )}

      <ButtonPrimaryLight
        type='submit'
        width={isMobile ? '100%' : 'auto'}
        disabled={isLoading}
        onClick={onClickContinue}
      >
        <Stack direction='row' gap='5px'>
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: '#fff' }} />
          ) : (
            <>
              <Typography mr={1} fontWeight={600}>Continue</Typography>
              <ArrowRight size={20} />
            </>
          )}
        </Stack>
      </ButtonPrimaryLight>
    </Stack>
  );
};

export default ButtonGroupDonation;
