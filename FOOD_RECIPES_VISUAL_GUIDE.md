# Food Recipes Feature - Visual Overview

## Page Layout

### Navigation
```
Dashboard → Click "Food Recipes" in Explore Section → /food-recipes Page
```

## Page Structure

### 1. Header Section
```
═══════════════════════════════════════════════════════════════════════
                     Indian Food Recipes (H1)
  Explore traditional recipes from across India and share your own 
  culinary creations (Subtitle)
═══════════════════════════════════════════════════════════════════════
```

### 2. Traditional Recipes by State (Section 1)

```
┌─────────────────────────────────────────────────────────────────────┐
│ Traditional Recipes by State                                         │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  [Punjab]            │  │  [Kerala]            │  │  [Bengal]            │
│  Sarson Da Saag      │  │  Appam               │  │  Kosha Mangsho       │
│                      │  │                      │  │                      │
│  A winter dish made  │  │  Soft, bowl-shaped   │  │  A rich, spicy,      │
│  from mustard greens │  │  pancakes made from  │  │  semi-dry mutton     │
│  and spices...       │  │  fermented rice...   │  │  curry, slow-cooked  │
│                      │  │                      │  │                      │
│  ▶ Watch Recipe      │  │  ▶ Watch Recipe      │  │  ▶ Watch Recipe      │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘

[Repeat for all 36 states - responsive grid layout]
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop
```

### 3. My Personalized Recipes (Section 2)

#### When Not Logged In:
```
┌─────────────────────────────────────────────────────────────────────┐
│ My Personalized Recipes                                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│     Please login to add and manage your personalized recipes      │
│                                                                     │
│            [Go to Login]                                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### When Logged In (No Recipes Yet):
```
┌─────────────────────────────────────────────────────────────────────┐
│ My Personalized Recipes                    [+ Add Recipe]           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│     You haven't added any personalized recipes yet.               │
│                                                                     │
│              [+ Add Your First Recipe]                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### With Recipes:
```
┌─────────────────────────────────────────────────────────────────────┐
│ My Personalized Recipes                    [+ Add Recipe]           │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐  ┌──────────────────────┐
│  [Grandma's Biryani] │  │  [Spicy Samosas]     │
│                      │  │                      │
│  Region: Hyderabadi  │  │  Region: Delhi       │
│                      │  │                      │
│  Traditional biryani │  │  Crispy potato and   │
│  with basmati rice   │  │  pea filled samosas  │
│  and mutton...       │  │  with tangy sauce... │
│                      │  │                      │
│                 [Delete]│                 [Delete]│
└──────────────────────┘  └──────────────────────┘
```

## Add Recipe Form (When Clicked)

```
┌─────────────────────────────────────────────────────────────────────┐
│ Add Your Recipe                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Recipe Title                                                      │
│  [____________________________________________]                    │
│  e.g., Grandma's Biryani                                          │
│                                                                     │
│  Region/State                                                      │
│  [____________________________________________]                    │
│  e.g., Bengali, Punjabi, etc.                                     │
│                                                                     │
│  Recipe Description                                                │
│  [                                                               ]  │
│  [  Describe your recipe in detail - ingredients,              ]  │
│  [  cooking method, tips, etc.                                 ]  │
│  [                                                               ]  │
│                                                                     │
│  [Save Recipe]  [Cancel]                                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## User Flow Diagram

```
┌──────────────┐
│  Dashboard   │
└──────┬───────┘
       │ Click Food Recipes
       ▼
┌──────────────────────────────────────┐
│  Food Recipes Page (/food-recipes)  │
├──────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │ Traditional Recipes Section    │ │
│  │ (36 state recipes - public)    │ │
│  │ - View all                     │ │
│  │ - Click to watch video         │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ Personalized Recipes Section   │ │
│  │                                │ │
│  │ Not Logged In?                 │ │
│  │ → Show Login Prompt            │ │
│  │                                │ │
│  │ Logged In?                     │ │
│  │ → Add Recipe Button            │ │
│  │ → View/Delete Own Recipes      │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
```

## Features at a Glance

### Traditional Recipes Section ✅
- [x] Displays all 36 state recipes
- [x] Shows state name, food name, description
- [x] YouTube recipe video links
- [x] Responsive card grid layout
- [x] No login required

### Personalized Recipes Section ✅
- [x] Login-protected
- [x] Add new recipes with form
- [x] Title, region, description fields
- [x] Display user's recipes in cards
- [x] Delete own recipes
- [x] Form validation
- [x] Error messages
- [x] Loading states

### Design Features ✅
- [x] Responsive layout (mobile, tablet, desktop)
- [x] Gradient backgrounds and colors
- [x] Icon integration (React Icons)
- [x] Card-based UI
- [x] Smooth transitions and hover effects
- [x] Clean typography

## Color Scheme

- **Primary Orange**: #F97316, #EA580C
- **Secondary Amber**: #F59E0B, #D97706
- **Text Dark**: #7C2D12, #92400E
- **Background Light**: #FEF3C7, #FEF1E4
- **White Cards**: #FFFFFF
- **Accent Red**: #EF4444

## Responsive Breakpoints

- **Mobile**: Single column, full width cards
- **Tablet**: 2 columns (md: 768px)
- **Desktop**: 3 columns (lg: 1024px)

## User Interaction Flows

### View Traditional Recipes
```
1. User lands on /food-recipes
2. Page loads all state recipes
3. Recipes display in grid
4. User clicks "Watch Recipe"
5. Opens YouTube in new tab
```

### Add Personalized Recipe
```
1. User clicks "Add Recipe" button
2. Form appears
3. User fills in details
4. Clicks "Save Recipe"
5. Recipe saved to MongoDB
6. Page refreshes to show new recipe
```

### Delete Personalized Recipe
```
1. User sees own recipe card
2. Clicks "Delete" button
3. Confirmation popup
4. Recipe deleted from MongoDB
5. Page refreshes to remove it
```

## Error Handling

```
[Error Icon] Failed to load recipes: [error message]
[Dismiss] button to close error
```

- Network errors
- Validation errors
- Authorization errors
- Server errors
