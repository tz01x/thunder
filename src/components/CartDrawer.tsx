import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { CursorState } from '../types';

interface CartDrawerProps {
  setCursorState: (state: CursorState) => void;
  onExploreProducts: () => void;
}

const BD_LOCATIONS = [
  {
    id: 'INSIDE_DHAKA',
    name: 'INSIDE DHAKA',
    deliveryTime: '24–48 HOURS',
    cities: [
      'Dhanmondi, Dhaka',
      'Gulshan, Dhaka',
      'Banani, Dhaka',
      'Uttara, Dhaka',
      'Mirpur, Dhaka',
      'Mohakhali, Dhaka',
      'Mohammadpur, Dhaka',
      'Bashundhara R/A, Dhaka',
      'Badda, Dhaka',
      'Khilgaon, Dhaka',
      'Old Dhaka (Puran Dhaka)',
      'Motijheel, Dhaka',
      'Malibagh, Dhaka',
      'Rampura, Dhaka',
      'Tejgaon, Dhaka',
      'Shantinagar, Dhaka',
      'Jatrabari, Dhaka',
      'Keraniganj, Dhaka',
      'Savar, Dhaka',
      'Other Area in Dhaka Metro',
    ],
  },
  {
    id: 'OUTSIDE_DHAKA',
    name: 'OUTSIDE DHAKA',
    deliveryTime: '2–3 DAYS',
    cities: [
      'Chittagong (Chattogram)',
      'Sylhet',
      'Rajshahi',
      'Khulna',
      'Barishal',
      'Rangpur',
      'Mymensingh',
      'Gazipur',
      'Narayanganj',
      'Comilla (Cumilla)',
      'Bogura',
      'Cox\'s Bazar',
      'Brahmanbaria',
      'Jessore (Jashore)',
      'Tangail',
      'Dinajpur',
      'Feni',
      'Kushtia',
      'Pabna',
      'Noakhali',
      'Faridpur',
      'Sirajganj',
      'Jamalpur',
      'Other District in Bangladesh',
    ],
  },
];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  setCursorState,
  onExploreProducts,
}) => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalCount,
    clearCart,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'INSIDE_DHAKA',
    city: 'Dhanmondi, Dhaka',
    address: '',
    paymentMethod: 'CASH ON DELIVERY (COD)',
  });
  const [orderRef, setOrderRef] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomRef = `TH-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderRef(randomRef);
      setCheckoutStep('success');
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    closeCart();
    // Reset back to cart view after close
    setTimeout(() => {
      setCheckoutStep('cart');
    }, 400);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-xs"
          />

          {/* Slide-out Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute inset-y-0 right-0 max-w-full w-full sm:w-[460px] bg-white border-l border-black/10 flex flex-col justify-between text-black shadow-2xl z-10"
          >
            {/* Header */}
            <div className="px-6 py-6 border-b border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-black">
                  BAG
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  [{totalCount}]
                </span>
              </div>

              <button
                onClick={handleClose}
                onMouseEnter={() => setCursorState({ type: 'button' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 hover:text-black px-2 py-1 border border-black/15"
              >
                [CLOSE]
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === 'cart' && (
                <>
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20 gap-4">
                      <p className="text-xs font-mono tracking-[0.2em] text-neutral-500 uppercase">
                        YOUR BAG IS EMPTY
                      </p>
                      <button
                        onClick={() => {
                          handleClose();
                          onExploreProducts();
                        }}
                        onMouseEnter={() => setCursorState({ type: 'button' })}
                        onMouseLeave={() => setCursorState({ type: 'default' })}
                        className="text-xs font-mono tracking-widest uppercase text-black border-b border-black pb-1 hover:opacity-70 transition-opacity"
                      >
                        EXPLORE ARCHIVE →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 pb-6 border-b border-black/10"
                        >
                          {/* Image */}
                          <div className="w-20 h-24 bg-neutral-100 p-2 flex items-center justify-center shrink-0">
                            <div className="relative w-full h-full">
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.name}
                                fill
                                sizes="80px"
                                className="object-contain"
                              />
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-xs font-medium tracking-wider uppercase text-black">
                                  {item.product.name}
                                </h4>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-[10px] font-mono text-neutral-400 hover:text-black"
                                >
                                  ✕
                                </button>
                              </div>
                              <p className="text-[10px] font-mono text-neutral-600 mt-1 uppercase">
                                SIZE: {item.size}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                              {/* Quantity Stepper */}
                              <div className="flex items-center border border-black/15 bg-neutral-50">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 flex items-center justify-center text-xs font-mono text-neutral-600 hover:text-black"
                                >
                                  -
                                </button>
                                <span className="w-6 text-center text-xs font-mono text-black">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 flex items-center justify-center text-xs font-mono text-neutral-600 hover:text-black"
                                >
                                  +
                                </button>
                              </div>

                              {/* Price */}
                              <span className="text-xs font-mono tracking-wider text-black">
                                {item.product.currency}{item.product.price * item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Shipping Checkout Form - Bangladesh Only */}
              {checkoutStep === 'shipping' && (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-black/10">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase">
                      DISPATCH DESTINATION // BANGLADESH
                    </span>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="text-[10px] font-mono tracking-wider text-neutral-600 hover:text-black"
                    >
                      ← BACK
                    </button>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-neutral-600 uppercase mb-1">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MD. IBRAHIM / ALEXANDER VANCE"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-black/15 px-3 py-2.5 text-xs text-black uppercase outline-none focus:border-black font-mono"
                    />
                  </div>

                  {/* Contact Phone Number */}
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-neutral-600 uppercase mb-1">
                      CONTACT PHONE NUMBER (FOR DELIVERY DISPATCH)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1712-345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-50 border border-black/15 px-3 py-2.5 text-xs text-black outline-none focus:border-black font-mono"
                    />
                  </div>

                  {/* Location Zone Dropdown: Inside Dhaka vs Outside Dhaka */}
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-neutral-600 uppercase mb-1">
                      DELIVERY LOCATION (BANGLADESH)
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => {
                        const newLoc = e.target.value;
                        const matching = BD_LOCATIONS.find((loc) => loc.id === newLoc);
                        setFormData({
                          ...formData,
                          location: newLoc,
                          city: matching ? matching.cities[0] : '',
                        });
                      }}
                      className="w-full bg-neutral-50 border border-black/15 px-3 py-2.5 text-xs text-black uppercase outline-none focus:border-black font-mono cursor-pointer"
                    >
                      {BD_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id} className="text-black font-sans">
                          {loc.name} — DELIVERY IN {loc.deliveryTime}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City / Specific District Dropdown */}
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-neutral-600 uppercase mb-1">
                      {formData.location === 'INSIDE_DHAKA' ? 'DHAKA AREA / ZONE' : 'CITY / DISTRICT'}
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-neutral-50 border border-black/15 px-3 py-2.5 text-xs text-black outline-none focus:border-black font-mono cursor-pointer"
                    >
                      {(
                        BD_LOCATIONS.find((loc) => loc.id === formData.location)?.cities || []
                      ).map((city) => (
                        <option key={city} value={city} className="text-black font-sans">
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Detailed Street / House Address */}
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-neutral-600 uppercase mb-1">
                      DETAILED DELIVERY ADDRESS
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="HOUSE #12, ROAD #4, BLOCK #C / APARTMENT / LANDMARK"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-neutral-50 border border-black/15 px-3 py-2.5 text-xs text-black uppercase outline-none focus:border-black font-mono"
                    />
                  </div>

                  {/* Payment Selection */}
                  <div className="pt-2">
                    <label className="block text-[9px] font-mono tracking-widest text-neutral-600 uppercase mb-1">
                      PAYMENT SELECTION
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-full bg-neutral-50 border border-black/15 px-3 py-2.5 text-xs text-black uppercase outline-none focus:border-black font-mono cursor-pointer"
                    >
                      <option value="CASH ON DELIVERY (COD)">
                        CASH ON DELIVERY (COD) — PAY WHEN PARCEL ARRIVES
                      </option>
                      <option value="BKASH / NAGAD / ONLINE">
                        BKASH / NAGAD / ONLINE PAYMENT
                      </option>
                    </select>
                  </div>

                  {/* Delivery & Return Policy Banner */}
                  <div className="p-3 bg-neutral-100 border border-black/10 text-[10px] font-mono space-y-1 text-neutral-600">
                    <div className="text-black font-semibold">
                      LOGISTICS // {formData.location === 'INSIDE_DHAKA' ? 'INSIDE DHAKA (24–48 HOURS)' : 'OUTSIDE DHAKA (2–3 DAYS)'}
                    </div>
                    <div>RETURN POLICY: OPEN WITH THE DELIVERY MAN</div>
                  </div>
                </form>
              )}

              {/* Order Confirmation Success */}
              {checkoutStep === 'success' && (
                <div className="py-8 flex flex-col gap-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full border border-black flex items-center justify-center text-sm font-mono">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-[0.25em] uppercase text-black mb-2">
                      ORDER CONFIRMED
                    </h3>
                    <p className="text-xs font-mono text-neutral-500">
                      REFERENCE // {orderRef}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed font-light">
                    Your shipment is being processed by the thunder archive facility.
                    Delivery courier will contact you via phone before arrival.
                  </p>

                  <div className="p-4 bg-neutral-50 border border-black/10 text-left text-xs font-mono space-y-1.5 text-neutral-700">
                    <div>
                      <span className="text-neutral-400">DESTINATION:</span> {formData.city} ({formData.location === 'INSIDE_DHAKA' ? 'INSIDE DHAKA' : 'OUTSIDE DHAKA'})
                    </div>
                    <div>
                      <span className="text-neutral-400">ADDRESS:</span> {formData.address}
                    </div>
                    <div>
                      <span className="text-neutral-400">CONTACT:</span> {formData.phone}
                    </div>
                    <div>
                      <span className="text-neutral-400">PAYMENT:</span> {formData.paymentMethod}
                    </div>
                    <div>
                      <span className="text-neutral-400">ESTIMATED DELIVERY:</span>{' '}
                      {formData.location === 'INSIDE_DHAKA' ? '24–48 HOURS' : '2–3 DAYS'}
                    </div>
                    <div className="text-black font-semibold pt-1 border-t border-black/10">
                      RETURN POLICY: OPEN WITH THE DELIVERY MAN
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    onMouseEnter={() => setCursorState({ type: 'button' })}
                    onMouseLeave={() => setCursorState({ type: 'default' })}
                    className="w-full py-4 text-xs font-semibold tracking-[0.25em] uppercase bg-black text-white hover:bg-neutral-800 transition-colors"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            {checkoutStep !== 'success' && (
              <div className="p-6 border-t border-black/10 bg-neutral-50">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-neutral-500">SUBTOTAL</span>
                  <span className="text-black font-semibold">{cart[0]?.product.currency || 'BDT'} {subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono mb-4 text-neutral-500">
                  <span>SHIPPING</span>
                  <span>CALCULATED AT DISPATCH</span>
                </div>

                {checkoutStep === 'cart' ? (
                  <button
                    disabled={cart.length === 0}
                    onClick={() => setCheckoutStep('shipping')}
                    onMouseEnter={() => setCursorState({ type: 'button' })}
                    onMouseLeave={() => setCursorState({ type: 'default' })}
                    className="w-full py-4 text-xs font-semibold tracking-[0.25em] uppercase bg-black text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    CHECKOUT
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isProcessing}
                    onMouseEnter={() => setCursorState({ type: 'button' })}
                    onMouseLeave={() => setCursorState({ type: 'default' })}
                    className="w-full py-4 text-xs font-semibold tracking-[0.25em] uppercase bg-black text-white hover:bg-neutral-800 disabled:opacity-50 transition-colors"
                  >
                    {isProcessing ? 'PROCESSING...' : `PAY ${cart[0]?.product.currency || 'BDT'} ${subtotal}`}
                  </button>
                )}
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
