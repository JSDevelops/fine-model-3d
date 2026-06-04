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
    "id": "w1",
    "week": 1,
    "title": "คำศัพท์อุปกรณ์ในห้องอาหาร (Restaurant Equipment Vocabulary)",
    "description": "เรียนรู้คำศัพท์และอุปกรณ์ในห้องอาหาร ชื่อ หน้าที่ และวิธีการใช้งาน การสื่อสารภาษาอังกฤษตามมาตรฐานคุณวุฒิวิชาชีพ โดยใช้เทคโนโลยี AR และ AI ร่วมกับสถานการณ์จำลอง (Simulation)",
    "objectives": [
      "บอกชื่ออุปกรณ์ในห้องอาหารเป็นภาษาอังกฤษได้ถูกต้อง",
      "อธิบายหน้าที่และความสำคัญของอุปกรณ์บนโต๊ะอาหารได้",
      "ออกเสียงคำศัพท์และใช้ AR/AI เพื่อการเรียนรู้อุปกรณ์ได้อย่างคล่องแคล่ว",
      "จำแนกอุปกรณ์และปฏิบัติงานจัดโต๊ะร่วมกับผู้อื่นได้อย่างมีประสิทธิภาพ"
    ],
    "missionIds": [],
    "mediaUrl": "/images/wn-5.jpg",
    "mediaType": "image"
  },
  {
    "id": "w2",
    "week": 2,
    "title": "คำศัพท์เมนูอาหารและเครื่องดื่ม (Food & Beverage Menu Vocabulary)",
    "description": "ฝึกฝนคำศัพท์เกี่ยวกับประเภทเมนูอาหารและเครื่องดื่มสากล การอ่านออกเสียงเมนู ส่วนประกอบหลัก และทักษะภาษาอังกฤษเพื่อช่วยเหลือลูกค้าที่มีข้อจำกัดในการรับประทานอาหาร",
    "objectives": [
      "บอกคำศัพท์และจำแนกหมวดหมู่ประเภทเมนูอาหารและเครื่องดื่มสากลได้",
      "อ่านสะกดและออกเสียงชื่อเมนูภาษาอังกฤษได้อย่างชัดเจนและถูกต้อง",
      "นำเสนอและอธิบายรายละเอียดเมนูแนะนำ (Chef's Recommendation) เป็นภาษาอังกฤษได้",
      "ประยุกต์ใช้ภาษาอังกฤษในการตอบข้อซักถามเกี่ยวกับเมนูในสถานการณ์จำลองได้"
    ],
    "missionIds": [],
    "mediaUrl": "/images/20.jpg",
    "mediaType": "image"
  },
  {
    "id": "w3",
    "week": 3,
    "title": "Greeting & Welcoming (การต้อนรับและทักทายลูกค้า)",
    "description": "เรียนรู้ประโยคมาตรฐานและจังหวะมารยาทสากลในการกล่าวทักทายต้อนรับลูกค้าที่หน้าร้านอาหาร การตรวจสอบสถานะการจองโต๊ะ (Reservation Checking) และการผายมือนำทางเดินส่งลูกค้าไปยังโต๊ะ",
    "objectives": [
      "กล่าวทักทายต้อนรับลูกค้า (Greeting & Welcoming) ตามมาตรฐานสากลด้วยความสุภาพ",
      "ใช้สำนวนภาษาอังกฤษในการเช็คบุ๊กกิ้งและจดบันทึกการจองของลูกค้าได้อย่างถูกต้อง",
      "แสดงบทบาทพนักงานต้อนรับนำทางโต๊ะและแก้ไขปัญหาร้านโต๊ะเต็มเฉพาะหน้าได้อย่างราบรื่น"
    ],
    "missionIds": [
      "m1"
    ],
    "mediaUrl": "/images/wn-3.jpg",
    "mediaType": "image"
  },
  {
    "id": "w4",
    "week": 4,
    "title": "Seating & Small Talk (การนำลูกค้าไปที่โต๊ะและการชวนคุย)",
    "description": "เรียนรู้ขั้นตอนการนำลูกค้าไปยังโต๊ะอาหารที่เหมาะสม (Escorting and Seating) และการชวนคุยสร้างความคุ้นเคยเบื้องต้นเพื่อสร้างความประทับใจแรก",
    "objectives": [
      "สื่อสารเพื่อนำทางลูกค้าไปยังโต๊ะอาหารอย่างสุภาพ",
      "ฝึกฝนทักษะการชวนคุย (Small talk) เบื้องต้นอย่างเป็นธรรมชาติ",
      "จัดเตรียมคำพูดในการบริการลูกค้าและรับมือคำขอพิเศษ"
    ],
    "missionIds": [
      "m1"
    ],
    "mediaUrl": "/images/wn-6.jpg",
    "mediaType": "image"
  },
  {
    "id": "w5",
    "week": 5,
    "title": "Food Description (การแนะนำรายการอาหาร)",
    "description": "ฝึกฝนการอธิบายและแนะนำรายการอาหาร การบอกส่วนผสมหลัก วิธีการปรุง และจุดเด่นของเมนูแนะนำแก่ลูกค้า",
    "objectives": [
      "ใช้คำศัพท์เกี่ยวกับรสชาติและการปรุงอาหารเพื่ออธิบายเมนู",
      "นำเสนอเมนูแนะนำ (Chef's Recommendation) ได้อย่างน่าดึงดูด",
      "อธิบายส่วนผสมหลักและแจ้งสารก่อภูมิแพ้ได้อย่างถูกต้อง"
    ],
    "missionIds": [
      "m2"
    ],
    "mediaUrl": "/images/28.jpg",
    "mediaType": "image"
  },
  {
    "id": "w6",
    "week": 6,
    "title": "Beverage Recommendation (การแนะนำเครื่องดื่ม)",
    "description": "ฝึกแนะนำและเสนอขายเครื่องดื่มประเภทต่างๆ ที่จับคู่กับอาหารจานหลักได้อย่างเหมาะสม (Beverage Pairing)",
    "objectives": [
      "แนะนำเครื่องดื่มที่เข้ากันได้ดีกับอาหารแต่ละประเภท (Wine pairing)",
      "อธิบายจุดเด่นและรสชาติของเครื่องดื่มแก้วต่างๆ ได้อย่างเป็นมืออาชีพ",
      "เสนอขายเครื่องดื่มพิเศษเพื่อเพิ่มยอดขายให้กับห้องอาหาร"
    ],
    "missionIds": [
      "m3"
    ],
    "mediaUrl": "/images/22.jpg",
    "mediaType": "image"
  },
  {
    "id": "w7",
    "week": 7,
    "title": "Taking Orders Pattern (แพทเทิร์นการรับออเดอร์)",
    "description": "ฝึกฝนประโยคมาตรฐานและแพทเทิร์นภาษาอังกฤษสำหรับการรับออเดอร์อาหารและเครื่องดื่ม การทวนออเดอร์ และการบันทึกออเดอร์อย่างถูกต้อง",
    "objectives": [
      "ใช้ประโยคมาตรฐานในการสอบถามเพื่อรับออเดอร์จากลูกค้า",
      "ฝึกการทวนออเดอร์ (Order confirmation) เพื่อป้องกันความผิดพลาด",
      "เรียนรู้รูปแบบและระบบย่อในการจดบันทึกออเดอร์"
    ],
    "missionIds": [
      "m2"
    ],
    "mediaUrl": "/images/24.jpg",
    "mediaType": "image"
  },
  {
    "id": "w8",
    "week": 8,
    "title": "Order Taking Simulation (จำลองการรับออเดอร์จริง)",
    "description": "การจำลองสถานการณ์การปฏิบัติงานรับออเดอร์จากลูกค้าแบบเสมือนจริง โดยใช้ใบสั่งอาหารและสื่อความจริงเสมือนในการบันทึกข้อมูล",
    "objectives": [
      "ปฏิบัติงานรับออเดอร์และตอบคำถามเกี่ยวกับรายการอาหารได้อย่างลื่นไหล",
      "ประยุกต์ใช้แพทเทิร์นภาษาอังกฤษในสถานการณ์จำลองหน้าโต๊ะอาหาร",
      "สรุปความต้องการของลูกค้าลงในใบสั่งอาหาร (Order Sheet) ได้ถูกต้อง"
    ],
    "missionIds": [
      "m2"
    ],
    "mediaUrl": "/images/25.jpg",
    "mediaType": "image"
  },
  {
    "id": "w9",
    "week": 9,
    "title": "ขั้นตอนการเสิร์ฟอาหาร (Food Serving)",
    "description": "เรียนรู้ขั้นตอนและทิศทางในการเสิร์ฟอาหารตามมาตรฐานสากล การเสิร์ฟจานหลัก จานสลัด และการเคลียร์จานที่ใช้แล้ว",
    "objectives": [
      "อธิบายขั้นตอนการเสิร์ฟอาหารจากด้านที่ถูกต้องตามหลักสากล",
      "ใช้ประโยคภาษาอังกฤษขณะนำเสนอจานอาหารแก่ลูกค้า",
      "เรียนรู้วิธีการเคลียร์โต๊ะอาหาร (Table clearing) อย่างสุภาพ"
    ],
    "missionIds": [],
    "mediaUrl": "/images/26.jpg",
    "mediaType": "image"
  },
  {
    "id": "w10",
    "week": 10,
    "title": "การบริการเครื่องดื่ม (Beverage Service)",
    "description": "ฝึกปฏิบัติการเสิร์ฟเครื่องดื่มประเภทต่างๆ ทั้งแบบร้อนและเย็น การรินไวน์ การบริการน้ำเปล่า และการใช้อุปกรณ์จริงร่วมกับ AR",
    "objectives": [
      "สื่อสารภาษาอังกฤษและปฏิบัติการเสิร์ฟเครื่องดื่มตามลำดับความสำคัญ",
      "เรียนรู้วิธีการจับแก้วและการรินน้ำเปล่าหรือไวน์ที่ถูกต้อง",
      "ฝึกทักษะการประสานงานและจังหวะเวลาในการเสิร์ฟเครื่องดื่ม"
    ],
    "missionIds": [
      "m3"
    ],
    "mediaUrl": "/images/23.jpg",
    "mediaType": "image"
  },
  {
    "id": "w11",
    "week": 11,
    "title": "Gueridon Service (การบริการแบบรถเข็น)",
    "description": "ศึกษาและทำความเข้าใจเกี่ยวกับการบริการอาหารข้างโต๊ะลูกค้าโดยใช้รถเข็นเกอริดอง (Gueridon) ตั้งแต่การเตรียมวัตถุดิบ การปรุง และการจัดจาน",
    "objectives": [
      "เข้าใจหลักการเบื้องต้นของการปรุงอาหารข้างโต๊ะ (Flambé or Carving)",
      "อธิบายขั้นตอนการใช้รถเข็นเกอริดองเป็นภาษาอังกฤษ",
      "เรียนรู้วิธีการทำงานร่วมกันเป็นทีมในการเสิร์ฟแบบเกอริดอง"
    ],
    "missionIds": [],
    "mediaUrl": "/images/19.jpg",
    "mediaType": "image"
  },
  {
    "id": "w12",
    "week": 12,
    "title": "Room Service Procedure (ขั้นตอนการบริการบนห้องพัก)",
    "description": "เรียนรู้วิธีการรับออเดอร์ทางโทรศัพท์และการขึ้นไปบริการอาหารและเครื่องดื่มแก่ผู้เข้าพักในห้องพัก (In-Room Dining)",
    "objectives": [
      "รับออเดอร์ทางโทรศัพท์ด้วยน้ำเสียงและประโยคที่เป็นมืออาชีพ",
      "ตรวจสอบและจัดถาดอาหารสำหรับขึ้นบริการบนห้องพักอย่างเรียบร้อย",
      "ปฏิบัติการเคาะประตู แนะนำตัว และเสิร์ฟอาหารในห้องพักของลูกค้า"
    ],
    "missionIds": [],
    "mediaUrl": "/images/n-13.jpg",
    "mediaType": "image"
  },
  {
    "id": "w13",
    "week": 13,
    "title": "Billing Vocabulary (คำศัพท์การชำระเงิน)",
    "description": "ศึกษาประโยคและคำศัพท์เกี่ยวกับการคิดเงิน การแยกบิล การชำระด้วยบัตรเครดิต หรือเงินสด ตลอดจนการทำความเข้าใจค่าบริการและภาษีมูลค่าเพิ่ม",
    "objectives": [
      "เรียนรู้คำศัพท์เกี่ยวกับใบเสร็จ ภาษี (VAT) และค่าบริการ (Service Charge)",
      "ฝึกสนทนาเมื่อลูกค้าขอเช็คบิลและขอคำชี้แจงเกี่ยวกับรายการในใบเสร็จ",
      "แก้ปัญหาเมื่อมีการทักท้วงเรื่องราคาหรือยอดเงินไม่ถูกต้อง"
    ],
    "missionIds": [],
    "mediaUrl": "/images/29.jpg",
    "mediaType": "image"
  },
  {
    "id": "w14",
    "week": 14,
    "title": "Closing Service (การปิดการบริการ)",
    "description": "ขั้นตอนสุดท้ายของการต้อนรับ การลาลูกค้า การอวยพรให้เดินทางปลอดภัย และการจัดเตรียมโต๊ะสำหรับรอบถัดไป",
    "objectives": [
      "กล่าวขอบคุณและอวยพรลูกค้า (Farewell standard phrases) อย่างจริงใจ",
      "สอบถามความพึงพอใจโดยรวมของลูกค้า (Feedback request) เป็นภาษาอังกฤษ",
      "ปฏิบัติงานส่งลูกค้าออกจากร้านอย่างอบอุ่นและสร้างความสัมพันธ์ที่ดี"
    ],
    "missionIds": [],
    "mediaUrl": "/images/29.jpg",
    "mediaType": "image"
  },
  {
    "id": "w15",
    "week": 15,
    "title": "Complaint Handling (การจัดการข้อร้องเรียน)",
    "description": "ฝึกฝนการแก้ไขปัญหาเมื่อเจอลูกค้าที่ไม่พอใจอาหาร บริการ หรือความล่าช้า โดยใช้หลักการฟังอย่างเห็นอกเห็นใจ (Empathy) และหาทางออก",
    "objectives": [
      "ใช้หลัก LAST (Listen, Apologize, Solve, Thank) เพื่อแก้ปัญหาข้อร้องเรียน",
      "ใช้ประโยคขออภัยอย่างเป็นทางการสำหรับความล่าช้าหรือความผิดพลาด",
      "ระงับอารมณ์และเจรจาโต้ตอบกับลูกค้าอย่างใจเย็นและเป็นมืออาชีพ"
    ],
    "missionIds": [],
    "mediaUrl": "/images/27.jpg",
    "mediaType": "image"
  },
  {
    "id": "w16",
    "week": 16,
    "title": "Service Recovery (การฟื้นฟูความพึงพอใจ)",
    "description": "เรียนรู้แนวทางการชดเชยเพื่อกู้คืนความพึงพอใจของลูกค้า เช่น การแถมของหวาน การลดราคา หรือการอัปเกรดบริการ พร้อมการบันทึกรายงาน",
    "objectives": [
      "เสนอทางเลือกการชดเชย (Service recovery compensation) อย่างเหมาะสม",
      "เจรจาเพื่อเปลี่ยนทัศนคติของลูกค้าให้กลับมารู้สึกดีกับห้องอาหาร",
      "เรียนรู้วิธีสรุปและบันทึกรายงานเหตุการณ์เพื่อส่งต่อให้หัวหน้างาน"
    ],
    "missionIds": [],
    "mediaUrl": "/images/27.jpg",
    "mediaType": "image"
  },
  {
    "id": "w17",
    "week": 17,
    "title": "Integrated Restaurant Service (บูรณาการบริการร้านอาหารแบบ FINE Model)",
    "description": "การรวมทักษะตั้งแต่สัปดาห์แรกจนถึงปัจจุบัน ปฏิบัติงานแบบครบวงจรตามขั้นตอน FINE Model (Familiarize, Interact, Navigate, Exhibit)",
    "objectives": [
      "F - Familiarize: ทบทวนองค์ความรู้ทั้งหมดผ่าน AR Restaurant Simulation",
      "I - Interact: แบ่งกลุ่มปฏิบัติสลับบทบาทพนักงาน (Host, Waiter, Cashier) และลูกค้า",
      "N - Navigate: แก้ไขสถานการณ์ท้าทายเฉพาะหน้า เช่น ลูกค้าแพ้อาหารหรือขอแยกบิล",
      "E - Exhibit: ประเมินสมรรถนะครบวงจร และจัดทำ Portfolio / Reflection Report"
    ],
    "missionIds": [
      "m1",
      "m2",
      "m3"
    ],
    "mediaUrl": "/images/wn-3.jpg",
    "mediaType": "image"
  },
  {
    "id": "w18",
    "week": 18,
    "title": "ประเมินสมรรถนะปลายภาค (Final Performance Assessment)",
    "description": "การประเมินผลสมรรถนะการปฏิบัติงานจริงในห้องอาหารจำลอง โดยรับโจทย์สถานการณ์จริงเพื่อทดสอบความเป็นมืออาชีพตามเกณฑ์ Rubric 4 ระดับ",
    "objectives": [
      "แสดงสมรรถนะตามมาตรฐานอาชีพการบริการอาหารและเครื่องดื่ม",
      "สื่อสารภาษาอังกฤษโต้ตอบในสถานการณ์ท้าทายได้อย่างคล่องแคล่วและมั่นใจ",
      "ได้รับการประเมินผลสัมฤทธิ์ระดับดีเยี่ยม-ดี-พอใช้-ปรับปรุง ตามเกณฑ์การประเมิน"
    ],
    "missionIds": [
      "m1",
      "m2",
      "m3",
      "m4"
    ],
    "mediaUrl": "/images/13.jpg",
    "mediaType": "image"
  }
];

export const VOCABULARIES_INITIAL = [
  {
    "id": "v1",
    "word": "Plate",
    "phonetic": "/pleɪt/",
    "definition": "A flat dish, typically circular, from which food is served or eaten.",
    "translation": "จาน",
    "imageUrl": "/vocabulary/plate.png",
    "week": 1
  },
  {
    "id": "v2",
    "word": "Fork",
    "phonetic": "/fɔːk/",
    "definition": "A pronged eating utensil used for lifting food to the mouth or holding it when cutting.",
    "translation": "ส้อม",
    "imageUrl": "/vocabulary/fork.png",
    "week": 1
  },
  {
    "id": "v3",
    "word": "Spoon",
    "phonetic": "/spuːn/",
    "definition": "A utensil consisting of a small, shallow bowl on a handle, used for eating or serving liquid foods.",
    "translation": "ช้อน",
    "imageUrl": "/vocabulary/spoon.png",
    "week": 1
  },
  {
    "id": "v4",
    "word": "Knife",
    "phonetic": "/naɪf/",
    "definition": "An instrument with a sharp blade fixed in a handle, used for cutting food at the table.",
    "translation": "มีด",
    "imageUrl": "/vocabulary/knife.png",
    "week": 1
  },
  {
    "id": "v5",
    "word": "Wine Glass",
    "phonetic": "/waɪn ɡlɑːs/",
    "definition": "A glass container with a stem and a bowl, designed specifically for drinking wine.",
    "translation": "แก้วไวน์",
    "imageUrl": "/vocabulary/wineglass.png",
    "week": 1
  },
  {
    "id": "v5_napkin",
    "word": "Napkin",
    "phonetic": "/ˈnæp.kɪn/",
    "definition": "A square piece of cloth or paper used at a meal to wipe the fingers or lips and to protect the clothes.",
    "translation": "ผ้าเช็ดปาก",
    "imageUrl": "/vocabulary/napkin.png",
    "week": 1
  },
  {
    "id": "v6",
    "word": "Appetizer",
    "phonetic": "/ˈæp.ə.taɪ.zər/",
    "definition": "A small dish of food or a drink taken before a meal to stimulate the appetite.",
    "translation": "อาหารเรียกน้ำย่อย",
    "imageUrl": "",
    "week": 2
  },
  {
    "id": "v7",
    "word": "Main Course",
    "phonetic": "/meɪn kɔːs/",
    "definition": "The primary or most substantial dish of a meal, typically served after the appetizer.",
    "translation": "อาหารจานหลัก",
    "imageUrl": "",
    "week": 2
  },
  {
    "id": "v8",
    "word": "Beverage",
    "phonetic": "/ˈbev.ər.ɪdʒ/",
    "definition": "A drink other than water, such as tea, coffee, wine, or beer.",
    "translation": "เครื่องดื่ม",
    "imageUrl": "",
    "week": 2
  },
  {
    "id": "v9",
    "word": "Dessert",
    "phonetic": "/dɪˈzɜːt/",
    "definition": "A sweet course eaten at the end of a meal.",
    "translation": "ของหวาน",
    "imageUrl": "",
    "week": 2
  },
  {
    "id": "v9_salad",
    "word": "Salad",
    "phonetic": "/ˈsæl.əd/",
    "definition": "A cold dish of various mixtures of raw or cooked vegetables, usually served with dressing.",
    "translation": "สลัด",
    "imageUrl": "",
    "week": 2
  },
  {
    "id": "v9_soup",
    "word": "Soup",
    "phonetic": "/suːp/",
    "definition": "A liquid dish made by boiling meat, fish, or vegetables in stock or water.",
    "translation": "ซุป",
    "imageUrl": "",
    "week": 2
  },
  {
    "id": "v10",
    "word": "Reservation",
    "phonetic": "/ˌrez.əˈveɪ.ʃən/",
    "definition": "An arrangement to lock a table in a restaurant in advance.",
    "translation": "การสำรองที่นั่ง",
    "imageUrl": "",
    "week": 3
  },
  {
    "id": "v11",
    "word": "Greeting",
    "phonetic": "/ˈɡriː.tɪŋ/",
    "definition": "Polite words or sign of welcome when meeting someone.",
    "translation": "การทักทาย",
    "imageUrl": "",
    "week": 3
  },
  {
    "id": "v11_welcoming",
    "word": "Welcoming",
    "phonetic": "/ˈwel.kə.mɪŋ/",
    "definition": "The act of greeting and receiving guests warmly upon their arrival.",
    "translation": "การต้อนรับ",
    "imageUrl": "",
    "week": 3
  },
  {
    "id": "v11_smalltalk",
    "word": "Small Talk",
    "phonetic": "/smɔːl tɔːk/",
    "definition": "Polite, friendly, and informal conversation about light or general topics.",
    "translation": "การสนทนาชวนคุยเรื่องทั่วไป",
    "imageUrl": "",
    "week": 3
  },
  {
    "id": "v12",
    "word": "Escort",
    "phonetic": "/ɪˈskɔːt/",
    "definition": "To accompany guests to their assigned tables or seats.",
    "translation": "การนำทาง / การเดินนำ",
    "imageUrl": "",
    "week": 4
  },
  {
    "id": "v5_special",
    "word": "Chef's Special",
    "phonetic": "/ʃefs ˈspeʃ.əl/",
    "definition": "A dish highlighted by the chef for the day, often showcasing seasonal ingredients.",
    "translation": "รายการอาหารแนะนำพิเศษของเชฟ",
    "imageUrl": "",
    "week": 5
  },
  {
    "id": "v5_recommend",
    "word": "Recommend",
    "phonetic": "/ˌrek.əˈmend/",
    "definition": "To suggest a dish or drink as being good or suitable for the guest.",
    "translation": "แนะนำ",
    "imageUrl": "",
    "week": 5
  },
  {
    "id": "v5_ingredient",
    "word": "Ingredient",
    "phonetic": "/ɪnˈɡriː.di.ənt/",
    "definition": "Any of the foods or substances that are combined to make a particular dish.",
    "translation": "ส่วนผสม / วัตถุดิบ",
    "imageUrl": "",
    "week": 5
  },
  {
    "id": "v5_allergy",
    "word": "Allergy",
    "phonetic": "/ˈæl.ə.dʒi/",
    "definition": "A medical condition that causes a reaction when a person eats certain foods.",
    "translation": "อาการแพ้อาหาร",
    "imageUrl": "",
    "week": 5
  },
  {
    "id": "v5_upsell",
    "word": "Upsell",
    "phonetic": "/ˌʌpˈsel/",
    "definition": "To persuade a customer to buy something additional or more expensive.",
    "translation": "เสนอขายเพิ่มเติม (เพื่อเพิ่มยอดขาย)",
    "imageUrl": "",
    "week": 5
  },
  {
    "id": "v5_taste",
    "word": "Taste",
    "phonetic": "/teɪst/",
    "definition": "The sensation of flavor perceived in the mouth on contact with a substance.",
    "translation": "รสชาติ",
    "imageUrl": "",
    "week": 5
  },
  {
    "id": "v6_bevorder",
    "word": "Beverage Order",
    "phonetic": "/ˈbev.ər.ɪdʒ ˈɔː.dər/",
    "definition": "Taking requests for drinks from guests.",
    "translation": "การรับออเดอร์เครื่องดื่ม",
    "imageUrl": "",
    "week": 6
  },
  {
    "id": "v6_winepairing",
    "word": "Wine Pairing",
    "phonetic": "/waɪn ˈpeə.rɪŋ/",
    "definition": "The process of pairing food dishes with wine to enhance the dining experience.",
    "translation": "การจับคู่ไวน์กับอาหาร",
    "imageUrl": "",
    "week": 6
  },
  {
    "id": "v6_garnish",
    "word": "Garnish",
    "phonetic": "/ˈɡɑː.nɪʃ/",
    "definition": "An item used as a decoration or embellishment for food or drinks.",
    "translation": "สิ่งตกแต่งอาหารหรือเครื่องดื่ม",
    "imageUrl": "",
    "week": 6
  },
  {
    "id": "v13",
    "word": "Sommelier",
    "phonetic": "/sɒmˈel.jeɪ/",
    "definition": "A trained and knowledgeable wine professional who specializes in wine service.",
    "translation": "พนักงานบริการไวน์",
    "imageUrl": "",
    "week": 6
  },
  {
    "id": "v14",
    "word": "Pairing",
    "phonetic": "/ˈpeə.rɪŋ/",
    "definition": "The matching of food dishes with appropriate beverages, especially wine, to enhance flavor.",
    "translation": "การจับคู่เครื่องดื่มกับอาหาร",
    "imageUrl": "",
    "week": 6
  },
  {
    "id": "v15",
    "word": "Billing",
    "phonetic": "/ˈbɪl.ɪŋ/",
    "definition": "The process of calculating and presenting the total amount owed by the guests.",
    "translation": "ขั้นตอนการคิดเงินและเรียกเก็บเงิน",
    "imageUrl": "",
    "week": 13
  },
  {
    "id": "v16",
    "word": "Service Charge",
    "phonetic": "/ˈsɜː.vɪs tʃɑːdʒ/",
    "definition": "An additional fee added to a bill for the service provided.",
    "translation": "ค่าบริการ (มักเพิ่ม 10%)",
    "imageUrl": "",
    "week": 13
  },
  {
    "id": "v17",
    "word": "VAT",
    "phonetic": "/væt/",
    "definition": "Value Added Tax; a consumption tax placed on products and services.",
    "translation": "ภาษีมูลค่าเพิ่ม",
    "imageUrl": "",
    "week": 13
  },
  {
    "id": "v18",
    "word": "Complaint",
    "phonetic": "/kəmˈpleɪnt/",
    "definition": "A statement that something is unsatisfactory or unacceptable.",
    "translation": "ข้อร้องเรียน / คำร้องเรียน",
    "imageUrl": "",
    "week": 15
  },
  {
    "id": "v19",
    "word": "Apologize",
    "phonetic": "/əˈpɒl.ə.dʒaɪz/",
    "definition": "To express regret for something that one has done wrong or a service failure.",
    "translation": "กล่าวคำขอโทษ",
    "imageUrl": "",
    "week": 15
  },
  {
    "id": "v20",
    "word": "Service Recovery",
    "phonetic": "/ˈsɜː.vɪs rɪˈkʌv.ər.i/",
    "definition": "The action a service provider takes in response to a service failure to restore satisfaction.",
    "translation": "การฟื้นฟูความพึงพอใจการบริการ",
    "imageUrl": "",
    "week": 16
  },
  {
    "id": "v21",
    "word": "Performance",
    "phonetic": "/pəˈfɔː.məns/",
    "definition": "The act of performing a task or duty, or showing practical skills under assessment.",
    "translation": "สมรรถนะการปฏิบัติงาน",
    "imageUrl": "",
    "week": 18
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

