/**
 * قائمة المنتجات والإضافات والعروض الخاصة
 * الأسعار بالجنيه المصري وقابلة للتعديل بسهولة.
 */

export const COMMON_ADDONS = {
  savory: [
    { id: 'extra-cheese', name: 'جبنة إضافية', price: 20 },
    { id: 'extra-sauce', name: 'صوص إضافي', price: 10 },
    { id: 'fries-side', name: 'بطاطس محمرة', price: 35 },
    { id: 'drink-side', name: 'مشروب غازي بارد', price: 25 },
  ],
  pizza: [
    { id: 'extra-mozzarella', name: 'جبنة موتزاريلا إضافية', price: 30 },
    { id: 'stuffed-crust', name: 'أطراف محشية جبنة', price: 40 },
    { id: 'ranch-dip', name: 'صوص رانش إضافي', price: 15 },
    { id: 'drink-side', name: 'مشروب غازي بارد', price: 25 },
  ],
  hawawshi: [
    { id: 'extra-cheese', name: 'جبنة إضافية', price: 20 },
    { id: 'tahini-cup', name: 'سلطة طحينة إضافية', price: 15 },
    { id: 'fries-side', name: 'بطاطس محمرة', price: 35 },
    { id: 'pickles-extra', name: 'مخلل مشكل', price: 10 },
  ],
  sweet: [
    { id: 'vanilla-icecream', name: 'بولة آيس كريم فانيليا', price: 25 },
    { id: 'extra-nutella', name: 'صوص نوتيلا إضافي', price: 20 },
    { id: 'pistachio-crumble', name: 'رشة فستق مفروم', price: 20 },
  ],
  light: [
    { id: 'extra-sauce', name: 'صوص إضافي', price: 10 },
    { id: 'extra-cheese', name: 'جبنة شيدر سايحة', price: 20 },
  ],
};

export const PRODUCTS = [
  // ================= 1. البرجر =================
  {
    id: 'burger-classic',
    name: 'كلاسيك برجر',
    categoryId: 'burgers',
    price: 115,
    description:
      'قطعة لحم بلدي مشوية على الجريل مع خس طازة، طماطم، خيار مخلل وصوص الكلاسيك في عيش بريوش محمص.',
    image: '/src/assets/images/food_burger_classic_1795092401237.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'burger-cheese',
    name: 'تشيز برجر',
    categoryId: 'burgers',
    price: 130,
    description:
      'سماش برجر لحم بلدي مع شريحتين جبنة شيدر أمريكي سايحة، بصل مكرمل وصوص مزاج المميز.',
    image: '/src/assets/images/food_burger_classic_1795092401237.jpg',
    available: true,
    isBestSeller: true,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'burger-double',
    name: 'دبل برجر',
    categoryId: 'burgers',
    price: 165,
    description:
      'قطعتين لحم بلدي مشوي مع دبل جبنة شيدر سايحة، صوص بيج تيستي المدخن وبصل مقرمش.',
    image: '/src/assets/images/food_burger_classic_1795092401237.jpg',
    available: true,
    isBestSeller: true,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'burger-mushroom',
    name: 'مشروم برجر',
    categoryId: 'burgers',
    price: 155,
    description:
      'برجر لحم مشوي غرقان في صوص المشروم الكريمي الطازة مع جبنة إمنتال سايحة.',
    image: '/src/assets/images/food_burger_classic_1795092401237.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'burger-chicken',
    name: 'تشيكن برجر',
    categoryId: 'burgers',
    price: 125,
    description:
      'صدر فراخ كرسبي مقرمش متبل بتتبيلة خاصة مع خس، جبنة شيدر، وصوص هاني ماسترد.',
    image: '/src/assets/images/food_fried_chicken_1795092401516.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },

  // ================= 2. البيتزا =================
  {
    id: 'pizza-margherita',
    name: 'بيتزا مارغريتا',
    categoryId: 'pizza',
    price: 145,
    description:
      'عجينة إيطالية هشة مع صلصة طماطم طازة بالأعشاب، جبنة موتزاريلا طبيعي وريحان.',
    image: '/src/assets/images/food_pizza_supreme_1795092401489.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.pizza,
  },
  {
    id: 'pizza-margherita-extra',
    name: 'بيتزا مارجريتا بالجبنة الإضافية',
    categoryId: 'pizza',
    price: 175,
    description:
      'مارغريتا غرقانة بطبقة مضاعفة من جبنة الموتزاريلا المطاطة مع رشة زعتر إيطالي.',
    image: '/src/assets/images/food_pizza_supreme_1795092401489.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.pizza,
  },
  {
    id: 'pizza-super-supreme',
    name: 'بيتزا سوبر سوبريم',
    categoryId: 'pizza',
    price: 235,
    description:
      'بيبروني بقري، لحم مفروم متبل، فلفل ألوان، زيتون أسود، مشروم طازة، وموتزاريلا سايحة.',
    image: '/src/assets/images/food_pizza_supreme_1795092401489.jpg',
    available: true,
    isBestSeller: true,
    addons: COMMON_ADDONS.pizza,
  },
  {
    id: 'pizza-bbq-chicken',
    name: 'بيتزا فراخ باربكيو',
    categoryId: 'pizza',
    price: 215,
    description:
      'قطع فراخ مشوية بصوص الباربكيو المدخن، بصل أحمر، فلفل ألوان، وموتزاريلا سايحة.',
    image: '/src/assets/images/food_pizza_supreme_1795092401489.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.pizza,
  },
  {
    id: 'pizza-mix-cheese',
    name: 'بيتزا ميكس تشيز',
    categoryId: 'pizza',
    price: 205,
    description:
      'مزيج فاخر من أربع جبن: موتزاريلا، شيدر أحمر، رومي معتق، وكيري كريمي.',
    image: '/src/assets/images/food_pizza_supreme_1795092401489.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.pizza,
  },

  // ================= 3. الشاورما =================
  {
    id: 'shawarma-chicken',
    name: 'شاورما فراخ',
    categoryId: 'shawarma',
    price: 95,
    description:
      'شاورما فراخ متبلة على السيخ ملفوفة في عيش صاج محمص مع تومية كريمي وخيار مخلل.',
    image: '/src/assets/images/food_shawarma_plate_1795092401622.jpg',
    available: true,
    isBestSeller: true,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'shawarma-beef',
    name: 'شاورما لحمة',
    categoryId: 'shawarma',
    price: 115,
    description:
      'شرائح لحم بلدي مشوي بتوابل الشاورما الأصلية مع طحينة، بصل بالسماق وبقدونس.',
    image: '/src/assets/images/food_shawarma_plate_1795092401622.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'shawarma-mix',
    name: 'شاورما ميكس',
    categoryId: 'shawarma',
    price: 120,
    description:
      'ميكس فراخ ولحمة في ساندوتش صاج جامبو مع بطاطس محمرة وتومية وطحينة.',
    image: '/src/assets/images/food_shawarma_plate_1795092401622.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'shawarma-fatta',
    name: 'فتة شاورما',
    categoryId: 'shawarma',
    price: 175,
    description:
      'رز بسمتي أصفر مفلفل مع عيش محمص، شاورما فراخ أو ميكس، وصوص تومية دافي.',
    image: '/src/assets/images/food_shawarma_plate_1795092401622.jpg',
    available: true,
    isBestSeller: true,
    addons: COMMON_ADDONS.savory,
  },

  // ================= 4. الحواوشي =================
  {
    id: 'hawawshi-baladi',
    name: 'حواوشي بلدي',
    categoryId: 'hawawshi',
    price: 85,
    description:
      'عيش بلدي مقرمش محشي لحمة مفرومة متبلة بالبصل والفلفل والبهارات المصرية مع طحينة.',
    image: '/src/assets/images/food_hawawshi_baladi_1795092402172.jpg',
    available: true,
    isBestSeller: true,
    addons: COMMON_ADDONS.hawawshi,
  },
  {
    id: 'hawawshi-alex',
    name: 'حواوشي إسكندراني',
    categoryId: 'hawawshi',
    price: 110,
    description:
      'عجينة طازة مخبوزة في الفرن بحشوة لحمة مفرومة متبلة وحارة على الطريقة الإسكندراني.',
    image: '/src/assets/images/food_hawawshi_baladi_1795092402172.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.hawawshi,
  },
  {
    id: 'hawawshi-cheese',
    name: 'حواوشي جبنة',
    categoryId: 'hawawshi',
    price: 105,
    description:
      'رغيف حواوشي بلدي محشي لحمة مفرومة وميكس موتزاريلا وشيدر سايح.',
    image: '/src/assets/images/food_hawawshi_baladi_1795092402172.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.hawawshi,
  },
  {
    id: 'hawawshi-sujuk',
    name: 'حواوشي سجق',
    categoryId: 'hawawshi',
    price: 115,
    description:
      'عيش محمص بحشوة السجق البلدي المتبل مع فلفل حار وطماطم وجبنة موتزاريلا.',
    image: '/src/assets/images/food_hawawshi_baladi_1795092402172.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.hawawshi,
  },

  // ================= 5. الساندوتشات =================
  {
    id: 'sandwich-kofta',
    name: 'ساندوتش كفتة مشوية',
    categoryId: 'sandwiches',
    price: 95,
    description:
      'أصابع كفتة مشوية على الفحم في عيش فينو فرنسي مع سلطة طحينة وبقدونس وبصل.',
    image: '/src/assets/images/food_sandwiches_grill_1795092402023.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'sandwich-sujuk',
    name: 'ساندوتش سجق إسكندراني',
    categoryId: 'sandwiches',
    price: 90,
    description:
      'سجق بلدي متشوح مع فلفل ألوان وتوم ودبس رمان في عيش طازة.',
    image: '/src/assets/images/food_sandwiches_grill_1795092402023.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'sandwich-pane',
    name: 'ساندوتش فراخ بانيه',
    categoryId: 'sandwiches',
    price: 85,
    description:
      'فيليه فراخ بانيه مقرمش مع خس، طماطم، مايونيز، وخيار مخلل.',
    image: '/src/assets/images/food_fried_chicken_1795092401516.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'sandwich-zinger',
    name: 'ساندوتش زنجر سبايسي',
    categoryId: 'sandwiches',
    price: 110,
    description:
      'فراخ زنجر حارة مقرمشة مع جبنة شيدر، خس، وصوص سبايسي خاص.',
    image: '/src/assets/images/food_fried_chicken_1795092401516.jpg',
    available: true,
    isBestSeller: true,
    addons: COMMON_ADDONS.savory,
  },

  // ================= 6. الوجبات والفرايد تشيكن =================
  {
    id: 'meal-crispy',
    name: 'وجبة فراخ كرسبي',
    categoryId: 'meals',
    price: 195,
    description:
      '٣ قطع فراخ بروستد مقرمشة تقدم مع بطاطس محمرة، كول سلو، عيش، وتومية.',
    image: '/src/assets/images/food_fried_chicken_1795092401516.jpg',
    available: true,
    isBestSeller: true,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'meal-strips',
    name: 'وجبة ستربس',
    categoryId: 'meals',
    price: 185,
    description:
      '٥ قطع تشيكن ستربس ذهبية مع بطاطس، كول سلو، عيش محمص وصوص رانش.',
    image: '/src/assets/images/food_fried_chicken_1795092401516.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'meal-mix',
    name: 'وجبة ميكس مزاج',
    categoryId: 'meals',
    price: 245,
    description:
      'قطعتين فراخ كرسبي + ٣ قطع ستربس + رز ريزو بصوص الباربكيو + بطاطس وكول سلو.',
    image: '/src/assets/images/food_fried_chicken_1795092401516.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'meal-family',
    name: 'وجبة عائلية',
    categoryId: 'meals',
    price: 520,
    description:
      '٩ قطع فراخ كرسبي + ٥ قطع ستربس + بطاطس عائلي + ٢ كول سلو + لتر مشروب غازي.',
    image: '/src/assets/images/food_fried_chicken_1795092401516.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },

  // ================= 7. الكريب =================
  {
    id: 'crepe-crispy',
    name: 'كريب تشيكن كرسبي',
    categoryId: 'crepe',
    price: 125,
    description:
      'كريب محمص بحشوة ستربس مقرمش، موتزاريلا، شيدر سايح، بطاطس وصوص رانش.',
    image: '/src/assets/images/food_crepe_savory_1795092402000.jpg',
    available: true,
    isBestSeller: true,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'crepe-shawarma',
    name: 'كريب شاورما فراخ',
    categoryId: 'crepe',
    price: 120,
    description:
      'شاورما فراخ على السيخ مع موتزاريلا سايحة، مخلل خيار، وتومية.',
    image: '/src/assets/images/food_crepe_savory_1795092402000.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'crepe-super-mix',
    name: 'كريب ميكس لحوم وجبن',
    categoryId: 'crepe',
    price: 145,
    description:
      'زنجر + برجر + سجق مع دبل موتزاريلا، فلفل ألوان وصوص تكساس.',
    image: '/src/assets/images/food_crepe_savory_1795092402000.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.savory,
  },

  // ================= 8. المقبلات =================
  {
    id: 'app-onion-rings',
    name: 'حلقات بصل مقرمشة',
    categoryId: 'appetizers',
    price: 55,
    description:
      '٨ قطع حلقات بصل مقلية بخلطة مقرمشة تقدم مع صوص هاني ماسترد.',
    image: '/src/assets/images/food_appetizers_platter_1795092401197.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.light,
  },
  {
    id: 'app-mozzarella-sticks',
    name: 'موتزاريلا ستيكس',
    categoryId: 'appetizers',
    price: 75,
    description:
      '٥ أصابع جبنة موتزاريلا مقرمشة من برة وسايحة من جوة مع صوص مارينارا.',
    image: '/src/assets/images/food_appetizers_platter_1795092401197.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.light,
  },
  {
    id: 'app-sauces-trio',
    name: 'تشكيلة صوصات متنوعة',
    categoryId: 'appetizers',
    price: 35,
    description:
      '٣ علب صوصات من اختيار المطبخ: شيدر سايح، رانش، وتومية كريمي.',
    image: '/src/assets/images/food_appetizers_platter_1795092401197.jpg',
    available: true,
    isBestSeller: false,
    addons: [],
  },

  // ================= 9. البطاطس =================
  {
    id: 'fries-classic',
    name: 'بطاطس محمرة مقرمشة',
    categoryId: 'fries',
    price: 45,
    description:
      'بطاطس فارم مقلية مقرمشة برشة بهارات مزاج الخاصة مع كاتشب.',
    image: '/src/assets/images/food_loaded_fries_1795092400965.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.light,
  },
  {
    id: 'fries-cheddar',
    name: 'بطاطس بالجبنة الشيدر',
    categoryId: 'fries',
    price: 70,
    description:
      'طبق بطاطس كبير غرقان في صوص الجبنة الشيدر السايح الدافي.',
    image: '/src/assets/images/food_loaded_fries_1795092400965.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.light,
  },
  {
    id: 'fries-texas',
    name: 'بطاطس تكساس بالهالبينو',
    categoryId: 'fries',
    price: 95,
    description:
      'بطاطس محمرة عليها صوص شيدر، قطع بيكون بقري مقرمش، وفلفل هالبينو.',
    image: '/src/assets/images/food_loaded_fries_1795092400965.jpg',
    available: true,
    isBestSeller: true,
    addons: COMMON_ADDONS.light,
  },

  // ================= 10. المشروبات =================
  {
    id: 'drink-mango',
    name: 'عصير مانجو فريش',
    categoryId: 'drinks',
    price: 45,
    description:
      'عصير مانجو طبيعي تقيل ومنعش بدون ألوان صناعية.',
    image: '/src/assets/images/food_drinks_fresh_1795092402600.jpg',
    available: true,
    isBestSeller: false,
    addons: [],
  },
  {
    id: 'drink-lemon-mint',
    name: 'ليمون بالنعناع الفريش',
    categoryId: 'drinks',
    price: 38,
    description:
      'عصير ليمون طازة مخفوق مع أوراق نعناع فريش وتلج مجروش.',
    image: '/src/assets/images/food_drinks_fresh_1795092402600.jpg',
    available: true,
    isBestSeller: false,
    addons: [],
  },
  {
    id: 'drink-soda',
    name: 'مشروب غازي مثلج (كانز)',
    categoryId: 'drinks',
    price: 25,
    description:
      'كولا أو سبرايت بارد جداً ٣٣٠ مل مع الأكل.',
    image: '/src/assets/images/food_drinks_fresh_1795092402600.jpg',
    available: true,
    isBestSeller: false,
    addons: [],
  },

  // ================= 11. الحلويات =================
  {
    id: 'dessert-molten',
    name: 'مولتن شوكليت كيك',
    categoryId: 'desserts',
    price: 95,
    description:
      'كيك شوكولاتة دافي محشي شوكولاتة سايحة يقدم مع بولة آيس كريم فانيليا.',
    image: '/src/assets/images/food_desserts_sweet_1795092401738.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.sweet,
  },
  {
    id: 'dessert-nutella-crepe',
    name: 'كريب نوتيلا بالموز',
    categoryId: 'desserts',
    price: 85,
    description:
      'كريب حلو محشي شوكولاتة نوتيلا أصلية وشرائح موز طازة مع رشة بندق.',
    image: '/src/assets/images/food_desserts_sweet_1795092401738.jpg',
    available: true,
    isBestSeller: false,
    addons: COMMON_ADDONS.sweet,
  },
];

// عروض خاصة تظهر في الصفحة الرئيسية
export const SPECIAL_OFFERS = [
  {
    id: 'offer-lamma-box',
    name: 'بوكس اللمة (برجر + حواوشي + شاورما)',
    categoryId: 'meals',
    price: 340,
    originalPrice: 410,
    description:
      '٢ تشيز برجر + ٢ حواوشي بلدي + ٢ شاورما فراخ صاج + بطاطس تكساس عائلي + ٣ صوصات.',
    image: '/src/assets/images/hero_egyptian_feast_1795092401662.jpg',
    available: true,
    isSpecialOffer: true,
    addons: COMMON_ADDONS.savory,
  },
  {
    id: 'offer-pizza-duo',
    name: 'عرض الدويتو بيتزا وسط + مقبلات',
    categoryId: 'pizza',
    price: 295,
    originalPrice: 365,
    description:
      'بيتزا سوبر سوبريم + موتزاريلا ستيكس + ٢ مشروب غازي بارد.',
    image: '/src/assets/images/food_pizza_supreme_1795092401489.jpg',
    available: true,
    isSpecialOffer: true,
    addons: COMMON_ADDONS.pizza,
  },
  {
    id: 'offer-crispy-saver',
    name: 'كومبو التوفير كرسبي وكريب',
    categoryId: 'crepe',
    price: 255,
    originalPrice: 310,
    description:
      'كريب تشيكن كرسبي + ساندوتش زنجر + بطاطس بالجبنة الشيدر + مشروب بارد.',
    image: '/src/assets/images/food_crepe_savory_1795092402000.jpg',
    available: true,
    isSpecialOffer: true,
    addons: COMMON_ADDONS.savory,
  },
];
