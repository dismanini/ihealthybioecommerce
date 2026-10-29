
import { formatPrice, type Product } from "../data/products";

type ProductCardProps = {
  product: Product;
  quantity: number;
  onAddToCart: (product: Product) => void;
  onChangeQuantity: (id: number, amount: number) => void;
  onNotify: (message: string) => void;
};

export default function ProductCard({
  product,
  quantity,
  onAddToCart,
  onChangeQuantity,
  onNotify,
}: ProductCardProps) {
  const discount =
    product.mrp > 0
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <article className="product-card">
      <button
        type="button"
        className="product-image-button"
        aria-label={`View ${product.name}`}
        onClick={() =>
          onNotify(`${product.name} — ${product.description}`)
        }
      >
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.visibility = "hidden";
          }}
        />
      </button>

      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-prices">
          <strong>{formatPrice(product.price)}</strong>
          <span className="mrp">{formatPrice(product.mrp)}</span>
          <span className="discount">{discount}% off</span>
        </div>

        {quantity === 0 ? (
          <button
            type="button"
            className="add-button"
            onClick={() => onAddToCart(product)}
          >
            ADD TO CART
          </button>
        ) : (
          <div className="quantity-control">
            <button
              type="button"
              onClick={() => onChangeQuantity(product.id, -1)}
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={() => onChangeQuantity(product.id, 1)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
