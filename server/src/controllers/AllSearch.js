import coffeeModel from "../models/coffeeModel.js";
import dessertModel from "../models/dessertModel.js";
const searchAllItems = async (req, res) => {
  try {
    const { query, priceMin, priceMax } = req.query;

    // Create a regex for case-insensitive search
    const regex = query ? new RegExp(query, "i") : null;

    // Build search conditions
    const searchConditions = {};
    if (regex) {
      searchConditions.$or = [
        { name: { $regex: regex } },
        { desc: { $regex: regex } },
      ];
    }
    if (priceMin !== undefined || priceMax !== undefined) {
      searchConditions.price = {};
      if (priceMin !== undefined) {
        searchConditions.price.$gte = parseFloat(priceMin);
      }
      if (priceMax !== undefined) {
        searchConditions.price.$lte = parseFloat(priceMax);
      }
    }

    // Perform parallel searches for coffee and dessert
    const [coffeeResults, dessertResults] = await Promise.all([
      coffeeModel.find(searchConditions),
      dessertModel.find(searchConditions),
    ]);

    // Combine results
    const combinedResults = {
      coffee: coffeeResults,
      dessert: dessertResults,
    };

    res.json({
      success: true,
      items: combinedResults,
    });
  } catch (error) {
    console.error("Error searching all items:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while searching for items",
    });
  }
};

export { searchAllItems };
