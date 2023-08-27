-- +goose Up
-- +goose StatementBegin
create table if not exists public.notify_types
(
    id   serial not null primary key,
    name text   not null
);

create table if not exists public.notifies
(
    id        serial      not null,
    id_user   uuid        not null,
    id_type   integer     not null,
    create_at timestamptz not null,
    is_view   boolean default false,
    data      jsonb,
    constraint notifies_id_fk
        foreign key (id_user) references public.users (id)
            on delete cascade
            on update cascade,
    constraint notifies_id_type_fk
        foreign key (id_type) references public.notify_types (id)
            on delete cascade
            on update cascade
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table public.notifies;
drop table public.notify_types;
-- +goose StatementEnd
