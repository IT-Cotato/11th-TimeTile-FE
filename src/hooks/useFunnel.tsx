import { useState, ReactNode } from "react";

export function useFunnel<T extends string>(steps: T[]) {
  const [currentStep, setCurrentStep] = useState<T>(steps[0]);

  const Funnel = ({ children }: { children: ReactNode }) => <>{children}</>;

  const Step = ({ name, children }: { name: T; children: ReactNode }) => {
    if (name !== currentStep) return null;
    return <>{children}</>;
  };

  const toNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const toPrev = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const moveStep = (step: T) => {
    if (steps.includes(step)) setCurrentStep(step);
  };

  return { Funnel, Step, toNext, toPrev, moveStep, currentStep };
}
