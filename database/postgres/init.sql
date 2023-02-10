drop type if exists gender;
create type gender as enum('male', 'female') ;

drop type if exists question_type;
create type question_type as enum('choose_one','choose_many', 'input');

create table if not exists public.credentials
(
    id            uuid primary key     default gen_random_uuid(),
    login         text        not null
        constraint credentials_login_uniq unique,
    password_hash text        not null,
    is_staff      boolean     not null default false,
    is_admin      boolean     not null default false,
    phone         text,
    email         text        not null
        constraint credentials_email_uniq unique
);

create table if not exists public.users
(
    id           uuid primary key references public.credentials (id),
    username     text not null
        constraint users_username_uniq unique,
    first_name   text not null,
    second_name  text not null,
    avatar_url   text,
    day_of_birth date,
    gender       gender,
    date_create   timestamptz not null default now(),
    date_modify   timestamptz not null default now()
);

create table if not exists public.quizzes
(
    id          serial primary key,
    id_owner    uuid    not null references public.credentials (id),
    name        text    not null,
    title       text    not null,
    description text    not null,
    intro_url   text    not null,
    date_create timestamptz      default now(),
    date_modify timestamptz      default now(),
    ttl         text,
    tts         timestamptz,
    tte         timestamptz,
    is_show     boolean not null default true,
    is_strict   boolean not null default false,
    is_random   boolean not null default false,
    constraint quizzes_name_uniq unique (name, id_owner)
);

create table if not exists public.quiz_questions
(
    id            serial primary key,
    id_user_owner uuid          not null references public.credentials (id),
    id_quiz_owner integer       not null references public.quizzes (id),
    title         text          not null,
    type          question_type not null,
    data          jsonb         not null,
    date_modify   timestamptz   not null default now(),
    is_show       boolean       not null default true
);