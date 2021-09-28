import * as React from 'react';
import PropTypes from 'prop-types';

const CameraIcon = ({ slash }: { slash: boolean }) => {
  if (slash) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <g
          id="Groupe_2251"
          data-name="Groupe 2251"
          transform="translate(-141 -107)"
        >
          <rect
            id="Rectangle_1005"
            data-name="Rectangle 1005"
            width="20"
            height="20"
            transform="translate(141 107)"
            fill="none"
          />
          <path
            id="Camera"
            d="M2.188,11.792A2.2,2.2,0,0,1,0,9.6V2.2A2.2,2.2,0,0,1,2.188,0h9.124A2.184,2.184,0,0,1,13.5,2.2V9.6a2.2,2.2,0,0,1-2.187,2.2Zm15.839-1.381L14.6,8.433V3.338l3.413-1.976a1.119,1.119,0,0,1,.372-.154A1.319,1.319,0,0,1,20,2.481V9.266a1.344,1.344,0,0,1-.175.659,1.315,1.315,0,0,1-1.136.665,1.3,1.3,0,0,1-.66-.181Z"
            transform="translate(141 111.104)"
            fill="#fff"
          />
          <path
            id="Tracé_247"
            data-name="Tracé 247"
            d="M0,0H26.958V1.326H0Z"
            transform="translate(141.938 107) rotate(45)"
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
        id="Groupe_2250"
        data-name="Groupe 2250"
        transform="translate(-115 -107)"
      >
        <rect
          id="Rectangle_1005"
          data-name="Rectangle 1005"
          width="20"
          height="20"
          transform="translate(115 107)"
          fill="none"
        />
        <path
          id="Camera"
          d="M2.188,11.792A2.2,2.2,0,0,1,0,9.6V2.2A2.2,2.2,0,0,1,2.188,0h9.124A2.184,2.184,0,0,1,13.5,2.2V9.6a2.2,2.2,0,0,1-2.187,2.2Zm15.839-1.381L14.6,8.433V3.338l3.413-1.976a1.119,1.119,0,0,1,.372-.154A1.319,1.319,0,0,1,20,2.481V9.266a1.344,1.344,0,0,1-.175.659,1.315,1.315,0,0,1-1.136.665,1.3,1.3,0,0,1-.66-.181Z"
          transform="translate(115 111.104)"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

CameraIcon.defaultProps = {
  slash: false,
};

CameraIcon.propTypes = {
  slash: PropTypes.bool,
};

export default CameraIcon;
