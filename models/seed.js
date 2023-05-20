const products = [
    {
        name: 'Comfortable Doll Shoes with Ribbon',
        category: 'shoes',
        price: 12,
        description: 'Very comfortable to wear and matches any outfit.',
        image: 'p-shoes-1.png'
    },
    {
        name: 'Leather Male Sport Shoes',
        category: 'shoes',
        price: 15,
        description: 'Simple but stylish.',
        image: 'p-shoes-2.png'
    },
    {
        name: 'Height-Raising Sport Shoes',
        category: 'shoes',
        price: 18,
        description: 'Increase your height after wearing by 5cm.',
        image: 'p-shoes-3.png'
    },
    {
        name: "Magnetic Whiteboard",
        category: 'stationery',
        price: 4,
        description: 'Durable whiteboard provided with free erasable ink pen.',
        image: 'p-stationery-1.png'
    },
    {
        name: "Deli Black Pen",
        category: 'stationery',
        price: 1,
        description: 'The newest version last 2.5x times longer!',
        image: 'p-stationery-2.png'
    },
    {
        name: "Korean Pen Stand",
        category: 'stationery',
        price: 3,
        description: 'A useful item to keep your workspace organized.',
        image: 'p-stationery-3.png'
    },
    {
        name: "Bear Phone Case",
        category: 'phone case',
        price: 1,
        description: 'Phone case as a friend by your side.',
        image: 'p-phonecase-1.png'
    },
    {
        name: "Transparent Phone Case",
        category: 'phone case',
        price: 1,
        description: 'Classic style, but elegant.',
        image: 'p-phonecase-2.png'
    },
    {
        name: "Self-standing Phone Case",
        category: 'phone case',
        price: 2,
        description: 'Help you watch videos on your phone more easily.',
        image: 'p-phonecase-3.png'
    }
]

let Product = require('./Product');

// Insert many documents
Product.insertMany(products)
.then(() => console.log('Many products are saved'))
.catch((error) => console.log(error.message));
