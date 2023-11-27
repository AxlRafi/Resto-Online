import Sales from "../models/SalesModel.js";
import User from "../models/UserModel.js";
import Staff from "../models/StaffModel.js";
import { Op } from "sequelize";
export const getSales = async (req, res) => {
  try {
    const { month, year } = req.query;
    const whereClause = {};
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      whereClause.date_sales = {
        [Op.between]: [startDate, endDate],
      };
    }

    const uniqueYears = await Sales.aggregate("date_sales", "DISTINCT", {
      plain: false,
      where: whereClause,
    });

    const years = uniqueYears.map((item) =>
      new Date(item["DISTINCT"]).getFullYear()
    );

    let response;

    if (req.role === "admin") {
      response = await Sales.findAll({
        attributes: [
          "uuid",
          "product_name",
          "qty",
          "price",
          "sum",
          "staff_name",
          "date_sales",
        ],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
        where: whereClause,
      });
    } else {
      response = await Sales.findAll({
        attributes: [
          "uuid",
          "product_name",
          "qty",
          "price",
          "sum",
          "staff_name",
          "date_sales",
        ],
        where: {
          userId: req.userId,
          ...whereClause,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json({ sales: response, years });
  } catch (error) {
    console.error("Error in getSales:", error);
    res.status(500).json({ msg: error.message });
  }
};

export const getSalesById = async (req, res) => {
  try {
    const sales = await Sales.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!sales) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Sales.findOne({
        attributes: [
          "uuid",
          "product_name",
          "qty",
          "price",
          "sum",
          "staff_name",
          "date_sales",
        ],
        where: {
          id: cart.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Sales.findOne({
        attributes: [
          "uuid",
          "product_name",
          "qty",
          "price",
          "sum",
          "staff_name",
          "date_sales",
        ],
        where: {
          [Op.and]: [{ id: sales.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createSales = async (req, res) => {
  const { product_name, qty, price, sum } = req.body;
  const created_at = new Date();
  const options = { weekday: "long" };
  const dayName = created_at.toLocaleString("en-US", options);
  try {
    const staff_at_work = await Staff.findOne({
      where: {
        work_day: dayName,
      },
    });
    if (!staff_at_work) {
      return res.status(400).json({ msg: "No staff is working on this day." });
    }

    const staff_name = staff_at_work.name;

    await Sales.create({
      product_name: product_name,
      qty: qty,
      price: price,
      sum: sum,
      userId: req.userId,
      staff_name: staff_name,
      date_sales: created_at,
    });

    res.status(201).json({ msg: "Sales Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateSales = async (req, res) => {
  try {
    const sales = await Sales.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!sales) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { product_name, qty, price, sum } = req.body;

    if (req.role === "admin" || req.userId === sales.userId) {
      await Sales.update(
        { product_name, qty, price, sum },
        {
          where: {
            uuid: req.params.id,
          },
        }
      );
      res.status(200).json({ msg: "Sales updated successfully" });
    } else {
      res.status(403).json({ msg: "Akses terlarang" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteSales = async (req, res) => {
  try {
    const sales = await Sales.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!sales) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin" || req.userId === sales.userId) {
      await Sales.destroy({
        where: {
          uuid: req.params.id,
        },
      });
      res.status(200).json({ msg: "Sales deleted successfully" });
    } else {
      res.status(403).json({ msg: "Akses terlarang" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
