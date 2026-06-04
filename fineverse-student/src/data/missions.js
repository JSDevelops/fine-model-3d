// src/data/missions.js
// Full dialogue scripts for each mission

export const SCENES = [
  {
    id: 'restaurant',
    name: 'Restaurant Scene',
    subtitle: 'Standard Room',
    icon: 'fa-utensils',
    color: 'teal',
    bg: '#E1F5EE',
    iconColor: '#0F6E56',
    description: 'Practice real service dialogues: welcoming guests, taking orders, handling requests and recommending dishes.',
  },
  {
    id: 'vip',
    name: 'VIP Reception Lounge',
    subtitle: 'Luxury Room',
    icon: 'fa-couch',
    color: 'blue',
    bg: '#E6F1FB',
    iconColor: '#185FA5',
    description: 'Handle high-end guest interactions, VIP check-in procedures, wine service and concierge language.',
  },
]

export const MISSIONS = [
  {
    id: 'm1',
    sceneId: 'restaurant',
    name: 'Welcoming Guests',
    icon: 'fa-door-open',
    difficulty: 'easy',
    passingScore: 60,
    description: 'Greet guests warmly as they arrive and guide them to their table.',
    steps: [
      {
        id: 1,
        npc: 'Good evening! We have a reservation for two under the name Johnson.',
        hint: 'Greet warmly â€” use the guest\'s name if possible.',
        choices: [
          { text: 'Good evening, welcome! Right this way â€” I\'ll show you to your table.', correct: true },
          { text: 'Over there.', correct: false },
          { text: 'Wait here.', correct: false },
        ],
        keywords: ['welcome', 'evening', 'table'],
      },
      {
        id: 2,
        npc: 'Thank you. Could we have a table by the window?',
        hint: 'Be accommodating. Offer to check or suggest an alternative.',
        choices: [
          { text: 'Of course! Let me check â€” yes, we have a lovely window table available for you.', correct: true },
          { text: 'No windows are free.', correct: false },
          { text: 'Just sit anywhere.', correct: false },
        ],
        keywords: ['of course', 'window', 'available', 'check'],
      },
      {
        id: 3,
        npc: 'Perfect. Could we see the menu, please?',
        hint: 'Present the menu with a brief introduction.',
        choices: [
          { text: 'Absolutely! Here are your menus. Our chef\'s specials are on the first page â€” I\'ll be back shortly to take your order.', correct: true },
          { text: 'Here.', correct: false },
          { text: 'Menu is on the table.', correct: false },
        ],
        keywords: ['menu', 'specials', 'order'],
      },
      {
        id: 4,
        npc: 'This place looks beautiful. Is this your busiest night?',
        hint: 'Make small talk â€” be friendly and professional.',
        choices: [
          { text: 'Thank you so much! Friday evenings are quite lively â€” we\'re so glad you chose to join us tonight.', correct: true },
          { text: 'Yes, very busy.', correct: false },
          { text: 'I don\'t know.', correct: false },
        ],
        keywords: ['thank', 'glad', 'evening'],
      },
    ],
  },
  {
    id: 'm2',
    sceneId: 'restaurant',
    name: 'Taking Food Orders',
    icon: 'fa-clipboard-list',
    difficulty: 'medium',
    passingScore: 60,
    description: 'Take food and beverage orders accurately while offering helpful suggestions.',
    steps: [
      {
        id: 1,
        npc: 'Excuse me, are you ready to take our order?',
        hint: 'Always confirm readiness with a positive response.',
        choices: [
          { text: 'Of course! I\'ll be happy to take your order now. What would you like to start with?', correct: true },
          { text: 'Wait a moment please.', correct: false },
          { text: 'Yes, one second.', correct: false },
        ],
        keywords: ['of course', 'happy', 'order', 'start'],
      },
      {
        id: 2,
        npc: 'What do you recommend today?',
        hint: 'Mention the chef\'s special and why it\'s popular.',
        choices: [
          { text: 'Our chef\'s special today is pan-seared salmon with lemon butter sauce â€” it\'s absolutely wonderful.', correct: true },
          { text: 'Everything is good.', correct: false },
          { text: 'I don\'t know, check the menu.', correct: false },
        ],
        keywords: ['special', 'salmon', 'recommend', 'chef'],
      },
      {
        id: 3,
        npc: 'Does the pasta contain any nuts? My partner has an allergy.',
        hint: 'Always offer to verify â€” never guess about allergens.',
        choices: [
          { text: 'That\'s very important â€” let me check with the kitchen for you right away to confirm.', correct: true },
          { text: 'I think it\'s fine.', correct: false },
          { text: 'No nuts.', correct: false },
        ],
        keywords: ['check', 'kitchen', 'confirm', 'important'],
      },
      {
        id: 4,
        npc: 'I\'ll have the salmon, and she\'ll have the pasta please.',
        hint: 'Repeat the order to confirm accuracy.',
        choices: [
          { text: 'Wonderful choices! So that\'s one pan-seared salmon and one pasta â€” I\'ll get that started for you.', correct: true },
          { text: 'OK.', correct: false },
          { text: 'Noted.', correct: false },
        ],
        keywords: ['wonderful', 'salmon', 'pasta', 'started'],
      },
      {
        id: 5,
        npc: 'Can we also have some bread while we wait?',
        hint: 'Say yes and give a time estimate.',
        choices: [
          { text: 'Certainly! I\'ll bring a basket of fresh bread right away for you.', correct: true },
          { text: 'Okay, one moment.', correct: false },
          { text: 'We\'ll see.', correct: false },
        ],
        keywords: ['certainly', 'fresh', 'right away', 'bread'],
      },
      {
        id: 6,
        npc: 'Could I have the bill, please?',
        hint: 'Thank the guest and close the interaction professionally.',
        choices: [
          { text: 'Of course! I\'ll bring your bill immediately. Thank you so much for dining with us this evening.', correct: true },
          { text: 'One moment.', correct: false },
          { text: 'Pay at the counter.', correct: false },
        ],
        keywords: ['of course', 'immediately', 'thank', 'dining'],
      },
    ],
  },
  {
    id: 'm3',
    sceneId: 'restaurant',
    name: 'Beverage Recommendation',
    icon: 'fa-wine-glass',
    difficulty: 'medium',
    passingScore: 60,
    description: 'Recommend wines and drinks that complement the guest\'s meal choices.',
    steps: [
      {
        id: 1,
        npc: 'We\'d like some wine â€” do you have any recommendations?',
        hint: 'Ask about their meal to pair correctly.',
        choices: [
          { text: 'I\'d love to help! Could I ask what you\'re having for your main course so I can suggest the perfect pairing?', correct: true },
          { text: 'We have red and white wine.', correct: false },
          { text: 'Check the wine list.', correct: false },
        ],
        keywords: ['help', 'main course', 'pairing', 'suggest'],
      },
      {
        id: 2,
        npc: 'We\'re having the salmon and the steak.',
        hint: 'Suggest specific wines for each dish.',
        choices: [
          { text: 'Excellent choices! For the salmon I\'d suggest our Chablis, and for the steak our Cabernet Sauvignon is superb.', correct: true },
          { text: 'Both are fine with red.', correct: false },
          { text: 'Whatever you prefer.', correct: false },
        ],
        keywords: ['suggest', 'Chablis', 'Cabernet', 'superb'],
      },
      {
        id: 3,
        npc: 'We\'ll try the Cabernet. Could you tell us more about it?',
        hint: 'Describe the wine\'s character and origin briefly.',
        choices: [
          { text: 'Our Cabernet Sauvignon is from a premium Napa Valley estate â€” rich with dark berry notes and a smooth, long finish.', correct: true },
          { text: 'It\'s a red wine.', correct: false },
          { text: 'It\'s very good.', correct: false },
        ],
        keywords: ['Napa', 'berry', 'finish', 'rich'],
      },
    ],
  },
  {
    id: 'm4',
    sceneId: 'vip',
    name: 'VIP Guest Check-in',
    icon: 'fa-crown',
    difficulty: 'hard',
    passingScore: 70,
    description: 'Handle a high-end VIP guest check-in with full luxury hospitality protocol.',
    steps: [
      {
        id: 1,
        npc: 'Good evening. I\'m Mr. Harrison â€” I believe you have a reservation for me.',
        hint: 'Address VIP guests by name immediately. Show recognition.',
        choices: [
          { text: 'Good evening, Mr. Harrison! We\'ve been expecting you. Welcome to our VIP lounge â€” allow me to personally escort you.', correct: true },
          { text: 'Let me check your booking.', correct: false },
          { text: 'Name and ID please.', correct: false },
        ],
        keywords: ['expecting', 'welcome', 'personally', 'escort'],
      },
      {
        id: 2,
        npc: 'I had requested a private seating area away from the main room.',
        hint: 'Confirm the special request was prepared in advance.',
        choices: [
          { text: 'Absolutely, Mr. Harrison â€” your private suite has been prepared exactly to your specifications.', correct: true },
          { text: 'Let me check if it\'s available.', correct: false },
          { text: 'We\'ll do our best.', correct: false },
        ],
        keywords: ['absolutely', 'prepared', 'specifications', 'private'],
      },
      {
        id: 3,
        npc: 'Excellent. I\'ll also need your sommelier to attend to us this evening.',
        hint: 'Confirm and offer a time if possible.',
        choices: [
          { text: 'Of course! Our head sommelier will attend to you personally within the next five minutes.', correct: true },
          { text: 'The sommelier might be busy.', correct: false },
          { text: 'I\'ll try to arrange that.', correct: false },
        ],
        keywords: ['of course', 'sommelier', 'personally', 'minutes'],
      },
      {
        id: 4,
        npc: 'Also, please ensure my calls are not disturbed during dinner.',
        hint: 'Acknowledge clearly and explain how it will be managed.',
        choices: [
          { text: 'Understood, Mr. Harrison. I\'ll ensure the front desk holds all your calls and messages until you\'ve finished dining.', correct: true },
          { text: 'We\'ll try.', correct: false },
          { text: 'You can turn your phone off.', correct: false },
        ],
        keywords: ['understood', 'hold', 'messages', 'dining'],
      },
    ],
  },
]

// Initial student progress (stored in sessionStorage to survive page nav)
export const INITIAL_PROGRESS = {
  completedMissions: [],   // array of mission IDs
  scores: {},              // { missionId: score }
  currentMission: null,    // mission ID
  currentStep: 0,          // step index
};

export const CURRICULUM_INITIAL = [
  {
    id: 'w1',
    week: 1,
    title: 'à¸„à¸³à¸¨à¸±à¸žà¸—à¹Œà¸­à¸¸à¸›à¸�à¸£à¸“à¹Œà¹ƒà¸™à¸«à¹‰à¸­à¸‡à¸­à¸²à¸«à¸²à¸£ (Restaurant Equipment Vocabulary)',
    description: 'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸„à¸³à¸¨à¸±à¸žà¸—à¹Œà¹�à¸¥à¸°à¸­à¸¸à¸›à¸�à¸£à¸“à¹Œà¹ƒà¸™à¸«à¹‰à¸­à¸‡à¸­à¸²à¸«à¸²à¸£ à¸Šà¸·à¹ˆà¸­ à¸«à¸™à¹‰à¸²à¸—à¸µà¹ˆ à¹�à¸¥à¸°à¸§à¸´à¸˜à¸µà¸�à¸²à¸£à¹ƒà¸Šà¹‰à¸‡à¸²à¸™ à¸�à¸²à¸£à¸ªà¸·à¹ˆà¸­à¸ªà¸²à¸£à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¸•à¸²à¸¡à¸¡à¸²à¸•à¸£à¸�à¸²à¸™à¸„à¸¸à¸“à¸§à¸¸à¸’à¸´à¸§à¸´à¸Šà¸²à¸Šà¸µà¸ž à¹‚à¸”à¸¢à¹ƒà¸Šà¹‰à¹€à¸—à¸„à¹‚à¸™à¹‚à¸¥à¸¢à¸µ AR à¹�à¸¥à¸° AI à¸£à¹ˆà¸§à¸¡à¸�à¸±à¸šà¸ªà¸–à¸²à¸™à¸�à¸²à¸£à¸“à¹Œà¸ˆà¸³à¸¥à¸­à¸‡ (Simulation)',
    objectives: [
      'à¸šà¸­à¸�à¸Šà¸·à¹ˆà¸­à¸­à¸¸à¸›à¸�à¸£à¸“à¹Œà¹ƒà¸™à¸«à¹‰à¸­à¸‡à¸­à¸²à¸«à¸²à¸£à¹€à¸›à¹‡à¸™à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¹„à¸”à¹‰à¸–à¸¹à¸�à¸•à¹‰à¸­à¸‡',
      'à¸­à¸˜à¸´à¸šà¸²à¸¢à¸«à¸™à¹‰à¸²à¸—à¸µà¹ˆà¹�à¸¥à¸°à¸„à¸§à¸²à¸¡à¸ªà¸³à¸„à¸±à¸�à¸‚à¸­à¸‡à¸­à¸¸à¸›à¸�à¸£à¸“à¹Œà¸šà¸™à¹‚à¸•à¹Šà¸°à¸­à¸²à¸«à¸²à¸£à¹„à¸”à¹‰',
      'à¸­à¸­à¸�à¹€à¸ªà¸µà¸¢à¸‡à¸„à¸³à¸¨à¸±à¸žà¸—à¹Œà¹�à¸¥à¸°à¹ƒà¸Šà¹‰ AR/AI à¹€à¸žà¸·à¹ˆà¸­à¸�à¸²à¸£à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸­à¸¸à¸›à¸�à¸£à¸“à¹Œà¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¸„à¸¥à¹ˆà¸­à¸‡à¹�à¸„à¸¥à¹ˆà¸§',
      'à¸ˆà¸³à¹�à¸™à¸�à¸­à¸¸à¸›à¸�à¸£à¸“à¹Œà¹�à¸¥à¸°à¸›à¸�à¸´à¸šà¸±à¸•à¸´à¸‡à¸²à¸™à¸ˆà¸±à¸”à¹‚à¸•à¹Šà¸°à¸£à¹ˆà¸§à¸¡à¸�à¸±à¸šà¸œà¸¹à¹‰à¸­à¸·à¹ˆà¸™à¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¸¡à¸µà¸›à¸£à¸°à¸ªà¸´à¸—à¸˜à¸´à¸ à¸²à¸ž'
    ],
    missionIds: [],
    mediaUrl: '/images/wn-5.jpg',
    mediaType: 'image'
  },
  {
    id: 'w2',
    week: 2,
    title: 'à¸„à¸³à¸¨à¸±à¸žà¸—à¹Œà¹€à¸¡à¸™à¸¹à¸­à¸²à¸«à¸²à¸£à¹�à¸¥à¸°à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡ (Food & Beverage Menu Vocabulary)',
    description: 'à¸�à¸¶à¸�à¸�à¸™à¸„à¸³à¸¨à¸±à¸žà¸—à¹Œà¹€à¸�à¸µà¹ˆà¸¢à¸§à¸�à¸±à¸šà¸›à¸£à¸°à¹€à¸ à¸—à¹€à¸¡à¸™à¸¹à¸­à¸²à¸«à¸²à¸£à¹�à¸¥à¸°à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡à¸ªà¸²à¸�à¸¥ à¸�à¸²à¸£à¸­à¹ˆà¸²à¸™à¸­à¸­à¸�à¹€à¸ªà¸µà¸¢à¸‡à¹€à¸¡à¸™à¸¹ à¸ªà¹ˆà¸§à¸™à¸›à¸£à¸°à¸�à¸­à¸šà¸«à¸¥à¸±à¸� à¹�à¸¥à¸°à¸—à¸±à¸�à¸©à¸°à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¹€à¸žà¸·à¹ˆà¸­à¸Šà¹ˆà¸§à¸¢à¹€à¸«à¸¥à¸·à¸­à¸¥à¸¹à¸�à¸„à¹‰à¸²à¸—à¸µà¹ˆà¸¡à¸µà¸‚à¹‰à¸­à¸ˆà¸³à¸�à¸±à¸”à¹ƒà¸™à¸�à¸²à¸£à¸£à¸±à¸šà¸›à¸£à¸°à¸—à¸²à¸™à¸­à¸²à¸«à¸²à¸£',
    objectives: [
      'à¸šà¸­à¸�à¸„à¸³à¸¨à¸±à¸žà¸—à¹Œà¹�à¸¥à¸°à¸ˆà¸³à¹�à¸™à¸�à¸«à¸¡à¸§à¸”à¸«à¸¡à¸¹à¹ˆà¸›à¸£à¸°à¹€à¸ à¸—à¹€à¸¡à¸™à¸¹à¸­à¸²à¸«à¸²à¸£à¹�à¸¥à¸°à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡à¸ªà¸²à¸�à¸¥à¹„à¸”à¹‰',
      'à¸­à¹ˆà¸²à¸™à¸ªà¸°à¸�à¸”à¹�à¸¥à¸°à¸­à¸­à¸�à¹€à¸ªà¸µà¸¢à¸‡à¸Šà¸·à¹ˆà¸­à¹€à¸¡à¸™à¸¹à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¸Šà¸±à¸”à¹€à¸ˆà¸™à¹�à¸¥à¸°à¸–à¸¹à¸�à¸•à¹‰à¸­à¸‡',
      'à¸™à¸³à¹€à¸ªà¸™à¸­à¹�à¸¥à¸°à¸­à¸˜à¸´à¸šà¸²à¸¢à¸£à¸²à¸¢à¸¥à¸°à¹€à¸­à¸µà¸¢à¸”à¹€à¸¡à¸™à¸¹à¹�à¸™à¸°à¸™à¸³ (Chef\'s Recommendation) à¹€à¸›à¹‡à¸™à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¹„à¸”à¹‰',
      'à¸›à¸£à¸°à¸¢à¸¸à¸�à¸•à¹Œà¹ƒà¸Šà¹‰à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¹ƒà¸™à¸�à¸²à¸£à¸•à¸­à¸šà¸‚à¹‰à¸­à¸‹à¸±à¸�à¸–à¸²à¸¡à¹€à¸�à¸µà¹ˆà¸¢à¸§à¸�à¸±à¸šà¹€à¸¡à¸™à¸¹à¹ƒà¸™à¸ªà¸–à¸²à¸™à¸�à¸²à¸£à¸“à¹Œà¸ˆà¸³à¸¥à¸­à¸‡à¹„à¸”à¹‰'
    ],
    missionIds: [],
    mediaUrl: '/images/20.jpg',
    mediaType: 'image'
  },
  {
    id: 'w3',
    week: 3,
    title: 'Greeting & Welcoming (à¸�à¸²à¸£à¸•à¹‰à¸­à¸™à¸£à¸±à¸šà¹�à¸¥à¸°à¸—à¸±à¸�à¸—à¸²à¸¢à¸¥à¸¹à¸�à¸„à¹‰à¸²)',
    description: 'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸›à¸£à¸°à¹‚à¸¢à¸„à¸¡à¸²à¸•à¸£à¸�à¸²à¸™à¹�à¸¥à¸°à¸ˆà¸±à¸‡à¸«à¸§à¸°à¸¡à¸²à¸£à¸¢à¸²à¸—à¸ªà¸²à¸�à¸¥à¹ƒà¸™à¸�à¸²à¸£à¸�à¸¥à¹ˆà¸²à¸§à¸—à¸±à¸�à¸—à¸²à¸¢à¸•à¹‰à¸­à¸™à¸£à¸±à¸šà¸¥à¸¹à¸�à¸„à¹‰à¸²à¸—à¸µà¹ˆà¸«à¸™à¹‰à¸²à¸£à¹‰à¸²à¸™à¸­à¸²à¸«à¸²à¸£ à¸�à¸²à¸£à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¸ªà¸–à¸²à¸™à¸°à¸�à¸²à¸£à¸ˆà¸­à¸‡à¹‚à¸•à¹Šà¸° (Reservation Checking) à¹�à¸¥à¸°à¸�à¸²à¸£à¸œà¸²à¸¢à¸¡à¸·à¸­à¸™à¸³à¸—à¸²à¸‡à¹€à¸”à¸´à¸™à¸ªà¹ˆà¸‡à¸¥à¸¹à¸�à¸„à¹‰à¸²à¹„à¸›à¸¢à¸±à¸‡à¹‚à¸•à¹Šà¸°',
    objectives: [
      'à¸�à¸¥à¹ˆà¸²à¸§à¸—à¸±à¸�à¸—à¸²à¸¢à¸•à¹‰à¸­à¸™à¸£à¸±à¸šà¸¥à¸¹à¸�à¸„à¹‰à¸² (Greeting & Welcoming) à¸•à¸²à¸¡à¸¡à¸²à¸•à¸£à¸�à¸²à¸™à¸ªà¸²à¸�à¸¥à¸”à¹‰à¸§à¸¢à¸„à¸§à¸²à¸¡à¸ªà¸¸à¸ à¸²à¸ž',
      'à¹ƒà¸Šà¹‰à¸ªà¸³à¸™à¸§à¸™à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¹ƒà¸™à¸�à¸²à¸£à¹€à¸Šà¹‡à¸„à¸šà¸¸à¹Šà¸�à¸�à¸´à¹‰à¸‡à¹�à¸¥à¸°à¸ˆà¸”à¸šà¸±à¸™à¸—à¸¶à¸�à¸�à¸²à¸£à¸ˆà¸­à¸‡à¸‚à¸­à¸‡à¸¥à¸¹à¸�à¸„à¹‰à¸²à¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¸–à¸¹à¸�à¸•à¹‰à¸­à¸‡',
      'à¹�à¸ªà¸”à¸‡à¸šà¸—à¸šà¸²à¸—à¸žà¸™à¸±à¸�à¸‡à¸²à¸™à¸•à¹‰à¸­à¸™à¸£à¸±à¸šà¸™à¸³à¸—à¸²à¸‡à¹‚à¸•à¹Šà¸°à¹�à¸¥à¸°à¹�à¸�à¹‰à¹„à¸‚à¸›à¸±à¸�à¸«à¸²à¸£à¹‰à¸²à¸™à¹‚à¸•à¹Šà¸°à¹€à¸•à¹‡à¸¡à¹€à¸‰à¸žà¸²à¸°à¸«à¸™à¹‰à¸²à¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¸£à¸²à¸šà¸£à¸·à¹ˆà¸™'
    ],
    missionIds: ['m1'],
    mediaUrl: '/images/wn-3.jpg',
    mediaType: 'image'
  },
  {
    id: 'w4',
    week: 4,
    title: 'Seating & Small Talk (à¸�à¸²à¸£à¸™à¸³à¸¥à¸¹à¸�à¸„à¹‰à¸²à¹„à¸›à¸—à¸µà¹ˆà¹‚à¸•à¹Šà¸°à¹�à¸¥à¸°à¸�à¸²à¸£à¸Šà¸§à¸™à¸„à¸¸à¸¢)',
    description: 'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸�à¸²à¸£à¸™à¸³à¸¥à¸¹à¸�à¸„à¹‰à¸²à¹„à¸›à¸¢à¸±à¸‡à¹‚à¸•à¹Šà¸°à¸­à¸²à¸«à¸²à¸£à¸—à¸µà¹ˆà¹€à¸«à¸¡à¸²à¸°à¸ªà¸¡ (Escorting and Seating) à¹�à¸¥à¸°à¸�à¸²à¸£à¸Šà¸§à¸™à¸„à¸¸à¸¢à¸ªà¸£à¹‰à¸²à¸‡à¸„à¸§à¸²à¸¡à¸„à¸¸à¹‰à¸™à¹€à¸„à¸¢à¹€à¸šà¸·à¹‰à¸­à¸‡à¸•à¹‰à¸™à¹€à¸žà¸·à¹ˆà¸­à¸ªà¸£à¹‰à¸²à¸‡à¸„à¸§à¸²à¸¡à¸›à¸£à¸°à¸—à¸±à¸šà¹ƒà¸ˆà¹�à¸£à¸�',
    objectives: [
      'à¸ªà¸·à¹ˆà¸­à¸ªà¸²à¸£à¹€à¸žà¸·à¹ˆà¸­à¸™à¸³à¸—à¸²à¸‡à¸¥à¸¹à¸�à¸„à¹‰à¸²à¹„à¸›à¸¢à¸±à¸‡à¹‚à¸•à¹Šà¸°à¸­à¸²à¸«à¸²à¸£à¸­à¸¢à¹ˆà¸²à¸‡à¸ªà¸¸à¸ à¸²à¸ž',
      'à¸�à¸¶à¸�à¸�à¸™à¸—à¸±à¸�à¸©à¸°à¸�à¸²à¸£à¸Šà¸§à¸™à¸„à¸¸à¸¢ (Small talk) à¹€à¸šà¸·à¹‰à¸­à¸‡à¸•à¹‰à¸™à¸­à¸¢à¹ˆà¸²à¸‡à¹€à¸›à¹‡à¸™à¸˜à¸£à¸£à¸¡à¸Šà¸²à¸•à¸´',
      'à¸ˆà¸±à¸”à¹€à¸•à¸£à¸µà¸¢à¸¡à¸„à¸³à¸žà¸¹à¸”à¹ƒà¸™à¸�à¸²à¸£à¸šà¸£à¸´à¸�à¸²à¸£à¸¥à¸¹à¸�à¸„à¹‰à¸²à¹�à¸¥à¸°à¸£à¸±à¸šà¸¡à¸·à¸­à¸„à¸³à¸‚à¸­à¸žà¸´à¹€à¸¨à¸©'
    ],
    missionIds: ['m1'],
    mediaUrl: '/images/wn-6.jpg',
    mediaType: 'image'
  },
  {
    id: 'w5',
    week: 5,
    title: 'Food Description (à¸�à¸²à¸£à¹�à¸™à¸°à¸™à¸³à¸£à¸²à¸¢à¸�à¸²à¸£à¸­à¸²à¸«à¸²à¸£)',
    description: 'à¸�à¸¶à¸�à¸�à¸™à¸�à¸²à¸£à¸­à¸˜à¸´à¸šà¸²à¸¢à¹�à¸¥à¸°à¹�à¸™à¸°à¸™à¸³à¸£à¸²à¸¢à¸�à¸²à¸£à¸­à¸²à¸«à¸²à¸£ à¸�à¸²à¸£à¸šà¸­à¸�à¸ªà¹ˆà¸§à¸™à¸œà¸ªà¸¡à¸«à¸¥à¸±à¸� à¸§à¸´à¸˜à¸µà¸�à¸²à¸£à¸›à¸£à¸¸à¸‡ à¹�à¸¥à¸°à¸ˆà¸¸à¸”à¹€à¸”à¹ˆà¸™à¸‚à¸­à¸‡à¹€à¸¡à¸™à¸¹à¹�à¸™à¸°à¸™à¸³à¹�à¸�à¹ˆà¸¥à¸¹à¸�à¸„à¹‰à¸²',
    objectives: [
      'à¹ƒà¸Šà¹‰à¸„à¸³à¸¨à¸±à¸žà¸—à¹Œà¹€à¸�à¸µà¹ˆà¸¢à¸§à¸�à¸±à¸šà¸£à¸ªà¸Šà¸²à¸•à¸´à¹�à¸¥à¸°à¸�à¸²à¸£à¸›à¸£à¸¸à¸‡à¸­à¸²à¸«à¸²à¸£à¹€à¸žà¸·à¹ˆà¸­à¸­à¸˜à¸´à¸šà¸²à¸¢à¹€à¸¡à¸™à¸¹',
      'à¸™à¸³à¹€à¸ªà¸™à¸­à¹€à¸¡à¸™à¸¹à¹�à¸™à¸°à¸™à¸³ (Chef\'s Recommendation) à¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¸™à¹ˆà¸²à¸”à¸¶à¸‡à¸”à¸¹à¸”',
      'à¸­à¸˜à¸´à¸šà¸²à¸¢à¸ªà¹ˆà¸§à¸™à¸œà¸ªà¸¡à¸«à¸¥à¸±à¸�à¹�à¸¥à¸°à¹�à¸ˆà¹‰à¸‡à¸ªà¸²à¸£à¸�à¹ˆà¸­à¸ à¸¹à¸¡à¸´à¹�à¸žà¹‰à¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¸–à¸¹à¸�à¸•à¹‰à¸­à¸‡'
    ],
    missionIds: ['m2'],
    mediaUrl: '/images/28.jpg',
    mediaType: 'image'
  },
  {
    id: 'w6',
    week: 6,
    title: 'Beverage Recommendation (à¸�à¸²à¸£à¹�à¸™à¸°à¸™à¸³à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡)',
    description: 'à¸�à¸¶à¸�à¹�à¸™à¸°à¸™à¸³à¹�à¸¥à¸°à¹€à¸ªà¸™à¸­à¸‚à¸²à¸¢à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡à¸›à¸£à¸°à¹€à¸ à¸—à¸•à¹ˆà¸²à¸‡à¹† à¸—à¸µà¹ˆà¸ˆà¸±à¸šà¸„à¸¹à¹ˆà¸�à¸±à¸šà¸­à¸²à¸«à¸²à¸£à¸ˆà¸²à¸™à¸«à¸¥à¸±à¸�à¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¹€à¸«à¸¡à¸²à¸°à¸ªà¸¡ (Beverage Pairing)',
    objectives: [
      'à¹�à¸™à¸°à¸™à¸³à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡à¸—à¸µà¹ˆà¹€à¸‚à¹‰à¸²à¸�à¸±à¸™à¹„à¸”à¹‰à¸”à¸µà¸�à¸±à¸šà¸­à¸²à¸«à¸²à¸£à¹�à¸•à¹ˆà¸¥à¸°à¸›à¸£à¸°à¹€à¸ à¸— (Wine pairing)',
      'à¸­à¸˜à¸´à¸šà¸²à¸¢à¸ˆà¸¸à¸”à¹€à¸”à¹ˆà¸™à¹�à¸¥à¸°à¸£à¸ªà¸Šà¸²à¸•à¸´à¸‚à¸­à¸‡à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡à¹�à¸�à¹‰à¸§à¸•à¹ˆà¸²à¸‡à¹† à¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¹€à¸›à¹‡à¸™à¸¡à¸·à¸­à¸­à¸²à¸Šà¸µà¸ž',
      'à¹€à¸ªà¸™à¸­à¸‚à¸²à¸¢à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡à¸žà¸´à¹€à¸¨à¸©à¹€à¸žà¸·à¹ˆà¸­à¹€à¸žà¸´à¹ˆà¸¡à¸¢à¸­à¸”à¸‚à¸²à¸¢à¹ƒà¸«à¹‰à¸�à¸±à¸šà¸«à¹‰à¸­à¸‡à¸­à¸²à¸«à¸²à¸£'
    ],
    missionIds: ['m3'],
    mediaUrl: '/images/22.jpg',
    mediaType: 'image'
  },
  {
    id: 'w7',
    week: 7,
    title: 'Taking Orders Pattern (à¹�à¸žà¸—à¹€à¸—à¸´à¸£à¹Œà¸™à¸�à¸²à¸£à¸£à¸±à¸šà¸­à¸­à¹€à¸”à¸­à¸£à¹Œ)',
    description: 'à¸�à¸¶à¸�à¸�à¸™à¸›à¸£à¸°à¹‚à¸¢à¸„à¸¡à¸²à¸•à¸£à¸�à¸²à¸™à¹�à¸¥à¸°à¹�à¸žà¸—à¹€à¸—à¸´à¸£à¹Œà¸™à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¸ªà¸³à¸«à¸£à¸±à¸šà¸�à¸²à¸£à¸£à¸±à¸šà¸­à¸­à¹€à¸”à¸­à¸£à¹Œà¸­à¸²à¸«à¸²à¸£à¹�à¸¥à¸°à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡ à¸�à¸²à¸£à¸—à¸§à¸™à¸­à¸­à¹€à¸”à¸­à¸£à¹Œ à¹�à¸¥à¸°à¸�à¸²à¸£à¸šà¸±à¸™à¸—à¸¶à¸�à¸­à¸­à¹€à¸”à¸­à¸£à¹Œà¸­à¸¢à¹ˆà¸²à¸‡à¸–à¸¹à¸�à¸•à¹‰à¸­à¸‡',
    objectives: [
      'à¹ƒà¸Šà¹‰à¸›à¸£à¸°à¹‚à¸¢à¸„à¸¡à¸²à¸•à¸£à¸�à¸²à¸™à¹ƒà¸™à¸�à¸²à¸£à¸ªà¸­à¸šà¸–à¸²à¸¡à¹€à¸žà¸·à¹ˆà¸­à¸£à¸±à¸šà¸­à¸­à¹€à¸”à¸­à¸£à¹Œà¸ˆà¸²à¸�à¸¥à¸¹à¸�à¸„à¹‰à¸²',
      'à¸�à¸¶à¸�à¸�à¸²à¸£à¸—à¸§à¸™à¸­à¸­à¹€à¸”à¸­à¸£à¹Œ (Order confirmation) à¹€à¸žà¸·à¹ˆà¸­à¸›à¹‰à¸­à¸‡à¸�à¸±à¸™à¸„à¸§à¸²à¸¡à¸œà¸´à¸”à¸žà¸¥à¸²à¸”',
      'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸£à¸¹à¸›à¹�à¸šà¸šà¹�à¸¥à¸°à¸£à¸°à¸šà¸šà¸¢à¹ˆà¸­à¹ƒà¸™à¸�à¸²à¸£à¸ˆà¸”à¸šà¸±à¸™à¸—à¸¶à¸�à¸­à¸­à¹€à¸”à¸­à¸£à¹Œ'
    ],
    missionIds: ['m2'],
    mediaUrl: '/images/24.jpg',
    mediaType: 'image'
  },
  {
    id: 'w8',
    week: 8,
    title: 'Order Taking Simulation (à¸ˆà¸³à¸¥à¸­à¸‡à¸�à¸²à¸£à¸£à¸±à¸šà¸­à¸­à¹€à¸”à¸­à¸£à¹Œà¸ˆà¸£à¸´à¸‡)',
    description: 'à¸�à¸²à¸£à¸ˆà¸³à¸¥à¸­à¸‡à¸ªà¸–à¸²à¸™à¸�à¸²à¸£à¸“à¹Œà¸�à¸²à¸£à¸›à¸�à¸´à¸šà¸±à¸•à¸´à¸‡à¸²à¸™à¸£à¸±à¸šà¸­à¸­à¹€à¸”à¸­à¸£à¹Œà¸ˆà¸²à¸�à¸¥à¸¹à¸�à¸„à¹‰à¸²à¹�à¸šà¸šà¹€à¸ªà¸¡à¸·à¸­à¸™à¸ˆà¸£à¸´à¸‡ à¹‚à¸”à¸¢à¹ƒà¸Šà¹‰à¹ƒà¸šà¸ªà¸±à¹ˆà¸‡à¸­à¸²à¸«à¸²à¸£à¹�à¸¥à¸°à¸ªà¸·à¹ˆà¸­à¸„à¸§à¸²à¸¡à¸ˆà¸£à¸´à¸‡à¹€à¸ªà¸¡à¸·à¸­à¸™à¹ƒà¸™à¸�à¸²à¸£à¸šà¸±à¸™à¸—à¸¶à¸�à¸‚à¹‰à¸­à¸¡à¸¹à¸¥',
    objectives: [
      'à¸›à¸�à¸´à¸šà¸±à¸•à¸´à¸‡à¸²à¸™à¸£à¸±à¸šà¸­à¸­à¹€à¸”à¸­à¸£à¹Œà¹�à¸¥à¸°à¸•à¸­à¸šà¸„à¸³à¸–à¸²à¸¡à¹€à¸�à¸µà¹ˆà¸¢à¸§à¸�à¸±à¸šà¸£à¸²à¸¢à¸�à¸²à¸£à¸­à¸²à¸«à¸²à¸£à¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¸¥à¸·à¹ˆà¸™à¹„à¸«à¸¥',
      'à¸›à¸£à¸°à¸¢à¸¸à¸�à¸•à¹Œà¹ƒà¸Šà¹‰à¹�à¸žà¸—à¹€à¸—à¸´à¸£à¹Œà¸™à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¹ƒà¸™à¸ªà¸–à¸²à¸™à¸�à¸²à¸£à¸“à¹Œà¸ˆà¸³à¸¥à¸­à¸‡à¸«à¸™à¹‰à¸²à¹‚à¸•à¹Šà¸°à¸­à¸²à¸«à¸²à¸£',
      'à¸ªà¸£à¸¸à¸›à¸„à¸§à¸²à¸¡à¸•à¹‰à¸­à¸‡à¸�à¸²à¸£à¸‚à¸­à¸‡à¸¥à¸¹à¸�à¸„à¹‰à¸²à¸¥à¸‡à¹ƒà¸™à¹ƒà¸šà¸ªà¸±à¹ˆà¸‡à¸­à¸²à¸«à¸²à¸£ (Order Sheet) à¹„à¸”à¹‰à¸–à¸¹à¸�à¸•à¹‰à¸­à¸‡'
    ],
    missionIds: ['m2'],
    mediaUrl: '/images/25.jpg',
    mediaType: 'image'
  },
  {
    id: 'w9',
    week: 9,
    title: 'à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸�à¸²à¸£à¹€à¸ªà¸´à¸£à¹Œà¸Ÿà¸­à¸²à¸«à¸²à¸£ (Food Serving)',
    description: 'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¹�à¸¥à¸°à¸—à¸´à¸¨à¸—à¸²à¸‡à¹ƒà¸™à¸�à¸²à¸£à¹€à¸ªà¸´à¸£à¹Œà¸Ÿà¸­à¸²à¸«à¸²à¸£à¸•à¸²à¸¡à¸¡à¸²à¸•à¸£à¸�à¸²à¸™à¸ªà¸²à¸�à¸¥ à¸�à¸²à¸£à¹€à¸ªà¸´à¸£à¹Œà¸Ÿà¸ˆà¸²à¸™à¸«à¸¥à¸±à¸� à¸ˆà¸²à¸™à¸ªà¸¥à¸±à¸” à¹�à¸¥à¸°à¸�à¸²à¸£à¹€à¸„à¸¥à¸µà¸¢à¸£à¹Œà¸ˆà¸²à¸™à¸—à¸µà¹ˆà¹ƒà¸Šà¹‰à¹�à¸¥à¹‰à¸§',
    objectives: [
      'à¸­à¸˜à¸´à¸šà¸²à¸¢à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸�à¸²à¸£à¹€à¸ªà¸´à¸£à¹Œà¸Ÿà¸­à¸²à¸«à¸²à¸£à¸ˆà¸²à¸�à¸”à¹‰à¸²à¸™à¸—à¸µà¹ˆà¸–à¸¹à¸�à¸•à¹‰à¸­à¸‡à¸•à¸²à¸¡à¸«à¸¥à¸±à¸�à¸ªà¸²à¸�à¸¥',
      'à¹ƒà¸Šà¹‰à¸›à¸£à¸°à¹‚à¸¢à¸„à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¸‚à¸“à¸°à¸™à¸³à¹€à¸ªà¸™à¸­à¸ˆà¸²à¸™à¸­à¸²à¸«à¸²à¸£à¹�à¸�à¹ˆà¸¥à¸¹à¸�à¸„à¹‰à¸²',
      'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸§à¸´à¸˜à¸µà¸�à¸²à¸£à¹€à¸„à¸¥à¸µà¸¢à¸£à¹Œà¹‚à¸•à¹Šà¸°à¸­à¸²à¸«à¸²à¸£ (Table clearing) à¸­à¸¢à¹ˆà¸²à¸‡à¸ªà¸¸à¸ à¸²à¸ž'
    ],
    missionIds: [],
    mediaUrl: '/images/26.jpg',
    mediaType: 'image'
  },
  {
    id: 'w10',
    week: 10,
    title: 'à¸�à¸²à¸£à¸šà¸£à¸´à¸�à¸²à¸£à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡ (Beverage Service)',
    description: 'à¸�à¸¶à¸�à¸›à¸�à¸´à¸šà¸±à¸•à¸´à¸�à¸²à¸£à¹€à¸ªà¸´à¸£à¹Œà¸Ÿà¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡à¸›à¸£à¸°à¹€à¸ à¸—à¸•à¹ˆà¸²à¸‡à¹† à¸—à¸±à¹‰à¸‡à¹�à¸šà¸šà¸£à¹‰à¸­à¸™à¹�à¸¥à¸°à¹€à¸¢à¹‡à¸™ à¸�à¸²à¸£à¸£à¸´à¸™à¹„à¸§à¸™à¹Œ à¸�à¸²à¸£à¸šà¸£à¸´à¸�à¸²à¸£à¸™à¹‰à¸³à¹€à¸›à¸¥à¹ˆà¸² à¹�à¸¥à¸°à¸�à¸²à¸£à¹ƒà¸Šà¹‰à¸­à¸¸à¸›à¸�à¸£à¸“à¹Œà¸ˆà¸£à¸´à¸‡à¸£à¹ˆà¸§à¸¡à¸�à¸±à¸š AR',
    objectives: [
      'à¸ªà¸·à¹ˆà¸­à¸ªà¸²à¸£à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¹�à¸¥à¸°à¸›à¸�à¸´à¸šà¸±à¸•à¸´à¸�à¸²à¸£à¹€à¸ªà¸´à¸£à¹Œà¸Ÿà¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡à¸•à¸²à¸¡à¸¥à¸³à¸”à¸±à¸šà¸„à¸§à¸²à¸¡à¸ªà¸³à¸„à¸±à¸�',
      'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸§à¸´à¸˜à¸µà¸�à¸²à¸£à¸ˆà¸±à¸šà¹�à¸�à¹‰à¸§à¹�à¸¥à¸°à¸�à¸²à¸£à¸£à¸´à¸™à¸™à¹‰à¸³à¹€à¸›à¸¥à¹ˆà¸²à¸«à¸£à¸·à¸­à¹„à¸§à¸™à¹Œà¸—à¸µà¹ˆà¸–à¸¹à¸�à¸•à¹‰à¸­à¸‡',
      'à¸�à¸¶à¸�à¸—à¸±à¸�à¸©à¸°à¸�à¸²à¸£à¸›à¸£à¸°à¸ªà¸²à¸™à¸‡à¸²à¸™à¹�à¸¥à¸°à¸ˆà¸±à¸‡à¸«à¸§à¸°à¹€à¸§à¸¥à¸²à¹ƒà¸™à¸�à¸²à¸£à¹€à¸ªà¸´à¸£à¹Œà¸Ÿà¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡'
    ],
    missionIds: ['m3'],
    mediaUrl: '/images/23.jpg',
    mediaType: 'image'
  },
  {
    id: 'w11',
    week: 11,
    title: 'Gueridon Service (à¸�à¸²à¸£à¸šà¸£à¸´à¸�à¸²à¸£à¹�à¸šà¸šà¸£à¸–à¹€à¸‚à¹‡à¸™)',
    description: 'à¸¨à¸¶à¸�à¸©à¸²à¹�à¸¥à¸°à¸—à¸³à¸„à¸§à¸²à¸¡à¹€à¸‚à¹‰à¸²à¹ƒà¸ˆà¹€à¸�à¸µà¹ˆà¸¢à¸§à¸�à¸±à¸šà¸�à¸²à¸£à¸šà¸£à¸´à¸�à¸²à¸£à¸­à¸²à¸«à¸²à¸£à¸‚à¹‰à¸²à¸‡à¹‚à¸•à¹Šà¸°à¸¥à¸¹à¸�à¸„à¹‰à¸²à¹‚à¸”à¸¢à¹ƒà¸Šà¹‰à¸£à¸–à¹€à¸‚à¹‡à¸™à¹€à¸�à¸­à¸£à¸´à¸”à¸­à¸‡ (Gueridon) à¸•à¸±à¹‰à¸‡à¹�à¸•à¹ˆà¸�à¸²à¸£à¹€à¸•à¸£à¸µà¸¢à¸¡à¸§à¸±à¸•à¸–à¸¸à¸”à¸´à¸š à¸�à¸²à¸£à¸›à¸£à¸¸à¸‡ à¹�à¸¥à¸°à¸�à¸²à¸£à¸ˆà¸±à¸”à¸ˆà¸²à¸™',
    objectives: [
      'à¹€à¸‚à¹‰à¸²à¹ƒà¸ˆà¸«à¸¥à¸±à¸�à¸�à¸²à¸£à¹€à¸šà¸·à¹‰à¸­à¸‡à¸•à¹‰à¸™à¸‚à¸­à¸‡à¸�à¸²à¸£à¸›à¸£à¸¸à¸‡à¸­à¸²à¸«à¸²à¸£à¸‚à¹‰à¸²à¸‡à¹‚à¸•à¹Šà¸° (FlambÃ© or Carving)',
      'à¸­à¸˜à¸´à¸šà¸²à¸¢à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸�à¸²à¸£à¹ƒà¸Šà¹‰à¸£à¸–à¹€à¸‚à¹‡à¸™à¹€à¸�à¸­à¸£à¸´à¸”à¸­à¸‡à¹€à¸›à¹‡à¸™à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©',
      'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸§à¸´à¸˜à¸µà¸�à¸²à¸£à¸—à¸³à¸‡à¸²à¸™à¸£à¹ˆà¸§à¸¡à¸�à¸±à¸™à¹€à¸›à¹‡à¸™à¸—à¸µà¸¡à¹ƒà¸™à¸�à¸²à¸£à¹€à¸ªà¸´à¸£à¹Œà¸Ÿà¹�à¸šà¸šà¹€à¸�à¸­à¸£à¸´à¸”à¸­à¸‡'
    ],
    missionIds: [],
    mediaUrl: '/images/19.jpg',
    mediaType: 'image'
  },
  {
    id: 'w12',
    week: 12,
    title: 'Room Service Procedure (à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸�à¸²à¸£à¸šà¸£à¸´à¸�à¸²à¸£à¸šà¸™à¸«à¹‰à¸­à¸‡à¸žà¸±à¸�)',
    description: 'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸§à¸´à¸˜à¸µà¸�à¸²à¸£à¸£à¸±à¸šà¸­à¸­à¹€à¸”à¸­à¸£à¹Œà¸—à¸²à¸‡à¹‚à¸—à¸£à¸¨à¸±à¸žà¸—à¹Œà¹�à¸¥à¸°à¸�à¸²à¸£à¸‚à¸¶à¹‰à¸™à¹„à¸›à¸šà¸£à¸´à¸�à¸²à¸£à¸­à¸²à¸«à¸²à¸£à¹�à¸¥à¸°à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡à¹�à¸�à¹ˆà¸œà¸¹à¹‰à¹€à¸‚à¹‰à¸²à¸žà¸±à¸�à¹ƒà¸™à¸«à¹‰à¸­à¸‡à¸žà¸±à¸� (In-Room Dining)',
    objectives: [
      'à¸£à¸±à¸šà¸­à¸­à¹€à¸”à¸­à¸£à¹Œà¸—à¸²à¸‡à¹‚à¸—à¸£à¸¨à¸±à¸žà¸—à¹Œà¸”à¹‰à¸§à¸¢à¸™à¹‰à¸³à¹€à¸ªà¸µà¸¢à¸‡à¹�à¸¥à¸°à¸›à¸£à¸°à¹‚à¸¢à¸„à¸—à¸µà¹ˆà¹€à¸›à¹‡à¸™à¸¡à¸·à¸­à¸­à¸²à¸Šà¸µà¸ž',
      'à¸•à¸£à¸§à¸ˆà¸ªà¸­à¸šà¹�à¸¥à¸°à¸ˆà¸±à¸”à¸–à¸²à¸”à¸­à¸²à¸«à¸²à¸£à¸ªà¸³à¸«à¸£à¸±à¸šà¸‚à¸¶à¹‰à¸™à¸šà¸£à¸´à¸�à¸²à¸£à¸šà¸™à¸«à¹‰à¸­à¸‡à¸žà¸±à¸�à¸­à¸¢à¹ˆà¸²à¸‡à¹€à¸£à¸µà¸¢à¸šà¸£à¹‰à¸­à¸¢',
      'à¸›à¸�à¸´à¸šà¸±à¸•à¸´à¸�à¸²à¸£à¹€à¸„à¸²à¸°à¸›à¸£à¸°à¸•à¸¹ à¹�à¸™à¸°à¸™à¸³à¸•à¸±à¸§ à¹�à¸¥à¸°à¹€à¸ªà¸´à¸£à¹Œà¸Ÿà¸­à¸²à¸«à¸²à¸£à¹ƒà¸™à¸«à¹‰à¸­à¸‡à¸žà¸±à¸�à¸‚à¸­à¸‡à¸¥à¸¹à¸�à¸„à¹‰à¸²'
    ],
    missionIds: [],
    mediaUrl: '/images/n-13.jpg',
    mediaType: 'image'
  },
  {
    id: 'w13',
    week: 13,
    title: 'Billing Vocabulary (à¸„à¸³à¸¨à¸±à¸žà¸—à¹Œà¸�à¸²à¸£à¸Šà¸³à¸£à¸°à¹€à¸‡à¸´à¸™)',
    description: 'à¸¨à¸¶à¸�à¸©à¸²à¸›à¸£à¸°à¹‚à¸¢à¸„à¹�à¸¥à¸°à¸„à¸³à¸¨à¸±à¸žà¸—à¹Œà¹€à¸�à¸µà¹ˆà¸¢à¸§à¸�à¸±à¸šà¸�à¸²à¸£à¸„à¸´à¸”à¹€à¸‡à¸´à¸™ à¸�à¸²à¸£à¹�à¸¢à¸�à¸šà¸´à¸¥ à¸�à¸²à¸£à¸Šà¸³à¸£à¸°à¸”à¹‰à¸§à¸¢à¸šà¸±à¸•à¸£à¹€à¸„à¸£à¸”à¸´à¸• à¸«à¸£à¸·à¸­à¹€à¸‡à¸´à¸™à¸ªà¸” à¸•à¸¥à¸­à¸”à¸ˆà¸™à¸�à¸²à¸£à¸—à¸³à¸„à¸§à¸²à¸¡à¹€à¸‚à¹‰à¸²à¹ƒà¸ˆà¸„à¹ˆà¸²à¸šà¸£à¸´à¸�à¸²à¸£à¹�à¸¥à¸°à¸ à¸²à¸©à¸µà¸¡à¸¹à¸¥à¸„à¹ˆà¸²à¹€à¸žà¸´à¹ˆà¸¡',
    objectives: [
      'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸„à¸³à¸¨à¸±à¸žà¸—à¹Œà¹€à¸�à¸µà¹ˆà¸¢à¸§à¸�à¸±à¸šà¹ƒà¸šà¹€à¸ªà¸£à¹‡à¸ˆ à¸ à¸²à¸©à¸µ (VAT) à¹�à¸¥à¸°à¸„à¹ˆà¸²à¸šà¸£à¸´à¸�à¸²à¸£ (Service Charge)',
      'à¸�à¸¶à¸�à¸ªà¸™à¸—à¸™à¸²à¹€à¸¡à¸·à¹ˆà¸­à¸¥à¸¹à¸�à¸„à¹‰à¸²à¸‚à¸­à¹€à¸Šà¹‡à¸„à¸šà¸´à¸¥à¹�à¸¥à¸°à¸‚à¸­à¸„à¸³à¸Šà¸µà¹‰à¹�à¸ˆà¸‡à¹€à¸�à¸µà¹ˆà¸¢à¸§à¸�à¸±à¸šà¸£à¸²à¸¢à¸�à¸²à¸£à¹ƒà¸™à¹ƒà¸šà¹€à¸ªà¸£à¹‡à¸ˆ',
      'à¹�à¸�à¹‰à¸›à¸±à¸�à¸«à¸²à¹€à¸¡à¸·à¹ˆà¸­à¸¡à¸µà¸�à¸²à¸£à¸—à¸±à¸�à¸—à¹‰à¸§à¸‡à¹€à¸£à¸·à¹ˆà¸­à¸‡à¸£à¸²à¸„à¸²à¸«à¸£à¸·à¸­à¸¢à¸­à¸”à¹€à¸‡à¸´à¸™à¹„à¸¡à¹ˆà¸–à¸¹à¸�à¸•à¹‰à¸­à¸‡'
    ],
    missionIds: [],
    mediaUrl: '/images/29.jpg',
    mediaType: 'image'
  },
  {
    id: 'w14',
    week: 14,
    title: 'Closing Service (à¸�à¸²à¸£à¸›à¸´à¸”à¸�à¸²à¸£à¸šà¸£à¸´à¸�à¸²à¸£)',
    description: 'à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸ªà¸¸à¸”à¸—à¹‰à¸²à¸¢à¸‚à¸­à¸‡à¸�à¸²à¸£à¸•à¹‰à¸­à¸™à¸£à¸±à¸š à¸�à¸²à¸£à¸¥à¸²à¸¥à¸¹à¸�à¸„à¹‰à¸² à¸�à¸²à¸£à¸­à¸§à¸¢à¸žà¸£à¹ƒà¸«à¹‰à¹€à¸”à¸´à¸™à¸—à¸²à¸‡à¸›à¸¥à¸­à¸”à¸ à¸±à¸¢ à¹�à¸¥à¸°à¸�à¸²à¸£à¸ˆà¸±à¸”à¹€à¸•à¸£à¸µà¸¢à¸¡à¹‚à¸•à¹Šà¸°à¸ªà¸³à¸«à¸£à¸±à¸šà¸£à¸­à¸šà¸–à¸±à¸”à¹„à¸›',
    objectives: [
      'à¸�à¸¥à¹ˆà¸²à¸§à¸‚à¸­à¸šà¸„à¸¸à¸“à¹�à¸¥à¸°à¸­à¸§à¸¢à¸žà¸£à¸¥à¸¹à¸�à¸„à¹‰à¸² (Farewell standard phrases) à¸­à¸¢à¹ˆà¸²à¸‡à¸ˆà¸£à¸´à¸‡à¹ƒà¸ˆ',
      'à¸ªà¸­à¸šà¸–à¸²à¸¡à¸„à¸§à¸²à¸¡à¸žà¸¶à¸‡à¸žà¸­à¹ƒà¸ˆà¹‚à¸”à¸¢à¸£à¸§à¸¡ of à¸¥à¸¹à¸�à¸„à¹‰à¸² (Feedback request) à¹€à¸›à¹‡à¸™à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©',
      'à¸›à¸�à¸´à¸šà¸±à¸•à¸´à¸‡à¸²à¸™à¸ªà¹ˆà¸‡à¸¥à¸¹à¸�à¸„à¹‰à¸²à¸­à¸­à¸�à¸ˆà¸²à¸�à¸£à¹‰à¸²à¸™à¸­à¸¢à¹ˆà¸²à¸‡à¸­à¸šà¸­à¸¸à¹ˆà¸™à¹�à¸¥à¸°à¸ªà¸£à¹‰à¸²à¸‡à¸„à¸§à¸²à¸¡à¸ªà¸±à¸¡à¸žà¸±à¸™à¸˜à¹Œà¸—à¸µà¹ˆà¸”à¸µ'
    ],
    missionIds: [],
    mediaUrl: '/images/29.jpg',
    mediaType: 'image'
  },
  {
    id: 'w15',
    week: 15,
    title: 'Complaint Handling (à¸�à¸²à¸£à¸ˆà¸±à¸”à¸�à¸²à¸£à¸‚à¹‰à¸­à¸£à¹‰à¸­à¸‡à¹€à¸£à¸µà¸¢à¸™)',
    description: 'à¸�à¸¶à¸�à¸�à¸™à¸�à¸²à¸£à¹�à¸�à¹‰à¹„à¸‚à¸›à¸±à¸�à¸«à¸²à¹€à¸¡à¸·à¹ˆà¸­à¹€à¸ˆà¸­à¸¥à¸¹à¸�à¸„à¹‰à¸²à¸—à¸µà¹ˆà¹„à¸¡à¹ˆà¸žà¸­à¹ƒà¸ˆà¸­à¸²à¸«à¸²à¸£ à¸šà¸£à¸´à¸�à¸²à¸£ à¸«à¸£à¸·à¸­à¸„à¸§à¸²à¸¡à¸¥à¹ˆà¸²à¸Šà¹‰à¸² à¹‚à¸”à¸¢à¹ƒà¸Šà¹‰à¸«à¸¥à¸±à¸�à¸�à¸²à¸£à¸Ÿà¸±à¸‡à¸­à¸¢à¹ˆà¸²à¸‡à¹€à¸«à¹‡à¸™à¸­à¸�à¹€à¸«à¹‡à¸™à¹ƒà¸ˆ (Empathy) à¹�à¸¥à¸°à¸«à¸²à¸—à¸²à¸‡à¸­à¸­à¸�',
    objectives: [
      'à¹ƒà¸Šà¹‰à¸«à¸¥à¸±à¸� LAST (Listen, Apologize, Solve, Thank) à¹€à¸žà¸·à¹ˆà¸­à¹�à¸�à¹‰à¸›à¸±à¸�à¸«à¸²à¸‚à¹‰à¸­à¸£à¹‰à¸­à¸‡à¹€à¸£à¸µà¸¢à¸™',
      'à¹ƒà¸Šà¹‰à¸›à¸£à¸°à¹‚à¸¢à¸„à¸‚à¸­à¸­à¸ à¸±à¸¢à¸­à¸¢à¹ˆà¸²à¸‡à¹€à¸›à¹‡à¸™à¸—à¸²à¸‡à¸�à¸²à¸£à¸ªà¸³à¸«à¸£à¸±à¸šà¸„à¸§à¸²à¸¡à¸¥à¹ˆà¸²à¸Šà¹‰à¸²à¸«à¸£à¸·à¸­à¸„à¸§à¸²à¸¡à¸œà¸´à¸”à¸žà¸¥à¸²à¸”',
      'à¸£à¸°à¸‡à¸±à¸šà¸­à¸²à¸£à¸¡à¸“à¹Œà¹�à¸¥à¸°à¹€à¸ˆà¸£à¸ˆà¸²à¹‚à¸•à¹‰à¸•à¸­à¸šà¸�à¸±à¸šà¸¥à¸¹à¸�à¸„à¹‰à¸²à¸­à¸¢à¹ˆà¸²à¸‡à¹ƒà¸ˆà¹€à¸¢à¹‡à¸™à¹�à¸¥à¸°à¹€à¸›à¹‡à¸™à¸¡à¸·à¸­à¸­à¸²à¸Šà¸µà¸ž'
    ],
    missionIds: [],
    mediaUrl: '/images/27.jpg',
    mediaType: 'image'
  },
  {
    id: 'w16',
    week: 16,
    title: 'Service Recovery (à¸�à¸²à¸£à¸Ÿà¸·à¹‰à¸™à¸Ÿà¸¹à¸„à¸§à¸²à¸¡à¸žà¸¶à¸‡à¸žà¸­à¹ƒà¸ˆ)',
    description: 'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¹�à¸™à¸§à¸—à¸²à¸‡à¸�à¸²à¸£à¸Šà¸”à¹€à¸Šà¸¢à¹€à¸žà¸·à¹ˆà¸­à¸�à¸¹à¹‰à¸„à¸·à¸™à¸„à¸§à¸²à¸¡à¸žà¸¶à¸‡à¸žà¸­à¹ƒà¸ˆà¸‚à¸­à¸‡à¸¥à¸¹à¸�à¸„à¹‰à¸² à¹€à¸Šà¹ˆà¸™ à¸�à¸²à¸£à¹�à¸–à¸¡à¸‚à¸­à¸‡à¸«à¸§à¸²à¸™ à¸�à¸²à¸£à¸¥à¸”à¸£à¸²à¸„à¸² à¸«à¸£à¸·à¸­à¸�à¸²à¸£à¸­à¸±à¸›à¹€à¸�à¸£à¸”à¸šà¸£à¸´à¸�à¸²à¸£ à¸žà¸£à¹‰à¸­à¸¡à¸�à¸²à¸£à¸šà¸±à¸™à¸—à¸¶à¸�à¸£à¸²à¸¢à¸‡à¸²à¸™',
    objectives: [
      'à¹€à¸ªà¸™à¸­à¸—à¸²à¸‡à¹€à¸¥à¸·à¸­à¸�à¸�à¸²à¸£à¸Šà¸”à¹€à¸Šà¸¢ (Service recovery compensation) à¸­à¸¢à¹ˆà¸²à¸‡à¹€à¸«à¸¡à¸²à¸°à¸ªà¸¡',
      'à¹€à¸ˆà¸£à¸ˆà¸²à¹€à¸žà¸·à¹ˆà¸­à¹€à¸›à¸¥à¸µà¹ˆà¸¢à¸™à¸—à¸±à¸¨à¸™à¸„à¸•à¸´à¸‚à¸­à¸‡à¸¥à¸¹à¸�à¸„à¹‰à¸²à¹ƒà¸«à¹‰à¸�à¸¥à¸±à¸šà¸¡à¸²à¸£à¸¹à¹‰à¸ªà¸¶à¸�à¸”à¸µà¸�à¸±à¸šà¸«à¹‰à¸­à¸‡à¸­à¸²à¸«à¸²à¸£',
      'à¹€à¸£à¸µà¸¢à¸™à¸£à¸¹à¹‰à¸§à¸´à¸˜à¸µà¸ªà¸£à¸¸à¸›à¹�à¸¥à¸°à¸šà¸±à¸™à¸—à¸¶à¸�à¸£à¸²à¸¢à¸‡à¸²à¸™à¹€à¸«à¸•à¸¸à¸�à¸²à¸£à¸“à¹Œà¹€à¸žà¸·à¹ˆà¸­à¸ªà¹ˆà¸‡à¸•à¹ˆà¸­à¹ƒà¸«à¹‰à¸«à¸±à¸§à¸«à¸™à¹‰à¸²à¸‡à¸²à¸™'
    ],
    missionIds: [],
    mediaUrl: '/images/27.jpg',
    mediaType: 'image'
  },
  {
    id: 'w17',
    week: 17,
    title: 'Integrated Restaurant Service (à¸šà¸¹à¸£à¸“à¸²à¸�à¸²à¸£à¸šà¸£à¸´à¸�à¸²à¸£à¸£à¹‰à¸²à¸™à¸­à¸²à¸«à¸²à¸£à¹�à¸šà¸š FINE Model)',
    description: 'à¸�à¸²à¸£à¸£à¸§à¸¡à¸—à¸±à¸�à¸©à¸°à¸•à¸±à¹‰à¸‡à¹�à¸•à¹ˆà¸ªà¸±à¸›à¸”à¸²à¸«à¹Œà¹�à¸£à¸�à¸ˆà¸™à¸–à¸¶à¸‡à¸›à¸±à¸ˆà¸ˆà¸¸à¸šà¸±à¸™ à¸›à¸�à¸´à¸šà¸±à¸•à¸´à¸‡à¸²à¸™à¹�à¸šà¸šà¸„à¸£à¸šà¸§à¸‡à¸ˆà¸£à¸•à¸²à¸¡à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™ FINE Model (Familiarize, Interact, Navigate, Exhibit)',
    objectives: [
      'F - Familiarize: à¸—à¸šà¸—à¸§à¸™à¸­à¸‡à¸„à¹Œà¸„à¸§à¸²à¸¡à¸£à¸¹à¹‰à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”à¸œà¹ˆà¸²à¸™ AR Restaurant Simulation',
      'I - Interact: à¹�à¸šà¹ˆà¸‡à¸�à¸¥à¸¸à¹ˆà¸¡à¸›à¸�à¸´à¸šà¸±à¸•à¸´à¸ªà¸¥à¸±à¸šà¸šà¸—à¸šà¸²à¸—à¸žà¸™à¸±à¸�à¸‡à¸²à¸™ (Host, Waiter, Cashier) à¹�à¸¥à¸°à¸¥à¸¹à¸�à¸„à¹‰à¸²',
      'N - Navigate: à¹�à¸�à¹‰à¹„à¸‚à¸ªà¸–à¸²à¸™à¸�à¸²à¸£à¸“à¹Œà¸—à¹‰à¸²à¸—à¸²à¸¢à¹€à¸‰à¸žà¸²à¸°à¸«à¸™à¹‰à¸² à¹€à¸Šà¹ˆà¸™ à¸¥à¸¹à¸�à¸„à¹‰à¸²à¹�à¸žà¹‰à¸­à¸²à¸«à¸²à¸£à¸«à¸£à¸·à¸­à¸‚à¸­à¹�à¸¢à¸�à¸šà¸´à¸¥',
      'E - Exhibit: à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸ªà¸¡à¸£à¸£à¸–à¸™à¸°à¸„à¸£à¸šà¸§à¸‡à¸ˆà¸£ à¹�à¸¥à¸°à¸ˆà¸±à¸”à¸—à¸³ Portfolio / Reflection Report'
    ],
    missionIds: ['m1', 'm2', 'm3'],
    mediaUrl: '/images/wn-3.jpg',
    mediaType: 'image'
  },
  {
    id: 'w18',
    week: 18,
    title: 'à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸ªà¸¡à¸£à¸£à¸–à¸™à¸°à¸›à¸¥à¸²à¸¢à¸ à¸²à¸„ (Final Performance Assessment)',
    description: 'à¸�à¸²à¸£à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸œà¸¥à¸ªà¸¡à¸£à¸£à¸–à¸™à¸°à¸�à¸²à¸£à¸›à¸�à¸´à¸šà¸±à¸•à¸´à¸‡à¸²à¸™à¸ˆà¸£à¸´à¸‡à¹ƒà¸™à¸«à¹‰à¸­à¸‡à¸­à¸²à¸«à¸²à¸£à¸ˆà¸³à¸¥à¸­à¸‡ à¹‚à¸”à¸¢à¸£à¸±à¸šà¹‚à¸ˆà¸—à¸¢à¹Œà¸ªà¸–à¸²à¸™à¸�à¸²à¸£à¸“à¹Œà¸ˆà¸£à¸´à¸‡à¹€à¸žà¸·à¹ˆà¸­à¸—à¸”à¸ªà¸­à¸šà¸„à¸§à¸²à¸¡à¹€à¸›à¹‡à¸™à¸¡à¸·à¸­à¸­à¸²à¸Šà¸µà¸žà¸•à¸²à¸¡à¹€à¸�à¸“à¸‘à¹Œ Rubric 4 à¸£à¸°à¸”à¸±à¸š',
    objectives: [
      'à¹�à¸ªà¸”à¸‡à¸ªà¸¡à¸£à¸£à¸–à¸™à¸°à¸•à¸²à¸¡à¸¡à¸²à¸•à¸£à¸�à¸²à¸™à¸­à¸²à¸Šà¸µà¸žà¸�à¸²à¸£à¸šà¸£à¸´à¸�à¸²à¸£à¸­à¸²à¸«à¸²à¸£à¹�à¸¥à¸°à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡',
      'à¸ªà¸·à¹ˆà¸­à¸ªà¸²à¸£à¸ à¸²à¸©à¸²à¸­à¸±à¸‡à¸�à¸¤à¸©à¹‚à¸•à¹‰à¸•à¸­à¸šà¹ƒà¸™à¸ªà¸–à¸²à¸™à¸�à¸²à¸£à¸“à¹Œà¸—à¹‰à¸²à¸—à¸²à¸¢à¹„à¸”à¹‰à¸­à¸¢à¹ˆà¸²à¸‡à¸„à¸¥à¹ˆà¸­à¸‡à¹�à¸„à¸¥à¹ˆà¸§à¹�à¸¥à¸°à¸¡à¸±à¹ˆà¸™à¹ƒà¸ˆ',
      'à¹„à¸”à¹‰à¸£à¸±à¸šà¸�à¸²à¸£à¸›à¸£à¸°à¹€à¸¡à¸´à¸™à¸œà¸¥à¸ªà¸±à¸¡à¸¤à¸—à¸˜à¸´à¹Œà¸£à¸°à¸”à¸±à¸šà¸”à¸µà¹€à¸¢à¸µà¹ˆà¸¢à¸¡-à¸”à¸µ-à¸žà¸­à¹ƒà¸Šà¹‰-à¸›à¸£à¸±à¸šà¸›à¸£à¸¸à¸‡ à¸•à¸²à¸¡à¹€à¸�à¸“à¸‘à¹Œà¸�à¸²à¸£à¸›à¸£à¸°à¹€à¸¡à¸´à¸™'
    ],
    missionIds: ['m1', 'm2', 'm3', 'm4'],
    mediaUrl: '/images/13.jpg',
    mediaType: 'image'
  }
];

export const VOCABULARIES_INITIAL = [
  {
    id: 'v1',
    word: 'Plate',
    phonetic: '/pleÉªt/',
    definition: 'A flat dish, typically circular, from which food is served or eaten.',
    translation: 'à¸ˆà¸²à¸™',
    imageUrl: '/vocabulary/plate.png',
    week: 1
  },
  {
    id: 'v2',
    word: 'Fork',
    phonetic: '/fÉ”Ë�k/',
    definition: 'A pronged eating utensil used for lifting food to the mouth or holding it when cutting.',
    translation: 'à¸ªà¹‰à¸­à¸¡',
    imageUrl: '/vocabulary/fork.png',
    week: 1
  },
  {
    id: 'v3',
    word: 'Spoon',
    phonetic: '/spuË�n/',
    definition: 'A utensil consisting of a small, shallow bowl on a handle, used for eating or serving liquid foods.',
    translation: 'à¸Šà¹‰à¸­à¸™',
    imageUrl: '/vocabulary/spoon.png',
    week: 1
  },
  {
    id: 'v4',
    word: 'Knife',
    phonetic: '/naÉªf/',
    definition: 'An instrument with a sharp blade fixed in a handle, used for cutting food at the table.',
    translation: 'à¸¡à¸µà¸”',
    imageUrl: '/vocabulary/knife.png',
    week: 1
  },
  {
    id: 'v5',
    word: 'Wine Glass',
    phonetic: '/waÉªn É¡lÉ‘Ë�s/',
    definition: 'A glass container with a stem and a bowl, designed specifically for drinking wine.',
    translation: 'à¹�à¸�à¹‰à¸§à¹„à¸§à¸™à¹Œ',
    imageUrl: '/vocabulary/wineglass.png',
    week: 1
  },
  {
    id: 'v5_napkin',
    word: 'Napkin',
    phonetic: '/ËˆnÃ¦p.kÉªn/',
    definition: 'A square piece of cloth or paper used at a meal to wipe the fingers or lips and to protect the clothes.',
    translation: 'à¸œà¹‰à¸²à¹€à¸Šà¹‡à¸”à¸›à¸²à¸�',
    imageUrl: '/vocabulary/napkin.png',
    week: 1
  },
  {
    id: 'v6',
    word: 'Appetizer',
    phonetic: '/ËˆÃ¦p.É™.taÉª.zÉ™r/',
    definition: 'A small dish of food or a drink taken before a meal to stimulate the appetite.',
    translation: 'à¸­à¸²à¸«à¸²à¸£à¹€à¸£à¸µà¸¢à¸�à¸™à¹‰à¸³à¸¢à¹ˆà¸­à¸¢',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v7',
    word: 'Main Course',
    phonetic: '/meÉªn kÉ”Ë�s/',
    definition: 'The primary or most substantial dish of a meal, typically served after the appetizer.',
    translation: 'à¸­à¸²à¸«à¸²à¸£à¸ˆà¸²à¸™à¸«à¸¥à¸±à¸�',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v8',
    word: 'Beverage',
    phonetic: '/Ëˆbev.É™r.ÉªdÊ’/',
    definition: 'A drink other than water, such as tea, coffee, wine, or beer.',
    translation: 'à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v9',
    word: 'Dessert',
    phonetic: '/dÉªËˆzÉœË�t/',
    definition: 'A sweet course eaten at the end of a meal.',
    translation: 'à¸‚à¸­à¸‡à¸«à¸§à¸²à¸™',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v9_salad',
    word: 'Salad',
    phonetic: '/ËˆsÃ¦l.É™d/',
    definition: 'A cold dish of various mixtures of raw or cooked vegetables, usually served with dressing.',
    translation: 'à¸ªà¸¥à¸±à¸”',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v9_soup',
    word: 'Soup',
    phonetic: '/suË�p/',
    definition: 'A liquid dish made by boiling meat, fish, or vegetables in stock or water.',
    translation: 'à¸‹à¸¸à¸›',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v10',
    word: 'Reservation',
    phonetic: '/ËŒrez.É™ËˆveÉª.ÊƒÉ™n/',
    definition: 'An arrangement to lock a table in a restaurant in advance.',
    translation: 'à¸�à¸²à¸£à¸ªà¸³à¸£à¸­à¸‡à¸—à¸µà¹ˆà¸™à¸±à¹ˆà¸‡',
    imageUrl: '',
    week: 3
  },
  {
    id: 'v11',
    word: 'Greeting',
    phonetic: '/ËˆÉ¡riË�.tÉªÅ‹/',
    definition: 'Polite words or sign of welcome when meeting someone.',
    translation: 'à¸�à¸²à¸£à¸—à¸±à¸�à¸—à¸²à¸¢',
    imageUrl: '',
    week: 3
  },
  {
    id: 'v11_welcoming',
    word: 'Welcoming',
    phonetic: '/Ëˆwel.kÉ™.mÉªÅ‹/',
    definition: 'The act of greeting and receiving guests warmly upon their arrival.',
    translation: 'à¸�à¸²à¸£à¸•à¹‰à¸­à¸™à¸£à¸±à¸š',
    imageUrl: '',
    week: 3
  },
  {
    id: 'v11_smalltalk',
    word: 'Small Talk',
    phonetic: '/smÉ”Ë�l tÉ”Ë�k/',
    definition: 'Polite, friendly, and informal conversation about light or general topics.',
    translation: 'à¸�à¸²à¸£à¸ªà¸™à¸—à¸™à¸²à¸Šà¸§à¸™à¸„à¸¸à¸¢à¹€à¸£à¸·à¹ˆà¸­à¸‡à¸—à¸±à¹ˆà¸§à¹„à¸›',
    imageUrl: '',
    week: 3
  },
  {
    id: 'v12',
    word: 'Escort',
    phonetic: '/ÉªËˆskÉ”Ë�t/',
    definition: 'To accompany guests to their assigned tables or seats.',
    translation: 'à¸�à¸²à¸£à¸™à¸³à¸—à¸²à¸‡ / à¸�à¸²à¸£à¹€à¸”à¸´à¸™à¸™à¸³',
    imageUrl: '',
    week: 4
  },
  {
    id: 'v5_special',
    word: "Chef's Special",
    phonetic: '/Êƒefs ËˆspeÊƒ.É™l/',
    definition: 'A dish highlighted by the chef for the day, often showcasing seasonal ingredients.',
    translation: 'à¸£à¸²à¸¢à¸�à¸²à¸£à¸­à¸²à¸«à¸²à¸£à¹�à¸™à¸°à¸™à¸³à¸žà¸´à¹€à¸¨à¸©à¸‚à¸­à¸‡à¹€à¸Šà¸Ÿ',
    imageUrl: '',
    week: 5
  },
  {
    id: 'v5_recommend',
    word: 'Recommend',
    phonetic: '/ËŒrek.É™Ëˆmend/',
    definition: 'To suggest a dish or drink as being good or suitable for the guest.',
    translation: 'à¹�à¸™à¸°à¸™à¸³',
    imageUrl: '',
    week: 5
  },
  {
    id: 'v5_ingredient',
    word: 'Ingredient',
    phonetic: '/ÉªnËˆÉ¡riË�.di.É™nt/',
    definition: 'Any of the foods or substances that are combined to make a particular dish.',
    translation: 'à¸ªà¹ˆà¸§à¸™à¸œà¸ªà¸¡ / à¸§à¸±à¸•à¸–à¸¸à¸”à¸´à¸š',
    imageUrl: '',
    week: 5
  },
  {
    id: 'v5_allergy',
    word: 'Allergy',
    phonetic: '/ËˆÃ¦l.É™.dÊ’i/',
    definition: 'A medical condition that causes a reaction when a person eats certain foods.',
    translation: 'à¸­à¸²à¸�à¸²à¸£à¹�à¸žà¹‰à¸­à¸²à¸«à¸²à¸£',
    imageUrl: '',
    week: 5
  },
  {
    id: 'v5_upsell',
    word: 'Upsell',
    phonetic: '/ËŒÊŒpËˆsel/',
    definition: 'To persuade a customer to buy something additional or more expensive.',
    translation: 'à¹€à¸ªà¸™à¸­à¸‚à¸²à¸¢à¹€à¸žà¸´à¹ˆà¸¡à¹€à¸•à¸´à¸¡ (à¹€à¸žà¸·à¹ˆà¸­à¹€à¸žà¸´à¹ˆà¸¡à¸¢à¸­à¸”à¸‚à¸²à¸¢)',
    imageUrl: '',
    week: 5
  },
  {
    id: 'v5_taste',
    word: 'Taste',
    phonetic: '/teÉªst/',
    definition: 'The sensation of flavor perceived in the mouth on contact with a substance.',
    translation: 'à¸£à¸ªà¸Šà¸²à¸•à¸´',
    imageUrl: '',
    week: 5
  },
  {
    id: 'v6_bevorder',
    word: 'Beverage Order',
    phonetic: '/Ëˆbev.É™r.ÉªdÊ’ ËˆÉ”Ë�.dÉ™r/',
    definition: 'Taking requests for drinks from guests.',
    translation: 'à¸�à¸²à¸£à¸£à¸±à¸šà¸­à¸­à¹€à¸”à¸­à¸£à¹Œà¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡',
    imageUrl: '',
    week: 6
  },
  {
    id: 'v6_winepairing',
    word: 'Wine Pairing',
    phonetic: '/waÉªn ËˆpeÉ™.rÉªÅ‹/',
    definition: 'The process of pairing food dishes with wine to enhance the dining experience.',
    translation: 'à¸�à¸²à¸£à¸ˆà¸±à¸šà¸„à¸¹à¹ˆà¹„à¸§à¸™à¹Œà¸�à¸±à¸šà¸­à¸²à¸«à¸²à¸£',
    imageUrl: '',
    week: 6
  },
  {
    id: 'v6_garnish',
    word: 'Garnish',
    phonetic: '/ËˆÉ¡É‘Ë�.nÉªÊƒ/',
    definition: 'An item used as a decoration or embellishment for food or drinks.',
    translation: 'à¸ªà¸´à¹ˆà¸‡à¸•à¸�à¹�à¸•à¹ˆà¸‡à¸­à¸²à¸«à¸²à¸£à¸«à¸£à¸·à¸­à¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡',
    imageUrl: '',
    week: 6
  },
  {
    id: 'v13',
    word: 'Sommelier',
    phonetic: '/sÉ’mËˆel.jeÉª/',
    definition: 'A trained and knowledgeable wine professional who specializes in wine service.',
    translation: 'à¸žà¸™à¸±à¸�à¸‡à¸²à¸™à¸šà¸£à¸´à¸�à¸²à¸£à¹„à¸§à¸™à¹Œ',
    imageUrl: '',
    week: 6
  },
  {
    id: 'v14',
    word: 'Pairing',
    phonetic: '/ËˆpeÉ™.rÉªÅ‹/',
    definition: 'The matching of food dishes with appropriate beverages, especially wine, to enhance flavor.',
    translation: 'à¸�à¸²à¸£à¸ˆà¸±à¸šà¸„à¸¹à¹ˆà¹€à¸„à¸£à¸·à¹ˆà¸­à¸‡à¸”à¸·à¹ˆà¸¡à¸�à¸±à¸šà¸­à¸²à¸«à¸²à¸£',
    imageUrl: '',
    week: 6
  },
  {
    id: 'v15',
    word: 'Billing',
    phonetic: '/ËˆbÉªl.ÉªÅ‹/',
    definition: 'The process of calculating and presenting the total amount owed by the guests.',
    translation: 'à¸‚à¸±à¹‰à¸™à¸•à¸­à¸™à¸�à¸²à¸£à¸„à¸´à¸”à¹€à¸‡à¸´à¸™à¹�à¸¥à¸°à¹€à¸£à¸µà¸¢à¸�à¹€à¸�à¹‡à¸šà¹€à¸‡à¸´à¸™',
    imageUrl: '',
    week: 13
  },
  {
    id: 'v16',
    word: 'Service Charge',
    phonetic: '/ËˆsÉœË�.vÉªs tÊƒÉ‘Ë�dÊ’/',
    definition: 'An additional fee added to a bill for the service provided.',
    translation: 'à¸„à¹ˆà¸²à¸šà¸£à¸´à¸�à¸²à¸£ (à¸¡à¸±à¸�à¹€à¸žà¸´à¹ˆà¸¡ 10%)',
    imageUrl: '',
    week: 13
  },
  {
    id: 'v17',
    word: 'VAT',
    phonetic: '/vÃ¦t/',
    definition: 'Value Added Tax; a consumption tax placed on products and services.',
    translation: 'à¸ à¸²à¸©à¸µà¸¡à¸¹à¸¥à¸„à¹ˆà¸²à¹€à¸žà¸´à¹ˆà¸¡',
    imageUrl: '',
    week: 13
  },
  {
    id: 'v18',
    word: 'Complaint',
    phonetic: '/kÉ™mËˆpleÉªnt/',
    definition: 'A statement that something is unsatisfactory or unacceptable.',
    translation: 'à¸‚à¹‰à¸­à¸£à¹‰à¸­à¸‡à¹€à¸£à¸µà¸¢à¸™ / à¸„à¸³à¸£à¹‰à¸­à¸‡à¹€à¸£à¸µà¸¢à¸™',
    imageUrl: '',
    week: 15
  },
  {
    id: 'v19',
    word: 'Apologize',
    phonetic: '/É™ËˆpÉ’l.É™.dÊ’aÉªz/',
    definition: 'To express regret for something that one has done wrong or a service failure.',
    translation: 'à¸�à¸¥à¹ˆà¸²à¸§à¸„à¸³à¸‚à¸­à¹‚à¸—à¸©',
    imageUrl: '',
    week: 15
  },
  {
    id: 'v20',
    word: 'Service Recovery',
    phonetic: '/ËˆsÉœË�.vÉªs rÉªËˆkÊŒv.É™r.i/',
    definition: 'The action a service provider takes in response to a service failure to restore satisfaction.',
    translation: 'à¸�à¸²à¸£à¸Ÿà¸·à¹‰à¸™à¸Ÿà¸¹à¸„à¸§à¸²à¸¡à¸žà¸¶à¸‡à¸žà¸­à¹ƒà¸ˆà¸�à¸²à¸£à¸šà¸£à¸´à¸�à¸²à¸£',
    imageUrl: '',
    week: 16
  },
  {
    id: 'v21',
    word: 'Performance',
    phonetic: '/pÉ™ËˆfÉ”Ë�.mÉ™ns/',
    definition: 'The act of performing a task or duty, or showing practical skills under assessment.',
    translation: 'à¸ªà¸¡à¸£à¸£à¸–à¸™à¸°à¸�à¸²à¸£à¸›à¸�à¸´à¸šà¸±à¸•à¸´à¸‡à¸²à¸™',
    imageUrl: '',
    week: 18
  }
];

export const QUIZZES_INITIAL = [
  {
    id: 'q1',
    question: 'Which tableware item is a flat, circular dish from which food is eaten?',
    imageUrl: '',
    options: ['Plate', 'Bowl', 'Placemat', 'Saucer'],
    correctAnswer: 'Plate',
    vocabularyId: 'v1'
  },
  {
    id: 'q2',
    question: 'What is a pronged eating utensil used for lifting food to the mouth called?',
    imageUrl: '',
    options: ['Spoon', 'Fork', 'Knife', 'Tongs'],
    correctAnswer: 'Fork',
    vocabularyId: 'v2'
  },
  {
    id: 'q3',
    question: 'Which utensil consists of a small, shallow bowl on a handle, used for liquid foods like soup?',
    imageUrl: '',
    options: ['Fork', 'Knife', 'Spoon', 'Ladle'],
    correctAnswer: 'Spoon',
    vocabularyId: 'v3'
  },
  {
    id: 'q4',
    question: 'What is the sharp tableware utensil used for cutting food at the dining table?',
    imageUrl: '',
    options: ['Knife', 'Fork', 'Spoon', 'Chopsticks'],
    correctAnswer: 'Knife',
    vocabularyId: 'v4'
  },
  {
    id: 'q4_wineglass',
    question: 'Which glassware with a stem and a bowl is designed specifically for drinking wine?',
    imageUrl: '',
    options: ['Tumbler', 'Highball Glass', 'Wine Glass', 'Mug'],
    correctAnswer: 'Wine Glass',
    vocabularyId: 'v5'
  },
  {
    id: 'q4_napkin',
    question: 'What is the square piece of cloth or paper used at the table to clean lips and protect clothes?',
    imageUrl: '',
    options: ['Tablecloth', 'Napkin', 'Placemat', 'Runner'],
    correctAnswer: 'Napkin',
    vocabularyId: 'v5_napkin'
  },
  {
    id: 'q5',
    question: 'Which course is served first in a western full course meal to stimulate the appetite?',
    imageUrl: '',
    options: ['Main Course', 'Dessert', 'Entree', 'Appetizer'],
    correctAnswer: 'Appetizer',
    vocabularyId: 'v6'
  },
  {
    id: 'q6',
    question: 'Which word is a formal term for any kind of drink (excluding water)?',
    imageUrl: '',
    options: ['Beverage', 'Consomme', 'Cuisine', 'Liquid'],
    correctAnswer: 'Beverage',
    vocabularyId: 'v8'
  },
  {
    id: 'q7_salad',
    question: 'What is a cold dish of mixed raw or cooked vegetables, usually served with dressing?',
    imageUrl: '',
    options: ['Salad', 'Soup', 'Main Course', 'Appetizer'],
    correctAnswer: 'Salad',
    vocabularyId: 'v9_salad'
  },
  {
    id: 'q7_soup',
    question: 'Which liquid food is typically prepared by boiling meat or vegetables in water or stock?',
    imageUrl: '',
    options: ['Soup', 'Dessert', 'Beverage', 'Sauce'],
    correctAnswer: 'Soup',
    vocabularyId: 'v9_soup'
  },
  {
    id: 'q7',
    question: 'A guest who booked a table in advance at a restaurant is said to have a...',
    imageUrl: '',
    options: ['Registration', 'Reservation', 'Reception', 'Requirement'],
    correctAnswer: 'Reservation',
    vocabularyId: 'v10'
  },
  {
    id: 'q7_greeting',
    question: 'Polite words or actions used to welcome someone when you meet them are called a...',
    imageUrl: '',
    options: ['Greeting', 'Farewell', 'Apology', 'Complaint'],
    correctAnswer: 'Greeting',
    vocabularyId: 'v11'
  },
  {
    id: 'q8',
    question: 'Matching a food dish with a complementary drink (like white wine with salmon) is called...',
    imageUrl: '',
    options: ['Pairing', 'Mixing', 'Blending', 'Serving'],
    correctAnswer: 'Pairing',
    vocabularyId: 'v14'
  },
  {
    id: 'q9',
    question: 'What is the extra fee (usually 10%) added to a restaurant bill for the service provided?',
    imageUrl: '',
    options: ['VAT', 'Service Charge', 'Tip', 'Commission'],
    correctAnswer: 'Service Charge',
    vocabularyId: 'v16'
  },
  {
    id: 'q10',
    question: 'What is the term that means "to express regret or say sorry for a service failure"?',
    imageUrl: '',
    options: ['Apologize', 'Appreciate', 'Accuse', 'Acknowledge'],
    correctAnswer: 'Apologize',
    vocabularyId: 'v19'
  },
  {
    id: 'q5_special',
    question: "What is a dish highlighted by the chef for the day called?",
    imageUrl: '',
    options: ["Chef's Special", "Side Dish", "Appetizer", "Dessert"],
    correctAnswer: "Chef's Special",
    vocabularyId: 'v5_special'
  },
  {
    id: 'q5_recommend',
    question: "To suggest a particular dish or drink as suitable for a guest is to...",
    imageUrl: '',
    options: ["Recommend", "Refuse", "Reject", "Remove"],
    correctAnswer: "Recommend",
    vocabularyId: 'v5_recommend'
  },
  {
    id: 'q5_ingredient',
    question: "What is the term for any of the foods or substances combined to make a dish?",
    imageUrl: '',
    options: ["Ingredient", "Utensil", "Receipt", "Cutlery"],
    correctAnswer: "Ingredient",
    vocabularyId: 'v5_ingredient'
  },
  {
    id: 'q5_allergy',
    question: "If a guest has a medical reaction to certain foods, they have a food...",
    imageUrl: '',
    options: ["Allergy", "Preference", "Appetite", "Affection"],
    correctAnswer: "Allergy",
    vocabularyId: 'v5_allergy'
  },
  {
    id: 'q5_upsell',
    question: "To persuade a guest to buy something additional or more premium is to...",
    imageUrl: '',
    options: ["Upsell", "Downgrade", "Refund", "Cancel"],
    correctAnswer: "Upsell",
    vocabularyId: 'v5_upsell'
  },
  {
    id: 'q6_garnish',
    question: "What is a small item used to decorate a food dish or beverage called?",
    imageUrl: '',
    options: ["Garnish", "Main", "Stock", "Utensil"],
    correctAnswer: "Garnish",
    vocabularyId: 'v6_garnish'
  },
  {
    id: 'q6_winepairing',
    question: "The process of matching food dishes with complementary wines is called...",
    imageUrl: '',
    options: ["Wine Pairing", "Mixing", "Pouring", "Blending"],
    correctAnswer: "Wine Pairing",
    vocabularyId: 'v6_winepairing'
  }
];

