import { useEffect } from 'react';

const useWakeLock = () => {
  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;
    if ('wakeLock' in navigator) {
      const requestWakeLock = async () => {
        try {
          wakeLock = await navigator.wakeLock.request('screen');
        } catch (err) {
          const { name, message } = err as Error;
          console.error(`Could not obtain wake lock: ${name}, ${message}`);
        }
      };

      document.addEventListener('visibilitychange', () => {
        if (wakeLock !== null && document.hidden) {
          wakeLock.release().then(() => console.info('Wake lock on page visibility change.'));
        } else if (!document.hidden) {
          requestWakeLock();
        }
      });

      requestWakeLock();
    }

    return () => {
      wakeLock?.release();
    };
  }, []);
};

export default useWakeLock;
