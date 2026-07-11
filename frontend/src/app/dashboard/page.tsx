"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";

export default function Dashboard() {
  const { user, logout, fetchMe } = useAuth();
  const router = useRouter();
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchMe().then(() => {
      if (!useAuth.getState().user) router.replace("/login");
    });
  }, []);

  async function testAI() {
    setAiLoading(true);
    try {
      // Replace this endpoint with your project's actual AI feature
      const { data } = await api.post("/ai/chat", {
        message: "Say hello in one sentence",
      });
      setAiResponse(data.reply);
    } catch {
      setAiResponse("Error — make sure your backend AI route is set up");
    } finally {
      setAiLoading(false);
    }
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <span className="font-semibold text-gray-900">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <button onClick={logout} className="btn-secondary text-sm">
            Sign out
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-6 py-12 space-y-6">
        <div className="card">
          <h1 className="text-lg font-semibold mb-1">Welcome, {user.name} 👋</h1>
          <p className="text-sm text-gray-500">
            Your starter template is working. Replace this dashboard with your project features.
          </p>
        </div>

        {/* AI test panel */}
        <div className="card">
          <h2 className="font-medium mb-3">AI connection test</h2>
          <button
            onClick={testAI}
            disabled={aiLoading}
            className="btn-primary text-sm"
          >
            {aiLoading ? "Calling AI..." : "Test AI call"}
          </button>
          {aiResponse && (
            <p className="mt-4 text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
              {aiResponse}
            </p>
          )}
        </div>

        {/* Placeholder for your project feature */}
        <div className="card border-dashed border-gray-200">
          <p className="text-sm text-gray-400 text-center py-4">
            Build your project feature here
          </p>
        </div>
      </main>
    </div>
  );
}
