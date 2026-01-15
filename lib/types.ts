export interface BackgroundImages {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  ultrawide?: string;
}

export interface Award {
  image: string;
  text: string;
  alt?: string;
}

export interface ServiceHeroData {
  subheading: string;
  heading: string;
  backgroundImages: BackgroundImages;
  showContactForm?: boolean;
  className?: string;
  useUKPhoneFormat?: boolean;
  showButton?: boolean;
  whatsappNumber?: string;
  whatsAppButtonMobileView?: boolean;
  awards?: Award[];
  showContactFormMobileView?: boolean;
}
