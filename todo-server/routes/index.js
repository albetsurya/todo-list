const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const todoRoutes = require("./todoRoutes");
const categoryRoutes = require("./categoryRoutes");
const commentRoutes = require("./commentRoutes");
const tagRoutes = require("./tagRoutes");
const todoTagRoutes = require("./todoTagRoutes");
const userRoutes = require("./userRoutes");

router.use("/auth", authRoutes);
router.use("/api", todoRoutes);
router.use("/api", categoryRoutes);
router.use("/api", commentRoutes);
router.use("/api", tagRoutes);
router.use("/api", todoTagRoutes);
router.use("/api", userRoutes);

module.exports = router;
