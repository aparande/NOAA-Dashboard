import React from 'react';

const OnboardingStep = React.memo(({ photo, header, text }) => {
  return (
    <div className="d-flex">
      { photo && <img src={photo.src} width="100%" height="100%" alt={photo.alt_text} /> }
      <div>
        <h2>{header}</h2>
        <p>{text}</p>
      </div>
    </div>
  )
});

export default OnboardingStep;