export type MenuCategory = 
  | 'all'
  | 'bakery-breads'
  | 'viennoiserie'
  | 'patisserie-cakes'
  | 'asian-street'
  | 'indian-street'
  | 'tacos-latin'
  | 'burgers-sliders'
  | 'sweet-treats'
  | 'drinks-brews';

export type DietaryTag = 'Vegetarian' | 'Vegan' | 'Halal' | 'Gluten-Friendly' | 'Chef Special' | 'Spicy';

export interface CustomOptionChoice {
  id: string;
  name: string;
  priceDelta: number;
}

export interface CustomOptionGroup {
  name: string;
  required?: boolean;
  choices: CustomOptionChoice[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image: string;
  fallbackGradient?: string;
  tags: DietaryTag[];
  calories?: number;
  prepTime: string;
  isHotFresh?: boolean;
  allergens?: string[];
  spiceLevel?: 0 | 1 | 2 | 3;
  optionGroups?: CustomOptionGroup[];
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedOptions?: { [groupName: string]: CustomOptionChoice };
  specialInstructions?: string;
  unitPrice: number;
}

export interface CustomCakeConfig {
  size: string; // "6-inch (4-6 pax)", "8-inch (10-12 pax)", "10-inch (18-22 pax)", "2-Tier Grand (30+ pax)"
  sizePrice: number;
  sponge: string;
  filling: string;
  frosting: string;
  pipedMessage: string;
  topper: string;
  specialRequests: string;
}

export interface FeastBoxItem {
  id: string;
  streetMains: MenuItem[];
  bakerySides: MenuItem[];
  dips: string[];
  drinks: MenuItem[];
  bundlePrice: number;
  customNotes?: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  orderType: 'pickup' | 'delivery';
  address?: string;
  pickupTime?: string;
  paymentMethod: 'cod' | 'card' | 'instant';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tip: number;
  total: number;
  timestamp: string;
  status: 'confirmed' | 'baking' | 'packing' | 'ready';
}
