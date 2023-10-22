import { Op } from "sequelize";
import Staff from "../models/StaffModel.js";

export const getStaffs = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Staff.findAll({
        attributes: ["uuid", "name", "email", "work_day"],
      });
    } else {
      response = await Staff.findAll({
        attributes: ["uuid", "name", "email", "work_day"],
        where: {
          userId: req.userId,
        },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!staff) return res.status(404).json({ msg: "Staff not found" });
    let response;
    if (req.role === "admin") {
      response = await Staff.findOne({
        attributes: ["uuid", "name", "email", "work_day"],
        where: {
          id: staff.id,
        },
      });
    } else {
      response = await Staff.findOne({
        attributes: ["uuid", "name", "email", "work_day"],
        where: {
          [Op.and]: [{ id: staff.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createStaff = async (req, res) => {
  const { name, email, password, work_day } = req.body;
  try {
    await Staff.create({
      name: name,
      email: email,
      password: password,
      work_day: work_day,
    });
    res.status(201).json({ msg: "Staff Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!staff) return res.status(404).json({ msg: "Staff not found" });
    const { name, email, password, work_day } = req.body;
    if (req.role === "admin") {
      await Staff.update(
        { name, email, password, work_day },
        {
          where: {
            id: staff.id,
          },
        }
      );
    } else {
      if (req.userId !== staff.userId)
        return res.status(403).json({ msg: "Access denied" });
      await Staff.update(
        { name, email, password, work_day },
        {
          where: {
            [Op.and]: [{ id: staff.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Staff updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!staff) return res.status(404).json({ msg: "Staff not found" });
    if (req.role === "admin") {
      await Staff.destroy({
        where: {
          id: staff.id,
        },
      });
    } else {
      if (req.userId !== staff.userId)
        return res.status(403).json({ msg: "Access denied" });
      await Staff.destroy({
        where: {
          [Op.and]: [{ id: staff.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
