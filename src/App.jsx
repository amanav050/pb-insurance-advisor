import { useState, useCallback } from 'react';
import { SCREENS } from './utils/constants';
import Header from './components/Header';
import WelcomeScreen from './components/WelcomeScreen';
import ChatInterface from './components/ChatInterface';
import RecommendationScreen from './components/RecommendationScreen';
import ScheduleCallbackModal from './components/ScheduleCallbackModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
  const [insuranceType, setInsuranceType] = useState(null);
  const [recommendationText, setRecommendationText] = useState('');
  const [showCallbackModal, setShowCallbackModal] = useState(false);

  const handleSelectType = useCallback((type) => {
    setInsuranceType(type);
    setCurrentScreen(SCREENS.CHAT);
  }, []);

  const handleBack = useCallback(() => {
    setCurrentScreen(SCREENS.WELCOME);
    setInsuranceType(null);
    setRecommendationText('');
  }, []);

  const handleRecommendation = useCallback((text) => {
    setRecommendationText(text);
    setCurrentScreen(SCREENS.RECOMMENDATION);
  }, []);

  return (
    <div className="h-dvh flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--pb-white)' }}>
      <Header
        onBack={handleBack}
        showBack={currentScreen !== SCREENS.WELCOME}
      />

      {currentScreen === SCREENS.WELCOME && (
        <div className="flex-1 overflow-y-auto">
          <WelcomeScreen onSelectType={handleSelectType} />
        </div>
      )}

      {currentScreen === SCREENS.CHAT && (
        <ChatInterface
          insuranceType={insuranceType}
          onRecommendation={handleRecommendation}
        />
      )}

      {currentScreen === SCREENS.RECOMMENDATION && (
        <RecommendationScreen
          recommendationText={recommendationText}
          insuranceType={insuranceType}
          onStartOver={handleBack}
          onScheduleCallback={() => setShowCallbackModal(true)}
        />
      )}

      <ScheduleCallbackModal
        isOpen={showCallbackModal}
        onClose={() => setShowCallbackModal(false)}
      />
    </div>
  );
}
