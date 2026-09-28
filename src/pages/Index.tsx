import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { QUESTIONS, TYPES, calculateType, type Letter } from "@/lib/mbti";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Stage = "intro" | "quiz" | "result" | "history";
type Saved = { id: string; mbti_type: string; created_at: string };

const Index = () => {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Letter>>({});

  const [name, setName] = useState(() => localStorage.getItem("mbti_name") ?? "");
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<Saved[] | null>(null);

  const cleanName = name.trim();
  const rememberName = () => localStorage.setItem("mbti_name", cleanName);

  const loadHistory = async () => {
    if (!cleanName) return toast.error("이름을 먼저 적어줘!");
    rememberName();
    const { data, error } = await supabase.rpc("get_mbti_results_by_name", { _name: cleanName });
    if (error) return toast.error("기록을 불러오지 못했어 😢");
    setHistory((data as Saved[]) ?? []);
  };

  useEffect(() => {
    if (stage === "history" && cleanName) loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const saveResult = async (type: string) => {
    if (!cleanName) return toast.error("이름을 먼저 적어줘!");
    const { error } = await supabase.from("mbti_results").insert({ name: cleanName, mbti_type: type });
    if (error) return toast.error("저장에 실패했어 😢");
    rememberName();
    setSaved(true);
    toast.success("결과를 저장했어! 💾");
  };

  const total = QUESTIONS.length;
  const current = QUESTIONS[step];
  const progress = (step / total) * 100;

  const handleAnswer = (value: Letter) => {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      setStage("result");
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setStep(0);
    setSaved(false);
    setStage("intro");
  };

  const resultType = stage === "result" ? TYPES[calculateType(answers)] : null;

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="pt-10 pb-6 px-4 text-center">
        <h1 className="text-3xl font-display text-primary">고딩 MBTI 테스트 ✨</h1>
        <p className="text-xs text-muted-foreground mt-1 font-body">우리반 진짜 내 모습은?</p>
        <div className="flex justify-center gap-3 mt-3 text-xs font-body">
          <button onClick={() => setStage("history")} className="text-primary hover:underline">📚 내 결과 기록</button>
        </div>
      </header>

      <main className="container max-w-md mx-auto px-4">
        {stage === "intro" && (
          <section className="rounded-2xl bg-card border border-border p-8 text-center animate-fade-in shadow-sm">
            <div className="text-6xl mb-4 animate-bounce-soft">🎀</div>
            <h2 className="text-2xl font-display text-primary mb-3">나의 MBTI는?</h2>
            <p className="text-sm text-foreground/80 font-body leading-relaxed mb-6">
              학교생활 속 내 모습으로 알아보는<br />
              찐 성격 테스트! 총 {total}문항, 약 2분 소요
            </p>
            <Button
              size="lg"
              className="w-full rounded-full font-display text-lg h-12"
              onClick={() => setStage("quiz")}
            >
              테스트 시작하기 🚀
            </Button>
          </section>
        )}

        {stage === "quiz" && (
          <section className="animate-fade-in space-y-6" key={current.id}>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground font-body">
                <span>Q{step + 1} / {total}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="rounded-2xl bg-card border border-border p-6 shadow-sm animate-pop">
              <p className="text-xs text-primary font-body mb-3">Question {step + 1}</p>
              <h2 className="text-xl font-display text-foreground leading-snug min-h-[3.5rem]">
                {current.text}
              </h2>
            </div>

            <div className="space-y-3">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.value)}
                  className="w-full text-left rounded-2xl bg-card border-2 border-border hover:border-primary hover:bg-primary/5 p-5 transition-all font-body text-foreground hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="text-primary font-display mr-2">{i === 0 ? "A." : "B."}</span>
                  {opt.label}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="text-xs text-muted-foreground hover:text-primary font-body block mx-auto"
              >
                ← 이전 질문으로
              </button>
            )}
          </section>
        )}

        {stage === "result" && resultType && (
          <section className="animate-fade-in space-y-5">
            <div className="rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/30 p-8 text-center shadow-sm">
              <div className="text-7xl mb-3 animate-bounce-soft">{resultType.emoji}</div>
              <p className="text-sm text-muted-foreground font-body mb-1">너의 MBTI는</p>
              <h2 className="text-5xl font-display font-bold text-primary mb-2 tracking-wider">
                {resultType.type}
              </h2>
              <p className="text-lg font-display text-foreground">
                "{resultType.nickname}"
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border p-6 shadow-sm">
              <h3 className="font-display text-lg text-primary mb-2">📖 내 성격은?</h3>
              <p className="text-sm text-foreground/80 font-body leading-relaxed">
                {resultType.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-mint/30 border border-border p-4 text-center">
                <p className="text-xs text-muted-foreground font-body mb-1">💚 찰떡궁합</p>
                <p className="font-display text-xl text-foreground">{resultType.bestMatch}</p>
              </div>
              <div className="rounded-2xl bg-peach/30 border border-border p-4 text-center">
                <p className="text-xs text-muted-foreground font-body mb-1">💔 환장의 콜라보</p>
                <p className="font-display text-xl text-foreground">{resultType.worstMatch}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="내 이름 (예: 김민지)"
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={saved}
                className="rounded-full h-12"
              />
              <Button
                size="lg"
                className="rounded-full font-display text-lg h-12 shrink-0"
                disabled={saved}
                onClick={() => saveResult(resultType.type)}
              >
                {saved ? "저장 ✅" : "저장 💾"}
              </Button>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full font-display text-lg h-12"
              onClick={handleRestart}
            >
              다시 테스트하기 🔄
            </Button>
          </section>
        )}
        {stage === "history" && (
          <section className="animate-fade-in space-y-4">
            <h2 className="text-2xl font-display text-primary text-center">📚 내 MBTI 기록</h2>
            <div className="flex gap-2">
              <Input placeholder="저장할 때 쓴 이름" maxLength={30} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && loadHistory()} className="rounded-full" />
              <Button className="rounded-full font-display shrink-0" onClick={loadHistory}>찾기 🔍</Button>
            </div>
            {history === null ? null            ) : history.length === 0 ? (
              <p className="text-sm text-muted-foreground font-body text-center py-8">아직 저장한 결과가 없어 🥲</p>
            ) : (
              history.map((r) => {
                const t = TYPES[r.mbti_type];
                return (
                  <div key={r.id} className="rounded-2xl bg-card border border-border p-4 flex items-center gap-4 shadow-sm">
                    <div className="text-4xl">{t?.emoji}</div>
                    <div className="flex-1">
                      <p className="font-display text-2xl text-primary">{r.mbti_type}</p>
                      <p className="text-xs font-body text-foreground/80">{t?.nickname}</p>
                      <p className="text-[11px] text-muted-foreground font-body">
                        {new Date(r.created_at).toLocaleDateString("ko-KR")}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <Button size="lg" variant="outline" className="w-full rounded-full font-display text-lg h-12" onClick={handleRestart}>
              ← 처음으로
            </Button>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
