import * as Mongoose from 'mongoose';

interface BanDoc extends Mongoose.Document {
    IP: string;
    comment?: string;
}

interface UserDoc extends Mongoose.Document {
    password: string;
    token: string;
}

export {
    BanDoc,
    UserDoc
};
