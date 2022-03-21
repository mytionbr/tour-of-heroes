export interface HeroDTO {
  name: string;
  about?: string;
  category?: string;
  agency?: string; 
  user: {id: number}

}
