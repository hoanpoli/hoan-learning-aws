import React from 'react';
import { Stack, Typography } from '@mui/material';
import { neutral } from '@/theme/colors';

//Component for Description section in Programme detail page
interface DescriptionSectionProps {
  title: string;
  description?: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description,
  title
}) => {
  return (
    <Stack gap='4px'>
      <Typography fontWeight='600'>
        {title}
      </Typography>
      <Typography fontWeight='400' color={neutral[700]}>
        <div dangerouslySetInnerHTML={{ __html: description || '' }} />
      </Typography>
    </Stack>
  );
};

export default DescriptionSection;
