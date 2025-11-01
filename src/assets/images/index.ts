/** Type for SVG content */
type SVGContent = string;

/** Object containing all SVG images used in the psychometric test */
export type Images = {
  /** Pattern of triangles used in visual memory questions */
  patternTriangles: SVGContent;
  /** Net pattern for cube folding questions */
  cubeNet: SVGContent;
  /** Different cube net patterns for spatial reasoning */
  cubePatterns: SVGContent;
  /** Number sequence pattern for numerical reasoning */
  numberPattern: SVGContent;
  /** Symbol sequence for pattern recognition */
  symbolSequence: SVGContent;
  /** Facial expression for emotional recognition */
  facialExpression: SVGContent;
};

// Import SVG files
import patternTrianglesSvg from './pattern-triangles.svg';
import cubeNetSvg from './cube-net.svg';
import numberPatternSvg from './number-pattern.svg';
import facialExpressionSvg from './facial-expression-1.svg';

// SVG content as strings with proper type assertions
export const images: Images = {
  patternTriangles: patternTrianglesSvg,
  cubeNet: cubeNetSvg,
  numberPattern: numberPatternSvg,
  facialExpression: facialExpressionSvg,
  // Keep the existing SVG strings for cubePatterns and symbolSequence
  cubePatterns: `<svg width="600" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f8fafc"/>
    <!-- Pattern A: Valid T-shaped net -->
    <g transform="translate(25,25)">
        <rect x="0" y="0" width="125" height="150" fill="none" stroke="#4f46e5" stroke-width="2"/>
        <g transform="translate(50,30)">
            <rect x="0" y="0" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="0" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="0" y="50" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="-25" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="25" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="0" y="75" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
        </g>
        <text x="62.5" y="135" text-anchor="middle" fill="#4f46e5" font-size="16">Pattern A</text>
    </g>
    <!-- Pattern B: Valid cross-shaped net -->
    <g transform="translate(175,25)">
        <rect x="0" y="0" width="125" height="150" fill="none" stroke="#4f46e5" stroke-width="2"/>
        <g transform="translate(50,30)">
            <rect x="0" y="0" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="0" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="0" y="50" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="-25" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="25" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="50" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
        </g>
        <text x="62.5" y="135" text-anchor="middle" fill="#4f46e5" font-size="16">Pattern B</text>
    </g>
    <!-- Pattern C: Invalid net (disconnected faces) -->
    <g transform="translate(325,25)">
        <rect x="0" y="0" width="125" height="150" fill="none" stroke="#4f46e5" stroke-width="2"/>
        <g transform="translate(50,30)">
            <rect x="0" y="0" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="0" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="0" y="75" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="-25" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="25" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="50" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
        </g>
        <text x="62.5" y="135" text-anchor="middle" fill="#4f46e5" font-size="16">Pattern C</text>
    </g>
    <!-- Pattern D: Valid L-shaped net -->
    <g transform="translate(475,25)">
        <rect x="0" y="0" width="125" height="150" fill="none" stroke="#4f46e5" stroke-width="2"/>
        <g transform="translate(50,30)">
            <rect x="0" y="0" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="0" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="0" y="50" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="0" y="75" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="25" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
            <rect x="50" y="25" width="25" height="25" fill="none" stroke="#4f46e5" stroke-width="1"/>
        </g>
        <text x="62.5" y="135" text-anchor="middle" fill="#4f46e5" font-size="16">Pattern D</text>
    </g>
</svg>`,
  symbolSequence: `<svg width="600" height="100" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f8fafc"/>
    <g transform="translate(50,20)" fill="#4f46e5">
        <text x="0" y="40" font-size="40">★ ◆ ▲ ■ ●</text>
    </g>
</svg>`,
} as const satisfies Images; 