-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.exercises (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  description text,
  category character varying NOT NULL,
  muscle_group character varying,
  inserted_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT exercises_pkey PRIMARY KEY (id)
);
CREATE TABLE public.scheduled_workouts (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id bigint NOT NULL,
  workout_plan_id bigint NOT NULL,
  scheduled_date timestamp with time zone NOT NULL,
  status character varying DEFAULT 'pending'::character varying CHECK (status::text = ANY (ARRAY['pending'::character varying, 'completed'::character varying, 'skipped'::character varying]::text[])),
  duration_minutes integer,
  notes text,
  inserted_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT scheduled_workouts_pkey PRIMARY KEY (id),
  CONSTRAINT scheduled_workouts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT scheduled_workouts_workout_plan_id_fkey FOREIGN KEY (workout_plan_id) REFERENCES public.workout_plans(id)
);
CREATE TABLE public.users (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  email character varying NOT NULL UNIQUE,
  password_hash character varying NOT NULL,
  inserted_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE TABLE public.workout_logs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  scheduled_workout_id bigint NOT NULL,
  exercise_id bigint NOT NULL,
  set_number integer NOT NULL,
  reps_performed integer NOT NULL,
  weight_used numeric,
  rest_time_seconds integer,
  difficulty_rating integer CHECK (difficulty_rating >= 1 AND difficulty_rating <= 10),
  notes text,
  inserted_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT workout_logs_pkey PRIMARY KEY (id),
  CONSTRAINT workout_logs_scheduled_workout_id_fkey FOREIGN KEY (scheduled_workout_id) REFERENCES public.scheduled_workouts(id),
  CONSTRAINT workout_logs_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(id)
);
CREATE TABLE public.workout_plan_exercises (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  workout_plan_id bigint NOT NULL,
  exercise_id bigint NOT NULL,
  sets integer NOT NULL,
  reps integer NOT NULL,
  weight numeric,
  rest_time_seconds integer,
  order_in_workout integer NOT NULL,
  notes text,
  inserted_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT workout_plan_exercises_pkey PRIMARY KEY (id),
  CONSTRAINT workout_plan_exercises_workout_plan_id_fkey FOREIGN KEY (workout_plan_id) REFERENCES public.workout_plans(id),
  CONSTRAINT workout_plan_exercises_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercises(id)
);
CREATE TABLE public.workout_plans (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id bigint NOT NULL,
  name character varying NOT NULL,
  description text,
  inserted_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT workout_plans_pkey PRIMARY KEY (id),
  CONSTRAINT workout_plans_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);