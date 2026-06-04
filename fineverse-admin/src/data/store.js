// src/data/store.js  — in-memory mock data (replaces Firebase in Phase 3)

export const SCENES_INITIAL = [
  {
    id: 'restaurant',
    name: 'Restaurant Scene',
    subtitle: 'Standard Room',
    icon: 'fa-utensils',
    color: 'teal',
    missionCount: 12,
    sessionCount: 163,
    status: 'active',
    objects: [
      { id: 'floor', name: 'Floor Marble', type: 'box', position: [0, -0.01, 0], size: [8, 0.02, 8], color: '#D4C5A9' },
      { id: 'wall_back', name: 'Back Wall', type: 'box', position: [0, 1.5, -4], size: [8, 3, 0.1], color: '#E8DDD0' },
      { id: 'wall_left', name: 'Left Wall', type: 'box', position: [-4, 1.5, 0], size: [0.1, 3, 8], color: '#E8DDD0' },
      { id: 'wall_right', name: 'Right Wall', type: 'box', position: [4, 1.5, 0], size: [0.1, 3, 8], color: '#E8DDD0' },
      { id: 'table_1', name: 'Dining Table 1', type: 'box', position: [-1.5, 0.4, -1], size: [0.8, 0.05, 0.8], color: '#8B6914' },
      { id: 'table_2', name: 'Dining Table 2', type: 'box', position: [1.5, 0.4, -1], size: [0.8, 0.05, 0.8], color: '#8B6914' },
      { id: 'table_3', name: 'Dining Table 3 (VIP)', type: 'box', position: [0, 0.4, 1.5], size: [0.8, 0.05, 0.8], color: '#8B6914' },
      { id: 'counter', name: 'Service Counter Base', type: 'box', position: [0, 0.45, -3.4], size: [3, 0.9, 0.4], color: '#6B5A3A' },
      { id: 'counter_top', name: 'Service Counter Countertop', type: 'box', position: [0, 0.92, -3.4], size: [3.1, 0.04, 0.5], color: '#8B7355' },
      { id: 'coffee_machine', name: 'Coffee Machine', type: 'box', position: [0.8, 1.0, -3.5], size: [0.3, 0.3, 0.25], color: '#333333' },
      { id: 'window', name: 'Lobby Window', type: 'box', position: [-3.9, 1.5, -1], size: [0.05, 1.2, 1.4], color: '#AECFE8' }
    ],
    hotspots: [
      { id: 'hs1', label: 'Table 3 — Guest', position: [-1.5, 0.9, -1], active: true, missionId: 'm1' }
    ]
  },
  {
    id: 'vip',
    name: 'VIP Reception Lounge',
    subtitle: 'Luxury Room',
    icon: 'fa-couch',
    color: 'blue',
    missionCount: 6,
    sessionCount: 85,
    status: 'active',
    objects: [
      { id: 'floor', name: 'Dark Marble Floor', type: 'box', position: [0, -0.01, 0], size: [8, 0.02, 8], color: '#2A2A2A' },
      { id: 'wall_back', name: 'Lounge Back Wall', type: 'box', position: [0, 1.5, -4], size: [8, 3, 0.1], color: '#1A1A1A' },
      { id: 'wall_left', name: 'Lounge Left Wall', type: 'box', position: [-4, 1.5, 0], size: [0.1, 3, 8], color: '#222222' },
      { id: 'wall_right', name: 'Lounge Right Wall', type: 'box', position: [4, 1.5, 0], size: [0.1, 3, 8], color: '#222222' },
      { id: 'chair_1', name: 'Lounge Armchair 1', type: 'box', position: [-2, 0.3, 0], size: [0.9, 0.15, 0.8], color: '#8B7355' },
      { id: 'chair_2', name: 'Lounge Armchair 2', type: 'box', position: [2, 0.3, 0], size: [0.9, 0.15, 0.8], color: '#8B7355' },
      { id: 'coffee_table', name: 'Gold Coffee Table', type: 'box', position: [0, 0.25, 0], size: [0.8, 0.05, 0.5], color: '#5C4A2A' },
      { id: 'piano', name: 'Grand Piano Body', type: 'box', position: [3.2, 0.5, -2.5], size: [1.2, 1.0, 0.6], color: '#111111' },
      { id: 'chandelier', name: 'Gold Chandelier Ring', type: 'cylinder', position: [0, 2.5, 0], size: [0.6, 0.5, 0.2], color: '#D4AF37' },
      { id: 'desk', name: 'VIP Reception Counter', type: 'box', position: [0, 0.5, -3.5], size: [2, 1.0, 0.5], color: '#1A0A00' },
      { id: 'desk_top', name: 'VIP Counter Countertop', type: 'box', position: [0, 1.01, -3.5], size: [2.1, 0.02, 0.6], color: '#3A2A18' }
    ],
    hotspots: [
      { id: 'hs2', label: 'Reception — VIP Check-in', position: [0, 1.1, -3.5], active: true, missionId: 'm4' }
    ]
  }
]

export const MISSIONS_INITIAL = [
  {
    id: 'm1', sceneId: 'restaurant', name: 'Welcoming Guests',
    description: 'Practice greeting guests warmly and professionally.',
    icon: 'fa-door-open', difficulty: 'easy', status: 'active',
    passingScore: 60, steps: 4, completionRate: 88,
  },
  {
    id: 'm2', sceneId: 'restaurant', name: 'Taking Food Orders',
    description: 'Learn to take orders accurately and suggest alternatives.',
    icon: 'fa-clipboard-list', difficulty: 'medium', status: 'active',
    passingScore: 60, steps: 6, completionRate: 74,
  },
  {
    id: 'm3', sceneId: 'restaurant', name: 'Beverage Recommendation',
    description: 'Suggest wines and drinks that complement dishes.',
    icon: 'fa-wine-glass', difficulty: 'medium', status: 'draft',
    passingScore: 60, steps: 5, completionRate: 61,
  },
  {
    id: 'm4', sceneId: 'vip', name: 'VIP Guest Check-in',
    description: 'Handle high-end guest check-in with full VIP protocol.',
    icon: 'fa-crown', difficulty: 'hard', status: 'active',
    passingScore: 70, steps: 8, completionRate: 52,
  },
  {
    id: 'm5', sceneId: 'vip', name: 'Lounge Ambience Briefing',
    description: 'Explain the lounge setting and amenities to guests.',
    icon: 'fa-music', difficulty: 'easy', status: 'inactive',
    passingScore: 60, steps: 3, completionRate: 33,
  },
]

export const STUDENTS_INITIAL = [
  { id: 's1', name: 'Nattaya Kanjana',   initials: 'NK', email: 'nattaya@email.com',   sessions: 24, avgScore: 91.2, lastActive: 'Today',      status: 'active',     color: 'teal' },
  { id: 's2', name: 'Somchai Chai',      initials: 'SC', email: 'somchai@email.com',   sessions: 18, avgScore: 87.5, lastActive: 'Today',      status: 'active',     color: 'blue' },
  { id: 's3', name: 'Pimchanok Araya',   initials: 'PA', email: 'pimchanok@email.com', sessions: 20, avgScore: 83.0, lastActive: 'Yesterday',  status: 'active',     color: 'amber' },
  { id: 's4', name: 'Wanchai Thong',     initials: 'WT', email: 'wanchai@email.com',   sessions: 7,  avgScore: 78.4, lastActive: '3 days ago', status: 'active',     color: 'gray' },
  { id: 's5', name: 'Prayuth Sawat',     initials: 'PS', email: 'prayuth@email.com',   sessions: 6,  avgScore: 48.3, lastActive: '3 days ago', status: 'needs-help', color: 'red' },
  { id: 's6', name: 'Manee Sriwan',      initials: 'MS', email: 'manee@email.com',     sessions: 15, avgScore: 72.1, lastActive: '1 week ago', status: 'active',     color: 'teal' },
  { id: 's7', name: 'Krit Boonsong',     initials: 'KB', email: 'krit@email.com',      sessions: 3,  avgScore: 65.0, lastActive: '2 weeks ago',status: 'inactive',   color: 'gray' },
]

export const ACTIVITY = [
  { id: 1, type: 'success', text: 'Nattaya K. completed "Welcoming Guests"', score: 88, time: '2m ago' },
  { id: 2, type: 'info',    text: 'Admin added new mission "Wine Service" to VIP Lounge', time: '15m ago' },
  { id: 3, type: 'danger',  text: 'Prayuth S. failed AI speech check — "Taking Orders" (42/100)', time: '1h ago' },
  { id: 4, type: 'warning', text: '3 new students registered today', time: '3h ago' },
  { id: 5, type: 'success', text: 'Somchai C. completed "VIP Check-in"', score: 79, time: '4h ago' },
]

export const CURRICULUM_INITIAL = [
  {
    id: 'w1',
    week: 1,
    title: 'คำศัพท์อุปกรณ์ในห้องอาหาร (Restaurant Equipment Vocabulary)',
    description: 'เรียนรู้คำศัพท์และอุปกรณ์ในห้องอาหาร ชื่อ หน้าที่ และวิธีการใช้งาน การสื่อสารภาษาอังกฤษตามมาตรฐานคุณวุฒิวิชาชีพ โดยใช้เทคโนโลยี AR และ AI ร่วมกับสถานการณ์จำลอง (Simulation)',
    objectives: [
      'บอกชื่ออุปกรณ์ในห้องอาหารเป็นภาษาอังกฤษได้ถูกต้อง',
      'อธิบายหน้าที่และความสำคัญของอุปกรณ์บนโต๊ะอาหารได้',
      'ออกเสียงคำศัพท์และใช้ AR/AI เพื่อการเรียนรู้อุปกรณ์ได้อย่างคล่องแคล่ว',
      'จำแนกอุปกรณ์และปฏิบัติงานจัดโต๊ะร่วมกับผู้อื่นได้อย่างมีประสิทธิภาพ'
    ],
    missionIds: [],
    mediaUrl: '/table_service.png',
    mediaType: 'image'
  },
  {
    id: 'w2',
    week: 2,
    title: 'คำศัพท์เมนูอาหารและเครื่องดื่ม (Food & Beverage Menu Vocabulary)',
    description: 'ฝึกฝนคำศัพท์เกี่ยวกับประเภทเมนูอาหารและเครื่องดื่มสากล การอ่านออกเสียงเมนู ส่วนประกอบหลัก และทักษะภาษาอังกฤษเพื่อช่วยเหลือลูกค้าที่มีข้อจำกัดในการรับประทานอาหาร',
    objectives: [
      'บอกคำศัพท์และจำแนกหมวดหมู่ประเภทเมนูอาหารและเครื่องดื่มสากลได้',
      'อ่านสะกดและออกเสียงชื่อเมนูภาษาอังกฤษได้อย่างชัดเจนและถูกต้อง',
      'นำเสนอและอธิบายรายละเอียดเมนูแนะนำ (Chef\'s Recommendation) เป็นภาษาอังกฤษได้',
      'ประยุกต์ใช้ภาษาอังกฤษในการตอบข้อซักถามเกี่ยวกับเมนูในสถานการณ์จำลองได้'
    ],
    missionIds: [],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w3',
    week: 3,
    title: 'Greeting & Welcoming (การต้อนรับและทักทายลูกค้า)',
    description: 'เรียนรู้ประโยคมาตรฐานและจังหวะมารยาทสากลในการกล่าวทักทายต้อนรับลูกค้าที่หน้าร้านอาหาร การตรวจสอบสถานะการจองโต๊ะ (Reservation Checking) และการผายมือนำทางเดินส่งลูกค้าไปยังโต๊ะ',
    objectives: [
      'กล่าวทักทายต้อนรับลูกค้า (Greeting & Welcoming) ตามมาตรฐานสากลด้วยความสุภาพ',
      'ใช้สำนวนภาษาอังกฤษในการเช็คบุ๊กกิ้งและจดบันทึกการจองของลูกค้าได้อย่างถูกต้อง',
      'แสดงบทบาทพนักงานต้อนรับนำทางโต๊ะและแก้ไขปัญหาร้านโต๊ะเต็มเฉพาะหน้าได้อย่างราบรื่น'
    ],
    missionIds: ['m1'],
    mediaUrl: '/welcoming_guests.png',
    mediaType: 'image'
  },
  {
    id: 'w4',
    week: 4,
    title: 'Seating & Small Talk (การนำลูกค้าไปที่โต๊ะและการชวนคุย)',
    description: 'เรียนรู้ขั้นตอนการนำลูกค้าไปยังโต๊ะอาหารที่เหมาะสม (Escorting and Seating) และการชวนคุยสร้างความคุ้นเคยเบื้องต้นเพื่อสร้างความประทับใจแรก',
    objectives: [
      'สื่อสารเพื่อนำทางลูกค้าไปยังโต๊ะอาหารอย่างสุภาพ',
      'ฝึกฝนทักษะการชวนคุย (Small talk) เบื้องต้นอย่างเป็นธรรมชาติ',
      'จัดเตรียมคำพูดในการบริการลูกค้าและรับมือคำขอพิเศษ'
    ],
    missionIds: ['m1'],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w5',
    week: 5,
    title: 'Food Description (การแนะนำรายการอาหาร)',
    description: 'ฝึกฝนการอธิบายและแนะนำรายการอาหาร การบอกส่วนผสมหลัก วิธีการปรุง และจุดเด่นของเมนูแนะนำแก่ลูกค้า',
    objectives: [
      'ใช้คำศัพท์เกี่ยวกับรสชาติและการปรุงอาหารเพื่ออธิบายเมนู',
      'นำเสนอเมนูแนะนำ (Chef\'s Recommendation) ได้อย่างน่าดึงดูด',
      'อธิบายส่วนผสมหลักและแจ้งสารก่อภูมิแพ้ได้อย่างถูกต้อง'
    ],
    missionIds: ['m2'],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w6',
    week: 6,
    title: 'Beverage Recommendation (การแนะนำเครื่องดื่ม)',
    description: 'ฝึกแนะนำและเสนอขายเครื่องดื่มประเภทต่างๆ ที่จับคู่กับอาหารจานหลักได้อย่างเหมาะสม (Beverage Pairing)',
    objectives: [
      'แนะนำเครื่องดื่มที่เข้ากันได้ดีกับอาหารแต่ละประเภท (Wine pairing)',
      'อธิบายจุดเด่นและรสชาติของเครื่องดื่มแก้วต่างๆ ได้อย่างเป็นมืออาชีพ',
      'เสนอขายเครื่องดื่มพิเศษเพื่อเพิ่มยอดขายให้กับห้องอาหาร'
    ],
    missionIds: ['m3'],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w7',
    week: 7,
    title: 'Taking Orders Pattern (แพทเทิร์นการรับออเดอร์)',
    description: 'ฝึกฝนประโยคมาตรฐานและแพทเทิร์นภาษาอังกฤษสำหรับการรับออเดอร์อาหารและเครื่องดื่ม การทวนออเดอร์ และการบันทึกออเดอร์อย่างถูกต้อง',
    objectives: [
      'ใช้ประโยคมาตรฐานในการสอบถามเพื่อรับออเดอร์จากลูกค้า',
      'ฝึกการทวนออเดอร์ (Order confirmation) เพื่อป้องกันความผิดพลาด',
      'เรียนรู้รูปแบบและระบบย่อในการจดบันทึกออเดอร์'
    ],
    missionIds: ['m2'],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w8',
    week: 8,
    title: 'Order Taking Simulation (จำลองการรับออเดอร์จริง)',
    description: 'การจำลองสถานการณ์การปฏิบัติงานรับออเดอร์จากลูกค้าแบบเสมือนจริง โดยใช้ใบสั่งอาหารและสื่อความจริงเสมือนในการบันทึกข้อมูล',
    objectives: [
      'ปฏิบัติงานรับออเดอร์และตอบคำถามเกี่ยวกับรายการอาหารได้อย่างลื่นไหล',
      'ประยุกต์ใช้แพทเทิร์นภาษาอังกฤษในสถานการณ์จำลองหน้าโต๊ะอาหาร',
      'สรุปความต้องการของลูกค้าลงในใบสั่งอาหาร (Order Sheet) ได้ถูกต้อง'
    ],
    missionIds: ['m2'],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w9',
    week: 9,
    title: 'ขั้นตอนการเสิร์ฟอาหาร (Food Serving)',
    description: 'เรียนรู้ขั้นตอนและทิศทางในการเสิร์ฟอาหารตามมาตรฐานสากล การเสิร์ฟจานหลัก จานสลัด และการเคลียร์จานที่ใช้แล้ว',
    objectives: [
      'อธิบายขั้นตอนการเสิร์ฟอาหารจากด้านที่ถูกต้องตามหลักสากล',
      'ใช้ประโยคภาษาอังกฤษขณะนำเสนอจานอาหารแก่ลูกค้า',
      'เรียนรู้วิธีการเคลียร์โต๊ะอาหาร (Table clearing) อย่างสุภาพ'
    ],
    missionIds: [],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w10',
    week: 10,
    title: 'การบริการเครื่องดื่ม (Beverage Service)',
    description: 'ฝึกปฏิบัติการเสิร์ฟเครื่องดื่มประเภทต่างๆ ทั้งแบบร้อนและเย็น การรินไวน์ การบริการน้ำเปล่า และการใช้อุปกรณ์จริงร่วมกับ AR',
    objectives: [
      'สื่อสารภาษาอังกฤษและปฏิบัติการเสิร์ฟเครื่องดื่มตามลำดับความสำคัญ',
      'เรียนรู้วิธีการจับแก้วและการรินน้ำเปล่าหรือไวน์ที่ถูกต้อง',
      'ฝึกทักษะการประสานงานและจังหวะเวลาในการเสิร์ฟเครื่องดื่ม'
    ],
    missionIds: ['m3'],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w11',
    week: 11,
    title: 'Gueridon Service (การบริการแบบรถเข็น)',
    description: 'ศึกษาและทำความเข้าใจเกี่ยวกับการบริการอาหารข้างโต๊ะลูกค้าโดยใช้รถเข็นเกอริดอง (Gueridon) ตั้งแต่การเตรียมวัตถุดิบ การปรุง และการจัดจาน',
    objectives: [
      'เข้าใจหลักการเบื้องต้นของการปรุงอาหารข้างโต๊ะ (Flambé or Carving)',
      'อธิบายขั้นตอนการใช้รถเข็นเกอริดองเป็นภาษาอังกฤษ',
      'เรียนรู้วิธีการทำงานร่วมกันเป็นทีมในการเสิร์ฟแบบเกอริดอง'
    ],
    missionIds: [],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w12',
    week: 12,
    title: 'Room Service Procedure (ขั้นตอนการบริการบนห้องพัก)',
    description: 'เรียนรู้วิธีการรับออเดอร์ทางโทรศัพท์และการขึ้นไปบริการอาหารและเครื่องดื่มแก่ผู้เข้าพักในห้องพัก (In-Room Dining)',
    objectives: [
      'รับออเดอร์ทางโทรศัพท์ด้วยน้ำเสียงและประโยคที่เป็นมืออาชีพ',
      'ตรวจสอบและจัดถาดอาหารสำหรับขึ้นบริการบนห้องพักอย่างเรียบร้อย',
      'ปฏิบัติการเคาะประตู แนะนำตัว และเสิร์ฟอาหารในห้องพักของลูกค้า'
    ],
    missionIds: [],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w13',
    week: 13,
    title: 'Billing Vocabulary (คำศัพท์การชำระเงิน)',
    description: 'ศึกษาประโยคและคำศัพท์เกี่ยวกับการคิดเงิน การแยกบิล การชำระด้วยบัตรเครดิต หรือเงินสด ตลอดจนการทำความเข้าใจค่าบริการและภาษีมูลค่าเพิ่ม',
    objectives: [
      'เรียนรู้คำศัพท์เกี่ยวกับใบเสร็จ ภาษี (VAT) และค่าบริการ (Service Charge)',
      'ฝึกสนทนาเมื่อลูกค้าขอเช็คบิลและขอคำชี้แจงเกี่ยวกับรายการในใบเสร็จ',
      'แก้ปัญหาเมื่อมีการทักท้วงเรื่องราคาหรือยอดเงินไม่ถูกต้อง'
    ],
    missionIds: [],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w14',
    week: 14,
    title: 'Closing Service (การปิดการบริการ)',
    description: 'ขั้นตอนสุดท้ายของการต้อนรับ การลาลูกค้า การอวยพรให้เดินทางปลอดภัย และการจัดเตรียมโต๊ะสำหรับรอบถัดไป',
    objectives: [
      'กล่าวขอบคุณและอวยพรลูกค้า (Farewell standard phrases) อย่างจริงใจ',
      'สอบถามความพึงพอใจโดยรวมของลูกค้า (Feedback request) เป็นภาษาอังกฤษ',
      'ปฏิบัติงานส่งลูกค้าออกจากร้านอย่างอบอุ่นและสร้างความสัมพันธ์ที่ดี'
    ],
    missionIds: [],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w15',
    week: 15,
    title: 'Complaint Handling (การจัดการข้อร้องเรียน)',
    description: 'ฝึกฝนการแก้ไขปัญหาเมื่อเจอลูกค้าที่ไม่พอใจอาหาร บริการ หรือความล่าช้า โดยใช้หลักการฟังอย่างเห็นอกเห็นใจ (Empathy) และหาทางออก',
    objectives: [
      'ใช้หลัก LAST (Listen, Apologize, Solve, Thank) เพื่อแก้ปัญหาข้อร้องเรียน',
      'ใช้ประโยคขออภัยอย่างเป็นทางการสำหรับความล่าช้าหรือความผิดพลาด',
      'ระงับอารมณ์และเจรจาโต้ตอบกับลูกค้าอย่างใจเย็นและเป็นมืออาชีพ'
    ],
    missionIds: [],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w16',
    week: 16,
    title: 'Service Recovery (การฟื้นฟูความพึงพอใจ)',
    description: 'เรียนรู้แนวทางการชดเชยเพื่อกู้คืนความพึงพอใจของลูกค้า เช่น การแถมของหวาน การลดราคา หรือการอัปเกรดบริการ พร้อมการบันทึกรายงาน',
    objectives: [
      'เสนอทางเลือกการชดเชย (Service recovery compensation) อย่างเหมาะสม',
      'เจรจาเพื่อเปลี่ยนทัศนคติของลูกค้าให้กลับมารู้สึกดีกับห้องอาหาร',
      'เรียนรู้วิธีสรุปและบันทึกรายงานเหตุการณ์เพื่อส่งต่อให้หัวหน้างาน'
    ],
    missionIds: [],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w17',
    week: 17,
    title: 'Integrated Restaurant Service (บูรณาการบริการร้านอาหารแบบ FINE Model)',
    description: 'การรวมทักษะตั้งแต่สัปดาห์แรกจนถึงปัจจุบัน ปฏิบัติงานแบบครบวงจรตามขั้นตอน FINE Model (Familiarize, Interact, Navigate, Exhibit)',
    objectives: [
      'F - Familiarize: ทบทวนองค์ความรู้ทั้งหมดผ่าน AR Restaurant Simulation',
      'I - Interact: แบ่งกลุ่มปฏิบัติสลับบทบาทพนักงาน (Host, Waiter, Cashier) และลูกค้า',
      'N - Navigate: แก้ไขสถานการณ์ท้าทายเฉพาะหน้า เช่น ลูกค้าแพ้อาหารหรือขอแยกบิล',
      'E - Exhibit: ประเมินสมรรถนะครบวงจร และจัดทำ Portfolio / Reflection Report'
    ],
    missionIds: ['m1', 'm2', 'm3'],
    mediaUrl: '',
    mediaType: 'image'
  },
  {
    id: 'w18',
    week: 18,
    title: 'ประเมินสมรรถนะปลายภาค (Final Performance Assessment)',
    description: 'การประเมินผลสมรรถนะการปฏิบัติงานจริงในห้องอาหารจำลอง โดยรับโจทย์สถานการณ์จริงเพื่อทดสอบความเป็นมืออาชีพตามเกณฑ์ Rubric 4 ระดับ',
    objectives: [
      'แสดงสมรรถนะตามมาตรฐานอาชีพการบริการอาหารและเครื่องดื่ม',
      'สื่อสารภาษาอังกฤษโต้ตอบในสถานการณ์ท้าทายได้อย่างคล่องแคล่วและมั่นใจ',
      'ได้รับการประเมินผลสัมฤทธิ์ระดับดีเยี่ยม-ดี-พอใช้-ปรับปรุง ตามเกณฑ์การประเมิน'
    ],
    missionIds: ['m1', 'm2', 'm3', 'm4'],
    mediaUrl: '',
    mediaType: 'image'
  }
];

export const VOCABULARIES_INITIAL = [
  {
    id: 'v1',
    word: 'Plate',
    phonetic: '/pleɪt/',
    definition: 'A flat dish, typically circular, from which food is served or eaten.',
    translation: 'จาน',
    imageUrl: '/vocabulary/plate.png',
    week: 1
  },
  {
    id: 'v2',
    word: 'Fork',
    phonetic: '/fɔːk/',
    definition: 'A pronged eating utensil used for lifting food to the mouth or holding it when cutting.',
    translation: 'ส้อม',
    imageUrl: '/vocabulary/fork.png',
    week: 1
  },
  {
    id: 'v3',
    word: 'Spoon',
    phonetic: '/spuːn/',
    definition: 'A utensil consisting of a small, shallow bowl on a handle, used for eating or serving liquid foods.',
    translation: 'ช้อน',
    imageUrl: '/vocabulary/spoon.png',
    week: 1
  },
  {
    id: 'v4',
    word: 'Knife',
    phonetic: '/naɪf/',
    definition: 'An instrument with a sharp blade fixed in a handle, used for cutting food at the table.',
    translation: 'มีด',
    imageUrl: '/vocabulary/knife.png',
    week: 1
  },
  {
    id: 'v5',
    word: 'Wine Glass',
    phonetic: '/waɪn ɡlɑːs/',
    definition: 'A glass container with a stem and a bowl, designed specifically for drinking wine.',
    translation: 'แก้วไวน์',
    imageUrl: '/vocabulary/wineglass.png',
    week: 1
  },
  {
    id: 'v5_napkin',
    word: 'Napkin',
    phonetic: '/ˈnæp.kɪn/',
    definition: 'A square piece of cloth or paper used at a meal to wipe the fingers or lips and to protect the clothes.',
    translation: 'ผ้าเช็ดปาก',
    imageUrl: '/vocabulary/napkin.png',
    week: 1
  },
  {
    id: 'v6',
    word: 'Appetizer',
    phonetic: '/ˈæp.ə.taɪ.zər/',
    definition: 'A small dish of food or a drink taken before a meal to stimulate the appetite.',
    translation: 'อาหารเรียกน้ำย่อย',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v7',
    word: 'Main Course',
    phonetic: '/meɪn kɔːs/',
    definition: 'The primary or most substantial dish of a meal, typically served after the appetizer.',
    translation: 'อาหารจานหลัก',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v8',
    word: 'Beverage',
    phonetic: '/ˈbev.ər.ɪdʒ/',
    definition: 'A drink other than water, such as tea, coffee, wine, or beer.',
    translation: 'เครื่องดื่ม',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v9',
    word: 'Dessert',
    phonetic: '/dɪˈzɜːt/',
    definition: 'A sweet course eaten at the end of a meal.',
    translation: 'ของหวาน',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v9_salad',
    word: 'Salad',
    phonetic: '/ˈsæl.əd/',
    definition: 'A cold dish of various mixtures of raw or cooked vegetables, usually served with dressing.',
    translation: 'สลัด',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v9_soup',
    word: 'Soup',
    phonetic: '/suːp/',
    definition: 'A liquid dish made by boiling meat, fish, or vegetables in stock or water.',
    translation: 'ซุป',
    imageUrl: '',
    week: 2
  },
  {
    id: 'v10',
    word: 'Reservation',
    phonetic: '/ˌrez.əˈveɪ.ʃən/',
    definition: 'An arrangement to lock a table in a restaurant in advance.',
    translation: 'การสำรองที่นั่ง',
    imageUrl: '',
    week: 3
  },
  {
    id: 'v11',
    word: 'Greeting',
    phonetic: '/ˈɡriː.tɪŋ/',
    definition: 'Polite words or sign of welcome when meeting someone.',
    translation: 'การทักทาย',
    imageUrl: '',
    week: 3
  },
  {
    id: 'v11_welcoming',
    word: 'Welcoming',
    phonetic: '/ˈwel.kə.mɪŋ/',
    definition: 'The act of greeting and receiving guests warmly upon their arrival.',
    translation: 'การต้อนรับ',
    imageUrl: '',
    week: 3
  },
  {
    id: 'v11_smalltalk',
    word: 'Small Talk',
    phonetic: '/smɔːl tɔːk/',
    definition: 'Polite, friendly, and informal conversation about light or general topics.',
    translation: 'การสนทนาชวนคุยเรื่องทั่วไป',
    imageUrl: '',
    week: 3
  },
  {
    id: 'v12',
    word: 'Escort',
    phonetic: '/ɪˈskɔːt/',
    definition: 'To accompany guests to their assigned tables or seats.',
    translation: 'การนำทาง / การเดินนำ',
    imageUrl: '',
    week: 4
  },
  {
    id: 'v13',
    word: 'Sommelier',
    phonetic: '/sɒmˈel.jeɪ/',
    definition: 'A trained and knowledgeable wine professional who specializes in wine service.',
    translation: 'พนักงานบริการไวน์',
    imageUrl: '',
    week: 6
  },
  {
    id: 'v14',
    word: 'Pairing',
    phonetic: '/ˈpeə.rɪŋ/',
    definition: 'The matching of food dishes with appropriate beverages, especially wine, to enhance flavor.',
    translation: 'การจับคู่เครื่องดื่มกับอาหาร',
    imageUrl: '',
    week: 6
  },
  {
    id: 'v15',
    word: 'Billing',
    phonetic: '/ˈbɪl.ɪŋ/',
    definition: 'The process of calculating and presenting the total amount owed by the guests.',
    translation: 'ขั้นตอนการคิดเงินและเรียกเก็บเงิน',
    imageUrl: '',
    week: 13
  },
  {
    id: 'v16',
    word: 'Service Charge',
    phonetic: '/ˈsɜː.vɪs tʃɑːdʒ/',
    definition: 'An additional fee added to a bill for the service provided.',
    translation: 'ค่าบริการ (มักเพิ่ม 10%)',
    imageUrl: '',
    week: 13
  },
  {
    id: 'v17',
    word: 'VAT',
    phonetic: '/væt/',
    definition: 'Value Added Tax; a consumption tax placed on products and services.',
    translation: 'ภาษีมูลค่าเพิ่ม',
    imageUrl: '',
    week: 13
  },
  {
    id: 'v18',
    word: 'Complaint',
    phonetic: '/kəmˈpleɪnt/',
    definition: 'A statement that something is unsatisfactory or unacceptable.',
    translation: 'ข้อร้องเรียน / คำร้องเรียน',
    imageUrl: '',
    week: 15
  },
  {
    id: 'v19',
    word: 'Apologize',
    phonetic: '/əˈpɒl.ə.dʒaɪz/',
    definition: 'To express regret for something that one has done wrong or a service failure.',
    translation: 'กล่าวคำขอโทษ',
    imageUrl: '',
    week: 15
  },
  {
    id: 'v20',
    word: 'Service Recovery',
    phonetic: '/ˈsɜː.vɪs rɪˈkʌv.ər.i/',
    definition: 'The action a service provider takes in response to a service failure to restore satisfaction.',
    translation: 'การฟื้นฟูความพึงพอใจการบริการ',
    imageUrl: '',
    week: 16
  },
  {
    id: 'v21',
    word: 'Performance',
    phonetic: '/pəˈfɔː.məns/',
    definition: 'The act of performing a task or duty, or showing practical skills under assessment.',
    translation: 'สมรรถนะการปฏิบัติงาน',
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
  }
];

export const SCENES = SCENES_INITIAL


