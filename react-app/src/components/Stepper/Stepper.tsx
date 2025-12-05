import React from 'react';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { CheckCircle } from '@phosphor-icons/react';

export interface StepperProps {
  activeStep: number;
}

const Stepper: React.FC<StepperProps> = (props: StepperProps) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const { activeStep } = props;
  const listStepper = [
    { label: 'Setup Donation', id: 0 },
    { label: 'Personal Details', id: 1 },
    { label: 'Summary', id: 2 }
  ];
  return (
    <Box mt='24px'>
      <Stack direction='row' gap='16px'>
        {listStepper.map((item, index) => (
          <Box
					  key={index}
					  sx={{
					    borderTop:
                activeStep >= item.id
                	? '4px solid #388380'
                	: '4px solid #054743',
					    width: isMobile ? '100px' : '210px'
					  }}
          >
            <div
						  style={{
						    display: 'flex',
						    justifyContent: 'space-between',
						    marginTop: '3px'
						  }}
            >
              <Typography
							  sx={{
							    color: activeStep === item.id ? '#F1FAF9' : '#8CB9B6',
							    fontSize: '14px',
							    fontWeight: 600,
							    lineHeight: '20px'
							  }}
              >
                {!isMobile && item.label}
              </Typography>
              {!isMobile && activeStep > item.id && (
                <CheckCircle size={24} color='#05645E' />
              )}
            </div>
          </Box>
        ))}
      </Stack>
      {isMobile && (
        <Typography
				  sx={{
				    color: '#54818F',
				    fontSize: '14px',
				    fontWeight: 600,
				    lineHeight: '20px'
				  }}
        >
          {`${activeStep + 1}/3 ${
            activeStep === 0
              ? 'Setup Donation'
              : activeStep === 1
                ? 'Personal Details'
                : 'Summary'
          }`}
        </Typography>
      )}
    </Box>
  );
};

export default Stepper;
