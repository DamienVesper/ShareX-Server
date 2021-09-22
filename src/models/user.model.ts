import * as Mongoose from 'mongoose';

interface UserDoc extends Mongoose.Document {
    username: string;
    email: string;

    token: string;
}

const userSchema = new Mongoose.Schema({

});

const User = Mongoose.model<UserDoc>(`User`, userSchema);

export {
    User,
    UserDoc
};
