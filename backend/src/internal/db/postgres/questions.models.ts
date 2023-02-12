import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CredentialDB } from './credential.models';
import { Quizzes } from './quizzes.models';

export interface QuestionChooseVariable {
    id: number;
    title: string;
}

export type QuestionType = 'choose_one' | 'choose_many' | 'input';
export type QuestionData = {
    title: string;
    description: string;
} & (
    | {
          // choose_one
          answer_id: number;
          variables: QuestionChooseVariable[];
      }
    | {
          // choose_many
          answer_id: number[];
          variables: QuestionChooseVariable[];
      }
);

@Entity({ name: 'quiz_questions' })
export class Question {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'integer',
    })
    public id: number;

    @Column({
        name: 'id_user_owner',
        type: 'uuid',
    })
    @OneToMany(() => CredentialDB, (credential) => credential.id)
    public id_user_owner: string;

    @Column({
        name: 'id_quiz_owner',
        type: 'integer',
    })
    @OneToMany(() => Quizzes, (quiz) => quiz.id)
    public id_quiz_owner: number;

    @Column({
        name: 'title',
        type: 'text',
    })
    public title: string;

    @Column({
        type: 'enum',
        enum: ['default'],
        default: 'default',
        name: 'type',
    })
    public type: QuestionType;

    @Column({
        type: 'jsonb',
        name: 'data',
    })
    public data: QuestionData;

    @Column({
        type: 'timestamptz',
        name: 'date_modify',
    })
    public date_modify: Date;

    @Column({
        type: 'boolean',
        default: true,
        name: 'is_show',
    })
    public is_show: boolean;

    public constructor(
        id: number,
        id_user_owner: string,
        id_quiz_owner: number,
        title: string,
        type: QuestionType,
        data: QuestionData,
        date_modify: Date,
        is_show: boolean,
    ) {
        this.id = id;
        this.id_user_owner = id_user_owner;
        this.id_quiz_owner = id_quiz_owner;
        this.title = title;
        this.type = type;
        this.data = data;
        this.date_modify = date_modify;
        this.is_show = is_show;
    }
}
