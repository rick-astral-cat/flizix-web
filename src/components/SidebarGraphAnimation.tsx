export function SidebarGraphAnimation() {
  const wave1 =
    'M0 60 C 20 60, 40 20, 60 40 C 80 60, 100 80, 120 50 C 140 20, 160 70, 180 40 C 200 10, 220 50, 250 60 C 280 70, 310 30, 340 50 C 370 70, 400 20, 430 45 C 460 70, 490 30, 520 55 C 550 80, 580 40, 610 60 C 640 80, 670 20, 700 45 C 730 70, 760 30, 790 55 C 820 80, 850 40, 880 60 C 910 80, 940 20, 970 45 C 980 60, 990 60, 1000 60';
  const wave2 =
    'M0 60 C 30 60, 60 80, 90 50 C 120 20, 150 70, 180 40 C 210 10, 240 60, 270 30 C 300 10, 330 70, 360 45 C 390 20, 420 80, 450 55 C 480 30, 510 70, 540 45 C 570 20, 600 80, 630 55 C 660 30, 690 70, 720 45 C 750 20, 780 80, 810 55 C 840 30, 870 70, 900 45 C 930 20, 960 80, 985 60 C 990 50, 995 60, 1000 60';
  const wave3 =
    'M0 60 C 50 60, 100 10, 150 60 C 200 90, 250 30, 300 60 C 350 90, 400 10, 450 60 C 500 90, 550 30, 600 60 C 650 90, 700 10, 750 60 C 800 90, 850 30, 900 60 C 950 90, 980 40, 1000 60';

  return (
    <div className="relative w-full h-20 overflow-hidden opacity-70 hover:opacity-100 transition-opacity duration-500">
      {/* Layer 1: Cyan */}
      <div className="absolute inset-0 flex w-[2000px] animate-scroll-master-1">
        <WaveLayer
          d={wave1}
          color="rgba(56, 189, 248, 0.25)"
          stroke="rgba(56, 189, 248, 0.6)"
          id="cyan"
          anim="organic-1"
        />
        <WaveLayer
          d={wave1}
          color="rgba(56, 189, 248, 0.25)"
          stroke="rgba(56, 189, 248, 0.6)"
          id="cyan-ref"
          anim="organic-1"
          className="-ml-[1px]"
        />
      </div>

      {/* Layer 2: Violet */}
      <div className="absolute inset-0 flex w-[2000px] animate-scroll-master-2">
        <WaveLayer
          d={wave2}
          color="rgba(139, 92, 246, 0.15)"
          stroke="rgba(139, 92, 246, 0.4)"
          id="violet"
          anim="organic-2"
        />
        <WaveLayer
          d={wave2}
          color="rgba(139, 92, 246, 0.15)"
          stroke="rgba(139, 92, 246, 0.4)"
          id="violet-ref"
          anim="organic-2"
          className="-ml-[1px]"
        />
      </div>

      {/* Layer 3: Pink */}
      <div className="absolute inset-0 flex w-[2000px] animate-scroll-master-3 opacity-40">
        <WaveLayer
          d={wave3}
          color="rgba(236, 72, 153, 0.1)"
          stroke="rgba(236, 72, 153, 0.3)"
          id="pink"
          anim="organic-3"
        />
        <WaveLayer
          d={wave3}
          color="rgba(236, 72, 153, 0.1)"
          stroke="rgba(236, 72, 153, 0.3)"
          id="pink-ref"
          anim="organic-3"
          className="-ml-[1px]"
        />
      </div>

      <style>{`
        @keyframes scrollMaster {
          from { transform: translateX(0); }
          to { transform: translateX(-1000px); }
        }
        
        @keyframes organic-1 {
          0%, 100% { transform: scaleY(0.95) translateY(2px); }
          50% { transform: scaleY(1.05) translateY(-2px); }
        }
        @keyframes organic-2 {
          0%, 100% { transform: scaleY(1.05) translateY(-3px); }
          50% { transform: scaleY(0.95) translateY(1px); }
        }
        @keyframes organic-3 {
          0%, 100% { transform: scaleY(0.9) translateY(1px); }
          50% { transform: scaleY(1.1) translateY(-4px); }
        }

        .animate-scroll-master-1 { animation: scrollMaster 40s linear infinite; }
        .animate-scroll-master-2 { animation: scrollMaster 60s linear infinite; }
        .animate-scroll-master-3 { animation: scrollMaster 85s linear infinite; }
        
        .wave-anim-organic-1 { transform-origin: bottom; animation: organic-1 7s ease-in-out infinite; }
        .wave-anim-organic-2 { transform-origin: bottom; animation: organic-2 11s ease-in-out infinite; }
        .wave-anim-organic-3 { transform-origin: bottom; animation: organic-3 13s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

function WaveLayer({
  d,
  color,
  stroke,
  id,
  anim,
  className = '',
}: {
  d: string;
  color: string;
  stroke: string;
  id: string;
  anim: string;
  className?: string;
}) {
  return (
    <div className={`relative w-[1000px] h-full ${className}`}>
      <svg
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        className="w-full h-full"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d={`${d} V 80 H 0 Z`} fill={`url(#grad-${id})`} className={`wave-anim-${anim}`} />
        <path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinecap="round"
          className={`wave-anim-${anim} drop-shadow-[0_0_3px_rgba(255,255,255,0.1)]`}
        />
      </svg>
    </div>
  );
}
