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

// Embedded CSS Keyframes for Web (Zero JS runtime overhead, buttery smooth 60fps)
const ANIMATION_STYLES = `
  @keyframes cfFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }
  @keyframes cfPulseAura {
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50% { opacity: 0.75; transform: scale(1.05); }
  }
  @keyframes cfFlowPulse {
    from { stroke-dashoffset: 36; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes cfRipple {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(1.5px); }
  }
  .cf-anim-float {
    animation: cfFloat 4.5s ease-in-out infinite;
  }
  .cf-anim-pulse {
    transform-origin: center;
    animation: cfPulseAura 3s ease-in-out infinite;
  }
  .cf-anim-flow {
    stroke-dasharray: 6 6;
    animation: cfFlowPulse 2.8s linear infinite;
  }
  .cf-anim-ripple {
    animation: cfRipple 3s ease-in-out infinite;
  }
`;

// =========================================================================
// 1. MEDICATION DOCK & SCHEDULE VISUAL
// An isometric clinical medication organizer tray with color-coded slots,
// morning dose verified (taken on time), capsule, tablet, and prescription bottle.
// =========================================================================
export const MedicationDeckVisual: React.FC<{ width?: number; height?: number }> = ({
  width = 360,
  height = 240,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 380 250" fill="none">
      <Defs>
        {Platform.OS === "web" && (
          // @ts-ignore
          <style>{ANIMATION_STYLES}</style>
        )}
        <LinearGradient id="dockGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="60%" stopColor="#F8FAFC" />
          <Stop offset="100%" stopColor="#E2E8F0" />
        </LinearGradient>
        <LinearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#FB923C" />
          <Stop offset="50%" stopColor="#F97316" />
          <Stop offset="100%" stopColor="#EA580C" />
        </LinearGradient>
        <LinearGradient id="capsuleBlueGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#38BDF8" />
          <Stop offset="100%" stopColor="#0284C7" />
        </LinearGradient>
      </Defs>

      {/* Floating Group */}
      <G className="cf-anim-float">
        {/* Soft Ambient Shadow */}
        <Path
          d="M50 180 L200 240 L340 180 L190 120 Z"
          fill="#0F172A"
          fillOpacity="0.04"
        />

        {/* Prescription Bottle (Left Background) */}
        <G transform="translate(65, 80)">
          {/* Bottle Shadow */}
          <Path d="M-15 45 C-15 52 25 52 25 45 C25 38 -15 38 -15 45 Z" fill="#0F172A" fillOpacity="0.06" />
          {/* Bottle Body */}
          <Path d="M-12 12 L-12 42 C-12 50 22 50 22 42 L22 12 Z" fill="url(#bottleGrad)" stroke="#C2410C" strokeWidth="0.8" />
          <Path d="M-12 12 C-12 6 22 6 22 12 C22 18 -12 18 -12 12 Z" fill="#FDBA74" stroke="#EA580C" strokeWidth="0.8" />
          {/* White Cap */}
          <Path d="M-8 0 L-8 8 C-8 12 18 12 18 8 L18 0 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
          <Path d="M-8 0 C-8 -3 18 -3 18 0 C18 3 -8 3 -8 0 Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.8" />
          {/* Rx Label */}
          <Path d="M-10 18 L-10 36 C-10 40 20 40 20 36 L20 18 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.6" />
          <Line x1="-4" y1="24" x2="14" y2="24" stroke="#0284C7" strokeWidth="1.2" />
          <Line x1="-4" y1="28" x2="10" y2="28" stroke="#94A3B8" strokeWidth="0.8" />
          <Line x1="-4" y1="32" x2="6" y2="32" stroke="#94A3B8" strokeWidth="0.8" />
        </G>

        {/* Isometric Pill Organizer Dock */}
        {/* Base Thickness */}
        <Path
          d="M100 160 L240 222 L350 168 L350 178 L240 232 L100 170 Z"
          fill="#94A3B8"
          stroke="#64748B"
          strokeWidth="0.8"
        />
        {/* Top Surface */}
        <Polygon
          points="100,160 210,105 350,168 240,222"
          fill="url(#dockGrad)"
          stroke="#CBD5E1"
          strokeWidth="1.2"
        />

        {/* Slot 1: MORNING 08:00 (TAKEN ON TIME) */}
        <G transform="translate(145, 142)">
          {/* Recessed Pill Well */}
          <Polygon points="-18,-9 0,-18 18,-9 0,0" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="0.8" />
          {/* Glowing Aura Ring */}
          <G className="cf-anim-pulse">
            <Circle cx="0" cy="-9" r="14" fill="#10B981" fillOpacity="0.25" />
          </G>
          {/* Active 3D Capsule */}
          <Rect
            x="-10"
            y="-14"
            width="20"
            height="10"
            rx="5"
            transform="rotate(-25 0 -9)"
            fill="url(#capsuleBlueGrad)"
            stroke="#0369A1"
            strokeWidth="0.8"
          />
          {/* Capsule White Half */}
          <Path d="M-2 -18 L-5 -1" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.9" />
          {/* Emerald Checkmark Badge */}
          <Circle cx="16" cy="-18" r="8" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
          <Path d="M13 -18 L15.5 -15.5 L19.5 -20.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </G>

        {/* Slot 2: NOON 12:30 (UPCOMING) */}
        <G transform="translate(195, 120)">
          <Polygon points="-18,-9 0,-18 18,-9 0,0" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.8" />
          {/* Round Orange Tablet */}
          <Circle cx="0" cy="-9" r="6" fill="#FDBA74" stroke="#EA580C" strokeWidth="0.8" />
          <Line x1="-4" y1="-9" x2="4" y2="-9" stroke="#EA580C" strokeWidth="0.6" strokeOpacity="0.7" />
        </G>

        {/* Slot 3: EVENING 19:00 */}
        <G transform="translate(245, 148)">
          <Polygon points="-18,-9 0,-18 18,-9 0,0" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.8" />
          {/* Oval Mint Tablet */}
          <Rect
            x="-7"
            y="-12"
            width="14"
            height="7"
            rx="3.5"
            transform="rotate(30 0 -9)"
            fill="#6EE7B7"
            stroke="#059669"
            strokeWidth="0.8"
          />
        </G>

        {/* Slot 4: BEDTIME 21:30 */}
        <G transform="translate(295, 175)">
          <Polygon points="-18,-9 0,-18 18,-9 0,0" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.8" />
          {/* Lavender Capsule */}
          <Rect
            x="-9"
            y="-13"
            width="18"
            height="8"
            rx="4"
            transform="rotate(-20 0 -9)"
            fill="#C4B5FD"
            stroke="#7C3AED"
            strokeWidth="0.8"
          />
        </G>

        {/* Timing Engravings on Dock Face */}
        <Line x1="130" y1="184" x2="160" y2="198" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
        <Line x1="180" y1="206" x2="210" y2="220" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        <Line x1="250" y1="210" x2="280" y2="196" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
      </G>
    </Svg>
  );
};

// =========================================================================
// 2. WELLNESS & EMOTIVE CHECK-IN VISUAL
// An isometric healthcare tablet displaying the 4 warm emotive check-in cards
// (Great, Good, Okay, Need Help) with calm breathing aura and vitals pulse wave.
// =========================================================================
export const WellnessCheckinVisual: React.FC<{ width?: number; height?: number }> = ({
  width = 360,
  height = 240,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 380 250" fill="none">
      <Defs>
        {Platform.OS === "web" && (
          // @ts-ignore
          <style>{ANIMATION_STYLES}</style>
        )}
        <LinearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor="#F8FAFC" />
        </LinearGradient>
        <LinearGradient id="activeCardGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#F0F9FF" />
          <Stop offset="100%" stopColor="#E0F2FE" />
        </LinearGradient>
      </Defs>

      <G className="cf-anim-float">
        {/* Base Ambient Shadow */}
        <Path
          d="M60 190 L190 248 L330 190 L190 130 Z"
          fill="#0F172A"
          fillOpacity="0.05"
        />

        {/* Tablet Stand Bracket */}
        <Polygon points="160,185 190,170 220,185 190,200" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
        <Polygon points="180,150 190,145 200,150 190,185" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.8" />

        {/* Isometric Tablet Frame */}
        {/* Back Thickness */}
        <Path
          d="M85 145 L225 210 L315 155 L315 163 L225 218 L85 153 Z"
          fill="#64748B"
          stroke="#475569"
          strokeWidth="0.8"
        />
        {/* Front White Bezel */}
        <Polygon
          points="85,145 175,90 315,155 225,210"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="1.2"
        />

        {/* High-Contrast Glare-Free Screen Area */}
        <Polygon
          points="95,145 175,98 305,155 225,202"
          fill="url(#screenGrad)"
          stroke="#E2E8F0"
          strokeWidth="0.8"
        />

        {/* Greeting Banner on Screen */}
        <Line x1="125" y1="130" x2="175" y2="108" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        <Line x1="125" y1="136" x2="160" y2="120" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />

        {/* 4 Emotive Mood Options (Isometric Cards on Tablet) */}
        {/* 1. GREAT */}
        <G transform="translate(130, 150)">
          <Polygon points="-14,-6 0,-13 14,-6 0,1" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="0.8" />
          <Circle cx="0" cy="-6" r="3" fill="#10B981" />
        </G>

        {/* 2. GOOD (SELECTED WITH AURA) */}
        <G transform="translate(170, 132)">
          {/* Subtle Breathing Aura */}
          <G className="cf-anim-pulse">
            <Circle cx="0" cy="-6" r="16" fill="#38BDF8" fillOpacity="0.25" />
          </G>
          <Polygon points="-16,-7 0,-15 16,-7 0,1" fill="url(#activeCardGrad)" stroke="#0284C7" strokeWidth="1.4" />
          {/* Radiant Sky Mood Icon */}
          <Circle cx="0" cy="-7" r="4" fill="#0284C7" />
          <Circle cx="0" cy="-7" r="2" fill="#FFFFFF" />
        </G>

        {/* 3. OKAY */}
        <G transform="translate(210, 154)">
          <Polygon points="-14,-6 0,-13 14,-6 0,1" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="0.8" />
          <Circle cx="0" cy="-6" r="3" fill="#F59E0B" />
        </G>

        {/* 4. NEED HELP */}
        <G transform="translate(250, 174)">
          <Polygon points="-14,-6 0,-13 14,-6 0,1" fill="#FEF2F2" stroke="#FECACA" strokeWidth="0.8" />
          <Circle cx="0" cy="-6" r="3" fill="#EF4444" />
        </G>

        {/* Ambient Sinus Rhythm Wave (Calm Heartbeat Line) */}
        <Path
          d="M135 178 L160 166 L168 170 L172 158 L176 174 L180 168 L265 198"
          fill="none"
          stroke="#0D9488"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />

        {/* Status Pill Badge Floating Over Deck */}
        <G transform="translate(215, 85)">
          <Rect x="-45" y="-12" width="90" height="24" rx="12" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1" />
          <Circle cx="-32" cy="0" r="4" fill="#10B981" />
          <Line x1="-22" y1="-2" x2="32" y2="-2" stroke="#0369A1" strokeWidth="1.8" strokeLinecap="round" />
          <Line x1="-22" y1="3" x2="18" y2="3" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
        </G>
      </G>
    </Svg>
  );
};

// =========================================================================
// 3. DAILY ROUTINE & HYDRATION CARE TRACK
// An isometric morning routine station with a graduated crystal hydration glass,
// water level ripple, and stepped daily habit milestone cards.
// =========================================================================
export const DailyRoutineVisual: React.FC<{ width?: number; height?: number }> = ({
  width = 360,
  height = 240,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 380 250" fill="none">
      <Defs>
        {Platform.OS === "web" && (
          // @ts-ignore
          <style>{ANIMATION_STYLES}</style>
        )}
        <LinearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <Stop offset="100%" stopColor="#0284C7" stopOpacity="0.95" />
        </LinearGradient>
        <LinearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
          <Stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.6" />
        </LinearGradient>
      </Defs>

      <G className="cf-anim-float">
        {/* Soft Base Shadow */}
        <Path
          d="M50 180 L200 242 L340 180 L190 120 Z"
          fill="#0F172A"
          fillOpacity="0.05"
        />

        {/* Graduated Crystal Hydration Tumbler (Left Foreground) */}
        <G transform="translate(95, 120)">
          {/* Glass Shadow */}
          <Path d="M-18 60 C-18 68 28 68 28 60 C28 52 -18 52 -18 60 Z" fill="#0F172A" fillOpacity="0.06" />

          {/* Water Fluid Body (With Ripple Class) */}
          <G className="cf-anim-ripple">
            <Path
              d="M-14 28 L-10 56 C-10 62 20 62 20 56 L24 28 Z"
              fill="url(#waterGrad)"
              stroke="#0369A1"
              strokeWidth="0.8"
            />
            {/* Water Surface Ellipse */}
            <Path
              d="M-14 28 C-14 24 24 24 24 28 C24 32 -14 32 -14 28 Z"
              fill="#7DD3FC"
              stroke="#38BDF8"
              strokeWidth="0.6"
            />
          </G>

          {/* Glass Outer Wall */}
          <Path
            d="M-16 8 L-11 58 C-11 65 22 65 22 58 L27 8 Z"
            fill="url(#glassGrad)"
            stroke="#94A3B8"
            strokeWidth="1"
          />
          {/* Rim Ellipse */}
          <Path
            d="M-16 8 C-16 3 27 3 27 8 C27 13 -16 13 -16 8 Z"
            fill="#FFFFFF"
            fillOpacity="0.6"
            stroke="#CBD5E1"
            strokeWidth="0.8"
          />

          {/* Graduation Ticks (1.5L Target) */}
          <Line x1="16" y1="20" x2="22" y2="20" stroke="#0284C7" strokeWidth="1" />
          <Line x1="17" y1="32" x2="22" y2="32" stroke="#0284C7" strokeWidth="1.2" />
          <Line x1="18" y1="44" x2="22" y2="44" stroke="#0284C7" strokeWidth="1" />

          {/* Floating Hydration Status Badge */}
          <Circle cx="5" cy="5" r="9" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
          <Path d="M5 -1 C5 -1 8 3 8 5 C8 6.6 6.6 8 5 8 C3.4 8 2 6.6 2 5 C2 3 5 -1 5 -1 Z" fill="#FFFFFF" />
        </G>

        {/* Stepped Routine Habit Cards (Stacked in Isometric Perspective) */}
        {/* Card 1: MORNING WALK (COMPLETED) */}
        <G transform="translate(195, 95)">
          {/* Thickness */}
          <Path d="M-40 22 L50 62 L90 42 L90 48 L50 68 L-40 28 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.8" />
          {/* Card Face */}
          <Polygon points="-40,22 0,4 90,42 50,62" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
          {/* Checkmark Dot */}
          <Circle cx="-20" cy="22" r="5" fill="#10B981" />
          <Path d="M-22 22 L-21 24 L-18 20" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          {/* Text Lines */}
          <Line x1="-10" y1="20" x2="40" y2="42" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <Line x1="-10" y1="26" x2="20" y2="39" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
        </G>

        {/* Card 2: HYDRATION TARGET (IN PROGRESS - 80%) */}
        <G transform="translate(215, 125)">
          <Path d="M-40 22 L50 62 L90 42 L90 48 L50 68 L-40 28 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.8" />
          <Polygon points="-40,22 0,4 90,42 50,62" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.2" />
          <Circle cx="-20" cy="22" r="5" fill="#0284C7" />
          <Line x1="-10" y1="20" x2="45" y2="44" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          {/* Progress Bar Track */}
          <Line x1="-10" y1="28" x2="45" y2="52" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
          <Line x1="-10" y1="28" x2="34" y2="47" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        </G>

        {/* Card 3: BLOOD PRESSURE CHECK (COMPLETED) */}
        <G transform="translate(235, 155)">
          <Path d="M-40 22 L50 62 L90 42 L90 48 L50 68 L-40 28 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.8" />
          <Polygon points="-40,22 0,4 90,42 50,62" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
          <Circle cx="-20" cy="22" r="5" fill="#10B981" />
          <Path d="M-22 22 L-21 24 L-18 20" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <Line x1="-10" y1="20" x2="35" y2="40" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <Line x1="-10" y1="26" x2="15" y2="37" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
        </G>
      </G>
    </Svg>
  );
};

// =========================================================================
// 4. CONNECTED CARE CIRCLE NETWORK VISUAL
// An isometric care network linking the elder to family guardian (daughter)
// and attending geriatrician with subtle animated telemetry flow lines.
// =========================================================================
export const CareCircleVisual: React.FC<{ width?: number; height?: number }> = ({
  width = 360,
  height = 240,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 380 250" fill="none">
      <Defs>
        {Platform.OS === "web" && (
          // @ts-ignore
          <style>{ANIMATION_STYLES}</style>
        )}
        <LinearGradient id="elderHaloGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#0284C7" />
          <Stop offset="100%" stopColor="#0D9488" />
        </LinearGradient>
      </Defs>

      <G className="cf-anim-float">
        {/* Soft Base Ground Shadow */}
        <Path
          d="M60 180 L190 242 L330 180 L190 120 Z"
          fill="#0F172A"
          fillOpacity="0.04"
        />

        {/* Flowing Telemetry Arcs (Animated Dash Offset) */}
        {/* Elder -> Daughter Connection */}
        <G className="cf-anim-flow">
          <Path
            d="M140 145 C170 125 210 110 260 100"
            stroke="#0284C7"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </G>
        {/* Elder -> Doctor Connection */}
        <G className="cf-anim-flow">
          <Path
            d="M140 145 C180 160 215 170 260 180"
            stroke="#0D9488"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </G>

        {/* Central Privacy Consent Key Shield */}
        <G transform="translate(195, 140)">
          <Circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.2" />
          {/* Lock Icon */}
          <Rect x="-5" y="-3" width="10" height="8" rx="2" fill="#0284C7" />
          <Path d="M-3 -3 L-3 -6 C-3 -7.6 3 -7.6 3 -6 L3 -3" stroke="#0284C7" strokeWidth="1.4" fill="none" />
        </G>

        {/* NODE 1: ELDER DECK (ELEANOR) - Main Hero Plinth */}
        <G transform="translate(130, 145)">
          {/* Base Plinth */}
          <Path d="M-35 15 L0 30 L35 15 L35 22 L0 37 L-35 22 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="0.8" />
          <Polygon points="-35,15 0,0 35,15 0,30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
          {/* Pulsing Aura Ring */}
          <G className="cf-anim-pulse">
            <Circle cx="0" cy="15" r="24" fill="#38BDF8" fillOpacity="0.25" />
          </G>
          {/* Avatar Shield */}
          <Circle cx="0" cy="0" r="18" fill="url(#elderHaloGrad)" stroke="#FFFFFF" strokeWidth="2" />
          {/* Heart Emblem */}
          <Path
            d="M0 -3 C-5 -8 -11 -2 -6 4 L0 10 L6 4 C11 -2 5 -8 0 -3 Z"
            fill="#FFFFFF"
          />
          {/* Label Chip */}
          <Rect x="-28" y="24" width="56" height="16" rx="8" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="0.8" />
          <Line x1="-16" y1="32" x2="16" y2="32" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
        </G>

        {/* NODE 2: FAMILY GUARDIAN (SARAH - DAUGHTER) */}
        <G transform="translate(270, 95)">
          {/* Plinth */}
          <Polygon points="-25,10 0,0 25,10 0,20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <Circle cx="0" cy="0" r="14" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.8" />
          {/* Family Member Icon */}
          <Circle cx="0" cy="-3" r="4" fill="#FFFFFF" />
          <Path d="M-6 8 C-6 4 6 4 6 8" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          {/* Live Notification Bubble */}
          <G transform="translate(10, -12)">
            <Rect x="-4" y="-8" width="48" height="16" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
            <Circle cx="2" cy="0" r="2.5" fill="#10B981" />
            <Line x1="8" y1="0" x2="38" y2="0" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
          </G>
        </G>

        {/* NODE 3: DOCTOR / CLINICIAN (DR. CHEN) */}
        <G transform="translate(270, 185)">
          <Polygon points="-25,10 0,0 25,10 0,20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <Circle cx="0" cy="0" r="14" fill="#0D9488" stroke="#FFFFFF" strokeWidth="1.8" />
          {/* Stethoscope / Cross Emblem */}
          <Line x1="0" y1="-5" x2="0" y2="5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <Line x1="-5" y1="0" x2="5" y2="0" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          {/* Sync Badge */}
          <G transform="translate(10, 10)">
            <Rect x="-4" y="-8" width="48" height="16" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
            <Circle cx="2" cy="0" r="2.5" fill="#0D9488" />
            <Line x1="8" y1="0" x2="36" y2="0" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
          </G>
        </G>
      </G>
    </Svg>
  );
};

// =========================================================================
// ISOMETRIC SHOWCASE CARD WRAPPER
// Minimalist, premium presentation:
// - Top-left: Clinical Category Badge (No "FIG 01" / "FIG 02")
// - Top-right: Feature Title
// - Center: Domain-authentic isometric illustration with micro-animations
// - Bottom-left: User-centered explanation hint
// - Bottom-right: Live status / telemetry badge
// =========================================================================
export interface IsometricCardProps {
  category: string;
  title: string;
  interactionHint: string;
  liveReadout: string;
  readoutStatus?: "active" | "success" | "neutral";
  children: React.ReactNode;
}

export const IsometricCard: React.FC<IsometricCardProps> = ({
  category,
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
      {/* Top Header Card Metadata (NO Fig 01 / Fig 02) */}
      <View style={cardStyles.headerRow}>
        <View style={cardStyles.categoryBadge}>
          <Text style={cardStyles.categoryText}>{category}</Text>
        </View>
        <Text style={cardStyles.titleText}>{title}</Text>
      </View>

      {/* Center SVG Illustration */}
      <View style={cardStyles.svgContainer}>{children}</View>

      {/* Bottom Footer Telemetry & Explanation */}
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
  categoryBadge: {
    backgroundColor: "#F0F9FF",
    borderWidth: 1,
    borderColor: "#BAE6FD",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryText: {
    fontFamily: Theme.fonts.heading,
    fontSize: 10,
    fontWeight: "700",
    color: Theme.colors.brandPrimary,
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
    paddingVertical: 14,
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
