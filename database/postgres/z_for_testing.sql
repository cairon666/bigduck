insert into public.user(id,
                        email,
                        email_is_confirm,
                        password_hash,
                        salt,
                        first_name,
                        second_name,
                        create_at,
                        modify_at)
VALUES ('a4158df8-d36a-11ed-8cdc-2887ba94adbb',
        'te121233stasd#2@test.test',
        false,
        '$2a$10$F7CcTh2osXn/6IZAvDQcg.zZMtuLh6YR/iAMD/9Pf.ceaZIxDnZru',
        '/Hl2CGYQCZexNw==',
        'first',
        'second',
        now(),
        now());