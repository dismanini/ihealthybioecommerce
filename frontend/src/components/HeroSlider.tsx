
import { ArrowLeft, ArrowRight, ChevronRight, Heart, ShieldCheck, Sparkles } from "lucide-react";
import type { Banner } from "../data/products";

type HeroSliderProps = {
  banners: Banner[];
  slide: number;
  onSlideChange: (slide: number) => void;
  onChooseCategory: (category: string) => void;
};

export default function HeroSlider({
  banners,
  slide,
  onSlideChange,
  onChooseCategory,
}: HeroSliderProps) {
  const currentBanner = banners[slide];

  if (!currentBanner) return null;

  function changeSlide(direction: "previous" | "next") {
    const next =
      direction === "previous"
        ? (slide === 0 ? banners.length - 1 : slide - 1)
        : (slide + 1) % banners.length;

    onSlideChange(next);
  }

  return (
    <section className={`hero ${currentBanner.background}`}>
      <div className="hero-copy">
        <span className="eyebrow">{currentBanner.eyebrow}</span>

        <h1>
          {currentBanner.title}
          <br />
          <span>{currentBanner.highlight}</span>
        </h1>

        <p>{currentBanner.description}</p>

        <button
          className="primary-button"
          onClick={() => {
            if (currentBanner.isExternalLink && currentBanner.link) {
              window.open(currentBanner.link, "_blank", "noopener,noreferrer");
            } else if (currentBanner.category) {
              onChooseCategory(currentBanner.category);
            }
          }}
        >
          {currentBanner.button} <ChevronRight size={18} />
        </button>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="hero-circle circle-back" />
        <div className="hero-circle circle-front" />

        <div className="hero-symbol">
          <Heart size={92} strokeWidth={1.3} />
          <span>+</span>
        </div>

        <div className="hero-floating floating-one">
          <ShieldCheck size={25} />
          <span>Health first</span>
        </div>

        <div className="hero-floating floating-two">
          <Sparkles size={25} />
          <span>Wellness daily</span>
        </div>
      </div>

      <div className="hero-controls">
        <button
          aria-label="Previous banner"
          onClick={() => changeSlide("previous")}
        >
          <ArrowLeft size={17} />
        </button>

        {banners.map((banner, index) => (
          <button
            key={banner.eyebrow}
            className={`slide-dot ${slide === index ? "active" : ""}`}
            aria-label={`Show banner ${index + 1}`}
            onClick={() => onSlideChange(index)}
          />
        ))}

        <button
          aria-label="Next banner"
          onClick={() => changeSlide("next")}
        >
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}
