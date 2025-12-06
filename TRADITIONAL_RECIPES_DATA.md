# Traditional Indian State Recipes Data

This file documents all 36 traditional recipes that will be seeded into the database.

## Complete Recipe List

| State/UT | Food Name | Description | 
|----------|-----------|-------------|
| Andaman & Nicobar | Bamboo Shoot Curry | A unique island curry made with tender bamboo shoots and local spices. |
| Andhra Pradesh | Pulihora | Spicy and tangy tamarind rice mixed with peanuts and green chilies. |
| Arunachal Pradesh | Thukpa | A warming noodle soup with vegetables or meat, popular in the Himalayas. |
| Assam | Masor Tenga | A light, sour fish curry often made with elephant apple (ou tenga) or tomatoes. |
| Bihar | Litti Chokha | Wheat balls stuffed with roasted gram flour (sattu), baked and served with spicy mashed vegetables. |
| Chandigarh | Amritsari Kulcha | Stuffed flatbread baked in a tandoor, usually served with spicy chickpeas (chole). |
| Chhattisgarh | Fara | Steamed rice flour dumplings, often shallow fried with sesame seeds and curry leaves. |
| Dadra & Nagar Haveli | Ubadiyu | A mixed vegetable earthen-pot dish similar to Gujarati Undhiyu, cooked with local herbs. |
| Delhi | Butter Chicken | Tandoori chicken cooked in a rich, creamy, and mildly spiced tomato gravy. |
| Goa | Goan Fish Curry | Tangy and spicy fish curry made with coconut milk and kokum. |
| Gujarat | Dhokla | A soft, steamed savory cake made from fermented rice and lentil batter. |
| Haryana | Bajra Khichdi | A wholesome, hearty porridge made from pearl millet (bajra) and lentils. |
| Himachal Pradesh | Dham | A festive vegetarian meal platter featuring rice, madra (yogurt curry), and dal. |
| Jammu & Kashmir | Rogan Josh | An aromatic lamb dish of Persian origin, colored with Kashmiri red chilies. |
| Jharkhand | Dhuska | Deep-fried savory pancake made from a batter of rice and lentils, served with potato curry. |
| Karnataka | Bisi Bele Bath | A spicy, rice-based dish with lentils and mixed vegetables, originating from Mysore. |
| Kerala | Appam | Soft, bowl-shaped pancakes made from fermented rice batter and coconut milk. |
| Ladakh | Skyu | A traditional soup-based dish with wheat dough thumb-prints and root vegetables. |
| Lakshadweep | Fish Biryani | A flavorful seafood biryani using local fish (often tuna) and mild spices. |
| Madhya Pradesh | Bhutte Ka Kees | Grated corn snacks cooked with milk and spices, a street food specialty of Indore. |
| Maharashtra | Misal Pav | A spicy curry made of moth beans (matki) topped with farsan, served with bread rolls (pav). |
| Manipur | Eromba | A pungent stew of boiled vegetables and fermented fish (ngari), mashed with chilies. |
| Meghalaya | Jadoh | Rice cooked with meat (usually pork) and sometimes blood, spiced with ginger and black sesame. |
| Mizoram | Bai | A simple, healthy stew made from steaming vegetables, pork sauce, and bamboo shoots. |
| Nagaland | Smoked Pork | Pork curry cooked with fermented bamboo shoots and the famous Raja Mircha (King Chilli). |
| Odisha | Dalma | A nutritious dal cooked with a variety of vegetables and tempered with panch phoron. |
| Puducherry | Fish Assad Curry | A French-influenced fish curry using coconut milk, anise, and mild spices. |
| Punjab | Sarson Da Saag | A winter dish made from mustard greens and spices, best eaten with Makki di Roti. |
| Rajasthan | Dal Baati Churma | Hard wheat rolls (baati) served with lentils (dal) and a sweet crumbled wheat mixture (churma). |
| Sikkim | Momos | Steamed dumplings filled with meat or vegetables, served with a spicy tomato chutney. |
| Tamil Nadu | Ven Pongal | A comforting breakfast porridge of rice and yellow moong dal, seasoned with cumin, ginger, and ghee. |
| Telangana | Hyderabadi Biryani | World-famous rice dish made with meat and spices, slow-cooked in a sealed pot (dum). |
| Tripura | Wahan Mosdeng | A spicy pork salad made with roasted green chilies, onions, and coriander. |
| Uttar Pradesh | Galouti Kebab | "Melt in the mouth" minced meat kebabs, originally made for the Nawabs of Lucknow. |
| Uttarakhand | Kafuli | A thick, green nutritious gravy made from spinach and fenugreek leaves. |
| West Bengal | Kosha Mangsho | A rich, spicy, semi-dry mutton curry, slow-cooked to darken the gravy. |

## Total: 36 Traditional Recipes

## How Recipes Are Stored

Each recipe is stored in MongoDB with the following structure:

```json
{
  "_id": ObjectId,
  "state": "Punjab",
  "foodName": "Sarson Da Saag",
  "description": "A winter dish made from mustard greens and spices, best eaten with Makki di Roti.",
  "videoLink": "https://www.youtube.com/results?search_query=Authentic+Sarson+Da+Saag",
  "createdAt": ISODate("2024-12-06T00:00:00.000Z")
}
```

## User's Personalized Recipes

Users can add their own recipes which are stored separately in the Recipe collection:

```json
{
  "_id": ObjectId,
  "owner": ObjectId("userId"),
  "title": "Grandma's Special Biryani",
  "region": "Hyderabadi",
  "description": "A detailed recipe description including ingredients and cooking steps...",
  "keywords": ["biryani", "rice", "meat"],
  "createdAt": ISODate("2024-12-06T10:30:00.000Z")
}
```

## Cultural Significance

These recipes represent the rich culinary diversity of India:

- **North India**: Butter Chicken, Sarson Da Saag, Galouti Kebab, Dal Baati Churma
- **South India**: Dosa variations, Biryani, Ven Pongal, Bisi Bele Bath
- **East India**: Kosha Mangsho, Dalma, Momos
- **West India**: Dhokla, Misal Pav
- **Northeast India**: Thukpa, Jadoh, Eromba, Smoked Pork
- **Island Territories**: Bamboo Shoot Curry, Fish Biryani

Each recipe tells a story of its region's geography, climate, available ingredients, and cultural heritage.
