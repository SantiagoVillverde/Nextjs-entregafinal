import mongoose, { Model, Schema } from 'mongoose';
import {ICategory} from "@/interfaces/ICategory";

const categorySchema = new Schema<ICategory>({
    title: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const CategoryModel: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

export default CategoryModel;
