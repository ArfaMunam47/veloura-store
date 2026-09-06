import React from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

interface WishlistPageProps {
  onNavigate: (page: string) => void;
  onSelectProduct: (id: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate, onSelectProduct }) => {
  const { wishlist, getProductById, addToCart, showToast } = useStore();

  const products = wishlist.map(id => getProductById(id)).filter(Boolean);

  const handleMoveAllToBag = () => {
    products.forEach(p => {
      if (p) {
        addToCart(p.id, p.sizes?.[0] || 'One Size', p.colors?.[0]?.hex || '#111111', p.colors?.[0]?.name || 'Standard', 1);
      }
    });
    showToast('All saved pieces moved to your shopping bag.');
  };

  return (
    <div id="wishlist-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-[#FAF9F5] bg-[#06110B]">
      {/* Header */}
      <div className="pb-6 border-b border-[#183B2B] mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono-luxury uppercase tracking-[0.2em] text-[#D4AF37]">
            Private Wardrobe Archive
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl text-white font-normal mt-1">
            Your Wishlist ({wishlist.length})
          </h1>
        </div>

        {products.length > 0 && (
          <button
            onClick={handleMoveAllToBag}
            className="px-6 py-3 bg-[#D4AF37] text-[#06110B] hover:bg-[#E5C583] text-xs uppercase tracking-[0.16em] font-bold font-sans transition-colors self-start sm:self-auto rounded-xs shadow-md"
          >
            Move All to Bag
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center bg-[#0A1C14] border border-[#183C2A] p-8 max-w-xl mx-auto rounded-xs shadow-xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#07130D] border border-[#214D37] flex items-center justify-center text-[#D4AF37] mb-4">
            <Heart size={24} strokeWidth={1.5} />
          </div>
          <h2 className="font-editorial text-3xl text-white font-normal">Your wishlist is currently empty</h2>
          <p className="text-xs text-[#9DB4A7] mt-2 max-w-xs mx-auto leading-relaxed">
            Save exceptional coats, tailoring, and Italian leather accessories for your seasonal wardrobe.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="mt-6 px-7 py-3 bg-[#D4AF37] text-[#06110B] text-xs uppercase tracking-[0.16em] hover:bg-[#E5C583] font-bold transition-colors rounded-xs shadow-md"
          >
            Explore Collections
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            p && <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      )}
    </div>
  );
};
