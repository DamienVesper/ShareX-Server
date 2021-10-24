import Mongoose from 'mongoose';

import randomString from '../utils/randomString';

interface MediaDoc extends Mongoose.Document {
    name: string
    extension: string

    owner: string
}

const mediaSchema = new Mongoose.Schema({
    name: { type: String, required: false, unique: true, default: randomString(5) },
    extension: { type: String, required: true },

    owner: { type: String, required: true }
});

const Media = Mongoose.model<MediaDoc>(`Media`, mediaSchema);

export {
    Media,
    MediaDoc
};
