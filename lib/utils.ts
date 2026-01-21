
/**
 * Convert duration from various formats to seconds
 * Supports: "3:20", "03:20", 180 (seconds), etc.
 */
export function parseDuration(duration: string | number | undefined): number {
  // Default fallback
  const DEFAULT_DURATION = 180; // 3 minutes

  try {
    // If already a number, return it
    if (typeof duration === 'number') {
      return duration > 0 ? duration : DEFAULT_DURATION;
    }

    // If no duration provided
    if (!duration) {
      return DEFAULT_DURATION;
    }

    // Parse string format "mm:ss"
    const parts = duration.toString().split(':');
    
    if (parts.length === 2) {
      const mins = parseInt(parts[0], 10);
      const secs = parseInt(parts[1], 10);
      
      if (!isNaN(mins) && !isNaN(secs)) {
        return mins * 60 + secs;
      }
    }
    
    // If format is "hh:mm:ss"
    if (parts.length === 3) {
      const hours = parseInt(parts[0], 10);
      const mins = parseInt(parts[1], 10);
      const secs = parseInt(parts[2], 10);
      
      if (!isNaN(hours) && !isNaN(mins) && !isNaN(secs)) {
        return hours * 3600 + mins * 60 + secs;
      }
    }

    // Fallback
    return DEFAULT_DURATION;
  } catch (error) {
    console.error('Duration parsing error:', error);
    return DEFAULT_DURATION;
  }
}

/**
 * Format seconds to mm:ss
 */
export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return '0:00';
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format seconds to hh:mm:ss (if hours needed)
 */
export function formatDurationLong(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return '0:00:00';
  }

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${mins}:${secs.toString().padStart(2, '0')}`;
}