import { HTMLAttributes } from 'react';

export function CustomFilterIcon(props: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_40012081_60050)">
        <path
          d="M11 1.5H1L5 6.23V9.5L7 10.5V6.23L11 1.5Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_40012081_60050">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
