import * as React from 'react';
import PropTypes from 'prop-types';

const ScreenShareIcon = ({ slash }: { slash: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
  >
    <g>
      <path fill="none" d="M0 0h20v20H0z" />
      <path
        d="M4.043 19.023a.586.586 0 0 1 0-1.172H7.2v-1.719h6.173v1.718h3.165a.586.586 0 0 1 0 1.172ZM1.172 14.96A1.175 1.175 0 0 1 0 13.789V2.148A1.175 1.175 0 0 1 1.172.976h17.656A1.175 1.175 0 0 1 20 2.148v11.641a1.175 1.175 0 0 1-1.172 1.171Zm9.5-11v1.585a6.132 6.132 0 0 0-4.285 1.978 6.847 6.847 0 0 0-1.681 4.629.325.325 0 0 0 .294.311.362.362 0 0 0 .056 0 .351.351 0 0 0 .333-.216c.781-2.1 2.51-3.164 5.282-3.244v1.573a.307.307 0 0 0 .128.244.375.375 0 0 0 .221.072.366.366 0 0 0 .272-.116l3.158-3.467a.29.29 0 0 0-.01-.409l-3.157-3.149a.372.372 0 0 0-.261-.1.335.335 0 0 0-.35.312Z"
        fill="#fff"
      />
      {slash && <path d="M.938 0 20 19.062l-.937.938L0 .938Z" fill="#d84949" />}
    </g>
  </svg>
);

ScreenShareIcon.defaultProps = {
  slash: false,
};

ScreenShareIcon.propTypes = {
  slash: PropTypes.bool,
};

export default ScreenShareIcon;
