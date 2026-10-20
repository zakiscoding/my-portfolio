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
  onSignOut?: () => void;
};

function AuthenticatedHeader(props: HeaderProps) {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  return (
    <Header
      {...props}
      isSignedIn={isSignedIn}
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
        <Link
          href="#home"
          aria-label="Home"
          className="site-brand"
          onClick={() => setMenuOpen(false)}
        >
          ZM<span>_</span>
        </Link>
        <nav
          id="portfolio-navigation"
          aria-label="Main navigation"
          className="site-navigation"
          data-open={menuOpen}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href || "#home"}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
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
