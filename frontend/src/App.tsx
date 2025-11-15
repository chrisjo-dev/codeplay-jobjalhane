import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { AssessmentQuiz } from "./components/AssessmentQuiz";
import { ResultsScreen } from "./components/ResultsScreen";
import { RoadmapScreen } from "./components/RoadmapScreen";
import { AnalyzeScreen } from "./components/AnalyzeScreen";

type Screen =
  | "home"
  | "assessment"
  | "results"
  | "roadmap"
  | "analyze";
type AnalyzeStep = "analysis" | "recommendations";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("home");
  const [uploadedFileName, setUploadedFileName] =
    useState<string>("");
  const [analyzeStep, setAnalyzeStep] =
    useState<AnalyzeStep>("analysis");

  const handleNavigate = (
    screen: string,
    fileName?: string,
    step?: string,
  ) => {
    setCurrentScreen(screen as Screen);
    if (fileName) {
      setUploadedFileName(fileName);
    }
    if (step) {
      setAnalyzeStep(step as AnalyzeStep);
    } else if (screen === "analyze") {
      // Reset to analysis step when navigating to analyze screen without explicit step
      setAnalyzeStep("analysis");
    }
    // Scroll to top immediately when navigating
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "home" && (
        <HomeScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === "assessment" && (
        <AssessmentQuiz onNavigate={handleNavigate} />
      )}
      {currentScreen === "results" && (
        <ResultsScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === "roadmap" && (
        <RoadmapScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === "analyze" && (
        <AnalyzeScreen
          onNavigate={handleNavigate}
          uploadedFileName={uploadedFileName}
          initialStep={analyzeStep}
          onStepChange={setAnalyzeStep}
        />
      )}
    </div>
  );
}