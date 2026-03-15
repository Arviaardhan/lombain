import Link from "next/link"; // Pindah ke Next Link
import { Trophy } from "lucide-react";
import AppName from "../AppName";

// Mengganti properti 'to' menjadi 'href' agar lebih standar Next.js
const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Post Recruitment", href: "/create" },
  { label: "Dashboard", href: "/dashboard" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function FooterSection() {
  return (
    <footer className="bg-[hsl(var(--footer-bg))] text-[hsl(var(--footer-foreground))] pt-16 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Trophy className="h-4.5 w-4.5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                <AppName span={true} />
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[hsl(var(--footer-muted))] max-w-xs">
              Connecting ambition and collaboration. Build your team, win the
              glory.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--footer-muted))] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[hsl(var(--footer-foreground))] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--footer-muted))] mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[hsl(var(--footer-foreground))] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-[hsl(var(--footer-muted))]">
            © {new Date().getFullYear()} <AppName span={false} />. Built for
            students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
}
