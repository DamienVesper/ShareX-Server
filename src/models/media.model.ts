import * as Mongoose from 'mongoose';

enum MediaType {
    PNG,
    JPG,
    JPEG,
    GIF,
    MP4
}

interface MediaDoc extends Mongoose.Document {
    name: string;
    extension: number;
}

const mediaSchema = new Mongoose.Schema({
    name: { type: String, required: true, unique: true },
    extension: { type: Number, required: true }
});

const Media = Mongoose.model<MediaDoc>(`Media`, mediaSchema);

export {
    Media,
    MediaType,
    MediaDoc
};
