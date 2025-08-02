import { useState, useEffect } from "react";

export function useFunnel(steps: string[], initialStep?: string) {
  const [currentStep, setCurrentStep] = useState(
    initialStep && steps.includes(initialStep) ? initialStep : steps[0]
  );

  useEffect(() => {
    if (!steps.includes(currentStep)) {
      setCurrentStep(
        initialStep && steps.includes(initialStep) ? initialStep : steps[0]
      );
    }
  }, [steps, initialStep, currentStep]);

  const toNext = () => {
    const idx = steps.indexOf(currentStep);
    if (idx < steps.length - 1) setCurrentStep(steps[idx + 1]);
  };

  const toPrev = () => {
    const idx = steps.indexOf(currentStep);
    if (idx > 0) setCurrentStep(steps[idx - 1]);
  };

  const Funnel = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  const Step = ({
    name,
    children,
  }: {
    name: string;
    children: React.ReactNode;
  }) => {
    if (name !== currentStep) return null;
    return <>{children}</>;
  };

  return { Funnel, Step, toNext, toPrev, currentStep, setCurrentStep };
}
