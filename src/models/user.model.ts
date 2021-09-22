import * as Mongoose from 'mongoose';

interface UserDoc extends Mongoose.Document {
    id: string;
    token: string;
}

const userSchema = new Mongoose.Schema({
    id: { type: String, required: true },
    token: { type: String, required: false }
});

const User = Mongoose.model<UserDoc>(`User`, userSchema);

export {
    User,
    UserDoc
};
