// Navbar configuration for managing variants per page
export const NAVBAR_CONFIG = {
  // Pages that should show dark navbar (for dark backgrounds)
  darkPages: ['/', '/components',] as string[],
  // Pages that should show light navbar (for light backgrounds)
  lightPages: [] as string[]
}

export type NavbarVariant = 'light' | 'dark'

// Helper function to determine navbar variant based on current path
export const getNavbarVariant = (pathname: string): NavbarVariant => {
  if (NAVBAR_CONFIG.darkPages.includes(pathname) || pathname.startsWith('/services')) {
    return 'dark';
  }
  // Default to light for all other pages
  return 'light';
}

// Helper function to add a page to dark navbar configuration
export const addDarkPage = (path: string) => {
  if (!NAVBAR_CONFIG.darkPages.includes(path)) {
    NAVBAR_CONFIG.darkPages.push(path)
  }
}

// Helper function to add a page to light navbar configuration
export const addLightPage = (path: string) => {
  if (!NAVBAR_CONFIG.lightPages.includes(path)) {
    NAVBAR_CONFIG.lightPages.push(path)
  }
}

// Helper function to remove a page from navbar configuration
export const removePage = (path: string) => {
  const darkIndex = NAVBAR_CONFIG.darkPages.indexOf(path)
  const lightIndex = NAVBAR_CONFIG.lightPages.indexOf(path)
  
  if (darkIndex > -1) {
    NAVBAR_CONFIG.darkPages.splice(darkIndex, 1)
  }
  if (lightIndex > -1) {
    NAVBAR_CONFIG.lightPages.splice(lightIndex, 1)
  }
} 