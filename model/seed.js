const products = [
    {
        name: 'Comfortable Doll Shoes with Ribbon',
        category: 'shoes',
        price: 12.59,
        description: 'Very comfortable to wear and matches any outfit.',
        image: 'p-shoes-1.png'
    },
    {
        name: 'Leather Male Sport Shoes',
        category: 'shoes',
        price: 15.66,
        description: 'Simple but stylish.',
        image: 'p-shoes-2.png'
    },
    {
        name: 'Height-Raising Sport Shoes',
        category: 'shoes',
        price: 18.199,
        description: 'Increase your height after wearing by 5cm.',
        image: 'p-shoes-3.png'
    },
    {
        name: "Children's shoes",
        category: 'shoes',
        price: 9.299,
        description: 'Hand-sewn shoes for kids.',
        image: 'p-shoes-4.png'
    },
    {
        name: "Magnetic Whiteboard",
        category: 'stationery',
        price: 4.599,
        description: 'Durable whiteboard provided with free erasable ink pen.',
        image: 'p-stationery-1.png'
    },
    {
        name: "Deli Black Pen",
        category: 'stationery',
        price: 0.25,
        description: 'The newest version last 2.5x times longer!',
        image: 'p-stationery-2.png'
    },
    {
        name: "Korean Pen Stand",
        category: 'stationery',
        price: 3.19,
        description: 'A useful item to keep your workspace organized.',
        image: 'p-stationery-3.png'
    },
    {
        name: "Notebook to Learn Counting",
        category: 'stationery',
        price: 2.99,
        description: 'Help children learn counting faster with illustrations.',
        image: 'p-stationery-4.png'
    },
    {
        name: "Bear Phone Case",
        category: 'phone case',
        price: 1.32,
        description: 'Phone case as a friend by your side.',
        image: 'p-phonecase-1.png'
    },
    {
        name: "Transparent Phone Case",
        category: 'phone case',
        price: 0.99,
        description: 'Classic style, but elegant.',
        image: 'p-phonecase-2.png'
    },
    {
        name: "Self-standing Phone Case",
        category: 'phone case',
        price: 1.49,
        description: 'Help you watch videos on your phone more easily.',
        image: 'p-phonecase-3.png'
    },
    {
        name: "Smiling Phone Case",
        category: 'phone case',
        price: 0.3,
        description: 'A phone case to cheer you up.',
        image: 'p-phonecase-4.png'
    },
]

let Product = require('./Product');

// Insert many documents
Product.insertMany(products)
.then(() => console.log('Many products are saved'))
.catch((error) => console.log(error.message));