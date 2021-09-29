import * as React from 'react';
import PropTypes from 'prop-types';

const MicrophoneIcon = ({ slash }: { slash: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <g>
      <path fill="none" d="M0 0h20v20H0z" />
      <path
        d="M6.948 19.99a.609.609 0 0 1-.611-.607v-.607a.609.609 0 0 1 .611-.611h2.134v-1.3a6.922 6.922 0 0 1-5.794-6.931V8.411a.611.611 0 0 1 .61-.62h.609a.611.611 0 0 1 .611.609v1.613a5.03 5.03 0 0 0 4.394 5.077 4.887 4.887 0 0 0 5.369-4.859V8.4a.611.611 0 0 1 .611-.611h.609a.611.611 0 0 1 .611.611v1.83a6.719 6.719 0 0 1-5.8 6.644v1.289h2.141a.611.611 0 0 1 .611.611v.613a.611.611 0 0 1-.611.613Zm3.109-6.5a3.315 3.315 0 0 1-3.313-3.313V3.315A3.315 3.315 0 0 1 10.057 0h.118a3.315 3.315 0 0 1 3.313 3.315v6.867a3.315 3.315 0 0 1-3.313 3.318Z"
        fill="#fff"
      />
      {slash && <path d="M.938 0 20 19.062l-.937.938L0 .938Z" fill="#d84949" />}
    </g>
  </svg>
);

MicrophoneIcon.defaultProps = {
  slash: false,
};

MicrophoneIcon.propTypes = {
  slash: PropTypes.bool,
};

export default MicrophoneIcon;
