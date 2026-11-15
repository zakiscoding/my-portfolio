"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { LogOut, Menu, MessageSquare, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ModeToggle } from "./DarkModeToggle";
import { useSidebar } from "./ui/sidebar";

type NavItem = {
  title?: string | null;
  href?: string | null;
  isExternal?: boolean | null;
};
type HeaderProps = {
  navItems: NavItem[];
  authEnabled?: boolean;
  chatEnabled?: boolean;
  isSignedIn?: boolean;
  analyticsOwnerEmail?: string;
  canViewAnalytics?: boolean;
  onSignOut?: () => void;
};

function AuthenticatedHeader(props: HeaderProps) {
  const { isSignedIn, user } = useUser();
  const canViewAnalytics = Boolean(
    isSignedIn &&
      props.analyticsOwnerEmail &&
      user?.emailAddresses.some(
        (email) =>
          email.emailAddress.toLowerCase() ===
            props.analyticsOwnerEmail?.trim().toLowerCase() &&
          email.verification?.status === "verified",
      ),
  );
  const { signOut } = useClerk();
  return (
    <Header
      {...props}
      isSignedIn={isSignedIn}
      canViewAnalytics={canViewAnalytics}
      onSignOut={() => {
        void signOut();
      }}
    />
  );
}

export function FloatingDockClient(props: HeaderProps) {
  return props.authEnabled ? (
    <AuthenticatedHeader {...props} />
  ) : (
    <Header {...props} />
  );
}

function Header({
  navItems,
  chatEnabled = false,
  isSignedIn = false,
  onSignOut,
  canViewAnalytics = false,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { toggleSidebar } = useSidebar();
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* biome-ignore lint/a11y/useValidAnchor: Native fragment navigation to the real home section preserves smooth scrolling. */}
        <a
          href="#home"
          aria-label="Home"
          className="site-brand"
          onClick={() => setMenuOpen(false)}
        >
          ZM<span>_</span>
        </a>
        <nav
          id="portfolio-navigation"
          aria-label="Main navigation"
          className="site-navigation"
          data-open={menuOpen}
        >
          {[
            ...navItems,
            ...(canViewAnalytics
              ? [{ title: "Analytics", href: "/analytics" }]
              : []),
          ].map((item) => {
            const NavLink = item.href?.startsWith("#") ? "a" : Link;
            return (
              <NavLink
                key={item.href}
                href={item.href || "#home"}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.title}
              </NavLink>
            );
          })}
        </nav>
        <div className="site-header-actions">
          {chatEnabled && (
            <button
              type="button"
              aria-label="Chat with AI Twin"
              className="header-action"
              onClick={toggleSidebar}
            >
              <MessageSquare aria-hidden="true" className="size-4" />
              <span className="sr-only">AI Twin</span>
            </button>
          )}
          {isSignedIn && (
            <button
              type="button"
              aria-label="Sign out"
              className="header-action"
              onClick={onSignOut}
            >
              <LogOut aria-hidden="true" className="size-4" />
            </button>
          )}
          <div className="size-10 shrink-0">
            <ModeToggle />
          </div>
          <button
            ref={menuButton}
            type="button"
            className="header-action site-menu-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="portfolio-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
