const express = require("express");
const router = express.Router();
const File = require("../models/File");
const User = require("../models/User");
const authUser = require("../middleware/authUser");
require("dotenv").config();

router.get("/", authUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('files').select('-password');;
    res.json(user);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/:fileId", async (req, res) => {
  try {
    const fileId=req.params.fileId;
    console.log(fileId);
    const file = await File.findById({_id: fileId});

    if (!file || !file.file_data) {
      return res.status(404).json({ message: 'File not found' });
    }

    const base64Data = file.file_data;
    const binaryData = Buffer.from(base64Data, 'base64');

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${file.file_name}"`,
    });
    res.send(binaryData);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:fileId', async (req, res) => {
  try {
    const fileId = req.params.fileId;
    await File.findByIdAndDelete(fileId);
    if (!deletedFile) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    await User.updateMany(
      { files: fileId },
      { $pull: { files: fileId } }
    );

    res.status(200).json({ message: 'File deleted successfully', user });

  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;