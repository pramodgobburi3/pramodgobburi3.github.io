import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/lotties/spinner.json';

export default function Spinner() {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Lottie options={defaultOptions} height={250} width={250} isClickToPauseDisabled={true} />
    </div>
  );
}