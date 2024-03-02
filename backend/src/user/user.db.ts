import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserPayload, UpdateRefreshTokenPayload } from './user.types';

@Injectable()
export class UserDbService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  public async getUser() {
    return await this.userModel.find();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  public async createUser({ email, name, refreshToken }: CreateUserPayload) {
    return await this.userModel.create({ email, refreshToken, name });
  }

  public async updateRefreshToken({
    email,
    refreshToken,
  }: UpdateRefreshTokenPayload) {
    return await this.userModel.updateOne({ email }, { refreshToken });
  }
}
