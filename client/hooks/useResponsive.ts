import { useWindowDimensions } from "react-native";
import { Theme } from "../constants/theme";

export interface ResponsiveInfo {
  width: number;
  height: number;
  isSmallMobile: boolean;   // < 380px (e.g. iPhone SE, compact Androids)
  isMobile: boolean;        // < 768px
  isTablet: boolean;        // 768px - 1023px (iPads, Surface, split-screen)
  isCompactDesktop: boolean;// 768px - 1079px (tight desktop / tablet landscape)
  isDesktop: boolean;       // >= 1024px (laptops, desktops)
  isWideDesktop: boolean;   // >= 1080px (full-width desktop nav)
  isLargeDesktop: boolean;  // >= 1440px (ultrawide, monitors)
  horizontalPadding: number;
  cardPadding: number;
  headerPadding: number;
  contentMaxWidth: number;
}

export function useResponsive(): ResponsiveInfo {
  const { width, height } = useWindowDimensions();

  const isSmallMobile = width < 380;
  const isMobile = width < Theme.breakpoints.compact; // < 768
  const isTablet = width >= Theme.breakpoints.compact && width < Theme.breakpoints.medium; // 768 - 1023
  const isCompactDesktop = width >= 768 && width < 1080;
  const isDesktop = width >= Theme.breakpoints.medium; // >= 1024
  const isWideDesktop = width >= 1080;
  const isLargeDesktop = width >= Theme.breakpoints.expanded; // >= 1280

  const horizontalPadding = isSmallMobile
    ? 12
    : isMobile
    ? 16
    : isTablet
    ? 24
    : 32;

  const cardPadding = isSmallMobile ? 12 : isMobile ? 16 : 20;
  const headerPadding = isSmallMobile ? 12 : isMobile ? 16 : 24;
  const contentMaxWidth = isLargeDesktop ? 1280 : 1140;

  return {
    width,
    height,
    isSmallMobile,
    isMobile,
    isTablet,
    isCompactDesktop,
    isDesktop,
    isWideDesktop,
    isLargeDesktop,
    horizontalPadding,
    cardPadding,
    headerPadding,
    contentMaxWidth,
  };
}

