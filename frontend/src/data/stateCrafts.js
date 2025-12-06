const stateCrafts = [
  {
    state: 'Andhra Pradesh',
    demoArtist: 'Srikanth Varma',
    crafts: [
      { name: 'Kalamkari', description: 'Hand-painted or block-printed cotton art using natural dyes.' },
      { name: 'Etikoppaka Toys', description: 'Lacquered wooden toys made in the village of Etikoppaka.' },
      { name: 'Bidriware', description: 'Intricate silver inlay work on metal.' },
      { name: 'Kondapalli Toys', description: 'Lightweight wooden toys carved from soft wood.' },
      { name: 'Mangalagiri Sarees', description: 'Cotton sarees with Nizam border weaving.' },
      { name: 'Bobbili Veena', description: 'Handmade musical instrument crafted from jackfruit wood.' },
      { name: 'Nimmalakunta Leather Puppetry', description: 'Bright leather shadow puppets.' },
      { name: 'Machilipatnam Block Printing', description: 'Traditional block-printed textiles.' },
      { name: 'Udayagiri Cutlery', description: 'Hand-crafted kitchen tools made of local wood & metal.' },
      { name: 'Dharmavaram Silk Sarees', description: 'Grand bridal sarees with rich patterns.' }
    ]
  },
  {
    state: 'Arunachal Pradesh',
    demoArtist: 'Tashi Ngomba',
    crafts: [
      { name: 'Thangka Painting', description: 'Buddhist spiritual scroll paintings.' },
      { name: 'Bamboo Weaving', description: 'Utility baskets, mats and artifacts made of bamboo.' },
      { name: 'Monpa Masks', description: 'Hand-carved masks used in local dances.' },
      { name: 'Carpet Weaving', description: 'Woollen carpets with Tibetan motifs.' },
      { name: 'Apatani Textiles', description: 'Geometric woven fabrics.' },
      { name: 'Cane Handicrafts', description: 'Decorative and utility cane crafts.' },
      { name: 'Yak Hair Products', description: 'Ropes, bags and garments from yak hair.' },
      { name: 'Tribal Jewelry', description: 'Beaded, shell-based tribal ornaments.' },
      { name: 'Wood Carving', description: 'Spiritual wooden sculptures.' },
      { name: 'Handloom Shawls', description: 'Colourful tribal shawls.' }
    ]
  },
  {
    state: 'Assam',
    demoArtist: 'Ritu Moni Deka',
    crafts: [
      { name: 'Assam Silk (Muga/Eri/Pat)', description: 'Indigenous silk varieties unique to Assam.' },
      { name: 'Jaapi Making', description: 'Traditional conical bamboo hat.' },
      { name: 'Bamboo & Cane Crafts', description: 'Household and decorative items.' },
      { name: 'Bell Metal Craft', description: 'Utensils and ritual items.' },
      { name: 'Terracotta of Goalpara', description: 'Clay sculptures & pots.' },
      { name: 'Assamese Jewelry', description: 'Thick golden traditional jewellery.' },
      { name: 'Sualkuchi Weaving', description: 'World-famous silk weaving town.' },
      { name: 'Gamusa Weaving', description: 'Hand-woven red & white cloth.' },
      { name: 'Bihu Dhol Craft', description: 'Traditional drum making.' },
      { name: 'Traditional Masks of Majuli', description: 'Vaishnavite festival masks.' }
    ]
  },
  {
    state: 'Bihar',
    demoArtist: 'Kavya Singh',
    crafts: [
      { name: 'Madhubani Painting', description: 'Geometric folk art using natural colours.' },
      { name: 'Sikki Grass Craft', description: 'Fine products made of golden grass.' },
      { name: 'Sujani Embroidery', description: 'Quilted embroidery work.' },
      { name: 'Manjusha Art', description: 'Mythological line-art painting.' },
      { name: 'Tikuli Art', description: 'Miniature paintings on hardboard.' },
      { name: 'Lac Bangles', description: 'Vibrant lacquer jewellery.' },
      { name: 'Patna Kalam', description: 'Mughal-influenced paintings.' },
      { name: 'Handloom Weaving', description: 'Cotton & tussar textile craft.' },
      { name: 'Stone Craft of Gaya', description: 'Sculptures & idols.' },
      { name: 'Brass Ware', description: 'Ritual & domestic brass items.' }
    ]
  },
  {
    state: 'Chhattisgarh',
    demoArtist: 'Devraj Poyam',
    crafts: [
      { name: 'Bell Metal Dhokra', description: 'Lost-wax tribal metal craft.' },
      { name: 'Bastar Iron Craft', description: 'Hand-forged iron items.' },
      { name: 'Bastar Wood Carving', description: 'Tribal wooden sculptures.' },
      { name: 'Terracotta Figures', description: 'Rural clay craft.' },
      { name: 'Bamboo Weaving', description: 'Household and decorative items.' },
      { name: 'Godna Art', description: 'Tribal tattoo-style painting.' },
      { name: 'Tumba Craft', description: 'Bottle-gourd craft.' },
      { name: 'Kosa Silk', description: 'Fine silk weaving.' },
      { name: 'Tribal Jewelry', description: 'Beads, brass & forest elements.' },
      { name: 'Stone Carving', description: 'Traditional stone idols.' }
    ]
  },
  {
    state: 'Goa',
    demoArtist: 'Maria D’Souza',
    crafts: [
      { name: 'Azulejos Tiles', description: 'Portuguese-inspired blue tiles.' },
      { name: 'Shell Craft', description: 'Ornaments & home décor from sea shells.' },
      { name: 'Coconut Craft', description: 'Bowls & sculptures from coconut shells.' },
      { name: 'Wooden Toys', description: 'Goan folk-inspired toys.' },
      { name: 'Terracotta', description: 'Clay idols & utensils.' },
      { name: 'Metal Engraving', description: 'Decorative metal plates.' },
      { name: 'Bamboo Craft', description: 'Utility baskets.' },
      { name: 'Crochet & Lace', description: 'Portuguese-inspired lacework.' },
      { name: 'Stone Inlay', description: 'Marble & granite inlays.' },
      { name: 'Goan Jewellery', description: 'Filigree silver jewellery.' }
    ]
  },
  {
    state: 'Gujarat',
    demoArtist: 'Mehul Vaghasia',
    crafts: [
      { name: 'Patola Silk', description: 'Double-ikat weaving from Patan.' },
      { name: 'Bandhani', description: 'Tie-dye textile art with vibrant patterns.' },
      { name: 'Kutch Embroidery', description: 'Mirror-work rich embroidery.' },
      { name: 'Rogan Art', description: 'Oil-based textile painting from Kutch.' },
      { name: 'Terracotta Toys', description: 'Folk clay figurines.' },
      { name: 'Silver Jewelry', description: 'Intricate Gujarati silver work.' },
      { name: 'Lacquer Work', description: 'Colourful lacquered utensils.' },
      { name: 'Zari Work', description: 'Gold and silver thread embroidery.' },
      { name: 'Wood Carving', description: 'Doors, pillars, temple work.' },
      { name: 'Namda Felt Craft', description: 'Wool-felt rugs.' }
    ]
  },
  {
    state: 'Haryana',
    demoArtist: 'Anita Phogat',
    crafts: [
      { name: 'Phulkari', description: 'Floral embroidered shawls.' },
      { name: 'Handloom Durries', description: 'Cotton floor mats.' },
      { name: 'Pottery of Jhajjar', description: 'Rustic clayware.' },
      { name: 'Zari Jutti', description: 'Traditional embroidered footwear.' },
      { name: 'Lac Bangles', description: 'Bright lacquer ornaments.' },
      { name: 'Wooden Furniture', description: 'Carved rural-style furniture.' },
      { name: 'Metal Engraving', description: 'Brass & copper items.' },
      { name: 'Carpet Weaving', description: 'Hand-knotted carpets.' },
      { name: 'Cane Craft', description: 'Baskets & trays.' },
      { name: 'Mud Wall Art', description: 'Decorative rural murals.' }
    ]
  },
  {
    state: 'Himachal Pradesh',
    demoArtist: 'Rohit Thakur',
    crafts: [
      { name: 'Kinnauri Shawls', description: 'Geometric wool shawls.' },
      { name: 'Chamba Rumal', description: 'Pahari miniature embroidery.' },
      { name: 'Kangra Painting', description: 'Delicate love-themed paintings.' },
      { name: 'Wood Carving', description: 'Temple-style carved wood.' },
      { name: 'Metal Craft', description: 'Ritual objects.' },
      { name: 'Woollen Weaving', description: 'Warm wool clothing.' },
      { name: 'Thangka Art', description: 'Buddhist scroll paintings.' },
      { name: 'Handloom Caps', description: 'Colourful Himachali caps.' },
      { name: 'Pottery', description: 'Local clay utensils.' },
      { name: 'Bamboo Craft', description: 'Utility items.' }
    ]
  },
  {
    state: 'Jharkhand',
    demoArtist: 'Kajol Munda',
    crafts: [
      { name: 'Sohrai Art', description: 'Tribal wall painting with natural colours.' },
      { name: 'Kohvar Art', description: 'Wedding murals by women.' },
      { name: 'Dhokra Metal', description: 'Lost-wax metal figures.' },
      { name: 'Bamboo Crafts', description: 'Baskets & décor.' },
      { name: 'Stone Carving', description: 'Tribal idols.' },
      { name: 'Lac Ornaments', description: 'Lac bangles & jewelry.' },
      { name: 'Handloom Weaving', description: 'Tussar silk textiles.' },
      { name: 'Terracotta', description: 'Clay horses & elephants.' },
      { name: 'Tribal Masks', description: 'Ceremonial wooden masks.' },
      { name: 'Iron Craft', description: 'Handmade tools & décor.' }
    ]
  },
  {
    state: 'Karnataka',
    demoArtist: 'Nandan Hegde',
    crafts: [
      { name: 'Channapatna Toys', description: 'Lacquered wooden toys.' },
      { name: 'Mysore Silk', description: 'High-quality silk sarees.' },
      { name: 'Bidriware', description: 'Black metal with silver inlay.' },
      { name: 'Ilkal Sarees', description: 'Traditional dharwad-style weaving.' },
      { name: 'Kinhal Toys', description: 'Mythological wooden idols.' },
      { name: 'Sandalwood Carving', description: 'Fine fragrance wood art.' },
      { name: 'Kasuti Embroidery', description: 'Geometric hand embroidery.' },
      { name: 'Metal Sculptures', description: 'Temple bronze idols.' },
      { name: 'Lambani Crafts', description: 'Mirror & bead tribal embroidery.' },
      { name: 'Terracotta Craft', description: 'Clay dieties & décor.' }
    ]
  },
  {
    state: 'Kerala',
    demoArtist: 'Ajay Varrier',
    crafts: [
      { name: 'Nettipattam', description: 'Golden elephant caparison.' },
      { name: 'Aranmula Mirrors', description: 'Hand-polished metal mirrors.' },
      { name: 'Coir Craft', description: 'Rope, mats, bags from coconut fibre.' },
      { name: 'Kathakali Masks', description: 'Painted wooden masks.' },
      { name: 'Bamboo Craft', description: 'Utility items.' },
      { name: 'Theyyam Headgear', description: 'Ritual fibre headpieces.' },
      { name: 'Banana Fibre Weaving', description: 'Eco-friendly textiles.' },
      { name: 'Wood Carving', description: 'Temple décor.' },
      { name: 'Pottery', description: 'Clay pots & utensils.' },
      { name: 'Metal Crafts', description: 'Brass lamps & vessels.' }
    ]
  },
  {
    state: 'Madhya Pradesh',
    demoArtist: 'Suryansh Rathore',
    crafts: [
      { name: 'Gond Painting', description: 'Tribal folklore art.' },
      { name: 'Bagh Print', description: 'Hand-block printing with natural dyes.' },
      { name: 'Maheshwari Sarees', description: 'Elegant woven sarees.' },
      { name: 'Chanderi Silk', description: 'Soft translucent silk textiles.' },
      { name: 'Terracotta of Tribal Villages', description: 'Idols & pots.' },
      { name: 'Stone Carving', description: 'Khajuraho-style sculpture.' },
      { name: 'Dhokra Art', description: 'Tribal metal craft.' },
      { name: 'Wood Lacquer Craft', description: 'Lathe-turned coloured items.' },
      { name: 'Papier-Mâché', description: 'Lightweight masks & crafts.' },
      { name: 'Bell Metal Work', description: 'Ritual items.' }
    ]
  },
  {
    state: 'Maharashtra',
    demoArtist: 'Aarav Jagtap',
    crafts: [
      { name: 'Warli Art', description: 'Tribal stick-figure painting.' },
      { name: 'Paithani Sarees', description: 'Rich handwoven silk sarees.' },
      { name: 'Sawantwadi Toys', description: 'Ganjifa cards & toys.' },
      { name: 'Bidriware', description: 'Metal inlay work (shared craft).' },
      { name: 'Kolhapuri Chappal', description: 'Leather footwear.' },
      { name: 'Mashru Weaving', description: 'Silk-cotton weaving.' },
      { name: 'Bamboo Craft', description: 'Village-made baskets.' },
      { name: 'Stone Carving', description: 'Temples & idols.' },
      { name: 'Embroidery', description: 'Traditional thread work.' },
      { name: 'Copperware', description: 'Hand-hammered vessels.' }
    ]
  },
  {
    state: 'Manipur',
    demoArtist: 'Thoibi Chanu',
    crafts: [
      { name: 'Kauna Grass Craft', description: 'Bags & mats from reed grass.' },
      { name: 'Manipuri Shawls', description: 'Bright woven patterns.' },
      { name: 'Pottery', description: 'Hand-moulded without wheel.' },
      { name: 'Bamboo Basketry', description: 'Utility baskets.' },
      { name: 'Wood Carving', description: 'Figures & panels.' },
      { name: 'Black Pottery', description: 'Longpi pottery from rock & clay.' },
      { name: 'Weaving of Phanek', description: 'Traditional women’s garment.' },
      { name: 'Handloom Scarves', description: 'Bright ethnic designs.' },
      { name: 'Dolls & Puppets', description: 'Festival dolls.' },
      { name: 'Tribal Jewelry', description: 'Bead necklaces & earrings.' }
    ]
  },
  {
    state: 'Meghalaya',
    demoArtist: 'Rinchen Marak',
    crafts: [
      { name: 'Bamboo Mat Weaving', description: 'Strong bamboo mats.' },
      { name: 'Cane Furniture', description: 'High-quality furniture.' },
      { name: 'Pine Needle Crafts', description: 'Eco-friendly décor.' },
      { name: 'Textiles (Eri Silk)', description: 'Indigenous silk weaving.' },
      { name: 'Wood Masks', description: 'Festival masks.' },
      { name: 'Pottery', description: 'Rural clay items.' },
      { name: 'Weaving of Dakmanda', description: 'Garo women’s dress.' },
      { name: 'Bead Jewelry', description: 'Tribal jewellery.' },
      { name: 'Basketry', description: 'Strong bamboo baskets.' },
      { name: 'Handmade Drums', description: 'Traditional Khasi drums.' }
    ]
  },
  {
    state: 'Mizoram',
    demoArtist: 'Lalnunsanga Zadeng',
    crafts: [
      { name: 'Handloom Shawls', description: 'Traditional bright shawls.' },
      { name: 'Bamboo Handicraft', description: 'Household items & décor.' },
      { name: 'Cane Craft', description: 'Furniture & boxes.' },
      { name: 'Wood Carving', description: 'Tribal figurines.' },
      { name: 'Pottery', description: 'Functional clayware.' },
      { name: 'Bamboo Hats', description: 'Cultural headgear.' },
      { name: 'Jewelry', description: 'Beads & shells.' },
      { name: 'Weaving of Puan', description: 'Mizo textiles.' },
      { name: 'Basketry', description: 'Multi-use baskets.' },
      { name: 'Drum Making', description: 'Cultural instruments.' }
    ]
  },
  {
    state: 'Nagaland',
    demoArtist: 'Atem Kikon',
    crafts: [
      { name: 'Naga Shawls', description: 'Tribal symbolic woven shawls.' },
      { name: 'Bamboo & Cane Craft', description: 'Utility & décor.' },
      { name: 'Wood Carvings', description: 'Mythical figures.' },
      { name: 'Bead Jewelry', description: 'Traditional necklaces.' },
      { name: 'Spear Craft', description: 'Hand-forged ceremonial spears.' },
      { name: 'Basketry', description: 'Strong bamboo baskets.' },
      { name: 'Pottery', description: 'Village pottery.' },
      { name: 'Bamboo Masks', description: 'Tribal masks.' },
      { name: 'Feather Jewelry', description: 'Decorative headgear.' },
      { name: 'Handloom Bags', description: 'Geometric woven bags.' }
    ]
  },
  {
    state: 'Odisha',
    demoArtist: 'Prakash Jena',
    crafts: [
      { name: 'Pattachitra', description: 'Mythological scroll painting.' },
      { name: 'Applique of Pipili', description: 'Decorative patchwork.' },
      { name: 'Silver Filigree', description: 'Delicate silver jewellery.' },
      { name: 'Sambalpuri Ikat', description: 'Tie-dyed woven sarees.' },
      { name: 'Stone Carving', description: 'Temple sculpture.' },
      { name: 'Terracotta', description: 'Clay horses & figurines.' },
      { name: 'Dhokra', description: 'Tribal metal craft.' },
      { name: 'Horn Craft', description: 'Ornaments from horn.' },
      { name: 'Palm Leaf Engraving', description: 'Etched manuscripts.' },
      { name: 'Wooden Toys', description: 'Handcrafted figurines.' }
    ]
  },
  {
    state: 'Punjab',
    demoArtist: 'Harmeet Gill',
    crafts: [
      { name: 'Phulkari', description: 'Colourful embroidered shawls.' },
      { name: 'Jutti Making', description: 'Embroidered footwear.' },
      { name: 'Wooden Furniture', description: 'Carved Punjabi style.' },
      { name: 'Dhol Craft', description: 'Making traditional drums.' },
      { name: 'Basketry', description: 'Cane & bamboo baskets.' },
      { name: 'Pottery', description: 'Village pottery.' },
      { name: 'Woollen Shawls', description: 'Warm fabrics.' },
      { name: 'Metal Utensils', description: 'Brass & copper.' },
      { name: 'Puppet Craft', description: 'String puppets.' },
      { name: 'Charkha Craft', description: 'Traditional spinning wheels.' }
    ]
  },
  {
    state: 'Rajasthan',
    demoArtist: 'Madan Rathod',
    crafts: [
      { name: 'Blue Pottery', description: "Jaipur’s iconic glazed pottery." },
      { name: 'Bandhej', description: 'Tie-dye fabric art.' },
      { name: 'Meenakari', description: 'Enamel jewellery craft.' },
      { name: 'Marble Carving', description: 'Temple & decorative work.' },
      { name: 'Leather Mojari', description: 'Traditional shoes.' },
      { name: 'Block Printing', description: 'Sanganer & Bagru prints.' },
      { name: 'Puppetry', description: 'Rajasthani kathputli.' },
      { name: 'Lac Bangles', description: 'Bright bangles.' },
      { name: 'Miniature Painting', description: 'Mughal/Rajput style art.' },
      { name: 'Dhurrie Weaving', description: 'Flat-woven carpets.' }
    ]
  },
  {
    state: 'Sikkim',
    demoArtist: 'Pema Sherpa',
    crafts: [
      { name: 'Thangka Painting', description: 'Buddhist scroll art.' },
      { name: 'Carpet Weaving', description: 'Woollen patterned carpets.' },
      { name: 'Wood Carving', description: 'Dragons & Buddhist motifs.' },
      { name: 'Lepcha Weaving', description: 'Traditional belts.' },
      { name: 'Bamboo Basketry', description: 'Utility baskets.' },
      { name: 'Metal Craft', description: 'Ritual items.' },
      { name: 'Papier Mâché Masks', description: 'Festival masks.' },
      { name: 'Handloom Stoles', description: 'Ethnic patterns.' },
      { name: 'Wool Shawls', description: 'Warm traditional shawls.' },
      { name: 'Ceramic Pottery', description: 'Artisan clay craft.' }
    ]
  },
  {
    state: 'Tamil Nadu',
    demoArtist: 'S. Sundaramurthy',
    crafts: [
      { name: 'Tanjore Painting', description: 'Gold leaf embedded paintings.' },
      { name: 'Kanchipuram Silk', description: 'Temple-style silk sarees.' },
      { name: 'Stone Sculpture', description: 'Mahabalipuram carvings.' },
      { name: 'Bronze Idols', description: 'Chola-style statues.' },
      { name: 'Toda Embroidery', description: 'Tribal geometric embroidery.' },
      { name: 'Wood Carving', description: 'Temple pillars & decor.' },
      { name: 'Athangudi Tiles', description: 'Handmade patterned tiles.' },
      { name: 'Palm Leaf Weaving', description: 'Baskets & mats.' },
      { name: 'Coir Craft', description: 'Products from coconut fibre.' },
      { name: 'Terracotta', description: 'Village pottery.' }
    ]
  },
  {
    state: 'Telangana',
    demoArtist: 'Suman Reddy',
    crafts: [
      { name: 'Pochampally Ikat', description: 'Resist-dyed woven fabric.' },
      { name: 'Cheriyal Scrolls', description: 'Painted storytelling panels.' },
      { name: 'Nirmal Paintings', description: 'Gold-accented art.' },
      { name: 'Bidriware', description: 'Silver inlay metal craft.' },
      { name: 'Pembarthi Metalwork', description: 'Engraved brass items.' },
      { name: 'Dokra', description: 'Tribal metal figurines.' },
      { name: 'Silver Filigree', description: 'Delicate silver craft.' },
      { name: 'Lacquer Toys', description: 'Decorative toys.' },
      { name: 'Handloom Cotton', description: 'Lightweight textiles.' },
      { name: 'Wood Sculpting', description: 'Rural carvings.' }
    ]
  },
  {
    state: 'Tripura',
    demoArtist: 'Nihar Debbarma',
    crafts: [
      { name: 'Bamboo & Cane Craft', description: 'Furniture & décor.' },
      { name: 'Handloom Risa', description: 'Traditional cloth.' },
      { name: 'Wood Carving', description: 'Tribal sculptures.' },
      { name: 'Bamboo Mats', description: 'Floor & wall mats.' },
      { name: 'Bell Metal', description: 'Ritual utensils.' },
      { name: 'Pottery', description: 'Clay artefacts.' },
      { name: 'Cane Jewelry', description: 'Eco-friendly jewelry.' },
      { name: 'Doll Making', description: 'Cultural figurines.' },
      { name: 'Basketry', description: 'Strong utility baskets.' },
      { name: 'Jute Craft', description: 'Bags & mats.' }
    ]
  },
  {
    state: 'Uttar Pradesh',
    demoArtist: 'Imran Warsi',
    crafts: [
      { name: 'Chikankari', description: 'Delicate white embroidery.' },
      { name: 'Banarasi Silk', description: 'Luxurious woven brocade.' },
      { name: 'Brassware of Moradabad', description: 'World-famous metalware.' },
      { name: 'Terracotta of Gorakhpur', description: 'Distinctive red clay craft.' },
      { name: 'Marble Inlay (Agra)', description: 'Taj Mahal-style pietra dura.' },
      { name: 'Wood Carving', description: 'Saharanpur furniture.' },
      { name: 'Glassware (Firozabad)', description: 'Bangles & glass art.' },
      { name: 'Zardozi', description: 'Heavy gold-thread embroidery.' },
      { name: 'Pottery', description: 'Rural pottery traditions.' },
      { name: 'Perfume (Attar) Craft', description: 'Traditional fragrance creation.' }
    ]
  },
  {
    state: 'Uttarakhand',
    demoArtist: 'Jeevan Rawat',
    crafts: [
      { name: 'Aipan Art', description: 'Red & white ritual floor art.' },
      { name: 'Ringaal Craft', description: 'Bamboo craft.' },
      { name: 'Woollen Shawls', description: 'Pahadi weaving.' },
      { name: 'Copper Utensils', description: 'Hand-hammered.' },
      { name: 'Wood Carving', description: 'Temple carving.' },
      { name: 'Handmade Rugs', description: 'Wool rugs.' },
      { name: 'Pine Needle Craft', description: 'Eco products.' },
      { name: 'Kandali Grass Craft', description: 'Natural fibre craft.' },
      { name: 'Tribal Jewelry', description: 'Silver ornaments.' },
      { name: 'Pottery', description: 'Clay household items.' }
    ]
  },
  {
    state: 'West Bengal',
    demoArtist: 'Shantanu Roy',
    crafts: [
      { name: 'Kantha Stitch', description: 'Layered embroidered quilts.' },
      { name: 'Terracotta of Bishnupur', description: 'Temple-style pottery.' },
      { name: 'Dokra Metal', description: 'Tribal metal craft.' }
    ]
  }
];

export default stateCrafts;
