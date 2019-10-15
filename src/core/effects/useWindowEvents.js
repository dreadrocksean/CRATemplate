import { useEffect } from 'react';

const useWindowEvent = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

export const useWindowResize = callback => {
  return useWindowEvent('resize', e => {
    const { innerWidth: width, innerHeight: height } = e.currentTarget;
    callback({ width, height });
  });
};

export const useWindowMouseUp = callback => {
  return useWindowEvent('mouseup', callback);
};

export const useWindowMouseMove = callback => {
  return useWindowEvent('mousemove', callback);
};
