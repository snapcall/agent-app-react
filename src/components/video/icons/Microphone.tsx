import * as React from 'react';
import PropTypes from 'prop-types';

const MicrophoneIcon = ({ slash }: { slash: boolean }) => {
  if (slash) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <g
          id="Groupe_2249"
          data-name="Groupe 2249"
          transform="translate(-141 -82)"
        >
          <rect
            id="Rectangle_1005"
            data-name="Rectangle 1005"
            width="20"
            height="20"
            transform="translate(141 82)"
            fill="none"
          />
          <path
            id="Micro"
            d="M3.66,19.99a.609.609,0,0,1-.611-.607v-.607a.609.609,0,0,1,.611-.611H5.794v-1.3A6.922,6.922,0,0,1,0,9.934V8.411A.611.611,0,0,1,.61,7.791h.609A.611.611,0,0,1,1.83,8.4v1.613A5.03,5.03,0,0,0,6.224,15.09a4.887,4.887,0,0,0,5.369-4.859V8.4a.611.611,0,0,1,.611-.611h.609a.611.611,0,0,1,.611.611v1.83a6.719,6.719,0,0,1-5.8,6.644v1.289H9.765a.611.611,0,0,1,.611.611v.613A.611.611,0,0,1,9.765,20Zm3.109-6.5a3.315,3.315,0,0,1-3.313-3.313V3.315A3.315,3.315,0,0,1,6.769,0h.118A3.315,3.315,0,0,1,10.2,3.315v6.867A3.315,3.315,0,0,1,6.887,13.5Z"
            transform="translate(144.288 82)"
            fill="#fff"
          />
          <path
            id="Tracé_247"
            data-name="Tracé 247"
            d="M0,0H26.958V1.326H0Z"
            transform="translate(141.938 82) rotate(45)"
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
        id="Groupe_2248"
        data-name="Groupe 2248"
        transform="translate(-115 -82)"
      >
        <rect
          id="Rectangle_1005"
          data-name="Rectangle 1005"
          width="20"
          height="20"
          transform="translate(115 82)"
          fill="none"
        />
        <path
          id="Micro"
          d="M3.66,19.99a.609.609,0,0,1-.611-.607v-.607a.609.609,0,0,1,.611-.611H5.794v-1.3A6.922,6.922,0,0,1,0,9.934V8.411A.611.611,0,0,1,.61,7.791h.609A.611.611,0,0,1,1.83,8.4v1.613A5.03,5.03,0,0,0,6.224,15.09a4.887,4.887,0,0,0,5.369-4.859V8.4a.611.611,0,0,1,.611-.611h.609a.611.611,0,0,1,.611.611v1.83a6.719,6.719,0,0,1-5.8,6.644v1.289H9.765a.611.611,0,0,1,.611.611v.613A.611.611,0,0,1,9.765,20Zm3.109-6.5a3.315,3.315,0,0,1-3.313-3.313V3.315A3.315,3.315,0,0,1,6.769,0h.118A3.315,3.315,0,0,1,10.2,3.315v6.867A3.315,3.315,0,0,1,6.887,13.5Z"
          transform="translate(118.288 82)"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

MicrophoneIcon.defaultProps = {
  slash: false,
};

MicrophoneIcon.propTypes = {
  slash: PropTypes.bool,
};

export default MicrophoneIcon;
