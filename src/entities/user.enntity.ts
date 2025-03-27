import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";



export enum UserRole {
    Admin = 'admin',
    User = 'user',
    SuperAdmin = 'superadmin'
}

@Entity('users')
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    full_name: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: false, default:false })
    is_active: boolean;

    @Column( { type: 'varchar', enum: UserRole, default: UserRole.User })
    role: string;

    comparePassword(password: string): boolean {
        return this.password === password;
    }
}