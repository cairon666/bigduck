--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: gender; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.gender AS ENUM (
    'male',
    'female'
);


ALTER TYPE public.gender OWNER TO admin;

--
-- Name: question_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.question_type AS ENUM (
    'choose_one',
    'choose_many',
    'input'
);


ALTER TYPE public.question_type OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: credentials; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.credentials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    login text NOT NULL,
    password_hash text NOT NULL,
    is_staff boolean DEFAULT false NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    phone text,
    email text NOT NULL
);


ALTER TABLE public.credentials OWNER TO admin;

--
-- Name: quiz_questions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.quiz_questions (
    id integer NOT NULL,
    id_user_owner uuid NOT NULL,
    id_quiz_owner integer NOT NULL,
    title text NOT NULL,
    type public.question_type NOT NULL,
    data jsonb NOT NULL,
    date_modify timestamp with time zone DEFAULT now() NOT NULL,
    is_show boolean DEFAULT true NOT NULL
);


ALTER TABLE public.quiz_questions OWNER TO admin;

--
-- Name: quiz_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.quiz_questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quiz_questions_id_seq OWNER TO admin;

--
-- Name: quiz_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.quiz_questions_id_seq OWNED BY public.quiz_questions.id;


--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.quizzes (
    id integer NOT NULL,
    id_owner uuid NOT NULL,
    name text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    intro_url text NOT NULL,
    date_create timestamp with time zone DEFAULT now(),
    date_modify timestamp with time zone DEFAULT now(),
    ttl text,
    tts timestamp with time zone,
    tte timestamp with time zone,
    is_show boolean DEFAULT true NOT NULL,
    is_strict boolean DEFAULT false NOT NULL,
    is_random boolean DEFAULT false NOT NULL
);


ALTER TABLE public.quizzes OWNER TO admin;

--
-- Name: quizzes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.quizzes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quizzes_id_seq OWNER TO admin;

--
-- Name: quizzes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.quizzes_id_seq OWNED BY public.quizzes.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    username text NOT NULL,
    first_name text NOT NULL,
    second_name text NOT NULL,
    avatar_url text,
    day_of_birth date,
    gender public.gender,
    date_create timestamp with time zone DEFAULT now() NOT NULL,
    date_modify timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO admin;

--
-- Name: quiz_questions id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.quiz_questions ALTER COLUMN id SET DEFAULT nextval('public.quiz_questions_id_seq'::regclass);


--
-- Name: quizzes id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.quizzes ALTER COLUMN id SET DEFAULT nextval('public.quizzes_id_seq'::regclass);


--
-- Data for Name: credentials; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.credentials (id, login, password_hash, is_staff, is_admin, phone, email) FROM stdin;
c8bc0626-7934-4729-b550-3983d8f49a24	test.auth.duplicate	$2a$10$V70wp9gtvUztqT8r1VsUvetQ8aCsnrjr/Uffg3L0y5OcoNolYrOvq	f	f	\N	test.auth.duplicate@email.com
c8bc0626-7934-4729-b550-3983d8f49a25	test.users	$2a$10$V70wp9gtvUztqT8r1VsUvetQ8aCsnrjr/Uffg3L0y5OcoNolYrOvq	f	f	\N	test.users@email.com
fb9d2c7b-108c-483f-878f-db852b5b20c9	test.user.first	$2a$10$LSQi2ARSd7tpAxaq5Vhut.si5DSTvEB0164JNZ5.nvkUdGYh5.GaW	f	f	\N	test@test.test
43cc4667-2726-4e56-9b5d-37f50effd362	test.user.second	$2a$10$Du3LVVsZexmByegxsi.X6uNHO2YkySlHrcA9RQ7DvY7yo.K16G/42	f	f	\N	test#2@test.test
\.


--
-- Data for Name: quiz_questions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.quiz_questions (id, id_user_owner, id_quiz_owner, title, type, data, date_modify, is_show) FROM stdin;
1	fb9d2c7b-108c-483f-878f-db852b5b20c9	1	test_quest	choose_one	{"answer_id": 0, "variables": [{"id": 0, "title": "test_title"}, {"id": 2, "title": "test_title"}, {"id": 3, "title": "test_title"}]}	2023-02-10 01:16:55.562+00	t
2	fb9d2c7b-108c-483f-878f-db852b5b20c9	1	test_quest	choose_one	{"answer_id": 1, "variables": [{"id": 0, "title": "test_title"}, {"id": 2, "title": "test_title"}, {"id": 3, "title": "test_title"}]}	2023-02-10 01:17:00.736+00	t
3	fb9d2c7b-108c-483f-878f-db852b5b20c9	1	test_quest	choose_one	{"answer_id": 2, "variables": [{"id": 0, "title": "test_title"}, {"id": 2, "title": "test_title"}, {"id": 3, "title": "test_title"}]}	2023-02-10 01:17:03.076+00	t
4	fb9d2c7b-108c-483f-878f-db852b5b20c9	1	test_quest	choose_many	{"answer_id": [1, 2], "variables": [{"id": 0, "title": "test_title"}, {"id": 2, "title": "test_title"}, {"id": 3, "title": "test_title"}]}	2023-02-10 01:19:02.954+00	t
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.quizzes (id, id_owner, name, title, description, intro_url, date_create, date_modify, ttl, tts, tte, is_show, is_strict, is_random) FROM stdin;
1	fb9d2c7b-108c-483f-878f-db852b5b20c9	test_quiz1	test_quiz	test_quiz	test_quiz	2023-02-10 01:09:58.071983+00	2023-02-10 01:09:58.071983+00	\N	\N	\N	t	f	f
2	fb9d2c7b-108c-483f-878f-db852b5b20c9	test_quiz2	test_quiz	test_quiz	test_quiz	2023-02-10 01:10:00.820244+00	2023-02-10 01:10:00.820244+00	\N	\N	\N	t	f	f
3	fb9d2c7b-108c-483f-878f-db852b5b20c9	test_quiz3	test_quiz	test_quiz	test_quiz	2023-02-10 01:10:03.452576+00	2023-02-10 01:10:03.452576+00	\N	\N	\N	t	f	f
4	fb9d2c7b-108c-483f-878f-db852b5b20c9	test_quiz4	test_quiz	test_quiz	test_quiz	2023-02-10 01:10:05.583474+00	2023-02-10 01:10:05.583474+00	\N	\N	\N	t	f	f
5	fb9d2c7b-108c-483f-878f-db852b5b20c9	test_quiz5	test_quiz	test_quiz	test_quiz	2023-02-10 01:10:07.844381+00	2023-02-10 01:10:07.844381+00	\N	\N	\N	t	f	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, username, first_name, second_name, avatar_url, day_of_birth, gender, date_create, date_modify) FROM stdin;
c8bc0626-7934-4729-b550-3983d8f49a24	test.auth.duplicate	test.auth.duplicate	test.auth.duplicate	\N	\N	\N	2023-02-10 01:09:07.229867+00	2023-02-10 01:09:07.229867+00
c8bc0626-7934-4729-b550-3983d8f49a25	test.users	test.users	test.users	\N	\N	\N	2023-02-10 01:09:07.232223+00	2023-02-10 01:09:07.232223+00
fb9d2c7b-108c-483f-878f-db852b5b20c9	test.auth1	test_test	test_test	\N	\N	\N	2023-02-10 01:09:35.452+00	2023-02-10 01:09:35.452+00
43cc4667-2726-4e56-9b5d-37f50effd362	test.auth2	test_test	test_test	\N	\N	\N	2023-02-10 01:23:18.936+00	2023-02-10 01:23:18.936+00
\.


--
-- Name: quiz_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.quiz_questions_id_seq', 4, true);


--
-- Name: quizzes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.quizzes_id_seq', 6, true);


--
-- Name: credentials credentials_email_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_email_uniq UNIQUE (email);


--
-- Name: credentials credentials_login_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_login_uniq UNIQUE (login);


--
-- Name: credentials credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (id);


--
-- Name: quiz_questions quiz_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT quiz_questions_pkey PRIMARY KEY (id);


--
-- Name: quizzes quizzes_name_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_name_uniq UNIQUE (name);


--
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_uniq; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_uniq UNIQUE (username);


--
-- Name: quiz_questions quiz_questions_id_quiz_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT quiz_questions_id_quiz_owner_fkey FOREIGN KEY (id_quiz_owner) REFERENCES public.quizzes(id);


--
-- Name: quiz_questions quiz_questions_id_user_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT quiz_questions_id_user_owner_fkey FOREIGN KEY (id_user_owner) REFERENCES public.credentials(id);


--
-- Name: quizzes quizzes_id_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_id_owner_fkey FOREIGN KEY (id_owner) REFERENCES public.credentials(id);


--
-- Name: users users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES public.credentials(id);


--
-- PostgreSQL database dump complete
--

