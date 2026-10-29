
import {
  CheckCircle2,
  ChevronRight,
  ShoppingCart,
  X,
} from "lucide-react";
import type { Product } from "../data/products";
import { formatPrice } from "../data/products";

export type CheckoutFormData = {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: string;
};

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  cart: Record<number, number>;
  cartCount: number;
  cartSubtotal: number;
  checkoutStep: "cart" | "form" | "success";
  setCheckoutStep: (step: "cart" | "form" | "success") => void;
  formData: CheckoutFormData;
  setFormData: (data: CheckoutFormData) => void;
  onChangeQuantity: (id: number, amount: number) => void;
  onPlaceOrder: () => void;
};

export default function CartDrawer({
  isOpen,
  onClose,
  products,
  cart,
  cartCount,
  cartSubtotal,
  checkoutStep,
  setCheckoutStep,
  formData,
  setFormData,
  onChangeQuantity,
  onPlaceOrder,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const updateFormField = (
    field: keyof CheckoutFormData,
    value: string,
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h3>
            {checkoutStep === "cart" &&
              `Your Shopping Cart (${cartCount})`}
            {checkoutStep === "form" && "Checkout & Delivery"}
            {checkoutStep === "success" && "Order Successful!"}
          </h3>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {checkoutStep === "cart" && (
            <>
              {cartCount === 0 ? (
                <div className="empty-cart-state">
                  <ShoppingCart size={48} />
                  <h4>Your cart is empty</h4>
                  <p>Add some health essentials to get started.</p>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={onClose}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {products
                    .filter((product) => (cart[product.id] || 0) > 0)
                    .map((product) => (
                      <div
                        key={product.id}
                        className="cart-item-row"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                        />

                        <div className="cart-item-details">
                          <h4>{product.name}</h4>
                          <span className="cart-item-price">
                            {formatPrice(product.price)}
                          </span>
                        </div>

                        <div className="quantity-control">
                          <button
                            type="button"
                            aria-label={`Decrease ${product.name} quantity`}
                            onClick={() =>
                              onChangeQuantity(product.id, -1)
                            }
                          >
                            −
                          </button>

                          <span>{cart[product.id] || 0}</span>

                          <button
                            type="button"
                            aria-label={`Increase ${product.name} quantity`}
                            onClick={() =>
                              onChangeQuantity(product.id, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === "form" && (
            <form
              className="checkout-form"
              onSubmit={(event) => {
                event.preventDefault();
                onPlaceOrder();
              }}
            >
              <div className="form-group">
                <label htmlFor="checkout-name">Full Name</label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(event) =>
                    updateFormField("name", event.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkout-phone">Phone Number</label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(event) =>
                    updateFormField("phone", event.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkout-address">
                  Delivery Address
                </label>
                <textarea
                  id="checkout-address"
                  required
                  rows={2}
                  placeholder="House/Flat no., Street name"
                  value={formData.address}
                  onChange={(event) =>
                    updateFormField("address", event.target.value)
                  }
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkout-city">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={(event) =>
                      updateFormField("city", event.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="checkout-pincode">Pincode</label>
                  <input
                    id="checkout-pincode"
                    type="text"
                    required
                    placeholder="751001"
                    value={formData.pincode}
                    onChange={(event) =>
                      updateFormField("pincode", event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="checkout-payment">
                  Payment Method
                </label>
                <select
                  id="checkout-payment"
                  value={formData.paymentMethod}
                  onChange={(event) =>
                    updateFormField("paymentMethod", event.target.value)
                  }
                >
                  <option value="cod">Cash on Delivery (COD)</option>
                  <option value="upi">UPI / Google Pay / PhonePe</option>
                  <option value="card">Credit / Debit Card</option>
                </select>
              </div>

              <button
                type="submit"
                className="primary-button checkout-submit-btn"
                disabled={cartCount === 0}
              >
                Place Order ({formatPrice(cartSubtotal)})
              </button>
            </form>
          )}

          {checkoutStep === "success" && (
            <div className="order-success-state">
              <CheckCircle2 size={64} color="#3eb544" />
              <h3>Order Placed Successfully!</h3>
              <p>
                Thank you for shopping with iHealthy. Your health
                essentials are on the way to{" "}
                <strong>{formData.city}</strong>.
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {checkoutStep === "cart" && cartCount > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-total-row">
              <span>Subtotal:</span>
              <strong>{formatPrice(cartSubtotal)}</strong>
            </div>

            <button
              type="button"
              className="primary-button checkout-btn"
              onClick={() => setCheckoutStep("form")}
            >
              Proceed to Checkout <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
