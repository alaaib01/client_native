import { Entity, Column,PrimaryColumn ,PrimaryGeneratedColumn} from 'typeorm'
import { BaseClass } from '../BaseClass'
/**
 * @author alaa ibrahim
 * 
 */
@Entity('asset_results')
export class AssetResult extends BaseClass {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  data: string;
  @Column()
  taskId: number; 
}