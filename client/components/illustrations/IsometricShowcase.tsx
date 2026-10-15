import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Svg, {
  G,
  Path,
  Rect,
  Circle,
  Polygon,
  Defs,
  LinearGradient,
  Stop,
  Line,
} from "react-native-svg";
import { Theme } from "../../constants/theme";

// =========================================================================
// FIGURE 01: ROTARY MEDICATION VAULT
// An isometric cylindrical dispenser instrument with precision glass chamber,
// calibrated tick ruler, dosage slots, and optical status sensor.
// =========================================================================
export const RotaryMedicationVault: React.FC<{ width?: number; height?: number }> = ({
  width = 360,
  height = 240,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 380 260" fill="none">
      <Defs>
        <LinearGradient id="vaultBaseGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#F8FAFC" />
          <Stop offset="50%" stopColor="#E2E8F0" />
          <Stop offset="100%" stopColor="#CBD5E1" />
        </LinearGradient>
        <LinearGradient id="vaultChamberGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.85" />
          <Stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <Stop offset="70%" stopColor="#BAE6FD" stopOpacity="0.8" />
          <Stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.7" />
        </LinearGradient>
        <LinearGradient id="vaultCapGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="60%" stopColor="#E2E8F0" />
          <Stop offset="100%" stopColor="#94A3B8" />
        </LinearGradient>
        <LinearGradient id="pillGrad1" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#38BDF8" />
          <Stop offset="100%" stopColor="#0284C7" />
        </LinearGradient>
        <LinearGradient id="pillGrad2" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#34D399" />
          <Stop offset="100%" stopColor="#059669" />
        </LinearGradient>
      </Defs>

      {/* 1. Base Plate Halo / Shadow */}
      <Path
        d="M60 190 L190 248 L320 190 L190 132 Z"
        fill="#0F172A"
        fillOpacity="0.06"
      />

      {/* 2. Heavy Isometric Base Plate */}
      {/* Lower Thickness */}
      <Path
        d="M65 182 L190 238 L315 182 L315 194 L190 250 L65 194 Z"
        fill="#94A3B8"
        stroke="#64748B"
        strokeWidth="0.8"
      />
      {/* Top Slab Surface */}
      <Polygon
        points="65,182 190,126 315,182 190,238"
        fill="url(#vaultBaseGrad)"
        stroke="#CBD5E1"
        strokeWidth="1"
      />

      {/* Base Mounting Screw Dots */}
      <Circle cx="85" cy="182" r="2.2" fill="#64748B" />
      <Circle cx="190" cy="228" r="2.2" fill="#64748B" />
      <Circle cx="295" cy="182" r="2.2" fill="#64748B" />
      <Circle cx="190" cy="136" r="2.2" fill="#64748B" />

      {/* Calibrated Tick Ruler on front edge */}
      <Line x1="110" y1="202" x2="110" y2="207" stroke="#64748B" strokeWidth="1" />
      <Line x1="125" y1="209" x2="125" y2="213" stroke="#94A3B8" strokeWidth="0.8" />
      <Line x1="140" y1="216" x2="140" y2="220" stroke="#94A3B8" strokeWidth="0.8" />
      <Line x1="155" y1="223" x2="155" y2="227" stroke="#64748B" strokeWidth="1" />
      <Line x1="170" y1="229" x2="170" y2="233" stroke="#94A3B8" strokeWidth="0.8" />
      <Line x1="210" y1="229" x2="210" y2="233" stroke="#94A3B8" strokeWidth="0.8" />
      <Line x1="225" y1="223" x2="225" y2="227" stroke="#64748B" strokeWidth="1" />
      <Line x1="240" y1="216" x2="240" y2="220" stroke="#94A3B8" strokeWidth="0.8" />
      <Line x1="255" y1="209" x2="255" y2="213" stroke="#94A3B8" strokeWidth="0.8" />
      <Line x1="270" y1="202" x2="270" y2="207" stroke="#64748B" strokeWidth="1" />

      {/* 3. Lower Turntable Collar */}
      <Path
        d="M125 174 C125 186 255 186 255 174 L255 186 C255 198 125 198 125 186 Z"
        fill="#CBD5E1"
        stroke="#94A3B8"
        strokeWidth="0.8"
      />
      <Path
        d="M125 174 C125 162 255 162 255 174 C255 186 125 186 125 174 Z"
        fill="#E2E8F0"
        stroke="#94A3B8"
        strokeWidth="0.8"
      />

      {/* 4. Cylindrical Glass Dosage Chamber */}
      <Path
        d="M130 90 L130 168 C130 182 250 182 250 168 L250 90 Z"
        fill="url(#vaultChamberGrad)"
        stroke="#0284C7"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />

      {/* Internal Dosage Slots & Pills (Observed through Glass) */}
      {/* Pill Slot 1 (Left - Blue Capsule) */}
      <G opacity="0.9">
        <Rect
          x="150"
          y="126"
          width="20"
          height="10"
          rx="5"
          transform="rotate(-25 160 131)"
          fill="url(#pillGrad1)"
          stroke="#0369A1"
          strokeWidth="0.8"
        />
        {/* Capsule Half Divider */}
        <Path d="M158 122 L154 139" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.8" />
      </G>

      {/* Pill Slot 2 (Right - Green Capsule) */}
      <G opacity="0.9">
        <Rect
          x="205"
          y="136"
          width="22"
          height="10"
          rx="5"
          transform="rotate(20 216 141)"
          fill="url(#pillGrad2)"
          stroke="#047857"
          strokeWidth="0.8"
        />
        <Path d="M216 132 L220 150" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.8" />
      </G>

      {/* Internal Central Spindle Rod */}
      <Path
        d="M187 80 L187 165 C187 168 193 168 193 165 L193 80 Z"
        fill="#94A3B8"
        stroke="#64748B"
        strokeWidth="0.6"
      />

      {/* Horizontal Chamber Ring Lathe Grooves */}
      <Path
        d="M130 120 C130 132 250 132 250 120"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="0.8"
        strokeDasharray="4 2"
        opacity="0.7"
      />
      <Path
        d="M130 148 C130 160 250 160 250 148"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="0.8"
        strokeDasharray="4 2"
        opacity="0.7"
      />

      {/* 5. Precision Top Milled Cap & Bezel */}
      <Path
        d="M126 80 C126 92 254 92 254 80 L254 88 C254 100 126 100 126 88 Z"
        fill="#94A3B8"
        stroke="#64748B"
        strokeWidth="0.8"
      />
      <Path
        d="M126 80 C126 68 254 68 254 80 C254 92 126 92 126 80 Z"
        fill="url(#vaultCapGrad)"
        stroke="#CBD5E1"
        strokeWidth="1"
      />

      {/* Top Knurled Adjuster Crown */}
      <Path
        d="M172 66 C172 72 208 72 208 66 L208 72 C208 78 172 78 172 72 Z"
        fill="#64748B"
        stroke="#475569"
        strokeWidth="0.8"
      />
      <Path
        d="M172 66 C172 60 208 60 208 66 C208 72 172 72 172 66 Z"
        fill="#E2E8F0"
        stroke="#94A3B8"
        strokeWidth="0.8"
      />
      {/* Crown Teeth */}
      <Line x1="180" y1="67" x2="180" y2="73" stroke="#94A3B8" strokeWidth="0.8" />
      <Line x1="186" y1="69" x2="186" y2="75" stroke="#94A3B8" strokeWidth="0.8" />
      <Line x1="194" y1="69" x2="194" y2="75" stroke="#94A3B8" strokeWidth="0.8" />
      <Line x1="200" y1="67" x2="200" y2="73" stroke="#94A3B8" strokeWidth="0.8" />

      {/* 6. Active Fiber-Optic LED Indicator */}
      <Circle cx="190" cy="184" r="5" fill="#10B981" />
      <Circle cx="190" cy="184" r="9" stroke="#10B981" strokeWidth="1" opacity="0.4" />
      <Circle cx="190" cy="184" r="2" fill="#FFFFFF" />

      {/* Optical Alignment Beam */}
      <Line
        x1="190"
        y1="184"
        x2="190"
        y2="214"
        stroke="#10B981"
        strokeWidth="1.2"
        strokeDasharray="2 2"
        opacity="0.8"
      />
    </Svg>
  );
};

// =========================================================================
// FIGURE 02: EMOTIVE WELLNESS DIAL
// An isometric haptic touchplate instrument with 4 quadrant states,
// weighted balance needle, concentric pulse rings, and notes cartridge.
// =========================================================================
export const EmotiveWellnessDial: React.FC<{ width?: number; height?: number }> = ({
  width = 360,
  height = 240,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 380 260" fill="none">
      <Defs>
        <LinearGradient id="dialBaseGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="50%" stopColor="#F1F5F9" />
          <Stop offset="100%" stopColor="#E2E8F0" />
        </LinearGradient>
        <LinearGradient id="needleGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#0D9488" />
          <Stop offset="100%" stopColor="#047857" />
        </LinearGradient>
      </Defs>

      {/* 1. Base Shadow */}
      <Path
        d="M60 190 L190 248 L320 190 L190 132 Z"
        fill="#0F172A"
        fillOpacity="0.05"
      />

      {/* 2. Heavy Square Base Plate with Chamfered Corners */}
      <Path
        d="M70 178 L190 234 L310 178 L310 188 L190 244 L70 188 Z"
        fill="#94A3B8"
        stroke="#64748B"
        strokeWidth="0.8"
      />
      <Polygon
        points="70,178 190,122 310,178 190,234"
        fill="url(#dialBaseGrad)"
        stroke="#CBD5E1"
        strokeWidth="1"
      />

      {/* Inset Plate Boundary */}
      <Polygon
        points="80,178 190,128 300,178 190,228"
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="0.8"
      />

      {/* Corner Fastener Screws */}
      <Circle cx="86" cy="178" r="2.2" fill="#64748B" />
      <Circle cx="190" cy="225" r="2.2" fill="#64748B" />
      <Circle cx="294" cy="178" r="2.2" fill="#64748B" />
      <Circle cx="190" cy="131" r="2.2" fill="#64748B" />

      {/* 3. Circular Bezel Ring (Puck) */}
      <Path
        d="M110 162 C110 188 270 188 270 162 L270 174 C270 200 110 200 110 174 Z"
        fill="#94A3B8"
        stroke="#64748B"
        strokeWidth="0.8"
      />
      <Path
        d="M110 162 C110 136 270 136 270 162 C270 188 110 188 110 162 Z"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="1.2"
      />

      {/* Concentric Haptic Pulse Waves */}
      <Path
        d="M125 162 C125 144 255 144 255 162 C255 180 125 180 125 162 Z"
        fill="none"
        stroke="#E0F2FE"
        strokeWidth="1"
      />
      <Path
        d="M140 162 C140 152 240 152 240 162 C240 172 140 172 140 162 Z"
        fill="none"
        stroke="#BAE6FD"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />

      {/* 4 Quadrant Mood Tick Arc Marks */}
      {/* Top Quadrant: GREAT (#10B981) */}
      <Line x1="190" y1="140" x2="190" y2="147" stroke="#10B981" strokeWidth="2.5" />
      {/* Right Quadrant: GOOD (#0D9488) */}
      <Line x1="250" y1="162" x2="242" y2="162" stroke="#0D9488" strokeWidth="2.5" />
      {/* Bottom Quadrant: OKAY (#F59E0B) */}
      <Line x1="190" y1="184" x2="190" y2="177" stroke="#F59E0B" strokeWidth="2" />
      {/* Left Quadrant: NEEDS ATTENTION (#EF4444) */}
      <Line x1="130" y1="162" x2="138" y2="162" stroke="#EF4444" strokeWidth="2" />

      {/* Intermediate Fine Vernier Ticks */}
      <Line x1="160" y1="147" x2="163" y2="151" stroke="#94A3B8" strokeWidth="1" />
      <Line x1="220" y1="147" x2="217" y2="151" stroke="#94A3B8" strokeWidth="1" />
      <Line x1="230" y1="174" x2="226" y2="171" stroke="#94A3B8" strokeWidth="1" />
      <Line x1="150" y1="174" x2="154" y2="171" stroke="#94A3B8" strokeWidth="1" />

      {/* 4. Center Sensor Hub & Balance Needle */}
      <Circle cx="190" cy="162" r="16" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
      <Circle cx="190" cy="162" r="8" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.8" />

      {/* Needle pointing toward GOOD (Right quadrant ~22° offset) */}
      <Polygon
        points="188,162 192,162 238,155 190,165"
        fill="url(#needleGrad)"
        stroke="#047857"
        strokeWidth="0.8"
      />
      <Circle cx="190" cy="162" r="3.5" fill="#0D9488" />
      <Circle cx="190" cy="162" r="1.5" fill="#FFFFFF" />

      {/* 5. Brass Notes Tape Cartridge on the Side */}
      <Polygon
        points="276,140 320,160 320,172 276,152"
        fill="#CBD5E1"
        stroke="#64748B"
        strokeWidth="0.8"
      />
      <Polygon
        points="276,140 320,160 305,166 261,146"
        fill="#F1F5F9"
        stroke="#94A3B8"
        strokeWidth="0.6"
      />
      {/* Tape Slot Slit */}
      <Line x1="284" y1="148" x2="310" y2="160" stroke="#0F172A" strokeWidth="1" />
    </Svg>
  );
};

// =========================================================================
// FIGURE 03: TACTILE ROUTINE RAIL
// An isometric dual-rail index slider mechanism with precision end stops,
// brass rack teeth, and 4 milestone sliding blocks (3 engaged).
// =========================================================================
export const TactileRoutineRail: React.FC<{ width?: number; height?: number }> = ({
  width = 360,
  height = 240,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 380 260" fill="none">
      <Defs>
        <LinearGradient id="railBedGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="50%" stopColor="#F8FAFC" />
          <Stop offset="100%" stopColor="#E2E8F0" />
        </LinearGradient>
        <LinearGradient id="steelRodGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="50%" stopColor="#CBD5E1" />
          <Stop offset="100%" stopColor="#64748B" />
        </LinearGradient>
        <LinearGradient id="blockDoneGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#E0F2FE" />
          <Stop offset="100%" stopColor="#BAE6FD" />
        </LinearGradient>
      </Defs>

      {/* 1. Base Plate Halo */}
      <Path
        d="M50 175 L200 245 L340 175 L190 105 Z"
        fill="#0F172A"
        fillOpacity="0.05"
      />

      {/* 2. Heavy Bedplate */}
      <Path
        d="M55 168 L195 238 L335 168 L335 178 L195 248 L55 178 Z"
        fill="#94A3B8"
        stroke="#64748B"
        strokeWidth="0.8"
      />
      <Polygon
        points="55,168 195,98 335,168 195,238"
        fill="url(#railBedGrad)"
        stroke="#CBD5E1"
        strokeWidth="1"
      />

      {/* End Blocks (Rail Anchor Mounts) */}
      {/* Left Anchor Pillar */}
      <Polygon points="75,160 95,150 95,164 75,174" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
      <Polygon points="75,160 95,150 115,160 95,170" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.8" />
      <Circle cx="95" cy="160" r="1.8" fill="#475569" />

      {/* Right Anchor Pillar */}
      <Polygon points="295,160 315,150 315,164 295,174" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
      <Polygon points="295,160 315,150 335,160 315,170" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.8" />
      <Circle cx="315" cy="160" r="1.8" fill="#475569" />

      {/* 3. Dual Polished Steel Guide Rails */}
      {/* Rear Rail */}
      <Line x1="105" y1="152" x2="305" y2="152" stroke="url(#steelRodGrad)" strokeWidth="4.5" strokeLinecap="round" />
      {/* Front Rail */}
      <Line x1="105" y1="168" x2="305" y2="168" stroke="url(#steelRodGrad)" strokeWidth="4.5" strokeLinecap="round" />

      {/* Brass Rack Pinion Teeth between the rails */}
      <Line x1="125" y1="160" x2="125" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="135" y1="160" x2="135" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="145" y1="160" x2="145" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="155" y1="160" x2="155" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="165" y1="160" x2="165" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="175" y1="160" x2="175" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="185" y1="160" x2="185" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="195" y1="160" x2="195" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="205" y1="160" x2="205" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="215" y1="160" x2="215" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="225" y1="160" x2="225" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="235" y1="160" x2="235" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="245" y1="160" x2="245" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="255" y1="160" x2="255" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="265" y1="160" x2="265" y2="164" stroke="#D97706" strokeWidth="1" />
      <Line x1="275" y1="160" x2="275" y2="164" stroke="#D97706" strokeWidth="1" />

      {/* 4. Sliding Milestone Carriages */}
      {/* Block 1: Morning Vitals (COMPLETED - Engaged) */}
      <G transform="translate(115, 142)">
        <Polygon points="0,18 18,8 36,18 18,28" fill="url(#blockDoneGrad)" stroke="#0284C7" strokeWidth="0.8" />
        <Polygon points="0,18 18,28 18,34 0,24" fill="#0284C7" stroke="#0369A1" strokeWidth="0.8" />
        <Polygon points="18,28 36,18 36,24 18,34" fill="#0369A1" stroke="#0284C7" strokeWidth="0.8" />
        {/* Status Lock Pin (Green) */}
        <Circle cx="18" cy="18" r="2.5" fill="#10B981" />
      </G>

      {/* Block 2: Hydration 1.5L (COMPLETED - Engaged) */}
      <G transform="translate(160, 142)">
        <Polygon points="0,18 18,8 36,18 18,28" fill="url(#blockDoneGrad)" stroke="#0284C7" strokeWidth="0.8" />
        <Polygon points="0,18 18,28 18,34 0,24" fill="#0284C7" stroke="#0369A1" strokeWidth="0.8" />
        <Polygon points="18,28 36,18 36,24 18,34" fill="#0369A1" stroke="#0284C7" strokeWidth="0.8" />
        <Circle cx="18" cy="18" r="2.5" fill="#10B981" />
      </G>

      {/* Block 3: Afternoon Walk (COMPLETED - Engaged) */}
      <G transform="translate(205, 142)">
        <Polygon points="0,18 18,8 36,18 18,28" fill="url(#blockDoneGrad)" stroke="#0284C7" strokeWidth="0.8" />
        <Polygon points="0,18 18,28 18,34 0,24" fill="#0284C7" stroke="#0369A1" strokeWidth="0.8" />
        <Polygon points="18,28 36,18 36,24 18,34" fill="#0369A1" stroke="#0284C7" strokeWidth="0.8" />
        <Circle cx="18" cy="18" r="2.5" fill="#10B981" />
      </G>

      {/* Block 4: Evening Blood Pressure (UPCOMING - Idle resting slot) */}
      <G transform="translate(250, 142)">
        <Polygon points="0,18 18,8 36,18 18,28" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="0.8" />
        <Polygon points="0,18 18,28 18,34 0,24" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
        <Polygon points="18,28 36,18 36,24 18,34" fill="#64748B" stroke="#475569" strokeWidth="0.8" />
        <Circle cx="18" cy="18" r="2" fill="#CBD5E1" />
      </G>
    </Svg>
  );
};

// =========================================================================
// FIGURE 04: CARE CIRCLE OPTICAL BRIDGE
// An isometric dual-node communication console linking the elder home deck
// to family and doctor consoles via a focused collimated optical beam.
// =========================================================================
export const CareCircleBridge: React.FC<{ width?: number; height?: number }> = ({
  width = 360,
  height = 240,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 380 260" fill="none">
      <Defs>
        <LinearGradient id="bridgeBaseGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="50%" stopColor="#F8FAFC" />
          <Stop offset="100%" stopColor="#E2E8F0" />
        </LinearGradient>
        <LinearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#0284C7" stopOpacity="0.9" />
          <Stop offset="50%" stopColor="#38BDF8" stopOpacity="0.5" />
          <Stop offset="100%" stopColor="#0D9488" stopOpacity="0.9" />
        </LinearGradient>
      </Defs>

      {/* 1. Base Shadow */}
      <Path
        d="M50 175 L190 245 L330 175 L190 105 Z"
        fill="#0F172A"
        fillOpacity="0.05"
      />

      {/* 2. Heavy Dual-Plinth Base Plate */}
      <Path
        d="M55 168 L190 236 L325 168 L325 178 L190 246 L55 178 Z"
        fill="#94A3B8"
        stroke="#64748B"
        strokeWidth="0.8"
      />
      <Polygon
        points="55,168 190,100 325,168 190,236"
        fill="url(#bridgeBaseGrad)"
        stroke="#CBD5E1"
        strokeWidth="1"
      />

      {/* Corner Fastener Screws */}
      <Circle cx="70" cy="168" r="2.2" fill="#64748B" />
      <Circle cx="190" cy="226" r="2.2" fill="#64748B" />
      <Circle cx="310" cy="168" r="2.2" fill="#64748B" />
      <Circle cx="190" cy="110" r="2.2" fill="#64748B" />

      {/* 3. Left Transmission Tower (Elder Node) */}
      <G transform="translate(105, 120)">
        {/* Plinth */}
        <Path d="M-25 25 L0 38 L25 25 L25 32 L0 45 L-25 32 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
        <Polygon points="-25,25 0,12 25,25 0,38" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.8" />
        {/* Tower Body */}
        <Path d="M-12 18 L0 24 L12 18 L12 -18 L0 -12 L-12 -18 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.8" />
        <Path d="M0 24 L12 18 L12 -18 L0 -12 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
        {/* Crown Reflector Ring */}
        <Circle cx="0" cy="-22" r="9" fill="#0284C7" stroke="#0369A1" strokeWidth="1" />
        <Circle cx="0" cy="-22" r="4" fill="#FFFFFF" />
      </G>

      {/* 4. Right Transmission Tower (Care Circle & Clinician Node) */}
      <G transform="translate(275, 120)">
        <Path d="M-25 25 L0 38 L25 25 L25 32 L0 45 L-25 32 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
        <Polygon points="-25,25 0,12 25,25 0,38" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.8" />
        <Path d="M-12 18 L0 24 L12 18 L12 -18 L0 -12 L-12 -18 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.8" />
        <Path d="M0 24 L12 18 L12 -18 L0 -12 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
        <Circle cx="0" cy="-22" r="9" fill="#0D9488" stroke="#047857" strokeWidth="1" />
        <Circle cx="0" cy="-22" r="4" fill="#FFFFFF" />
      </G>

      {/* 5. Center Optical Bridge Router & Consent Key Switch */}
      <G transform="translate(190, 168)">
        <Path d="M-22 11 L0 22 L22 11 L22 18 L0 29 L-22 18 Z" fill="#64748B" stroke="#475569" strokeWidth="0.8" />
        <Polygon points="-22,11 0,0 22,11 0,22" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
        {/* Brass Rotary Consent Switch */}
        <Circle cx="0" cy="11" r="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
        <Line x1="-4" y1="11" x2="4" y2="11" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      </G>

      {/* 6. Focused Optical Transmission Beam */}
      <Line
        x1="105"
        y1="98"
        x2="275"
        y2="98"
        stroke="url(#beamGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Wave Pulse Nodes */}
      <Circle cx="150" cy="98" r="4" fill="#38BDF8" opacity="0.8" />
      <Circle cx="190" cy="98" r="5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />
      <Circle cx="230" cy="98" r="4" fill="#34D399" opacity="0.8" />

      {/* Downward Consent Routing Guides */}
      <Line x1="105" y1="98" x2="190" y2="175" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
      <Line x1="275" y1="98" x2="190" y2="175" stroke="#99F6E4" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
    </Svg>
  );
};

// =========================================================================
// ANATOMY SHOWCASE CARD WRAPPER
// Adheres strictly to the Anatomy layout guidelines:
// - Top-left: Figure Number (Fig n)
// - Top-right: Part / Assembly Name
// - Center: The crafted isometric SVG illustration
// - Bottom-left: Mechanical interaction hint
// - Bottom-right: Live telemetry / status readout
// =========================================================================
export interface IsometricCardProps {
  figureNumber: string;
  title: string;
  interactionHint: string;
  liveReadout: string;
  readoutStatus?: "active" | "success" | "neutral";
  children: React.ReactNode;
}

export const IsometricCard: React.FC<IsometricCardProps> = ({
  figureNumber,
  title,
  interactionHint,
  liveReadout,
  readoutStatus = "active",
  children,
}) => {
  const getStatusBadgeStyle = () => {
    switch (readoutStatus) {
      case "success":
        return {
          bg: "#ECFDF5",
          dot: "#10B981",
          text: "#047857",
        };
      case "neutral":
        return {
          bg: "#F1F5F9",
          dot: "#64748B",
          text: "#334155",
        };
      case "active":
      default:
        return {
          bg: "#F0F9FF",
          dot: "#0284C7",
          text: "#0369A1",
        };
    }
  };

  const statusStyle = getStatusBadgeStyle();

  return (
    <View style={cardStyles.card}>
      {/* Top Header Card Metadata */}
      <View style={cardStyles.headerRow}>
        <View style={cardStyles.figBadge}>
          <Text style={cardStyles.figText}>{figureNumber}</Text>
        </View>
        <Text style={cardStyles.titleText}>{title}</Text>
      </View>

      {/* Center SVG Instrument Presentation */}
      <View style={cardStyles.svgContainer}>{children}</View>

      {/* Bottom Footer Telemetry & Hint */}
      <View style={cardStyles.footerRow}>
        <Text style={cardStyles.hintText}>{interactionHint}</Text>

        <View style={[cardStyles.readoutBadge, { backgroundColor: statusStyle.bg }]}>
          <View style={[cardStyles.readoutDot, { backgroundColor: statusStyle.dot }]} />
          <Text style={[cardStyles.readoutText, { color: statusStyle.text }]}>{liveReadout}</Text>
        </View>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: Theme.ergonomics.cardRadius,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    padding: 20,
    marginVertical: 12,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      },
      default: {
        elevation: 2,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
      },
    }),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 12,
  },
  figBadge: {
    backgroundColor: "#F1F5F9",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  figText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
    letterSpacing: 0.5,
  },
  titleText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  svgContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    overflow: "hidden",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 12,
    flexWrap: "wrap",
    gap: 8,
  },
  hintText: {
    fontFamily: Theme.fonts.body,
    fontSize: 12,
    color: "#64748B",
    flex: 1,
  },
  readoutBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 6,
  },
  readoutDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  readoutText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});
