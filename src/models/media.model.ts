import Mongoose from 'mongoose';

interface MediaDoc extends Mongoose.Document {
    name: string
    extension: string

    owner: string
}

const mediaSchema = new Mongoose.Schema({
    name: { type: String, required: false, unique: true },
    extension: { type: String, required: true },

    owner: { type: String, required: true }
});

const Media = Mongoose.model<MediaDoc>(`Media`, mediaSchema);

export {
    Media,
    MediaDoc
};
