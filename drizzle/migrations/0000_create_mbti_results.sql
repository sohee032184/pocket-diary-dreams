CREATE TABLE public.mbti_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  mbti_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.mbti_results TO authenticated;
GRANT ALL ON public.mbti_results TO service_role;
ALTER TABLE public.mbti_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own select" ON public.mbti_results FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own insert" ON public.mbti_results FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own delete" ON public.mbti_results FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX ON public.mbti_results (user_id, created_at DESC);