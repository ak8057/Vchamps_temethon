import React, { useState } from "react";
import {
  Search,
  Filter,
  Tag,
  Package,
  ArrowUpDown,
  ShoppingCart,
} from "lucide-react";

const MarketPlace = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Sample recycled products data
  const [products] = useState([
    {
      id: 1,
      name: "Upcycled Glass Vase",
      price: 29.99,
      category: "home-decor",
      material: "Glass",
      image: "/images/bottle.png",
      sustainabilityScore: 9.2,
      seller: "EcoArt Studios",
      description: "Handcrafted vase made from recycled glass bottles",
    },
    {
      id: 2,
      name: "Recycled Plastic Outdoor Bench",
      price: 199.99,
      category: "furniture",
      material: "Recycled HDPE",
      image: "/images/bench.png",
      sustainabilityScore: 9.8,
      seller: "GreenLiving",
      description: "Durable outdoor bench made from recycled plastic",
    },
    {
      id: 3,
      name: "Paper Craft Notebook",
      price: 12.99,
      category: "stationery",
      material: "Recycled Paper",
      image: "/images/copy.png",
      sustainabilityScore: 8.9,
      seller: "PaperWise",
      description: "100% recycled paper notebook with handmade cover",
    },
    {
      id: 4,
      name: "Metal Art Sculpture",
      price: 149.99,
      category: "art",
      material: "Recycled Metal",
      image: "/images/metalArt.png",
      sustainabilityScore: 9.5,
      seller: "MetalWorks",
      description: "Contemporary sculpture from recycled metal scraps",
    },
    {
      id: 5,
      name: "Bamboo Toothbrush",
      price: 4.99,
      category: "personal-care",
      material: "Bamboo",
      image: "/images/toothbrush.png",
      sustainabilityScore: 9.7,
      seller: "EcoSmile",
      description: "Biodegradable bamboo toothbrush for eco-friendly oral care",
    },
    {
      id: 6,
      name: "Recycled Denim Backpack",
      price: 39.99,
      category: "fashion",
      material: "Recycled Denim",
      image: "/images/backpack.png",
      sustainabilityScore: 9.0,
      seller: "DenimRevive",
      description: "Stylish backpack made from upcycled denim fabric",
    },
    {
      id: 7,
      name: "Solar Lantern",
      price: 24.99,
      category: "home-decor",
      material: "Solar Powered",
      image: "/images/lantern.png",
      sustainabilityScore: 9.6,
      seller: "SolarGlow",
      description:
        "Energy-efficient solar lantern for outdoor and emergency use",
    },
    {
      id: 8,
      name: "Handwoven Rug",
      price: 89.99,
      category: "home-decor",
      material: "Recycled Fabric",
      image: "/images/rug.png",
      sustainabilityScore: 9.3,
      seller: "WeaveCraft",
      description: "Eco-friendly rug made from repurposed textiles",
    },
    {
      id: 9,
      name: "Compostable Phone Case",
      price: 19.99,
      category: "accessories",
      material: "Biodegradable Plastic",
      image: "/images/phonecase.png",
      sustainabilityScore: 9.4,
      seller: "GreenGadget",
      description:
        "100% compostable phone case made from plant-based materials",
    },
  ]);

  const categories = [
    { id: "all", name: "All Items" },
    { id: "home-decor", name: "Home Decor" },
    { id: "furniture", name: "Furniture" },
    { id: "stationery", name: "Stationery" },
    { id: "art", name: "Art" },
  ];

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "all" || product.category === selectedCategory
  );

  return (
    <div className=" w-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Recycled Treasures Marketplace
          </h1>
          <p className="text-gray-600 text-lg">
            Discover unique items crafted from recycled materials
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search recycled items..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="sustainability">Sustainability Score</option>
              </select>
              <ArrowUpDown className="absolute right-2 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                  {product.sustainabilityScore} ★
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {product.material}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    ${product.price}
                  </span>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Sold by {product.seller}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
