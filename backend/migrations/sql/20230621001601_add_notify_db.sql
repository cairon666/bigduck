-- +goose Up
-- +goose StatementBegin
create table if not exists public.notifies
(
    id          uuid        not null,
    id_user     uuid        not null,
    type        text        not null,
    time_create timestamptz not null,
    data        jsonb       not null,
    constraint notifies_id_user_reference
        foreign key (id_user) references public.users (id)
            on delete cascade
            on update cascade,
    constraint notifies_id_uniq unique (id),
    primary key (id, id_user)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
-- +goose StatementEnd
