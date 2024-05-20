/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from '../components/TwoSidedLayout';

export default function HeroLeft01() {
  return (
    <TwoSidedLayout photo='sample.jpg'>
      <Typography color="primary" fontSize="lg" fontWeight="lg">
        내 손안의 헬스 트레이너
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        시공간의 제약을 <br></br>뛰어넘는 헬스 <br></br>트레이너
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg" sx={{marginTop: '10px'}}>
      tr<span style={{color: '#219BCC'}}>AI</span>ner는 사용자의 휴대전화 카메라를 이용하여<br></br> 운동자세를 분석하고 개선책을 알려드리며, 식단을 <br></br>추천드리고 수행한 운동 내역을 제공합니다.
      </Typography>
      {/* <Button size="lg" endDecorator={<ArrowForward fontSize="xl" />}>
        Get Started
      </Button> */}
      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        
      </Typography>
    </TwoSidedLayout>
  );
}