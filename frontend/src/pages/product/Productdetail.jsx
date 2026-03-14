import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productApi } from "../../apis/product";
import { authApi } from "../../apis/auth";
import { useDispatch } from "react-redux";
import { addOrIncrementInCart } from "../../redux/cartSlice";
import { addOrIncrementInWishlist } from "../../redux/wishlistSlice";
import { IoChevronBackOutline, IoBagHandleOutline, IoHeartOutline, IoHeartSharp, IoResizeOutline } from "react-icons/io5";
import Header from "../common/Header";

const Productdetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [wish, setWish] = useState(false);

  const getSingleProduct = async () => {
    try {
      const res = await productApi.getSingle(slug);
      setProduct(res.product);
      setActiveImg(res.product.image[0]?.url);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (slug) getSingleProduct();
  }, [slug]);

  const discountedPrice = product?.discount > 0
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : product?.price;

  const handleAddToCart = async () => {
    const payload = {
      productId: product._id,
      slug: product.slug,
      price: discountedPrice,
      name: product.name,
      description: product.description,
      imageUrl: product?.image[0]?.url || "",
    };
    try {
      dispatch(addOrIncrementInCart(payload));
      await authApi.addToCart(payload);
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const handleAddToWishlist = async () => {
    const payload = {
      productId: product._id,
      slug: product.slug,
      price: discountedPrice,
      name: product.name,
      description: product.description,
      imageUrl: product?.image[0]?.url || "",
    };
    try {
      dispatch(addOrIncrementInWishlist(payload));
      await authApi.addToWishlist(payload);
      setWish(true);
    } catch (err) {
      console.error("Add to wishlist error:", err);
    }
  };

  if (!product) return <div className="min-h-screen bg-white"></div>;

  return (
    <div className="w-full min-h-screen bg-white font-google text-[#2D1B2D]">
      <Header />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        {/* Navigation - Top aligned */}
        <div className="mb-8 border-b border-gray-100 pb-4">
          <button
            onClick={() => navigate("/product")}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#7A4431]"
          >
            <IoChevronBackOutline /> Collection Archive
          </button>
        </div>

        {/* items-start ensures LHS and RHS align perfectly at the very top of their containers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LHS: COMPACT GALLERY --- */}
          <div className="lg:col-span-6">
             <div className="relative w-full h-[480px] bg-[#FDFBF9] border border-gray-100 overflow-hidden">
                {product?.discount > 0 && (
                   <div className="absolute top-0 left-0 z-10 bg-[#7A4431] text-white text-[9px] font-black uppercase tracking-widest px-4 py-2">
                     {product?.discount}% OFF
                   </div>
                )}
                <img 
                 src={activeImg} 
                 className="w-full h-full object-cover" 
                 alt="product" 
                />
             </div>

             {/* Thumbnails */}
             <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
                {product?.image.map((img) => (
                  <button 
                    key={img._id} 
                    onClick={() => setActiveImg(img.url)}
                    className={`flex-shrink-0 w-16 h-20 border transition-all ${
                        activeImg === img.url ? 'border-[#7A4431]' : 'border-gray-100 opacity-60'
                    }`}
                  >
                    <img src={img.url} className="w-full h-full object-cover" alt="thumb" />
                  </button>
                ))}
             </div>
          </div>

          {/* --- RHS: CONTENT AREA (Aligned with top of LHS) --- */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Title and Price */}
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#7A4431] opacity-80">
                {product?.keywords || "Handcrafted Edit"}
              </p>
              <h1 className="text-3xl lg:text-4xl font-serif text-[#2D1B2D] uppercase leading-none">
                {product?.name}
              </h1>
              <div className="flex items-baseline gap-4 pt-1">
                <span className="text-3xl font-light text-[#7A4431]">₹{discountedPrice}.00</span>
                {product?.discount > 0 && (
                  <span className="text-sm line-through text-gray-300 italic font-light">₹{product.price}</span>
                )}
              </div>
            </div>

            {/* PRODUCT OPTIONS (Color Variants / Shade Selection) */}
            <div className="space-y-4 pt-4 border-t border-gray-50">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Available Options:</p>
               <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {product?.image.slice(0, 4).map((img, i) => (
                    <div key={i} className="flex flex-col gap-2 min-w-[70px] group cursor-pointer" onClick={() => setActiveImg(img.url)}>
                       <div className={`aspect-square w-16 overflow-hidden border transition-all ${activeImg === img.url ? 'border-[#7A4431] ring-1 ring-[#7A4431]' : 'border-gray-100 group-hover:border-[#7A4431]'}`}>
                          <img src={img.url} className="w-full h-full object-cover" alt="variant" />
                       </div>
                       <p className={`text-[8px] text-center font-bold uppercase py-1 ${activeImg === img.url ? 'bg-[#7A4431] text-white' : 'bg-gray-50 text-gray-400'}`}>
                          Style {i+1}
                       </p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Select Size</p>
                  <button className="text-[9px] font-bold text-[#7A4431] border-b border-[#7A4431] uppercase">Size Guide</button>
               </div>
               <div className="grid grid-cols-6 border-l border-t border-gray-100 max-w-sm">
                  {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 flex items-center justify-center text-[11px] font-bold border-r border-b border-gray-100 transition-all ${
                        selectedSize === size ? "bg-[#7A4431] text-white" : "bg-white text-gray-400 hover:text-[#7A4431]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-4">
              <button 
                onClick={handleAddToCart}
                className="group relative w-full bg-[#2D1B2D] text-white py-4.5 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all active:scale-[0.98]"
              >
                <IoBagHandleOutline size={18} className="relative z-10" />
                <span className="relative z-10">Add to Bag</span>
                <div className="absolute inset-0 bg-[#7A4431] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
              
              <button 
                onClick={handleAddToWishlist}
                className={`w-full py-4.5 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] border transition-all ${
                  wish ? "bg-[#7A4431] text-white border-[#7A4431]" : "border-gray-200 text-[#2D1B2D] hover:bg-gray-50"
                }`}
              >
                {wish ? <IoHeartSharp size={18} /> : <IoHeartOutline size={18} />}
                {wish ? "Loved It" : "Wishlist"}
              </button>
            </div>

            {/* Description */}
            <div className="pt-8 border-t border-gray-50">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Product Manifesto</p>
               <p className="text-[13px] text-gray-600 leading-relaxed font-light italic">
                 {product?.description}
               </p>
            </div>

          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default Productdetail;