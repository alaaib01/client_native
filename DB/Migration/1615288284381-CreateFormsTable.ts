import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFormsTable1615288284381 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'form',
                columns: [
                    {
                        name: 'id',
                        type: 'text',
                        isPrimary: true,
                    },
                    {
                        name: 'data',
                        type: 'text',
                    },
                    {
                        name: 'project',
                        type: 'integer',
                        isNullable: true
                    },
                    {
                        name: 'formName',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'type',
                        type: 'integer',
                        isNullable: true
                    }, {
                        name: 'createDate',
                        type: 'integer',
                        isNullable: true
                    }, {
                        name: 'updateDate',
                        type: 'integer',
                        isNullable: true
                    },
                    {
                        name: 'updatedBy',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'createBy',
                        type: 'text',
                        isNullable: true
                    },
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('form')
    }

}
