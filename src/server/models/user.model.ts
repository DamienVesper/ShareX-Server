import * as Mongoose from 'mongoose';

interface userType extends Mongoose.Document {
}

const userSchema = new Mongoose.Schema({
});

const User = Mongoose.model<userType>(`Sticker`, userSchema);

export default User;
