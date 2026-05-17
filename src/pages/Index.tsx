import { useState } from "react";
import { QUESTIONS, TYPES, calculateType, type Letter } from "@/lib/mbti";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Stage = "intro" | "quiz" | "result";

const Index = () => {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Letter>>({});

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
    setStage("intro");
  };

  const resultType = stage === "result" ? TYPES[calculateType(answers)] : null;

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="pt-10 pb-6 px-4 text-center">
        <h1 className="text-3xl font-display text-primary">고딩 MBTI 테스트 ✨</h1>
        <p className="text-xs text-muted-foreground mt-1 font-body">우리반 진짜 내 모습은?</p>
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
      </main>
    </div>
  );
};

export default Index;
