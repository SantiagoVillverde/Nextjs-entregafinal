import mongoose, { Model, Schema } from 'mongoose';
import {IProduct} from '@/interfaces/IProduct';

const productsSchema = new Schema<IProduct>({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
}, { timestamps: true });

productsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productsSchema.set('toJSON', {
    virtuals: true
});

productsSchema.set('toObject', {
    virtuals: true
});

const ProductModel: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productsSchema);

export default ProductModel;
