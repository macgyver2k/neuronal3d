import type { VizPostProcessSettings } from './viz-appearance';

export function isMobileQualityProfile(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(max-width: 1023px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

export function mobilePixelRatioCap(): number {
  return isMobileQualityProfile() ? 1.0 : 2.0;
}

export const MOBILE_LIVE_INFER_MIN_MS = 150;
export const DESKTOP_LIVE_INFER_MIN_MS = 48;

export function liveInferMinIntervalMs(): number {
  return isMobileQualityProfile()
    ? MOBILE_LIVE_INFER_MIN_MS
    : DESKTOP_LIVE_INFER_MIN_MS;
}

export function mobilePostProcessPatch(): Partial<VizPostProcessSettings> {
  if (!isMobileQualityProfile()) return {};
  return {
    bloomEnabled: false,
    fxaaEnabled: false,
  };
}

export function mobileVibeCameraEnabledDefault(): boolean {
  return !isMobileQualityProfile();
}

export const MOBILE_POINTER_MOVE_MIN_MS = 33;

export const LIVE_INFER_STATUS_MIN_MS = 500;
