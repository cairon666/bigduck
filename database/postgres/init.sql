drop type if exists gender;
create type gender as enum ('male', 'female');

create table if not exists public.user
(
    id            uuid primary key     default gen_random_uuid(),
    email         text        not null,
    constraint credential_email_uniq unique (email),
    password_hash text        not null,
    salt          text        not null,
    first_name    text        not null,
    second_name   text        not null,
    day_of_birth  date,
    gender        gender,
    date_create   timestamptz not null default now(),
    date_modify   timestamptz not null default now()
);