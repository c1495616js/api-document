import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => Photo,
    photo => photo.user,
  )
  photos: Photo[];
}
