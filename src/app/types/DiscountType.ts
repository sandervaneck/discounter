
export type DiscountType ={
        username: 'influencer_eric',
        views: 18200,
        likes: 2400,
        comments: 310,
        reposts: 120,
        discount: '30%',
        items: ['Focaccia Truffle', 'Focaccia Caprese'],
        restaurant: 'Focacceria Milano',
        code: 'DISCOUNT-ER-18200',
      }

      export type DiscountStatus = "open" | "awarded" | "used" | "expired";

export interface DiscountCode {
  id: number;
  code: string;
  discount: number;
  viewsRequired: number;
  items: string[];
  expiryDate: string;
  location: string;
  status: DiscountStatus;
}