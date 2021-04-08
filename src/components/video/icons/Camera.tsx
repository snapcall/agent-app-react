import * as React from 'react';
import PropTypes from 'prop-types';

const CameraIcon = ({ slash }: { slash: boolean }) => {
  if (slash) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17.666"
        height="16.264"
        viewBox="0 0 17.666 16.264"
      >
        <g transform="translate(-4142 -1201.765)">
          <path
            d="M11.776,12.484a1.826,1.826,0,0,1-1.349.6h-7.6A1.824,1.824,0,0,1,1,11.262V5.116a1.826,1.826,0,0,1,1.6-1.81L0,.707.707,0,4,3.293,16.264,15.557l-.707.707Zm.473-2.356L5.415,3.293h5.012a1.826,1.826,0,0,1,1.823,1.823v5.012Z"
            transform="translate(4142 1201.765)"
            fill="#fff"
          />
          <g transform="translate(4155.162 1206.031)">
            <g transform="translate(0 0)">
              <path
                d="M344.658,123.877a.929.929,0,0,0-.31.128l-2.844,1.641v4.23l2.863,1.641a1.084,1.084,0,0,0,1.5-.4,1.115,1.115,0,0,0,.146-.547v-5.634A1.1,1.1,0,0,0,344.658,123.877Z"
                transform="translate(-341.504 -123.847)"
                fill="#fff"
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16.666"
      height="9.792"
      viewBox="0 0 16.666 9.792"
    >
      <g transform="translate(-4143 -1183)">
        <g transform="translate(4143 1183)">
          <g transform="translate(0 0)">
            <g transform="translate(0 0)">
              <path
                d="M9.427,96.512h-7.6A1.829,1.829,0,0,0,0,98.335v6.145A1.829,1.829,0,0,0,1.823,106.3h7.6a1.829,1.829,0,0,0,1.823-1.823V98.335A1.817,1.817,0,0,0,9.427,96.512Z"
                transform="translate(0 -96.512)"
                fill="#fff"
              />
            </g>
          </g>
          <g transform="translate(12.162 0.973)">
            <g transform="translate(0 0)">
              <path
                d="M344.658,123.877a.929.929,0,0,0-.31.128l-2.844,1.641v4.23l2.863,1.641a1.084,1.084,0,0,0,1.5-.4,1.115,1.115,0,0,0,.146-.547v-5.634A1.1,1.1,0,0,0,344.658,123.877Z"
                transform="translate(-341.504 -123.847)"
                fill="#fff"
              />
            </g>
          </g>
        </g>
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
