import Mongoose from 'mongoose';

interface UserDoc extends Mongoose.Document {
    discordID: string
    email: string

    username: string
    avatar: string

    suspended: boolean
    permissions: {
        admin: boolean
    }

    token: string
    requestToken: string
}

const userSchema = new Mongoose.Schema({
    discordID: { type: String, required: true },
    email: { type: String, required: true },

    username: { type: String, required: true },
    avatar: { type: String, required: true },

    suspended: { type: Boolean, required: false, default: false },
    permissions: {
        admin: { type: Boolean, required: false, default: false }
    },

    token: { type: String, required: false, unique: true }
});

const User = Mongoose.model<UserDoc>(`User`, userSchema);

export {
    User,
    UserDoc
};
