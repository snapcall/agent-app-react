import * as React from 'react';
import PropTypes from 'prop-types';

const CameraIcon = ({ slash }: { slash: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <g>
      <path fill="none" d="M0 0h20v20H0z" />
      <path
        d="M2.188 15.896A2.2 2.2 0 0 1 0 13.704v-7.4a2.2 2.2 0 0 1 2.188-2.2h9.124a2.184 2.184 0 0 1 2.188 2.2v7.4a2.2 2.2 0 0 1-2.187 2.2Zm15.839-1.381L14.6 12.537V7.442l3.413-1.976a1.119 1.119 0 0 1 .372-.154A1.319 1.319 0 0 1 20 6.585v6.785a1.344 1.344 0 0 1-.175.659 1.315 1.315 0 0 1-1.136.665 1.3 1.3 0 0 1-.66-.181Z"
        fill="#fff"
      />
      {slash && <path d="M.938 0 20 19.062l-.937.938L0 .938Z" fill="#d84949" />}
    </g>
  </svg>
);

CameraIcon.defaultProps = {
  slash: false,
};

CameraIcon.propTypes = {
  slash: PropTypes.bool,
};

export default CameraIcon;
