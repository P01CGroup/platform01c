"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import Link from "next/link";
import { Button } from "./button";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence, Transition, Variants } from "framer-motion";
import {
  navigationData,
  NavItemData,
  MegaMenuData,
  MegaMenuColumn,
} from "@/lib/navigation-config";
import { usePathname } from "next/navigation";
import { getNavbarVariant } from "@/lib/navbar-config";
import CalendlyModalWrapper from "./CalendlyModalWrapper";

// Phase 1: Unify the Animation Language
const ANIMATION_TRANSITION: Transition = {
  type: "tween",
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1],
};

// Phase 2: Perfect the Desktop Experience
const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10, transition: ANIMATION_TRANSITION },
  visible: { opacity: 1, y: 0, transition: ANIMATION_TRANSITION },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: ANIMATION_TRANSITION },
};

const mobileNavTransition: Transition = {
  type: "tween",
  duration: 0.4,
  ease: [0.45, 0, 0.55, 1],
};
const mobileNavAnimVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    transition: ANIMATION_TRANSITION,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: ANIMATION_TRANSITION,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: ANIMATION_TRANSITION,
  }),
};

const mobilePanelVariants: Variants = {
  open: {
    clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
    transition: { ...ANIMATION_TRANSITION, duration: 0.4 },
  },
  closed: {
    clipPath: `polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)`,
    transition: { ...ANIMATION_TRANSITION, duration: 0.4 },
  },
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const navbarVariant = getNavbarVariant(pathname);

  useEffect(() => {
    setMounted(true);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setIsScrolled(scrollTop > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isScrolledState = mounted && isScrolled;

  // This function will be passed to the mobile nav to handle link clicks
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300 border-b border-dark/10",
          navbarVariant === "dark"
            ? isScrolledState
              ? "bg-white"
              : "bg-white"
            : isScrolledState
              ? "bg-white"
              : "bg-surface",
          !isScrolledState &&
            !isMenuOpen &&
            (navbarVariant === "dark"
              ? "border-b border-white/15"
              : "border-b border-dark/10")
        )}
      >
        <div className="container relative !md:px-4 !py-4 flex items-center justify-between">
          <Link href="/" onClick={closeMenu}>
            <Logo className="transition-colors duration-300 fill-dark" />
          </Link>
          {/* {!pathname.includes("feasibility-study-ksa") && ( */}
          <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 static">
              {navigationData.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  navbarVariant={navbarVariant}
                  isScrolled={isScrolledState}
                />
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <CalendlyModalWrapper>
                <Button
                  size="icon"
                  variant={navbarVariant === "dark" ? "primary" : "primary"}
                >
                  Talk to an expert{" "}
                  <ChevronRight
                    className="stroke-white"
                    height={16}
                    width={16}
                  />
                </Button>
              </CalendlyModalWrapper>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6 transition-colors text-dark" />
              </button>
            </div>
          </>
          {/* )} */}
        </div>
      </header>

      {/* This is the dedicated, self-contained mobile navigation panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-panel"
            variants={mobilePanelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[10000] bg-surface md:hidden"
          >
            <MobileNavContent closeMenu={closeMenu} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// #region Desktop Navigation Components

const NavItem = ({
  item,
  navbarVariant,
  isScrolled,
}: {
  item: NavItemData | MegaMenuData;
  navbarVariant: "light" | "dark";
  isScrolled: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = !!item.children;
  const navItemRef = React.useRef<HTMLDivElement>(null);

  // Keep dropdown open as long as mouse is over button or dropdown
  useEffect(() => {
    if (!hasChildren) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!navItemRef.current) return;
      if (!navItemRef.current.contains(e.target as Node)) {
        setIsHovered(false);
      }
    };
    if (isHovered) {
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, hasChildren]);

  return (
    <div
      ref={navItemRef}
      className={cn(item.isMegaMenu ? "static" : "relative")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasChildren ? (
        <button
          type="button"
          className={cn(
            "flex items-center gap-1 px-4 py-2 transition-colors duration-300",
            "hover:bg-dark/5",
            "focus:outline-none",
            "cursor-pointer",
            navbarVariant === "dark"
              ? !isScrolled
                ? "text-dark"
                : "text-dark"
              : "text-dark"
          )}
          aria-haspopup="true"
          aria-expanded={isHovered}
        >
          {item.label}
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={ANIMATION_TRANSITION}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </button>
      ) : (
        <Link
          href={item.href}
          className={cn(
            "flex items-center gap-1 px-4 py-2 transition-colors duration-300",
            "hover:bg-dark/5",
            navbarVariant === "dark"
              ? !isScrolled
                ? "text-dark"
                : "text-dark"
              : "text-dark"
          )}
        >
          {item.label}
        </Link>
      )}
      <AnimatePresence>
        {isHovered && item.children && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={cn(
              "absolute top-full origin-top",
              item.isMegaMenu ? "pt-0" : "pt-5",
              item.isMegaMenu ? "left-0 w-full" : "left-0"
            )}
          >
            <div className="bg-white shadow-lg overflow-hidden">
              {item.isMegaMenu ? (
                <MegaMenuContent items={item.children as any} />
              ) : (
                <SimpleDropdownContent
                  items={item.children as any}
                  title={item.label}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SimpleDropdownContent = ({
  items,
  title,
}: {
  items: NavItemData[];
  title: string;
}) => (
  <div className="w-80 p-6 h-full">
    <h5 className="font-canela text-2xl text-dark">{title}</h5>
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          <Link
            href={item.href}
            className="block font-satoshi text-base text-dark/70 hover:text-dark py-1"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const MegaMenuContent = ({ items }: { items: any[] }) => (
  <motion.div layout className="p-8">
    <div className="container grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
      {items.map((column, i) => (
        <div key={i}>
          <h5 className="font-canela text-xl text-dark leading-tight">
            {column.title
              .split(" ")
              .slice(0, Math.ceil(column.title.split(" ").length / 2))
              .join(" ")}
            <br />
            {column.title
              .split(" ")
              .slice(Math.ceil(column.title.split(" ").length / 2))
              .join(" ")}
          </h5>
          <ul>
            {column.links.map((link: any, j: number) => (
              <li key={j}>
                <Link
                  href={link.href}
                  className="block font-satoshi text-base text-dark/70 hover:text-dark py-1 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </motion.div>
);

// #endregion

// #region Mobile Navigation Components

const MobileNavContent = ({ closeMenu }: { closeMenu: () => void }) => {
  const [[level, direction], setLevel] = useState([0, 0]);
  const [navPath, setNavPath] = useState<string[]>(["root"]);

  let currentContent: any[] = navigationData;
  let isMegaMenuContent = false;

  // Traverse data to find content for the current level
  for (let i = 1; i < navPath.length; i++) {
    const levelLabel = navPath[i];
    const foundItem = currentContent.find((item) => item.label === levelLabel);
    if (foundItem && foundItem.children) {
      isMegaMenuContent = !!foundItem.isMegaMenu;
      currentContent = foundItem.children;
    }
  }

  const goTo = (label: string) => {
    setLevel([level + 1, 1]);
    setNavPath([...navPath, label]);
  };

  const goBack = () => {
    setLevel([level - 1, -1]);
    setNavPath(navPath.slice(0, -1));
  };

  return (
    <div className="h-full flex flex-col container">
      {/* --- Mobile Nav Header --- */}
      <div className="flex items-center justify-between py-4 border-b border-dark/10 flex-shrink-0">
        <Link href="/" onClick={closeMenu}>
          <Logo className={"fill-dark"} />
        </Link>
        <button onClick={closeMenu} className="p-2 -mr-2 text-dark">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* --- Animated View Stack --- */}
      <div className="flex-grow relative overflow-hidden">
        <AnimatePresence custom={direction}>
          <motion.div
            key={level}
            custom={direction}
            variants={mobileNavAnimVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute top-0 left-0 w-full h-full overflow-y-auto"
          >
            {/* Header for sub-levels */}
            {navPath.length > 1 && (
              <button
                onClick={goBack}
                className="flex items-center gap-2 p-2 -ml-3 mt-2 text-dark mb-2"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
            )}

            <nav className="flex flex-col">
              {isMegaMenuContent
                ? (currentContent as MegaMenuColumn[]).map((col) => (
                    <div key={col.title} className="py-2">
                      <h5 className="text-dark text-md mb-2">{col.title}</h5>
                      {col.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={closeMenu}
                          className="block py-1 text-dark/80"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))
                : (currentContent as NavItemData[]).map((item) => (
                    <div key={item.label} className="border-b border-dark/15">
                      {item.children ? (
                        <button
                          onClick={() => goTo(item.label)}
                          className="w-full flex justify-between items-center py-3 text-dark text-lg"
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="block py-3 text-dark text-lg"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
            </nav>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// #endregion

export default Navbar;
