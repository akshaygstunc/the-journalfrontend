export interface Article {
  id: string;
  title: string;
  subHeadline?: string;
  content: string;
  category: string;
  subCategory?: string;
  tags: string[];
  breaking: boolean;
  status: 
    | "upcoming"
    | "assigned"
    | "desk-review"
    | "digital-edit"
    | "copy-edit"
    | "ready";
  source?: string;
  createdAt: string;
  updatedAt: string;
  images?: string[];
}