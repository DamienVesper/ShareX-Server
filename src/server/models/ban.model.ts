import * as Mongoose from 'mongoose';

interface BanDoc extends Mongoose.Document {
    IP: string;
    comment?: string;
}

const banSchema = new Mongoose.Schema({
    IP: { type: String, required: true },
    comment: { type: String, required: false }
});

const Ban = Mongoose.model<BanDoc>(`Ban`, banSchema);

export {
    Ban,
    BanDoc
};
