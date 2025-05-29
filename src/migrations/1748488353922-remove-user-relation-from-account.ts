import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserRelationFromAccount1748488353922 implements MigrationInterface {
    name = 'RemoveUserRelationFromAccount1748488353922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP FOREIGN KEY \`FK_accounts_user\``);
        await queryRunner.query(`ALTER TABLE \`accounts\` DROP COLUMN \`userId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD \`userId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` ADD CONSTRAINT \`FK_accounts_user\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
