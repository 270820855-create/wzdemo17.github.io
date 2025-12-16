import React from 'react';
import { CATEGORIES, PET_SKINS, BUILT_IN_GAMES } from '../constants';
import { Category, PetSkinId, GameId } from '../types';
import { Smile, Gamepad2, X, ChevronRight, ChevronLeft, Eye, EyeOff, Zap, PlayCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  currentPetId: PetSkinId;
  onSelectPet: (id: PetSkinId) => void;
  onOpenGame: (id: GameId) => void;
  onClose: () => void;
  isPetVisible: boolean;
  onTogglePetVisibility: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeCategory, 
  onSelectCategory,
  currentPetId,
  onSelectPet,
  onOpenGame,
  onClose,
  isPetVisible,
  onTogglePetVisibility,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { t } = useLanguage();

  const getJPTitle = (key: string) => {
    const map: Record<string, string> = {
        'ALL': '総合', 'AI': '人工知能', 'DESIGN': 'デザイン', 
        'FRONTEND': '開発', 'MEDIA': 'メディア', 'TOOLS': 'ツール', 
        'GAME': 'ゲーム'
    };
    return map[key] || '';
  };

  const isCompact = isCollapsed;

  return (
    <aside className="h-full w-full flex flex-col bg-white border-r-[3px] border-black relative z-20 overflow-visible">
      
      {/* Texture Overlay for the Sidebar Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

      {/* Mobile Close Button - Square Sticker Style */}
      <button 
        onClick={onClose}
        className="md:hidden absolute top-3 right-3 z-50 w-10 h-10 bg-black text-white border-2 border-white shadow-[3px_3px_0_#CCFF00] flex items-center justify-center active:scale-95 transition-all"
        aria-label="Close"
      >
        <X size={24} strokeWidth={3} />
      </button>

      {/* Desktop Collapse Toggle - Tab Style */}
      {onToggleCollapse && (
          <button 
            onClick={onToggleCollapse}
            className="
              hidden md:flex 
              absolute -right-8 top-1/2 -translate-y-1/2 
              w-8 h-16 
              bg-black border-y-[3px] border-r-[3px] border-black text-white 
              items-center justify-center 
              z-50 
              hover:bg-neon-green hover:text-black hover:w-10
              transition-all duration-200 
              shadow-[4px_4px_0_rgba(0,0,0,0.2)]
            "
            title={isCompact ? "Expand" : "Collapse"}
          >
            {isCompact ? <ChevronRight size={20} strokeWidth={3} /> : <ChevronLeft size={20} strokeWidth={3} />}
          </button>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 w-full overflow-y-auto scrollbar-hide flex flex-col overflow-x-hidden relative z-10 py-6">
        
        {/* Header Section */}
        <div className={`mb-8 transition-all duration-300 ${isCompact ? 'px-2 flex justify-center' : 'px-5'}`}>
            {isCompact ? (
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center border-2 border-white shadow-[3px_3px_0_#000]">
                    <span className="font-anime font-black text-2xl">M</span>
                </div>
            ) : (
                <div className="relative group select-none">
                    {/* Decorative Top Line */}
                    <div className="w-12 h-1 bg-black mb-1"></div>
                    <h2 className="font-anime text-5xl font-black text-black tracking-tighter leading-none italic transform -skew-x-6">
                      MENU
                    </h2>
                    <div className="flex items-center justify-between mt-1 border-b-2 border-black pb-1">
                        <span className="font-mono text-[10px] font-bold tracking-[0.2em] bg-black text-white px-1">SELECT_MODE</span>
                        <span className="font-anime text-xs font-bold text-gray-400">メニュー</span>
                    </div>
                </div>
            )}
        </div>
        
        {/* Navigation Links - Battle UI Style */}
        <nav className={`flex-1 space-y-3 ${isCompact ? 'px-2' : 'px-4'}`}>
            {CATEGORIES.map((cat, idx) => {
                const isActive = activeCategory === cat.id;
                return (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.id)}
                        className={`
                            relative w-full flex items-center transition-all duration-200 group
                            border-[3px] border-black
                            ${isCompact ? 'justify-center h-12' : 'h-14 pl-4 pr-2'}
                            ${isActive 
                                ? 'bg-jinx-blue text-black shadow-[4px_4px_0_#000] translate-x-2 z-10' 
                                : 'bg-white text-black hover:bg-gray-50 hover:shadow-[4px_4px_0_#CCFF00] hover:-translate-y-0.5 hover:translate-x-1'
                            }
                        `}
                    >
                        {/* Active Indicator Strip (Left) */}
                        {isActive && !isCompact && (
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-white border-r-2 border-black"></div>
                        )}

                        {/* Icon */}
                        <span className={`
                            text-xl transition-transform duration-300 relative z-10
                            ${isActive ? 'scale-110 rotate-6' : 'group-hover:scale-110'}
                            ${isCompact ? '' : 'mr-4'}
                        `}>
                            {cat.icon}
                        </span>

                        {/* Text Content */}
                        {!isCompact && (
                            <div className="flex flex-col items-start leading-none relative z-10">
                                <span className={`
                                    font-anime font-black text-xl tracking-wide uppercase
                                    ${isActive ? 'text-black' : 'text-gray-800'}
                                `}>
                                    {t(`category.${cat.id}`)}
                                </span>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`text-[9px] font-bold ${isActive ? 'text-black bg-white/50 px-1 rounded-sm' : 'text-gray-400'}`}>
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className={`text-[8px] font-bold ${isActive ? 'text-black' : 'text-gray-400'}`}>
                                        {getJPTitle(cat.id)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Active Chevron */}
                        {isActive && !isCompact && (
                            <div className="ml-auto animate-pulse text-black">
                                <ChevronRight size={20} strokeWidth={4} />
                            </div>
                        )}
                    </button>
                );
            })}
        </nav>

        {/* Widgets Section - Panel Style */}
        <div className={`mt-auto pt-6 pb-6 space-y-6 ${isCompact ? 'px-2' : 'px-4'}`}>
                
                {/* --- Game Widget --- */}
                {isCompact ? (
                    <div className="flex flex-col gap-3">
                         <button 
                            className="w-full aspect-square border-[3px] border-black bg-neon-green hover:bg-black hover:text-white transition-colors flex items-center justify-center shadow-[3px_3px_0_#000]"
                            onClick={() => !isCollapsed && onOpenGame('snake')}
                         >
                            <Gamepad2 size={24} />
                         </button>
                         <button 
                            onClick={(e) => { e.stopPropagation(); onTogglePetVisibility(); }}
                            className={`w-full aspect-square border-[3px] border-black flex items-center justify-center shadow-[3px_3px_0_#000] transition-colors ${isPetVisible ? 'bg-jinx-pink text-white' : 'bg-white text-gray-400'}`}
                        >
                            {isPetVisible ? <Eye size={24} /> : <EyeOff size={24} />}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Arcade Panel */}
                        <div className="relative group">
                             {/* Panel Header */}
                             <div className="flex justify-between items-end mb-1 pl-1">
                                 <span className="font-anime font-black text-sm bg-black text-white px-2 py-0.5 transform -skew-x-12 inline-block">ARCADE</span>
                                 <span className="text-[10px] font-mono font-bold text-gray-400">READY?</span>
                             </div>
                             
                             {/* Panel Body */}
                             <div className="border-[3px] border-black bg-white p-2 shadow-[4px_4px_0_#000] relative">
                                 {/* Decorative Corner */}
                                 <div className="absolute top-0 right-0 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-black"></div>

                                 <div className="grid grid-cols-1 gap-2">
                                     {BUILT_IN_GAMES.map((game) => (
                                         <button
                                            key={game.id}
                                            onClick={() => onOpenGame(game.id)}
                                            className="flex items-center gap-3 p-2 bg-gray-50 border-2 border-black/10 hover:border-black hover:bg-neon-green transition-all group/game"
                                         >
                                             <div className={`w-8 h-8 flex items-center justify-center border-2 border-black bg-white group-hover/game:scale-110 transition-transform`}>
                                                 <span className="text-lg">{game.icon}</span>
                                             </div>
                                             <div className="flex flex-col items-start">
                                                 <span className="font-bold text-xs font-anime">{game.name}</span>
                                                 <span className="text-[9px] font-mono text-gray-500 group-hover/game:text-black">START GAME</span>
                                             </div>
                                             <PlayCircle size={14} className="ml-auto opacity-0 group-hover/game:opacity-100 transition-opacity" />
                                         </button>
                                     ))}
                                 </div>
                             </div>
                        </div>

                        {/* Pet Panel */}
                        <div className="relative">
                             {/* Panel Header */}
                             <div className="flex justify-between items-center mb-1 pl-1">
                                 <span className="font-anime font-black text-sm bg-jinx-pink text-white px-2 py-0.5 transform -skew-x-12 inline-block">PARTNER</span>
                                 <button 
                                    onClick={(e) => { e.stopPropagation(); onTogglePetVisibility(); }}
                                    className={`text-[10px] font-bold border border-black px-1.5 py-0.5 hover:bg-black hover:text-white transition-colors ${!isPetVisible ? 'line-through opacity-50' : ''}`}
                                 >
                                     {isPetVisible ? 'VISIBLE' : 'HIDDEN'}
                                 </button>
                             </div>

                             {/* Panel Body */}
                             <div className={`
                                border-[3px] border-black bg-white p-3 shadow-[4px_4px_0_#000] 
                                flex justify-between items-center relative overflow-hidden
                                ${isPetVisible ? '' : 'grayscale opacity-60'}
                             `}>
                                 {/* Background diagonal lines */}
                                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)', backgroundSize: '10px 10px' }}></div>
                                 
                                 {PET_SKINS.map((skin) => (
                                     <button
                                        key={skin.id}
                                        onClick={() => onSelectPet(skin.id)}
                                        className={`
                                            relative w-8 h-8 border-2 transition-all transform hover:-translate-y-1 z-10
                                            ${currentPetId === skin.id 
                                                ? 'border-black shadow-[2px_2px_0_#000] scale-110' 
                                                : 'border-gray-300 opacity-60 hover:opacity-100 hover:border-black'
                                            }
                                        `}
                                        style={{ backgroundColor: skin.avatarColor }}
                                        title={skin.name}
                                     >
                                        {currentPetId === skin.id && (
                                            <div className="absolute -top-3 -right-3 text-black">
                                                <Zap size={14} fill="#CCFF00" />
                                            </div>
                                        )}
                                     </button>
                                 ))}
                             </div>
                        </div>
                    </>
                )}
        </div>
        
        {/* Footer info */}
        {!isCompact && (
            <div className="mt-4 px-6 opacity-30">
                <div className="h-0.5 w-full bg-black mb-1"></div>
                <p className="text-[9px] font-mono text-right">SYS.VER.3.1</p>
            </div>
        )}
      </div>

    </aside>
  );
};

export default Sidebar;