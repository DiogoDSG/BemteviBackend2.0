import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private async generateAuthToken(user: UserDocument) {
    const token = sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: '3d',
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
  }

  async create(user: User): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email: user.email });

    if (existingUser)
      throw new ConflictException('User is already registered ');

    const createdUser = await this.userModel.create(user);
    await this.generateAuthToken(createdUser);
    return createdUser;
  }

  async find(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }
}
