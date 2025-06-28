/*import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  organizationType: {
    type: String,
    enum: ['SHG', 'Kiosk', 'Independent'],
    required: true
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'organizationTypeRef'
  },
  organizationTypeRef: {
    type: String,
    required: true,
    enum: ['Kiosk', 'User'] // Assuming SHG/Influencer are 'User' type or you can extend
  },
  plan: {
    type: String,
    enum: ['Basic', 'Premium', 'Enterprise'],
    required: true
  },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  paymentStatus: {
    type: String,
    enum: ['Active', 'Expired', 'Pending'],
    default: 'Active'
  }
}, { timestamps: true });

export default mongoose.model('Subscription', subscriptionSchema);*/
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  organizationType: {
    type: String,
    enum: ['Kiosk', 'SHG', 'Independent'],
    required: true
  },
  organizationRef: {   // Can store Kiosk _id, SHG user _id, etc.
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  plan: { type: String, enum: ['Basic', 'Premium'], required: true },
  amountPaid: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  paymentStatus: {
    type: String,
    enum: ['Active', 'Expired', 'Cancelled'],
    default: 'Active'
  },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Subscription', subscriptionSchema);