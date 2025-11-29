import Link from "next/link";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="py-8 mt-auto">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#737373]">
            <div className="w-6 h-6 bg-[#E53935] rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">L</span>
            </div>
            <span>© 2025 League</span>
          </div>
          
          <nav className="flex items-center gap-6">
            <Link href="/hackathons" className="text-sm text-[#737373] hover:text-[#FAFAFA] transition-colors">
              Hackathons
            </Link>
            <Link href="/leaderboard" className="text-sm text-[#737373] hover:text-[#FAFAFA] transition-colors">
              Leaderboard
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
