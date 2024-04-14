export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  additionalInfo: string;
  quantityInStock: number;
  images: string[];
  brand: string;
  outsideLocationDeliveryFee: number;
  withinLocationDeliveryFee: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
