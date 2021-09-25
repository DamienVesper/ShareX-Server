import * as Mongoose from 'mongoose';

import randomString from '../utils/randomString';

interface UserDoc extends Mongoose.Document {
    username: string;
    email: string;
    discordID: string;

    token: string;

    suspended: boolean;
    permissions: {
        admin: boolean;
    }
}

const userSchema = new Mongoose.Schema({
    discordID: { type: String, required: true },
    token: { type: String, required: false, unique: true, default: randomString(32) },

    suspended: { type: Boolean, required: false, default: false },
    permissions: {
        admin: { type: Boolean, required: false, default: false }
    }
});

const User = Mongoose.model<UserDoc>(`User`, userSchema);

export {
    User,
    UserDoc
};
