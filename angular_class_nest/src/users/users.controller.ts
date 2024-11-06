import {
    Controller,
    Post,
    Body,
    Delete,
    Patch,
    Param,
    UseGuards,
    Get,
    NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/AuthGuard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // The create method is not guarded
    @Post('create')
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    // The login method will also not be guarded
    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string) {
        const user = await this.usersService.findByEmail(email);
        // Add your JWT login logic here
    }

    // Apply the JwtAuthGuard to the update method
   // @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }

    // Apply the JwtAuthGuard to the remove method
   // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id);
    }

    @Get() // This will handle GET requests to /users
    async findAll(): Promise<User[]> {
    return this.usersService.findAll();
    }

    @Get(':id')
        async findOne(@Param('id') id: number): Promise<User> {
            const user = await this.usersService.findOne(id);
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        }
}
