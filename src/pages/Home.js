import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ActivityVideos from '../components/home/ActivityVideos';
import ClubIntro from '../components/home/ClubIntro';
import PresidentMessage from '../components/home/PresidentMessage';
import Schedule2025 from '../components/home/Schedule2025';
import OrganizationChart from '../components/home/OrganizationChart';
import HighlightGallery from '../components/home/HighlightGallery';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ClubIntro />
      <ActivityVideos />
      <PresidentMessage />
      <Schedule2025 />
      <OrganizationChart />
      <HighlightGallery />
    </div>
  );
};

export default Home;
