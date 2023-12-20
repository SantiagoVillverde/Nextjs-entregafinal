import { Types } from 'mongoose';

export interface ICategory {
    _id: Types.ObjectId;
    title: string;
}
