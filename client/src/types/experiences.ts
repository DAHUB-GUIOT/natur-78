
export interface ExperienceType {
  id: string;
  title: string;
  description: string;
  location: {
    department: string;
    city: string;
  };
  image: string;
  dates: {
    start: Date;
    end: Date;
  };
  price: number;
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
}
