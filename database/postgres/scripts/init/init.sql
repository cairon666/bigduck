create table public.credentials
(
    id            uuid primary key default gen_random_uuid(),
    login         text not null unique,
    password_hash text not null
);

create table public.users
(
    id          uuid primary key references public.credentials (id),
    first_name  text        not null,
    second_name text        not null,
    date_create timestamptz not null default now(),
    date_modify timestamptz not null default now(),
    is_staff    boolean     not null,
    is_admin    boolean     not null,
    is_active   boolean     not null,
    email       text        not null unique,
    phone       text,
    avatar_url  text,
    bio         text
);

create table public.quizzes
(
    id          serial primary key,
    title       text not null,
    description text not null,
    preview_url text,
    duration    text,
    time_start  timestamptz,
    time_end    timestamptz
);

create table public.questions
(
    id    serial primary key,
    title text  not null,
    data  jsonb not null
);

create table public.quiz_question
(
    question_id integer references public.questions (id),
    quiz_id     integer references public.quizzes (id)
);

insert into public.credentials(id, login, password_hash)
values ('259041cc-8fa9-4494-9bb8-e038b882850e', 'test_test', 'test_test');
insert into public.users(id, first_name, second_name, date_create, date_modify, is_staff, is_admin, is_active, email)
values ('259041cc-8fa9-4494-9bb8-e038b882850e', 'test_test', 'test_test', default, default, false, false, false,
        'test_test');