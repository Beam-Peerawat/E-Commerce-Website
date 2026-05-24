require('dotenv').config(); // บรรทัดนี้จะไปดึงค่าจากไฟล์ .env มาใช้งาน


const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: '../.env' });

const products = [
  // Electronics
  { name: 'Smartphone 5G Pro', category: 'Electronics', price: 999, stock: 50, imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b893514937e?w=500', description: 'Latest flagship smartphone with 5G capabilities.' },
  { name: 'Ultrabook Laptop', category: 'Electronics', price: 1200, stock: 20, imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', description: 'Powerful and lightweight laptop for professionals.' },
  { name: 'Wireless Headphones', category: 'Electronics', price: 299, stock: 80, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', description: 'Noise-cancelling wireless headphones.' },
  
  // Fashion
  { name: 'Leather Jacket', category: 'Fashion', price: 250, stock: 35, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', description: 'Premium genuine leather jacket for a classic look.' },
  { name: 'Casual Sneakers', category: 'Fashion', price: 120, stock: 100, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', description: 'Comfortable sneakers for everyday wear.' },
  { name: 'Designer Handbag', category: 'Fashion', price: 450, stock: 10, imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500', description: 'Elegant handbag made from high-quality materials.' },
  
  // Home & Living
  { name: 'Coffee Maker', category: 'Home & Living', price: 89, stock: 40, imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500', description: 'Drip coffee maker for perfect morning brew.' },
  { name: 'Ceramic Vase', category: 'Home & Living', price: 35, stock: 60, imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500', description: 'Modern minimalist ceramic vase.' },
  { name: 'Bed Sheet Set', category: 'Home & Living', price: 55, stock: 150, imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500', description: 'Soft and breathable cotton bed sheet set.' },
  
  // Beauty
  { name: 'Skincare Set', category: 'Beauty', price: 120, stock: 70, imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500', description: 'Complete skincare routine for radiant skin.' },
  { name: 'Perfume', category: 'Beauty', price: 85, stock: 45, imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500', description: 'Luxurious long-lasting floral fragrance.' },
  
  // Sports & Hobbies
  { name: 'Yoga Mat', category: 'Sports', price: 25, stock: 200, imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500', description: 'Non-slip yoga mat for all exercise levels.' },
  { name: 'Dumbbell Set', category: 'Sports', price: 150, stock: 30, imageUrl: 'https://images.unsplash.com/photo-1598971639058-fabc3310b0e1?w=500', description: 'Adjustable dumbbell set for home workouts.' },
  { name: 'Board Game', category: 'Hobbies', price: 40, stock: 90, imageUrl: 'https://images.unsplash.com/photo-1632501641765-e568d28a0091?w=500', description: 'Fun strategy board game for families.' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
    
    await Product.deleteMany({});
    await Product.insertMany(products);
    
    console.log('Database seeded successfully with new items!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();