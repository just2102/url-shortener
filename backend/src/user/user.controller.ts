import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwtAuth.guard';
import { UserAuthContext } from './user.types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: UserAuthContext) {
    const foundUser = await this.userService.findByEmail(req.user.email);
    return foundUser;
  }
}
