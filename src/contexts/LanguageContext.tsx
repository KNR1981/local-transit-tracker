
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te';

interface Translations {
  [key: string]: {
    en: string;
    te: string;
  };
}

const translations: Translations = {
  // Header
  login: { en: 'Login', te: 'లాగిన్' },
  signup: { en: 'Sign Up', te: 'సైన్ అప్' },
  profile: { en: 'Profile', te: 'ప్రొఫైల్' },
  helpCenter: { en: 'Help Center', te: 'సహాయ కేంద్రం' },
  logout: { en: 'Logout', te: 'లాగ్అవుట్' },
  
  // Landing Page
  welcomeTitle: { en: 'Welcome to Gamyam', te: 'గమ్యంకు స్వాగతం' },
  welcomeSubtitle: { en: 'Your trusted bus tracking companion', te: 'మీ నమ్మకమైన బస్ ట్రాకింగ్ సహాయకుడు' },
  
  // Dashboard
  selectBusType: { en: 'Select Bus Type', te: 'బస్ రకాన్ని ఎంచుకోండి' },
  localBus: { en: 'Local Bus', te: 'లోకల్ బస్' },
  districtBus: { en: 'District Bus', te: 'జిల్లా బస్' },
  stateBus: { en: 'State Bus', te: 'రాష్ట్ర బస్' },
  
  // Profile
  myProfile: { en: 'My Profile', te: 'నా ప్రొఫైల్' },
  profileInformation: { en: 'Profile Information', te: 'ప్రొఫైల్ సమాచారం' },
  fullName: { en: 'Full Name', te: 'పూర్తి పేరు' },
  email: { en: 'Email', te: 'ఇమెయిల్' },
  phoneNumber: { en: 'Phone Number', te: 'ఫోన్ నంబర్' },
  changePhoto: { en: 'Change Photo', te: 'ఫోటో మార్చండి' },
  saveChanges: { en: 'Save Changes', te: 'మార్పులను సేవ్ చేయండి' },
  back: { en: 'Back', te: 'వెనుకకు' },
  
  // Help Center
  contactSupport: { en: 'Contact Support', te: 'సపోర్ట్‌ను సంప్రదించండి' },
  phoneSupport: { en: 'Phone Support', te: 'ఫోన్ సపోర్ట్' },
  emailSupport: { en: 'Email Support', te: 'ఇమెయిల్ సపోర్ట్' },
  tollFree: { en: 'Toll Free', te: 'టోల్ ఫ్రీ' },
  raiseTicket: { en: 'Raise a Complaint Ticket', te: 'ఫిర్యాదు టికెట్ లేవనెత్తండి' },
  
  // Common
  loading: { en: 'Loading...', te: 'లోడవుతోంది...' },
  error: { en: 'Error', te: 'లోపం' },
  success: { en: 'Success', te: 'విజయం' },
  cancel: { en: 'Cancel', te: 'రద్దు' },
  save: { en: 'Save', te: 'సేవ్' },
  close: { en: 'Close', te: 'మూసివేయండి' },
  
  // Chatbot
  askMitrama: { en: 'Ask Mitrama', te: 'మిత్రమాను అడగండి' },
  typeMessage: { en: 'Type your message...', te: 'మీ సందేశాన్ని టైప్ చేయండి...' },
  send: { en: 'Send', te: 'పంపండి' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
