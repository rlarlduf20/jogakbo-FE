import { useRef, useEffect } from "react";

const useScrollAppear = (
  direction: string,
  duration = 1,
  delay: number,
  threshold = 0.1
) => {
  const elRef = useRef<any>(null);

  const translateByDirection = (value: string) => {
    switch (value) {
      case "up":
        return "translate3d(0, 50%, 0)";
      case "down":
        return "translate3d(0, -50%, 0)";
      case "left":
        return "translate3d(50%, 0, 0)";
      case "right":
        return "translate3d(-50%, 0, 0)";
      default:
        return;
    }
  };

  useEffect(() => {
    const { current } = elRef;
    let observer: any;

    const handleScroll = ([entry]: any) => {
      const { current } = elRef;
      if (entry.isIntersecting) {
        current.style.transitionProperty = "all";
        current.style.transitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
        current.style.transitionDelay = `${delay}s`;
        current.style.opacity = 1;
        current.style.transform = "translate3d(0, 0, 0)";
      }
    };

    if (current) {
      observer = new IntersectionObserver(handleScroll, {
        threshold,
      });
      observer.observe(current);
    }

    return () => observer && observer.disconnect();
  }, [delay, duration, threshold]);

  return {
    ref: elRef,
    style: {
      opacity: 0,
      transform: translateByDirection(direction),
    },
  };
};

export default useScrollAppear;
