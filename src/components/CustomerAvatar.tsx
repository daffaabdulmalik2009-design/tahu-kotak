import React from 'react';
import { Customer } from '../types';

interface CustomerAvatarProps {
  customer: Customer;
  reaction?: 'neutral' | 'perfect' | 'miss';
  isWalking?: boolean;
  walkState?: 'walking_in' | 'waiting' | 'leaving';
}

export const CustomerAvatar: React.FC<CustomerAvatarProps> = ({
  customer,
  reaction = 'neutral',
  isWalking = false,
  walkState = 'waiting'
}) => {
  const isPerfect = reaction === 'perfect';
  const isMiss = reaction === 'miss';
  const walkingActive = isWalking || walkState === 'walking_in' || walkState === 'leaving';

  return (
    <div className="relative flex flex-col items-center select-none" id="customer-avatar-wrapper">
      {/* 8-Bit Pixel Arcade Speed Badge (Angka 3-10) */}
      <div
        id="customer-speed-badge"
        className={`mb-2 px-2.5 py-1 text-[11px] font-pixel shadow-[2px_2px_0_0_#000] border-2 flex items-center gap-1.5 transition-all ${
          customer.speedNumber <= 4
            ? 'bg-red-500 text-white border-black animate-pulse'
            : customer.speedNumber <= 7
            ? 'bg-amber-400 text-black border-black'
            : 'bg-emerald-500 text-white border-black'
        }`}
      >
        <span className="text-[9px] uppercase tracking-wider">PIN:</span>
        <span className="bg-black text-white px-1.5 py-0.5 text-xs font-pixel">
          {customer.speedNumber}
        </span>
        <span className="text-[9px] hidden sm:inline">
          {customer.speedNumber <= 4 ? 'FAST!' : customer.speedNumber <= 7 ? 'MED' : 'EASY'}
        </span>
      </div>

      {/* Pixel walking status ticker */}
      {walkingActive && (
        <div className="mb-1 text-[9px] font-pixel text-amber-950 bg-yellow-300 px-2 py-0.5 border-2 border-black shadow-[2px_2px_0_0_#000] flex items-center gap-1">
          <span>{walkState === 'leaving' ? '» PULANG' : '» DATANG...'}</span>
        </div>
      )}

      {/* 16-BIT RETRO PIXEL SPRITE CHARACTER */}
      <div className={`relative w-28 h-36 md:w-32 md:h-40 flex items-center justify-center ${walkingActive ? 'animate-pixel-bob' : ''}`}>
        <svg
          viewBox="0 0 64 80"
          className="w-full h-full drop-shadow-[0_4px_0_rgba(0,0,0,0.4)] overflow-visible pixelated"
          shapeRendering="crispEdges"
        >
          {/* Pixel Ground Shadow */}
          <rect x="14" y="74" width="36" height="4" fill="#0f172a" opacity="0.4" />
          <rect x="18" y="72" width="28" height="2" fill="#0f172a" opacity="0.3" />

          {/* Stepped pixel dust when walking */}
          {walkingActive && (
            <g>
              <rect x="44" y="70" width="4" height="4" fill="#cbd5e1" opacity="0.7" />
              <rect x="48" y="68" width="4" height="4" fill="#94a3b8" opacity="0.6" />
              <rect x="40" y="72" width="4" height="4" fill="#f8fafc" opacity="0.8" />
            </g>
          )}

          {/* LEGS / SHOES (Pixel stepped animation) */}
          {/* Left Leg */}
          <g
            className={walkingActive ? 'animate-pixel-leg-left' : ''}
            style={{ transformOrigin: '26px 54px' }}
          >
            {/* Pants */}
            <rect x="22" y="52" width="6" height="16" fill="#1e293b" />
            {/* Shoes */}
            <rect x="20" y="68" width="10" height="6" fill="#0f172a" />
            <rect x="20" y="72" width="10" height="2" fill="#ffffff" />
          </g>

          {/* Right Leg */}
          <g
            className={walkingActive ? 'animate-pixel-leg-right' : ''}
            style={{ transformOrigin: '38px 54px' }}
          >
            {/* Pants */}
            <rect x="36" y="52" width="6" height="16" fill="#0f172a" />
            {/* Shoes */}
            <rect x="34" y="68" width="10" height="6" fill="#0f172a" />
            <rect x="34" y="72" width="10" height="2" fill="#ffffff" />
          </g>

          {/* LEFT ARM (Behind torso when walking) */}
          {walkingActive ? (
            <g
              className="animate-pixel-leg-right"
              style={{ transformOrigin: '18px 38px' }}
            >
              <rect x="12" y="38" width="6" height="14" fill={customer.shirtColor} />
              <rect x="12" y="52" width="6" height="4" fill="#fed7aa" />
            </g>
          ) : null}

          {/* PIXEL TORSO / SHIRT */}
          <rect x="18" y="36" width="28" height="18" fill={customer.shirtColor} />
          {/* Outline / Shadow */}
          <rect x="18" y="52" width="28" height="2" fill="#000000" opacity="0.25" />

          {/* Custom Costume Pixel Details */}
          {customer.avatarType === 'ojol' && (
            <>
              {/* Ojol Yellow Stripes */}
              <rect x="18" y="44" width="28" height="3" fill="#facc15" />
              <rect x="30" y="36" width="4" height="8" fill="#14532d" />
            </>
          )}

          {customer.avatarType === 'pelajar' && (
            <>
              {/* Red school tie */}
              <rect x="30" y="36" width="4" height="12" fill="#b91c1c" />
              <rect x="31" y="48" width="2" height="4" fill="#991b1b" />
            </>
          )}

          {customer.avatarType === 'ibu' && (
            <>
              {/* Daster pixel flower dots */}
              <rect x="22" y="40" width="2" height="2" fill="#fef08a" />
              <rect x="34" y="42" width="2" height="2" fill="#fef08a" />
              <rect x="40" y="46" width="2" height="2" fill="#fef08a" />
              <rect x="26" y="48" width="2" height="2" fill="#fef08a" />
            </>
          )}

          {customer.avatarType === 'pakrt' && (
            <>
              {/* Batik buttons & collar */}
              <rect x="30" y="36" width="4" height="16" fill="#fef3c7" opacity="0.4" />
              <rect x="31" y="40" width="2" height="2" fill="#78350f" />
              <rect x="31" y="46" width="2" height="2" fill="#78350f" />
            </>
          )}

          {/* PIXEL HEAD & NECK */}
          <rect x="28" y="32" width="8" height="4" fill="#fed7aa" />
          <rect x="20" y="14" width="24" height="20" fill="#fed7aa" />

          {/* HAIRSTYLES & HEADGEAR */}
          {customer.avatarType === 'ojol' ? (
            // Green Ojol Helmet
            <>
              <rect x="18" y="8" width="28" height="12" fill="#15803d" />
              <rect x="16" y="14" width="32" height="6" fill="#166534" />
              <rect x="22" y="16" width="20" height="2" fill="#86efac" />
            </>
          ) : customer.avatarType === 'pakrt' ? (
            // Black Peci / Kopiah
            <>
              <rect x="18" y="8" width="28" height="10" fill="#18181b" />
              <rect x="20" y="6" width="24" height="2" fill="#27272a" />
            </>
          ) : customer.avatarType === 'pelajar' ? (
            // Red SD Cap
            <>
              <rect x="18" y="10" width="28" height="8" fill="#b91c1c" />
              <rect x="16" y="16" width="34" height="3" fill="#991b1b" />
              <rect x="30" y="8" width="4" height="2" fill="#fef08a" />
            </>
          ) : customer.avatarType === 'ibu' ? (
            // Hair Bun
            <>
              <rect x="18" y="10" width="28" height="8" fill="#292524" />
              <rect x="26" y="4" width="12" height="6" fill="#1c1917" />
              <rect x="16" y="14" width="4" height="10" fill="#292524" />
              <rect x="44" y="14" width="4" height="10" fill="#292524" />
            </>
          ) : customer.avatarType === 'bocil1' ? (
            // Curly Hair
            <>
              <rect x="18" y="8" width="28" height="8" fill="#78350f" />
              <rect x="16" y="12" width="6" height="8" fill="#78350f" />
              <rect x="42" y="12" width="6" height="8" fill="#78350f" />
              <rect x="22" y="6" width="20" height="2" fill="#92400e" />
            </>
          ) : customer.avatarType === 'bocil2' ? (
            // Blonde Hair
            <>
              <rect x="18" y="8" width="28" height="8" fill="#facc15" />
              <rect x="16" y="12" width="4" height="6" fill="#eab308" />
              <rect x="44" y="12" width="4" height="6" fill="#eab308" />
            </>
          ) : (
            // Dark Casual Hair
            <>
              <rect x="18" y="8" width="28" height="8" fill="#1e1b4b" />
              <rect x="16" y="14" width="4" height="6" fill="#1e1b4b" />
              <rect x="44" y="14" width="4" height="6" fill="#1e1b4b" />
            </>
          )}

          {/* PIXEL EYES */}
          {isPerfect ? (
            // Happy ^ ^ eyes
            <>
              <rect x="24" y="20" width="4" height="2" fill="#451a03" />
              <rect x="26" y="18" width="2" height="2" fill="#451a03" />
              <rect x="36" y="20" width="4" height="2" fill="#451a03" />
              <rect x="38" y="18" width="2" height="2" fill="#451a03" />
            </>
          ) : isMiss ? (
            // Surprised O O eyes + sweat drop
            <>
              <rect x="24" y="18" width="4" height="4" fill="#000000" />
              <rect x="36" y="18" width="4" height="4" fill="#000000" />
              {/* Sweat drop */}
              <rect x="44" y="14" width="3" height="4" fill="#38bdf8" />
              <rect x="45" y="18" width="2" height="2" fill="#0284c7" />
            </>
          ) : (
            // Normal retro arcade pixel eyes
            <>
              <rect x="24" y="20" width="3" height="4" fill="#0f172a" />
              <rect x="25" y="20" width="1" height="2" fill="#ffffff" />
              <rect x="36" y="20" width="3" height="4" fill="#0f172a" />
              <rect x="37" y="20" width="1" height="2" fill="#ffffff" />
            </>
          )}

          {/* PIXEL NOSE */}
          <rect x="31" y="24" width="2" height="2" fill="#ea580c" />

          {/* PIXEL MOUTH */}
          {isPerfect ? (
            // Big open pixel smile
            <>
              <rect x="28" y="28" width="8" height="3" fill="#991b1b" />
              <rect x="29" y="28" width="6" height="1" fill="#ffffff" />
              {/* Rosy cheeks */}
              <rect x="21" y="24" width="3" height="2" fill="#f43f5e" opacity="0.6" />
              <rect x="40" y="24" width="3" height="2" fill="#f43f5e" opacity="0.6" />
            </>
          ) : isMiss ? (
            // Wavy / sad mouth
            <rect x="28" y="29" width="8" height="2" fill="#451a03" />
          ) : (
            // Gentle retro pixel smile
            <>
              <rect x="28" y="28" width="8" height="2" fill="#451a03" />
              <rect x="27" y="27" width="2" height="1" fill="#451a03" />
              <rect x="35" y="27" width="2" height="1" fill="#451a03" />
            </>
          )}

          {/* RIGHT ARM & HANDS / BOX */}
          {walkingActive ? (
            <g
              className="animate-pixel-leg-left"
              style={{ transformOrigin: '46px 38px' }}
            >
              <rect x="46" y="38" width="6" height="14" fill={customer.shirtColor} />
              <rect x="46" y="52" width="6" height="4" fill="#fed7aa" />
            </g>
          ) : (
            // Standing waiting: Holding pixel takeaway box
            <g>
              {/* Hands */}
              <rect x="20" y="44" width="4" height="4" fill="#fed7aa" />
              <rect x="40" y="44" width="4" height="4" fill="#fed7aa" />

              {/* Pixel Tahu Box */}
              <rect x="22" y="42" width="20" height="10" fill="#fef3c7" stroke="#78350f" strokeWidth="1" />
              {/* Tofu cube inside */}
              <rect x="28" y="40" width="8" height="6" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
              <rect x="30" y="41" width="4" height="2" fill="#fef08a" />
            </g>
          )}
        </svg>
      </div>

      {/* Name and role badge in Pixel Style */}
      <div className="text-center mt-1">
        <div className="font-pixel text-[11px] sm:text-xs text-slate-900 leading-tight">
          {customer.name}
        </div>
        <div className="font-pixel-body text-xs font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 border-2 border-amber-800 shadow-[1px_1px_0_0_#78350f] inline-block mt-0.5">
          {customer.role}
        </div>
      </div>
    </div>
  );
};
