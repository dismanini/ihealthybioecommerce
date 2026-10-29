
import {
  Heart,
  Pill,
  Sparkles,
} from "lucide-react";

export type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  mrp: number;
  image: string;
  badge?: string;
};

export const products: Product[] = [
  {
    id: 3,
    name: "Daily Wellness Multivitamin",
    category: "Vitamins & Nutrition",
    brand: "Daily Wellness",
    description: "Demo wellness product",
    price: 399,
    mrp: 499,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=500&q=80",
    badge: "Popular",
  },
  {
    id: 4,
    name: "Gentle Face Cleanser",
    category: "Skin Care",
    brand: "Derma Care",
    description: "Gentle daily skincare",
    price: 299,
    mrp: 349,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1VF-TmOJmk2UhFWW4dOwsjgpv40nE04EnvrLUalV2fw&s=10",
    badge: "Bestseller",
  },
  {
    id: 5,
    name: "Hydrating Face Moisturizer",
    category: "Skin Care",
    brand: "Derma Care",
    description: "Daily hydration care",
    price: 349,
    mrp: 449,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrfef7fspS7m8OW31fJHhn3TxV5zDUeOtkvK2gL1siAw&s=10",
  },
  {
    id: 7,
    name: "Daily Sunscreen SPF 50",
    category: "Skin Care",
    brand: "Derma Care",
    description: "Everyday sun protection",
    price: 499,
    mrp: 599,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNGSqcWi4NsKik7k7LwmhdGoyBAzpsI0AjNnIr54X0Yg&s=10",
  },
];

export const indianCities = [
  "New Delhi",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Bhubaneswar",
  "Patna",
  "Chandigarh",
  "Kochi",
  "Indore",
  "Bhopal",
  "Guwahati",
  "Visakhapatnam",
  "Surat",
  "Varanasi",
  "Nagpur",
  "Coimbatore",
  "Vadodara",
  "Ludhiana",
  "Agra",
];

export const categories = [
  { name: "Medicines", icon: Pill, color: "#eaf2ff" },
  {
    name: "Vitamins & Nutrition",
    icon: Heart,
    color: "#fff0e7",
  },
  { name: "Skin Care", icon: Sparkles, color: "#fcefe8" },
];

export type Banner = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  button: string;
  background: string;
  category?: string;
  isExternalLink?: boolean;
  link?: string;
};

export const banners: Banner[] = [
  {
    eyebrow: "AI HEALTH SCANNER",
    title: "Scan your health,",
    highlight: "track your vitals.",
    description:
      "Use our advanced facial scanning technology to instantly check your vital health results and wellbeing metrics.",
    button: "Start Health Scan",
    background: "banner-one",
    link: "https://ihealthy-bio.netlify.app/",
    isExternalLink: true,
  },
  {
    eyebrow: "DISCOVER IHEALTHY",
    title: "Know more about",
    highlight: "our facial scan site.",
    description:
      "Explore how our cutting-edge AI technology measures health vitals quickly, safely, and accurately through your device camera.",
    button: "Learn More",
    background: "banner-two",
    link: "https://ihealthy.vercel.app/",
    isExternalLink: true,
  },
  {
    eyebrow: "WELCOME TO IHEALTHY",
    title: "Your health,",
    highlight: "our priority.",
    description:
      "Discover everyday healthcare essentials, wellness products and trusted skin care solutions across India.",
    button: "Shop Health Essentials",
    background: "banner-three",
    category: "Medicines",
  },
  {
    eyebrow: "CARE FOR YOURSELF",
    title: "Wellness starts",
    highlight: "with you.",
    description:
      "Explore personal care, daily wellness essentials and products for the whole family.",
    button: "Explore Wellness",
    background: "banner-one",
    category: "Skin Care",
  },
];

export const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;
