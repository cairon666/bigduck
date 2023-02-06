create type gender as enum('male', 'female');
create type question_type as enum('default');

-- can be updated only one parameter
create table public.credentials
(
    id            uuid primary key default gen_random_uuid(),
    login         text    not null
        constraint credentials_login_uniq unique,
    password_hash text    not null,
    is_staff      boolean not null default false,
    is_admin      boolean not null default false,
    phone         text,
    email         text    not null
        constraint credentials_email_uniq unique
);

create table public.users
(
    id           uuid primary key references public.credentials (id),
    username     text not null
        constraint users_username_uniq unique,
    first_name   text not null,
    second_name  text not null,
    avatar_url   text,
    day_of_birth date,
    gender       gender
);

create table public.quizzes
(
    id          serial primary key,
    id_owner    uuid references public.credentials (id),
    name        text not null
        constraint quizzes_name_uniq unique,
    title       text not null,
    description text not null,
    intro_url   text not null,
    date_create timestamptz default now(),
--  date_modify timestamptz default now(), TODO
    ttl         text, -- https://github.com/icholy/Duration.js
    tts         timestamptz,
    tte         timestamptz
--  is_show  boolean default true TODO
);


create table public.quiz_attachments
(
    id         serial primary key,
    quiz_owner integer references public.quizzes (id),
    url        text not null,
    name       text not null,
    is_show    boolean default true,
    size       text not null
);

create table public.quiz_questions
(
    id         serial primary key,
    id_user_owner integer references public.credentials (id),
    id_quiz_owner integer references public.quizzes (id),
    title      text          not null,
    type       question_type not null,
    data       jsonb         not null
    date_modify timestamptz default now()
);


-- for auth tests
insert into public.credentials(id, login, password_hash, email)
values ('c8bc0626-7934-4729-b550-3983d8f49a24', 'test.auth.duplicate',
        '$2a$10$V70wp9gtvUztqT8r1VsUvetQ8aCsnrjr/Uffg3L0y5OcoNolYrOvq', 'test.auth.duplicate@email.com');
insert into public.users(id, username, first_name, second_name)
values ('c8bc0626-7934-4729-b550-3983d8f49a24', 'test.auth.duplicate', 'test.auth.duplicate', 'test.auth.duplicate');

-- for users tests
insert into public.credentials(id, login, password_hash, email)
values ('c8bc0626-7934-4729-b550-3983d8f49a25', 'test.users',
        '$2a$10$V70wp9gtvUztqT8r1VsUvetQ8aCsnrjr/Uffg3L0y5OcoNolYrOvq', 'test.users@email.com');
insert into public.users(id, username, first_name, second_name)
values ('c8bc0626-7934-4729-b550-3983d8f49a25', 'test.users', 'test.users', 'test.users');