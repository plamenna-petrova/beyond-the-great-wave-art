
import SecondaryPageMastheadHeader from "../components/seconday-page-masthead-header/SecondayPageMastheadHeader";
import Introduction from "../components/introduction/Introduction";
import Invitation from "../components/invitation/Invitation";
import Features from "../components/features/Features";

import firstHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';
import secondHomePageCarouselImage from '../../../resources/images/press-release-rm-32.jpg';

import './AboutUs.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoadingSpinner } from '../../../store/features/loading/loadingSlice';

const sectionsImages = [
  {
    src: firstHomePageCarouselImage,
    alt: 'First Home Page Carousel Resource'
  },
  {
    src: secondHomePageCarouselImage,
    alt: 'Second Home Page Carousel Resource'
  }
];

export default function AboutUs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoadingSpinner(true));
    setTimeout(() => {
      dispatch(setLoadingSpinner(false));
    }, 500);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="about-us-wrapper">
      <SecondaryPageMastheadHeader title="About Us" />
      <Introduction introductionImage={sectionsImages[0]} />
      <Invitation />
      <Features featuresImages={sectionsImages} />
    </div>
  );
}