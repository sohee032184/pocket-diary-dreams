CREATE TABLE IF NOT EXISTS public.mbti_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  mbti_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.mbti_results TO anon, authenticated;
GRANT ALL ON public.mbti_results TO service_role;
ALTER TABLE public.mbti_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone insert by name" ON public.mbti_results FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(btrim(name)) BETWEEN 1 AND 30 AND char_length(mbti_type) = 4);
CREATE INDEX IF NOT EXISTS mbti_results_name_idx ON public.mbti_results (name, created_at DESC);

CREATE OR REPLACE FUNCTION public.get_mbti_results_by_name(_name text)
RETURNS TABLE (id uuid, mbti_type text, created_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT r.id, r.mbti_type, r.created_at FROM public.mbti_results r
  WHERE r.name = btrim(_name) ORDER BY r.created_at DESC LIMIT 50
$$;
GRANT EXECUTE ON FUNCTION public.get_mbti_results_by_name(text) TO anon, authenticated;