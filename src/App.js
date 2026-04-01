import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Star, Upload, User, Building, ArrowLeft, Send, Check } from 'lucide-react';

// --- 6 Different Realistic Character Styles with Mood Support ---
const renderCharacter = (selectedAvatar, eyePosition, mood = 'neutral') => {
  // Mood-based expression helpers
  const getMouthPath = (baseY, type) => {
    if (mood === 'Гомдол') {
      // Гунигтай - доошоо муруй
      return `M 88 ${baseY + 5} Q 100 ${baseY - 5} 112 ${baseY + 5}`;
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
      return { eyeHeight: 10, pupilSize: 4, eyebrowAngle: 'sad' };
    } else if (mood === 'Талархал') {
      return { eyeHeight: 8, pupilSize: 5, eyebrowAngle: 'happy', closed: true };
    } else {
      return { eyeHeight: 12, pupilSize: 5, eyebrowAngle: 'neutral' };
    }
  };

  const eyeStyle = getEyeStyle();
  const isHappy = mood === 'Талархал';
  const isSad = mood === 'Гомдол';

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
        {isSad ? (
          <>
            <path d="M 70 63 Q 80 68 90 65" stroke="#2C1810" strokeWidth="3" fill="none" />
            <path d="M 110 65 Q 120 68 130 63" stroke="#2C1810" strokeWidth="3" fill="none" />
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
        {/* Нулимс - гомдолд */}
        {isSad && (
          <>
            <ellipse cx="72" cy="92" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
            <ellipse cx="128" cy="92" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
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
        {isSad ? (
          <>
            <path d="M 72 66 Q 80 70 88 68" stroke="#5D4037" strokeWidth="2" fill="none" />
            <path d="M 112 68 Q 120 70 128 66" stroke="#5D4037" strokeWidth="2" fill="none" />
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
        {/* Нулимс */}
        {isSad && (
          <>
            <ellipse cx="72" cy="92" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
            <ellipse cx="128" cy="92" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
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
        ) : isSad ? (
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
        {/* Нулимс */}
        {isSad && (
          <>
            <ellipse cx="72" cy="95" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
            <ellipse cx="128" cy="95" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
          </>
        )}
        {/* Хөмсөг */}
        {isSad ? (
          <>
            <path d="M 68 63 Q 80 67 92 65" stroke="#1a1a1a" strokeWidth="2" fill="none" />
            <path d="M 108 65 Q 120 67 132 63" stroke="#1a1a1a" strokeWidth="2" fill="none" />
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
        {isSad ? (
          <>
            <path d="M 73 66 Q 82 70 91 68" stroke="#4A2C2A" strokeWidth="2" fill="none" />
            <path d="M 109 68 Q 118 70 127 66" stroke="#4A2C2A" strokeWidth="2" fill="none" />
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
        {/* Нулимс */}
        {isSad && (
          <>
            <ellipse cx="72" cy="95" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
            <ellipse cx="128" cy="95" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
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
        ) : isSad ? (
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
        {isSad ? (
          <>
            <path d="M 75 66 Q 83 70 91 68" stroke="#6D4C41" strokeWidth="1.5" fill="none" />
            <path d="M 109 68 Q 117 70 125 66" stroke="#6D4C41" strokeWidth="1.5" fill="none" />
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
        {/* Нулимс */}
        {isSad && (
          <>
            <ellipse cx="75" cy="92" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
            <ellipse cx="125" cy="92" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
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
        ) : isSad ? (
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
        {isSad ? (
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
        {/* Нулимс */}
        {isSad && (
          <>
            <ellipse cx="72" cy="95" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
            <ellipse cx="128" cy="95" rx="3" ry="5" fill="#87CEEB" opacity="0.7" className="animate-pulse" />
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
  const [activeTab, setActiveTab] = useState('person'); 
  const [step, setStep] = useState(1); 
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('request'); 
  const [branch, setBranch] = useState('');
  const [recipient, setRecipient] = useState('');
  
  // --- PROFILE AVATAR STATE ---
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  
  // --- SCALING LOGIC ---
  const [scale, setScale] = useState(1);
  const contentRef = useRef(null);

  // --- FIREWORKS STATE ---
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
    inputBase: 'w-full bg-gray-100/50 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] border border-black/5 rounded-2xl px-4 py-4 outline-none text-gray-800 placeholder-gray-500 text-sm font-semibold tracking-wide transition-all focus:bg-white/60',
    textLabel: 'text-[11px] font-bold mb-2 ml-2 text-gray-600 tracking-widest uppercase',
  };

  const Header = ({ title, showBack }) => (
    <div className="relative flex items-center justify-center mb-8 w-full h-10">
      {showBack && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center z-20">
          <button onClick={() => setStep(1)} className={`w-10 h-10 rounded-xl ${styles.raised} flex items-center justify-center text-gray-600 hover:text-gray-900 active:scale-95 transition-all`}>
            <ArrowLeft size={20} />
          </button>
        </div>
      )}
      <h2 className="text-xl font-extrabold text-gray-800 tracking-wider uppercase text-center drop-shadow-sm opacity-80 whitespace-nowrap z-10">
        {title}
      </h2>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        body { 
          font-family: 'Poppins', sans-serif; 
          background: linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%);
          margin: 0;
          padding: 0;
          height: 100vh;
          width: 100vw;
          overflow: hidden; 
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #9ca3af; border-radius: 10px; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

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
      `}</style>

      {/* Decorative Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-200/40 blur-[120px] pointer-events-none"></div>

      <div 
        ref={contentRef}
        className="relative w-screen h-screen overflow-y-auto transition-transform duration-300 ease-out"
      >
        <div className="w-full min-h-full relative z-10">
          <div className={`w-full min-h-screen ${styles.glassCard} p-6 md:p-12 transition-all duration-500 flex flex-col justify-center`}>
            
            <div className="w-full max-w-2xl mx-auto">
              
              {/* STEP 1 */}
              {step === 1 && (
                <div className="animate-fadeIn">
                  {/* INTERACTIVE CHARACTER - MOUSE TRACKING */}
                  <EyeTracker selectedAvatar={selectedAvatar} />

                  {/* ПРОФАЙЛ ЗУРАГ СОНГОХ ХЭСЭГ */}
                  <div className="mb-10">
                    <p className="text-center text-[13px] md:text-sm font-semibold text-gray-700 mb-5 px-2">
                      Та өөрт тохирох Профайл зурагаа сонгоно уу
                    </p>
                    {/* Horizontal scrollable container */}
                    <div className="relative -mx-6 md:-mx-12">
                      <div 
                        className="flex gap-3 sm:gap-5 px-6 md:px-12 overflow-x-auto snap-x snap-mandatory py-4"
                        style={{ 
                          scrollbarWidth: 'none', 
                          msOverflowStyle: 'none',
                          WebkitOverflowScrolling: 'touch',
                          overflow: '-moz-scrollbars-none'
                        }}
                      >
                        {/* Scroll padding */}
                        <div className="flex-shrink-0 w-[calc(50%-40px)] sm:w-0"></div>
                        {[1, 2, 3, 4, 5, 6].map((num, idx) => {
                          const isSelected = selectedAvatar === num;
                          return (
                            <div 
                              key={num} 
                              className="relative animate-bounceIn flex-shrink-0 snap-center"
                              style={{ animationDelay: `${idx * 80}ms`, opacity: 0 }}
                            >
                              <button
                                onClick={() => setSelectedAvatar(num)}
                                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] sm:rounded-[24px] flex items-center justify-center cursor-pointer transition-all duration-300 border-2
                                  ${isSelected 
                                    ? 'border-gray-800 scale-110 shadow-[0_8px_20px_rgba(0,0,0,0.15)] bg-white z-10' 
                                    : 'border-transparent scale-90 opacity-60 grayscale-[40%] hover:grayscale-0 hover:opacity-100 hover:scale-100 hover:shadow-md bg-white/40'
                                  }
                                `}
                              >
                                {/* Mini character preview */}
                                <div className="w-full h-full p-1">
                                  {renderCharacter(num, { x: 0, y: 0 })}
                                </div>
                              </button>

                              {/* Сонгогдсон үед гарч ирэх Check badge */}
                              {isSelected && (
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-bounceIn z-20">
                                  <Check size={14} className="text-white stroke-[3px]" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {/* Scroll padding */}
                        <div className="flex-shrink-0 w-[calc(50%-40px)] sm:w-0"></div>
                      </div>
                      {/* Scroll indicator dots - mobile only */}
                      <div className="flex justify-center gap-1.5 mt-2 sm:hidden">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <div 
                            key={num}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              selectedAvatar === num ? 'bg-gray-800 w-4' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-[13px] md:text-sm font-semibold text-gray-700 mb-4 px-2">
                    Та Ажилтанд хандах уу, Байгууллагад хандах уу? Доороос сонгоно уу.
                  </p>

                  {/* Tabs */}
                  <div className={`w-full h-16 rounded-2xl p-2 mb-8 flex items-center ${styles.sunken}`}>
                    <button onClick={() => setActiveTab('person')} className={`flex-1 h-full rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === 'person' ? styles.primaryButton : 'text-gray-500 hover:text-gray-800'}`}>
                      <User size={16} /> АЖИЛТАН
                    </button>
                    <button onClick={() => setActiveTab('org')} className={`flex-1 h-full rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 ${activeTab === 'org' ? styles.primaryButton : 'text-gray-500 hover:text-gray-800'}`}>
                      <Building size={16} /> БАЙГУУЛЛАГА
                    </button>
                  </div>

                  <div className="space-y-6">
                    {activeTab === 'person' ? (
                      <>
                        <div><label className={styles.textLabel}>Нэр <span className="text-red-500">*</span></label><input type="text" placeholder="Болд" className={styles.inputBase} /></div>
                        <div><label className={styles.textLabel}>Утас <span className="text-red-500">*</span></label><input type="tel" placeholder="9911xxxx" className={styles.inputBase} /></div>
                        <div className="relative z-20"><label className={styles.textLabel}>Салбар <span className="text-red-500">*</span></label><CustomSelect options={branches} value={branch} onChange={setBranch} placeholder="Салбараа сонгоно уу" /></div>
                      </>
                    ) : (
                      <>
                        <div><label className={styles.textLabel}>Мэдээлэл <span className="text-red-500">*</span></label><textarea rows="4" placeholder="Үйл ажиллагааны чиглэл..." className={`${styles.inputBase} resize-none`}></textarea></div>
                        <div><label className={styles.textLabel}>Файл</label><div className={`w-full h-24 ${styles.sunken} rounded-2xl flex flex-col items-center justify-center hover:bg-white/40 transition-colors cursor-pointer border-dashed border-2 border-transparent hover:border-gray-300`}><Upload size={20} className="text-gray-500 mb-2" /><p className="text-[10px] text-gray-500 font-bold uppercase">Файл оруулах</p></div></div>
                      </>
                    )}
                    
                    <div className="pt-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                        <img src="ai-robot.gif" alt="Robot" className="w-full h-full object-cover scale-110 translate-y-1" />
                      </div>

                      <button onClick={() => setStep(2)} className={`flex-1 py-4 ${styles.primaryButton} rounded-xl font-bold text-sm tracking-widest flex items-center justify-center gap-2`}>
                        ҮРГЭЛЖЛҮҮЛЭХ
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="animate-fadeIn">
                  {/* Сонгосон Character - Step 1-тэй яг ижил хэмжээ, bg-гүй, нүд хөдөлдөг */}
                  <EyeTracker selectedAvatar={selectedAvatar} mood={feedbackType} />
                  
                  <div className="space-y-6">
                    <div>
                        <label className={`${styles.textLabel} text-center block mb-4`}>Төрөл сонгох <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-3 gap-4">
                          {['Гомдол', 'Хүсэлт', 'Талархал'].map((type) => (
                            <button key={type} onClick={() => setFeedbackType(type)} className={`py-3 rounded-xl text-[10px] font-bold transition-all uppercase tracking-wide ${feedbackType === type ? styles.primaryButton : `${styles.raised} text-gray-500 hover:text-gray-800`}`}>{type}</button>
                          ))}
                        </div>
                    </div>
                    <div className="relative z-20"><label className={styles.textLabel}>Хэнд илгээх <span className="text-red-500">*</span></label><CustomSelect options={recipients} value={recipient} onChange={setRecipient} placeholder="Албан тушаалтан..." /></div>
                    <div><label className={styles.textLabel}>Дэлгэрэнгүй <span className="text-red-500">*</span></label><textarea rows="4" placeholder="Санал хүсэлтээ энд бичнэ үү..." className={`${styles.inputBase} resize-none`}></textarea></div>
                    
                    {/* RATING SECTION */}
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className={`${styles.textLabel} text-center block`}>Үнэлгээ</label>
                        <div className={`flex gap-3 p-4 rounded-2xl justify-center ${styles.sunken}`}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                              key={star} 
                              onClick={() => handleStarClick(star)} 
                              className="relative focus:outline-none transition-transform active:scale-90 hover:scale-110"
                              style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                              <Star size={28} className={`${star <= rating ? 'fill-yellow-400 stroke-yellow-300 stroke-[2px] drop-shadow-[0_0_10px_rgba(253,224,71,0.9)] filter' : 'text-gray-300'}`} />
                              {explodingStars.includes(star) && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  {[...Array(8)].map((_, i) => {
                                    const angle = (i * 45) * (Math.PI / 180);
                                    const distance = 30 + Math.random() * 15;
                                    const tx = Math.cos(angle) * distance + 'px';
                                    const ty = Math.sin(angle) * distance + 'px';
                                    const color = ['#FFD700', '#FFA500', '#FF4500'][Math.floor(Math.random() * 3)];
                                    return (
                                      <div key={i} className="particle" style={{ '--tx': tx, '--ty': ty, backgroundColor: color }}></div>
                                    );
                                  })}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div><label className={styles.textLabel}>Ажилтны нэр</label><input type="text" placeholder="Заавал биш..." className={styles.inputBase} /></div>
                    </div>

                    <div className="pt-4 flex gap-3">
                      <button onClick={() => setStep(1)} className={`w-14 h-14 rounded-xl ${styles.raised} flex items-center justify-center text-gray-600 hover:text-gray-900 active:scale-95 transition-all flex-shrink-0`}>
                        <ArrowLeft size={20} />
                      </button>
                      <button className={`flex-1 py-4 ${styles.primaryButton} rounded-xl font-bold text-sm tracking-widest flex items-center justify-center gap-2`}><Send size={18} /> ИЛГЭЭХ</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}