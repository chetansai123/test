import { Schema, model } from "mongoose";

const ValueSchema = new Schema({
    data: {
        type: Object,
        required: true,
    }
},
    { timestamps: true }
);

const Value = new model('Value', ValueSchema);
export default Value;