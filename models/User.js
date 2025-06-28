import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },

    aadhaarNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: v => /^[0-9]{12}$/.test(v),
            message: 'Invalid Aadhaar number'
        }
    },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true, minlength: 6 },

    role: {
        type: String,
        enum: ['paralegal', 'employee', 'admin','citizen'],
        required: true
    },
    isDeleted: { type: Boolean, default: false }},


  { timestamps: true });

// 🔒 Password Hashing Middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 🔐 Password Comparison Method
userSchema.methods.comparePassword = function(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};
export default mongoose.model('User', userSchema);