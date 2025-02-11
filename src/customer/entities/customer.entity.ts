import { Column, Entity } from 'typeorm';
import { Base } from '../../common/entities/base.entity';

@Entity()
export class Customer extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
