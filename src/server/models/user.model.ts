import * as Mongoose from 'mongoose';
import { UserDoc } from '../types/models';

const userSchema = new Mongoose.Schema({
});

const User = Mongoose.model<UserDoc>(`Sticker`, userSchema);

export default User;
