import { Entity, Column,PrimaryColumn } from 'typeorm'
import { BaseClass } from '../BaseClass'
/**
 * @author alaa ibrahim
 * 
 */
@Entity()
export class AssetResult extends BaseClass {
  @PrimaryColumn()
  id: string;
  @Column()
  data: string;
  @Column()
  taskId: number; 
}