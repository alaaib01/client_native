import { Column, Entity } from "typeorm";

@Entity()
export class BaseClass {
    @Column({nullable:true})
    createDate: number

    @Column({ default: Date.now() })
    updateDate: number

    @Column({nullable:true})
    updatedBy: string

    @Column({nullable:true})
    createBy: string

}