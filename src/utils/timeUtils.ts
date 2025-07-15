/**
 * @param 
 * @returns 
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 
 * @param 
 * @returns 
 */
export const millisecondsToSeconds = (milliseconds: number): number => {
  return Math.floor(milliseconds / 1000);
};

/**
 
 * @param 
 * @returns 
 */
export const parseTimeString = (timeString: string): number => {
  const parts = timeString.split(':');
  if (parts.length !== 2) return 0;
  
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);
  
  if (isNaN(minutes) || isNaN(seconds)) return 0;
  
  return minutes * 60 + seconds;
};

/**

 * @param 
 * @returns 
 */
export const formatDurationText = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds} saniyə`;
  } else if (remainingSeconds === 0) {
    return `${minutes} dəqiqə`;
  } else {
    return `${minutes} dəqiqə ${remainingSeconds} saniyə`;
  }
};