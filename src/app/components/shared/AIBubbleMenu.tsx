import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import { Sparkles, Sun, Moon, Target, X, Calculator, FileText, Globe, ArrowLeft, Send, Plus, RefreshCw, UserCircle } from "lucide-react";
import { useAIAssistant, useTranslations } from "../../context/AIAssistantContext";
import { useLocation, useNavigate, useParams } from "react-router";

export function AIBubbleMenu() {
  const { setIsTopRight, language, setLanguage, theme, setTheme } = useAIAssistant();
  const t = useTranslations();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("bottom-right");
  const [isDragging, setIsDragging] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{role: "user" | "ai", text: string}[]>([
    { role: "ai", text: language === "en" ? "Hello! I am your Lend-Lab AI assistant. How can I help you today?" : "¡Hola! Soy tu asistente IA de Lend-Lab. ¿En qué te puedo ayudar hoy?" }
  ]);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  useEffect(() => {
    setIsTopRight(position === "top-right");
  }, [position, setIsTopRight]);
  
  const handleDragEnd = (e: any, info: any) => {
    setIsDragging(false);
    
    const windowCenterX = window.innerWidth / 2;
    const windowCenterY = window.innerHeight / 2;
    
    if (info.point.y < windowCenterY) {
      setPosition(info.point.x < windowCenterX ? "top-left" : "top-right");
    } else {
      setPosition(info.point.x < windowCenterX ? "bottom-left" : "bottom-right");
    }
    
    // Reset the drag offset instantaneously so it snaps exactly to the corner
    dragX.set(0);
    dragY.set(0);
  };

  // Update greeting when language changes
  useEffect(() => {
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && newMessages[0].role === "ai") {
        newMessages[0].text = language === "en" ? "Hello! I am your Lend-Lab AI assistant. How can I help you today?" : "¡Hola! Soy tu asistente IA de Lend-Lab. ¿En qué te puedo ayudar hoy?";
      }
      return newMessages;
    });
  }, [language]);

  const toggleMenu = () => {
    if (!isDragging && !chatMode) {
      setIsOpen(!isOpen);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: language === "en" ? "I understand. I can help you with that right away." : "Entiendo. Puedo ayudarte con eso en un momento." 
      }]);
    }, 1000);
  };

  // Base angles for bottom-right: 
  // -180 is left, -90 is up. We spread them evenly (18 degrees apart for 6 items).
  const isSimulation = location.pathname.includes("/simulation");
  
  const menuItems = [
    { 
      id: 1, 
      icon: theme === "light" ? <Sun size={20} /> : <Moon size={20} />, 
      label: "Modo", 
      brAngle: -180,
      action: () => setTheme(theme === "light" ? "dark" : "light")
    },
    { 
      id: 2, 
      icon: <Sparkles size={20} />, 
      label: "IA", 
      brAngle: -162,
      action: () => { setChatMode(true); setIsOpen(false); }
    },
    { 
      id: 3, 
      icon: <span className="font-extrabold text-[12px]">{language === "es" ? "ES" : "EN"}</span>, 
      label: "Idioma", 
      brAngle: -144,
      action: () => setLanguage(language === "es" ? "en" : "es")
    },
    { 
      id: 4, 
      icon: isSimulation ? <UserCircle size={20} /> : <Calculator size={20} />, 
      label: isSimulation ? "Perfil" : "Simulación", 
      brAngle: -126,
      action: () => {
        if (isSimulation) {
          navigate(`/profile/${id || '123'}`);
        } else {
          navigate(`/simulation/${id || '123'}`);
        }
      }
    },
    { 
      id: 5, 
      icon: <FileText size={20} />, 
      label: "Documento", 
      brAngle: -108,
      action: () => console.log("Documento")
    },
    {
      id: 6,
      icon: <RefreshCw size={20} />,
      label: "Refrescar",
      brAngle: -90,
      action: () => navigate("/")
    }
  ];

  const positionClasses = {
    "top-right": chatMode ? "top-6 right-6" : "top-6 right-6",
    "bottom-right": chatMode ? "bottom-6 right-6" : "bottom-6 right-6",
    "top-left": chatMode ? "top-6 left-6" : "top-6 left-6",
    "bottom-left": chatMode ? "bottom-6 left-6" : "bottom-6 left-6"
  };

  return (
    <motion.div 
      layout
      initial={false}
      animate={{
        width: chatMode ? 320 : 64,
        height: chatMode ? 450 : 64,
        borderRadius: chatMode ? 24 : 32
      }}
      className={`fixed z-[9999] ${positionClasses[position]} bg-card/60 backdrop-blur-xl border border-border shadow-2xl flex flex-col ${chatMode ? 'overflow-hidden' : ''}`}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {!chatMode ? (
        <motion.div
          style={{ x: dragX, y: dragY }}
          ref={dragRef}
          drag
          dragConstraints={{ top: -1000, right: 1000, bottom: 1000, left: -1000 }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={() => {
            setIsDragging(true);
            setIsOpen(false);
          }}
          onDragEnd={handleDragEnd}
          className="relative w-full h-full flex items-center justify-center rounded-full"
        >
          <AnimatePresence>
            {isOpen && (
              <>
              {menuItems.map((item, index) => {
                let targetAngle = item.brAngle;
                // Adjust angles based on quadrant
                if (position === "bottom-left") {
                  // from right (0) to up (-90)
                  targetAngle = -180 - item.brAngle; 
                } else if (position === "top-right") {
                  // from left (180) to down (90)
                  targetAngle = -item.brAngle; 
                } else if (position === "top-left") {
                  // from right (0) to down (90)
                  targetAngle = 180 + item.brAngle;
                }

                const radius = 130; // Increased radius for wider movement range and 5 items
                const radian = (targetAngle * Math.PI) / 180;
                const cos = Math.cos(radian);
                const sin = Math.sin(radian);
                const targetX = cos * radius;
                const targetY = sin * radius;
                
                const isHorizontal = Math.abs(cos) > Math.abs(sin);
                let labelStyle: React.CSSProperties = {};
                
                // All labels project outwards radially from the center of the menu
                if (isHorizontal) {
                  labelStyle = cos > 0 
                    ? { left: "calc(100% + 14px)", top: "50%", transform: "translateY(-50%)" } 
                    : { right: "calc(100% + 14px)", top: "50%", transform: "translateY(-50%)" };
                } else {
                  labelStyle = sin > 0 
                    ? { top: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)" } 
                    : { bottom: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)" };
                }

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ opacity: 1, x: targetX, y: targetY, scale: 1 }}
                    exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20, 
                      delay: index * 0.05 
                    }}
                    className="absolute w-12 h-12 rounded-full border border-border flex items-center justify-center shadow-md cursor-pointer backdrop-blur-md bg-card/70 text-nu-purple transition-colors duration-200 group hover:bg-nu-purple hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); item.action(); }}
                  >
                    {item.icon}
                    <span 
                      className="absolute whitespace-nowrap px-3 py-1.5 bg-nu-purple border border-nu-purple rounded-full text-[11px] font-bold text-white shadow-md pointer-events-none transition-all duration-200 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                      style={labelStyle}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          className={`transition-colors duration-300 rounded-full flex items-center justify-center cursor-grab z-10 shadow-lg border border-background/40 backdrop-blur-md w-16 h-16 ${isOpen ? "bg-muted/50 text-muted-foreground" : "bg-card/40 text-foreground"}`}
        >
          {isOpen ? (
            <X size={28} />
          ) : (
            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center justify-center w-full h-full"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
                  stroke="var(--nu-purple)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="13" r="1.5" fill="var(--nu-purple)" />
                <circle cx="14" cy="13" r="1.5" fill="var(--nu-purple)" />
              </svg>
            </motion.div>
          )}
        </motion.button>
      </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col w-full h-full relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/20 backdrop-blur-md">
            <div className="flex items-center gap-2 text-nu-purple">
              <Sparkles size={18} />
              <span className="font-bold text-sm">{t.assistant}</span>
            </div>
            <button 
              onClick={() => setChatMode(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted/50 text-muted-foreground transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                  msg.role === "user" 
                    ? "bg-nu-purple text-white self-end rounded-br-sm" 
                    : "bg-card border border-border text-foreground self-start rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-background/20 backdrop-blur-md border-t border-border/50">
            <div className="flex items-center gap-2 bg-card rounded-full border border-border p-1 pl-4 pr-1 shadow-sm focus-within:ring-2 focus-within:ring-nu-purple/30 transition-all">
              <input 
                type="text" 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                placeholder={t.ask_ai}
                className="flex-1 bg-transparent text-[13px] outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
                className="w-8 h-8 rounded-full bg-nu-purple text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-nu-purple/90 transition-colors shadow-sm"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}