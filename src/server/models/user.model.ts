import * as Mongoose from 'mongoose';
import { UserDoc } from '../typings/models';


const userSchema = new Mongoose.Schema({
});

const User = Mongoose.model<UserDoc>(`Sticker`, userSchema);

export default User;
