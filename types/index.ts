// Based on Backend Specs [cite: 38-86]

export interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  category?: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
  location?: string;
  summary: string;
  description: string;
}

export type GalleryType = 'EVENT' | 'TEAM';

export interface GalleryItem {
  id: number;
  type: GalleryType;
  title: string;
  imageUrl: string;
  shortDescription: string;
  fullDescription: string;
}

export type ResourceType = 'VIDEO' | 'DOCUMENT';

export interface Resource {
  id: number;
  title: string;
  description: string;
  type: ResourceType;
  videoUrl?: string; // YouTube iframe link
  fileUrl?: string; // Public URL
}

export interface BookOfTheMonth {
  id: number;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  active: boolean;
}
