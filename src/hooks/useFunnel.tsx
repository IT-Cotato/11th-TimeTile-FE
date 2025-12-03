import { useEffect, useState, ReactNode } from "react";

interface StepProps {
  name: string;
  children: ReactNode;
}

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
    if (idx < steps.length - 1) {
      setCurrentStep(steps[idx + 1]);
    }
  };

  const toPrev = () => {
    const idx = steps.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(steps[idx - 1]);
    }
  };

  const Step = ({ name, children }: StepProps) => {
    if (!steps.includes(name)) return null;
    if (name !== currentStep) return null;
    return <>{children}</>;
  };

  const Funnel = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
  };

  Funnel.Step = Step;

  return { Funnel, toNext, toPrev, currentStep, setStep: setCurrentStep };
}
