import { useState, useMemo, useEffect, useRef } from "react";

const LOGO_URL = "https://i.ibb.co/uploads/WhatsApp_Image_2026-04-11.jpeg";

const I = [
  "https://i.ibb.co/Zpv9j47X/mixboard-image-26.png","https://i.ibb.co/KxZx2D5V/mixboard-image-27.png","https://i.ibb.co/LdpQ99Tj/mixboard-image-28.png","https://i.ibb.co/jZbg72wS/mixboard-image-29.png","https://i.ibb.co/fVtzhdbD/mixboard-image-31.png","https://i.ibb.co/HTnGqnsP/mixboard-image-32.png","https://i.ibb.co/S4bJvycf/mixboard-image-34.png","https://i.ibb.co/R8QFnVB/mixboard-image-35.png","https://i.ibb.co/d0Km2Y2v/mixboard-image-36.png","https://i.ibb.co/20XxtbCH/mixboard-image-39.png","https://i.ibb.co/TS1SRBZ/mixboard-image-40.png","https://i.ibb.co/CKvjN3hY/mixboard-image-41.png","https://i.ibb.co/FqYPRvbx/mixboard-image-42.png","https://i.ibb.co/CKS23Hhq/mixboard-image-43.png","https://i.ibb.co/32DWrh8/mixboard-image-44.png","https://i.ibb.co/jPLWgdJM/mixboard-image-45.png","https://i.ibb.co/DgSXmv68/mixboard-image-46.png","https://i.ibb.co/rGqCCbBG/mixboard-image-47.png","https://i.ibb.co/mr6hkgFy/mixboard-image-48.png","https://i.ibb.co/C5Y1ks0k/mixboard-image-49.png","https://i.ibb.co/gMSk1PBm/mixboard-image-50.png","https://i.ibb.co/JjjMLZw0/mixboard-image-51.png","https://i.ibb.co/1G1RcmBb/mixboard-image-52.png","https://i.ibb.co/0jMHC6b6/mixboard-image-53.png","https://i.ibb.co/fGpPyF1t/mixboard-image-54.png","https://i.ibb.co/GQW8GWWw/mixboard-image-55.png","https://i.ibb.co/WWh5Y27H/mixboard-image-56.png","https://i.ibb.co/Hp4Zh20r/mixboard-image-57.png","https://i.ibb.co/pjS5PcCD/mixboard-image-58.png","https://i.ibb.co/q35fM5nJ/mixboard-image-59.png","https://i.ibb.co/Y4NV7grw/mixboard-image-60.png","https://i.ibb.co/RkYC0PV4/mixboard-image-61.png","https://i.ibb.co/LhbsQSDB/mixboard-image-62.png","https://i.ibb.co/4ZDGTXgS/mixboard-image-63.png","https://i.ibb.co/fdnvcGqq/mixboard-image-64.png","https://i.ibb.co/7B4HHky/mixboard-image-65.png","https://i.ibb.co/p6JSqmXr/mixboard-image-66.png","https://i.ibb.co/J9kxNLn/mixboard-image-67.png","https://i.ibb.co/6RTCnfPH/mixboard-image-68.png","https://i.ibb.co/wFmcVXmf/mixboard-image-69.png","https://i.ibb.co/GQKt9G9m/mixboard-image-71.png","https://i.ibb.co/ym2LDbWc/mixboard-image-72.png","https://i.ibb.co/fGBddskr/mixboard-image-73.png","https://i.ibb.co/23vry85M/mixboard-image-74.png","https://i.ibb.co/TDfh2Vc2/mixboard-image-75.png","https://i.ibb.co/hFsQZPTb/mixboard-image-76.png","https://i.ibb.co/SXKfdWsx/mixboard-image-77.png","https://i.ibb.co/0pHGfmdS/mixboard-image-78.png","https://i.ibb.co/WWGL1QcG/mixboard-image-79.png"
];

const parsePrice = (s) => parseFloat(String(s).replace(/[^\d.]/g, "")) || 0;

const rawButcher = [
  {section:"beef",title:"اللحوم البقري",titleEn:"Beef",items:[
    {ar:"انتركوت",en:"Entrecôte",price:"75 درهم",img:I[0]},{ar:"مكعبات لحم",en:"Beef Cubes",price:"60 درهم",img:I[1]},{ar:"لحم مفروم",en:"Minced Meat",price:"60 درهم",img:I[2]},{ar:"روستو",en:"Roast Beef",price:"60 درهم",img:I[3]},{ar:"بيكاتا",en:"Piccata",price:"60 درهم",img:I[4]},{ar:"بوفتيك",en:"Buftek",price:"60 درهم",img:I[5]},{ar:"بيف استروجانوف",en:"Beef Stroganoff",price:"60 درهم",img:I[6]},{ar:"شاورما اللحم",en:"Meat Shawarma",price:"60 درهم",img:I[7]},{ar:"فيليه أستيك",en:"Steak Fillet",price:"115 درهم",img:I[8]},{ar:"كبدة بقري",en:"Sliced Liver",price:"58 درهم",img:I[9]},{ar:"ريش بتلو",en:"Beef Chops",price:"80 درهم",img:I[10]},{ar:"ريب آي",en:"Ribeye",price:"75 درهم",img:I[11]},{ar:"موزة بقري بدون عظم",en:"Beef Shank boneless",price:"60 درهم",img:I[12]},{ar:"موزة بقري بالعظم",en:"Beef Shank with bone",price:"58 درهم",img:I[13]},{ar:"كبدة إسكندراني",en:"Alexandrian Liver",price:"58 درهم",img:I[14]},{ar:"رقبة بتلو",en:"Neck Beef",price:"58 درهم",img:I[15]},{ar:"عكاوي",en:"Oxtail",price:"42 درهم",img:I[16]},{ar:"كوارع",en:"Trotters",price:"35 درهم",img:I[17]},
  ]},
  {section:"naimi",title:"لحوم ضاني نعيمي",titleEn:"Naimi Lamb",items:[
    {ar:"موزة ضاني نعيمي",en:"Naimi Lamb Shank",price:"69 درهم",img:I[18]},{ar:"كتف ضاني نعيمي",en:"Naimi Lamb Shoulder",price:"68 درهم",img:I[19]},{ar:"ريش ضاني نعيمي",en:"Naimi Lamb Chops",price:"115 درهم",img:I[20]},{ar:"خروف نعيمي بدون عظم",en:"Naimi Lamb boneless",price:"79 درهم",img:I[21]},{ar:"فخذة ضاني نعيمي",en:"Naimi Lamb Leg",price:"68 درهم",img:I[22]},{ar:"رقبة ضاني نعيمي",en:"Naimi Lamb Neck",price:"68 درهم",img:I[23]},
  ]},
  {section:"aus",title:"لحوم ضاني أسترالي",titleEn:"Australian Lamb",items:[
    {ar:"رقبة ضاني أسترالي",en:"Aus. Lamb Neck",price:"58 درهم",img:I[24]},{ar:"فخذة ضاني أسترالي",en:"Aus. Lamb Leg",price:"58 درهم",img:I[25]},{ar:"كتف ضاني أسترالي",en:"Aus. Lamb Shoulder",price:"58 درهم",img:I[26]},{ar:"لحم أسترالي بدون عظم",en:"Aus. Lamb boneless",price:"70 درهم",img:I[27]},{ar:"ريش ضاني أسترالي",en:"Aus. Lamb Chops",price:"115 درهم",img:I[28]},{ar:"موزة ضاني أسترالي",en:"Aus. Lamb Shank",price:"60 درهم",img:I[29]},
  ]},
  {section:"chicken",title:"دجاج وطيور",titleEn:"Poultry",items:[
    {ar:"أفخاذ بالعظم",en:"Chicken Thighs",price:"38 درهم",img:I[30]},{ar:"دجاج مكعبات",en:"Chicken Cubes",price:"45 درهم",img:I[31]},{ar:"صدور دجاج أستيك",en:"Chicken Steak",price:"45 درهم",img:I[32]},{ar:"صدور دجاج مخلية",en:"Chicken Breast",price:"45 درهم",img:I[33]},{ar:"دجاجة كاملة",en:"Full Chicken",price:"25 درهم",img:I[34]},{ar:"جوز حمام مصري",en:"Egyptian Pigeons",price:"50 درهم",img:I[35]},{ar:"دجاج بلدي مصري",en:"Egyptian Chicken",price:"45 درهم",img:I[36]},{ar:"بط بلدي مصري",en:"Egyptian Duck",price:"45 درهم",img:I[37]},{ar:"أرنب بلدي مصري",en:"Egyptian Rabbit",price:"46 درهم",img:I[38]},{ar:"ديك رومي أمريكي",en:"American Turkey",price:"39 درهم",img:I[39]},{ar:"ديك رومي مصري",en:"Egyptian Turkey",price:"47 درهم",img:I[40]},
  ]},
  {section:"grill-ready",title:"جاهز للشواء",titleEn:"Ready-to-Grill",items:[
    {ar:"ستيك فيليه متبل",en:"Marinated Steak Fillet",price:"115 درهم",img:I[41]},{ar:"سجق متبل",en:"Marinated Sausages",price:"58 درهم",img:I[42]},{ar:"كبدة شرايح متبلة",en:"Marinated Liver",price:"60 درهم",img:I[43]},{ar:"طرب متبل",en:"Marinated Tarb",price:"60 درهم",img:I[44]},{ar:"ريش متبلة",en:"Marinated Lamb Chops",price:"115 درهم",img:I[45]},{ar:"كفتة متبلة",en:"Marinated Kofta",price:"58 درهم",img:I[46]},{ar:"كباب متبل",en:"Marinated Kabab",price:"100 درهم",img:I[47]},{ar:"ريب آي متبل",en:"Marinated Ribeye",price:"78 درهم",img:I[48]},{ar:"شيش طاووق متبل",en:"Marinated Shish Taoug",price:"45 درهم",img:I[0]},{ar:"رغيف حواوشي بلدي",en:"Hawawshi Meat",price:"13 درهم",img:I[1]},{ar:"برجر فراخ",en:"Chicken Burger",price:"45 درهم",img:I[2]},{ar:"برجر واجيو",en:"Wagyu Burger",price:"80 درهم",img:I[3]},{ar:"دجاج كامل متبل",en:"Marinated Whole Chicken",price:"45 درهم",img:I[4]},{ar:"ستيك دجاج متبل",en:"Marinated Chicken Steak",price:"45 درهم",img:I[5]},{ar:"أفخاذ دجاج متبلة",en:"Marinated Chicken Thighs",price:"50 درهم",img:I[6]},{ar:"شيش طاووق أفخاذ",en:"Shish Tawook Thighs",price:"50 درهم",img:I[7]},
  ]},
  {section:"fry-ready",title:"جاهز على التحمير",titleEn:"Ready-to-Fry",items:[
    {ar:"كفتة فراخ بانيه",en:"Chicken Kofta Pane",price:"50 درهم",img:I[8]},{ar:"كفتة لحمة بانيه",en:"Meat Kofta Pane",price:"50 درهم",img:I[9]},{ar:"اسكالوب فراخ",en:"Chicken Escalope",price:"45 درهم",img:I[10]},{ar:"اسكالوب لحمة",en:"Meat Escalope",price:"60 درهم",img:I[11]},{ar:"فرخة محشية رز",en:"Chicken Stuffed Rice",price:"35 درهم",img:I[12]},{ar:"جوز حمام بالفريك",en:"Pigeon Freekeh",price:"75 درهم",img:I[13]},{ar:"جوز حمام بالأرز",en:"Pigeon Rice",price:"73 درهم",img:I[14]},{ar:"كفتة رز",en:"Rice Kofta",price:"48 درهم",img:I[15]},{ar:"شاورما لحم",en:"Beef Shawarma",price:"62 درهم",img:I[16]},{ar:"شاورما دجاج",en:"Chicken Shawarma",price:"45 درهم",img:I[17]},{ar:"كبدة إسكندراني",en:"Alexandrian Liver",price:"60 درهم",img:I[18]},{ar:"كبدة بالردة",en:"Breaded Liver",price:"60 درهم",img:I[19]},{ar:"ممبار",en:"Mumbar",price:"60 درهم",img:I[20]},
  ]},
];

const rawRestaurant = [
  {section:"soups",title:"الشوربة",titleEn:"Soups",items:[
    {ar:"شوربة عدس",en:"Lentil Soup",price:"15 درهم",img:I[21]},{ar:"شوربة لسان عصفور",en:"Orzo Soup",price:"15 درهم",img:I[22]},{ar:"شوربة كوارع",en:"Trotters Soup",price:"25 درهم",img:I[23]},
  ]},
  {section:"salads",title:"السلطات والمقبلات",titleEn:"Salads",items:[
    {ar:"سلطة بلدي",en:"Baladi Salad",price:"15 درهم",img:I[24]},{ar:"حمص",en:"Hummus",price:"20 درهم",img:I[25]},{ar:"بابا غنوج",en:"Baba Ghanoush",price:"20 درهم",img:I[26]},{ar:"طحينة",en:"Tahini",price:"18 درهم",img:I[27]},{ar:"تومية",en:"Toum",price:"18 درهم",img:I[28]},
  ]},
  {section:"hot",title:"مقبلات ساخنة",titleEn:"Hot Appetizers",items:[
    {ar:"كبدة إسكندراني",en:"Alexandrian Liver",price:"31.99 درهم",img:I[29]},{ar:"سجق إسكندراني",en:"Alexandrian Sausage",price:"31.99 درهم",img:I[30]},{ar:"فراخ محمرة ١/٤",en:"Fried Chicken 1/4",price:"15 درهم",img:I[31]},{ar:"بطاطس مقلية",en:"French Fries",price:"15 درهم",img:I[32]},
  ]},
  {section:"mahashi",title:"المحاشي",titleEn:"Mahashi",items:[
    {ar:"ورق عنب",en:"Grape Leaves",price:"30 درهم",img:I[33]},{ar:"ممبار",en:"Mombar",price:"40 درهم",img:I[34]},{ar:"محشي كرنب",en:"Stuffed Cabbage",price:"30 درهم",img:I[35]},{ar:"محاشي مشكلة",en:"Mixed Mahashi",price:"40 درهم",img:I[36]},{ar:"محاشي مشكلة ١ كيلو",en:"Mixed Mahashi 1KG",price:"70 درهم",img:I[37]},
  ]},
  {section:"nile",title:"أطباق النيل المميزة",titleEn:"Nile Specialties",items:[
    {ar:"مكرونة بشاميل",en:"Béchamel Pasta",price:"35 درهم",img:I[38]},{ar:"معكرونة بالسجق الشرقي",en:"Pasta Oriental Sausage",price:"35 درهم",img:I[39]},{ar:"رقاق باللحم المفروم",en:"Minced Meat Ragaq",price:"30 درهم",img:I[40]},{ar:"إسكالوب دجاج",en:"Chicken Escalope",price:"35 درهم",img:I[41]},{ar:"فتة بمكعبات لحم بقري",en:"Fattah Beef Cubes",price:"55 درهم",img:I[42]},{ar:"فتة موزة ضاني",en:"Fattah Lamb Shank",price:"60 درهم",img:I[43]},{ar:"فتة مع كوارع",en:"Fattah Trotters",price:"55 درهم",img:I[44]},{ar:"دجاجة كاملة محشوة",en:"Whole Stuffed Chicken",price:"50 درهم",img:I[45]},{ar:"حمام محشو بالأرز (حبة)",en:"Stuffed Pigeon Rice (1pc)",price:"55 درهم",img:I[46]},{ar:"حمام محشو بالأرز (حبتان)",en:"Stuffed Pigeon Rice (2pc)",price:"105 درهم",img:I[47]},{ar:"حمام محشو بالفريك (حبة)",en:"Pigeon Freek (1pc)",price:"55 درهم",img:I[48]},{ar:"حمام محشو بالفريك (حبتان)",en:"Pigeon Freek (2pc)",price:"110 درهم",img:I[0]},{ar:"نصف بطة مع محاشي",en:"Half Duck with Mahashi",price:"110 درهم",img:I[1]},{ar:"نصف بطة مشوية بالفرن",en:"Half Roasted Duck",price:"100 درهم",img:I[2]},{ar:"كتف ضأني بالفرن",en:"Baked Lamb Shoulder",price:"200 درهم",img:I[3]},
  ]},
  {section:"grills",title:"المشويات",titleEn:"Grills",items:[
    {ar:"كباب",en:"Kebab",price:"59 درهم",img:I[4],variants:[{l:"نص كيلو",v:"87.5 درهم"},{l:"كيلو",v:"175 درهم"}]},{ar:"كفتة",en:"Kofta",price:"55 درهم",img:I[5],variants:[{l:"نص كيلو",v:"80 درهم"},{l:"كيلو",v:"160 درهم"}]},{ar:"ريش ضاني مشوية",en:"Grilled Lamb Chops",price:"60 درهم",img:I[6],variants:[{l:"نص كيلو",v:"92.5 درهم"},{l:"كيلو",v:"185 درهم"}]},{ar:"طرب",en:"Tarab",price:"55 درهم",img:I[7],variants:[{l:"نص كيلو",v:"82.5 درهم"},{l:"كيلو",v:"165 درهم"}]},{ar:"شيش طاووق",en:"Shish Tawook",price:"50 درهم",img:I[8],variants:[{l:"نص كيلو",v:"62.5 درهم"},{l:"كيلو",v:"125 درهم"}]},{ar:"مشاوي مشكلة النيل",en:"Nile Mixed Grills",price:"59 درهم",img:I[9],variants:[{l:"نص كيلو",v:"87.5 درهم"},{l:"كيلو",v:"175 درهم"}]},{ar:"مشاوي مشكلة لحوم",en:"Mixed Meat Grills",price:"60 درهم",img:I[10],variants:[{l:"نص كيلو",v:"90 درهم"},{l:"كيلو",v:"180 درهم"}]},{ar:"كبدة مشوية",en:"Grilled Liver",price:"40 درهم",img:I[11]},{ar:"سجق مشوي",en:"Grilled Sausage",price:"45 درهم",img:I[12]},{ar:"حواوشي",en:"Hawawshi",price:"22 درهم",img:I[13]},{ar:"صدور دجاج مشوية",en:"Grilled Chicken Breast",price:"40 درهم",img:I[14]},{ar:"موزة مشوية",en:"Grilled Lamb Shank",price:"60 درهم",img:I[15]},{ar:"نص فرخة مشوية",en:"Half Grilled Chicken",price:"35 درهم",img:I[16]},
  ]},
  {section:"tageen",title:"طواجن وخضار",titleEn:"Tagens",items:[
    {ar:"ملوخية سادة",en:"Plain Molokhia",price:"38 درهم",img:I[17]},{ar:"ملوخية مع دجاج مقلي",en:"Molokhia Fried Chicken",price:"49 درهم",img:I[18]},{ar:"ملوخية مع مكعبات لحم",en:"Molokhia Fried Meat",price:"54 درهم",img:I[19]},{ar:"طاجن مسقعة باللحم المفروم",en:"Moussaka Minced Meat",price:"40 درهم",img:I[20]},{ar:"طاجن مسقعة بالبشاميل",en:"Moussaka Béchamel",price:"45 درهم",img:I[21]},{ar:"طاجن بطاطس سادة",en:"Plain Potato Tagen",price:"35 درهم",img:I[22]},{ar:"طاجن بطاطس بالدجاج",en:"Potato Tagen Chicken",price:"45 درهم",img:I[23]},{ar:"طاجن بطاطس باللحم",en:"Potato Tagen Meat",price:"45 درهم",img:I[24]},{ar:"ورقة لحمة",en:"War'et Lahma",price:"50 درهم",img:I[25]},{ar:"طاجن بامية سادة",en:"Plain Okra Tagen",price:"35 درهم",img:I[26]},{ar:"طاجن بامية باللحم",en:"Okra Tagen Meat",price:"45 درهم",img:I[27]},{ar:"طاجن لحم بالبصل",en:"Meat Tagen Onion",price:"45 درهم",img:I[28]},{ar:"عكاوي بالبصل",en:"Akawi Onion",price:"46 درهم",img:I[29]},{ar:"أرز معمر سادة",en:"Plain Maamar Rice",price:"30 درهم",img:I[30]},{ar:"أرز معمر باللحم",en:"Maamar Rice Meat",price:"50 درهم",img:I[31]},{ar:"أرز معمر بالحمام",en:"Maamar Rice Pigeon",price:"70 درهم",img:I[32]},{ar:"ورق عنب بالكوارع",en:"Grape Leaves Trotters",price:"50 درهم",img:I[33]},{ar:"طاجن موزة بالبطاطس",en:"Lamb Shank Tagen",price:"65 درهم",img:I[34]},
  ]},
  {section:"feteer",title:"الفطير المصري",titleEn:"Egyptian Feteer",items:[
    {ar:"فطيرة مشلتت سادة",en:"Plain Feteer Meshaltet",price:"69 درهم",img:I[35]},{ar:"فطيرة مكس جبن",en:"Mixed Cheese Feteer",price:"49 درهم",img:I[36]},{ar:"فطيرة مكس لحوم",en:"Mixed Meat Feteer",price:"59 درهم",img:I[37]},{ar:"فطيرة خضار مشكلة",en:"Mixed Vegetable Feteer",price:"49 درهم",img:I[38]},{ar:"فطيرة حلو النيل",en:"Nile Sweet Feteer",price:"55 درهم",img:I[39]},
  ]},
  {section:"sides",title:"أطباق جانبية",titleEn:"Sides",items:[
    {ar:"أرز بالشعيرية",en:"Vermicelli Rice",price:"15 درهم",img:I[40]},{ar:"أرز أبيض",en:"White Rice",price:"15 درهم",img:I[41]},{ar:"رز بالخلطة",en:"Mixed Rice",price:"18 درهم",img:I[42]},
  ]},
];

function buildData(raw, type) {
  const cats = [], items = [];
  raw.forEach(sec => {
    const cid = `${type}_${sec.section}`;
    cats.push({ id: cid, name: sec.title, nameEn: sec.titleEn, type });
    sec.items.forEach((item, idx) => {
      items.push({ id: `${cid}_${idx}`, cid, name: item.ar, nameEn: item.en, price: parsePrice(item.price), priceStr: item.price, img: item.img, variants: item.variants || null, type });
    });
  });
  return { cats, items };
}

const butcher = buildData(rawButcher, "butcher");
const restaurant = buildData(rawRestaurant, "restaurant");
const ALL_CATS = [...butcher.cats, ...restaurant.cats];
const ALL_ITEMS = [...butcher.items, ...restaurant.items];

// ─── ICONS ───────────────────────────────────────────────────────
const Ic = ({ d, size = 20, stroke = "currentColor", fill = "none", sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const IconCart = ({ size }) => <svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const IconHome = ({ size }) => <svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconOrders = ({ size }) => <svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const IconUser = ({ size }) => <svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconSearch = ({ size }) => <svg width={size||18} height={size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const IconPlus = ({ size }) => <svg width={size||16} height={size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconMinus = ({ size }) => <svg width={size||16} height={size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconBack = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const IconCheck = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconWa = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.837L.057 23.882l6.19-1.443A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.787 9.787 0 01-5.002-1.375l-.36-.213-3.714.865.93-3.617-.234-.373A9.786 9.786 0 012.182 12C2.182 6.565 6.565 2.182 12 2.182S21.818 6.565 21.818 12 17.435 21.818 12 21.818z"/></svg>;

// ─── LOGO SVG (Al-Nile Gourmet seal) ─────────────────────────────
const LogoSVG = ({ size = 90 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="56" fill="none" stroke="#C9A227" strokeWidth="2.5"/>
    <circle cx="60" cy="60" r="50" fill="none" stroke="#C9A227" strokeWidth="0.7"/>
    <ellipse cx="60" cy="52" rx="19" ry="11" fill="#C9A227" opacity="0.9"/>
    <rect x="41" y="63" width="38" height="3.5" rx="1.8" fill="#C9A227"/>
    <line x1="51" y1="66" x2="47" y2="80" stroke="#C9A227" strokeWidth="2.8" strokeLinecap="round"/>
    <line x1="69" y1="66" x2="73" y2="80" stroke="#C9A227" strokeWidth="2.8" strokeLinecap="round"/>
    <line x1="60" y1="66" x2="60" y2="80" stroke="#C9A227" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M46 52 Q43 44 47 41 Q45 47 49 46 Q46 43 50 39 Q49 46 53 45 Q50 42 53 38 Q54 46 51 49" fill="#E88C15" opacity="0.9"/>
    <path d="M74 52 Q71 44 75 41 Q73 47 77 46 Q74 43 78 39 Q77 46 81 45 Q78 42 81 38 Q82 46 79 49" fill="#E88C15" opacity="0.9"/>
    <line x1="34" y1="29" x2="34" y2="60" stroke="#C9A227" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="31" y1="33" x2="34" y2="38" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="34" y1="33" x2="34" y2="38" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="37" y1="33" x2="34" y2="38" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="86" y1="29" x2="86" y2="60" stroke="#C9A227" strokeWidth="2.2" strokeLinecap="round"/>
    <rect x="80" y="27" width="12" height="7" rx="1.8" fill="#C9A227"/>
    <text x="12" y="62" fontSize="8" fill="#C9A227">★</text>
    <text x="100" y="62" fontSize="8" fill="#C9A227">★</text>
    <path id="topArc" d="M 14,60 A 46,46 0 1,1 106,60" fill="none"/>
    <text fontSize="8" fill="#C9A227" fontFamily="serif" letterSpacing="2.5" fontWeight="600">
      <textPath href="#topArc" startOffset="10%">AL-NILE GOURMET</textPath>
    </text>
  </svg>
);

// ─── STYLES ──────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --g:#C9A227;--gl:#E8C060;--gd:#8A6A10;--gg:rgba(201,162,39,.22);
  --ink:#0A0A0A;--d1:#111;--d2:#181818;--d3:#222;--d4:#2C2C2C;
  --sf1:#1E1E1E;--sf2:#252525;
  --bd:rgba(201,162,39,.14);--bdl:rgba(255,255,255,.06);
  --t1:#F4EFE6;--t2:#A89F8E;--t3:#5E574F;
  --red:#EF4444;--grn:#22C55E;
  --r:16px;--rsm:10px;--rlg:22px;--nav:68px;--maxw:430px;
  font-family:'Cairo',sans-serif;
}
html,body{background:var(--ink);color:var(--t1);direction:rtl;overflow-x:hidden;-webkit-font-smoothing:antialiased;overscroll-behavior:none}
::-webkit-scrollbar{width:0;height:0}
button{cursor:pointer;border:none;background:none;font-family:inherit;color:inherit}
input,textarea{font-family:inherit}
img{display:block;width:100%;object-fit:cover}

/* APP SHELL */
.shell{max-width:var(--maxw);margin:0 auto;min-height:100dvh;background:var(--d1);position:relative;overflow:hidden}
.scr{min-height:100dvh;padding-bottom:calc(var(--nav) + 16px);overflow-y:auto;overscroll-behavior:contain}

/* BOTTOM NAV */
.bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:var(--maxw);height:var(--nav);background:rgba(10,10,10,.97);backdrop-filter:blur(20px);border-top:1px solid var(--bd);display:flex;align-items:center;z-index:100}
.nb{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:8px 2px 10px;color:var(--t3);transition:color .18s;position:relative}
.nb.on{color:var(--g)}
.nb.on svg{filter:drop-shadow(0 0 5px rgba(201,162,39,.4))}
.nl{font-size:10px;font-weight:700;letter-spacing:.3px}
.nbdg{position:absolute;top:4px;right:18%;background:var(--red);color:#fff;font-size:9px;font-weight:900;min-width:17px;height:17px;border-radius:9px;display:flex;align-items:center;justify-content:center;padding:0 4px;line-height:1;border:2px solid var(--ink)}

/* PAGE TRANSITIONS */
.scr{animation:fadeUp .22s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* STICKY HEADER */
.sth{position:sticky;top:0;z-index:50;background:rgba(17,17,17,.96);backdrop-filter:blur(18px);border-bottom:1px solid var(--bdl);padding:14px 18px 11px;display:flex;align-items:center;justify-content:space-between;gap:10px}
.sth-title{font-size:21px;font-weight:900}
.ibtn{width:38px;height:38px;border-radius:var(--rsm);background:var(--sf1);display:flex;align-items:center;justify-content:center;border:1px solid var(--bdl);transition:border-color .15s}
.ibtn:hover{border-color:var(--g)}

/* HERO */
.hero{position:relative;height:320px;overflow:hidden}
.hero img{width:100%;height:100%;object-fit:cover}
.hero-ov{position:absolute;inset:0;background:linear-gradient(160deg,rgba(0,0,0,.25) 0%,rgba(10,10,10,.5) 45%,rgba(10,10,10,.98) 100%)}
.hero-cnt{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;gap:8px}
.logo-ring{width:108px;height:108px;border-radius:50%;background:radial-gradient(circle at 38% 32%,#2A2000,#0A0A0A);padding:5px;box-shadow:0 0 44px rgba(201,162,39,.38),inset 0 0 18px rgba(201,162,39,.06);border:1px solid rgba(201,162,39,.28)}
.hero-name{font-size:27px;font-weight:900;text-align:center;letter-spacing:.8px;text-shadow:0 2px 22px rgba(0,0,0,.9)}
.hero-sub{font-size:12px;color:var(--gl);font-weight:700;letter-spacing:2.5px;text-align:center}
.hero-pills{display:flex;gap:7px;flex-wrap:wrap;justify-content:center;margin-top:2px}
.hpill{display:flex;align-items:center;gap:3px;padding:4px 10px;background:rgba(255,255,255,.1);backdrop-filter:blur(8px);border-radius:20px;font-size:10.5px;font-weight:700;border:1px solid rgba(255,255,255,.16)}

/* SEARCH */
.srch{padding:13px 18px}
.srch-box{display:flex;align-items:center;background:var(--sf2);border-radius:var(--r);padding:0 13px;border:1px solid var(--bd);gap:9px;transition:border-color .2s,box-shadow .2s}
.srch-box:focus-within{border-color:var(--g);box-shadow:0 0 0 3px var(--gg)}
.srch-box input{flex:1;background:none;border:none;outline:none;color:var(--t1);font-size:14px;padding:12px 0;direction:rtl}
.srch-box input::placeholder{color:var(--t3)}

/* TYPE TABS */
.type-tabs{display:flex;margin:0 18px 14px;background:var(--sf1);border-radius:var(--r);padding:4px;gap:4px;border:1px solid var(--bdl)}
.ttab{flex:1;padding:10px 0;border-radius:12px;font-size:13px;font-weight:800;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px;color:var(--t3)}
.ttab.on{background:linear-gradient(135deg,var(--gl),var(--gd));color:var(--ink);box-shadow:0 4px 14px var(--gg)}

/* CATS SCROLL */
.cscr{display:flex;gap:8px;overflow-x:auto;padding:0 18px 14px;scrollbar-width:none;flex-direction:row-reverse}
.cc{display:flex;align-items:center;gap:5px;padding:8px 13px;border-radius:22px;background:var(--sf1);color:var(--t2);font-size:12.5px;font-weight:700;white-space:nowrap;border:1px solid var(--bdl);transition:all .18s;flex-shrink:0;cursor:pointer}
.cc.on{background:linear-gradient(135deg,var(--gl),var(--gd));color:var(--ink);border-color:transparent;box-shadow:0 3px 10px var(--gg)}

/* GRID */
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:0 18px 16px}
.grid-wide{grid-column:span 2}

/* FOOD CARD */
.fc{background:var(--sf1);border-radius:var(--r);overflow:hidden;border:1px solid var(--bdl);transition:transform .14s,border-color .14s;cursor:pointer}
.fc:active{transform:scale(.97)}
.fc:hover{border-color:rgba(201,162,39,.25)}
.fc-img{position:relative;height:124px;overflow:hidden;background:var(--sf2)}
.fc-img img{width:100%;height:100%;object-fit:cover;transition:transform .3s}
.fc:hover .fc-img img{transform:scale(1.05)}
.fc-bdgs{position:absolute;top:7px;right:7px;display:flex;flex-direction:column;gap:3px}
.bdg-g{padding:2px 7px;background:linear-gradient(135deg,var(--gl),var(--gd));color:var(--ink);font-size:9.5px;font-weight:900;border-radius:7px}
.fc-body{padding:9px 10px 11px;display:flex;flex-direction:column;gap:5px}
.fc-name{font-size:12.5px;font-weight:800;line-height:1.3}
.fc-en{font-size:10.5px;color:var(--t3);line-height:1.3}
.fc-foot{display:flex;align-items:center;justify-content:space-between;margin-top:3px}
.fc-price{font-size:14px;font-weight:900;color:var(--g)}
.fc-price small{font-size:9.5px;font-weight:600;color:var(--t3)}
.btn-add{padding:6px 11px;background:linear-gradient(135deg,var(--gl),var(--gd));color:var(--ink);border-radius:9px;font-size:11.5px;font-weight:900;transition:opacity .15s,transform .1s;display:flex;align-items:center;gap:3px}
.btn-add:active{transform:scale(.93);opacity:.8}

/* VARIANTS CARD (full width) */
.fc-wide{background:var(--sf1);border-radius:var(--r);overflow:hidden;border:1px solid var(--bdl);grid-column:span 2}
.fc-wide-inner{display:flex;gap:0}
.fc-wide-img{width:120px;flex-shrink:0;background:var(--sf2)}
.fc-wide-img img{width:100%;height:100%;object-fit:cover}
.fc-wide-body{flex:1;padding:12px 12px 12px;display:flex;flex-direction:column;gap:8px}
.fc-wide-name{font-size:13px;font-weight:900}
.fc-wide-en{font-size:10.5px;color:var(--t3)}
.variants{display:flex;flex-direction:column;gap:5px}
.vrow{display:flex;align-items:center;gap:8px}
.vlbl{font-size:11px;color:var(--t3);min-width:44px;text-align:right}
.vbtn{flex:1;padding:6px 10px;background:var(--d3);border:1px solid var(--bdl);border-radius:8px;font-size:11px;font-weight:700;color:var(--g);transition:all .15s;text-align:center}
.vbtn:hover{border-color:var(--g);background:var(--sf2)}

/* PROMO */
.promo{margin:2px 18px 18px;padding:18px;background:linear-gradient(135deg,#1A1100,#261900);border-radius:var(--rlg);border:1px solid rgba(201,162,39,.28);display:flex;align-items:center;justify-content:space-between}
.promo h3{font-size:16px;font-weight:900;color:var(--g)}
.promo p{font-size:12px;color:var(--t2);margin-top:2px}

/* SECTION HDR */
.sec-hd{display:flex;align-items:center;justify-content:space-between;padding:0 18px;margin-bottom:12px}
.sec-title{font-size:16.5px;font-weight:900;display:flex;align-items:center;gap:5px}
.see-all{color:var(--g);font-size:12.5px;font-weight:700;background:none;border:none}

/* DETAIL */
.det-hero{position:relative;height:270px;overflow:hidden}
.det-hero img{width:100%;height:100%;object-fit:cover}
.det-ov{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.15) 0%,rgba(17,17,17,1) 100%)}
.det-back{position:absolute;top:14px;right:14px;z-index:10;width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,.52);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.18)}
.det-cnt{padding:0 18px 24px;margin-top:-22px;position:relative;z-index:5}
.det-top{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:10px}
.det-cat{font-size:10.5px;font-weight:700;color:var(--g);letter-spacing:1.2px;display:block;margin-bottom:3px}
.det-name{font-size:21px;font-weight:900;line-height:1.2}
.det-price{font-size:23px;font-weight:900;color:var(--g);white-space:nowrap;flex-shrink:0}
.det-price small{font-size:11.5px;font-weight:600;color:var(--t3)}
.det-en{font-size:13px;color:var(--t2);line-height:1.6;margin-bottom:18px}
.qty-row{display:flex;align-items:center;justify-content:space-between;padding:13px 15px;background:var(--sf1);border-radius:var(--r);border:1px solid var(--bdl);margin-bottom:16px}
.qty-ctrl{display:flex;align-items:center;gap:14px}
.qbtn{width:32px;height:32px;border-radius:9px;background:var(--sf2);display:flex;align-items:center;justify-content:center;border:1px solid var(--bdl);transition:all .15s}
.qbtn:active{background:var(--g);color:var(--ink)}
.qval{font-size:17px;font-weight:900;min-width:22px;text-align:center}
.btn-addlg{width:100%;padding:15px;background:linear-gradient(135deg,var(--gl),var(--gd));color:var(--ink);border-radius:var(--r);font-size:15.5px;font-weight:900;display:flex;align-items:center;justify-content:center;gap:9px;box-shadow:0 5px 20px var(--gg);transition:opacity .18s,transform .12s}
.btn-addlg:active{opacity:.82;transform:scale(.98)}

/* VARIANTS SECTION */
.var-sec{background:var(--sf1);border-radius:var(--r);border:1px solid var(--bdl);overflow:hidden;margin-bottom:16px}
.var-hd{padding:12px 15px;border-bottom:1px solid var(--bdl);font-size:13px;font-weight:800;color:var(--t2)}
.var-row{display:flex;align-items:center;justify-content:space-between;padding:11px 15px;border-bottom:1px solid var(--bdl)}
.var-row:last-child{border-bottom:none}
.var-lbl{font-size:13px;font-weight:700}
.var-price{font-size:13px;font-weight:900;color:var(--g)}
.var-addbtn{padding:6px 14px;background:linear-gradient(135deg,var(--gl),var(--gd));color:var(--ink);border-radius:9px;font-size:11.5px;font-weight:900}

/* CART */
.clist{padding:8px 15px;display:flex;flex-direction:column;gap:10px}
.ci{display:flex;gap:11px;align-items:center;padding:11px;background:var(--sf1);border-radius:var(--r);border:1px solid var(--bdl)}
.ci img{width:68px;height:68px;border-radius:11px;object-fit:cover;flex-shrink:0}
.ci-info{flex:1;min-width:0}
.ci-name{font-size:12.5px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ci-sub{font-size:10.5px;color:var(--t3);margin:2px 0}
.ci-p{font-size:11.5px;color:var(--t3)}
.qty-sm{display:flex;align-items:center;gap:9px;margin-top:5px}
.qbsm{width:25px;height:25px;border-radius:7px;background:var(--sf2);display:flex;align-items:center;justify-content:center;border:1px solid var(--bdl);font-size:13px;font-weight:800;transition:all .14s}
.qbsm:active{background:var(--g);color:var(--ink)}
.ci-r{display:flex;flex-direction:column;align-items:flex-end;gap:9px}
.rmbtn{color:var(--t3);padding:3px;font-size:17px;transition:color .15s}
.rmbtn:hover{color:var(--red)}
.ci-tot{font-size:13.5px;font-weight:900;color:var(--g)}
.summary{margin:14px 15px;padding:15px;background:var(--sf1);border-radius:var(--r);border:1px solid var(--bdl)}
.srow{display:flex;justify-content:space-between;font-size:13.5px;padding:4px 0;color:var(--t2)}
.stotal{font-size:16.5px;font-weight:900;color:var(--t1)}
.sdiv{height:1px;background:var(--bdl);margin:7px 0}
.free{color:var(--grn)!important;font-weight:800}
.hint{font-size:10.5px;color:var(--g);text-align:center;padding:4px 0}
.chk-bar{padding:14px 15px 20px;background:linear-gradient(to top,var(--d1) 55%,transparent)}
.btn-chk{width:100%;padding:15px;background:linear-gradient(135deg,var(--gl),var(--gd));color:var(--ink);border-radius:var(--r);font-size:15px;font-weight:900;display:flex;align-items:center;justify-content:center;gap:9px;box-shadow:0 5px 20px var(--gg)}
.btn-chk:active{opacity:.83}
.empty-pg{height:calc(100dvh - var(--nav));display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;flex-direction:column;gap:14px}
.empty-ico{font-size:60px}
.empty-pg h2{font-size:19px;font-weight:900}
.empty-pg p{color:var(--t3);font-size:13.5px}
.btn-pri{padding:13px 26px;background:linear-gradient(135deg,var(--gl),var(--gd));color:var(--ink);border-radius:var(--r);font-size:14.5px;font-weight:900;box-shadow:0 4px 14px var(--gg)}

/* SHEET */
.shov{position:fixed;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(4px);z-index:200;display:flex;align-items:flex-end;max-width:var(--maxw);margin:0 auto;left:50%;transform:translateX(-50%);width:100%}
.sh{width:100%;background:var(--d2);border-radius:22px 22px 0 0;padding:14px 18px 44px;border-top:1px solid var(--bd);max-height:88dvh;overflow-y:auto;animation:shup .24s ease}
@keyframes shup{from{transform:translateY(100%)}to{transform:translateY(0)}}
.shndl{width:38px;height:4px;background:var(--d4);border-radius:2px;margin:0 auto 18px}
.shtitle{font-size:17.5px;font-weight:900;margin-bottom:18px}
.flbl{display:flex;align-items:center;gap:5px;font-size:13.5px;font-weight:800;margin-bottom:7px}
.fta{width:100%;background:var(--sf2);border:1px solid var(--bd);border-radius:var(--rsm);padding:11px 13px;color:var(--t1);font-size:13.5px;resize:none;outline:none;direction:rtl;transition:border-color .18s;margin-bottom:14px}
.fta:focus{border-color:var(--g)}
.finp{width:100%;background:var(--sf2);border:1px solid var(--bd);border-radius:var(--rsm);padding:11px 13px;color:var(--t1);font-size:13.5px;outline:none;direction:rtl;transition:border-color .18s;margin-bottom:14px}
.finp:focus{border-color:var(--g)}
.chk-sm{background:var(--sf1);border-radius:var(--rsm);padding:13px;border:1px solid var(--bdl)}

/* ORDERS */
.olist{padding:7px 15px;display:flex;flex-direction:column;gap:11px}
.ocard{padding:13px;background:var(--sf1);border-radius:var(--r);border:1px solid var(--bdl);cursor:pointer;transition:border-color .18s,transform .13s}
.ocard:active{transform:scale(.99)}
.ocard:hover{border-color:rgba(201,162,39,.28)}
.ocard-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:11px}
.oid{font-size:12.5px;font-weight:900}
.odate{font-size:10.5px;color:var(--t3);margin-top:2px}
.ostatus{display:flex;align-items:center;gap:4px;padding:4px 9px;border-radius:18px;font-size:10.5px;font-weight:800}
.thumbrow{display:flex;gap:5px;margin-bottom:11px}
.othumb{width:42px;height:42px;border-radius:9px;object-fit:cover;border:2px solid var(--bdl)}
.omoreimg{display:flex;align-items:center;justify-content:center;width:42px;height:42px;background:var(--sf2);color:var(--t3);font-size:11px;font-weight:800;border-radius:9px;border:2px solid var(--bdl)}
.ofoot{display:flex;align-items:center;gap:7px;font-size:12.5px;color:var(--t3)}
.ototl{margin-right:auto;font-size:14.5px;font-weight:900;color:var(--g)}

/* TRACKING */
.mapph{height:190px;background:linear-gradient(135deg,#0C1828,#182840);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.mapph::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 35% 50%,rgba(201,162,39,.1) 0%,transparent 55%)}
.mappin{font-size:38px;animation:bounce 1.6s infinite;z-index:1}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.tcard{margin:14px;padding:15px;background:var(--sf1);border-radius:var(--rlg);border:1px solid var(--bdl)}
.thd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid var(--bdl)}
.steps{display:flex;flex-direction:column}
.step{display:flex;gap:13px;align-items:flex-start}
.step-ic{display:flex;flex-direction:column;align-items:center}
.sdot{font-size:18px;width:35px;height:35px;display:flex;align-items:center;justify-content:center;background:var(--sf2);border-radius:50%;border:2px solid var(--bdl)}
.step.done .sdot{border-color:var(--g);background:rgba(201,162,39,.1)}
.sline{width:2px;height:21px;background:var(--bdl);margin:2px 16.5px}
.sline.done{background:var(--g)}
.slbl{font-size:12.5px;font-weight:700;color:var(--t3);padding:7px 0}
.step.done .slbl{color:var(--t1)}
.step.curr .slbl{color:var(--g)}
.taddr{display:flex;gap:7px;align-items:flex-start;padding:11px;background:var(--sf2);border-radius:var(--rsm);margin-bottom:13px;font-size:12.5px;color:var(--t2)}
.titems{display:flex;flex-direction:column;gap:7px;margin-bottom:15px}
.titem{display:flex;gap:9px;align-items:center;font-size:12.5px}
.titem img{width:38px;height:38px;border-radius:7px;object-fit:cover;flex-shrink:0}
.btn-call{width:100%;padding:12px;border:1px solid var(--bdl);border-radius:var(--rsm);font-size:13.5px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:7px;transition:all .18s}
.btn-call:hover{border-color:var(--g);color:var(--g)}

/* PROFILE */
.pcard{margin:11px 15px 0;padding:18px;background:linear-gradient(135deg,#1A1100,#241800);border-radius:var(--rlg);border:1px solid rgba(201,162,39,.22);display:flex;flex-direction:column;align-items:center;gap:11px}
.ava{width:78px;height:78px;border-radius:50%;background:var(--sf1);border:2px solid var(--g);display:flex;align-items:center;justify-content:center;font-size:34px;box-shadow:0 0 18px var(--gg)}
.pname{font-size:19px;font-weight:900}
.pphone{font-size:12.5px;color:var(--t3)}
.pstats{display:flex;width:100%;justify-content:space-around;padding-top:11px;border-top:1px solid rgba(201,162,39,.14)}
.pstat{text-align:center}
.psv{font-size:17px;font-weight:900;color:var(--g)}
.psl{font-size:10.5px;color:var(--t3);margin-top:1px}
.psdiv{width:1px;background:rgba(201,162,39,.18)}
.pmenu{margin:14px 15px;background:var(--sf1);border-radius:var(--rlg);border:1px solid var(--bdl);overflow:hidden}
.plink{display:flex;align-items:center;gap:11px;padding:13px 15px;cursor:pointer;border-bottom:1px solid var(--bdl);transition:background .14s}
.plink:last-child{border-bottom:none}
.plink:hover{background:var(--sf2)}
.pico{width:36px;height:36px;border-radius:9px;background:rgba(201,162,39,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:17px}
.plbl{font-size:13.5px;font-weight:800}
.psub{font-size:11.5px;color:var(--t3);margin-top:1px}
.tgl{width:42px;height:23px;border-radius:11px;background:var(--sf2);border:1px solid var(--bdl);position:relative;transition:background .18s;flex-shrink:0;cursor:pointer}
.tgl.on{background:var(--g);border-color:var(--g)}
.tglth{position:absolute;top:2px;right:2px;width:17px;height:17px;border-radius:50%;background:var(--t3);transition:transform .18s,background .18s}
.tgl.on .tglth{transform:translateX(-19px);background:var(--ink)}
.logout{display:flex;align-items:center;justify-content:center;gap:7px;width:calc(100% - 30px);margin:0 15px;padding:13px;border-radius:var(--r);border:1px solid rgba(239,68,68,.28);color:var(--red);font-size:14.5px;font-weight:800;transition:all .18s;background:none}
.logout:hover{background:rgba(239,68,68,.07)}
.appver{text-align:center;font-size:11.5px;color:var(--t3);padding:14px 18px}

/* SUCCESS */
.succ-pg{height:calc(100dvh - var(--nav));display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;flex-direction:column;gap:16px}
.succ-ring{width:80px;height:80px;border-radius:50%;background:rgba(34,197,94,.1);border:2px solid rgba(34,197,94,.4);display:flex;align-items:center;justify-content:center;color:var(--grn)}
.succ-pg h2{font-size:26px;font-weight:900;color:var(--g)}
.succ-pg p{color:var(--t3);font-size:14px;max-width:260px}

/* TOAST */
.toast{position:fixed;top:18px;left:50%;transform:translateX(-50%);background:var(--sf1);border:1px solid var(--bd);border-radius:var(--r);padding:11px 18px;font-size:13.5px;font-weight:700;z-index:999;box-shadow:0 4px 22px rgba(0,0,0,.45);animation:tin .28s ease;max-width:88%;text-align:center;pointer-events:none}
.toast.ok{border-color:var(--grn);color:var(--grn)}
.toast.err{border-color:var(--red);color:var(--red)}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(-18px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

/* WA BANNER */
.wa-banner{margin:0 15px 16px;background:linear-gradient(135deg,#075E54,#128C7E);border-radius:var(--r);padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:opacity .15s}
.wa-banner:hover{opacity:.9}
.wa-txt h4{font-size:14px;font-weight:900;color:#fff}
.wa-txt p{font-size:11.5px;color:rgba(255,255,255,.75);margin-top:2px}

/* RES COUNT */
.rcount{display:flex;justify-content:space-between;padding:8px 18px;font-size:12.5px;color:var(--t3)}
.rccat{color:var(--g);font-weight:800}

@media(min-width:431px){.shell{box-shadow:0 0 60px rgba(0,0,0,.85)}}
@media(max-width:360px){.grid{gap:9px}.fc-img{height:108px}.hero{height:285px}}
`;

// ─── TOAST ───────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState(null);
  const show = (msg, type = "ok") => {
    setToast({ msg, type, key: Date.now() });
    setTimeout(() => setToast(null), 2300);
  };
  return [toast, show];
}

// ─── MAIN APP ────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [prevPage, setPrevPage] = useState("home");
  const [shopType, setShopType] = useState("butcher");
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [detailItem, setDetailItem] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [trackId, setTrackId] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notifs, setNotifs] = useState(true);
  const [toast, showToast] = useToast();
  const scrollRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const go = (p) => {
    setPrevPage(page);
    setPage(p);
    scrollRef.current?.scrollTo(0, 0);
  };

  const cats = useMemo(() => ALL_CATS.filter(c => c.type === shopType), [shopType]);

  const items = useMemo(() => {
    return ALL_ITEMS.filter(it => {
      if (it.type !== shopType) return false;
      if (activeCat !== "all" && it.cid !== activeCat) return false;
      if (search) {
        const q = search.toLowerCase();
        return it.name.includes(search) || it.nameEn.toLowerCase().includes(q);
      }
      return true;
    });
  }, [shopType, activeCat, search]);

  // Cart ops
  const addToCart = (item, price, varLabel) => {
    const p = price ?? item.price;
    const cid = varLabel ? `${item.id}_${varLabel}` : item.id;
    setCart(prev => {
      const ex = prev.find(c => c.id === cid);
      if (ex) return prev.map(c => c.id === cid ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: cid, item, qty: 1, price: p, varLabel }];
    });
    showToast("✓ أضيف للسلة");
  };

  const updateQty = (cid, delta) => {
    setCart(prev => prev.map(c => c.id === cid ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));
  };

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const placeOrder = (addr) => {
    const order = {
      id: "ORD-" + Math.random().toString(36).slice(2, 9).toUpperCase(),
      items: [...cart],
      total: cartTotal + (cartTotal >= 150 ? 0 : 15),
      status: "confirmed",
      date: new Date().toISOString(),
      addr,
    };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setCheckoutOpen(false);
    go("success");
  };

  const openDetail = (item) => {
    setDetailItem(item);
    setDetailQty(1);
    go("detail");
  };

  // ── HOME ──────────────────────────────────────────────────────
  const HomeScreen = () => {
    const popular = ALL_ITEMS.filter(it => it.type === shopType && it.id.includes("_0")).slice(0, 6);
    return (
      <div>
        {/* Hero */}
        <div className="hero">
          <img src={I[42]} alt="النيل جورمية" />
          <div className="hero-ov" />
          <div className="hero-cnt">
            <div className="logo-ring"><LogoSVG size={98} /></div>
            <h1 className="hero-name">النيل جورمية</h1>
            <p className="hero-sub">هتدوق طعم مصر</p>
            <div className="hero-pills">
              <span className="hpill">📍 دبي - أرجان</span>
              <span className="hpill">⏱ ٣٠-٤٥ دقيقة</span>
              <span className="hpill">⭐ ٤.٩</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="srch">
          <div className="srch-box">
            <IconSearch />
            <input placeholder="ابحث عن وجبتك أو قطعتك..." value={search} onChange={e => setSearch(e.target.value)} onFocus={() => go("menu")} />
          </div>
        </div>

        {/* Type tabs */}
        <div className="type-tabs">
          {[["butcher","🥩","الملحمة"],["restaurant","🍽️","المطعم"]].map(([t,ic,l]) => (
            <button key={t} className={`ttab ${shopType===t?"on":""}`} onClick={() => { setShopType(t); setActiveCat("all"); }}>
              <span style={{fontSize:18}}>{ic}</span>{l}
            </button>
          ))}
        </div>

        {/* Cats */}
        <div className="cscr">
          {cats.map(c => (
            <button key={c.id} className={`cc ${activeCat===c.id?"on":""}`} onClick={() => { setActiveCat(c.id); go("menu"); }}>
              {c.name.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* WA Banner */}
        <div className="wa-banner" onClick={() => window.open("https://wa.me/971554099255?text=مرحباً، أريد الطلب من النيل جورمية","_blank")}>
          <IconWa />
          <div className="wa-txt">
            <h4>اطلب عبر واتساب</h4>
            <p>تواصل معنا مباشرة للطلب والاستفسار</p>
          </div>
          <span style={{marginRight:"auto",color:"rgba(255,255,255,.6)",fontSize:18}}>›</span>
        </div>

        {/* Popular */}
        <div className="sec-hd">
          <h2 className="sec-title">🔥 الأكثر طلباً</h2>
          <button className="see-all" onClick={() => go("menu")}>عرض الكل ›</button>
        </div>
        <div className="grid">
          {popular.map((item, i) => <FoodCard key={item.id} item={item} onAdd={() => addToCart(item)} onView={() => openDetail(item)} idx={i} />)}
        </div>

        {/* Promo */}
        <div className="promo">
          <div><h3>توصيل مجاني</h3><p>على الطلبات فوق ١٥٠ درهم</p></div>
          <span style={{fontSize:34}}>🚀</span>
        </div>

        <div style={{height:20}} />
      </div>
    );
  };

  // ── MENU ─────────────────────────────────────────────────────
  const MenuScreen = () => (
    <div>
      <div className="sth">
        <h1 className="sth-title">القائمة</h1>
        <span style={{fontSize:12,color:"var(--g)",fontWeight:800,background:"var(--sf1)",padding:"4px 10px",borderRadius:20,border:"1px solid var(--bd)"}}>{items.length} عنصر</span>
      </div>

      {/* Type switch */}
      <div style={{padding:"12px 18px 0"}}>
        <div className="type-tabs" style={{margin:0}}>
          {[["butcher","🥩","الملحمة"],["restaurant","🍽️","المطعم"]].map(([t,ic,l]) => (
            <button key={t} className={`ttab ${shopType===t?"on":""}`} onClick={() => { setShopType(t); setActiveCat("all"); }}>
              <span style={{fontSize:16}}>{ic}</span>{l}
            </button>
          ))}
        </div>
      </div>

      <div className="cscr" style={{paddingTop:12}}>
        <button className={`cc ${activeCat==="all"?"on":""}`} onClick={() => setActiveCat("all")}>الكل</button>
        {cats.map(c => <button key={c.id} className={`cc ${activeCat===c.id?"on":""}`} onClick={() => setActiveCat(c.id)}>{c.name}</button>)}
      </div>

      <div className="srch" style={{paddingTop:0}}>
        <div className="srch-box">
          <IconSearch />
          <input placeholder="ابحث في القائمة..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="rcount">
        <span>{items.length} عنصر</span>
        <span className="rccat">{activeCat === "all" ? "الكل" : cats.find(c=>c.id===activeCat)?.name || ""}</span>
      </div>

      <div className="grid" style={{paddingBottom:24}}>
        {items.map((item, i) =>
          item.variants
            ? <WideCard key={item.id} item={item} onAdd={(p, lbl) => addToCart(item, p, lbl)} onView={() => openDetail(item)} />
            : <FoodCard key={item.id} item={item} onAdd={() => addToCart(item)} onView={() => openDetail(item)} idx={i} />
        )}
        {items.length === 0 && (
          <div style={{gridColumn:"span 2",textAlign:"center",padding:"40px 0",color:"var(--t3)"}}>
            <div style={{fontSize:42,marginBottom:12}}>🔍</div>
            <p>لا توجد نتائج مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );

  // ── DETAIL ───────────────────────────────────────────────────
  const DetailScreen = () => {
    if (!detailItem) return null;
    const it = detailItem;
    const cat = ALL_CATS.find(c => c.id === it.cid);
    return (
      <div>
        <div className="det-hero">
          <img src={it.img} alt={it.name} />
          <div className="det-ov" />
          <button className="det-back" onClick={() => go(prevPage)}><IconBack /></button>
        </div>
        <div className="det-cnt">
          <div className="det-top">
            <div>
              <span className="det-cat">{cat?.name || ""}</span>
              <h1 className="det-name">{it.name}</h1>
            </div>
            <div className="det-price">{it.price}<small> د.إ</small></div>
          </div>
          <p className="det-en">{it.nameEn}</p>

          {it.variants ? (
            <div className="var-sec">
              <div className="var-hd">اختر الحجم</div>
              <div className="var-row">
                <span className="var-lbl">الأساسي</span>
                <span className="var-price">{it.priceStr}</span>
                <button className="var-addbtn" onClick={() => { addToCart(it); go(prevPage); }}>+ أضف</button>
              </div>
              {it.variants.map((v, i) => (
                <div key={i} className="var-row">
                  <span className="var-lbl">{v.l}</span>
                  <span className="var-price">{v.v}</span>
                  <button className="var-addbtn" onClick={() => { addToCart(it, parsePrice(v.v), v.l); go(prevPage); }}>+ أضف</button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="qty-row">
                <span style={{fontSize:14.5,fontWeight:800}}>الكمية</span>
                <div className="qty-ctrl">
                  <button className="qbtn" onClick={() => setDetailQty(q => Math.max(1, q-1))}><IconMinus /></button>
                  <span className="qval">{detailQty}</span>
                  <button className="qbtn" onClick={() => setDetailQty(q => q+1)}><IconPlus /></button>
                </div>
              </div>
              <button className="btn-addlg" onClick={() => { for(let i=0;i<detailQty;i++) addToCart(it); go(prevPage); }}>
                <IconCart size={20} /> أضف للسلة — {it.price * detailQty} د.إ
              </button>
            </>
          )}

          {/* Related */}
          <h3 style={{fontSize:15.5,fontWeight:900,marginBottom:11}}>منتجات مشابهة</h3>
          <div className="grid" style={{padding:0}}>
            {ALL_ITEMS.filter(r => r.cid === it.cid && r.id !== it.id).slice(0,4).map((r,i) => (
              <FoodCard key={r.id} item={r} onAdd={() => addToCart(r)} onView={() => { setDetailItem(r); setDetailQty(1); scrollRef.current?.scrollTo(0,0); }} idx={i} />
            ))}
          </div>
          <div style={{height:20}} />
        </div>
      </div>
    );
  };

  // ── CART ─────────────────────────────────────────────────────
  const CartScreen = () => {
    const del = cartTotal >= 150 ? 0 : 15;
    const grand = cartTotal + del;
    if (cart.length === 0) return (
      <div>
        <div className="sth"><h1 className="sth-title">سلة الطلبات</h1></div>
        <div className="empty-pg">
          <div className="empty-ico">🛒</div>
          <h2>السلة فارغة</h2>
          <p>أضف وجباتك أو قطعتك المفضلة</p>
          <button className="btn-pri" onClick={() => go("menu")}>تصفح القائمة</button>
        </div>
      </div>
    );
    return (
      <div>
        <div className="sth">
          <h1 className="sth-title">سلة الطلبات</h1>
          <span style={{background:"var(--sf1)",border:"1px solid var(--bd)",borderRadius:20,padding:"4px 10px",fontSize:12,fontWeight:800,color:"var(--g)"}}>{cart.length} عنصر</span>
        </div>
        <div className="clist">
          {cart.map(c => (
            <div key={c.id} className="ci">
              <img src={c.item.img} alt={c.item.name} style={{width:68,height:68,borderRadius:11,objectFit:"cover",flexShrink:0}} />
              <div className="ci-info">
                <p className="ci-name">{c.item.name}</p>
                {c.varLabel && <p className="ci-sub">{c.varLabel}</p>}
                <p className="ci-p">{c.price} د.إ</p>
                <div className="qty-sm">
                  <button className="qbsm" onClick={() => updateQty(c.id, -1)}><IconMinus size={12} /></button>
                  <span style={{fontSize:13,fontWeight:900,minWidth:18,textAlign:"center"}}>{c.qty}</span>
                  <button className="qbsm" onClick={() => updateQty(c.id, 1)}><IconPlus size={12} /></button>
                </div>
              </div>
              <div className="ci-r">
                <button className="rmbtn" onClick={() => { setCart(prev => prev.filter(x => x.id !== c.id)); }}>🗑</button>
                <span className="ci-tot">{(c.price * c.qty).toFixed(0)} د.إ</span>
              </div>
            </div>
          ))}
        </div>
        <div className="summary">
          <div className="srow"><span>المجموع</span><span>{cartTotal.toFixed(0)} د.إ</span></div>
          <div className="srow"><span>التوصيل</span><span className={del===0?"free":""}>{del===0?"مجاناً 🎉":`${del} د.إ`}</span></div>
          {del > 0 && <p className="hint">أضف {(150-cartTotal).toFixed(0)} د.إ للتوصيل المجاني</p>}
          <div className="sdiv" />
          <div className="srow stotal"><span>الإجمالي</span><span>{grand.toFixed(0)} د.إ</span></div>
        </div>
        <div className="chk-bar">
          <button className="btn-chk" onClick={() => setCheckoutOpen(true)}>
            🛍 إتمام الطلب — {grand.toFixed(0)} د.إ
          </button>
        </div>
        <div style={{height:20}} />
      </div>
    );
  };

  // ── ORDERS ───────────────────────────────────────────────────
  const OrdersScreen = () => {
    const statMap = {
      confirmed: {l:"تم التأكيد",bg:"rgba(34,197,94,.12)",c:"#22C55E"},
      preparing: {l:"قيد التحضير",bg:"rgba(99,102,241,.12)",c:"#818CF8"},
      ready: {l:"جاهز للتوصيل",bg:"rgba(14,165,233,.12)",c:"#38BDF8"},
      delivered: {l:"تم التوصيل",bg:"rgba(34,197,94,.12)",c:"#22C55E"},
    };
    if (orders.length === 0) return (
      <div>
        <div className="sth"><h1 className="sth-title">طلباتي</h1></div>
        <div className="empty-pg">
          <div className="empty-ico">📋</div>
          <h2>لا توجد طلبات</h2>
          <p>ابدأ طلبك الأول الآن</p>
          <button className="btn-pri" onClick={() => go("menu")}>تصفح القائمة</button>
        </div>
      </div>
    );
    return (
      <div>
        <div className="sth"><h1 className="sth-title">طلباتي</h1></div>
        <div className="olist">
          {orders.map(o => {
            const st = statMap[o.status] || statMap.confirmed;
            const d = new Date(o.date);
            return (
              <div key={o.id} className="ocard" onClick={() => { setTrackId(o.id); go("track"); }}>
                <div className="ocard-top">
                  <div>
                    <p className="oid">{o.id}</p>
                    <p className="odate">{d.toLocaleDateString("ar-AE")} — {d.toLocaleTimeString("ar-AE",{hour:"2-digit",minute:"2-digit"})}</p>
                  </div>
                  <div className="ostatus" style={{background:st.bg,color:st.c}}>{st.l}</div>
                </div>
                <div className="thumbrow">
                  {o.items.slice(0,3).map((c,i) => <img key={i} src={c.item.img} alt={c.item.name} className="othumb" />)}
                  {o.items.length > 3 && <div className="omoreimg">+{o.items.length-3}</div>}
                </div>
                <div className="ofoot">
                  <span>{o.items.length} عنصر</span>
                  <span className="ototl">{o.total} د.إ</span>
                  <span>›</span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{height:20}} />
      </div>
    );
  };

  // ── TRACKING ─────────────────────────────────────────────────
  const TrackScreen = () => {
    const order = orders.find(o => o.id === trackId);
    if (!order) return <div className="empty-pg"><p>الطلب غير موجود</p></div>;
    const STEPS = [
      {k:"pending",l:"تم استلام الطلب",ic:"📱"},
      {k:"confirmed",l:"تم تأكيد الطلب",ic:"✅"},
      {k:"preparing",l:"قيد التحضير",ic:"👨‍🍳"},
      {k:"ready",l:"خرج للتوصيل",ic:"🛵"},
      {k:"delivered",l:"تم التوصيل",ic:"🎉"},
    ];
    const si = STEPS.findIndex(s => s.k === order.status);
    return (
      <div>
        <div className="sth">
          <button style={{display:"flex",alignItems:"center",color:"var(--t1)"}} onClick={() => go("orders")}><IconBack /></button>
          <h1 className="sth-title">تتبع الطلب</h1>
          <div style={{width:28}} />
        </div>
        <div className="mapph">
          <div style={{textAlign:"center",zIndex:1}}>
            <div className="mappin">📍</div>
            <p style={{fontSize:12.5,color:"var(--t3)",marginTop:7,zIndex:1,position:"relative"}}>جاري التتبع...</p>
          </div>
        </div>
        <div className="tcard">
          <div className="thd">
            <div>
              <p style={{fontSize:13.5,fontWeight:900}}>{order.id}</p>
              <p style={{fontSize:11.5,color:"var(--t3)",marginTop:3}}>⏱ الوقت المتوقع: ٣٠-٤٥ دقيقة</p>
            </div>
            <p style={{fontSize:17.5,fontWeight:900,color:"var(--g)"}}>{order.total} د.إ</p>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => {
              const done = i <= si, curr = i === si;
              return (
                <div key={s.k} className={`step ${done?"done":""} ${curr?"curr":""}`}>
                  <div className="step-ic">
                    <div className="sdot">{done ? s.ic : "○"}</div>
                    {i < STEPS.length-1 && <div className={`sline ${i < si ? "done" : ""}`} />}
                  </div>
                  <p className="slbl">{s.l}</p>
                </div>
              );
            })}
          </div>
          <div className="taddr">📍 <span>{order.addr}</span></div>
          <div className="titems">
            {order.items.map((c,i) => (
              <div key={i} className="titem">
                <img src={c.item.img} alt={c.item.name} />
                <span>{c.item.name}</span>
                <span style={{marginRight:"auto",color:"var(--t3)"}}>×{c.qty}</span>
              </div>
            ))}
          </div>
          <a href="tel:+971554099255" className="btn-call">📞 اتصل بالمطعم</a>
        </div>
        <div style={{height:20}} />
      </div>
    );
  };

  // ── PROFILE ──────────────────────────────────────────────────
  const ProfileScreen = () => {
    const totalSpent = orders.reduce((s,o) => s+o.total, 0);
    return (
      <div>
        <div className="sth"><h1 className="sth-title">حسابي</h1></div>
        <div className="pcard">
          <div className="ava">👤</div>
          <p className="pname">ضيف</p>
          <p className="pphone">📱 +971 XX XXX XXXX</p>
          <div className="pstats">
            <div className="pstat"><p className="psv">{orders.length}</p><p className="psl">طلب</p></div>
            <div className="psdiv" />
            <div className="pstat"><p className="psv">{totalSpent}</p><p className="psl">د.إ أنفقت</p></div>
            <div className="psdiv" />
            <div className="pstat"><p className="psv">4.9</p><p className="psl">تقييمي</p></div>
          </div>
        </div>
        <div className="pmenu">
          {[
            {ic:"📦",l:"طلباتي",s:`${orders.length} طلب`,fn:()=>go("orders")},
            {ic:"📍",l:"عناوين التوصيل",s:"إدارة العناوين",fn:()=>{}},
            {ic:"🔔",l:"الإشعارات",s:notifs?"مفعلة":"معطلة",toggle:true},
            {ic:"🛡",l:"الخصوصية والأمان",s:"إعدادات الحساب",fn:()=>{}},
            {ic:"⭐",l:"قيّم التطبيق",s:"ساعدنا في التحسين",fn:()=>{}},
          ].map((link, i) => (
            <div key={i} className="plink" onClick={link.fn}>
              <div className="pico">{link.ic}</div>
              <div style={{flex:1}}>
                <p className="plbl">{link.l}</p>
                <p className="psub">{link.s}</p>
              </div>
              {link.toggle
                ? <button className={`tgl ${notifs?"on":""}`} onClick={e=>{e.stopPropagation();setNotifs(v=>!v)}}><span className="tglth" /></button>
                : <span style={{color:"var(--t3)"}}>›</span>
              }
            </div>
          ))}
        </div>
        <button className="logout">🚪 تسجيل الخروج</button>
        <p className="appver">النيل جورمية v2.0 | دبي 🇦🇪</p>
        <div style={{height:20}} />
      </div>
    );
  };

  // ── SUCCESS ──────────────────────────────────────────────────
  const SuccessScreen = () => (
    <div className="succ-pg">
      <div className="succ-ring"><IconCheck /></div>
      <h2>تم تأكيد طلبك!</h2>
      <p>جارٍ تجهيز طلبك بأفضل جودة من النيل جورمية 🔥</p>
      <button className="btn-pri" onClick={() => go("orders")}>عرض الطلبات</button>
      <button onClick={() => go("home")} style={{color:"var(--g)",fontWeight:800,fontSize:14}}>العودة للرئيسية</button>
    </div>
  );

  // ── NAV PAGES MAP ─────────────────────────────────────────────
  const navPages = ["home","menu","cart","orders","profile"];
  const activeNav = navPages.includes(page) ? page : (["detail"].includes(page) ? prevPage : "home");

  // ── RENDER ───────────────────────────────────────────────────
  return (
    <div className="shell" dir="rtl">
      <div className="scr" ref={scrollRef} key={page}>
        {page === "home" && <HomeScreen />}
        {page === "menu" && <MenuScreen />}
        {page === "detail" && <DetailScreen />}
        {page === "cart" && <CartScreen />}
        {page === "orders" && <OrdersScreen />}
        {page === "track" && <TrackScreen />}
        {page === "profile" && <ProfileScreen />}
        {page === "success" && <SuccessScreen />}
      </div>

      {/* Bottom Nav */}
      <nav className="bnav">
        {[
          {id:"home",label:"الرئيسية",Icon:IconHome},
          {id:"menu",label:"القائمة",Icon:({size})=><svg width={size||22} height={size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>},
          {id:"cart",label:"السلة",Icon:IconCart,badge:cartCount},
          {id:"orders",label:"طلباتي",Icon:IconOrders},
          {id:"profile",label:"حسابي",Icon:IconUser},
        ].map(({id,label,Icon,badge}) => (
          <button key={id} className={`nb ${activeNav===id?"on":""}`} onClick={() => go(id)}>
            <Icon size={22} />
            {badge > 0 && <span className="nbdg">{badge}</span>}
            <span className="nl">{label}</span>
          </button>
        ))}
      </nav>

      {/* Checkout Sheet */}
      {checkoutOpen && (
        <CheckoutSheet
          cartTotal={cartTotal}
          cart={cart}
          onClose={() => setCheckoutOpen(false)}
          onConfirm={placeOrder}
          showToast={showToast}
        />
      )}

      {/* Toast */}
      {toast && <div key={toast.key} className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}

// ── FOOD CARD ─────────────────────────────────────────────────
function FoodCard({ item, onAdd, onView, idx }) {
  return (
    <div className="fc" style={{animationDelay:`${idx*0.04}s`}}>
      <div className="fc-img" onClick={onView}>
        <img src={item.img} alt={item.name} loading="lazy" />
      </div>
      <div className="fc-body">
        <h3 className="fc-name" onClick={onView}>{item.name}</h3>
        <p className="fc-en">{item.nameEn}</p>
        <div className="fc-foot">
          <span className="fc-price">{item.price} <small>د.إ</small></span>
          <button className="btn-add" onClick={onAdd}><IconPlus size={13} /> أضف</button>
        </div>
      </div>
    </div>
  );
}

// ── WIDE CARD (variants) ──────────────────────────────────────
function WideCard({ item, onAdd, onView }) {
  return (
    <div className="fc-wide">
      <div className="fc-wide-inner">
        <div className="fc-wide-img" onClick={onView} style={{cursor:"pointer"}}>
          <img src={item.img} alt={item.name} loading="lazy" style={{height:130}} />
        </div>
        <div className="fc-wide-body">
          <h3 className="fc-wide-name" onClick={onView} style={{cursor:"pointer"}}>{item.name}</h3>
          <p className="fc-wide-en">{item.nameEn}</p>
          <div className="variants">
            <div className="vrow">
              <span className="vlbl">أساسي</span>
              <button className="vbtn" onClick={() => onAdd(item.price, null)}>أضف ({item.priceStr})</button>
            </div>
            {item.variants.map((v,i) => (
              <div key={i} className="vrow">
                <span className="vlbl">{v.l}</span>
                <button className="vbtn" onClick={() => onAdd(parsePrice(v.v), v.l)}>أضف ({v.v})</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CHECKOUT SHEET ────────────────────────────────────────────
function CheckoutSheet({ cartTotal, cart, onClose, onConfirm, showToast }) {
  const [addr, setAddr] = useState("دبي - أرجان");
  const del = cartTotal >= 150 ? 0 : 15;
  const grand = cartTotal + del;

  const handleConfirm = () => {
    if (!addr.trim()) { showToast("أدخل عنوان التوصيل", "err"); return; }
    onConfirm(addr);
  };

  return (
    <div className="shov" onClick={onClose}>
      <div className="sh" onClick={e => e.stopPropagation()}>
        <div className="shndl" />
        <h3 className="shtitle">تفاصيل التوصيل</h3>
        <p className="flbl">📍 عنوان التوصيل</p>
        <textarea className="fta" rows={3} value={addr} onChange={e=>setAddr(e.target.value)} placeholder="المنطقة، الشارع، رقم المبنى..." />
        <div className="chk-sm">
          <div className="srow"><span>المجموع</span><span>{cartTotal.toFixed(0)} د.إ</span></div>
          <div className="srow"><span>التوصيل</span><span className={del===0?"free":""}>{del===0?"مجاناً 🎉":`${del} د.إ`}</span></div>
          <div className="sdiv" />
          <div className="srow stotal"><span>الإجمالي</span><span>{grand.toFixed(0)} د.إ</span></div>
        </div>
        <button className="btn-chk" style={{marginTop:16}} onClick={handleConfirm}>تأكيد الطلب 🎉</button>
      </div>
    </div>
  );
}
