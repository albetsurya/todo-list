const { Tag } = require("../models");

const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const tag = await Tag.create({ name });
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create tag" });
  }
};

const updateTag = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    await tag.update({ name });
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update tag" });
  }
};

const deleteTag = async (req, res) => {
  const id = req.params.id;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    await tag.destroy();
    res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete tag" });
  }
};

module.exports = {
  getTags,
  createTag,
  updateTag,
  deleteTag,
};