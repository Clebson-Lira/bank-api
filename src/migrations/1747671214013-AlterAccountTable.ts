import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAccountTable1747671214013 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE accounts
            ADD COLUMN userId char(36) NULL,
            ADD CONSTRAINT FK_accounts_user FOREIGN KEY (userId) REFERENCES users(id)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE accounts
            DROP FOREIGN KEY FK_accounts_user,
            DROP COLUMN userId
        `);
    }
}