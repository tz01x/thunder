import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Check, ArrowRight, RefreshCw, LogOut, Lock, Phone, UserCheck } from 'lucide-react';
import { CursorState, UserProfile } from '../types';

interface LoginPageProps {
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  onLogout: () => void;
  onBack: () => void;
  setCursorState: (state: CursorState) => void;
}

const COUNTRY_CODES = [
  { code: '+880', label: 'BD (+880)', flag: '🇧🇩', example: '1712-345678' },
  { code: '+1', label: 'US/CA (+1)', flag: '🇺🇸', example: '555-0199' },
  { code: '+44', label: 'UK (+44)', flag: '🇬🇧', example: '7911-123456' },
  { code: '+971', label: 'UAE (+971)', flag: '🇦🇪', example: '50-1234567' },
  { code: '+966', label: 'KSA (+966)', flag: '🇸🇦', example: '50-1234567' },
  { code: '+91', label: 'IN (+91)', flag: '🇮🇳', example: '98765-43210' },
];

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  onLoginSuccess,
  onLogout,
  onBack,
  setCursorState,
}) => {
  // Authentication states
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [selectedCountry, setSelectedCountry] = useState('+880');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Security Robot Check states
  const [robotChecked, setRobotChecked] = useState(false);
  const [isVerifyingRobot, setIsVerifyingRobot] = useState(false);
  const [robotToken, setRobotToken] = useState<string | null>(null);

  // OTP states
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle Robot Security Check Toggle
  const handleTriggerRobotCheck = () => {
    if (robotChecked || isVerifyingRobot) return;
    setIsVerifyingRobot(true);

    // Simulate cryptographic proof-of-work / browser integrity check
    setTimeout(() => {
      setIsVerifyingRobot(false);
      setRobotChecked(true);
      setRobotToken('TDR-SEC-' + Math.random().toString(36).substring(2, 9).toUpperCase());
    }, 900);
  };

  // Generate & Dispatch OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!robotChecked) return;
    if (phoneNumber.trim().length < 6) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate realistic 6-digit code
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setOtpDigits(['', '', '', '', '', '']);
      setOtpError(null);
      setStep('OTP');
      setResendTimer(45);
      setIsSubmitting(false);

      // Focus first input box
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }, 600);
  };

  // Handle OTP digit entry
  const handleOtpChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, '').slice(-1);
    const updated = [...otpDigits];
    updated[index] = cleanValue;
    setOtpDigits(updated);
    setOtpError(null);

    // Auto-advance
    if (cleanValue && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation in OTP
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste in OTP input
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const updated = [...otpDigits];
    for (let i = 0; i < pasted.length; i++) {
      updated[i] = pasted[i];
    }
    setOtpDigits(updated);
    if (pasted.length >= 6) {
      otpInputRefs.current[5]?.focus();
    } else {
      otpInputRefs.current[pasted.length]?.focus();
    }
  };

  // Verify entered OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpDigits.join('');
    if (entered.length < 6) {
      setOtpError('PLEASE ENTER THE COMPLETE 6-DIGIT SECURITY CODE');
      return;
    }

    if (entered !== generatedOtp) {
      setOtpError('INVALID VERIFICATION CODE. PLEASE RE-CHECK OR RESEND.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const userProfile: UserProfile = {
        phone: phoneNumber.trim(),
        countryCode: selectedCountry,
        isVerified: true,
        loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      onLoginSuccess(userProfile);
      setIsSubmitting(false);
    }, 500);
  };

  // Quick fill demo helper
  const handleQuickFillDemo = () => {
    if (!generatedOtp) return;
    const digits = generatedOtp.split('');
    setOtpDigits(digits);
    setOtpError(null);
  };

  return (
    <div className="w-full min-h-screen pt-24 sm:pt-28 md:pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto text-black font-sans">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between pb-8 border-b border-black/10 mb-10">
        <button
          onClick={onBack}
          onMouseEnter={() => setCursorState({ type: 'button' })}
          onMouseLeave={() => setCursorState({ type: 'default' })}
          className="text-[10px] font-mono tracking-[0.25em] text-neutral-500 hover:text-black uppercase transition-colors flex items-center gap-2"
        >
          <span>←</span>
          <span>RETURN TO ARCHIVE</span>
        </button>

        <div className="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
          SECURE PROTOCOL // 256-BIT ENCRYPTION
        </div>
      </div>

      {/* ===================================================================== */}
      {/* CASE A: USER IS CURRENTLY LOGGED IN                                   */}
      {/* ===================================================================== */}
      {currentUser ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto bg-neutral-50 border border-black/15 p-6 sm:p-10 shadow-sm"
        >
          <div className="flex items-center justify-between pb-6 border-b border-black/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">
                  AUTHENTICATED PROFILE
                </span>
                <span className="text-base font-mono font-semibold uppercase text-black">
                  {currentUser.countryCode} {currentUser.phone}
                </span>
              </div>
            </div>

            <span className="text-[9px] font-mono tracking-widest uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 border border-emerald-300">
              VERIFIED
            </span>
          </div>

          <div className="py-6 space-y-4 text-xs font-mono text-neutral-600 border-b border-black/10">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">SESSION AUTH:</span>
              <span className="text-black font-medium">ROBOT INTEGRITY PASSED</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">LOGIN TIMESTAMP:</span>
              <span className="text-black font-medium">{currentUser.loginTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">DISPATCH DESTINATION:</span>
              <span className="text-black font-medium">DHAKA & BANGLADESH METRO</span>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onBack}
              onMouseEnter={() => setCursorState({ type: 'button' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="flex-1 py-3.5 bg-black text-white text-xs font-mono uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
            >
              BROWSE STORE
            </button>
            <button
              onClick={onLogout}
              onMouseEnter={() => setCursorState({ type: 'button' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="py-3.5 px-6 border border-black/20 text-neutral-700 hover:text-black hover:border-black text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>SIGN OUT</span>
            </button>
          </div>
        </motion.div>
      ) : (
        /* ===================================================================== */
        /* CASE B: LOGIN FLOW WITH PHONE NUMBER & ROBOT CHECK SECURITY           */
        /* ===================================================================== */
        <div className="max-w-xl mx-auto flex flex-col items-center">
          {/* Header Title */}
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-2">
              CLIENT AUTHENTICATION
            </span>
            <h1 className="text-2xl sm:text-3xl font-light tracking-[0.2em] uppercase text-black">
              PHONE VERIFICATION
            </h1>
            <p className="text-xs text-neutral-500 font-light mt-2 max-w-sm mx-auto leading-relaxed">
              Sign in with your mobile number to view orders, dispatch updates, and express archival checkout.
            </p>
          </div>

          <div className="w-full bg-white border border-black p-6 sm:p-10 shadow-[0_15px_35px_rgba(0,0,0,0.04)]">
            <AnimatePresence mode="wait">
              {/* STEP 1: PHONE NUMBER & ROBOT SECURITY CHECK */}
              {step === 'PHONE' && (
                <motion.form
                  key="form-phone"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  onSubmit={handleSendOtp}
                  className="space-y-6"
                >
                  {/* Phone Number Input Group */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-[0.25em] text-neutral-600 uppercase flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-black" />
                      <span>ENTER MOBILE NUMBER</span>
                    </label>

                    <div className="flex border border-black/20 focus-within:border-black transition-colors bg-neutral-50">
                      {/* Country Code Dropdown */}
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="bg-transparent px-3 py-3 text-xs font-mono text-black border-r border-black/15 outline-none cursor-pointer"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code} className="bg-white text-black font-sans">
                            {c.flag} {c.label}
                          </option>
                        ))}
                      </select>

                      {/* Number Input */}
                      <input
                        type="tel"
                        required
                        placeholder="1712-345678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d\s-]/g, ''))}
                        className="flex-1 px-4 py-3 bg-transparent text-sm font-mono text-black placeholder:text-neutral-400 outline-none"
                      />
                    </div>
                    <span className="text-[9px] font-mono text-neutral-400 block">
                      We dispatch a one-time cryptographic code (OTP) via SMS.
                    </span>
                  </div>

                  {/* =================================================== */}
                  {/* "ARE YOU A ROBOT" SECURITY PROTOCOL CHECK           */}
                  {/* =================================================== */}
                  <div className="pt-2">
                    <div className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase mb-2 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-neutral-700" />
                      <span>ANTI-BOT INTEGRITY VERIFICATION</span>
                    </div>

                    <div
                      onClick={handleTriggerRobotCheck}
                      onMouseEnter={() => !robotChecked && setCursorState({ type: 'button' })}
                      onMouseLeave={() => setCursorState({ type: 'default' })}
                      className={`p-4 border transition-all duration-300 flex items-center justify-between select-none cursor-pointer ${
                        robotChecked
                          ? 'bg-neutral-50 border-emerald-500'
                          : 'bg-neutral-100/70 border-black/20 hover:border-black'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Checkbox box */}
                        <div
                          className={`w-6 h-6 rounded-xs border flex items-center justify-center transition-all ${
                            robotChecked
                              ? 'bg-black border-black text-white'
                              : isVerifyingRobot
                              ? 'border-neutral-400 bg-neutral-200'
                              : 'border-black/40 bg-white'
                          }`}
                        >
                          {robotChecked && <Check className="w-4 h-4 stroke-[3]" />}
                          {isVerifyingRobot && (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-neutral-700" />
                          )}
                        </div>

                        <div className="flex flex-col">
                          <span className="text-xs font-mono font-medium uppercase text-black">
                            {isVerifyingRobot
                              ? 'VERIFYING BROWSER INTEGRITY...'
                              : robotChecked
                              ? 'I AM NOT A ROBOT'
                              : 'I AM NOT A ROBOT'}
                          </span>
                          <span className="text-[9px] font-mono text-neutral-400">
                            {robotChecked
                              ? `PASSKEY: ${robotToken}`
                              : 'Click checkbox to run security clearance'}
                          </span>
                        </div>
                      </div>

                      {/* Security badge stamp */}
                      <div className="flex items-center gap-1 text-[9px] font-mono uppercase text-neutral-400">
                        <ShieldCheck className={`w-4 h-4 ${robotChecked ? 'text-emerald-600' : 'text-neutral-400'}`} />
                        <span className="hidden sm:inline">THUNDER SHIELD</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={!robotChecked || phoneNumber.trim().length < 6 || isSubmitting}
                      onMouseEnter={() => setCursorState({ type: 'button' })}
                      onMouseLeave={() => setCursorState({ type: 'default' })}
                      className="w-full py-4 text-xs font-mono uppercase tracking-[0.25em] font-semibold bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{isSubmitting ? 'DISPATCHING...' : 'SEND OTP CODE'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {!robotChecked && (
                      <span className="text-[10px] font-mono text-amber-700 text-center block mt-2">
                        * Please complete the security check above to request your code.
                      </span>
                    )}
                  </div>
                </motion.form>
              )}

              {/* STEP 2: ENTER & VERIFY 6-DIGIT OTP */}
              {step === 'OTP' && (
                <motion.form
                  key="form-otp"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  onSubmit={handleVerifyOtp}
                  className="space-y-6"
                >
                  {/* Destination info */}
                  <div className="text-center pb-2 border-b border-black/10">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                      ENTER 6-DIGIT SECURITY CODE
                    </span>
                    <div className="text-sm font-mono font-semibold text-black">
                      SENT TO: {selectedCountry} {phoneNumber}
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('PHONE')}
                      className="text-[10px] font-mono text-neutral-500 hover:text-black uppercase underline underline-offset-4 mt-2"
                    >
                      EDIT NUMBER
                    </button>
                  </div>

                  {/* LIVE DEMO CODE HELPER (For instant testing) */}
                  <div className="p-3 bg-neutral-100 border border-black/15 flex items-center justify-between text-xs font-mono">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500">
                        SIMULATED SMS OTP
                      </span>
                      <span className="font-bold tracking-widest text-black text-sm">
                        {generatedOtp}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleQuickFillDemo}
                      className="text-[10px] uppercase font-bold text-black border border-black px-2.5 py-1 bg-white hover:bg-black hover:text-white transition-colors"
                    >
                      AUTO FILL
                    </button>
                  </div>

                  {/* 6 Digit Input Cells */}
                  <div className="flex justify-between gap-2 sm:gap-3 py-2">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          otpInputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        onPaste={idx === 0 ? handleOtpPaste : undefined}
                        className="w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-mono font-bold bg-neutral-50 border border-black/30 focus:border-black focus:bg-white outline-none transition-all"
                      />
                    ))}
                  </div>

                  {otpError && (
                    <div className="text-center text-[10px] font-mono text-rose-600 tracking-wider">
                      {otpError}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={otpDigits.join('').length < 6 || isSubmitting}
                      onMouseEnter={() => setCursorState({ type: 'button' })}
                      onMouseLeave={() => setCursorState({ type: 'default' })}
                      className="w-full py-4 text-xs font-mono uppercase tracking-[0.25em] font-semibold bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? 'VALIDATING SECURITY CODE...' : 'VERIFY & ENTER ARCHIVE'}
                    </button>

                    {/* Resend OTP button */}
                    <div className="text-center">
                      {resendTimer > 0 ? (
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                          RESEND CODE IN {resendTimer}S
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                            setGeneratedOtp(newOtp);
                            setOtpDigits(['', '', '', '', '', '']);
                            setResendTimer(45);
                          }}
                          className="text-[10px] font-mono text-black hover:underline uppercase tracking-widest"
                        >
                          RESEND CODE (OTP)
                        </button>
                      )}
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};
