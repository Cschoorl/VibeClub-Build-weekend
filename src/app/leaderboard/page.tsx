import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { AppShell } from "@/components/layout/app-shell";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Top builders ranked by participation and achievements.",
};

export default async function LeaderboardPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("total_score", { ascending: false })
    .limit(100);

  const topThree = profiles?.slice(0, 3) || [];
  const rest = profiles?.slice(3) || [];

  return (
    <AppShell>
      <section className="py-12">
        <Container>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#FAFAFA] mb-2">Leaderboard</h1>
            <p className="text-[#737373]">Compete with fellow builders and climb the ranks</p>
          </div>

          {/* Podium */}
          {topThree.length > 0 && (
            <div className="relative mb-16">
              <div className="absolute inset-0 bg-gradient-to-b from-[#E53935]/5 via-transparent to-transparent blur-3xl" />
              
              <div className="relative flex items-end justify-center gap-4 pt-20 pb-4">
                {/* 2nd Place */}
                {topThree[1] ? (
                  <Link href={`/profile/${topThree[1].username}`} className="flex flex-col items-center group">
                    <Avatar
                      src={topThree[1].avatar_url}
                      fallback={topThree[1].full_name || topThree[1].username}
                      size="xl"
                      className="mb-4 ring-4 ring-[#C0C0C0]/50 group-hover:ring-[#C0C0C0] transition-all"
                    />
                    <span className="font-semibold text-[#FAFAFA] mb-2">{topThree[1].full_name || topThree[1].username}</span>
                    
                    <div className="w-32 sm:w-40">
                      <div className="h-32 bg-gradient-to-b from-[#3A3A3A] to-[#252525] rounded-t-xl flex flex-col items-center justify-center">
                        <div className="w-8 h-8 bg-[#C0C0C0]/20 rounded-full flex items-center justify-center mb-2">
                          <span className="text-lg">🥈</span>
                        </div>
                        <span className="text-3xl font-bold text-[#C0C0C0]">2</span>
                        <span className="text-xs text-[#737373] font-mono mt-2">{topThree[1].total_score ?? 0} pts</span>
                      </div>
                    </div>
                  </Link>
                ) : <div className="w-32 sm:w-40" />}

                {/* 1st Place */}
                {topThree[0] && (
                  <Link href={`/profile/${topThree[0].username}`} className="flex flex-col items-center group -mt-12">
                    <div className="text-4xl mb-2">🏆</div>
                    <Avatar
                      src={topThree[0].avatar_url}
                      fallback={topThree[0].full_name || topThree[0].username}
                      size="xl"
                      className="mb-4 ring-4 ring-[#FFD700]/50 group-hover:ring-[#FFD700] transition-all w-24 h-24"
                    />
                    <span className="font-bold text-lg text-[#FAFAFA] mb-2">{topThree[0].full_name || topThree[0].username}</span>
                    
                    <div className="w-36 sm:w-48">
                      <div className="h-44 bg-gradient-to-b from-[#4A4A4A] to-[#2A2A2A] rounded-t-xl flex flex-col items-center justify-center">
                        <div className="w-10 h-10 bg-[#FFD700]/20 rounded-full flex items-center justify-center mb-2">
                          <span className="text-xl">🥇</span>
                        </div>
                        <span className="text-4xl font-bold text-[#FFD700]">1</span>
                        <span className="text-sm text-[#E53935] font-mono mt-2 font-semibold">{topThree[0].total_score ?? 0} pts</span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* 3rd Place */}
                {topThree[2] ? (
                  <Link href={`/profile/${topThree[2].username}`} className="flex flex-col items-center group">
                    <Avatar
                      src={topThree[2].avatar_url}
                      fallback={topThree[2].full_name || topThree[2].username}
                      size="lg"
                      className="mb-4 ring-4 ring-[#CD7F32]/50 group-hover:ring-[#CD7F32] transition-all"
                    />
                    <span className="font-semibold text-[#FAFAFA] mb-2">{topThree[2].full_name || topThree[2].username}</span>
                    
                    <div className="w-32 sm:w-40">
                      <div className="h-24 bg-gradient-to-b from-[#3A3A3A] to-[#252525] rounded-t-xl flex flex-col items-center justify-center">
                        <div className="w-7 h-7 bg-[#CD7F32]/20 rounded-full flex items-center justify-center mb-1">
                          <span className="text-base">🥉</span>
                        </div>
                        <span className="text-2xl font-bold text-[#CD7F32]">3</span>
                        <span className="text-xs text-[#737373] font-mono mt-1">{topThree[2].total_score ?? 0} pts</span>
                      </div>
                    </div>
                  </Link>
                ) : <div className="w-32 sm:w-40" />}
              </div>
            </div>
          )}

          {/* Rankings Table */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#FAFAFA]">All Builders</h2>
            <span className="text-sm text-[#737373]">{profiles?.length || 0} total</span>
          </div>

          <Card className="overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 text-sm text-[#737373] font-medium bg-[#111]">
              <div className="col-span-1">#</div>
              <div className="col-span-7">Builder</div>
              <div className="col-span-2 text-right">Events</div>
              <div className="col-span-2 text-right">Points</div>
            </div>

            <div>
              {topThree.map((profile, index) => (
                <Link
                  key={profile.id}
                  href={`/profile/${profile.username}`}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1A1A1A] transition-colors"
                >
                  <div className="col-span-1">
                    <span className="text-lg">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </span>
                  </div>
                  <div className="col-span-7 flex items-center gap-3">
                    <Avatar src={profile.avatar_url} fallback={profile.full_name || profile.username} size="sm" />
                    <div>
                      <span className="font-medium text-[#FAFAFA]">{profile.full_name || profile.username}</span>
                      <span className="text-sm text-[#737373] ml-2">@{profile.username}</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-right text-[#A1A1A1]">{0}</div>
                  <div className="col-span-2 text-right font-mono font-semibold text-[#E53935]">{profile.total_score?.toLocaleString() ?? 0}</div>
                </Link>
              ))}

              {rest.map((profile, index) => (
                <Link
                  key={profile.id}
                  href={`/profile/${profile.username}`}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1A1A1A] transition-colors"
                >
                  <div className="col-span-1">
                    <span className="text-[#737373] font-medium">{index + 4}</span>
                  </div>
                  <div className="col-span-7 flex items-center gap-3">
                    <Avatar src={profile.avatar_url} fallback={profile.full_name || profile.username} size="sm" />
                    <div>
                      <span className="font-medium text-[#FAFAFA]">{profile.full_name || profile.username}</span>
                      <span className="text-sm text-[#737373] ml-2">@{profile.username}</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-right text-[#A1A1A1]">{0}</div>
                  <div className="col-span-2 text-right font-mono text-[#A1A1A1]">{profile.total_score?.toLocaleString() ?? 0}</div>
                </Link>
              ))}
            </div>

            {(!profiles || profiles.length === 0) && (
              <div className="p-16 text-center">
                <div className="text-5xl mb-4">🏆</div>
                <p className="text-[#FAFAFA] font-medium mb-2">No builders yet</p>
                <p className="text-sm text-[#737373]">Join hackathons to climb the leaderboard!</p>
              </div>
            )}
          </Card>
        </Container>
      </section>
    </AppShell>
  );
}
