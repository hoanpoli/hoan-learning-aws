import React, { useEffect, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';

import BgLeft from '@/assets/background/background-left.png';
import BgRight from '@/assets/background/background-right.png';
import useGetProgrammes from '@/hooks/useGetProgrammes';
import usePagination from '@/hooks/usePagination';
import type { CustomError } from '@/interface/donation.interface';
import type {
  ProgrammesAPIData,
  ProgrammesData
} from '@/interface/programme.interface';

import type { ErrorResponse } from '@/pages/donation-result';
import { primary, secondary } from '@/theme/colors';
import FeaturedProgrammeCard from './views/FeaturedCard';
import OnGoingCard from './views/OnGoingCard';

const ProgrammeScreen: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const {
    currentPage,
    goToNextPage,
    goToPrevPage,
    keyword,
    onSearchChange,
    setTotalPages,
    totalPages
  } = usePagination({
    limitItem: 6,
    page: 1
  });

  const [ongoingProgramme, setOngoingProgramme] = useState<
    ProgrammesData[]
  >([]);
  const [errorOngoingProgramme, setErrorOngoingProgramme] =
    useState<ErrorResponse | null>(null);

  const [featuredProgramme, setFeaturedProgramme] = useState<
  ProgrammesData[]
  >([]);
  const [errorFeaturedProgramme, setErrorFeaturedProgramme] =
    useState<ErrorResponse | null>(null);

  const onSuccessOngoingProgramme = (data: ProgrammesAPIData) => {
    setOngoingProgramme(data?.programmes || []);
    setTotalPages(data?.metadata.totalPage);
    setErrorOngoingProgramme(null);
  };

  const onErrorOngoingProgramme = (error: CustomError) => {
    setOngoingProgramme([]);
    setErrorOngoingProgramme({
      message: error?.response?.data?.message,
      status: error?.response?.data?.error_code
    });
  };

  const onSuccessFeaturedProgramme = (data: ProgrammesAPIData) => {
    setFeaturedProgramme(data?.programmes || []);
    setErrorFeaturedProgramme(null);
  };

  const onErrorFeaturedProgramme = (error: CustomError) => {
    setFeaturedProgramme([]);
    setErrorFeaturedProgramme({
      message: error?.response?.data?.message,
      status: error?.response?.data?.error_code
    });
  };

  const {
    data: ongoingData,
    error: errorOngoing,
    isError: isErrorOngoing,
    isLoading: isLoadingOngoing
  } = useGetProgrammes({
    page: currentPage,
    featured: false,
    limit: 6,
    search: keyword || ''
  });

  const {
    data: featuredData,
    error: errorFeatured,
    isError: isErrorFeatured,
    isLoading: isLoadingFeatured
  } = useGetProgrammes({
    page: 1,
    featured: true,
    limit: 3
  });

  useEffect(() => {
    if (!isLoadingOngoing && !errorOngoing) {
      onSuccessOngoingProgramme(ongoingData as ProgrammesAPIData);
    }

    if (isErrorOngoing) {
      onErrorOngoingProgramme(errorOngoing as CustomError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingOngoing, isErrorOngoing, errorOngoing, ongoingData]);

  useEffect(() => {
    if (!isLoadingFeatured && !errorFeatured) {
      onSuccessFeaturedProgramme(featuredData as ProgrammesAPIData);
    }

    if (isErrorFeatured) {
      onErrorFeaturedProgramme(errorFeatured as CustomError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingFeatured, isErrorFeatured, errorFeatured, featuredData]);

  return (
    <>
      <Box
        padding={isMobile ? '10px 16px' : '48px 112px'}
        textAlign='center'
        sx={{
          background: secondary[800],
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          position: 'relative'
        }}
      >
        <img
          src={BgLeft}
          alt='background-left'
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 0,
            height: '291px',
            width: '366px',
            objectPosition: 'bottom',
            objectFit: 'contain'
          }}
        />
        <img
          src={BgRight}
          alt='background-right'
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 0,
            height: '291px',
            width: '366px',
            objectPosition: 'bottom',
            objectFit: 'contain'
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant='body1' color='white' fontWeight={500} pb='9px'>
            FEATURED DONATION PROGRAMMES
          </Typography>

          <Typography
            fontFamily='Bree Serif'
            mt='9px'
            fontSize={isMobile ? '26px' : '36px'}
            color={primary[100]}
          >
            Even a small donation can cause a big impact
          </Typography>
        </Box>

        <FeaturedProgrammeCard
          featuredProgramme={featuredProgramme}
          isLoading={isLoadingFeatured}
          error={errorFeaturedProgramme?.message}
        />
      </Box>

      <OnGoingCard
        programmes={ongoingProgramme}
        page={currentPage}
        totalPage={totalPages}
        gotoNext={() => goToNextPage()}
        gotoPrev={() => goToPrevPage()}
        onSearchChange={onSearchChange}
        isLoading={isLoadingOngoing}
        error={errorOngoingProgramme?.message}
      />
    </>
  );
};

export default ProgrammeScreen;
