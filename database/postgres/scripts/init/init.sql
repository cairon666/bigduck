-- can be updated only one parameter
create table public.credentials
(
    id            uuid primary key default gen_random_uuid(),
    login         text    not null unique,
    password_hash text    not null,
    is_staff      boolean not null default false,
    is_admin      boolean not null default false,
    phone         text,
    email         text    not null unique
);

create table public.users
(
    id           uuid primary key references public.credentials (id),
    username     text not null unique,
    first_name   text not null,
    second_name  text not null,
    avatar_url   text,
    day_of_birth date,
    gender       text
);

insert into public.credentials(id, login, password_hash, email)
values ('c8bc0626-7934-4729-b550-3983d8f49a24', 'test.auth.duplicate', '$2a$10$V70wp9gtvUztqT8r1VsUvetQ8aCsnrjr/Uffg3L0y5OcoNolYrOvq', 'test.auth.duplicate@email.com');
insert into public.users(id, username, first_name, second_name)
values ('c8bc0626-7934-4729-b550-3983d8f49a24', 'test.auth.duplicate', 'test.auth.duplicate', 'test.auth.duplicate');