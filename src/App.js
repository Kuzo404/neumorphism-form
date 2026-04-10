import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, Upload, Check } from 'lucide-react';

// --- Floating Emoji Component ---
// eslint-disable-next-line no-unused-vars
const FloatingEmoji = ({ feedbackType }) => {
  const [emojis, setEmojis] = useState([]);

  // Хүсэлт icon SVG
  const RequestIcon = () => (
    <svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 112h288v192H48z" fill="#E3F2FD" stroke="#1976D2" strokeWidth="16"/>
      <path d="M48 304l48-48" stroke="#1976D2" strokeWidth="16"/>
      <path d="M80 144h224M80 176h224M80 208h160" stroke="#333" strokeWidth="12" strokeLinecap="round"/>
      <rect x="16" y="48" width="144" height="48" rx="8" fill="#2196F3" stroke="#1565C0" strokeWidth="8"/>
      <path d="M40 72h96" stroke="#fff" strokeWidth="8" strokeLinecap="round"/>
      <circle cx="400" cy="112" r="80" fill="#FFD54F" stroke="#333" strokeWidth="12"/>
      <path d="M370 100c0-8 8-16 16-16s16 8 16 8" stroke="#333" strokeWidth="8" strokeLinecap="round"/>
      <path d="M400 100c0-8 8-16 16-16s16 8 16 8" stroke="#333" strokeWidth="8" strokeLinecap="round"/>
      <path d="M365 135c15 20 55 20 70 0" stroke="#333" strokeWidth="8" strokeLinecap="round" fill="none"/>
    </svg>
  );

  useEffect(() => {
    // Шинэ emoji үүсгэх
    const interval = setInterval(() => {
      const id = Date.now();
      const left = Math.random() * 70 + 15; // 15% - 85%
      setEmojis(prev => [...prev.slice(-6), { id, left }]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Emoji устгах
  useEffect(() => {
    const cleanup = setInterval(() => {
      setEmojis(prev => prev.filter(e => Date.now() - e.id < 8000));
    }, 500);
    return () => clearInterval(cleanup);
  }, []);

  // Emoji сонгох
  const getEmoji = () => {
    if (feedbackType === 'Талархал') return <span className="text-3xl">😊</span>;
    if (feedbackType === 'Гомдол') return <span className="text-3xl">😢</span>;
    return <RequestIcon />;
  };

  return (
    <div className="absolute left-0 right-0 top-auto bottom-[100%] h-[600px] overflow-visible pointer-events-none z-0">
      {emojis.map(({ id, left }) => (
        <div
          key={id}
          className="absolute animate-float-full opacity-60"
          style={{ 
            left: `${left}%`, 
            bottom: '0px',
          }}
        >
          {getEmoji()}
        </div>
      ))}
      <style>{`
        @keyframes float-full {
          0% { 
            transform: translateY(0) scale(0.8); 
            opacity: 0; 
          }
          5% { 
            opacity: 0.6; 
          }
          95% { 
            opacity: 0.5; 
          }
          100% { 
            transform: translateY(-600px) scale(0.8); 
            opacity: 0; 
          }
        }
        .animate-float-full {
          animation: float-full 8s linear forwards;
        }
      `}</style>
    </div>
  );
};

// --- 6 Different Realistic Character Styles with Mood Support ---
const renderCharacter = (selectedAvatar, eyePosition, mood = 'neutral') => {
  // Mood-based expression helpers
  const getMouthPath = (baseY, type) => {
    if (mood === 'Гомдол') {
      // Уурласан - доошоо муруй, бага зэрэг нээлттэй
      return `M 85 ${baseY + 2} Q 100 ${baseY - 8} 115 ${baseY + 2}`;
    } else if (mood === 'Талархал') {
      // Баяртай - том инээмсэглэл
      return `M 82 ${baseY - 5} Q 100 ${baseY + 15} 118 ${baseY - 5}`;
    } else {
      // Хүсэлт / neutral - жижиг инээмсэглэл
      return `M 88 ${baseY} Q 100 ${baseY + 8} 112 ${baseY}`;
    }
  };

  const getEyeStyle = () => {
    if (mood === 'Гомдол') {
      return { eyeHeight: 10, pupilSize: 5, eyebrowAngle: 'angry' };
    } else if (mood === 'Талархал') {
      return { eyeHeight: 8, pupilSize: 5, eyebrowAngle: 'happy', closed: true };
    } else {
      return { eyeHeight: 12, pupilSize: 5, eyebrowAngle: 'neutral' };
    }
  };

  const eyeStyle = getEyeStyle();
  const isHappy = mood === 'Талархал';
  const isAngry = mood === 'Гомдол';

  const characterStyles = {
    1: ( // Эрэгтэй - Business Professional (костюмтай)
      <svg viewBox="0 0 200 280" className={`w-full h-full ${isHappy ? 'animate-bounce-slow' : ''}`}>
        {/* Үс */}
        <ellipse cx="100" cy="55" rx="52" ry="30" fill="#2C1810" />
        <path d="M 48 70 Q 48 30 100 25 Q 152 30 152 70" fill="#2C1810" />
        {/* Толгой */}
        <ellipse cx="100" cy="85" rx="45" ry="50" fill="#E8C39E" />
        {/* Чих */}
        <ellipse cx="55" cy="85" rx="8" ry="12" fill="#E8C39E" />
        <ellipse cx="145" cy="85" rx="8" ry="12" fill="#E8C39E" />
        {/* Хөмсөг - mood-д суурилсан */}
        {isAngry ? (
          <>
            {/* Уурласан хөмсөг - дотогшоо чиглэсэн */}
            <path d="M 70 68 Q 80 62 90 66" stroke="#2C1810" strokeWidth="3" fill="none" />
            <path d="M 110 66 Q 120 62 130 68" stroke="#2C1810" strokeWidth="3" fill="none" />
          </>
        ) : (
          <>
            <path d="M 70 65 Q 80 60 90 65" stroke="#2C1810" strokeWidth="3" fill="none" />
            <path d="M 110 65 Q 120 60 130 65" stroke="#2C1810" strokeWidth="3" fill="none" />
          </>
        )}
        {/* Нүд */}
        {isHappy ? (
          <>
            <path d="M 70 80 Q 80 72 90 80" stroke="#4A3728" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 110 80 Q 120 72 130 80" stroke="#4A3728" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="80" cy="80" rx="10" ry={eyeStyle.eyeHeight} fill="white" />
            <circle cx={80 + eyePosition.x * 0.5} cy={80 + eyePosition.y * 0.5} r={eyeStyle.pupilSize} fill="#4A3728" />
            <circle cx={78 + eyePosition.x * 0.5} cy={78 + eyePosition.y * 0.5} r="2" fill="white" />
            <ellipse cx="120" cy="80" rx="10" ry={eyeStyle.eyeHeight} fill="white" />
            <circle cx={120 + eyePosition.x * 0.5} cy={80 + eyePosition.y * 0.5} r={eyeStyle.pupilSize} fill="#4A3728" />
            <circle cx={118 + eyePosition.x * 0.5} cy={78 + eyePosition.y * 0.5} r="2" fill="white" />
          </>
        )}
        {/* Уурын тэмдэг - гомдолд */}
        {isAngry && (
          <>
            {/* Духан дээрх уурын судас */}
            <g className="animate-pulse">
              <path d="M 140 55 L 145 60 M 145 55 L 140 60" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" />
              <path d="M 142 57 L 147 62 M 147 57 L 142 62" stroke="#E53E3E" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            {/* Хацар улайсан */}
            <ellipse cx="65" cy="95" rx="8" ry="5" fill="#E53E3E" opacity="0.3" />
            <ellipse cx="135" cy="95" rx="8" ry="5" fill="#E53E3E" opacity="0.3" />
          </>
        )}
        {/* Хамар */}
        <path d="M 100 85 L 97 100 Q 100 105 103 100 L 100 85" fill="#D4A574" />
        {/* Ам - mood-д суурилсан */}
        <path d={getMouthPath(115, 1)} stroke={isHappy ? "#E57373" : "#C4846C"} strokeWidth={isHappy ? "4" : "3"} fill={isHappy ? "#FFE4E1" : "none"} strokeLinecap="round" />
        {/* Хацар - баяртай үед */}
        {isHappy && (
          <>
            <ellipse cx="65" cy="95" rx="10" ry="6" fill="#FFB6C1" opacity="0.5" />
            <ellipse cx="135" cy="95" rx="10" ry="6" fill="#FFB6C1" opacity="0.5" />
          </>
        )}
        {/* Хүзүү */}
        <rect x="88" y="130" width="24" height="20" fill="#E8C39E" />
        {/* Костюм */}
        <path d="M 40 150 L 60 145 L 88 150 L 88 220 L 40 220 Z" fill="#1a365d" />
        <path d="M 160 150 L 140 145 L 112 150 L 112 220 L 160 220 Z" fill="#1a365d" />
        <path d="M 88 150 L 112 150 L 112 220 L 88 220 Z" fill="white" />
        <path d="M 95 155 L 100 175 L 105 155 Z" fill="#c53030" />
        <rect x="96" y="175" width="8" height="40" fill="#c53030" />
      </svg>
    ),
    2: ( // Эмэгтэй - Professional Woman
      <svg viewBox="0 0 200 280" className={`w-full h-full ${isHappy ? 'animate-bounce-slow' : ''}`}>
        {/* Урт үс */}
        <path d="M 45 60 Q 40 120 50 180 L 70 180 Q 60 120 65 70 Z" fill="#8B4513" />
        <path d="M 155 60 Q 160 120 150 180 L 130 180 Q 140 120 135 70 Z" fill="#8B4513" />
        <ellipse cx="100" cy="50" rx="55" ry="25" fill="#8B4513" />
        <path d="M 45 55 Q 45 30 100 20 Q 155 30 155 55 Q 155 70 145 75 L 55 75 Q 45 70 45 55" fill="#8B4513" />
        {/* Толгой */}
        <ellipse cx="100" cy="85" rx="42" ry="48" fill="#FFDAB9" />
        {/* Чих */}
        <ellipse cx="58" cy="85" rx="6" ry="10" fill="#FFDAB9" />
        <ellipse cx="142" cy="85" rx="6" ry="10" fill="#FFDAB9" />
        {/* Хөмсөг */}
        {isAngry ? (
          <>
            {/* Уурласан хөмсөг - дотогшоо чиглэсэн */}
            <path d="M 72 70 Q 80 64 88 68" stroke="#5D4037" strokeWidth="2" fill="none" />
            <path d="M 112 68 Q 120 64 128 70" stroke="#5D4037" strokeWidth="2" fill="none" />
          </>
        ) : (
          <>
            <path d="M 72 68 Q 80 64 88 68" stroke="#5D4037" strokeWidth="2" fill="none" />
            <path d="M 112 68 Q 120 64 128 68" stroke="#5D4037" strokeWidth="2" fill="none" />
          </>
        )}
        {/* Нүд */}
        {isHappy ? (
          <>
            <path d="M 71 80 Q 80 72 89 80" stroke="#3D2314" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 111 80 Q 120 72 129 80" stroke="#3D2314" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="80" cy="80" rx="9" ry={eyeStyle.eyeHeight - 1} fill="white" />
            <circle cx={80 + eyePosition.x * 0.5} cy={80 + eyePosition.y * 0.5} r={eyeStyle.pupilSize} fill="#3D2314" />
            <circle cx={78 + eyePosition.x * 0.5} cy={78 + eyePosition.y * 0.5} r="2" fill="white" />
            <ellipse cx="120" cy="80" rx="9" ry={eyeStyle.eyeHeight - 1} fill="white" />
            <circle cx={120 + eyePosition.x * 0.5} cy={80 + eyePosition.y * 0.5} r={eyeStyle.pupilSize} fill="#3D2314" />
            <circle cx={118 + eyePosition.x * 0.5} cy={78 + eyePosition.y * 0.5} r="2" fill="white" />
          </>
        )}
        {/* Уурын тэмдэг */}
        {isAngry && (
          <>
            <g className="animate-pulse">
              <path d="M 140 55 L 145 60 M 145 55 L 140 60" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" />
            </g>
            <ellipse cx="65" cy="95" rx="8" ry="5" fill="#E53E3E" opacity="0.3" />
            <ellipse cx="135" cy="95" rx="8" ry="5" fill="#E53E3E" opacity="0.3" />
          </>
        )}
        {/* Сормуус */}
        <path d="M 71 75 L 68 72 M 75 73 L 73 69 M 85 73 L 87 69 M 89 75 L 92 72" stroke="#3D2314" strokeWidth="1" />
        <path d="M 111 75 L 108 72 M 115 73 L 113 69 M 125 73 L 127 69 M 129 75 L 132 72" stroke="#3D2314" strokeWidth="1" />
        {/* Хамар */}
        <path d="M 100 85 L 98 98 Q 100 102 102 98 L 100 85" fill="#F0C8A0" />
        {/* Уруул */}
        {isHappy ? (
          <>
            <ellipse cx="100" cy="115" rx="14" ry="7" fill="#E57373" />
            <path d="M 86 115 Q 100 108 114 115" stroke="#D32F2F" strokeWidth="1" fill="none" />
          </>
        ) : isAngry ? (
          <path d="M 88 118 Q 100 110 112 118" stroke="#C4846C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : (
          <>
            <ellipse cx="100" cy="115" rx="12" ry="5" fill="#E57373" />
            <path d="M 88 115 Q 100 112 112 115" stroke="#D32F2F" strokeWidth="1" fill="none" />
          </>
        )}
        {/* Хацар */}
        {isHappy && (
          <>
            <ellipse cx="65" cy="95" rx="10" ry="6" fill="#FFB6C1" opacity="0.6" />
            <ellipse cx="135" cy="95" rx="10" ry="6" fill="#FFB6C1" opacity="0.6" />
          </>
        )}
        {/* Хүзүү */}
        <path d="M 90 130 L 90 155 L 110 155 L 110 130" fill="#FFDAB9" />
        {/* Хувцас */}
        <path d="M 50 155 Q 70 145 100 150 Q 130 145 150 155 L 150 220 L 50 220 Z" fill="#5C6BC0" />
        <ellipse cx="100" cy="155" rx="25" ry="12" fill="#FFDAB9" />
      </svg>
    ),
    3: ( // Эрэгтэй - Casual Developer
      <svg viewBox="0 0 200 280" className={`w-full h-full ${isHappy ? 'animate-bounce-slow' : ''}`}>
        {/* Үс */}
        <path d="M 55 65 Q 55 35 100 30 Q 145 35 145 65 L 140 70 L 60 70 Z" fill="#1a1a1a" />
        {/* Толгой */}
        <ellipse cx="100" cy="85" rx="43" ry="48" fill="#D4A574" />
        {/* Чих */}
        <ellipse cx="57" cy="85" rx="7" ry="11" fill="#D4A574" />
        <ellipse cx="143" cy="85" rx="7" ry="11" fill="#D4A574" />
        {/* Шил frame */}
        <rect x="65" y="70" width="30" height="22" rx="4" fill="none" stroke="#333" strokeWidth="3" />
        <rect x="105" y="70" width="30" height="22" rx="4" fill="none" stroke="#333" strokeWidth="3" />
        <line x1="95" y1="81" x2="105" y2="81" stroke="#333" strokeWidth="3" />
        {/* Нүд */}
        {isHappy ? (
          <>
            <path d="M 70 80 Q 80 73 90 80" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 110 80 Q 120 73 130 80" stroke="#2E7D32" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="80" cy="80" rx="8" ry={eyeStyle.eyeHeight - 2} fill="white" />
            <circle cx={80 + eyePosition.x * 0.4} cy={80 + eyePosition.y * 0.4} r={eyeStyle.pupilSize - 1} fill="#2E7D32" />
            <circle cx={78 + eyePosition.x * 0.4} cy={78 + eyePosition.y * 0.4} r="1.5" fill="white" />
            <ellipse cx="120" cy="80" rx="8" ry={eyeStyle.eyeHeight - 2} fill="white" />
            <circle cx={120 + eyePosition.x * 0.4} cy={80 + eyePosition.y * 0.4} r={eyeStyle.pupilSize - 1} fill="#2E7D32" />
            <circle cx={118 + eyePosition.x * 0.4} cy={78 + eyePosition.y * 0.4} r="1.5" fill="white" />
          </>
        )}
        {/* Уурын тэмдэг */}
        {isAngry && (
          <>
            <g className="animate-pulse">
              <path d="M 140 58 L 145 63 M 145 58 L 140 63" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" />
            </g>
            <ellipse cx="65" cy="98" rx="6" ry="4" fill="#E53E3E" opacity="0.3" />
            <ellipse cx="135" cy="98" rx="6" ry="4" fill="#E53E3E" opacity="0.3" />
          </>
        )}
        {/* Хөмсөг */}
        {isAngry ? (
          <>
            {/* Уурласан хөмсөг */}
            <path d="M 68 67 Q 80 62 92 65" stroke="#1a1a1a" strokeWidth="2" fill="none" />
            <path d="M 108 65 Q 120 62 132 67" stroke="#1a1a1a" strokeWidth="2" fill="none" />
          </>
        ) : (
          <>
            <path d="M 68 65 Q 80 62 92 65" stroke="#1a1a1a" strokeWidth="2" fill="none" />
            <path d="M 108 65 Q 120 62 132 65" stroke="#1a1a1a" strokeWidth="2" fill="none" />
          </>
        )}
        {/* Хамар */}
        <path d="M 100 88 L 97 102 Q 100 106 103 102 L 100 88" fill="#C49A6C" />
        {/* Ам */}
        <path d={getMouthPath(118, 3)} stroke="#8D6E63" strokeWidth="2.5" fill={isHappy ? "#FFE4E1" : "none"} strokeLinecap="round" />
        {/* Хацар */}
        {isHappy && (
          <>
            <ellipse cx="65" cy="98" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />
            <ellipse cx="135" cy="98" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />
          </>
        )}
        {/* Сахал */}
        <ellipse cx="100" cy="125" rx="18" ry="8" fill="#1a1a1a" opacity="0.3" />
        {/* Хүзүү */}
        <rect x="90" y="130" width="20" height="20" fill="#D4A574" />
        {/* Hoodie */}
        <path d="M 45 150 Q 70 140 100 145 Q 130 140 155 150 L 155 220 L 45 220 Z" fill="#455A64" />
        <path d="M 85 145 L 85 180 Q 100 190 115 180 L 115 145" fill="#37474F" />
        <line x1="90" y1="155" x2="90" y2="190" stroke="#263238" strokeWidth="2" />
        <line x1="110" y1="155" x2="110" y2="190" stroke="#263238" strokeWidth="2" />
      </svg>
    ),
    4: ( // Эмэгтэй - Найрсаг Оффис Ажилтан
      <svg viewBox="0 0 200 280" className={`w-full h-full ${isHappy ? 'animate-bounce-slow' : ''}`}>
        {/* Ponytail үс */}
        <ellipse cx="100" cy="45" rx="48" ry="20" fill="#4A2C2A" />
        <path d="M 52 50 Q 50 70 55 85 L 68 75 L 65 55 Z" fill="#4A2C2A" />
        <path d="M 148 50 Q 150 70 145 85 L 132 75 L 135 55 Z" fill="#4A2C2A" />
        <path d="M 140 45 Q 165 50 170 90 Q 175 140 160 170" stroke="#4A2C2A" strokeWidth="18" fill="none" strokeLinecap="round" />
        <ellipse cx="158" cy="175" rx="8" ry="12" fill="#4A2C2A" />
        {/* Толгой */}
        <ellipse cx="100" cy="82" rx="40" ry="45" fill="#FFDBAC" />
        {/* Чих */}
        <ellipse cx="60" cy="82" rx="6" ry="9" fill="#FFDBAC" />
        <ellipse cx="140" cy="82" rx="6" ry="9" fill="#FFDBAC" />
        {/* Ээмэг */}
        <circle cx="60" cy="92" r="3" fill="#FF69B4" />
        <circle cx="140" cy="92" r="3" fill="#FF69B4" />
        {/* Хөмсөг */}
        {isAngry ? (
          <>
            {/* Уурласан хөмсөг */}
            <path d="M 73 70 Q 82 65 91 68" stroke="#4A2C2A" strokeWidth="2" fill="none" />
            <path d="M 109 68 Q 118 65 127 70" stroke="#4A2C2A" strokeWidth="2" fill="none" />
          </>
        ) : (
          <>
            <path d="M 73 68 Q 82 65 91 68" stroke="#4A2C2A" strokeWidth="2" fill="none" />
            <path d="M 109 68 Q 118 65 127 68" stroke="#4A2C2A" strokeWidth="2" fill="none" />
          </>
        )}
        {/* Нүд */}
        {isHappy ? (
          <>
            <path d="M 72 80 Q 82 72 92 80" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 108 80 Q 118 72 128 80" stroke="#5D4037" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="82" cy="80" rx="10" ry={eyeStyle.eyeHeight} fill="white" />
            <circle cx={82 + eyePosition.x * 0.5} cy={80 + eyePosition.y * 0.5} r={eyeStyle.pupilSize + 1} fill="#5D4037" />
            <circle cx={80 + eyePosition.x * 0.5} cy={78 + eyePosition.y * 0.5} r="2.5" fill="white" />
            <ellipse cx="118" cy="80" rx="10" ry={eyeStyle.eyeHeight} fill="white" />
            <circle cx={118 + eyePosition.x * 0.5} cy={80 + eyePosition.y * 0.5} r={eyeStyle.pupilSize + 1} fill="#5D4037" />
            <circle cx={116 + eyePosition.x * 0.5} cy={78 + eyePosition.y * 0.5} r="2.5" fill="white" />
          </>
        )}
        {/* Уурын тэмдэг */}
        {isAngry && (
          <>
            <g className="animate-pulse">
              <path d="M 137 58 L 142 63 M 142 58 L 137 63" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" />
            </g>
          </>
        )}
        {/* Сормуус */}
        <path d="M 72 74 L 69 70 M 77 72 L 75 68 M 87 72 L 89 68 M 92 74 L 95 70" stroke="#4A2C2A" strokeWidth="1.5" />
        <path d="M 108 74 L 105 70 M 113 72 L 111 68 M 123 72 L 125 68 M 128 74 L 131 70" stroke="#4A2C2A" strokeWidth="1.5" />
        {/* Улаан хацар */}
        <ellipse cx="68" cy="95" rx="8" ry="5" fill="#FFB6C1" opacity={isHappy ? "0.7" : "0.5"} />
        <ellipse cx="132" cy="95" rx="8" ry="5" fill="#FFB6C1" opacity={isHappy ? "0.7" : "0.5"} />
        {/* Хамар */}
        <path d="M 100 85 L 98 98 Q 100 101 102 98 L 100 85" fill="#F0C8A0" />
        {/* Ам */}
        {isHappy ? (
          <>
            <path d="M 82 108 Q 100 128 118 108" stroke="#E57373" strokeWidth="3" fill="#FFE4E1" strokeLinecap="round" />
            <path d="M 88 112 Q 100 120 112 112" fill="#FFF" />
          </>
        ) : isAngry ? (
          <path d="M 85 115 Q 100 105 115 115" stroke="#E57373" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <>
            <path d="M 85 110 Q 100 125 115 110" stroke="#E57373" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 90 112 Q 100 118 110 112" fill="#FFF" />
          </>
        )}
        {/* Хүзүү */}
        <path d="M 90 125 L 90 148 L 110 148 L 110 125" fill="#FFDBAC" />
        <circle cx="100" cy="142" r="4" fill="#FF69B4" />
        {/* Блузка */}
        <path d="M 50 148 Q 75 140 100 145 Q 125 140 150 148 L 150 220 L 50 220 Z" fill="#FF7043" />
        <ellipse cx="100" cy="152" rx="22" ry="10" fill="#FFDBAC" />
        <circle cx="100" cy="170" r="3" fill="#BF360C" />
        <circle cx="100" cy="185" r="3" fill="#BF360C" />
      </svg>
    ),
    5: ( // Эмэгтэй - Designer/Creative
      <svg viewBox="0 0 200 280" className={`w-full h-full ${isHappy ? 'animate-bounce-slow' : ''}`}>
        {/* Өнгөлөг үс */}
        <ellipse cx="100" cy="48" rx="52" ry="24" fill="#9C27B0" />
        <path d="M 48 55 Q 45 90 55 130 L 75 100 L 70 60 Z" fill="#9C27B0" />
        <path d="M 152 55 Q 155 90 145 130 L 125 100 L 130 60 Z" fill="#9C27B0" />
        <path d="M 70 50 Q 60 20 80 15 Q 100 10 100 30" fill="#E91E63" />
        {/* Толгой */}
        <ellipse cx="100" cy="82" rx="38" ry="43" fill="#FFECD2" />
        {/* Чих */}
        <ellipse cx="62" cy="82" rx="5" ry="9" fill="#FFECD2" />
        <ellipse cx="138" cy="82" rx="5" ry="9" fill="#FFECD2" />
        {/* Ээмэг */}
        <circle cx="62" cy="95" r="4" fill="#FFD700" />
        <circle cx="138" cy="95" r="4" fill="#FFD700" />
        {/* Хөмсөг */}
        {isAngry ? (
          <>
            {/* Уурласан хөмсөг */}
            <path d="M 75 68 Q 83 63 91 66" stroke="#6D4C41" strokeWidth="1.5" fill="none" />
            <path d="M 109 66 Q 117 63 125 68" stroke="#6D4C41" strokeWidth="1.5" fill="none" />
          </>
        ) : (
          <>
            <path d="M 75 68 Q 83 64 91 68" stroke="#6D4C41" strokeWidth="1.5" fill="none" />
            <path d="M 109 68 Q 117 64 125 68" stroke="#6D4C41" strokeWidth="1.5" fill="none" />
          </>
        )}
        {/* Нүд */}
        {isHappy ? (
          <>
            <path d="M 73 78 Q 83 70 93 78" stroke="#7B1FA2" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 107 78 Q 117 70 127 78" stroke="#7B1FA2" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="83" cy="78" rx="8" ry={eyeStyle.eyeHeight - 2} fill="white" />
            <circle cx={83 + eyePosition.x * 0.5} cy={78 + eyePosition.y * 0.5} r={eyeStyle.pupilSize} fill="#7B1FA2" />
            <circle cx={81 + eyePosition.x * 0.5} cy={76 + eyePosition.y * 0.5} r="2" fill="white" />
            <ellipse cx="117" cy="78" rx="8" ry={eyeStyle.eyeHeight - 2} fill="white" />
            <circle cx={117 + eyePosition.x * 0.5} cy={78 + eyePosition.y * 0.5} r={eyeStyle.pupilSize} fill="#7B1FA2" />
            <circle cx={115 + eyePosition.x * 0.5} cy={76 + eyePosition.y * 0.5} r="2" fill="white" />
          </>
        )}
        {/* Уурын тэмдэг */}
        {isAngry && (
          <>
            <g className="animate-pulse">
              <path d="M 140 62 L 145 67 M 145 62 L 140 67" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" />
            </g>
            <ellipse cx="75" cy="92" rx="6" ry="4" fill="#E53E3E" opacity="0.3" />
            <ellipse cx="125" cy="92" rx="6" ry="4" fill="#E53E3E" opacity="0.3" />
          </>
        )}
        {/* Сормуус */}
        <path d="M 75 73 L 72 70 M 79 71 L 77 67 M 87 71 L 89 67 M 91 73 L 94 70" stroke="#4A148C" strokeWidth="1" />
        <path d="M 109 73 L 106 70 M 113 71 L 111 67 M 121 71 L 123 67 M 125 73 L 128 70" stroke="#4A148C" strokeWidth="1" />
        {/* Хамар */}
        <path d="M 100 83 L 98 95 Q 100 98 102 95 L 100 83" fill="#FFD4A8" />
        {/* Уруул */}
        {isHappy ? (
          <ellipse cx="100" cy="108" rx="12" ry="7" fill="#EC407A" />
        ) : isAngry ? (
          <path d="M 88 112 Q 100 105 112 112" stroke="#EC407A" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : (
          <ellipse cx="100" cy="108" rx="10" ry="5" fill="#EC407A" />
        )}
        {/* Хацар */}
        {isHappy && (
          <>
            <ellipse cx="68" cy="92" rx="10" ry="6" fill="#FFB6C1" opacity="0.6" />
            <ellipse cx="132" cy="92" rx="10" ry="6" fill="#FFB6C1" opacity="0.6" />
          </>
        )}
        {/* Хүзүү */}
        <path d="M 92 122 L 92 145 L 108 145 L 108 122" fill="#FFECD2" />
        <ellipse cx="100" cy="140" rx="4" ry="6" fill="#FFD700" />
        {/* Creative хувцас */}
        <path d="M 55 145 Q 78 138 100 142 Q 122 138 145 145 L 150 220 L 50 220 Z" fill="#FF4081" />
        <path d="M 70 155 L 75 220" stroke="#F8BBD9" strokeWidth="3" />
        <path d="M 130 155 L 125 220" stroke="#F8BBD9" strokeWidth="3" />
      </svg>
    ),
    6: ( // Эрэгтэй - Technical Expert
      <svg viewBox="0 0 200 280" className={`w-full h-full ${isHappy ? 'animate-bounce-slow' : ''}`}>
        {/* Үс */}
        <path d="M 58 65 Q 58 40 100 35 Q 142 40 142 65 L 138 72 L 62 72 Z" fill="#5D4037" />
        {/* Толгой */}
        <ellipse cx="100" cy="85" rx="42" ry="47" fill="#DEB887" />
        {/* Чих */}
        <ellipse cx="58" cy="85" rx="7" ry="11" fill="#DEB887" />
        <ellipse cx="142" cy="85" rx="7" ry="11" fill="#DEB887" />
        {/* Хөмсөг */}
        {isAngry ? (
          <>
            <path d="M 70 66 Q 80 70 90 68" stroke="#3E2723" strokeWidth="2.5" fill="none" />
            <path d="M 110 68 Q 120 70 130 66" stroke="#3E2723" strokeWidth="2.5" fill="none" />
          </>
        ) : (
          <>
            <path d="M 70 68 Q 80 64 90 68" stroke="#3E2723" strokeWidth="2.5" fill="none" />
            <path d="M 110 68 Q 120 64 130 68" stroke="#3E2723" strokeWidth="2.5" fill="none" />
          </>
        )}
        {/* Нүд */}
        {isHappy ? (
          <>
            <path d="M 70 80 Q 80 72 90 80" stroke="#1565C0" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 110 80 Q 120 72 130 80" stroke="#1565C0" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <ellipse cx="80" cy="80" rx="9" ry={eyeStyle.eyeHeight - 1} fill="white" />
            <circle cx={80 + eyePosition.x * 0.5} cy={80 + eyePosition.y * 0.5} r={eyeStyle.pupilSize} fill="#1565C0" />
            <circle cx={78 + eyePosition.x * 0.5} cy={78 + eyePosition.y * 0.5} r="2" fill="white" />
            <ellipse cx="120" cy="80" rx="9" ry={eyeStyle.eyeHeight - 1} fill="white" />
            <circle cx={120 + eyePosition.x * 0.5} cy={80 + eyePosition.y * 0.5} r={eyeStyle.pupilSize} fill="#1565C0" />
            <circle cx={118 + eyePosition.x * 0.5} cy={78 + eyePosition.y * 0.5} r="2" fill="white" />
          </>
        )}
        {/* Уурын тэмдэг */}
        {isAngry && (
          <>
            <g className="animate-pulse">
              <path d="M 140 60 L 145 65 M 145 60 L 140 65" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" />
            </g>
            <ellipse cx="72" cy="95" rx="6" ry="4" fill="#E53E3E" opacity="0.3" />
            <ellipse cx="128" cy="95" rx="6" ry="4" fill="#E53E3E" opacity="0.3" />
          </>
        )}
        {/* Хамар */}
        <path d="M 100 85 L 96 102 Q 100 107 104 102 L 100 85" fill="#C9A66B" />
        {/* Ам */}
        <path d={getMouthPath(115, 6)} stroke="#8D6E63" strokeWidth="2" fill={isHappy ? "#FFE4E1" : "none"} strokeLinecap="round" />
        {/* Хацар */}
        {isHappy && (
          <>
            <ellipse cx="65" cy="98" rx="10" ry="6" fill="#FFB6C1" opacity="0.5" />
            <ellipse cx="135" cy="98" rx="10" ry="6" fill="#FFB6C1" opacity="0.5" />
          </>
        )}
        {/* Хүзүү */}
        <rect x="90" y="130" width="20" height="18" fill="#DEB887" />
        {/* Цамц + халат */}
        <path d="M 48 148 Q 74 140 100 145 Q 126 140 152 148 L 152 220 L 48 220 Z" fill="white" />
        <path d="M 48 148 L 65 145 L 65 220 L 48 220 Z" fill="#1976D2" />
        <path d="M 152 148 L 135 145 L 135 220 L 152 220 Z" fill="#1976D2" />
        <circle cx="100" cy="165" r="3" fill="#333" />
        <circle cx="100" cy="180" r="3" fill="#333" />
        <circle cx="100" cy="195" r="3" fill="#333" />
        <rect x="115" y="155" width="25" height="15" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="1" rx="2" />
        <line x1="118" y1="160" x2="137" y2="160" stroke="#333" strokeWidth="1" />
        <line x1="118" y1="165" x2="132" y2="165" stroke="#333" strokeWidth="1" />
      </svg>
    ),
  };
  
  return characterStyles[selectedAvatar] || characterStyles[1];
};

// --- Mouse Tracking Eye Component (with Device Orientation for Mobile) ---
const EyeTracker = ({ selectedAvatar, mood = 'neutral' }) => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const eyeContainerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Check if it's a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Mouse move handler for desktop
    const handleMouseMove = (e) => {
      if (isMobile) return;
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      if (!eyeContainerRef.current) return;

      const rect = eyeContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const distance = 8;

      const newX = Math.cos(angle) * distance;
      const newY = Math.sin(angle) * distance;

      rafRef.current = requestAnimationFrame(() => {
        setEyePosition({ x: newX, y: newY });
      });
    };

    // Device orientation handler for mobile (gyroscope)
    const handleDeviceOrientation = (e) => {
      if (!isMobile) return;
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // beta: front/back tilt (-180 to 180), gamma: left/right tilt (-90 to 90)
      const beta = e.beta || 0;  // front/back tilt
      const gamma = e.gamma || 0; // left/right tilt

      // Normalize the values to eye movement range (-8 to 8)
      const newX = Math.max(-8, Math.min(8, gamma * 0.2));
      const newY = Math.max(-8, Math.min(8, (beta - 45) * 0.2)); // 45 is neutral holding position

      rafRef.current = requestAnimationFrame(() => {
        setEyePosition({ x: newX, y: newY });
      });
    };

    // Touch move handler as fallback for devices without gyroscope
    const handleTouchMove = (e) => {
      if (!isMobile || !eyeContainerRef.current) return;
      
      const touch = e.touches[0];
      if (!touch) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      const rect = eyeContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
      const distance = 8;

      const newX = Math.cos(angle) * distance;
      const newY = Math.sin(angle) * distance;

      rafRef.current = requestAnimationFrame(() => {
        setEyePosition({ x: newX, y: newY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    // Request permission for device orientation on iOS 13+
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+ requires permission
      document.addEventListener('click', () => {
        DeviceOrientationEvent.requestPermission()
          .then(response => {
            if (response === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
            }
          })
          .catch(console.error);
      }, { once: true });
    } else {
      // Non-iOS devices
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  return (
    <div 
      ref={eyeContainerRef}
      className={`relative w-32 h-40 mx-auto mb-4 sm:mb-8 mt-4 sm:mt-0 flex items-center justify-center ${mood === 'Талархал' ? 'animate-character-happy' : ''}`}
    >
      {renderCharacter(selectedAvatar, eyePosition, mood)}
    </div>
  );
};
// eslint-disable-next-line no-unused-vars
const CustomSelect = ({ options, value, onChange, placeholder, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const sunkenStyle = 'bg-gray-100/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] border border-black/5';

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${sunkenStyle} rounded-2xl px-4 py-4 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-all`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
           {Icon && <Icon size={18} className="text-gray-600" />}
           <span className={`text-sm font-semibold ${value ? 'text-gray-800' : 'text-gray-500'} truncate`}>
             {value || placeholder}
           </span>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 w-full mt-2 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden animate-fadeIn border border-white/60">
          {/* ЭНД ӨӨРЧЛӨЛТ ОРОВ: max-h-56 байсныг max-h-[155px] болгов */}
          <div className="max-h-[155px] overflow-y-auto custom-scrollbar p-2 space-y-1">
            {options.map((option, index) => (
              <div 
                key={index}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 rounded-lg text-sm font-bold cursor-pointer transition-all flex items-center justify-between
                  ${value === option 
                    ? 'bg-gray-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {option}
                {value === option && <Check size={16} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('select'); 
  const [step, setStep] = useState(1); 
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('Хүсэлт'); 
  const [branch, setBranch] = useState(''); // eslint-disable-line no-unused-vars
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [isWheelSnapping, setIsWheelSnapping] = useState(false);
  const wheelTouchRef = useRef({ x: null, angle: 0 });
  const [magnifier, setMagnifier] = useState({ visible: false, idx: null, x: 0, y: 0 });
  const magnifierTimer = useRef(null);
  const [recipient, setRecipient] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [detail, setDetail] = useState('');
  const [phone, setPhone] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const feedbackSwipeRef = useRef(null);
  const feedbackTypesOrder = ['Хүсэлт', 'Гомдол', 'Талархал'];

  // Сурталчилгааны өгөгдөл - 3 секунд болгонд солигдоно
  const [adIndex, setAdIndex] = useState(0);
  const ads = [
    { label: 'ББСБ', title: 'Хэрэглээний зээл хялбар нөхцөлөөр', range: '₮500,000 - ₮10,000,000', rate: '2.9', unit: '% /сар', btn: 'ЗЭЭЛ АВАХ', gradient: 'from-[#003080] to-[#0050B0]', accent: 'from-[#00B2E7] to-[#0090C0]', img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=400&fit=crop' },
    { label: 'ДААТГАЛ', title: 'Эрүүл мэндийн даатгал хямд үнээр', range: '₮50,000 - ₮500,000 /сар', rate: '15', unit: '% хөнгөлөлт', btn: 'БҮРТГҮҮЛЭХ', gradient: 'from-[#2d0080] to-[#5a30b0]', accent: 'from-[#9C27B0] to-[#7B1FA2]', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop' },
    { label: 'ХАДГАЛАМЖ', title: 'Хугацаатай хадгаламж өндөр хүүтэй', range: '₮1,000,000 - ₮50,000,000', rate: '12.5', unit: '% /жил', btn: 'ДЭЛГЭРЭНГҮЙ', gradient: 'from-[#006040] to-[#008060]', accent: 'from-[#00C853] to-[#009624]', img: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400&h=400&fit=crop' },
  ];

  useEffect(() => {
    if (step !== 2) return;
    const timer = setInterval(() => setAdIndex(prev => (prev + 1) % ads.length), 3000);
    return () => clearInterval(timer);
  }, [step, ads.length]);

  // Видео зар - автоматаар тоглогдоно
  const [videoAdIndex, setVideoAdIndex] = useState(0);
  const videoRef = useRef(null);
  const videoAds = [
    { src: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'ББСБ - Хэрэглээний зээл 2.9%' },
    { src: 'https://www.w3schools.com/html/movie.mp4', title: 'Даатгал - Эрүүл мэндийн даатгал' },
    { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm', title: 'Хадгаламж - 12.5% өндөр хүү' },
  ];

  const handleVideoEnded = () => {
    setVideoAdIndex(prev => (prev + 1) % videoAds.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [videoAdIndex]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(f => ({
      file: f,
      id: Date.now() + Math.random(),
      name: f.name,
      size: f.size,
      type: f.type,
      preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const removeFile = (id) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter(f => f.id !== id);
    });
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎬';
    if (type.startsWith('audio/')) return '🎵';
    return '📎';
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  // --- PROFILE AVATAR STATE ---
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [swipeY, setSwipeY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(null);
  const dragStartY = useRef(null);
  
  // --- SCALING LOGIC ---
  // eslint-disable-next-line no-unused-vars
  const [_scale, setScale] = useState(1);
  const contentRef = useRef(null);

  const branchImages = [
    'https://picsum.photos/id/634/200/300',
    'https://picsum.photos/id/228/200/300',
    'https://picsum.photos/id/661/200/300',
    'https://picsum.photos/id/380/200/300',
    'https://picsum.photos/id/392/200/300',
    'https://picsum.photos/id/238/200/300',
    'https://picsum.photos/id/469/200/300',
    'https://picsum.photos/id/311/200/300',
    'https://picsum.photos/id/515/200/300',
    'https://picsum.photos/id/521/200/300',
    'https://picsum.photos/id/549/200/300',
    'https://picsum.photos/id/178/200/300',
    'https://picsum.photos/id/637/200/300',
    'https://picsum.photos/id/641/200/300',
    'https://picsum.photos/id/669/200/300',
    'https://picsum.photos/id/685/200/300',
  ];

  const handleWheelTouchStart = (e) => {
    e.stopPropagation();
    setIsWheelSnapping(false);
    wheelTouchRef.current = { x: e.touches[0].clientX, angle: wheelAngle };
  };

  const handleWheelTouchMove = (e) => {
    if (wheelTouchRef.current.x === null) return;
    const diff = e.touches[0].clientX - wheelTouchRef.current.x;
    const total = branches.length;
    const anglePerCard = 360 / total;
    const maxDrag = anglePerCard * 1.2;
    const raw = diff * 0.15;
    const clamped = Math.max(-maxDrag, Math.min(maxDrag, raw));
    setWheelAngle(wheelTouchRef.current.angle + clamped);
  };

  const handleWheelTouchEnd = () => {
    const total = branches.length;
    const anglePerCard = 360 / total;
    const diff = wheelAngle - wheelTouchRef.current.angle;
    let snapped;
    if (Math.abs(diff) > anglePerCard * 0.2) {
      const dir = diff > 0 ? 1 : -1;
      snapped = wheelTouchRef.current.angle + dir * anglePerCard;
    } else {
      snapped = wheelTouchRef.current.angle;
    }
    setIsWheelSnapping(true);
    setWheelAngle(snapped);
    const rawIdx = Math.round(-snapped / anglePerCard);
    const idx = ((rawIdx % total) + total) % total;
    setSelectedBranch(idx);
    setBranch(branches[idx]);
    wheelTouchRef.current.x = null;
  };

  // Desktop: mouse drag for branch wheel
  const wheelMouseRef = useRef({ x: null, angle: 0, dragging: false });

  const handleWheelMouseDown = (e) => {
    e.preventDefault();
    setIsWheelSnapping(false);
    wheelMouseRef.current = { x: e.clientX, angle: wheelAngle, dragging: true };
  };

  const handleWheelMouseMove = (e) => {
    if (!wheelMouseRef.current.dragging) return;
    const diff = e.clientX - wheelMouseRef.current.x;
    const total = branches.length;
    const anglePerCard = 360 / total;
    const maxDrag = anglePerCard * 1.2;
    const raw = diff * 0.15;
    const clamped = Math.max(-maxDrag, Math.min(maxDrag, raw));
    setWheelAngle(wheelMouseRef.current.angle + clamped);
  };

  const handleWheelMouseUp = () => {
    if (!wheelMouseRef.current.dragging) return;
    wheelMouseRef.current.dragging = false;
    const total = branches.length;
    const anglePerCard = 360 / total;
    const diff = wheelAngle - wheelMouseRef.current.angle;
    let snapped;
    if (Math.abs(diff) > anglePerCard * 0.2) {
      const dir = diff > 0 ? 1 : -1;
      snapped = wheelMouseRef.current.angle + dir * anglePerCard;
    } else {
      snapped = wheelMouseRef.current.angle;
    }
    setIsWheelSnapping(true);
    setWheelAngle(snapped);
    const rawIdx = Math.round(-snapped / anglePerCard);
    const idx = ((rawIdx % total) + total) % total;
    setSelectedBranch(idx);
    setBranch(branches[idx]);
  };

  // Desktop: mouse scroll wheel for branch wheel
  const handleWheelScroll = (e) => {
    e.preventDefault();
    const total = branches.length;
    const anglePerCard = 360 / total;
    const dir = e.deltaY > 0 ? -1 : 1;
    const newAngle = wheelAngle + dir * anglePerCard;
    setIsWheelSnapping(true);
    setWheelAngle(newAngle);
    const rawIdx = Math.round(-newAngle / anglePerCard);
    const idx = ((rawIdx % total) + total) % total;
    setSelectedBranch(idx);
    setBranch(branches[idx]);
  };

  // Attach non-passive wheel listener to prevent page scroll
  const wheelScrollRef = useRef(handleWheelScroll);
  wheelScrollRef.current = handleWheelScroll;
  const wheelContainerRefs = useRef(new Set());
  const wheelRefCallback = useCallback((node) => {
    if (node && !wheelContainerRefs.current.has(node)) {
      wheelContainerRefs.current.add(node);
      node.addEventListener('wheel', (e) => wheelScrollRef.current(e), { passive: false });
    }
  }, []);

  const renderBranchWheel = () => {
    const total = branches.length;
    const radius = 300;
    const cardW = 70;
    const cardH = 105;
    const viewH = 220;
    const centerY = viewH + radius - cardH - 20;

    return branches.map((name, i) => {
      const baseAngle = (i / total) * 360;
      const currentAngle = baseAngle + wheelAngle;
      let norm = ((currentAngle % 360) + 360) % 360;
      const dist = norm > 180 ? 360 - norm : norm;
      const distNorm = dist / 180;

      const angleRad = (currentAngle * Math.PI) / 180;
      const x = radius * Math.sin(angleRad);
      const y = -radius * Math.cos(angleRad);

      const blur = distNorm * 6;
      const opacity = Math.max(0, 1 - distNorm * 2);
      const grayscale = Math.min(1, distNorm * 2);
      const scale = 1 - distNorm * 0.3;

      if (opacity <= 0.05) return null;

      return (
        <div
          key={i}
          className="absolute rounded-xl overflow-hidden shadow-lg bg-[#0055CC]"
          style={{
            width: cardW,
            height: cardH,
            left: `calc(50% + ${x}px - ${cardW / 2}px)`,
            top: centerY + y - cardH / 2,
            filter: `blur(${blur}px) grayscale(${grayscale})`,
            opacity,
            transform: `scale(${scale})`,
            transition: isWheelSnapping ? 'all 0.3s ease-out' : 'none',
            zIndex: Math.round((1 - distNorm) * 100),
          }}
          onTouchStart={(ev) => {
            magnifierTimer.current = { x: ev.touches[0].clientX, y: ev.touches[0].clientY, idx: i, moved: false };
          }}
          onTouchMove={(ev) => {
            if (!magnifierTimer.current) return;
            const dx = ev.touches[0].clientX - magnifierTimer.current.x;
            const dy = ev.touches[0].clientY - magnifierTimer.current.y;
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) magnifierTimer.current.moved = true;
          }}
          onTouchEnd={() => {
            if (magnifierTimer.current && !magnifierTimer.current.moved) {
              setMagnifier({ visible: true, idx: i, x: 0, y: 0 });
            }
            magnifierTimer.current = null;
          }}
        >
          <img
            src={branchImages[i]}
            className="w-full h-full object-cover"
            alt={name}
            draggable={false}
          />
        </div>
      );
    });
  };

  // --- FIREWORKS STATE ---
  // eslint-disable-next-line no-unused-vars
  const [explodingStars, setExplodingStars] = useState([]);
  const [isAnimatingStars, setIsAnimatingStars] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      
      const contentHeight = 880; 
      const contentWidth = 500; 

      const heightScale = vh / contentHeight;
      const widthScale = vw / contentWidth;

      let finalScale = Math.min(heightScale, widthScale) * 0.95;
      setScale(finalScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- AUDIO LOGIC ---
  useEffect(() => {
    const audio = new Audio('robot-voice.mp3');
    audio.volume = 1.0;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.log("Autoplay blocked by browser. Waiting for interaction...");

        const handleInteraction = () => {
          audio.play().catch(e => console.log("Still blocked:", e));
          
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
          document.removeEventListener('keydown', handleInteraction);
        };

        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);
        document.addEventListener('keydown', handleInteraction);
      }
    };

    playAudio();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // --- STAR CLICK LOGIC ---
  // eslint-disable-next-line no-unused-vars
  const handleStarClick = async (clickedStar) => {
    if (isAnimatingStars) return;

    if (clickedStar === 1 && rating === 1) {
      setRating(0);
      setExplodingStars([]);
      return;
    }
    
    setIsAnimatingStars(true);
    setRating(0);
    setExplodingStars([]);

    for (let i = 1; i <= clickedStar; i++) {
      await new Promise(resolve => setTimeout(resolve, 120)); 
      setRating(i);
      setExplodingStars(prev => [...prev, i]);
      
      setTimeout(() => {
        setExplodingStars(prev => prev.filter(star => star !== i));
      }, 800);
    }
    
    setIsAnimatingStars(false);
  };

  const branches = Array.from({ length: 16 }, (_, i) => `Салбар ${i + 1}`);
  const recipients = ['Менежер', 'Салбарын захирал', 'Хүний нөөц', 'Маркетинг алба'];


  // eslint-disable-next-line no-unused-vars
  const styles = {
    glassCard: 'bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] relative z-10',
    sunken: 'bg-gray-100/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] border border-black/5',
    raised: 'bg-white/40 shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.6)] border border-white/50',
    primaryButton: `
      bg-gray-900/40 backdrop-blur-md 
      text-white border border-white/20 
      shadow-[0_8px_20px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)] 
      hover:bg-gray-900/60 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.5)] 
      active:scale-[0.98] active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)]
      transition-all duration-300
    `,
    inputBase: 'font-poppins w-full bg-gray-100/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] border border-black/5 rounded-2xl px-4 py-4 outline-none text-gray-800 placeholder-gray-500 text-sm font-semibold tracking-wide transition-all focus:bg-white/60',
    textLabel: 'font-poppins text-[11px] font-bold mb-2 ml-2 text-gray-600 tracking-widest uppercase',
  };

  // Header component removed - no longer used

  // Сурталчилгааны баннер - 3 секунд болгонд солигдоно
  const renderAdBanner = (extraClass = '') => {
    const ad = ads[adIndex];
    return (
      <div className={`rounded-3xl overflow-hidden bg-gradient-to-br ${ad.gradient} p-4 flex gap-3 transition-all duration-500 ${extraClass}`}>
        <div className={`w-[40%] flex-shrink-0 rounded-2xl overflow-hidden aspect-square relative`}>
          <img src={ad.img} alt={ad.label} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-opensans text-white text-[22px] font-extrabold leading-none drop-shadow-lg">{ad.rate}</p>
              <p className="font-poppins text-white text-[8px] font-bold drop-shadow-lg">{ad.unit}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
          <div>
            <p className="font-montserrat text-white text-[8px] font-black tracking-[0.2em] uppercase">{ad.label}</p>
            <p className="font-poppins text-white text-[13px] font-bold leading-tight mt-1">{ad.title}</p>
            <p className="font-poppins text-white text-[10px] mt-1">{ad.range}</p>
          </div>
          <button className={`bg-gradient-to-r ${ad.accent} rounded-full px-4 py-1.5 font-opensans text-white text-[9px] font-extrabold tracking-wider self-start mt-2`}>{ad.btn}</button>
        </div>
      </div>
    );
  };

  // Видео зарын баннер
  const renderVideoBanner = (extraClass = '') => {
    const vid = videoAds[videoAdIndex];
    return (
      <div className={`rounded-3xl overflow-hidden bg-black relative ${extraClass}`}>
        <video
          ref={videoRef}
          src={vid.src}
          className="w-full aspect-video object-cover rounded-3xl"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 rounded-b-3xl">
          <div className="flex items-center justify-between">
            <p className="font-poppins text-white text-[11px] font-bold">{vid.title}</p>
            <div className="flex gap-1">
              {videoAds.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === videoAdIndex ? 'bg-white' : 'bg-white/40'}`} />
              ))}
            </div>
          </div>
        </div>
        {/* Dots for ad rotation */}
        <div className="absolute top-2 right-3 flex gap-1">
          {videoAds.map((_, i) => (
            <div key={i} className={`w-1 h-1 rounded-full ${i === videoAdIndex ? 'bg-[#00B2E7]' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800;900&family=Open+Sans:wght@400;700;800&family=Poppins:wght@400;500;600;700&display=swap');
        body { 
          font-family: 'Poppins', sans-serif; 
          background: #0048BA;
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden; 
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 1024px) {
          body {
            background: linear-gradient(135deg, #001a4d 0%, #003080 50%, #001a4d 100%);
          }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #9ca3af; border-radius: 10px; }

        /* Desktop main scrollbar */
        @media (min-width: 1024px) {
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: rgba(0, 72, 186, 0.3); border-radius: 10px; }
          ::-webkit-scrollbar-thumb { 
            background: linear-gradient(180deg, #00B2E7, #0060D0); 
            border-radius: 10px; 
            border: 1px solid rgba(255,255,255,0.1);
          }
          ::-webkit-scrollbar-thumb:hover { 
            background: linear-gradient(180deg, #33c4ed, #0080f0); 
          }
          * { scrollbar-width: thin; scrollbar-color: #00B2E7 rgba(0, 72, 186, 0.3); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        
        /* Font families */
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-opensans { font-family: 'Open Sans', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        @keyframes scaleIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out forwards; }

        /* Зургууд үсэрч гарч ирэх анимейшн */
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounceIn { 
          animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; 
        }

        /* Одын цацралт анимейшн */
        @keyframes flyOut {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: flyOut 0.8s ease-out forwards;
        }

        /* Vertical snap scroll for avatars */
        .avatar-vertical-scroll {
          scroll-snap-type: y mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .avatar-vertical-scroll::-webkit-scrollbar {
          display: none;
        }
        .avatar-snap-item {
          scroll-snap-align: center;
        }

        /* Character float animation */
        @keyframes characterFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-character-float {
          animation: characterFloat 3s ease-in-out infinite;
        }

        /* Gradient line animation */
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite linear;
        }
      `}</style>

      <div 
        ref={contentRef}
        className="relative w-screen h-screen overflow-y-auto transition-transform duration-300 ease-out"
      >
        <div className="w-full min-h-full relative z-10">
          
          {/* STEP 1 - Avatar selection (exact match to design) */}
          {step === 1 && (
            <div className="w-full h-screen bg-gradient-to-b from-[#1a9fd4] via-[#00B2E7] to-[#B3E5FC] lg:bg-gradient-to-br lg:from-[#0048BA] lg:via-[#0060D0] lg:to-[#00B2E7] flex flex-col items-center animate-fadeIn relative overflow-hidden">

              {/* Title */}
              <div className="text-center mt-[20vh] lg:mt-[10vh] z-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase" style={{ fontFamily: "'Montserrat', sans-serif", textShadow: '0 2px 10px rgba(0,0,0,0.2)', letterSpacing: '2px' }}>
                  АВАТАРАА
                </h1>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase" style={{ fontFamily: "'Montserrat', sans-serif", textShadow: '0 2px 10px rgba(0,0,0,0.2)', letterSpacing: '2px' }}>
                  СОНГООРОЙ
                </h1>
              </div>

              {/* Center - white line, avatar, white line */}
              <div className="flex-1 flex flex-col items-center justify-center z-10 w-full px-8">
                {/* Top line */}
                <div className="w-[65%] max-w-[280px] lg:max-w-[400px] h-[2px] bg-white/80 rounded-full mb-3 sm:mb-6"></div>

                {/* Avatar - swipeable (up/down drag) */}
                <div 
                  className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px] cursor-grab active:cursor-grabbing select-none"
                  style={{ transform: `translateY(${swipeY}px)`, transition: isDragging ? 'none' : 'transform 0.3s ease-out' }}
                  onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; setIsDragging(true); }}
                  onTouchMove={(e) => {
                    if (touchStartY.current === null) return;
                    const diff = e.touches[0].clientY - touchStartY.current;
                    setSwipeY(Math.max(-80, Math.min(80, diff)));
                  }}
                  onTouchEnd={() => {
                    setIsDragging(false);
                    if (swipeY < -30) setSelectedAvatar(prev => prev >= 6 ? 1 : prev + 1);
                    else if (swipeY > 30) setSelectedAvatar(prev => prev <= 1 ? 6 : prev - 1);
                    setSwipeY(0);
                    touchStartY.current = null;
                  }}
                  onMouseDown={(e) => { dragStartY.current = e.clientY; setIsDragging(true); e.preventDefault(); }}
                  onMouseMove={(e) => {
                    if (dragStartY.current === null || !isDragging) return;
                    const diff = e.clientY - dragStartY.current;
                    setSwipeY(Math.max(-80, Math.min(80, diff)));
                  }}
                  onMouseUp={() => {
                    setIsDragging(false);
                    if (swipeY < -30) setSelectedAvatar(prev => prev >= 6 ? 1 : prev + 1);
                    else if (swipeY > 30) setSelectedAvatar(prev => prev <= 1 ? 6 : prev - 1);
                    setSwipeY(0);
                    dragStartY.current = null;
                  }}
                  onMouseLeave={() => {
                    if (isDragging) {
                      setIsDragging(false);
                      if (swipeY < -30) setSelectedAvatar(prev => prev >= 6 ? 1 : prev + 1);
                      else if (swipeY > 30) setSelectedAvatar(prev => prev <= 1 ? 6 : prev - 1);
                      setSwipeY(0);
                      dragStartY.current = null;
                    }
                  }}
                  onWheel={(e) => {
                    e.preventDefault();
                    if (e.deltaY > 0) setSelectedAvatar(prev => prev >= 6 ? 1 : prev + 1);
                    else setSelectedAvatar(prev => prev <= 1 ? 6 : prev - 1);
                  }}
                >
                  <EyeTracker selectedAvatar={selectedAvatar} />
                </div>

                {/* Bottom line */}
                <div className="w-[65%] max-w-[280px] lg:max-w-[400px] h-[2px] bg-white/80 rounded-full -mt-24 sm:-mt-32 lg:-mt-36"></div>

                {/* Swipe hint */}
                <p className="font-poppins text-white text-[10px] lg:text-[12px] mt-3 font-medium tracking-wide lg:tracking-widest">↕ ДЭЭШ ДООШ ЧИРЭХ</p>
              </div>

              {/* Bottom - Цааш button */}
              <div className="mb-[12vh] lg:mb-[8vh] z-10">
                <button
                  onClick={() => setStep(2)}
                  className="font-opensans px-12 lg:px-16 py-3.5 lg:py-4 bg-white rounded-full font-extrabold text-sm lg:text-base tracking-wider text-gray-800 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all"
                >
                  Цааш
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 - Dark themed feedback page */}
          {step === 2 && (
          <div className="w-full min-h-screen bg-[#0048BA] animate-fadeIn">
            
            {/* Top header bar */}
            <div className="sticky top-0 z-50 flex items-end bg-[#003DA0] border-b border-[#1A6AD4] px-4 lg:px-0 pt-3">
              <div className="w-full lg:max-w-[800px] lg:mx-auto flex items-end">
              {/* Selected avatar (small circle) */}
              <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-[#00B2E7] flex items-center justify-center overflow-hidden flex-shrink-0 mb-2">
                <div className="w-full h-full p-0.5">
                  {renderCharacter(selectedAvatar, { x: 0, y: 0 })}
                </div>
              </div>
              {/* Tabs - evenly spaced */}
              <div className="flex flex-1 ml-4 lg:ml-6">
                {['ХҮСЭЛТ', 'ГОМДОЛ', 'ТАЛАРХАЛ'].map((type) => {
                  const isActive = 
                    (feedbackType === 'Хүсэлт' && type === 'ХҮСЭЛТ') || 
                    (feedbackType === 'Гомдол' && type === 'ГОМДОЛ') || 
                    (feedbackType === 'Талархал' && type === 'ТАЛАРХАЛ');
                  return (
                    <button 
                      key={type} 
                      onClick={() => { setFeedbackType(type === 'ХҮСЭЛТ' ? 'Хүсэлт' : type === 'ГОМДОЛ' ? 'Гомдол' : 'Талархал'); setActiveTab('select'); }}
                      className="flex-1 flex justify-center"
                    >
                      <span style={{ marginTop: '-14px' }} className={`font-montserrat text-center pb-2 text-[11px] lg:text-[13px] font-black tracking-widest transition-all border-b-2 -mb-[1px] ${
                        isActive ? 'text-white border-white' : 'text-white/70 hover:text-white border-transparent'
                      }`}>
                        {type}
                      </span>
                    </button>
                  );
                })}
              </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 pt-8 sm:pt-10 lg:max-w-[800px] lg:mx-auto lg:pt-12 lg:px-8"
              onTouchStart={(e) => { feedbackSwipeRef.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                if (feedbackSwipeRef.current === null) return;
                const diff = e.changedTouches[0].clientX - feedbackSwipeRef.current;
                feedbackSwipeRef.current = null;
                if (Math.abs(diff) < 50) return;
                const currentIdx = feedbackTypesOrder.indexOf(feedbackType);
                if (diff < 0 && currentIdx < feedbackTypesOrder.length - 1) {
                  setFeedbackType(feedbackTypesOrder[currentIdx + 1]);
                  setActiveTab('select');
                } else if (diff > 0 && currentIdx > 0) {
                  setFeedbackType(feedbackTypesOrder[currentIdx - 1]);
                  setActiveTab('select');
                }
              }}
            >
            {/* ХҮСЭЛТ has its own dedicated page */}
            {feedbackType === 'Хүсэлт' ? (
              <>
                <p className="font-poppins text-white text-[13px] font-bold text-center mb-3 tracking-wide">Та хандах гэж байгаа салбараа сонгоно уу</p>
                {/* Circular wheel carousel */}
                <div 
                  ref={wheelRefCallback}
                  className="rounded-2xl mb-5 mx-1 relative overflow-hidden bg-[#0048BA] cursor-grab active:cursor-grabbing"
                  style={{ height: 220, touchAction: 'none' }}
                  onTouchStart={handleWheelTouchStart}
                  onTouchMove={handleWheelTouchMove}
                  onTouchEnd={handleWheelTouchEnd}
                  onMouseDown={handleWheelMouseDown}
                  onMouseMove={handleWheelMouseMove}
                  onMouseUp={handleWheelMouseUp}
                  onMouseLeave={handleWheelMouseUp}
                >
                  {renderBranchWheel()}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0048BA] to-transparent pointer-events-none"></div>
                  <p className="absolute bottom-3 left-0 right-0 font-montserrat text-white text-[10px] font-black tracking-wider text-center uppercase">{branches[selectedBranch]}</p>
                </div>

                {/* Main content card */}
                <div className="rounded-[30px] p-5 mb-5 relative">
                  <div className="absolute inset-0 rounded-[30px] pointer-events-none" style={{ borderTop: '1px solid rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.5)' }}></div>
                  <div className="absolute inset-0 rounded-[30px] pointer-events-none" style={{ borderLeft: '1px solid transparent', borderRight: '1px solid transparent', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 100%)', borderLeftColor: 'rgba(255,255,255,0.5)', borderRightColor: 'rgba(255,255,255,0.5)' }}></div>
                  <div className="space-y-0">
                    <div>
                      <p className="font-poppins text-white/70 text-[11px] font-bold tracking-widest uppercase pt-4 pl-1 pb-1">ДЭЛГЭРЭНГҮЙ</p>
                      <textarea
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        placeholder="Энд бичнэ үү..."
                        rows={3}
                        className="w-full font-poppins bg-transparent text-white text-[13px] py-2 pl-1 outline-none resize-none placeholder-white/40"
                      />
                      <div className="border-t border-[#1A6AD4]"></div>
                    </div>
                    <div className="h-4"></div>
                    <div>
                      <p className="font-poppins text-white/70 text-[11px] font-bold tracking-widest uppercase py-4 pl-1">ФАЙЛ ХАВСАРГАХ</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="fileUpload1"
                      />
                      <div
                        onClick={() => document.getElementById('fileUpload1').click()}
                        className="border border-dashed border-[#1A6AD4] rounded-xl py-5 flex flex-col items-center justify-center cursor-pointer hover:border-[#00B2E7] hover:bg-white/[0.02] transition-all mt-1"
                      >
                        <Upload size={20} className="text-white mb-1" />
                        <p className="font-poppins text-white/70 text-[10px] font-bold">Зураг, видео, аудио, файл</p>
                      </div>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          {uploadedFiles.map((f) => (
                            <div key={f.id} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                              {f.preview ? (
                                <img src={f.preview} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" />
                              ) : (
                                <span className="text-[16px] flex-shrink-0">{getFileIcon(f.type)}</span>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-poppins text-white text-[11px] truncate">{f.name}</p>
                                <p className="font-poppins text-white/70 text-[9px]">{formatSize(f.size)}</p>
                              </div>
                              <button onClick={() => removeFile(f.id)} className="text-white/70 hover:text-red-400 text-[14px] flex-shrink-0 leading-none">×</button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="border-t border-[#1A6AD4] mt-3"></div>
                    </div>
                  </div>
                </div>

                {/* Bottom buttons */}
                <div className="flex gap-4 px-2">
                  <button onClick={() => setStep(1)} className="flex-1 py-3.5 font-opensans bg-white rounded-full font-extrabold text-sm tracking-wider text-gray-800 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all">БУЦАХ</button>
                  <button className="flex-1 py-3.5 font-opensans bg-white rounded-full font-extrabold text-sm tracking-wider text-gray-800 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all">ИЛГЭЭХ</button>
                </div>
              </>
            ) : (
            <>
            {/* ГОМДОЛ / ТАЛАРХАЛ flow */}
            {activeTab === 'select' ? (
              <>
                {/* Toggle cards - АЖИЛТАНД / БАЙГУУЛЛАГТ */}
                <div className="grid grid-cols-2 gap-4 mb-5 px-2">
                  <button 
                    onClick={() => setActiveTab('person')}
                    className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-between aspect-square transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face" alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-3">
                      <p className="font-montserrat text-white text-[12px] font-black tracking-wider text-center uppercase leading-relaxed">АЖИЛТАНД ТАЛАРХАЛ</p>
                      <p className="font-montserrat text-white text-[12px] font-black tracking-wider text-center uppercase leading-relaxed">ИЛГЭЭХ</p>
                    </div>
                    <span className="relative z-10 font-opensans bg-white rounded-full px-5 py-1.5 text-[9px] font-extrabold text-gray-800 tracking-wider mb-3">АЖИЛТАНД</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('org')}
                    className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-between aspect-square transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-3">
                      <p className="font-montserrat text-white text-[12px] font-black tracking-wider text-center uppercase leading-relaxed">БАЙГУУЛЛАГТ ТАЛАРХАЛ</p>
                      <p className="font-montserrat text-white text-[12px] font-black tracking-wider text-center uppercase leading-relaxed">ИЛГЭЭХ</p>
                    </div>
                    <span className="relative z-10 font-opensans bg-white rounded-full px-5 py-1.5 text-[9px] font-extrabold text-gray-800 tracking-wider mb-3">БАЙГУУЛЛАГТ</span>
                  </button>
                </div>

                {/* Сурталчилгааны баннер */}
                <div className="mx-2 mb-5">
                  {renderAdBanner()}
                </div>
                {/* Видео зар */}
                <div className="mx-2 mb-5">
                  {renderVideoBanner()}
                </div>

                {/* Bottom button */}
                <div className="flex justify-center px-2">
                  <button onClick={() => setStep(1)} className="px-12 py-3.5 font-opensans bg-white rounded-full font-extrabold text-sm tracking-wider text-gray-800 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all">БУЦАХ</button>
                </div>
              </>
            ) : activeTab === 'person' ? (
              <>
                <p className="font-poppins text-white text-[13px] font-bold text-center mb-3 tracking-wide">Та хандах гэж байгаа салбараа сонгоно уу</p>
                {/* Circular wheel carousel */}
                <div 
                  ref={wheelRefCallback}
                  className="rounded-2xl mb-5 mx-1 relative overflow-hidden bg-[#0048BA] cursor-grab active:cursor-grabbing"
                  style={{ height: 220, touchAction: 'none' }}
                  onTouchStart={handleWheelTouchStart}
                  onTouchMove={handleWheelTouchMove}
                  onTouchEnd={handleWheelTouchEnd}
                  onMouseDown={handleWheelMouseDown}
                  onMouseMove={handleWheelMouseMove}
                  onMouseUp={handleWheelMouseUp}
                  onMouseLeave={handleWheelMouseUp}
                >
                  {renderBranchWheel()}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0048BA] to-transparent pointer-events-none"></div>
                  <p className="absolute bottom-3 left-0 right-0 font-montserrat text-white text-[10px] font-black tracking-wider text-center uppercase">{branches[selectedBranch]}</p>
                </div>

                {/* Main content card */}
                <div className="rounded-[30px] p-5 mb-5 relative">
                  <div className="absolute inset-0 rounded-[30px] pointer-events-none" style={{ borderTop: '1px solid rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.5)' }}></div>
                  <div className="absolute inset-0 rounded-[30px] pointer-events-none" style={{ borderLeft: '1px solid transparent', borderRight: '1px solid transparent', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 100%)', borderLeftColor: 'rgba(255,255,255,0.5)', borderRightColor: 'rgba(255,255,255,0.5)' }}></div>
                  <div className="space-y-0">
                    <div className="relative">
                      <p className="font-poppins text-white/70 text-[11px] font-bold tracking-widest uppercase pt-4 pl-1 pb-1">АЛБАН ТУШААЛ</p>
                      <div
                        className="flex items-center justify-between py-2.5 cursor-pointer group"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        <span className={`font-poppins text-[13px] pl-1 ${recipient ? 'text-white' : 'text-white/70'}`}>
                          {recipient || 'Сонгох...'}
                        </span>
                        <ChevronDown size={16} className={`text-white/70 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                      <div className="border-t border-[#1A6AD4]"></div>
                      {dropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 rounded-xl bg-[#003DA0] border border-[#1A6AD4] shadow-2xl z-50 overflow-hidden animate-fadeIn">
                          {recipients.map((r) => (
                            <div
                              key={r}
                              onClick={() => { setRecipient(r); setDropdownOpen(false); }}
                              className={`font-poppins px-4 py-3 text-[13px] cursor-pointer transition-all ${
                                recipient === r
                                  ? 'bg-[#00B2E7]/20 text-white'
                                  : 'text-white hover:bg-white/5'
                              }`}
                            >
                              {r}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="h-4"></div>
                    <div>
                      <p className="font-poppins text-white/70 text-[11px] font-bold tracking-widest uppercase pt-4 pl-1 pb-1">ДЭЛГЭРЭНГҮЙ</p>
                      <textarea
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        placeholder="Энд бичнэ үү..."
                        rows={3}
                        className="w-full font-poppins bg-transparent text-white text-[13px] py-2 pl-1 outline-none resize-none placeholder-white/40"
                      />
                      <div className="border-t border-[#1A6AD4]"></div>
                    </div>
                    <div className="h-4"></div>
                    <div>
                      <p className="font-poppins text-white/70 text-[11px] font-bold tracking-widest uppercase pt-4 pl-1 pb-1">ӨӨРИЙН УТАС</p>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 8);
                          setPhone(val);
                        }}
                        placeholder="8 оронтой дугаар"
                        maxLength={8}
                        inputMode="numeric"
                        className="w-full font-poppins bg-transparent text-white text-[13px] py-2 pl-1 outline-none placeholder-white/40"
                      />
                      <div className={`border-t ${phone.length > 0 && phone.length < 8 ? 'border-red-500' : 'border-[#1A6AD4]'}`}></div>
                      {phone.length > 0 && phone.length < 8 && (
                        <p className="font-poppins text-red-400 text-[9px] mt-1 pl-1">{8 - phone.length} тэмдэгт дутуу</p>
                      )}
                    </div>
                    <div className="h-4"></div>
                    <div>
                      <p className="font-poppins text-white/70 text-[11px] font-bold tracking-widest uppercase pt-4 pl-1 pb-1">АЖИЛТНЫ НЭР ЗААВАЛ БИШ</p>
                      <input
                        type="text"
                        value={workerName}
                        onChange={(e) => setWorkerName(e.target.value)}
                        placeholder="Нэр оруулах..."
                        className="w-full font-poppins bg-transparent text-white text-[13px] py-2 pl-1 outline-none placeholder-white/40"
                      />
                      <div className="border-t border-[#1A6AD4]"></div>
                    </div>
                    <div className="h-4"></div>
                    <div>
                      <p className="font-poppins text-white/70 text-[11px] font-bold tracking-widest uppercase py-4 pl-1">ФАЙЛ ХАВСАРГАХ</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-[#1A6AD4] rounded-xl py-5 flex flex-col items-center justify-center cursor-pointer hover:border-[#00B2E7] hover:bg-white/[0.02] transition-all mt-1"
                      >
                        <Upload size={20} className="text-white mb-1" />
                        <p className="font-poppins text-white/70 text-[10px] font-bold">Зураг, видео, аудио, файл</p>
                      </div>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          {uploadedFiles.map((f) => (
                            <div key={f.id} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                              {f.preview ? (
                                <img src={f.preview} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" />
                              ) : (
                                <span className="text-[16px] flex-shrink-0">{getFileIcon(f.type)}</span>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-poppins text-white text-[11px] truncate">{f.name}</p>
                                <p className="font-poppins text-white/70 text-[9px]">{formatSize(f.size)}</p>
                              </div>
                              <button onClick={() => removeFile(f.id)} className="text-white/70 hover:text-red-400 text-[14px] flex-shrink-0 leading-none">×</button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="border-t border-[#1A6AD4] mt-3"></div>
                    </div>
                  </div>
                </div>

                {/* Bottom buttons */}
                <div className="flex gap-4 px-2">
                  <button onClick={() => setActiveTab('select')} className="flex-1 py-3.5 font-opensans bg-white rounded-full font-extrabold text-sm tracking-wider text-gray-800 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all">БУЦАХ</button>
                  <button className="flex-1 py-3.5 font-opensans bg-white rounded-full font-extrabold text-sm tracking-wider text-gray-800 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all">ИЛГЭЭХ</button>
                </div>
              </>
            ) : (
              <>
                <p className="font-poppins text-white text-[13px] font-bold text-center mb-3 tracking-wide">Та хандах гэж байгаа салбараа сонгоно уу</p>
                {/* Circular wheel carousel */}
                <div 
                  ref={wheelRefCallback}
                  className="rounded-2xl mb-5 mx-1 relative overflow-hidden bg-[#0048BA] cursor-grab active:cursor-grabbing"
                  style={{ height: 220, touchAction: 'none' }}
                  onTouchStart={handleWheelTouchStart}
                  onTouchMove={handleWheelTouchMove}
                  onTouchEnd={handleWheelTouchEnd}
                  onMouseDown={handleWheelMouseDown}
                  onMouseMove={handleWheelMouseMove}
                  onMouseUp={handleWheelMouseUp}
                  onMouseLeave={handleWheelMouseUp}
                >
                  {renderBranchWheel()}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0048BA] to-transparent pointer-events-none"></div>
                  <p className="absolute bottom-3 left-0 right-0 font-montserrat text-white text-[10px] font-black tracking-wider text-center uppercase">{branches[selectedBranch]}</p>
                </div>

                {/* Main content card */}
                <div className="rounded-[30px] p-5 mb-5 relative">
                  <div className="absolute inset-0 rounded-[30px] pointer-events-none" style={{ borderTop: '1px solid rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.5)' }}></div>
                  <div className="absolute inset-0 rounded-[30px] pointer-events-none" style={{ borderLeft: '1px solid transparent', borderRight: '1px solid transparent', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 45%, rgba(0,0,0,1) 100%)', borderLeftColor: 'rgba(255,255,255,0.5)', borderRightColor: 'rgba(255,255,255,0.5)' }}></div>
                  <div className="space-y-0">
                    <div>
                      <p className="font-poppins text-white/70 text-[11px] font-bold tracking-widest uppercase pt-4 pl-1 pb-1">ДЭЛГЭРЭНГҮЙ</p>
                      <textarea
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        placeholder="Энд бичнэ үү..."
                        rows={3}
                        className="w-full font-poppins bg-transparent text-white text-[13px] py-2 pl-1 outline-none resize-none placeholder-white/40"
                      />
                      <div className="border-t border-[#1A6AD4]"></div>
                    </div>
                    <div className="h-4"></div>
                    <div>
                      <p className="font-poppins text-white/70 text-[11px] font-bold tracking-widest uppercase py-4 pl-1">ФАЙЛ ХАВСАРГАХ</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="fileUpload3"
                      />
                      <div
                        onClick={() => document.getElementById('fileUpload3').click()}
                        className="border border-dashed border-[#1A6AD4] rounded-xl py-5 flex flex-col items-center justify-center cursor-pointer hover:border-[#00B2E7] hover:bg-white/[0.02] transition-all mt-1"
                      >
                        <Upload size={20} className="text-white mb-1" />
                        <p className="font-poppins text-white/70 text-[10px] font-bold">Зураг, видео, аудио, файл</p>
                      </div>
                      {uploadedFiles.length > 0 && (
                        <div className="mt-2 space-y-1.5">
                          {uploadedFiles.map((f) => (
                            <div key={f.id} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                              {f.preview ? (
                                <img src={f.preview} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" />
                              ) : (
                                <span className="text-[16px] flex-shrink-0">{getFileIcon(f.type)}</span>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="font-poppins text-white text-[11px] truncate">{f.name}</p>
                                <p className="font-poppins text-white/70 text-[9px]">{formatSize(f.size)}</p>
                              </div>
                              <button onClick={() => removeFile(f.id)} className="text-white/70 hover:text-red-400 text-[14px] flex-shrink-0 leading-none">×</button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="border-t border-[#1A6AD4] mt-3"></div>
                    </div>
                  </div>
                </div>

                {/* Bottom buttons */}
                <div className="flex gap-4 px-2">
                  <button onClick={() => setActiveTab('select')} className="flex-1 py-3.5 font-opensans bg-white rounded-full font-extrabold text-sm tracking-wider text-gray-800 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all">БУЦАХ</button>
                  <button className="flex-1 py-3.5 font-opensans bg-white rounded-full font-extrabold text-sm tracking-wider text-gray-800 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all">ИЛГЭЭХ</button>
                </div>
              </>
            )}
            </>
            )}
          </div>
          </div>
          )}

        </div>
      </div>
      {/* Magnifier overlay */}
      {magnifier.visible && magnifier.idx !== null && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setMagnifier({ visible: false, idx: null, x: 0, y: 0 })}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <div className="relative animate-scaleIn">
            <div className="w-56 h-80 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/30">
              <img
                src={branchImages[magnifier.idx]}
                className="w-full h-full object-cover"
                alt={branches[magnifier.idx]}
                draggable={false}
              />
            </div>
            <p className="text-white text-sm font-bold tracking-wider text-center mt-3 uppercase drop-shadow-lg">{branches[magnifier.idx]}</p>
          </div>
        </div>
      )}
    </>
  );
}

