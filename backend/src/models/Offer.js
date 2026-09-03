const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    storeName:{
        type: String,
        required: true
    },
    discountType:{
        type: String,
        enum: ['percentage', 'custom'],
        required: true
    },
    discountValue:{
        type: Number,
        min: 1,
        max: 100,
        validate:{
            validator: function(value){
                if (this.discountType === 'percentage') {
                    return !!value;
                }
                return !value;
            },
            message: "discountValue is only required for discounts which are a percentage"
        }
    },
    customOffer:{
        type: String,
        validate:{
            validator: function(value){
                if (this.discountType === 'custom') {
                    return !!value;
                }
                return !value;
            },
            message: "customOffer is only required for offers with custom discounts"
        }
    },
    userTier:{
        type: [String],
        enum: ['standard', 'premium', 'corporate'],
        required: true
    },
    offerLimit:{
        limitType:{
            type: String,
            enum: ['limited', 'recurring'],
            required: false
        },
        period:{
            type: String,
            enum: ['daily', 'weekly', 'monthly', 'annually'],
            validate:{
                validator: function(value){
                    if(this.offerLimit.limitType === 'recurring'){
                        return !!value;
                    }
                    return !value;
                },
                message: 'Period is required for recurring offers and should not be set for limited offers.'
            }
        },
        count:{
            type: Number,
            min: [1, 'Offer limit count must be at least 1'],
            validate:{
                validator: function(value){
                    if(!!this.offerLimit.limitType){
                        return !!value;
                    }
                    return !value;
                },
                message: 'Count is required when limitType is set and should not be set when limitType is not set.'
            }
        }
    },
    loyaltyLadder:{
        type: [Number],
        validate:{
            validator: function(value){
                if (value && value.length > 0) {
                    return this.userTier.includes('premium');
                }
                return true;
            },
            message: 'Loyalty ladder can only be set for premium users.'
        }
    },
    daysValid:{
        type: [String],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    redemptionMode:{
        type: String,
        enum: ['in-person', 'online'],
        required: true
    },
    minimumSpent:{
        type: Number,
        required: false
    },
    maxPeople:{
        type: Number,
        required: false
    },
    offerExpiry:{
        type: Date,
        required: false
    },
    offerStatus:{
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;