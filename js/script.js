document.addEventListener('DOMContentLoaded', () => {
  // ==== Работа с цветами ====

  const colors = [
    { name: "Aquamarine", value: "#7FFFD4", chance: 2 },
    { name: "Silver", value: "#C0C0C0", chance: 2 },
    { name: "Violet", value: "#8A2BE2", chance: 2 },

    { name: "Coral", value: "#FF7F50", chance: 15 },  // увеличенный шанс
    { name: "DodgerBlue", value: "#1E90FF", chance: 29 }, // увеличенный шанс
    { name: "Gold", value: "#FFD700", chance: 2 }, // сделал редким
    { name: "LimeGreen", value: "#32CD32", chance: 29 },
    { name: "Tomato", value: "#FF6347", chance: 19 },
    { name: "Turquoise", value: "#40E0D0", chance: 16 },
    { name: "MediumOrchid", value: "#BA55D3", chance: 29 },
    { name: "DeepPink", value: "#FF1493", chance: 18 },
    { name: "SlateBlue", value: "#6A5ACD", chance: 19 },
    { name: "SeaGreen", value: "#2E8B57", chance: 29 },
    { name: "OrangeRed", value: "#FF4500", chance: 29 },
    { name: "SteelBlue", value: "#4682B4", chance: 19 },

    { name: "White Gradient", value: "linear-gradient(135deg, #C0C0C0, #FFFFFF)", chance: 0.5 },
    { name: "Black Gradient", value: "linear-gradient(135deg, #000000, #EEEEEE)", chance: 0.5 }
  ];

  // Функция выбора цвета по шансу
  function pickColorByChance(colors) {
    const random = Math.random() * 100;
    let sum = 0;
    for (const color of colors) {
      sum += color.chance;
      if (random <= sum) return color;
    }
    return colors[colors.length - 1];
  }

  // Элементы
  const makeBtn = document.querySelector('.make-btn');
  const nftBg = document.querySelector('.nft-bg');
  const nftCard = document.querySelector('.nft-card');
  const colorNameEl = document.querySelector('.color-name');
  const colorCircleEl = document.querySelector('.color-circle');
  const colorChanceEl = document.querySelector('.color-chance');

  // Плавный переход цвета фона
  nftBg.style.transition = 'background-color 0.5s ease';

  makeBtn.addEventListener('click', () => {
    const picked = pickColorByChance(colors);

    // Обновляем инфо цвета
    colorNameEl.textContent = picked.name;

    // Круг — если градиент, то делаем белый полупрозрачный фон с рамкой,
    // иначе ставим цвет и прозрачность 0.6
    if (picked.value.startsWith('linear-gradient')) {
      colorCircleEl.style.background = 'rgba(255, 255, 255, 0.3)';
      colorCircleEl.style.border = '1.5px solid rgba(255, 255, 255, 0.6)';
    } else {
      colorCircleEl.style.backgroundColor = picked.value;
      colorCircleEl.style.border = 'none';
    }

    colorChanceEl.textContent = picked.chance + '%';

    // Меняем фон nftBg, если цвет градиент - ставим градиент через backgroundImage, иначе backgroundColor
    if (picked.value.startsWith('linear-gradient')) {
      nftBg.style.backgroundImage = picked.value;
      nftBg.style.backgroundColor = '';
    } else {
      nftBg.style.backgroundColor = picked.value;
      nftBg.style.backgroundImage = '';
    }

    // Меняем бордер nftCard под цвет
    if (!picked.value.startsWith('linear-gradient')) {
      nftCard.style.borderColor = picked.value;
    } else {
      nftCard.style.borderColor = '#fff'; // для градиентов ставим белый бордер
    }
  });


  // ==== Навигация по вкладкам ====

  const buttons = document.querySelectorAll('.tab-button');
  const tabs = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');

    const targetBtn = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
    if (targetBtn) targetBtn.classList.add('active');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Запускаем с активной вкладкой
  const activeBtn = document.querySelector('.tab-button.active');
  if (activeBtn) {
    switchTab(activeBtn.dataset.tab);
  } else if (buttons.length > 0) {
    switchTab(buttons[0].dataset.tab);
  }

});


