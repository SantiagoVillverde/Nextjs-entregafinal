import mongoose, { Schema, Model } from 'mongoose';
import { IOrder } from '@/interfaces/IOrder';

const orderProductSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const orderSchema = new Schema<IOrder>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    totalPayment: {
        type: Number,
        required: true
    },
    products: [orderProductSchema]
}, { timestamps: true });

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true
});

orderSchema.set('toObject', {
    virtuals: true
});

const OrderModel: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);

export default OrderModel;
