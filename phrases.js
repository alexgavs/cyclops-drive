/* Cyclops Drive — voice alert phrases (en-US, ru-RU, he-IL, ar)
 * Static data. Placeholders: {type} {dist} {limit}
 */
window.PHRASES = {
  "en-US": {
    units: "KM/H",
    noc: "No camera ahead",
    names: {
      redlight: "red-light camera",
      speed: "speed camera",
      avg: "average-speed camera",
      mobile: "mobile camera",
      fixed: "fixed camera",
      camera: "camera",
      decoy: "dummy camera"
    },
    tpl: {
      ahead: "{type} ahead, {dist} meters",
      close: "{type}, {dist} meters",
      over: "Reduce speed, limit {limit}",
      enter: "Entering {type} zone",
      exit: "Leaving {type} zone",
      pass: "Camera passed"
    }
  },
  "ru-RU": {
    units: "км/ч",
    noc: "Впереди камер нет",
    names: {
      redlight: "камера на красный свет",
      speed: "камера контроля скорости",
      avg: "камера средней скорости",
      mobile: "мобильная камера",
      fixed: "стационарная камера",
      camera: "камера",
      decoy: "камера-обманка"
    },
    tpl: {
      ahead: "Впереди {type}, {dist} метров",
      close: "{type}, {dist} метров",
      over: "Снизьте скорость, ограничение {limit}",
      enter: "Начало зоны: {type}",
      exit: "Конец зоны: {type}",
      pass: "Камера пройдена"
    }
  },
  "he-IL": {
    units: "קמ\"ש",
    noc: "אין מצלמה בהמשך הדרך",
    names: {
      redlight: "מצלמת רמזור",
      speed: "מצלמת מהירות",
      avg: "מצלמת מהירות ממוצעת",
      mobile: "מצלמה ניידת",
      fixed: "מצלמה קבועה",
      camera: "מצלמה",
      decoy: "מצלמת דמה"
    },
    tpl: {
      ahead: "{type} בעוד {dist} מטר",
      close: "{type}, {dist} מטר",
      over: "האט, המהירות המותרת {limit}",
      enter: "כניסה לאזור {type}",
      exit: "יציאה מאזור {type}",
      pass: "עברת את המצלמה"
    }
  },
  "ar": {
    units: "كم/س",
    noc: "لا توجد كاميرا في الأمام",
    names: {
      redlight: "كاميرا ضوء أحمر",
      speed: "كاميرا سرعة",
      avg: "كاميرا سرعة متوسطة",
      mobile: "كاميرا متنقلة",
      fixed: "كاميرا ثابتة",
      camera: "كاميرا",
      decoy: "كاميرا وهمية"
    },
    tpl: {
      ahead: "{type} بعد {dist} متر",
      close: "{type}، {dist} متر",
      over: "خفف السرعة، الحد الأقصى {limit}",
      enter: "دخول منطقة {type}",
      exit: "الخروج من منطقة {type}",
      pass: "تم تجاوز الكاميرا"
    }
  }
};
