import { Entity, Column,PrimaryColumn } from 'typeorm'
import { BaseClass } from '../BaseClass'
/**
 * @author alaa ibrahim
 * 
 */
@Entity()
export class Form extends BaseClass {

  @PrimaryColumn()
  id: string;
  @Column()
  data: string;
  @Column()
  project: number;
  @Column()
  formName: string;
  @Column()
  type: number;
}