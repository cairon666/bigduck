-- +goose Up
-- +goose StatementBegin
create type gender as enum ('male', 'female');

create table if not exists public.users
(
    id         uuid    not null,
    email      text    not null,
    is_confirm boolean not null default false,
    username   text    not null,
    -- credentials
    constraint users_id_uniq unique (id),
    constraint users_email_uniq unique (email),
    constraint users_username_uniq unique (username)
);

create table if not exists public.credentials
(
    id_user       uuid not null,
    password_hash text not null,
    salt          text not null,
    constraint credentials_id_user_fk
        foreign key (id_user) references public.users (id)
            on delete cascade
            on update cascade
);

create table if not exists public.profiles
(
    id_user      uuid        not null,
    first_name   text        not null,
    second_name  text        not null,
    gender       gender,
    day_of_birth date,
    avatar_url   text,
    create_at    timestamptz not null,
    constraint profiles_id_user_fk
        foreign key (id_user) references public.users (id)
            on delete cascade
            on update cascade
);

create table if not exists public.roles
(
    id   integer not null primary key,
    name text    not null
);

insert into public.roles(id, name)
values (1, 'admin'),
       (2, 'user')
on conflict do nothing;

create table if not exists public.user_roles
(
    id_user uuid    not null,
    id_role integer not null,
    constraint user_roles_id_user_fk
        foreign key (id_user) references public.users (id)
            on delete cascade
            on update cascade,
    constraint user_roles_id_role_fk
        foreign key (id_role) references public.roles (id)
            on delete cascade
            on update cascade,
    constraint user_roles_unique unique (id_user, id_role)
);


-- insert admin user
insert into public.users(id, email, is_confirm, username)
values ('eb1d06fe-1ead-11ee-8288-2887ba94adbb', 'admin@example.example', true, 'super_admin');
insert into public.credentials(id_user, password_hash, salt)
values ('eb1d06fe-1ead-11ee-8288-2887ba94adbb', '$2a$10$W2HuE9Dcr8iZqmJXsDyB5.bC3wcw2n7/DZvU3kmCLN.Hb33fQ1Hii',
        'fHU/KAuEBcfLzw==');
insert into public.profiles(id_user, first_name, second_name, create_at)
values ('eb1d06fe-1ead-11ee-8288-2887ba94adbb', 'admin', 'admin', now());
insert into public.user_roles(id_user, id_role)
values ('eb1d06fe-1ead-11ee-8288-2887ba94adbb', 1), -- admin role
       ('eb1d06fe-1ead-11ee-8288-2887ba94adbb', 2);
-- user role

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table public.user_roles;
drop table public.roles;
drop table public.profiles;
drop table public.credentials;
drop table public.users;
drop type gender;
-- +goose StatementEnd
