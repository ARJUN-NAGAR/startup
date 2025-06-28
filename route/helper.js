// routes/helper.js

export const softDeleteById = async (Model, id) => {
  try {
    const updatedDoc = await Model.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!updatedDoc) {
      throw new Error('Document not found or already deleted.');
    }

    return updatedDoc;
    
  } catch (err) {
    throw new Error(err.message || 'Soft delete failed.');
  }
};
