export interface AuthHeaderProps {
  label: string;
}

export interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocial?: boolean;
}

export interface BackButtonProps {
  label: string;
  href: string;
}

export interface RegisterMessageProps {
  message: string | undefined;
}
