import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export const ClockIcon = ({ size = 14, ...props }: IconProps) => (
  <svg width={size} height={size} {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ArrowRightIcon = ({ size = 18, ...props }: IconProps) => (
  <svg width={size} height={size} {...base} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
