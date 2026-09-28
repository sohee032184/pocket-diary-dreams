import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("가입 확인 메일을 보냈어! 메일함을 확인해줘 💌");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return toast.error("이메일이나 비밀번호를 다시 확인해줘!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-card border border-border p-8 shadow-sm space-y-4 animate-fade-in">
        <div className="text-center">
          <div className="text-5xl mb-2">🔐</div>
          <h1 className="text-2xl font-display text-primary">
            {mode === "login" ? "로그인" : "회원가입"}
          </h1>
          <p className="text-xs text-muted-foreground font-body mt-1">내 MBTI 결과를 저장하고 다시 볼 수 있어!</p>
        </div>
        <Input type="email" required placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full" />
        <Input type="password" required minLength={6} placeholder="비밀번호 (6자 이상)" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-full" />
        <Button type="submit" disabled={busy} className="w-full rounded-full font-display text-lg h-11">
          {mode === "login" ? "로그인하기" : "가입하기"}
        </Button>
        <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-xs text-muted-foreground hover:text-primary font-body block mx-auto">
          {mode === "login" ? "아직 계정이 없어? 회원가입" : "이미 계정이 있어? 로그인"}
        </button>
        <Link to="/" className="text-xs text-muted-foreground hover:text-primary font-body block text-center">← 테스트로 돌아가기</Link>
      </form>
    </div>
  );
};

export default Auth;
