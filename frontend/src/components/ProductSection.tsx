
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "../data/products";
import "./ProductSection.css";

type ProductSectionProps = {
  title: string;
  subtitle: string;
  items: Product[];
  id: string;
  cart: Record<number, number>;
  onAddToCart: (product: Product) => void;
  onChangeQuantity: (id: number, amount: number) => void;
  onNotify: (message: string) => void;
};

export default function ProductSection({
  title,
  subtitle,
  items,
  id,
  cart,
  onAddToCart,
  onChangeQuantity,
  onNotify,
}: ProductSectionProps) {
  if (items.length === 0) return null;

  const scrollRow = (direction: "left" | "right") => {
    document.getElementById(`${id}-row`)?.scrollBy({
      left: direction === "left" ? -650 : 650,
      behavior: "smooth",
    });
  };

  return (
    <section className="product-section" id={id}>
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="row-controls">
          <button
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollRow("left")}
          >
            <ArrowLeft size={17} />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollRow("right")}
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      <div className="product-row" id={`${id}-row`}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cart[product.id] || 0}
            onAddToCart={onAddToCart}
            onChangeQuantity={onChangeQuantity}
            onNotify={onNotify}
          />
        ))}
      </div>
    </section>
  );
}
