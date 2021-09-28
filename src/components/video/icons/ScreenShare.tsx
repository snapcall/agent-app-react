import * as React from 'react';
import PropTypes from 'prop-types';

const ScreenShareIcon = ({ slash }: { slash: boolean }) => {
  if (slash) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <g
          id="Groupe_2253"
          data-name="Groupe 2253"
          transform="translate(-141 -132)"
        >
          <rect
            id="Rectangle_1005"
            data-name="Rectangle 1005"
            width="20"
            height="20"
            transform="translate(141 132)"
            fill="none"
          />
          <path
            id="Screen"
            d="M4.043,18.047a.586.586,0,0,1,0-1.172H7.2V15.156h6.173v1.718h3.165a.586.586,0,0,1,0,1.172ZM1.172,13.984A1.175,1.175,0,0,1,0,12.813V1.172A1.175,1.175,0,0,1,1.172,0H18.828A1.175,1.175,0,0,1,20,1.172V12.813a1.175,1.175,0,0,1-1.172,1.171Zm9.5-11V4.569A6.132,6.132,0,0,0,6.387,6.547a6.847,6.847,0,0,0-1.681,4.629A.325.325,0,0,0,5,11.487a.362.362,0,0,0,.056,0,.351.351,0,0,0,.333-.216c.781-2.1,2.51-3.164,5.282-3.244V9.6a.307.307,0,0,0,.128.244.375.375,0,0,0,.221.072.366.366,0,0,0,.272-.116l3.158-3.467a.29.29,0,0,0-.01-.409L11.283,2.775a.372.372,0,0,0-.261-.1.335.335,0,0,0-.35.312Z"
            transform="translate(141 132.976)"
            fill="#fff"
          />
          <path
            id="Tracé_247"
            data-name="Tracé 247"
            d="M0,0H26.958V1.326H0Z"
            transform="translate(141.938 132) rotate(45)"
            fill="#d84949"
          />
        </g>
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <g
        id="Groupe_2252"
        data-name="Groupe 2252"
        transform="translate(-115 -132)"
      >
        <rect
          id="Rectangle_1005"
          data-name="Rectangle 1005"
          width="20"
          height="20"
          transform="translate(115 132)"
          fill="none"
        />
        <path
          id="Screen"
          d="M4.043,18.047a.586.586,0,0,1,0-1.172H7.2V15.156h6.173v1.718h3.165a.586.586,0,0,1,0,1.172ZM1.172,13.984A1.175,1.175,0,0,1,0,12.813V1.172A1.175,1.175,0,0,1,1.172,0H18.828A1.175,1.175,0,0,1,20,1.172V12.813a1.175,1.175,0,0,1-1.172,1.171Zm9.5-11V4.569A6.132,6.132,0,0,0,6.387,6.547a6.847,6.847,0,0,0-1.681,4.629A.325.325,0,0,0,5,11.487a.362.362,0,0,0,.056,0,.351.351,0,0,0,.333-.216c.781-2.1,2.51-3.164,5.282-3.244V9.6a.307.307,0,0,0,.128.244.375.375,0,0,0,.221.072.366.366,0,0,0,.272-.116l3.158-3.467a.29.29,0,0,0-.01-.409L11.283,2.775a.372.372,0,0,0-.261-.1.335.335,0,0,0-.35.312Z"
          transform="translate(115 132.976)"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

ScreenShareIcon.defaultProps = {
  slash: false,
};

ScreenShareIcon.propTypes = {
  slash: PropTypes.bool,
};

export default ScreenShareIcon;
