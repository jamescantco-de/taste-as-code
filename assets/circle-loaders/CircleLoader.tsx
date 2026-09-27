import React from 'react';

export type CircleLoaderVariant =
  | 'latitude'
  | 'scanline'
  | 'waveform'
  | 'aperture'
  | 'meridian'
  | 'halftone'
  | 'corona'
  | 'moire'
  | 'lissajous'
  | 'orbit'
  | 'iris'
  | 'cascade'
  | 'radar'
  | 'gyroscope'
  | 'tide'
  | 'gooey'
  | 'rotor'
  | 'tunnel'
  | 'cardioid'
  | 'constellation'
  | 'volute'
  | 'escapement'
  | 'venetian'
  | 'helix'

export interface CircleLoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: CircleLoaderVariant;
  size?: number | string;
  ink?: string;
  paper?: string;
  speedMultiplier?: number;
}

const SVGS: Record<CircleLoaderVariant, string> = {
  'latitude': `<svg xmlns="http://www.w3.org/2000/svg" class="lat" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration.
       --paper, --lit and --shade say what this one is drawn on. */
    svg { color: #f5f5f7; --paper: #0a0a0c; --lit: .26; --shade: .62; --rate: 1; }

    .lat { --dur: 2.4s; --n: 7; }
    .lat-ground { fill: var(--paper, #0a0a0c); }
    .lat-rim    { stroke: currentColor; stroke-width: 1; opacity: .08; }

    /* the sphere is lit from the top left and falls away bottom right; how
       hard depends on the paper it is drawn on */
    .lat-lit   { stop-opacity: var(--lit, .26); }
    .lat-shade { stop-opacity: var(--shade, .62); }

    .lat-shell {
      animation: lat-breathe calc(var(--dur) * var(--rate, 1)) ease-in-out infinite;
    }

    .lat-band {
      fill: currentColor;
      opacity: .14;
      animation: lat-wave calc(var(--dur) * var(--rate, 1)) ease-in-out infinite;
      /* one period spread across the stack = a wave climbing it */
      animation-delay: calc(var(--i) * var(--dur) * var(--rate, 1) / var(--n) * -1);
    }

    @keyframes lat-wave {
      0%, 100% { opacity: .14; }
      38%      { opacity: 1; }
      64%      { opacity: .34; }
    }

    @keyframes lat-breathe {
      0%, 100% { opacity: .82; }
      45%      { opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
      .lat-shell { animation: none; opacity: 1; }
      .lat-band  { animation: none; opacity: calc(.22 + var(--i) * .11); }
    }
  </style>

  <circle class="lat-ground" cx="32" cy="32" r="30"/>
  <g class="lat-shell">
    <path class="lat-band" d="M26.97,2.42L37.03,2.42A30,30 0 0,1 44.09,4.55L19.91,4.55A30,30 0 0,1 26.97,2.42Z" style="--i:0"/>
    <path class="lat-band" d="M18.14,5.4L45.86,5.4A30,30 0 0,1 55.11,12.87L8.89,12.87A30,30 0 0,1 18.14,5.4Z" style="--i:1"/>
    <path class="lat-band" d="M8.21,13.72L55.79,13.72A30,30 0 0,1 61.15,24.9L2.85,24.9A30,30 0 0,1 8.21,13.72Z" style="--i:2"/>
    <path class="lat-band" d="M2.66,25.75L61.34,25.75A30,30 0 0,1 61.34,38.25L2.66,38.25A30,30 0 0,1 2.66,25.75Z" style="--i:3"/>
    <path class="lat-band" d="M2.85,39.1L61.15,39.1A30,30 0 0,1 55.79,50.28L8.21,50.28A30,30 0 0,1 2.85,39.1Z" style="--i:4"/>
    <path class="lat-band" d="M8.89,51.13L55.11,51.13A30,30 0 0,1 45.86,58.6L18.14,58.6A30,30 0 0,1 8.89,51.13Z" style="--i:5"/>
    <path class="lat-band" d="M19.91,59.45L44.09,59.45A30,30 0 0,1 37.03,61.58L26.97,61.58A30,30 0 0,1 19.91,59.45Z" style="--i:6"/>
  </g>
  <defs>
    <radialGradient id="lat-hi" cx="30%" cy="18%" r="70%">
      <stop class="lat-lit" offset="0%" stop-color="#fff"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="lat-lo" cx="74%" cy="92%" r="78%">
      <stop class="lat-shade" offset="0%" stop-color="#000"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle class="lat-lo" cx="32" cy="32" r="30" fill="url(#lat-lo)"/>
  <circle class="lat-hi" cx="32" cy="32" r="30" fill="url(#lat-hi)"/>
  <circle class="lat-rim" cx="32" cy="32" r="30"/>
</svg>`,
  'scanline': `<svg xmlns="http://www.w3.org/2000/svg" class="scan" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .scan-rule { stroke: currentColor; stroke-width: .7; opacity: .34; }

    /* every packet snaps to the rule grid, so it reads as one line of the
       buffer being rewritten in place */
    .scan-packet {
      fill: currentColor;
      opacity: 0;
      animation: scan-run calc(var(--dur) * var(--rate, 1)) cubic-bezier(.5, 0, .5, 1) infinite;
      animation-delay: calc(var(--delay) * var(--rate, 1));
    }

    .scan-glow { animation: scan-sweep calc(4.2s * var(--rate, 1)) linear infinite; }

    @keyframes scan-run {
      0%   { transform: translateX(calc(var(--dir) * -35px)); opacity: 0; }
      12%  { opacity: 1; }
      82%  { opacity: 1; }
      100% { transform: translateX(calc(var(--dir) * 67px)); opacity: 0; }
    }

    @keyframes scan-sweep { from { transform: translateY(-22px); } to { transform: translateY(22px); } }

    @media (prefers-reduced-motion: reduce) {
      .scan-packet { animation: none; opacity: .92; transform: translateX(calc(var(--dir) * 14px)); }
      .scan-glow   { display: none; }
    }
  </style>

  <defs>
    <clipPath id="scan-disc"><circle cx="32" cy="32" r="32"/></clipPath>
    <linearGradient id="scan-sweep" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="currentColor" stop-opacity="0"/>
      <stop offset="50%" stop-color="currentColor" stop-opacity=".22"/>
      <stop offset="100%" stop-color="currentColor" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#scan-disc)">
    <line class="scan-rule" x1="0" y1="0.00" x2="64" y2="0.00"/>
    <line class="scan-rule" x1="0" y1="4.00" x2="64" y2="4.00"/>
    <line class="scan-rule" x1="0" y1="8.00" x2="64" y2="8.00"/>
    <line class="scan-rule" x1="0" y1="12.00" x2="64" y2="12.00"/>
    <line class="scan-rule" x1="0" y1="16.00" x2="64" y2="16.00"/>
    <line class="scan-rule" x1="0" y1="20.00" x2="64" y2="20.00"/>
    <line class="scan-rule" x1="0" y1="24.00" x2="64" y2="24.00"/>
    <line class="scan-rule" x1="0" y1="28.00" x2="64" y2="28.00"/>
    <line class="scan-rule" x1="0" y1="32.00" x2="64" y2="32.00"/>
    <line class="scan-rule" x1="0" y1="36.00" x2="64" y2="36.00"/>
    <line class="scan-rule" x1="0" y1="40.00" x2="64" y2="40.00"/>
    <line class="scan-rule" x1="0" y1="44.00" x2="64" y2="44.00"/>
    <line class="scan-rule" x1="0" y1="48.00" x2="64" y2="48.00"/>
    <line class="scan-rule" x1="0" y1="52.00" x2="64" y2="52.00"/>
    <line class="scan-rule" x1="0" y1="56.00" x2="64" y2="56.00"/>
    <line class="scan-rule" x1="0" y1="60.00" x2="64" y2="60.00"/>
    <line class="scan-rule" x1="0" y1="64.00" x2="64" y2="64.00"/>
    <rect class="scan-packet" x="0" y="8.00" width="14.08" height="3.28" rx="0.6" style="--dur:1.9s;--delay:-0.2s;--dir:1"/>
    <rect class="scan-packet" x="0" y="16.00" width="9.60" height="3.28" rx="0.6" style="--dur:2.6s;--delay:-1.4s;--dir:1"/>
    <rect class="scan-packet" x="0" y="24.00" width="19.20" height="3.28" rx="0.6" style="--dur:2.2s;--delay:-0.7s;--dir:-1"/>
    <rect class="scan-packet" x="0" y="32.00" width="7.68" height="3.28" rx="0.6" style="--dur:1.6s;--delay:-1.1s;--dir:1"/>
    <rect class="scan-packet" x="0" y="40.00" width="16.64" height="3.28" rx="0.6" style="--dur:2.9s;--delay:-2.0s;--dir:1"/>
    <rect class="scan-packet" x="0" y="44.00" width="10.88" height="3.28" rx="0.6" style="--dur:2.1s;--delay:-0.4s;--dir:-1"/>
    <rect class="scan-packet" x="0" y="52.00" width="12.80" height="3.28" rx="0.6" style="--dur:2.4s;--delay:-1.7s;--dir:1"/>
    <rect class="scan-glow" x="0" y="-32" width="64" height="128" fill="url(#scan-sweep)"/>
  </g>
</svg>`,
  'waveform': `<svg xmlns="http://www.w3.org/2000/svg" class="wav" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .wav { --dur: 1.8s; }

    /* the bars shimmer on the beads' phase, so the wave carries through the
       whole disc rather than only in the dots */
    .wav-bar {
      stroke: currentColor;
      stroke-width: .8;
      opacity: .24;
      animation: wav-shimmer calc(var(--dur) * var(--rate, 1)) ease-in-out infinite;
      animation-delay: calc(var(--i) * var(--dur) * var(--rate, 1) / -9);
    }

    .wav-bead {
      fill: currentColor;
      animation: wav-bob calc(var(--dur) * var(--rate, 1)) ease-in-out infinite;
      animation-delay: calc(var(--i) * var(--dur) * var(--rate, 1) / -7);
    }

    @keyframes wav-bob     { 0%, 100% { transform: translateY(-16px); } 50% { transform: translateY(16px); } }
    @keyframes wav-shimmer { 0%, 100% { opacity: .2; } 50% { opacity: .62; } }

    @media (prefers-reduced-motion: reduce) {
      .wav-bar  { animation: none; opacity: .3; }
      .wav-bead { animation: none; transform: translateY(calc((var(--i) - 2) * 7px)); }
    }
  </style>

  <defs><clipPath id="wav-disc"><circle cx="32" cy="32" r="32"/></clipPath></defs>
  <g clip-path="url(#wav-disc)">
    <line class="wav-bar" x1="4.00" y1="0" x2="4.00" y2="64" style="--i:0"/>
    <line class="wav-bar" x1="8.00" y1="0" x2="8.00" y2="64" style="--i:1"/>
    <line class="wav-bar" x1="12.00" y1="0" x2="12.00" y2="64" style="--i:2"/>
    <line class="wav-bar" x1="16.00" y1="0" x2="16.00" y2="64" style="--i:3"/>
    <line class="wav-bar" x1="20.00" y1="0" x2="20.00" y2="64" style="--i:4"/>
    <line class="wav-bar" x1="24.00" y1="0" x2="24.00" y2="64" style="--i:5"/>
    <line class="wav-bar" x1="28.00" y1="0" x2="28.00" y2="64" style="--i:6"/>
    <line class="wav-bar" x1="32.00" y1="0" x2="32.00" y2="64" style="--i:7"/>
    <line class="wav-bar" x1="36.00" y1="0" x2="36.00" y2="64" style="--i:8"/>
    <line class="wav-bar" x1="40.00" y1="0" x2="40.00" y2="64" style="--i:9"/>
    <line class="wav-bar" x1="44.00" y1="0" x2="44.00" y2="64" style="--i:10"/>
    <line class="wav-bar" x1="48.00" y1="0" x2="48.00" y2="64" style="--i:11"/>
    <line class="wav-bar" x1="52.00" y1="0" x2="52.00" y2="64" style="--i:12"/>
    <line class="wav-bar" x1="56.00" y1="0" x2="56.00" y2="64" style="--i:13"/>
    <line class="wav-bar" x1="60.00" y1="0" x2="60.00" y2="64" style="--i:14"/>
    <circle class="wav-bead" cx="14.08" cy="32" r="2.5" style="--i:0"/>
    <circle class="wav-bead" cx="23.04" cy="32" r="2.5" style="--i:1"/>
    <circle class="wav-bead" cx="32.00" cy="32" r="2.5" style="--i:2"/>
    <circle class="wav-bead" cx="40.96" cy="32" r="2.5" style="--i:3"/>
    <circle class="wav-bead" cx="49.92" cy="32" r="2.5" style="--i:4"/>
  </g>
</svg>`,
  'aperture': `<svg xmlns="http://www.w3.org/2000/svg" class="ap" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .ap-halo { stroke: currentColor; stroke-width: 1; opacity: .1; }

    .ap-r1, .ap-r2, .ap-r3 {
      stroke: currentColor;
      stroke-linecap: round;
      fill: none;
      transform-box: view-box;
      transform-origin: center;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }

    .ap-r1 { stroke-width: 2;   stroke-dasharray: 34 14 9 43; opacity: .95; animation-name: ap-cw;  animation-duration: calc(2.8s * var(--rate, 1)); }
    .ap-r2 { stroke-width: 2.4; stroke-dasharray: 24 10 24 42; opacity: .72; animation-name: ap-ccw; animation-duration: calc(3.9s * var(--rate, 1)); }
    .ap-r3 { stroke-width: 2.8; stroke-dasharray: 16 12 16 56; opacity: .52; animation-name: ap-cw;  animation-duration: calc(2.1s * var(--rate, 1)); }

    .ap-core {
      fill: currentColor;
      transform-box: view-box;
      transform-origin: center;
      animation: ap-core calc(2.1s * var(--rate, 1)) ease-in-out infinite;
    }

    @keyframes ap-cw  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes ap-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
    @keyframes ap-core {
      0%, 100% { transform: scale(.55); opacity: .45; }
      50%      { transform: scale(1);   opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
      .ap-r1, .ap-r2, .ap-r3, .ap-core { animation: none; }
      .ap-r2   { transform: rotate(42deg); }
      .ap-r3   { transform: rotate(-28deg); }
      .ap-core { transform: scale(1); opacity: 1; }
    }
  </style>

  <circle class="ap-halo" cx="32" cy="32" r="30.5"/>
  <circle class="ap-r1" cx="32" cy="32" r="27" pathLength="100"/>
  <circle class="ap-r2" cx="32" cy="32" r="20" pathLength="100"/>
  <circle class="ap-r3" cx="32" cy="32" r="13" pathLength="100"/>
  <circle class="ap-core" cx="32" cy="32" r="2.6"/>
</svg>`,
  'meridian': `<svg xmlns="http://www.w3.org/2000/svg" class="mer" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .mer { --dur: 3.6s; --n: 6; }
    .mer-limb  { stroke: currentColor; stroke-width: 1.1; opacity: .55; }
    .mer-lat   { stroke: currentColor; stroke-width: 1; stroke-linecap: round; opacity: .22; }

    .mer-line {
      stroke: currentColor;
      stroke-width: 1;
      opacity: .5;
      animation: mer-turn calc(var(--dur) * var(--rate, 1)) infinite;
      animation-delay: calc(var(--i) * var(--dur) * var(--rate, 1) / var(--n) * -1);
    }

    .mer-glint {
      stroke: currentColor;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-dasharray: 14 86;
      transform-box: view-box;
      transform-origin: center;
      opacity: .9;
      animation: mer-glint calc(var(--dur) * var(--rate, 1) * 1.5) linear infinite;
    }

    /* rx follows |cos| - slow at the extremes, quickest through zero */
    @keyframes mer-turn {
      0%   { rx: 29px; animation-timing-function: ease-in; }
      50%  { rx: 0px;    animation-timing-function: ease-out; }
      100% { rx: 29px; }
    }

    @keyframes mer-glint {
      0%   { transform: rotate(-30deg); opacity: 0; }
      20%  { opacity: .85; }
      70%  { opacity: .85; }
      100% { transform: rotate(210deg); opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .mer-line  { animation: none; rx: var(--rx); }
      .mer-glint { animation: none; opacity: 0; }
    }
  </style>

  <circle class="mer-limb" cx="32" cy="32" r="29"/>
  <line class="mer-lat" x1="17.5" y1="6.89" x2="46.5" y2="6.89"/>
  <line class="mer-lat" x1="6.89" y1="17.5" x2="57.11" y2="17.5"/>
  <line class="mer-lat" x1="3" y1="32" x2="61" y2="32"/>
  <line class="mer-lat" x1="6.89" y1="46.5" x2="57.11" y2="46.5"/>
  <line class="mer-lat" x1="17.5" y1="57.11" x2="46.5" y2="57.11"/>
  <ellipse class="mer-line" cx="32" cy="32" rx="29" ry="29" style="--i:0;--rx:29px"/>
  <ellipse class="mer-line" cx="32" cy="32" rx="29" ry="29" style="--i:1;--rx:25.11px"/>
  <ellipse class="mer-line" cx="32" cy="32" rx="29" ry="29" style="--i:2;--rx:14.5px"/>
  <ellipse class="mer-line" cx="32" cy="32" rx="29" ry="29" style="--i:3;--rx:0px"/>
  <ellipse class="mer-line" cx="32" cy="32" rx="29" ry="29" style="--i:4;--rx:14.5px"/>
  <ellipse class="mer-line" cx="32" cy="32" rx="29" ry="29" style="--i:5;--rx:25.11px"/>
  <circle class="mer-glint" cx="32" cy="32" r="29" pathLength="100"/>
</svg>`,
  'halftone': `<svg xmlns="http://www.w3.org/2000/svg" class="ht" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .ht { --dur: 2.8s; }

    .ht-base { opacity: .26; }
    .ht-rim  { stroke: currentColor; stroke-width: 1; opacity: .14; }

    /* the ring is a mask, so it lights the dots it crosses instead of being
       drawn on top of them */
    .ht-wave {
      animation: ht-ripple calc(var(--dur) * var(--rate, 1)) linear infinite;
    }

    .ht-late { animation-delay: calc(-1.4s * var(--rate, 1)); }

    @keyframes ht-ripple {
      0%   { r: 0px;  opacity: 0; }
      14%  { opacity: 1; }
      72%  { opacity: 1; }
      100% { r: 38px; opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .ht-wave { animation: none; r: 17px; opacity: 1; }
      .ht-late { display: none; }
    }
  </style>

  <defs>
    <clipPath id="ht-disc"><circle cx="32" cy="32" r="32"/></clipPath>
    <pattern id="ht-grid" width="6.4" height="6.4" patternUnits="userSpaceOnUse">
      <circle cx="3.2" cy="3.2" r="1.15" fill="currentColor"/>
    </pattern>
    <mask id="ht-ring-a"><circle class="ht-wave" cx="32" cy="32" r="0" fill="none" stroke="#fff" stroke-width="7"/></mask>
    <mask id="ht-ring-b"><circle class="ht-wave ht-late" cx="32" cy="32" r="0" fill="none" stroke="#fff" stroke-width="7"/></mask>
  </defs>
  <g clip-path="url(#ht-disc)">
    <rect class="ht-base" x="0" y="0" width="64" height="64" fill="url(#ht-grid)"/>
    <rect x="0" y="0" width="64" height="64" fill="url(#ht-grid)" mask="url(#ht-ring-a)"/>
    <rect x="0" y="0" width="64" height="64" fill="url(#ht-grid)" mask="url(#ht-ring-b)"/>
  </g>
  <circle class="ht-rim" cx="32" cy="32" r="31.5"/>
</svg>`,
  'corona': `<svg xmlns="http://www.w3.org/2000/svg" class="cor" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .cor { --dur: 2.2s; --n: 24; }

    .cor-spoke {
      transform-box: view-box;
      transform-origin: center;
      transform: rotate(var(--a));
    }

    /* one period spread around the ring = a single swell travelling the rim */
    .cor-tip {
      fill: currentColor;
      transform-box: fill-box;
      transform-origin: 50% 100%;
      transform: scaleY(.26);
      opacity: .24;
      animation: cor-swell calc(var(--dur) * var(--rate, 1)) ease-in-out infinite;
      animation-delay: calc(var(--i) * var(--dur) * var(--rate, 1) / var(--n) * -1);
    }

    .cor-hub { stroke: currentColor; stroke-width: 1; opacity: .22; }

    @keyframes cor-swell {
      0%, 100% { transform: scaleY(.26); opacity: .24; }
      50%      { transform: scaleY(1);   opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
      .cor-tip { animation: none; transform: scaleY(var(--rest)); opacity: calc(.22 + var(--rest) * .7); }
    }
  </style>

  <g class="cor-spoke" style="--a:0.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:0;--rest:1.0000"/></g>
    <g class="cor-spoke" style="--a:15.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:1;--rest:0.9881"/></g>
    <g class="cor-spoke" style="--a:30.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:2;--rest:0.9531"/></g>
    <g class="cor-spoke" style="--a:45.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:3;--rest:0.8975"/></g>
    <g class="cor-spoke" style="--a:60.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:4;--rest:0.8250"/></g>
    <g class="cor-spoke" style="--a:75.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:5;--rest:0.7406"/></g>
    <g class="cor-spoke" style="--a:90.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:6;--rest:0.6500"/></g>
    <g class="cor-spoke" style="--a:105.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:7;--rest:0.5594"/></g>
    <g class="cor-spoke" style="--a:120.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:8;--rest:0.4750"/></g>
    <g class="cor-spoke" style="--a:135.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:9;--rest:0.4025"/></g>
    <g class="cor-spoke" style="--a:150.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:10;--rest:0.3469"/></g>
    <g class="cor-spoke" style="--a:165.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:11;--rest:0.3119"/></g>
    <g class="cor-spoke" style="--a:180.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:12;--rest:0.3000"/></g>
    <g class="cor-spoke" style="--a:195.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:13;--rest:0.3119"/></g>
    <g class="cor-spoke" style="--a:210.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:14;--rest:0.3469"/></g>
    <g class="cor-spoke" style="--a:225.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:15;--rest:0.4025"/></g>
    <g class="cor-spoke" style="--a:240.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:16;--rest:0.4750"/></g>
    <g class="cor-spoke" style="--a:255.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:17;--rest:0.5594"/></g>
    <g class="cor-spoke" style="--a:270.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:18;--rest:0.6500"/></g>
    <g class="cor-spoke" style="--a:285.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:19;--rest:0.7406"/></g>
    <g class="cor-spoke" style="--a:300.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:20;--rest:0.8250"/></g>
    <g class="cor-spoke" style="--a:315.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:21;--rest:0.8975"/></g>
    <g class="cor-spoke" style="--a:330.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:22;--rest:0.9531"/></g>
    <g class="cor-spoke" style="--a:345.0deg"><rect class="cor-tip" x="31" y="2" width="2" height="19.1" rx="1" style="--i:23;--rest:0.9881"/></g>
  <circle class="cor-hub" cx="32" cy="32" r="5.8"/>
</svg>`,
  'moire': `<svg xmlns="http://www.w3.org/2000/svg" class="moi" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration.
       --blend says what this one is drawn on. */
    svg { color: #f5f5f7; --blend: screen; --rate: 1; }

    .moi { --dur: 11s; }

    .moi-grate line { stroke: currentColor; stroke-width: .55; }
    .moi-grate { opacity: .78; }

    /* nothing animates but the rotation - every band you see is interference
       between the two rulings */
    .moi-turning {
      mix-blend-mode: var(--blend, screen);
      transform-box: view-box;
      transform-origin: center;
      animation: moi-turn calc(var(--dur) * var(--rate, 1)) linear infinite;
    }

    .moi-rim { stroke: currentColor; stroke-width: 1; opacity: .14; }

    @keyframes moi-turn { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    @media (prefers-reduced-motion: reduce) {
      .moi-turning { animation: none; transform: rotate(7deg); }
    }
  </style>

  <defs><clipPath id="moi-disc"><circle cx="32" cy="32" r="32"/></clipPath></defs>
  <g clip-path="url(#moi-disc)">
    <g class="moi-grate">
      <line class="moi-line" x1="-24" y1="-24.00" x2="88" y2="-24.00"/>
      <line class="moi-line" x1="-24" y1="-19.60" x2="88" y2="-19.60"/>
      <line class="moi-line" x1="-24" y1="-15.20" x2="88" y2="-15.20"/>
      <line class="moi-line" x1="-24" y1="-10.80" x2="88" y2="-10.80"/>
      <line class="moi-line" x1="-24" y1="-6.40" x2="88" y2="-6.40"/>
      <line class="moi-line" x1="-24" y1="-2.00" x2="88" y2="-2.00"/>
      <line class="moi-line" x1="-24" y1="2.40" x2="88" y2="2.40"/>
      <line class="moi-line" x1="-24" y1="6.80" x2="88" y2="6.80"/>
      <line class="moi-line" x1="-24" y1="11.20" x2="88" y2="11.20"/>
      <line class="moi-line" x1="-24" y1="15.60" x2="88" y2="15.60"/>
      <line class="moi-line" x1="-24" y1="20.00" x2="88" y2="20.00"/>
      <line class="moi-line" x1="-24" y1="24.40" x2="88" y2="24.40"/>
      <line class="moi-line" x1="-24" y1="28.80" x2="88" y2="28.80"/>
      <line class="moi-line" x1="-24" y1="33.20" x2="88" y2="33.20"/>
      <line class="moi-line" x1="-24" y1="37.60" x2="88" y2="37.60"/>
      <line class="moi-line" x1="-24" y1="42.00" x2="88" y2="42.00"/>
      <line class="moi-line" x1="-24" y1="46.40" x2="88" y2="46.40"/>
      <line class="moi-line" x1="-24" y1="50.80" x2="88" y2="50.80"/>
      <line class="moi-line" x1="-24" y1="55.20" x2="88" y2="55.20"/>
      <line class="moi-line" x1="-24" y1="59.60" x2="88" y2="59.60"/>
      <line class="moi-line" x1="-24" y1="64.00" x2="88" y2="64.00"/>
      <line class="moi-line" x1="-24" y1="68.40" x2="88" y2="68.40"/>
      <line class="moi-line" x1="-24" y1="72.80" x2="88" y2="72.80"/>
      <line class="moi-line" x1="-24" y1="77.20" x2="88" y2="77.20"/>
      <line class="moi-line" x1="-24" y1="81.60" x2="88" y2="81.60"/>
      <line class="moi-line" x1="-24" y1="86.00" x2="88" y2="86.00"/>
    </g>
    <g class="moi-grate moi-turning">
      <line class="moi-line" x1="-24" y1="-24.00" x2="88" y2="-24.00"/>
      <line class="moi-line" x1="-24" y1="-19.60" x2="88" y2="-19.60"/>
      <line class="moi-line" x1="-24" y1="-15.20" x2="88" y2="-15.20"/>
      <line class="moi-line" x1="-24" y1="-10.80" x2="88" y2="-10.80"/>
      <line class="moi-line" x1="-24" y1="-6.40" x2="88" y2="-6.40"/>
      <line class="moi-line" x1="-24" y1="-2.00" x2="88" y2="-2.00"/>
      <line class="moi-line" x1="-24" y1="2.40" x2="88" y2="2.40"/>
      <line class="moi-line" x1="-24" y1="6.80" x2="88" y2="6.80"/>
      <line class="moi-line" x1="-24" y1="11.20" x2="88" y2="11.20"/>
      <line class="moi-line" x1="-24" y1="15.60" x2="88" y2="15.60"/>
      <line class="moi-line" x1="-24" y1="20.00" x2="88" y2="20.00"/>
      <line class="moi-line" x1="-24" y1="24.40" x2="88" y2="24.40"/>
      <line class="moi-line" x1="-24" y1="28.80" x2="88" y2="28.80"/>
      <line class="moi-line" x1="-24" y1="33.20" x2="88" y2="33.20"/>
      <line class="moi-line" x1="-24" y1="37.60" x2="88" y2="37.60"/>
      <line class="moi-line" x1="-24" y1="42.00" x2="88" y2="42.00"/>
      <line class="moi-line" x1="-24" y1="46.40" x2="88" y2="46.40"/>
      <line class="moi-line" x1="-24" y1="50.80" x2="88" y2="50.80"/>
      <line class="moi-line" x1="-24" y1="55.20" x2="88" y2="55.20"/>
      <line class="moi-line" x1="-24" y1="59.60" x2="88" y2="59.60"/>
      <line class="moi-line" x1="-24" y1="64.00" x2="88" y2="64.00"/>
      <line class="moi-line" x1="-24" y1="68.40" x2="88" y2="68.40"/>
      <line class="moi-line" x1="-24" y1="72.80" x2="88" y2="72.80"/>
      <line class="moi-line" x1="-24" y1="77.20" x2="88" y2="77.20"/>
      <line class="moi-line" x1="-24" y1="81.60" x2="88" y2="81.60"/>
      <line class="moi-line" x1="-24" y1="86.00" x2="88" y2="86.00"/>
    </g>
  </g>
  <circle class="moi-rim" cx="32" cy="32" r="31.5"/>
</svg>`,
  'lissajous': `<svg xmlns="http://www.w3.org/2000/svg" class="lis" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .lis { --dur: 3.2s; }

    .lis-rig {
      transform-box: view-box;
      transform-origin: center;
      animation: lis-drift calc(var(--dur) * var(--rate, 1) * 5) linear infinite;
    }

    .lis-track, .lis-tail, .lis-mid, .lis-head {
      stroke: currentColor;
      stroke-linecap: round;
      fill: none;
    }

    .lis-track { stroke-width: 1; opacity: .16; }

    .lis-tail, .lis-mid, .lis-head {
      animation-duration: calc(var(--dur) * var(--rate, 1));
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }

    /* the three dashes sit end to end: head at p, mid at p-9, tail at p-29 */
    .lis-head { stroke-width: 2.2; stroke-dasharray: 3 97;  stroke-dashoffset: 0;  animation-name: lis-head; }
    .lis-mid  { stroke-width: 1.8; stroke-dasharray: 9 91;  stroke-dashoffset: 9;  opacity: .5;  animation-name: lis-mid; }
    .lis-tail { stroke-width: 1.3; stroke-dasharray: 20 80; stroke-dashoffset: 29; opacity: .22; animation-name: lis-tail; }

    @keyframes lis-head { from { stroke-dashoffset: 0; }  to { stroke-dashoffset: -100; } }
    @keyframes lis-mid  { from { stroke-dashoffset: 9; }  to { stroke-dashoffset: -91; } }
    @keyframes lis-tail { from { stroke-dashoffset: 29; } to { stroke-dashoffset: -71; } }
    @keyframes lis-drift { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    @media (prefers-reduced-motion: reduce) {
      .lis-rig, .lis-head, .lis-mid, .lis-tail { animation: none; }
    }
  </style>

  <g class="lis-rig">
    <path class="lis-track" d="M55.00,32.00L54.94,33.11L54.76,34.22L54.46,35.32L54.04,36.42L53.51,37.50L52.86,38.58L52.10,39.63L51.24,40.67L50.28,41.69L49.22,42.69L48.07,43.66L46.83,44.60L45.52,45.52L44.14,46.40L42.69,47.25L41.19,48.07L39.63,48.84L38.04,49.58L36.42,50.28L34.77,50.93L33.11,51.54L31.44,52.10L29.78,52.62L28.13,53.09L26.50,53.51L24.89,53.87L23.33,54.19L21.81,54.46L20.34,54.67L18.93,54.83L17.60,54.94L16.34,54.99L15.16,54.99L14.07,54.94L13.07,54.83L12.17,54.67L11.38,54.46L10.70,54.19L10.13,53.87L9.67,53.51L9.33,53.09L9.11,52.62L9.01,52.10L9.03,51.54L9.17,50.93L9.43,50.28L9.81,49.58L10.30,48.84L10.91,48.07L11.63,47.25L12.46,46.40L13.39,45.52L14.42,44.60L15.54,43.66L16.75,42.69L18.04,41.69L19.40,40.67L20.82,39.63L22.31,38.58L23.84,37.50L25.42,36.42L27.04,35.32L28.68,34.22L30.33,33.11L32.00,32.00L33.67,30.89L35.32,29.78L36.96,28.68L38.58,27.58L40.16,26.50L41.69,25.42L43.18,24.37L44.60,23.33L45.96,22.31L47.25,21.31L48.46,20.34L49.58,19.40L50.61,18.48L51.54,17.60L52.37,16.75L53.09,15.93L53.70,15.16L54.19,14.42L54.57,13.72L54.83,13.07L54.97,12.46L54.99,11.90L54.89,11.38L54.67,10.91L54.33,10.49L53.87,10.13L53.30,9.81L52.62,9.54L51.83,9.33L50.93,9.17L49.93,9.06L48.84,9.01L47.66,9.01L46.40,9.06L45.07,9.17L43.66,9.33L42.19,9.54L40.67,9.81L39.11,10.13L37.50,10.49L35.87,10.91L34.22,11.38L32.56,11.90L30.89,12.46L29.23,13.07L27.58,13.72L25.96,14.42L24.37,15.16L22.81,15.93L21.31,16.75L19.86,17.60L18.48,18.48L17.17,19.40L15.93,20.34L14.78,21.31L13.72,22.31L12.76,23.33L11.90,24.37L11.14,25.42L10.49,26.50L9.96,27.58L9.54,28.68L9.24,29.78L9.06,30.89L9.00,32.00L9.06,33.11L9.24,34.22L9.54,35.32L9.96,36.42L10.49,37.50L11.14,38.58L11.90,39.63L12.76,40.67L13.72,41.69L14.78,42.69L15.93,43.66L17.17,44.60L18.48,45.52L19.86,46.40L21.31,47.25L22.81,48.07L24.37,48.84L25.96,49.58L27.58,50.28L29.23,50.93L30.89,51.54L32.56,52.10L34.22,52.62L35.87,53.09L37.50,53.51L39.11,53.87L40.67,54.19L42.19,54.46L43.66,54.67L45.07,54.83L46.40,54.94L47.66,54.99L48.84,54.99L49.93,54.94L50.93,54.83L51.83,54.67L52.62,54.46L53.30,54.19L53.87,53.87L54.33,53.51L54.67,53.09L54.89,52.62L54.99,52.10L54.97,51.54L54.83,50.93L54.57,50.28L54.19,49.58L53.70,48.84L53.09,48.07L52.37,47.25L51.54,46.40L50.61,45.52L49.58,44.60L48.46,43.66L47.25,42.69L45.96,41.69L44.60,40.67L43.18,39.63L41.69,38.58L40.16,37.50L38.58,36.42L36.96,35.32L35.32,34.22L33.67,33.11L32.00,32.00L30.33,30.89L28.68,29.78L27.04,28.68L25.42,27.58L23.84,26.50L22.31,25.42L20.82,24.37L19.40,23.33L18.04,22.31L16.75,21.31L15.54,20.34L14.42,19.40L13.39,18.48L12.46,17.60L11.63,16.75L10.91,15.93L10.30,15.16L9.81,14.42L9.43,13.72L9.17,13.07L9.03,12.46L9.01,11.90L9.11,11.38L9.33,10.91L9.67,10.49L10.13,10.13L10.70,9.81L11.38,9.54L12.17,9.33L13.07,9.17L14.07,9.06L15.16,9.01L16.34,9.01L17.60,9.06L18.93,9.17L20.34,9.33L21.81,9.54L23.33,9.81L24.89,10.13L26.50,10.49L28.13,10.91L29.78,11.38L31.44,11.90L33.11,12.46L34.77,13.07L36.42,13.72L38.04,14.42L39.63,15.16L41.19,15.93L42.69,16.75L44.14,17.60L45.52,18.48L46.83,19.40L48.07,20.34L49.22,21.31L50.28,22.31L51.24,23.33L52.10,24.37L52.86,25.42L53.51,26.50L54.04,27.58L54.46,28.68L54.76,29.78L54.94,30.89L55.00,32.00Z"/>
    <path class="lis-tail"  d="M55.00,32.00L54.94,33.11L54.76,34.22L54.46,35.32L54.04,36.42L53.51,37.50L52.86,38.58L52.10,39.63L51.24,40.67L50.28,41.69L49.22,42.69L48.07,43.66L46.83,44.60L45.52,45.52L44.14,46.40L42.69,47.25L41.19,48.07L39.63,48.84L38.04,49.58L36.42,50.28L34.77,50.93L33.11,51.54L31.44,52.10L29.78,52.62L28.13,53.09L26.50,53.51L24.89,53.87L23.33,54.19L21.81,54.46L20.34,54.67L18.93,54.83L17.60,54.94L16.34,54.99L15.16,54.99L14.07,54.94L13.07,54.83L12.17,54.67L11.38,54.46L10.70,54.19L10.13,53.87L9.67,53.51L9.33,53.09L9.11,52.62L9.01,52.10L9.03,51.54L9.17,50.93L9.43,50.28L9.81,49.58L10.30,48.84L10.91,48.07L11.63,47.25L12.46,46.40L13.39,45.52L14.42,44.60L15.54,43.66L16.75,42.69L18.04,41.69L19.40,40.67L20.82,39.63L22.31,38.58L23.84,37.50L25.42,36.42L27.04,35.32L28.68,34.22L30.33,33.11L32.00,32.00L33.67,30.89L35.32,29.78L36.96,28.68L38.58,27.58L40.16,26.50L41.69,25.42L43.18,24.37L44.60,23.33L45.96,22.31L47.25,21.31L48.46,20.34L49.58,19.40L50.61,18.48L51.54,17.60L52.37,16.75L53.09,15.93L53.70,15.16L54.19,14.42L54.57,13.72L54.83,13.07L54.97,12.46L54.99,11.90L54.89,11.38L54.67,10.91L54.33,10.49L53.87,10.13L53.30,9.81L52.62,9.54L51.83,9.33L50.93,9.17L49.93,9.06L48.84,9.01L47.66,9.01L46.40,9.06L45.07,9.17L43.66,9.33L42.19,9.54L40.67,9.81L39.11,10.13L37.50,10.49L35.87,10.91L34.22,11.38L32.56,11.90L30.89,12.46L29.23,13.07L27.58,13.72L25.96,14.42L24.37,15.16L22.81,15.93L21.31,16.75L19.86,17.60L18.48,18.48L17.17,19.40L15.93,20.34L14.78,21.31L13.72,22.31L12.76,23.33L11.90,24.37L11.14,25.42L10.49,26.50L9.96,27.58L9.54,28.68L9.24,29.78L9.06,30.89L9.00,32.00L9.06,33.11L9.24,34.22L9.54,35.32L9.96,36.42L10.49,37.50L11.14,38.58L11.90,39.63L12.76,40.67L13.72,41.69L14.78,42.69L15.93,43.66L17.17,44.60L18.48,45.52L19.86,46.40L21.31,47.25L22.81,48.07L24.37,48.84L25.96,49.58L27.58,50.28L29.23,50.93L30.89,51.54L32.56,52.10L34.22,52.62L35.87,53.09L37.50,53.51L39.11,53.87L40.67,54.19L42.19,54.46L43.66,54.67L45.07,54.83L46.40,54.94L47.66,54.99L48.84,54.99L49.93,54.94L50.93,54.83L51.83,54.67L52.62,54.46L53.30,54.19L53.87,53.87L54.33,53.51L54.67,53.09L54.89,52.62L54.99,52.10L54.97,51.54L54.83,50.93L54.57,50.28L54.19,49.58L53.70,48.84L53.09,48.07L52.37,47.25L51.54,46.40L50.61,45.52L49.58,44.60L48.46,43.66L47.25,42.69L45.96,41.69L44.60,40.67L43.18,39.63L41.69,38.58L40.16,37.50L38.58,36.42L36.96,35.32L35.32,34.22L33.67,33.11L32.00,32.00L30.33,30.89L28.68,29.78L27.04,28.68L25.42,27.58L23.84,26.50L22.31,25.42L20.82,24.37L19.40,23.33L18.04,22.31L16.75,21.31L15.54,20.34L14.42,19.40L13.39,18.48L12.46,17.60L11.63,16.75L10.91,15.93L10.30,15.16L9.81,14.42L9.43,13.72L9.17,13.07L9.03,12.46L9.01,11.90L9.11,11.38L9.33,10.91L9.67,10.49L10.13,10.13L10.70,9.81L11.38,9.54L12.17,9.33L13.07,9.17L14.07,9.06L15.16,9.01L16.34,9.01L17.60,9.06L18.93,9.17L20.34,9.33L21.81,9.54L23.33,9.81L24.89,10.13L26.50,10.49L28.13,10.91L29.78,11.38L31.44,11.90L33.11,12.46L34.77,13.07L36.42,13.72L38.04,14.42L39.63,15.16L41.19,15.93L42.69,16.75L44.14,17.60L45.52,18.48L46.83,19.40L48.07,20.34L49.22,21.31L50.28,22.31L51.24,23.33L52.10,24.37L52.86,25.42L53.51,26.50L54.04,27.58L54.46,28.68L54.76,29.78L54.94,30.89L55.00,32.00Z" pathLength="100"/>
    <path class="lis-mid"   d="M55.00,32.00L54.94,33.11L54.76,34.22L54.46,35.32L54.04,36.42L53.51,37.50L52.86,38.58L52.10,39.63L51.24,40.67L50.28,41.69L49.22,42.69L48.07,43.66L46.83,44.60L45.52,45.52L44.14,46.40L42.69,47.25L41.19,48.07L39.63,48.84L38.04,49.58L36.42,50.28L34.77,50.93L33.11,51.54L31.44,52.10L29.78,52.62L28.13,53.09L26.50,53.51L24.89,53.87L23.33,54.19L21.81,54.46L20.34,54.67L18.93,54.83L17.60,54.94L16.34,54.99L15.16,54.99L14.07,54.94L13.07,54.83L12.17,54.67L11.38,54.46L10.70,54.19L10.13,53.87L9.67,53.51L9.33,53.09L9.11,52.62L9.01,52.10L9.03,51.54L9.17,50.93L9.43,50.28L9.81,49.58L10.30,48.84L10.91,48.07L11.63,47.25L12.46,46.40L13.39,45.52L14.42,44.60L15.54,43.66L16.75,42.69L18.04,41.69L19.40,40.67L20.82,39.63L22.31,38.58L23.84,37.50L25.42,36.42L27.04,35.32L28.68,34.22L30.33,33.11L32.00,32.00L33.67,30.89L35.32,29.78L36.96,28.68L38.58,27.58L40.16,26.50L41.69,25.42L43.18,24.37L44.60,23.33L45.96,22.31L47.25,21.31L48.46,20.34L49.58,19.40L50.61,18.48L51.54,17.60L52.37,16.75L53.09,15.93L53.70,15.16L54.19,14.42L54.57,13.72L54.83,13.07L54.97,12.46L54.99,11.90L54.89,11.38L54.67,10.91L54.33,10.49L53.87,10.13L53.30,9.81L52.62,9.54L51.83,9.33L50.93,9.17L49.93,9.06L48.84,9.01L47.66,9.01L46.40,9.06L45.07,9.17L43.66,9.33L42.19,9.54L40.67,9.81L39.11,10.13L37.50,10.49L35.87,10.91L34.22,11.38L32.56,11.90L30.89,12.46L29.23,13.07L27.58,13.72L25.96,14.42L24.37,15.16L22.81,15.93L21.31,16.75L19.86,17.60L18.48,18.48L17.17,19.40L15.93,20.34L14.78,21.31L13.72,22.31L12.76,23.33L11.90,24.37L11.14,25.42L10.49,26.50L9.96,27.58L9.54,28.68L9.24,29.78L9.06,30.89L9.00,32.00L9.06,33.11L9.24,34.22L9.54,35.32L9.96,36.42L10.49,37.50L11.14,38.58L11.90,39.63L12.76,40.67L13.72,41.69L14.78,42.69L15.93,43.66L17.17,44.60L18.48,45.52L19.86,46.40L21.31,47.25L22.81,48.07L24.37,48.84L25.96,49.58L27.58,50.28L29.23,50.93L30.89,51.54L32.56,52.10L34.22,52.62L35.87,53.09L37.50,53.51L39.11,53.87L40.67,54.19L42.19,54.46L43.66,54.67L45.07,54.83L46.40,54.94L47.66,54.99L48.84,54.99L49.93,54.94L50.93,54.83L51.83,54.67L52.62,54.46L53.30,54.19L53.87,53.87L54.33,53.51L54.67,53.09L54.89,52.62L54.99,52.10L54.97,51.54L54.83,50.93L54.57,50.28L54.19,49.58L53.70,48.84L53.09,48.07L52.37,47.25L51.54,46.40L50.61,45.52L49.58,44.60L48.46,43.66L47.25,42.69L45.96,41.69L44.60,40.67L43.18,39.63L41.69,38.58L40.16,37.50L38.58,36.42L36.96,35.32L35.32,34.22L33.67,33.11L32.00,32.00L30.33,30.89L28.68,29.78L27.04,28.68L25.42,27.58L23.84,26.50L22.31,25.42L20.82,24.37L19.40,23.33L18.04,22.31L16.75,21.31L15.54,20.34L14.42,19.40L13.39,18.48L12.46,17.60L11.63,16.75L10.91,15.93L10.30,15.16L9.81,14.42L9.43,13.72L9.17,13.07L9.03,12.46L9.01,11.90L9.11,11.38L9.33,10.91L9.67,10.49L10.13,10.13L10.70,9.81L11.38,9.54L12.17,9.33L13.07,9.17L14.07,9.06L15.16,9.01L16.34,9.01L17.60,9.06L18.93,9.17L20.34,9.33L21.81,9.54L23.33,9.81L24.89,10.13L26.50,10.49L28.13,10.91L29.78,11.38L31.44,11.90L33.11,12.46L34.77,13.07L36.42,13.72L38.04,14.42L39.63,15.16L41.19,15.93L42.69,16.75L44.14,17.60L45.52,18.48L46.83,19.40L48.07,20.34L49.22,21.31L50.28,22.31L51.24,23.33L52.10,24.37L52.86,25.42L53.51,26.50L54.04,27.58L54.46,28.68L54.76,29.78L54.94,30.89L55.00,32.00Z" pathLength="100"/>
    <path class="lis-head"  d="M55.00,32.00L54.94,33.11L54.76,34.22L54.46,35.32L54.04,36.42L53.51,37.50L52.86,38.58L52.10,39.63L51.24,40.67L50.28,41.69L49.22,42.69L48.07,43.66L46.83,44.60L45.52,45.52L44.14,46.40L42.69,47.25L41.19,48.07L39.63,48.84L38.04,49.58L36.42,50.28L34.77,50.93L33.11,51.54L31.44,52.10L29.78,52.62L28.13,53.09L26.50,53.51L24.89,53.87L23.33,54.19L21.81,54.46L20.34,54.67L18.93,54.83L17.60,54.94L16.34,54.99L15.16,54.99L14.07,54.94L13.07,54.83L12.17,54.67L11.38,54.46L10.70,54.19L10.13,53.87L9.67,53.51L9.33,53.09L9.11,52.62L9.01,52.10L9.03,51.54L9.17,50.93L9.43,50.28L9.81,49.58L10.30,48.84L10.91,48.07L11.63,47.25L12.46,46.40L13.39,45.52L14.42,44.60L15.54,43.66L16.75,42.69L18.04,41.69L19.40,40.67L20.82,39.63L22.31,38.58L23.84,37.50L25.42,36.42L27.04,35.32L28.68,34.22L30.33,33.11L32.00,32.00L33.67,30.89L35.32,29.78L36.96,28.68L38.58,27.58L40.16,26.50L41.69,25.42L43.18,24.37L44.60,23.33L45.96,22.31L47.25,21.31L48.46,20.34L49.58,19.40L50.61,18.48L51.54,17.60L52.37,16.75L53.09,15.93L53.70,15.16L54.19,14.42L54.57,13.72L54.83,13.07L54.97,12.46L54.99,11.90L54.89,11.38L54.67,10.91L54.33,10.49L53.87,10.13L53.30,9.81L52.62,9.54L51.83,9.33L50.93,9.17L49.93,9.06L48.84,9.01L47.66,9.01L46.40,9.06L45.07,9.17L43.66,9.33L42.19,9.54L40.67,9.81L39.11,10.13L37.50,10.49L35.87,10.91L34.22,11.38L32.56,11.90L30.89,12.46L29.23,13.07L27.58,13.72L25.96,14.42L24.37,15.16L22.81,15.93L21.31,16.75L19.86,17.60L18.48,18.48L17.17,19.40L15.93,20.34L14.78,21.31L13.72,22.31L12.76,23.33L11.90,24.37L11.14,25.42L10.49,26.50L9.96,27.58L9.54,28.68L9.24,29.78L9.06,30.89L9.00,32.00L9.06,33.11L9.24,34.22L9.54,35.32L9.96,36.42L10.49,37.50L11.14,38.58L11.90,39.63L12.76,40.67L13.72,41.69L14.78,42.69L15.93,43.66L17.17,44.60L18.48,45.52L19.86,46.40L21.31,47.25L22.81,48.07L24.37,48.84L25.96,49.58L27.58,50.28L29.23,50.93L30.89,51.54L32.56,52.10L34.22,52.62L35.87,53.09L37.50,53.51L39.11,53.87L40.67,54.19L42.19,54.46L43.66,54.67L45.07,54.83L46.40,54.94L47.66,54.99L48.84,54.99L49.93,54.94L50.93,54.83L51.83,54.67L52.62,54.46L53.30,54.19L53.87,53.87L54.33,53.51L54.67,53.09L54.89,52.62L54.99,52.10L54.97,51.54L54.83,50.93L54.57,50.28L54.19,49.58L53.70,48.84L53.09,48.07L52.37,47.25L51.54,46.40L50.61,45.52L49.58,44.60L48.46,43.66L47.25,42.69L45.96,41.69L44.60,40.67L43.18,39.63L41.69,38.58L40.16,37.50L38.58,36.42L36.96,35.32L35.32,34.22L33.67,33.11L32.00,32.00L30.33,30.89L28.68,29.78L27.04,28.68L25.42,27.58L23.84,26.50L22.31,25.42L20.82,24.37L19.40,23.33L18.04,22.31L16.75,21.31L15.54,20.34L14.42,19.40L13.39,18.48L12.46,17.60L11.63,16.75L10.91,15.93L10.30,15.16L9.81,14.42L9.43,13.72L9.17,13.07L9.03,12.46L9.01,11.90L9.11,11.38L9.33,10.91L9.67,10.49L10.13,10.13L10.70,9.81L11.38,9.54L12.17,9.33L13.07,9.17L14.07,9.06L15.16,9.01L16.34,9.01L17.60,9.06L18.93,9.17L20.34,9.33L21.81,9.54L23.33,9.81L24.89,10.13L26.50,10.49L28.13,10.91L29.78,11.38L31.44,11.90L33.11,12.46L34.77,13.07L36.42,13.72L38.04,14.42L39.63,15.16L41.19,15.93L42.69,16.75L44.14,17.60L45.52,18.48L46.83,19.40L48.07,20.34L49.22,21.31L50.28,22.31L51.24,23.33L52.10,24.37L52.86,25.42L53.51,26.50L54.04,27.58L54.46,28.68L54.76,29.78L54.94,30.89L55.00,32.00Z" pathLength="100"/>
  </g>
</svg>`,
  'orbit': `<svg xmlns="http://www.w3.org/2000/svg" class="orb" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    /* an ellipse is a circle under scaleY, so the plane is squashed and the
       arm just rotates */
    .orb-plane {
      transform-box: view-box;
      transform-origin: center;
      transform: rotate(var(--tilt)) scale(1, var(--k));
    }

    .orb-track { stroke: currentColor; stroke-width: .9; fill: none; opacity: .2; }

    .orb-arm {
      transform-box: view-box;
      transform-origin: center;
      animation: orb-arm calc(var(--dur) * var(--rate, 1)) linear infinite;
    }

    /* the bead counter-rotates and un-squashes about its own centre, which
       cancels the distortion of the shape but keeps the position */
    .orb-bead {
      fill: currentColor;
      transform-box: fill-box;
      transform-origin: center;
      animation: orb-bead calc(var(--dur) * var(--rate, 1)) linear infinite;
    }

    .orb-core { fill: currentColor; opacity: .3; }

    @keyframes orb-arm  { from { transform: rotate(0deg); } to { transform: rotate(calc(var(--dir) * 360deg)); } }
    @keyframes orb-bead { from { transform: rotate(0deg) scale(1, var(--inv)); } to { transform: rotate(calc(var(--dir) * -360deg)) scale(1, var(--inv)); } }

    @media (prefers-reduced-motion: reduce) {
      .orb-arm  { animation: none; transform: rotate(var(--rest)); }
      .orb-bead { animation: none; transform: rotate(calc(var(--rest) * -1)) scale(1, var(--inv)); }
    }
  </style>

  <g class="orb-plane" style="--tilt:-26deg;--k:0.3;--inv:3.3333;--dur:2.6s;--dir:1;--rest:34deg">
    <circle class="orb-track" cx="32" cy="32" r="20"/>
    <g class="orb-arm"><circle class="orb-bead" cx="52" cy="32" r="2.5"/></g>
  </g>
  <g class="orb-plane" style="--tilt:34deg;--k:0.38;--inv:2.6316;--dur:3.4s;--dir:-1;--rest:158deg">
    <circle class="orb-track" cx="32" cy="32" r="16"/>
    <g class="orb-arm"><circle class="orb-bead" cx="48" cy="32" r="2.5"/></g>
  </g>
  <g class="orb-plane" style="--tilt:86deg;--k:0.26;--inv:3.8462;--dur:4.2s;--dir:1;--rest:262deg">
    <circle class="orb-track" cx="32" cy="32" r="22"/>
    <g class="orb-arm"><circle class="orb-bead" cx="54" cy="32" r="2.5"/></g>
  </g>
  <circle class="orb-core" cx="32" cy="32" r="1.6"/>
</svg>`,
  'iris': `<svg xmlns="http://www.w3.org/2000/svg" class="iris" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .iris { --dur: 3s; }

    .iris-assembly {
      transform-box: view-box;
      transform-origin: center;
      animation: iris-turn calc(var(--dur) * var(--rate, 1) * 4) linear infinite;
    }

    .iris-blade {
      stroke: currentColor;
      stroke-width: 1;
      fill: currentColor;
      fill-opacity: .05;
      opacity: .62;
      transform-box: view-box;
      transform-origin: center;
      transform: rotate(var(--a));
      animation: iris-stop calc(var(--dur) * var(--rate, 1)) ease-in-out infinite;
    }

    .iris-rim { stroke: currentColor; stroke-width: 1; opacity: .16; }

    /* sliding one circle along its own axis is the whole mechanism:
       cy 6 closes the aperture, cy 24 opens it wide */
    @keyframes iris-stop {
      0%, 100% { cy: 6px; }
      50%      { cy: 24px; }
    }

    @keyframes iris-turn { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    @media (prefers-reduced-motion: reduce) {
      .iris-assembly { animation: none; }
      .iris-blade    { animation: none; cy: 16px; }
    }
  </style>

  <defs>
    <clipPath id="iris-barrel"><circle cx="32" cy="32" r="30"/></clipPath>
  </defs>
  <g clip-path="url(#iris-barrel)">
    <g class="iris-assembly">
      <circle class="iris-blade" cx="32" cy="16" r="30" style="--a:0.0deg"/>
      <circle class="iris-blade" cx="32" cy="16" r="30" style="--a:60.0deg"/>
      <circle class="iris-blade" cx="32" cy="16" r="30" style="--a:120.0deg"/>
      <circle class="iris-blade" cx="32" cy="16" r="30" style="--a:180.0deg"/>
      <circle class="iris-blade" cx="32" cy="16" r="30" style="--a:240.0deg"/>
      <circle class="iris-blade" cx="32" cy="16" r="30" style="--a:300.0deg"/>
    </g>
  </g>
  <circle class="iris-rim" cx="32" cy="32" r="30"/>
</svg>`,
  'cascade': `<svg xmlns="http://www.w3.org/2000/svg" class="cas" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .cas-slit { stroke: currentColor; stroke-width: 1; opacity: .17; }

    /* the weight sits at the leading edge, so a drop reads as a head pulling
       a trail rather than a block sliding past */
    .cas-drop {
      animation: cas-fall calc(var(--dur) * var(--rate, 1)) linear infinite;
      animation-delay: calc(var(--delay) * var(--rate, 1));
    }

    @keyframes cas-fall {
      0%   { transform: translateY(-35px); opacity: 0; }
      18%  { opacity: 1; }
      82%  { opacity: 1; }
      100% { transform: translateY(64px); opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .cas-drop { animation: none; opacity: 1; transform: translateY(calc(var(--rest) * 64px - 16px)); }
    }
  </style>

  <defs>
    <clipPath id="cas-disc"><circle cx="32" cy="32" r="32"/></clipPath>
    <linearGradient id="cas-fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="currentColor" stop-opacity="0"/>
      <stop offset="100%" stop-color="currentColor" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#cas-disc)">
    <line class="cas-slit" x1="4.57" y1="0" x2="4.57" y2="64"/>
    <line class="cas-slit" x1="9.14" y1="0" x2="9.14" y2="64"/>
    <line class="cas-slit" x1="13.71" y1="0" x2="13.71" y2="64"/>
    <line class="cas-slit" x1="18.29" y1="0" x2="18.29" y2="64"/>
    <line class="cas-slit" x1="22.86" y1="0" x2="22.86" y2="64"/>
    <line class="cas-slit" x1="27.43" y1="0" x2="27.43" y2="64"/>
    <line class="cas-slit" x1="32.00" y1="0" x2="32.00" y2="64"/>
    <line class="cas-slit" x1="36.57" y1="0" x2="36.57" y2="64"/>
    <line class="cas-slit" x1="41.14" y1="0" x2="41.14" y2="64"/>
    <line class="cas-slit" x1="45.71" y1="0" x2="45.71" y2="64"/>
    <line class="cas-slit" x1="50.29" y1="0" x2="50.29" y2="64"/>
    <line class="cas-slit" x1="54.86" y1="0" x2="54.86" y2="64"/>
    <line class="cas-slit" x1="59.43" y1="0" x2="59.43" y2="64"/>
    <rect class="cas-drop" x="8.24" y="0" width="1.8" height="25.60" rx="0.9" fill="url(#cas-fade)" style="--dur:2.1s;--delay:-0.4s;--rest:0.16"/>
    <rect class="cas-drop" x="17.39" y="0" width="1.8" height="17.92" rx="0.9" fill="url(#cas-fade)" style="--dur:1.6s;--delay:-1.2s;--rest:0.54"/>
    <rect class="cas-drop" x="26.53" y="0" width="1.8" height="29.44" rx="0.9" fill="url(#cas-fade)" style="--dur:2.7s;--delay:-0.1s;--rest:0.3"/>
    <rect class="cas-drop" x="31.10" y="0" width="1.8" height="21.76" rx="0.9" fill="url(#cas-fade)" style="--dur:1.9s;--delay:-1.5s;--rest:0.72"/>
    <rect class="cas-drop" x="40.24" y="0" width="1.8" height="32.00" rx="0.9" fill="url(#cas-fade)" style="--dur:2.4s;--delay:-0.8s;--rest:0.44"/>
    <rect class="cas-drop" x="44.81" y="0" width="1.8" height="16.64" rx="0.9" fill="url(#cas-fade)" style="--dur:3.1s;--delay:-2.2s;--rest:0.62"/>
    <rect class="cas-drop" x="53.96" y="0" width="1.8" height="24.32" rx="0.9" fill="url(#cas-fade)" style="--dur:1.8s;--delay:-0.6s;--rest:0.22"/>
  </g>
</svg>`,
  'radar': `<svg xmlns="http://www.w3.org/2000/svg" class="rad" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .rad { --dur: 2.8s; }

    .rad-ring  { stroke: currentColor; stroke-width: 1; opacity: .16; }
    .rad-cross { stroke: currentColor; stroke-width: 1; opacity: .13; }

    /* SVG has no conic gradient, so the tail is graded wedges */
    .rad-sweep {
      transform-box: view-box;
      transform-origin: center;
      animation: rad-sweep calc(var(--dur) * var(--rate, 1)) linear infinite;
    }

    /* each blip is delayed by its own bearing over 360, so it flares exactly
       as the leading edge crosses it */
    .rad-blip {
      fill: currentColor;
      transform-box: fill-box;
      transform-origin: center;
      opacity: 0;
      animation: rad-blip calc(var(--dur) * var(--rate, 1)) ease-out infinite;
      animation-delay: calc(var(--bearing) / 360 * var(--dur) * var(--rate, 1));
    }

    @keyframes rad-sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes rad-blip {
      0%   { opacity: 1; transform: scale(1.25); }
      45%  { opacity: .35; transform: scale(1); }
      100% { opacity: 0; transform: scale(1); }
    }

    @media (prefers-reduced-motion: reduce) {
      .rad-sweep { animation: none; transform: rotate(214deg); }
      .rad-blip  { animation: none; opacity: .7; }
    }
  </style>

  <defs><clipPath id="rad-disc"><circle cx="32" cy="32" r="32"/></clipPath></defs>
  <circle class="rad-ring" cx="32" cy="32" r="31.5"/>
  <circle class="rad-ring" cx="32" cy="32" r="15"/>
  <line class="rad-cross" x1="0.5" y1="32" x2="63.5" y2="32"/>
  <line class="rad-cross" x1="32" y1="0.5" x2="32" y2="63.5"/>
  <g clip-path="url(#rad-disc)">
    <g class="rad-sweep">
      <path d="M32,32L32.00,0.50A31.5,31.5 0 0,1 33.37,0.53Z" fill="currentColor" opacity="0.000"/>
      <path d="M32,32L33.37,0.53A31.5,31.5 0 0,1 34.75,0.62Z" fill="currentColor" opacity="0.001"/>
      <path d="M32,32L34.75,0.62A31.5,31.5 0 0,1 36.11,0.77Z" fill="currentColor" opacity="0.005"/>
      <path d="M32,32L36.11,0.77A31.5,31.5 0 0,1 37.47,0.98Z" fill="currentColor" opacity="0.010"/>
      <path d="M32,32L37.47,0.98A31.5,31.5 0 0,1 38.82,1.25Z" fill="currentColor" opacity="0.017"/>
      <path d="M32,32L38.82,1.25A31.5,31.5 0 0,1 40.15,1.57Z" fill="currentColor" opacity="0.026"/>
      <path d="M32,32L40.15,1.57A31.5,31.5 0 0,1 41.47,1.96Z" fill="currentColor" opacity="0.036"/>
      <path d="M32,32L41.47,1.96A31.5,31.5 0 0,1 42.77,2.40Z" fill="currentColor" opacity="0.047"/>
      <path d="M32,32L42.77,2.40A31.5,31.5 0 0,1 44.05,2.90Z" fill="currentColor" opacity="0.060"/>
      <path d="M32,32L44.05,2.90A31.5,31.5 0 0,1 45.31,3.45Z" fill="currentColor" opacity="0.074"/>
      <path d="M32,32L45.31,3.45A31.5,31.5 0 0,1 46.55,4.06Z" fill="currentColor" opacity="0.089"/>
      <path d="M32,32L46.55,4.06A31.5,31.5 0 0,1 47.75,4.72Z" fill="currentColor" opacity="0.106"/>
      <path d="M32,32L47.75,4.72A31.5,31.5 0 0,1 48.92,5.43Z" fill="currentColor" opacity="0.124"/>
      <path d="M32,32L48.92,5.43A31.5,31.5 0 0,1 50.07,6.20Z" fill="currentColor" opacity="0.143"/>
      <path d="M32,32L50.07,6.20A31.5,31.5 0 0,1 51.18,7.01Z" fill="currentColor" opacity="0.163"/>
      <path d="M32,32L51.18,7.01A31.5,31.5 0 0,1 52.25,7.87Z" fill="currentColor" opacity="0.185"/>
      <path d="M32,32L52.25,7.87A31.5,31.5 0 0,1 53.28,8.78Z" fill="currentColor" opacity="0.208"/>
      <path d="M32,32L53.28,8.78A31.5,31.5 0 0,1 54.27,9.73Z" fill="currentColor" opacity="0.232"/>
      <path d="M32,32L54.27,9.73A31.5,31.5 0 0,1 55.22,10.72Z" fill="currentColor" opacity="0.257"/>
      <path d="M32,32L55.22,10.72A31.5,31.5 0 0,1 56.13,11.75Z" fill="currentColor" opacity="0.283"/>
      <path d="M32,32L56.13,11.75A31.5,31.5 0 0,1 56.99,12.82Z" fill="currentColor" opacity="0.310"/>
      <path d="M32,32L56.99,12.82A31.5,31.5 0 0,1 57.80,13.93Z" fill="currentColor" opacity="0.339"/>
      <path d="M32,32L57.80,13.93A31.5,31.5 0 0,1 58.57,15.08Z" fill="currentColor" opacity="0.369"/>
      <path d="M32,32L58.57,15.08A31.5,31.5 0 0,1 59.28,16.25Z" fill="currentColor" opacity="0.399"/>
      <path d="M32,32L59.28,16.25A31.5,31.5 0 0,1 59.94,17.45Z" fill="currentColor" opacity="0.431"/>
      <path d="M32,32L59.94,17.45A31.5,31.5 0 0,1 60.55,18.69Z" fill="currentColor" opacity="0.464"/>
      <path d="M32,32L60.55,18.69A31.5,31.5 0 0,1 61.10,19.95Z" fill="currentColor" opacity="0.498"/>
      <path d="M32,32L61.10,19.95A31.5,31.5 0 0,1 61.60,21.23Z" fill="currentColor" opacity="0.533"/>
      <path d="M32,32L61.60,21.23A31.5,31.5 0 0,1 62.04,22.53Z" fill="currentColor" opacity="0.569"/>
      <path d="M32,32L62.04,22.53A31.5,31.5 0 0,1 62.43,23.85Z" fill="currentColor" opacity="0.606"/>
      <path d="M32,32L62.43,23.85A31.5,31.5 0 0,1 62.75,25.18Z" fill="currentColor" opacity="0.644"/>
      <path d="M32,32L62.75,25.18A31.5,31.5 0 0,1 63.02,26.53Z" fill="currentColor" opacity="0.683"/>
      <path d="M32,32L63.02,26.53A31.5,31.5 0 0,1 63.23,27.89Z" fill="currentColor" opacity="0.723"/>
      <path d="M32,32L63.23,27.89A31.5,31.5 0 0,1 63.38,29.25Z" fill="currentColor" opacity="0.765"/>
      <path d="M32,32L63.38,29.25A31.5,31.5 0 0,1 63.47,30.63Z" fill="currentColor" opacity="0.807"/>
      <path d="M32,32L63.47,30.63A31.5,31.5 0 0,1 63.50,32.00Z" fill="currentColor" opacity="0.850"/>
    </g>
  </g>
    <circle class="rad-blip" cx="49.15" cy="18.60" r="2" style="--bearing:52"/>
    <circle class="rad-blip" cx="39.12" cy="43.40" r="2" style="--bearing:148"/>
    <circle class="rad-blip" cx="17.68" cy="53.22" r="2" style="--bearing:214"/>
    <circle class="rad-blip" cx="18.27" cy="20.48" r="2" style="--bearing:310"/>
</svg>`,
  'gyroscope': `<svg xmlns="http://www.w3.org/2000/svg" class="gyr" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .gyr-gimbal {
      transform-box: view-box;
      transform-origin: center;
      transform: rotate(var(--tilt));
    }

    /* a ring seen edge-on projects to width R|cos t|, so animating rx from R
       to nothing and back is the spin itself */
    .gyr-ring {
      stroke: currentColor;
      stroke-width: 1.1;
      fill: none;
      opacity: .72;
      animation: gyr-spin calc(var(--dur) * var(--rate, 1)) infinite;
    }

    .gyr-pip { fill: currentColor; opacity: .85; }

    @keyframes gyr-spin {
      0%   { rx: 29px; animation-timing-function: ease-in; }
      50%  { rx: 0px;  animation-timing-function: ease-out; }
      100% { rx: 29px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .gyr-ring { animation: none; rx: calc(var(--rest) * 1px); }
    }
  </style>

  <g class="gyr-gimbal" style="--tilt:0deg">
    <ellipse class="gyr-ring" cx="32" cy="32" rx="29" ry="29" style="--dur:2.4s;--dir:1;--rest:62"/>
  </g>
  <g class="gyr-gimbal" style="--tilt:62deg">
    <ellipse class="gyr-ring" cx="32" cy="32" rx="29" ry="29" style="--dur:3.3s;--dir:-1;--rest:134"/>
  </g>
  <g class="gyr-gimbal" style="--tilt:118deg">
    <ellipse class="gyr-ring" cx="32" cy="32" rx="29" ry="29" style="--dur:4.1s;--dir:1;--rest:28"/>
  </g>
  <circle class="gyr-pip" cx="32" cy="32" r="2"/>
</svg>`,
  'tide': `<svg xmlns="http://www.w3.org/2000/svg" class="tide" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .tide { --dur: 2.6s; }

    /* the level breathes; the waves run across it */
    .tide-swell { animation: tide-level calc(var(--dur) * var(--rate, 1) * 2.6) ease-in-out infinite; }

    .tide-back  { animation: tide-run calc(var(--dur) * var(--rate, 1) * 1.7) linear infinite; }
    .tide-front { animation: tide-run calc(var(--dur) * var(--rate, 1)) linear infinite reverse; }

    .tide-body { fill: currentColor; }
    .tide-back  .tide-body { opacity: .07; }
    .tide-front .tide-body { opacity: .13; }

    .tide-skin { fill: none; stroke: currentColor; stroke-width: 1.1; }
    .tide-back  .tide-skin { opacity: .35; }
    .tide-front .tide-skin { opacity: 1; }

    .tide-rim { stroke: currentColor; stroke-width: 1; opacity: .14; }

    /* two identical periods span 128, so sliding 64 is a seamless loop */
    @keyframes tide-run   { from { transform: translateX(0); }      to { transform: translateX(-64px); } }
    @keyframes tide-level { 0%, 100% { transform: translateY(3px); } 50% { transform: translateY(-4px); } }

    @media (prefers-reduced-motion: reduce) {
      .tide-swell { animation: none; }
      .tide-front { animation: none; transform: translateX(-12px); }
      .tide-back  { animation: none; transform: translateX(-22px); }
    }
  </style>

  <defs>
    <clipPath id="tide-bowl"><circle cx="32" cy="32" r="30"/></clipPath>
  </defs>
  <g clip-path="url(#tide-bowl)">
    <g class="tide-swell">
      <g class="tide-lane tide-back">
        <path class="tide-body" d="M0.0,26.50L2.0,27.12L4.0,27.72L6.0,28.28L8.0,28.76L10.0,29.16L12.0,29.46L14.0,29.64L16.0,29.70L18.0,29.64L20.0,29.46L22.0,29.16L24.0,28.76L26.0,28.28L28.0,27.72L30.0,27.12L32.0,26.50L34.0,25.88L36.0,25.28L38.0,24.72L40.0,24.24L42.0,23.84L44.0,23.54L46.0,23.36L48.0,23.30L50.0,23.36L52.0,23.54L54.0,23.84L56.0,24.24L58.0,24.72L60.0,25.28L62.0,25.88L64.0,26.50L66.0,27.12L68.0,27.72L70.0,28.28L72.0,28.76L74.0,29.16L76.0,29.46L78.0,29.64L80.0,29.70L82.0,29.64L84.0,29.46L86.0,29.16L88.0,28.76L90.0,28.28L92.0,27.72L94.0,27.12L96.0,26.50L98.0,25.88L100.0,25.28L102.0,24.72L104.0,24.24L106.0,23.84L108.0,23.54L110.0,23.36L112.0,23.30L114.0,23.36L116.0,23.54L118.0,23.84L120.0,24.24L122.0,24.72L124.0,25.28L126.0,25.88L128.0,26.50L128,64L0,64Z"/>
        <path class="tide-skin" d="M0.0,26.50L2.0,27.12L4.0,27.72L6.0,28.28L8.0,28.76L10.0,29.16L12.0,29.46L14.0,29.64L16.0,29.70L18.0,29.64L20.0,29.46L22.0,29.16L24.0,28.76L26.0,28.28L28.0,27.72L30.0,27.12L32.0,26.50L34.0,25.88L36.0,25.28L38.0,24.72L40.0,24.24L42.0,23.84L44.0,23.54L46.0,23.36L48.0,23.30L50.0,23.36L52.0,23.54L54.0,23.84L56.0,24.24L58.0,24.72L60.0,25.28L62.0,25.88L64.0,26.50L66.0,27.12L68.0,27.72L70.0,28.28L72.0,28.76L74.0,29.16L76.0,29.46L78.0,29.64L80.0,29.70L82.0,29.64L84.0,29.46L86.0,29.16L88.0,28.76L90.0,28.28L92.0,27.72L94.0,27.12L96.0,26.50L98.0,25.88L100.0,25.28L102.0,24.72L104.0,24.24L106.0,23.84L108.0,23.54L110.0,23.36L112.0,23.30L114.0,23.36L116.0,23.54L118.0,23.84L120.0,24.24L122.0,24.72L124.0,25.28L126.0,25.88L128.0,26.50"/>
      </g>
      <g class="tide-lane tide-front">
        <path class="tide-body" d="M0.0,22.00L2.0,22.90L4.0,23.76L6.0,24.56L8.0,25.25L10.0,25.82L12.0,26.25L14.0,26.51L16.0,26.60L18.0,26.51L20.0,26.25L22.0,25.82L24.0,25.25L26.0,24.56L28.0,23.76L30.0,22.90L32.0,22.00L34.0,21.10L36.0,20.24L38.0,19.44L40.0,18.75L42.0,18.18L44.0,17.75L46.0,17.49L48.0,17.40L50.0,17.49L52.0,17.75L54.0,18.18L56.0,18.75L58.0,19.44L60.0,20.24L62.0,21.10L64.0,22.00L66.0,22.90L68.0,23.76L70.0,24.56L72.0,25.25L74.0,25.82L76.0,26.25L78.0,26.51L80.0,26.60L82.0,26.51L84.0,26.25L86.0,25.82L88.0,25.25L90.0,24.56L92.0,23.76L94.0,22.90L96.0,22.00L98.0,21.10L100.0,20.24L102.0,19.44L104.0,18.75L106.0,18.18L108.0,17.75L110.0,17.49L112.0,17.40L114.0,17.49L116.0,17.75L118.0,18.18L120.0,18.75L122.0,19.44L124.0,20.24L126.0,21.10L128.0,22.00L128,64L0,64Z"/>
        <path class="tide-skin" d="M0.0,22.00L2.0,22.90L4.0,23.76L6.0,24.56L8.0,25.25L10.0,25.82L12.0,26.25L14.0,26.51L16.0,26.60L18.0,26.51L20.0,26.25L22.0,25.82L24.0,25.25L26.0,24.56L28.0,23.76L30.0,22.90L32.0,22.00L34.0,21.10L36.0,20.24L38.0,19.44L40.0,18.75L42.0,18.18L44.0,17.75L46.0,17.49L48.0,17.40L50.0,17.49L52.0,17.75L54.0,18.18L56.0,18.75L58.0,19.44L60.0,20.24L62.0,21.10L64.0,22.00L66.0,22.90L68.0,23.76L70.0,24.56L72.0,25.25L74.0,25.82L76.0,26.25L78.0,26.51L80.0,26.60L82.0,26.51L84.0,26.25L86.0,25.82L88.0,25.25L90.0,24.56L92.0,23.76L94.0,22.90L96.0,22.00L98.0,21.10L100.0,20.24L102.0,19.44L104.0,18.75L106.0,18.18L108.0,17.75L110.0,17.49L112.0,17.40L114.0,17.49L116.0,17.75L118.0,18.18L120.0,18.75L122.0,19.44L124.0,20.24L126.0,21.10L128.0,22.00"/>
      </g>
    </g>
  </g>
  <circle class="tide-rim" cx="32" cy="32" r="30"/>
</svg>`,
  'gooey': `<svg xmlns="http://www.w3.org/2000/svg" class="goo" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .goo-bound { stroke: currentColor; stroke-width: 1; opacity: .14; }

    .goo-arm {
      transform-box: view-box;
      transform-origin: center;
      animation: goo-swing calc(var(--dur) * var(--rate, 1)) linear infinite;
    }

    .goo-core {
      transform-box: view-box;
      transform-origin: center;
      animation: goo-breathe calc(3.2s * var(--rate, 1)) ease-in-out infinite;
    }

    @keyframes goo-swing   { from { transform: rotate(0deg); } to { transform: rotate(calc(var(--dir) * 360deg)); } }
    @keyframes goo-breathe { 0%, 100% { transform: scale(.82); } 50% { transform: scale(1.05); } }

    @media (prefers-reduced-motion: reduce) {
      .goo-arm  { animation: none; transform: rotate(var(--rest)); }
      .goo-core { animation: none; transform: scale(1); }
    }
  </style>

  <defs>
    <filter id="goo-weld" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2.6" result="soft"/>
      <feColorMatrix in="soft" type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 19 -8"/>
    </filter>
  </defs>
  <circle class="goo-bound" cx="32" cy="32" r="30"/>
  <g filter="url(#goo-weld)" fill="currentColor">
    <circle class="goo-core" cx="32" cy="32" r="9.5"/>
    <g class="goo-arm" style="--dur:2.8s;--dir:1;--rest:20deg"><circle cx="32" cy="21" r="7"/></g>
    <g class="goo-arm" style="--dur:3.6s;--dir:-1;--rest:140deg"><circle cx="32" cy="17.5" r="5.5"/></g>
    <g class="goo-arm" style="--dur:2.2s;--dir:1;--rest:255deg"><circle cx="32" cy="23" r="4.6"/></g>
    <g class="goo-arm" style="--dur:4.4s;--dir:-1;--rest:310deg"><circle cx="32" cy="16" r="4"/></g>
  </g>
</svg>`,
  'rotor': `<svg xmlns="http://www.w3.org/2000/svg" class="rot" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .rot { --dur: 7s; }

    .rot-track { stroke: currentColor; stroke-width: 1; opacity: .12; }

    .rot-band {
      transform-box: view-box;
      transform-origin: center;
      animation: rot-turn calc(var(--dur) * var(--rate, 1)) linear infinite;
    }

    .rot-legend {
      fill: currentColor;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 6px;
      font-weight: 600;
      opacity: .9;
    }

    /* a short arc the other way, so the two rates read separately */
    .rot-marker {
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-dasharray: 12 88;
      transform-box: view-box;
      transform-origin: center;
      opacity: .85;
      animation: rot-counter calc(var(--dur) * var(--rate, 1) / 2.5) linear infinite;
    }

    .rot-pip {
      fill: currentColor;
      animation: rot-pip calc(2s * var(--rate, 1)) ease-in-out infinite;
    }

    @keyframes rot-turn    { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes rot-counter { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
    @keyframes rot-pip     { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }

    @media (prefers-reduced-motion: reduce) {
      .rot-band   { animation: none; }
      .rot-marker { animation: none; transform: rotate(-42deg); }
      .rot-pip    { animation: none; opacity: .8; }
    }
  </style>

  <defs>
    <path id="rot-ring" d="M32,9 a23,23 0 1,1 -0.01,0"/>
  </defs>
  <circle class="rot-track" cx="32" cy="32" r="30"/>
  <g class="rot-band">
    <text class="rot-legend">
      <textPath href="#rot-ring" textLength="144.51" lengthAdjust="spacing">THINKING · WORKING · READING · </textPath>
    </text>
  </g>
  <circle class="rot-marker" cx="32" cy="32" r="30" pathLength="100"/>
  <circle class="rot-pip" cx="32" cy="32" r="2.4"/>
</svg>`,
  'tunnel': `<svg xmlns="http://www.w3.org/2000/svg" class="tun" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .tun { --dur: 3s; --n: 6; }

    .tun-hoop {
      stroke: currentColor;
      animation: tun-out calc(var(--dur) * var(--rate, 1)) cubic-bezier(.55, 0, .85, .4) infinite;
      animation-delay: calc(var(--i) * var(--dur) * var(--rate, 1) / var(--n) * -1);
    }

    .tun-eye { fill: currentColor; opacity: .5; }

    /* radius and weight grow together - a near hoop is larger and heavier */
    @keyframes tun-out {
      0%   { r: 1.5px; stroke-width: .5; opacity: 0; }
      14%  { opacity: .95; }
      78%  { opacity: .5; }
      100% { r: 31px;  stroke-width: 2.4; opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .tun-hoop {
        animation: none;
        r: var(--rest);
        stroke-width: 1;
        opacity: calc(.9 - var(--i) * .11);
      }
    }
  </style>

  <circle class="tun-hoop" cx="32" cy="32" r="2" style="--i:0;--rest:1.5px"/>
  <circle class="tun-hoop" cx="32" cy="32" r="2" style="--i:1;--rest:6.17px"/>
  <circle class="tun-hoop" cx="32" cy="32" r="2" style="--i:2;--rest:10.83px"/>
  <circle class="tun-hoop" cx="32" cy="32" r="2" style="--i:3;--rest:15.5px"/>
  <circle class="tun-hoop" cx="32" cy="32" r="2" style="--i:4;--rest:20.17px"/>
  <circle class="tun-hoop" cx="32" cy="32" r="2" style="--i:5;--rest:24.83px"/>
  <circle class="tun-eye" cx="32" cy="32" r="1.4"/>
</svg>`,
  'cardioid': `<svg xmlns="http://www.w3.org/2000/svg" class="cdd" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .cdd { --dur: 2.6s; --n: 44; }

    .cdd-hoop { stroke: currentColor; stroke-width: 1; opacity: .18; }

    .cdd-web {
      transform-box: view-box;
      transform-origin: center;
      animation: cdd-turn calc(var(--dur) * var(--rate, 1) * 6) linear infinite;
    }

    /* chord i joins point i to point 2i; the cardioid is the envelope those
       straight lines leave behind - nothing ever draws the curve */
    .cdd-chord {
      stroke: currentColor;
      stroke-width: .65;
      opacity: .2;
      animation: cdd-light calc(var(--dur) * var(--rate, 1)) ease-in-out infinite;
      animation-delay: calc(var(--i) * var(--dur) * var(--rate, 1) / var(--n) * -1);
    }

    @keyframes cdd-light { 0%, 100% { opacity: .16; } 50% { opacity: .95; } }
    @keyframes cdd-turn  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    @media (prefers-reduced-motion: reduce) {
      .cdd-chord { animation: none; opacity: .42; }
      .cdd-web   { animation: none; }
    }
  </style>

  <circle class="cdd-hoop" cx="32" cy="32" r="29"/>
  <g class="cdd-web">
    <line class="cdd-chord" x1="32.00" y1="3.00" x2="32.00" y2="3.00" style="--i:0"/>
    <line class="cdd-chord" x1="36.13" y1="3.30" x2="40.17" y2="4.17" style="--i:1"/>
    <line class="cdd-chord" x1="40.17" y1="4.17" x2="47.68" y2="7.60" style="--i:2"/>
    <line class="cdd-chord" x1="44.05" y1="5.62" x2="53.92" y2="13.01" style="--i:3"/>
    <line class="cdd-chord" x1="47.68" y1="7.60" x2="58.38" y2="19.95" style="--i:4"/>
    <line class="cdd-chord" x1="50.99" y1="10.08" x2="60.70" y2="27.87" style="--i:5"/>
    <line class="cdd-chord" x1="53.92" y1="13.01" x2="60.70" y2="36.13" style="--i:6"/>
    <line class="cdd-chord" x1="56.40" y1="16.32" x2="58.38" y2="44.05" style="--i:7"/>
    <line class="cdd-chord" x1="58.38" y1="19.95" x2="53.92" y2="50.99" style="--i:8"/>
    <line class="cdd-chord" x1="59.83" y1="23.83" x2="47.68" y2="56.40" style="--i:9"/>
    <line class="cdd-chord" x1="60.70" y1="27.87" x2="40.17" y2="59.83" style="--i:10"/>
    <line class="cdd-chord" x1="61.00" y1="32.00" x2="32.00" y2="61.00" style="--i:11"/>
    <line class="cdd-chord" x1="60.70" y1="36.13" x2="23.83" y2="59.83" style="--i:12"/>
    <line class="cdd-chord" x1="59.83" y1="40.17" x2="16.32" y2="56.40" style="--i:13"/>
    <line class="cdd-chord" x1="58.38" y1="44.05" x2="10.08" y2="50.99" style="--i:14"/>
    <line class="cdd-chord" x1="56.40" y1="47.68" x2="5.62" y2="44.05" style="--i:15"/>
    <line class="cdd-chord" x1="53.92" y1="50.99" x2="3.30" y2="36.13" style="--i:16"/>
    <line class="cdd-chord" x1="50.99" y1="53.92" x2="3.30" y2="27.87" style="--i:17"/>
    <line class="cdd-chord" x1="47.68" y1="56.40" x2="5.62" y2="19.95" style="--i:18"/>
    <line class="cdd-chord" x1="44.05" y1="58.38" x2="10.08" y2="13.01" style="--i:19"/>
    <line class="cdd-chord" x1="40.17" y1="59.83" x2="16.32" y2="7.60" style="--i:20"/>
    <line class="cdd-chord" x1="36.13" y1="60.70" x2="23.83" y2="4.17" style="--i:21"/>
    <line class="cdd-chord" x1="32.00" y1="61.00" x2="32.00" y2="3.00" style="--i:22"/>
    <line class="cdd-chord" x1="27.87" y1="60.70" x2="40.17" y2="4.17" style="--i:23"/>
    <line class="cdd-chord" x1="23.83" y1="59.83" x2="47.68" y2="7.60" style="--i:24"/>
    <line class="cdd-chord" x1="19.95" y1="58.38" x2="53.92" y2="13.01" style="--i:25"/>
    <line class="cdd-chord" x1="16.32" y1="56.40" x2="58.38" y2="19.95" style="--i:26"/>
    <line class="cdd-chord" x1="13.01" y1="53.92" x2="60.70" y2="27.87" style="--i:27"/>
    <line class="cdd-chord" x1="10.08" y1="50.99" x2="60.70" y2="36.13" style="--i:28"/>
    <line class="cdd-chord" x1="7.60" y1="47.68" x2="58.38" y2="44.05" style="--i:29"/>
    <line class="cdd-chord" x1="5.62" y1="44.05" x2="53.92" y2="50.99" style="--i:30"/>
    <line class="cdd-chord" x1="4.17" y1="40.17" x2="47.68" y2="56.40" style="--i:31"/>
    <line class="cdd-chord" x1="3.30" y1="36.13" x2="40.17" y2="59.83" style="--i:32"/>
    <line class="cdd-chord" x1="3.00" y1="32.00" x2="32.00" y2="61.00" style="--i:33"/>
    <line class="cdd-chord" x1="3.30" y1="27.87" x2="23.83" y2="59.83" style="--i:34"/>
    <line class="cdd-chord" x1="4.17" y1="23.83" x2="16.32" y2="56.40" style="--i:35"/>
    <line class="cdd-chord" x1="5.62" y1="19.95" x2="10.08" y2="50.99" style="--i:36"/>
    <line class="cdd-chord" x1="7.60" y1="16.32" x2="5.62" y2="44.05" style="--i:37"/>
    <line class="cdd-chord" x1="10.08" y1="13.01" x2="3.30" y2="36.13" style="--i:38"/>
    <line class="cdd-chord" x1="13.01" y1="10.08" x2="3.30" y2="27.87" style="--i:39"/>
    <line class="cdd-chord" x1="16.32" y1="7.60" x2="5.62" y2="19.95" style="--i:40"/>
    <line class="cdd-chord" x1="19.95" y1="5.62" x2="10.08" y2="13.01" style="--i:41"/>
    <line class="cdd-chord" x1="23.83" y1="4.17" x2="16.32" y2="7.60" style="--i:42"/>
    <line class="cdd-chord" x1="27.87" y1="3.30" x2="23.83" y2="4.17" style="--i:43"/>
  </g>
</svg>`,
  'constellation': `<svg xmlns="http://www.w3.org/2000/svg" class="con" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .con { --dur: 2.4s; --step: .2s; }

    .con-bound { stroke: currentColor; stroke-width: 1; opacity: .1; }

    /* delays come from hop count, so the pulse spreads through the graph
       rather than sweeping across the picture */
    .con-link {
      stroke: currentColor;
      stroke-width: .7;
      opacity: .16;
      animation: con-carry calc(var(--dur) * var(--rate, 1)) ease-out infinite;
      animation-delay: calc(var(--h) * var(--step) * var(--rate, 1));
    }

    .con-node {
      fill: currentColor;
      opacity: .35;
      transform-box: fill-box;
      transform-origin: center;
      animation: con-fire calc(var(--dur) * var(--rate, 1)) ease-out infinite;
      animation-delay: calc(var(--h) * var(--step) * var(--rate, 1));
    }

    .con-seed { opacity: .7; }

    @keyframes con-carry { 0% { opacity: .9; } 30% { opacity: .22; } 100% { opacity: .16; } }
    @keyframes con-fire  { 0% { opacity: 1; transform: scale(1.45); } 35% { opacity: .45; transform: scale(1); } 100% { opacity: .35; transform: scale(1); } }

    @media (prefers-reduced-motion: reduce) {
      .con-link { animation: none; opacity: .28; }
      .con-node { animation: none; opacity: calc(.85 - var(--h) * .12); }
    }
  </style>

  <circle class="con-bound" cx="32" cy="32" r="30"/>
  <line class="con-link" x1="31.26" y1="56.57" x2="37.31" y2="44.56" style="--h:2"/>
  <line class="con-link" x1="31.26" y1="56.57" x2="17.60" y2="47.27" style="--h:2"/>
  <line class="con-link" x1="31.26" y1="56.57" x2="25.09" y2="38.70" style="--h:2"/>
  <line class="con-link" x1="41.24" y1="28.64" x2="53.04" y2="19.01" style="--h:2"/>
  <line class="con-link" x1="41.24" y1="28.64" x2="37.31" y2="44.56" style="--h:2"/>
  <line class="con-link" x1="41.24" y1="28.64" x2="32.00" y2="22.43" style="--h:1"/>
  <line class="con-link" x1="41.24" y1="28.64" x2="44.02" y2="12.95" style="--h:1"/>
  <line class="con-link" x1="41.24" y1="28.64" x2="25.09" y2="38.70" style="--h:1"/>
  <line class="con-link" x1="53.04" y1="19.01" x2="44.02" y2="12.95" style="--h:2"/>
  <line class="con-link" x1="12.10" y1="38.52" x2="19.90" y2="22.96" style="--h:2"/>
  <line class="con-link" x1="12.10" y1="38.52" x2="17.60" y2="47.27" style="--h:2"/>
  <line class="con-link" x1="12.10" y1="38.52" x2="25.09" y2="38.70" style="--h:2"/>
  <line class="con-link" x1="37.31" y1="44.56" x2="17.60" y2="47.27" style="--h:2"/>
  <line class="con-link" x1="37.31" y1="44.56" x2="53.05" y2="46.45" style="--h:3"/>
  <line class="con-link" x1="37.31" y1="44.56" x2="25.09" y2="38.70" style="--h:2"/>
  <line class="con-link" x1="19.90" y1="22.96" x2="32.00" y2="22.43" style="--h:1"/>
  <line class="con-link" x1="19.90" y1="22.96" x2="25.09" y2="38.70" style="--h:1"/>
  <line class="con-link" x1="17.60" y1="47.27" x2="25.09" y2="38.70" style="--h:2"/>
  <line class="con-link" x1="32.00" y1="22.43" x2="44.02" y2="12.95" style="--h:1"/>
  <line class="con-link" x1="32.00" y1="22.43" x2="25.09" y2="38.70" style="--h:1"/>
  <circle class="con-node" cx="31.26" cy="56.57" r="1.7" style="--h:2"/>
  <circle class="con-node" cx="41.24" cy="28.64" r="1.7" style="--h:1"/>
  <circle class="con-node" cx="53.04" cy="19.01" r="1.7" style="--h:2"/>
  <circle class="con-node" cx="12.10" cy="38.52" r="1.7" style="--h:2"/>
  <circle class="con-node" cx="37.31" cy="44.56" r="1.7" style="--h:2"/>
  <circle class="con-node" cx="19.90" cy="22.96" r="1.7" style="--h:1"/>
  <circle class="con-node" cx="17.60" cy="47.27" r="1.7" style="--h:2"/>
  <circle class="con-node" cx="53.05" cy="46.45" r="1.7" style="--h:3"/>
  <circle class="con-node con-seed" cx="32.00" cy="22.43" r="2.3" style="--h:0"/>
  <circle class="con-node" cx="44.02" cy="12.95" r="1.7" style="--h:1"/>
  <circle class="con-node" cx="25.09" cy="38.70" r="1.7" style="--h:1"/>
</svg>`,
  'volute': `<svg xmlns="http://www.w3.org/2000/svg" class="vol" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .vol { --dur: 3.4s; }

    .vol-ghost, .vol-line { stroke: currentColor; fill: none; stroke-linecap: round; }
    .vol-ghost { stroke-width: .8; opacity: .14; }

    .vol-rig {
      transform-box: view-box;
      transform-origin: center;
      animation: vol-turn calc(var(--dur) * var(--rate, 1) * 2.4) linear infinite;
    }

    /* one dash as long as the path: run its offset past zero and the tail
       eats exactly what the head drew */
    .vol-line {
      stroke-width: 1.9;
      stroke-dasharray: 100 100;
      stroke-dashoffset: 100;
      animation: vol-draw calc(var(--dur) * var(--rate, 1)) infinite;
    }

    @keyframes vol-draw {
      0%   { stroke-dashoffset: 100;  animation-timing-function: cubic-bezier(.5, 0, .5, 1); }
      50%  { stroke-dashoffset: 0;    animation-timing-function: cubic-bezier(.5, 0, .5, 1); }
      100% { stroke-dashoffset: -100; }
    }

    @keyframes vol-turn { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    @media (prefers-reduced-motion: reduce) {
      .vol-line { animation: none; stroke-dashoffset: 0; }
      .vol-rig  { animation: none; }
    }
  </style>

  <path class="vol-ghost" d="M32.0,30.8L32.2,30.6L32.4,30.5L32.7,30.4L33.0,30.3L33.3,30.3L33.7,30.4L34.0,30.6L34.4,30.8L34.7,31.0L35.0,31.4L35.2,31.8L35.4,32.2L35.5,32.7L35.6,33.2L35.5,33.8L35.4,34.4L35.2,34.9L34.9,35.5L34.5,36.0L34.0,36.5L33.4,36.9L32.8,37.2L32.1,37.5L31.3,37.6L30.5,37.6L29.7,37.5L28.8,37.3L28.0,37.0L27.3,36.6L26.5,36.0L25.9,35.3L25.3,34.5L24.9,33.6L24.5,32.6L24.3,31.6L24.3,30.5L24.4,29.4L24.6,28.3L25.0,27.3L25.6,26.2L26.3,25.3L27.2,24.4L28.2,23.7L29.3,23.0L30.5,22.6L31.8,22.3L33.1,22.2L34.5,22.2L35.9,22.5L37.2,22.9L38.5,23.6L39.7,24.4L40.8,25.4L41.8,26.6L42.6,27.9L43.3,29.4L43.7,30.9L43.9,32.5L43.9,34.1L43.7,35.8L43.3,37.4L42.6,39.0L41.7,40.5L40.5,41.9L39.2,43.1L37.7,44.2L36.1,45.0L34.3,45.6L32.4,46.0L30.5,46.1L28.6,45.9L26.6,45.5L24.8,44.8L23.0,43.9L21.3,42.7L19.8,41.2L18.5,39.6L17.4,37.8L16.6,35.8L16.1,33.7L15.8,31.5L15.8,29.3L16.2,27.0L16.8,24.9L17.8,22.8L19.0,20.8L20.5,19.0L22.3,17.4L24.3,16.1L26.5,15.0L28.8,14.2L31.2,13.8L33.7,13.6L36.3,13.9L38.7,14.4L41.1,15.4L43.4,16.6L45.5,18.2L47.4,20.0L49.1,22.1L50.4,24.5L51.5,27.0L52.2,29.7L52.5,32.4L52.4,35.2L52.0,38.0L51.1,40.8L49.9,43.4L48.3,45.8L46.4,48.0L44.2,50.0L41.8,51.7L39.1,53.0L36.2,53.9L33.2,54.5L30.1,54.6L27.0,54.3L24.0,53.6L21.0,52.5L18.2,51.0L15.6,49.1L13.3,46.8L11.3,44.2L9.7,41.4L8.5,38.3L7.6,35.1L7.3,31.7L7.3,28.4L7.9,25.0L8.9,21.7L10.3,18.6L12.2,15.6L14.5,13.0L17.1,10.6L20.1,8.6L23.3,7.1L26.7,5.9L30.3,5.3L34.0,5.1L37.6,5.4L41.3,6.3L44.7,7.6L48.0,9.4L51.1,11.7L53.8,14.3L56.2,17.4L58.1,20.7L59.6,24.3L60.5,28.1L61.0,32.0"/>
  <g class="vol-rig"><path class="vol-line" d="M32.0,30.8L32.2,30.6L32.4,30.5L32.7,30.4L33.0,30.3L33.3,30.3L33.7,30.4L34.0,30.6L34.4,30.8L34.7,31.0L35.0,31.4L35.2,31.8L35.4,32.2L35.5,32.7L35.6,33.2L35.5,33.8L35.4,34.4L35.2,34.9L34.9,35.5L34.5,36.0L34.0,36.5L33.4,36.9L32.8,37.2L32.1,37.5L31.3,37.6L30.5,37.6L29.7,37.5L28.8,37.3L28.0,37.0L27.3,36.6L26.5,36.0L25.9,35.3L25.3,34.5L24.9,33.6L24.5,32.6L24.3,31.6L24.3,30.5L24.4,29.4L24.6,28.3L25.0,27.3L25.6,26.2L26.3,25.3L27.2,24.4L28.2,23.7L29.3,23.0L30.5,22.6L31.8,22.3L33.1,22.2L34.5,22.2L35.9,22.5L37.2,22.9L38.5,23.6L39.7,24.4L40.8,25.4L41.8,26.6L42.6,27.9L43.3,29.4L43.7,30.9L43.9,32.5L43.9,34.1L43.7,35.8L43.3,37.4L42.6,39.0L41.7,40.5L40.5,41.9L39.2,43.1L37.7,44.2L36.1,45.0L34.3,45.6L32.4,46.0L30.5,46.1L28.6,45.9L26.6,45.5L24.8,44.8L23.0,43.9L21.3,42.7L19.8,41.2L18.5,39.6L17.4,37.8L16.6,35.8L16.1,33.7L15.8,31.5L15.8,29.3L16.2,27.0L16.8,24.9L17.8,22.8L19.0,20.8L20.5,19.0L22.3,17.4L24.3,16.1L26.5,15.0L28.8,14.2L31.2,13.8L33.7,13.6L36.3,13.9L38.7,14.4L41.1,15.4L43.4,16.6L45.5,18.2L47.4,20.0L49.1,22.1L50.4,24.5L51.5,27.0L52.2,29.7L52.5,32.4L52.4,35.2L52.0,38.0L51.1,40.8L49.9,43.4L48.3,45.8L46.4,48.0L44.2,50.0L41.8,51.7L39.1,53.0L36.2,53.9L33.2,54.5L30.1,54.6L27.0,54.3L24.0,53.6L21.0,52.5L18.2,51.0L15.6,49.1L13.3,46.8L11.3,44.2L9.7,41.4L8.5,38.3L7.6,35.1L7.3,31.7L7.3,28.4L7.9,25.0L8.9,21.7L10.3,18.6L12.2,15.6L14.5,13.0L17.1,10.6L20.1,8.6L23.3,7.1L26.7,5.9L30.3,5.3L34.0,5.1L37.6,5.4L41.3,6.3L44.7,7.6L48.0,9.4L51.1,11.7L53.8,14.3L56.2,17.4L58.1,20.7L59.6,24.3L60.5,28.1L61.0,32.0" pathLength="100"/></g>
</svg>`,
  'escapement': `<svg xmlns="http://www.w3.org/2000/svg" class="esc" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .esc { --dur: 2s; --swing: 38deg; }

    .esc-arc { stroke: currentColor; stroke-width: 1; stroke-dasharray: 2 3; fill: none; opacity: .14; }

    /* two ghosts run the same swing a beat behind the live arm, which is what
       gives the turn at each extreme its weight */
    .esc-arm {
      transform-box: view-box;
      transform-origin: 50% 12.5%;
      animation: esc-swing calc(var(--dur) * var(--rate, 1)) cubic-bezier(.42, 0, .58, 1) infinite;
    }

    .esc-ghost {
      opacity: var(--fade);
      animation-delay: calc(var(--lag) * var(--dur) * var(--rate, 1) * -1);
    }

    .esc-rod { stroke: currentColor; stroke-width: 1; opacity: .55; }
    .esc-bob { fill: currentColor; }
    .esc-pivot { fill: currentColor; opacity: .55; }

    @keyframes esc-swing {
      0%, 100% { transform: rotate(calc(var(--swing) * -1)); }
      50%      { transform: rotate(var(--swing)); }
    }

    @media (prefers-reduced-motion: reduce) {
      .esc-live  { animation: none; transform: rotate(calc(var(--swing) * .55)); }
      .esc-ghost { animation: none; transform: rotate(calc(var(--swing) * .34)); }
    }
  </style>

  <circle class="esc-arc" cx="32" cy="32" r="26"/>
    <g class="esc-arm esc-ghost" style="--lag:0.08;--fade:0.34">
      <line class="esc-rod" x1="32" y1="8.0" x2="32" y2="52.0"/>
      <circle class="esc-bob" cx="32" cy="52.0" r="3.6"/>
    </g>
    <g class="esc-arm esc-ghost" style="--lag:0.16;--fade:0.16">
      <line class="esc-rod" x1="32" y1="8.0" x2="32" y2="52.0"/>
      <circle class="esc-bob" cx="32" cy="52.0" r="3.6"/>
    </g>
  <g class="esc-arm esc-live">
    <line class="esc-rod" x1="32" y1="8" x2="32" y2="52"/>
    <circle class="esc-bob" cx="32" cy="52" r="3.6"/>
  </g>
  <circle class="esc-pivot" cx="32" cy="8" r="1.6"/>
</svg>`,
  'venetian': `<svg xmlns="http://www.w3.org/2000/svg" class="ven" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .ven { --dur: 2.6s; --n: 9; }

    /* a slat turning on its long axis projects to height H|cos t|, so it
       genuinely goes edge-on and vanishes rather than fading out */
    .ven-slat {
      fill: url(#ven-face);
      transform-box: fill-box;
      transform-origin: center;
      animation: ven-turn calc(var(--dur) * var(--rate, 1)) infinite;
      animation-delay: calc(var(--i) * var(--dur) * var(--rate, 1) / var(--n) * -1);
    }

    @keyframes ven-turn {
      0%   { transform: scaleY(1);  opacity: 1;  animation-timing-function: ease-in; }
      50%  { transform: scaleY(.02); opacity: .5; animation-timing-function: ease-out; }
      100% { transform: scaleY(1);  opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
      .ven-slat {
        animation: none;
        transform: scaleY(calc(.15 + .85 * (1 - var(--i) / var(--n))));
      }
    }
  </style>

  <defs>
    <clipPath id="ven-disc"><circle cx="32" cy="32" r="32"/></clipPath>
    <linearGradient id="ven-face" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="currentColor" stop-opacity=".55"/>
      <stop offset="100%" stop-color="currentColor" stop-opacity=".08"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#ven-disc)">
    <rect class="ven-slat" x="-2" y="0.00" width="68" height="7.11" style="--i:0;--rest:0.0"/>
    <rect class="ven-slat" x="-2" y="7.11" width="68" height="7.11" style="--i:1;--rest:40.0"/>
    <rect class="ven-slat" x="-2" y="14.22" width="68" height="7.11" style="--i:2;--rest:80.0"/>
    <rect class="ven-slat" x="-2" y="21.33" width="68" height="7.11" style="--i:3;--rest:120.0"/>
    <rect class="ven-slat" x="-2" y="28.44" width="68" height="7.11" style="--i:4;--rest:160.0"/>
    <rect class="ven-slat" x="-2" y="35.56" width="68" height="7.11" style="--i:5;--rest:200.0"/>
    <rect class="ven-slat" x="-2" y="42.67" width="68" height="7.11" style="--i:6;--rest:240.0"/>
    <rect class="ven-slat" x="-2" y="49.78" width="68" height="7.11" style="--i:7;--rest:280.0"/>
    <rect class="ven-slat" x="-2" y="56.89" width="68" height="7.11" style="--i:8;--rest:320.0"/>
  </g>
</svg>`,
  'helix': `<svg xmlns="http://www.w3.org/2000/svg" class="hel" viewBox="0 0 64 64" width="96" height="96" fill="none" role="img" aria-label="Loading">
  <style>
    /* Two knobs: color is the ink, --rate multiplies every duration. */
    svg { color: #f5f5f7; --rate: 1; }

    .hel { --dur: 3.4s; }

    /* the path holds two identical periods, so sliding exactly one period
       loops with no seam */
    .hel-run { animation: hel-run calc(var(--dur) * var(--rate, 1)) linear infinite; }

    .hel-strand { fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; }
    .hel-front  { opacity: 1; }
    .hel-back   { opacity: .42; stroke-width: 1.1; }

    /* each rung is drawn at the strands' true separation, so the ladder
       narrows to nothing at every crossing and opens again */
    .hel-rung { stroke: currentColor; stroke-width: .9; opacity: .26; }

    .hel-rim { stroke: currentColor; stroke-width: 1; opacity: .14; }

    @keyframes hel-run { from { transform: translateX(0); } to { transform: translateX(-64px); } }

    @media (prefers-reduced-motion: reduce) {
      .hel-run { animation: none; transform: translateX(-16px); }
    }
  </style>

  <defs>
    <clipPath id="hel-tube"><circle cx="32" cy="32" r="30"/></clipPath>
  </defs>
  <g clip-path="url(#hel-tube)">
    <g class="hel-run">
    <line class="hel-rung" x1="2.0" y1="28.68" x2="2.0" y2="35.32"/>
    <line class="hel-rung" x1="4.0" y1="25.49" x2="4.0" y2="38.51"/>
    <line class="hel-rung" x1="6.0" y1="22.56" x2="6.0" y2="41.44"/>
    <line class="hel-rung" x1="8.0" y1="19.98" x2="8.0" y2="44.02"/>
    <line class="hel-rung" x1="10.0" y1="17.87" x2="10.0" y2="46.13"/>
    <line class="hel-rung" x1="12.0" y1="16.29" x2="12.0" y2="47.71"/>
    <line class="hel-rung" x1="14.0" y1="15.33" x2="14.0" y2="48.67"/>
    <line class="hel-rung" x1="16.0" y1="15.00" x2="16.0" y2="49.00"/>
    <line class="hel-rung" x1="18.0" y1="15.33" x2="18.0" y2="48.67"/>
    <line class="hel-rung" x1="20.0" y1="16.29" x2="20.0" y2="47.71"/>
    <line class="hel-rung" x1="22.0" y1="17.87" x2="22.0" y2="46.13"/>
    <line class="hel-rung" x1="24.0" y1="19.98" x2="24.0" y2="44.02"/>
    <line class="hel-rung" x1="26.0" y1="22.56" x2="26.0" y2="41.44"/>
    <line class="hel-rung" x1="28.0" y1="25.49" x2="28.0" y2="38.51"/>
    <line class="hel-rung" x1="30.0" y1="28.68" x2="30.0" y2="35.32"/>
    <line class="hel-rung" x1="34.0" y1="28.68" x2="34.0" y2="35.32"/>
    <line class="hel-rung" x1="36.0" y1="25.49" x2="36.0" y2="38.51"/>
    <line class="hel-rung" x1="38.0" y1="22.56" x2="38.0" y2="41.44"/>
    <line class="hel-rung" x1="40.0" y1="19.98" x2="40.0" y2="44.02"/>
    <line class="hel-rung" x1="42.0" y1="17.87" x2="42.0" y2="46.13"/>
    <line class="hel-rung" x1="44.0" y1="16.29" x2="44.0" y2="47.71"/>
    <line class="hel-rung" x1="46.0" y1="15.33" x2="46.0" y2="48.67"/>
    <line class="hel-rung" x1="48.0" y1="15.00" x2="48.0" y2="49.00"/>
    <line class="hel-rung" x1="50.0" y1="15.33" x2="50.0" y2="48.67"/>
    <line class="hel-rung" x1="52.0" y1="16.29" x2="52.0" y2="47.71"/>
    <line class="hel-rung" x1="54.0" y1="17.87" x2="54.0" y2="46.13"/>
    <line class="hel-rung" x1="56.0" y1="19.98" x2="56.0" y2="44.02"/>
    <line class="hel-rung" x1="58.0" y1="22.56" x2="58.0" y2="41.44"/>
    <line class="hel-rung" x1="60.0" y1="25.49" x2="60.0" y2="38.51"/>
    <line class="hel-rung" x1="62.0" y1="28.68" x2="62.0" y2="35.32"/>
    <line class="hel-rung" x1="66.0" y1="28.68" x2="66.0" y2="35.32"/>
    <line class="hel-rung" x1="68.0" y1="25.49" x2="68.0" y2="38.51"/>
    <line class="hel-rung" x1="70.0" y1="22.56" x2="70.0" y2="41.44"/>
    <line class="hel-rung" x1="72.0" y1="19.98" x2="72.0" y2="44.02"/>
    <line class="hel-rung" x1="74.0" y1="17.87" x2="74.0" y2="46.13"/>
    <line class="hel-rung" x1="76.0" y1="16.29" x2="76.0" y2="47.71"/>
    <line class="hel-rung" x1="78.0" y1="15.33" x2="78.0" y2="48.67"/>
    <line class="hel-rung" x1="80.0" y1="15.00" x2="80.0" y2="49.00"/>
    <line class="hel-rung" x1="82.0" y1="15.33" x2="82.0" y2="48.67"/>
    <line class="hel-rung" x1="84.0" y1="16.29" x2="84.0" y2="47.71"/>
    <line class="hel-rung" x1="86.0" y1="17.87" x2="86.0" y2="46.13"/>
    <line class="hel-rung" x1="88.0" y1="19.98" x2="88.0" y2="44.02"/>
    <line class="hel-rung" x1="90.0" y1="22.56" x2="90.0" y2="41.44"/>
    <line class="hel-rung" x1="92.0" y1="25.49" x2="92.0" y2="38.51"/>
    <line class="hel-rung" x1="94.0" y1="28.68" x2="94.0" y2="35.32"/>
    <line class="hel-rung" x1="98.0" y1="28.68" x2="98.0" y2="35.32"/>
    <line class="hel-rung" x1="100.0" y1="25.49" x2="100.0" y2="38.51"/>
    <line class="hel-rung" x1="102.0" y1="22.56" x2="102.0" y2="41.44"/>
    <line class="hel-rung" x1="104.0" y1="19.98" x2="104.0" y2="44.02"/>
    <line class="hel-rung" x1="106.0" y1="17.87" x2="106.0" y2="46.13"/>
    <line class="hel-rung" x1="108.0" y1="16.29" x2="108.0" y2="47.71"/>
    <line class="hel-rung" x1="110.0" y1="15.33" x2="110.0" y2="48.67"/>
    <line class="hel-rung" x1="112.0" y1="15.00" x2="112.0" y2="49.00"/>
    <line class="hel-rung" x1="114.0" y1="15.33" x2="114.0" y2="48.67"/>
    <line class="hel-rung" x1="116.0" y1="16.29" x2="116.0" y2="47.71"/>
    <line class="hel-rung" x1="118.0" y1="17.87" x2="118.0" y2="46.13"/>
    <line class="hel-rung" x1="120.0" y1="19.98" x2="120.0" y2="44.02"/>
    <line class="hel-rung" x1="122.0" y1="22.56" x2="122.0" y2="41.44"/>
    <line class="hel-rung" x1="124.0" y1="25.49" x2="124.0" y2="38.51"/>
    <line class="hel-rung" x1="126.0" y1="28.68" x2="126.0" y2="35.32"/>
      <path class="hel-strand hel-back"  d="M0.0,32.00L2.0,28.68L4.0,25.49L6.0,22.56L8.0,19.98L10.0,17.87L12.0,16.29L14.0,15.33L16.0,15.00L18.0,15.33L20.0,16.29L22.0,17.87L24.0,19.98L26.0,22.56L28.0,25.49L30.0,28.68L32.0,32.00L34.0,35.32L36.0,38.51L38.0,41.44L40.0,44.02L42.0,46.13L44.0,47.71L46.0,48.67L48.0,49.00L50.0,48.67L52.0,47.71L54.0,46.13L56.0,44.02L58.0,41.44L60.0,38.51L62.0,35.32L64.0,32.00L66.0,28.68L68.0,25.49L70.0,22.56L72.0,19.98L74.0,17.87L76.0,16.29L78.0,15.33L80.0,15.00L82.0,15.33L84.0,16.29L86.0,17.87L88.0,19.98L90.0,22.56L92.0,25.49L94.0,28.68L96.0,32.00L98.0,35.32L100.0,38.51L102.0,41.44L104.0,44.02L106.0,46.13L108.0,47.71L110.0,48.67L112.0,49.00L114.0,48.67L116.0,47.71L118.0,46.13L120.0,44.02L122.0,41.44L124.0,38.51L126.0,35.32L128.0,32.00"/>
      <path class="hel-strand hel-front" d="M0.0,32.00L2.0,35.32L4.0,38.51L6.0,41.44L8.0,44.02L10.0,46.13L12.0,47.71L14.0,48.67L16.0,49.00L18.0,48.67L20.0,47.71L22.0,46.13L24.0,44.02L26.0,41.44L28.0,38.51L30.0,35.32L32.0,32.00L34.0,28.68L36.0,25.49L38.0,22.56L40.0,19.98L42.0,17.87L44.0,16.29L46.0,15.33L48.0,15.00L50.0,15.33L52.0,16.29L54.0,17.87L56.0,19.98L58.0,22.56L60.0,25.49L62.0,28.68L64.0,32.00L66.0,35.32L68.0,38.51L70.0,41.44L72.0,44.02L74.0,46.13L76.0,47.71L78.0,48.67L80.0,49.00L82.0,48.67L84.0,47.71L86.0,46.13L88.0,44.02L90.0,41.44L92.0,38.51L94.0,35.32L96.0,32.00L98.0,28.68L100.0,25.49L102.0,22.56L104.0,19.98L106.0,17.87L108.0,16.29L110.0,15.33L112.0,15.00L114.0,15.33L116.0,16.29L118.0,17.87L120.0,19.98L122.0,22.56L124.0,25.49L126.0,28.68L128.0,32.00"/>
    </g>
  </g>
  <circle class="hel-rim" cx="32" cy="32" r="30"/>
</svg>`,
};

export const CircleLoader: React.FC<CircleLoaderProps> = ({
  variant = 'latitude',
  size = 32,
  ink,
  paper,
  speedMultiplier = 1,
  className = '',
  style = {},
  ...props
}) => {
  const svgHtml = SVGS[variant] || SVGS['latitude'];
  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    ...(ink ? { color: ink } : {}),
    ...(paper ? ({ ['--paper' as any]: paper } as any) : {}),
    ...(speedMultiplier !== 1 ? ({ ['--rate' as any]: speedMultiplier } as any) : {}),
    ...style,
  };

  return (
    <span
      className={`circle-loader circle-loader-${variant} ${className}`}
      style={containerStyle}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
      {...props}
    />
  );
};

export default CircleLoader;