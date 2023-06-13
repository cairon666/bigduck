drop type if exists gender;
create type gender as enum ('male', 'female');

create table if not exists public.credentials
(
    id               uuid not null,
    email            text not null,
    email_is_confirm bool not null,
    password_hash    text not null,
    salt             text not null,
    constraint credentials_email_uniq unique (email),
    constraint credentials_id_uniq unique (id),
    primary key (id, email)
);

create table if not exists public.users
(
    id           uuid        not null,
    email        text        not null,
    first_name   text        not null,
    second_name  text        not null,
    user_name    text        not null,
    day_of_birth date,
    avatar_url   text,
    gender       gender,
    create_at    timestamptz not null,
    constraint users_user_name_uniq unique (user_name),
    constraint users_email_foreign_key
        foreign key (email) references public.credentials (email)
            on delete cascade
            on update cascade,
    constraint users_id_foreign_key
        foreign key (id) references public.credentials (id)
            on delete cascade
            on update cascade,
    primary key (id, email, user_name)
);