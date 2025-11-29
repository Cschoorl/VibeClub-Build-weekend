"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AppShell } from "@/components/layout/app-shell";
import { useAuth } from "@/components/providers/auth-provider";

export default function SettingsPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const supabase = createClient();
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    bio: "",
    website: "",
    twitter_username: "",
    github_username: "",
    linkedin_url: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        username: profile.username || "",
        bio: profile.bio || "",
        website: profile.website || "",
        twitter_username: profile.twitter_username || "",
        github_username: profile.github_username || "",
        linkedin_url: profile.linkedin_url || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setMessage(null);

    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("id", user.id);

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" });
    }

    setIsLoading(false);
  }

  if (!user) return null;

  return (
    <AppShell>
      <section className="py-12">
        <Container size="md">
          <h1 className="text-3xl font-bold text-[#FAFAFA] mb-8">Settings</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Your name"
                  />
                  <Input
                    label="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="username"
                  />
                </div>
                <Textarea
                  label="Bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Twitter"
                    value={formData.twitter_username}
                    onChange={(e) => setFormData({ ...formData, twitter_username: e.target.value })}
                    placeholder="@username"
                  />
                  <Input
                    label="GitHub"
                    value={formData.github_username}
                    onChange={(e) => setFormData({ ...formData, github_username: e.target.value })}
                    placeholder="username"
                  />
                </div>
                <Input
                  label="LinkedIn"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/username"
                />
              </CardContent>
            </Card>

            {message && (
              <p className={`text-sm ${message.type === "success" ? "text-[#22C55E]" : "text-[#E53935]"}`}>
                {message.text}
              </p>
            )}

            <div className="flex justify-end">
              <Button type="submit" isLoading={isLoading}>
                Save Changes
              </Button>
            </div>
          </form>
        </Container>
      </section>
    </AppShell>
  );
}
