document.addEventListener('DOMContentLoaded', function() {
    // Инициализация плеера
    const audioPlayer = document.getElementById('wedding-audio');
    const playBtn = document.getElementById('play-btn');
    const muteBtn = document.getElementById('mute-btn');
    const progressBar = document.querySelector('.progress');
    
    let isPlaying = false;
    
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    muteBtn.addEventListener('click', function() {
        if (audioPlayer.muted) {
            audioPlayer.muted = false;
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            audioPlayer.muted = true;
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
    
    // Обновление прогресс-бара
    audioPlayer.addEventListener('timeupdate', function() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });
    
    // Счетчик дней до свадьбы
    function updateCountdown() {
        const weddingDate = new Date('2026-06-26T15:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        if (timeLeft < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Календарь
    function generateCalendar() {
        const calendarDays = document.getElementById('calendar-days');
        calendarDays.innerHTML = '';
        
        const weddingDate = new Date('2026-06-26');
        const currentMonth = weddingDate.getMonth();
        const currentYear = weddingDate.getFullYear();
        
        // Первый день месяца
        const firstDay = new Date(currentYear, currentMonth, 1);
        // Последний день месяца
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        // День недели первого дня месяца (0 - воскресенье, 1 - понедельник, и т.д.)
        let firstDayOfWeek = firstDay.getDay();
        // Преобразуем к формату 0-понедельник, 6-воскресенье
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
        
        // Дни предыдущего месяца
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        
        // Заполняем дни предыдущего месяца
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'day other-month';
            day.textContent = prevMonthLastDay - i;
            calendarDays.appendChild(day);
        }
        
        // Дни текущего месяца
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = document.createElement('div');
            day.className = 'day';
            day.textContent = i;
            
            // Проверяем, является ли этот день днем свадьбы
            if (i === 26) {
                day.className = 'day wedding-day';
                day.title = 'День нашей свадьбы!';
            }
            
            calendarDays.appendChild(day);
        }
        
        // Дни следующего месяца
        const totalCells = 42; // 6 строк по 7 дней
        const daysSoFar = firstDayOfWeek + lastDay.getDate();
        const nextMonthDays = totalCells - daysSoFar;
        
        for (let i = 1; i <= nextMonthDays; i++) {
            const day = document.createElement('div');
            day.className = 'day other-month';
            day.textContent = i;
            calendarDays.appendChild(day);
        }
    }
    
    generateCalendar();
    
    // Управление выбором количества гостей
    const guestButtons = document.querySelectorAll('.guest-btn');
    const guestsInput = document.getElementById('guests');
    
    guestButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            guestButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс к выбранной кнопке
            this.classList.add('active');
            
            // Устанавливаем значение в скрытое поле
            guestsInput.value = this.getAttribute('data-value');
        });
    });
    
    // Активируем первую кнопку по умолчанию
    if (guestButtons.length > 0) {
        guestButtons[0].classList.add('active');
    }
    
    // Модальные окна
    const mapModal = document.getElementById('map-modal');
    const orderModal = document.getElementById('order-modal');
    const thankyouModal = document.getElementById('thankyou-modal');
    const openMapBtn = document.getElementById('open-map-btn');
    const orderBtn = document.getElementById('order-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    openMapBtn.addEventListener('click', function() {
        window.open('https://yandex.ru/maps/-/CPeX7FN6', '_blank');
    });
    
    orderBtn.addEventListener('click', function() {
        orderModal.style.display = 'flex';
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            mapModal.style.display = 'none';
            orderModal.style.display = 'none';
            thankyouModal.style.display = 'none';
        });
    });
    
    // Закрытие модальных окон при клике вне их
    window.addEventListener('click', function(event) {
        if (event.target === mapModal) {
            mapModal.style.display = 'none';
        }
        if (event.target === orderModal) {
            orderModal.style.display = 'none';
        }
        if (event.target === thankyouModal) {
            thankyouModal.style.display = 'none';
        }
    });
    
    // Обработка формы анкеты
    const rsvpForm = document.getElementById('rsvp-form');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // В реальном приложении здесь был бы код отправки данных на сервер
        // Для демонстрации просто покажем модальное окно с благодарностью
        
        // Сброс формы
        rsvpForm.reset();
        
        // Сброс кнопок гостей
        guestButtons.forEach(btn => btn.classList.remove('active'));
        if (guestButtons.length > 0) {
            guestButtons[0].classList.add('active');
        }
        guestsInput.value = "1";
        
        // Показ модального окна с благодарностью
        thankyouModal.style.display = 'flex';
    });
    
    // Автозапуск музыки (опционально, можно закомментировать)
    // audioPlayer.play();
    // playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    // isPlaying = true;
});