drop type if exists gender;
create type gender as enum ('male', 'female');

create table if not exists public.user
(
    id               uuid        not null,
    email            text        not null,
    email_is_confirm bool        not null,
    password_hash    text        not null,
    salt             text        not null,
    first_name       text        not null,
    second_name      text        not null,
    day_of_birth     date,
    avatar_url       text,
    gender           gender,
    create_at        timestamptz not null,
    modify_at        timestamptz not null,
    constraint credential_email_uniq unique (email),
    primary key (id, email)
);