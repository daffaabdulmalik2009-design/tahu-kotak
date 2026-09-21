import React from 'react';
import { Customer } from '../types';
import { CustomerAvatar } from './CustomerAvatar';
import { Volume2, Sparkles, Coins } from 'lucide-react';

interface TruckSceneProps {
  customer: Customer | null;
  lastReaction: 'neutral' | 'perfect' | 'miss';
  flyingTofu: boolean;
  isFrying: boolean;
  lastResult: { isHit: boolean; reward: number; text: string } | null;
  strikingPinSlot?: React.ReactNode;
  customerWalkState?: 'walking_in' | 'waiting' | 'leaving';
}

export const TruckScene: React.FC<TruckSceneProps> = ({
  customer,
  lastReaction,
  flyingTofu,
  isFrying,
  lastResult,
  strikingPinSlot,
  customerWalkState = 'waiting'
}) => {
  // Coin popups
  const [floatingCoins, setFloatingCoins] = React.useState<
    Array<{ id: number; amount: number; isHit: boolean }>
  >([]);

  React.useEffect(() => {
    if (lastResult) {
      const newCoin = {
        id: Date.now(),
        amount: lastResult.reward,
        isHit: lastResult.isHit
      };
      setFloatingCoins((prev) => [...prev.slice(-3), newCoin]);
      const timer = setTimeout(() => {
        setFloatingCoins((prev) => prev.filter((c) => c.id !== newCoin.id));
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [lastResult]);

  return (
    <div className="w-full flex flex-col overflow-hidden pixel-box-amber bg-slate-950 select-none">
      {/* ------------------------------------------------------------------ */}
      {/* 1. STREET SCENERY & SKY (16-BIT PIXEL ART) */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative w-full h-[330px] sm:h-[370px] md:h-[400px] overflow-hidden flex flex-col justify-between">
        
        {/* RETRO DAY SKY (Pixel gradient steps) */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-amber-100 pointer-events-none" />

        {/* RETRO PIXEL CLOUDS */}
        <div className="absolute top-2 left-4 pointer-events-none opacity-90 pixelated">
          <svg width="100" height="36" viewBox="0 0 50 18" shapeRendering="crispEdges">
            {/* White Cloud body */}
            <rect x="10" y="8" width="30" height="8" fill="#ffffff" />
            <rect x="14" y="4" width="22" height="4" fill="#ffffff" />
            <rect x="20" y="2" width="12" height="2" fill="#ffffff" />
            <rect x="6" y="10" width="4" height="6" fill="#ffffff" />
            <rect x="40" y="10" width="6" height="6" fill="#ffffff" />
            {/* Cloud shadow border */}
            <rect x="10" y="16" width="32" height="2" fill="#bae6fd" />
            <rect x="4" y="12" width="2" height="4" fill="#bae6fd" />
          </svg>
        </div>

        <div className="absolute top-5 right-10 pointer-events-none opacity-85 hidden sm:block pixelated">
          <svg width="120" height="40" viewBox="0 0 60 20" shapeRendering="crispEdges">
            <rect x="12" y="8" width="36" height="10" fill="#ffffff" />
            <rect x="18" y="4" width="24" height="4" fill="#ffffff" />
            <rect x="26" y="2" width="14" height="2" fill="#ffffff" />
            <rect x="8" y="10" width="4" height="8" fill="#ffffff" />
            <rect x="48" y="10" width="6" height="8" fill="#ffffff" />
            <rect x="12" y="18" width="40" height="2" fill="#bae6fd" />
          </svg>
        </div>

        {/* PIXEL PASUPATI CABLE-STAYED FLYOVER BRIDGE SILHOUETTE */}
        <div className="absolute top-10 left-0 right-0 h-28 pointer-events-none opacity-40 pixelated">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 60" shapeRendering="crispEdges">
            {/* Bridge Deck */}
            <rect x="0" y="52" width="400" height="6" fill="#475569" />
            <rect x="0" y="58" width="400" height="2" fill="#1e293b" />
            {/* Central Pylon Pillar */}
            <rect x="194" y="10" width="12" height="44" fill="#334155" />
            <rect x="196" y="4" width="8" height="6" fill="#1e293b" />
            {/* Cables (Pixel steps) */}
            <line x1="200" y1="12" x2="100" y2="52" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="200" y1="20" x2="130" y2="52" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="200" y1="28" x2="160" y2="52" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="200" y1="12" x2="300" y2="52" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="200" y1="20" x2="270" y2="52" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="200" y1="28" x2="240" y2="52" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
          </svg>
        </div>

        {/* 16-BIT PIXEL TREES (POKEMON / RETRO RPG STYLE) */}
        <div className="absolute top-[75px] sm:top-[85px] left-0 right-0 flex justify-between px-1 pointer-events-none opacity-95 pixelated">
          {/* Left Tree */}
          <div className="relative -ml-4">
            <svg width="120" height="120" viewBox="0 0 60 60" shapeRendering="crispEdges">
              {/* Trunk */}
              <rect x="26" y="36" width="8" height="24" fill="#78350f" />
              <rect x="28" y="38" width="4" height="20" fill="#92400e" />
              {/* Foliage Layers */}
              <rect x="16" y="16" width="28" height="22" fill="#15803d" />
              <rect x="12" y="22" width="36" height="14" fill="#16a34a" />
              <rect x="20" y="10" width="20" height="8" fill="#22c55e" />
              <rect x="24" y="6" width="12" height="4" fill="#4ade80" />
              {/* Highlights & Shadows */}
              <rect x="16" y="16" width="4" height="10" fill="#4ade80" />
              <rect x="36" y="28" width="10" height="8" fill="#14532d" />
            </svg>
          </div>
          {/* Right Tree */}
          <div className="relative -mr-4">
            <svg width="130" height="130" viewBox="0 0 65 65" shapeRendering="crispEdges">
              <rect x="28" y="40" width="9" height="25" fill="#78350f" />
              <rect x="30" y="42" width="4" height="22" fill="#92400e" />
              <rect x="18" y="18" width="30" height="24" fill="#15803d" />
              <rect x="14" y="24" width="38" height="16" fill="#16a34a" />
              <rect x="22" y="12" width="22" height="8" fill="#22c55e" />
              <rect x="26" y="8" width="14" height="4" fill="#4ade80" />
              <rect x="42" y="30" width="10" height="10" fill="#14532d" />
            </svg>
          </div>
        </div>

        {/* PIXEL SIDEWALK & ALTERNATING BLACK/WHITE CURB */}
        <div className="absolute top-[175px] sm:top-[190px] left-0 right-0 h-16 pointer-events-none pixelated">
          <div className="h-8 bg-stone-300 border-b-2 border-stone-400" />
          {/* Alternating curbs */}
          <div className="h-6 w-full flex overflow-hidden border-b-2 border-black">
            {Array.from({ length: 32 }).map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-full border-r border-black ${
                  idx % 2 === 0 ? 'bg-slate-900' : 'bg-stone-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* PIXEL FROG TRASH CAN (LEFT) */}
        <div className="absolute top-[145px] sm:top-[158px] left-3 sm:left-6 z-10 pointer-events-none pixelated">
          <svg width="40" height="46" viewBox="0 0 20 23" shapeRendering="crispEdges">
            {/* Green body */}
            <rect x="4" y="8" width="12" height="14" fill="#16a34a" stroke="#14532d" strokeWidth="1" />
            {/* Mouth slot */}
            <rect x="6" y="12" width="8" height="4" fill="#0f172a" />
            {/* Frog Eyes */}
            <rect x="3" y="4" width="4" height="4" fill="#22c55e" />
            <rect x="4" y="5" width="2" height="2" fill="#ffffff" />
            <rect x="5" y="6" width="1" height="1" fill="#000000" />
            <rect x="13" y="4" width="4" height="4" fill="#22c55e" />
            <rect x="14" y="5" width="2" height="2" fill="#ffffff" />
            <rect x="14" y="6" width="1" height="1" fill="#000000" />
          </svg>
        </div>

        {/* PIXEL STONE SPHERE MONUMENT (RIGHT) */}
        <div className="absolute top-[138px] sm:top-[150px] right-2 sm:right-4 z-10 pointer-events-none hidden xs:block pixelated">
          <svg width="44" height="48" viewBox="0 0 22 24" shapeRendering="crispEdges">
            <rect x="4" y="18" width="14" height="6" fill="#475569" />
            {/* Stone Sphere */}
            <rect x="5" y="6" width="12" height="12" fill="#94a3b8" />
            <rect x="7" y="4" width="8" height="16" fill="#94a3b8" />
            <rect x="4" y="7" width="14" height="10" fill="#94a3b8" />
            <rect x="6" y="5" width="4" height="4" fill="#cbd5e1" />
            {/* Indonesian flag pole */}
            <rect x="11" y="0" width="1" height="6" fill="#334155" />
            <rect x="12" y="0" width="6" height="2" fill="#ef4444" />
            <rect x="12" y="2" width="6" height="2" fill="#ffffff" />
          </svg>
        </div>

        {/* PIXEL ASPHALT ROAD SURFACE */}
        <div className="absolute top-[220px] sm:top-[238px] left-0 right-0 bottom-0 bg-slate-900 pointer-events-none">
          {/* Pixel Dashed Lane Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-2 flex justify-between px-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-6 h-2 bg-yellow-400 mx-1.5 shadow-[0_0_2px_#f59e0b]" />
            ))}
          </div>
        </div>

        {/* FLOATING RETRO REWARD COIN BANNER (+3000 / +1000) */}
        {floatingCoins.map((coin) => (
          <div
            key={coin.id}
            className="animate-float-coin absolute z-50 top-14 left-1/2 flex items-center gap-1.5 bg-yellow-400 text-slate-950 px-3 py-1.5 border-4 border-black shadow-[4px_4px_0_0_#000] font-pixel text-xs sm:text-sm pointer-events-none"
          >
            <Coins className="w-4 h-4 text-amber-900 animate-pulse" />
            <span>+Rp {coin.amount.toLocaleString('id-ID')}</span>
            <span className="text-[10px] bg-black text-yellow-300 px-1 py-0.5 ml-1">
              {coin.isHit ? '🎯 PERFECT' : 'MISS'}
            </span>
          </div>
        ))}

        {/* TOP 8-BIT MARQUEE / AUDIO TICKER */}
        <div className="relative z-20 mx-2 mt-2 flex items-center justify-between bg-black/90 text-amber-300 px-3 py-1.5 border-2 border-amber-500 shadow-[2px_2px_0_0_#000] font-pixel text-[10px] sm:text-xs">
          <div className="flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            <span className="truncate">
              "TAHU KOTAK DIGORENG DADAKAN! GURIH-GURIH KOTAKKK!"
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[9px] text-amber-200 bg-amber-950 px-1.5 py-0.5 border border-amber-600">
            <Sparkles className="w-2.5 h-2.5" />
            <span>16-BIT RETRO EDITION</span>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 2. RETRO PIXEL FOOD TRUCK & WALKING CUSTOMER */}
        {/* ------------------------------------------------------------------ */}
        <div className="relative z-20 mt-auto px-2 sm:px-4 pb-2 flex items-end justify-between gap-1 sm:gap-4">
          
          {/* THE 16-BIT PIXEL KEI FOOD TRUCK */}
          <div className="relative w-[300px] sm:w-[370px] md:w-[440px] select-none shrink-0" id="tahu-kotak-pickup-truck">
            <svg
              viewBox="0 0 230 130"
              className="w-full h-auto overflow-visible pixelated drop-shadow-[0_6px_0_rgba(0,0,0,0.5)]"
              shapeRendering="crispEdges"
            >
              {/* TRUCK SHADOW ON GROUND */}
              <rect x="8" y="122" width="214" height="6" fill="#020617" opacity="0.6" />

              {/* ---------------- TRUCK CABIN (LEFT SIDE) ---------------- */}
              {/* White Front Cab Body */}
              <rect x="12" y="60" width="62" height="52" fill="#f8fafc" />
              {/* Bottom Cab Skirt */}
              <rect x="10" y="98" width="66" height="14" fill="#0f172a" />
              {/* Front Bumper */}
              <rect x="6" y="98" width="10" height="12" fill="#1e293b" />
              {/* Yellow Headlight */}
              <rect x="6" y="76" width="6" height="10" fill="#facc15" stroke="#000" strokeWidth="1" />
              <rect x="7" y="78" width="2" height="4" fill="#ffffff" />
              {/* Amber Indicator / Blink */}
              <rect x="6" y="88" width="6" height="4" fill="#f97316" stroke="#000" strokeWidth="1" />

              {/* Windshield & Side Window */}
              <polygon points="18,62 38,36 68,36 68,62" fill="#0284c7" />
              <polygon points="22,60 38,40 44,40 28,60" fill="#38bdf8" />
              {/* Cab Roof */}
              <rect x="36" y="34" width="36" height="4" fill="#ffffff" stroke="#000" strokeWidth="1" />
              {/* Side Mirror */}
              <rect x="14" y="58" width="4" height="8" fill="#1e293b" />
              <rect x="18" y="60" width="4" height="2" fill="#38bdf8" />
              {/* Door Handle */}
              <rect x="52" y="74" width="8" height="3" fill="#0f172a" />

              {/* ---------------- WOODEN STALL DOLAK (REAR DECK) ---------------- */}
              {/* Main Wooden Deck Planks */}
              <rect x="72" y="52" width="144" height="60" fill="#78350f" />
              {/* Horizontal plank seams */}
              <rect x="72" y="64" width="144" height="2" fill="#451a03" />
              <rect x="72" y="78" width="144" height="2" fill="#451a03" />
              <rect x="72" y="92" width="144" height="2" fill="#451a03" />
              <rect x="72" y="104" width="144" height="2" fill="#451a03" />
              {/* Nails on wood planks */}
              {[80, 110, 140, 170, 200].map((nx) => (
                <g key={nx}>
                  <rect x={nx} y="60" width="2" height="2" fill="#1c1917" />
                  <rect x={nx} y="74" width="2" height="2" fill="#1c1917" />
                  <rect x={nx} y="88" width="2" height="2" fill="#1c1917" />
                  <rect x={nx} y="100" width="2" height="2" fill="#1c1917" />
                </g>
              ))}

              {/* STALL SERVICE COUNTER WINDOW OPENING */}
              <rect x="78" y="24" width="132" height="48" fill="#1c1917" />
              {/* Wood posts supporting roof */}
              <rect x="74" y="14" width="6" height="60" fill="#92400e" stroke="#451a03" strokeWidth="1" />
              <rect x="204" y="14" width="6" height="60" fill="#92400e" stroke="#451a03" strokeWidth="1" />
              <rect x="138" y="14" width="4" height="60" fill="#92400e" stroke="#451a03" strokeWidth="1" />

              {/* HANGING RETRO PENDANT LAMP WITH WARM PIXEL GLOW */}
              <rect x="130" y="24" width="2" height="8" fill="#cbd5e1" />
              {/* Lamp shade */}
              <rect x="126" y="32" width="10" height="4" fill="#0f172a" />
              <rect x="128" y="36" width="6" height="3" fill="#facc15" />
              {/* Stepped pixel glow beam */}
              <rect x="122" y="39" width="18" height="4" fill="#fef08a" opacity="0.3" />
              <rect x="116" y="43" width="30" height="6" fill="#facc15" opacity="0.2" />
              <rect x="108" y="49" width="46" height="8" fill="#eab308" opacity="0.15" />

              {/* PEDAGANG / CHEF (BEHIND COUNTER) */}
              <g id="pixel-chef">
                {/* Black Chef Shirt */}
                <rect x="110" y="44" width="26" height="24" fill="#0f172a" />
                <rect x="116" y="48" width="14" height="20" fill="#ffffff" />
                {/* Neck */}
                <rect x="120" y="40" width="6" height="4" fill="#fed7aa" />
                {/* Face */}
                <rect x="116" y="28" width="14" height="12" fill="#fed7aa" />
                {/* Eyes & Smile */}
                <rect x="118" y="32" width="2" height="2" fill="#451a03" />
                <rect x="126" y="32" width="2" height="2" fill="#451a03" />
                <rect x="120" y="36" width="6" height="2" fill="#be123c" />
                <rect x="118" y="35" width="2" height="1" fill="#451a03" />
                <rect x="126" y="35" width="2" height="1" fill="#451a03" />
                {/* Black Cap */}
                <rect x="114" y="24" width="18" height="6" fill="#0f172a" />
                <rect x="124" y="28" width="12" height="2" fill="#0f172a" />
              </g>

              {/* WAJAN / FRYING OIL POT (HOT OIL WITH STEAM & SIZZLE) */}
              <rect x="84" y="60" width="24" height="10" fill="#334155" stroke="#0f172a" strokeWidth="1" />
              <rect x="86" y="60" width="20" height="4" fill="#f59e0b" />
              {/* Frying Tofu in Pan */}
              <rect x="88" y="60" width="4" height="4" fill="#fbbf24" />
              <rect x="94" y="60" width="4" height="4" fill="#fbbf24" />
              <rect x="100" y="60" width="4" height="4" fill="#fbbf24" />
              {/* Steaming sizzle bubbles when frying */}
              {isFrying && (
                <g>
                  <rect x="90" y="54" width="2" height="2" fill="#ffffff" className="animate-ping" />
                  <rect x="96" y="52" width="2" height="2" fill="#fef08a" className="animate-bounce" />
                  <rect x="102" y="55" width="2" height="2" fill="#ffffff" className="animate-ping" />
                </g>
              )}

              {/* HEATED GLASS SHOWCASE (ETALASE TAHU KOTAK GORENG) */}
              <rect x="144" y="44" width="42" height="26" fill="#1e293b" stroke="#78350f" strokeWidth="1" />
              <rect x="146" y="46" width="38" height="22" fill="#0284c7" opacity="0.35" />
              {/* Tumpukan Tahu Kotak Crispy Emas */}
              {/* Row 1 */}
              <rect x="148" y="60" width="6" height="6" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
              <rect x="156" y="60" width="6" height="6" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
              <rect x="164" y="60" width="6" height="6" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
              <rect x="172" y="60" width="6" height="6" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
              {/* Row 2 */}
              <rect x="152" y="54" width="6" height="6" fill="#fbbf24" stroke="#78350f" strokeWidth="0.8" />
              <rect x="160" y="54" width="6" height="6" fill="#fbbf24" stroke="#78350f" strokeWidth="0.8" />
              <rect x="168" y="54" width="6" height="6" fill="#fbbf24" stroke="#78350f" strokeWidth="0.8" />
              {/* Row 3 Top */}
              <rect x="156" y="48" width="6" height="6" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
              <rect x="164" y="48" width="6" height="6" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
              {/* Glass Diagonal Highlights */}
              <line x1="148" y1="46" x2="162" y2="66" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
              <line x1="166" y1="46" x2="180" y2="66" stroke="#ffffff" strokeWidth="1" opacity="0.6" />

              {/* SAUCE BOTTLE (RED CHILI SAUCE) */}
              <rect x="190" y="56" width="6" height="14" fill="#dc2626" stroke="#7f1d1d" strokeWidth="0.8" />
              <rect x="191" y="52" width="4" height="4" fill="#ffffff" />
              <rect x="192" y="48" width="2" height="4" fill="#15803d" />

              {/* COUNTER FRONT WOOD BOARD */}
              <rect x="76" y="68" width="136" height="6" fill="#a16207" stroke="#451a03" strokeWidth="1" />

              {/* ---------------- SLATE ROOF WITH STEPPED SHINGLES ---------------- */}
              {/* Eaves Bottom */}
              <rect x="70" y="18" width="148" height="6" fill="#0f172a" />
              {/* Main Slate Roof */}
              <polygon points="72,18 84,6 210,6 216,18" fill="#1e293b" />
              {/* Ridge Cap */}
              <rect x="82" y="4" width="128" height="4" fill="#334155" stroke="#0f172a" strokeWidth="1" />
              {/* Shingle lines */}
              <line x1="72" y1="14" x2="216" y2="14" stroke="#0f172a" strokeWidth="1" />
              <line x1="78" y1="10" x2="212" y2="10" stroke="#0f172a" strokeWidth="1" />

              {/* ---------------- BIG TAHU KOTAK SIGNBOARD ON ROOF ---------------- */}
              <rect x="94" y="6" width="104" height="14" fill="#facc15" stroke="#451a03" strokeWidth="1.5" />
              {/* 3 Isometric Tofu Cubes Logo */}
              <rect x="98" y="8" width="4" height="4" fill="#b45309" />
              <rect x="102" y="8" width="4" height="4" fill="#f59e0b" />
              <rect x="100" y="12" width="4" height="4" fill="#fef08a" />
              {/* Sign Text */}
              <text x="148" y="17" fontSize="7" fontWeight="bold" fontFamily="'Press Start 2P', monospace" fill="#451a03" textAnchor="middle">
                TAHU KOTAK
              </text>

              {/* ---------------- TRUCK WHEELS (RETRO 6-HOLE PIXEL RIMS) ---------------- */}
              {/* Front Wheel (Left) */}
              <g id="pixel-front-wheel">
                <rect x="30" y="98" width="28" height="28" fill="#0f172a" />
                <rect x="34" y="96" width="20" height="32" fill="#0f172a" />
                <rect x="28" y="102" width="32" height="20" fill="#0f172a" />
                {/* Silver Rim */}
                <rect x="36" y="104" width="16" height="16" fill="#94a3b8" />
                <rect x="42" y="110" width="4" height="4" fill="#000000" />
                {/* 6 Holes */}
                <rect x="38" y="106" width="2" height="2" fill="#334155" />
                <rect x="48" y="106" width="2" height="2" fill="#334155" />
                <rect x="38" y="116" width="2" height="2" fill="#334155" />
                <rect x="48" y="116" width="2" height="2" fill="#334155" />
              </g>

              {/* Rear Wheel (Right) */}
              <g id="pixel-rear-wheel">
                <rect x="168" y="98" width="28" height="28" fill="#0f172a" />
                <rect x="172" y="96" width="20" height="32" fill="#0f172a" />
                <rect x="166" y="102" width="32" height="20" fill="#0f172a" />
                {/* Silver Rim */}
                <rect x="174" y="104" width="16" height="16" fill="#94a3b8" />
                <rect x="180" y="110" width="4" height="4" fill="#000000" />
                {/* 6 Holes */}
                <rect x="176" y="106" width="2" height="2" fill="#334155" />
                <rect x="186" y="106" width="2" height="2" fill="#334155" />
                <rect x="176" y="116" width="2" height="2" fill="#334155" />
                <rect x="186" y="116" width="2" height="2" fill="#334155" />
              </g>

              {/* Undercarriage Battery / Toolbox */}
              <rect x="94" y="106" width="34" height="10" fill="#334155" stroke="#0f172a" strokeWidth="1" />
              <rect x="98" y="109" width="4" height="4" fill="#64748b" />

              {/* FLYING PIXEL TOFU (LAUNCHED ON STRIKE) */}
              {flyingTofu && (
                <g className="animate-bounce">
                  <rect x="190" y="40" width="10" height="10" fill="#f59e0b" stroke="#451a03" strokeWidth="1" />
                  <rect x="192" y="42" width="6" height="4" fill="#fef08a" />
                  <rect x="184" y="44" width="4" height="2" fill="#cbd5e1" opacity="0.6" />
                </g>
              )}
            </svg>
          </div>

          {/* CUSTOMER AREA (RIGHT) WITH RETRO RPG SPEECH BUBBLE */}
          <div className="relative flex-1 max-w-[200px] sm:max-w-[240px] flex flex-col items-center">
            
            {/* RETRO RPG SPEECH BUBBLE */}
            {customer && (
              <div className="relative z-30 mb-2 w-full max-w-[200px] sm:max-w-[220px]">
                <div
                  className={`p-2.5 sm:p-3 pixel-box-sm transition-all text-left ${
                    lastReaction === 'perfect'
                      ? 'bg-emerald-100 border-emerald-950 text-emerald-950'
                      : lastReaction === 'miss'
                      ? 'bg-amber-100 border-amber-950 text-amber-950'
                      : 'bg-white border-black text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-1 font-pixel text-[9px] text-amber-800 mb-1">
                    <span className="inline-block w-2 h-2 bg-amber-500 mr-0.5" />
                    <span>PESANAN:</span>
                  </div>
                  <p className="font-pixel-body text-xs sm:text-sm font-bold leading-tight">
                    {lastReaction === 'perfect'
                      ? `"${customer.successQuote}"`
                      : lastReaction === 'miss'
                      ? `"${customer.missQuote}"`
                      : `"${customer.greeting}"`}
                  </p>
                </div>
                {/* Stepped Pixel Speech Pointer */}
                <div className="w-0 h-0 ml-6 border-x-8 border-x-transparent border-t-8 border-t-black" />
              </div>
            )}

            {/* CUSTOMER SPRITE */}
            {customer && (
              <div
                className={`transition-transform duration-300 ${
                  customerWalkState === 'walking_in'
                    ? 'animate-customer-walk-in'
                    : customerWalkState === 'leaving'
                    ? 'animate-customer-walk-out'
                    : ''
                }`}
              >
                <CustomerAvatar
                  customer={customer}
                  reaction={lastReaction}
                  walkState={customerWalkState}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. STRIKING PIN SLOT (LOCATED RIGHT BELOW THE DOLAK BAK KAYU) */}
      {/* ------------------------------------------------------------------ */}
      {strikingPinSlot && (
        <div className="w-full bg-slate-900 border-t-4 border-black p-2 sm:p-3">
          {strikingPinSlot}
        </div>
      )}
    </div>
  );
};
