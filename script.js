document.addEventListener('DOMContentLoaded', function() {
    // Инициализация плеера
    const audioPlayer = document.getElementById('wedding-audio');
    const playBtn = document.getElementById('play-btn');
    const muteBtn = document.getElementById('mute-btn');
    const progressBar = document.querySelector('.progress');
    
    let isPlaying = false;
    
    if (playBtn) {
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
    }
    
    if (muteBtn) {
        muteBtn.addEventListener('click', function() {
            if (audioPlayer.muted) {
                audioPlayer.muted = false;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                audioPlayer.muted = true;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }
    
    if (audioPlayer) {
        audioPlayer.addEventListener('timeupdate', function() {
            if (progressBar) {
                const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
                progressBar.style.width = `${progress}%`;
            }
        });
    }
    
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
        if (!calendarDays) return;
        calendarDays.innerHTML = '';
        
        const weddingDate = new Date('2026-06-26');
        const currentMonth = weddingDate.getMonth();
        const currentYear = weddingDate.getFullYear();
        
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        let firstDayOfWeek = firstDay.getDay();
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
        
        const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
        
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'day other-month';
            day.textContent = prevMonthLastDay - i;
            calendarDays.appendChild(day);
        }
        
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = document.createElement('div');
            day.className = 'day';
            day.textContent = i;
            
            if (i === 26) {
                day.className = 'day wedding-day';
                day.title = 'День нашей свадьбы!';
            }
            
            calendarDays.appendChild(day);
        }
        
        const totalCells = 42;
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
    
    // Управление выбором количества гостей (+ и -)
    const minusBtn = document.getElementById('minus-guests');
    const plusBtn = document.getElementById('plus-guests');
    const guestCountSpan = document.getElementById('guest-count');
    const guestsInputHidden = document.getElementById('guests');
    const counterError = document.getElementById('counter-error');
    
    let guestValue = 1;
    const MAX_GUESTS = 9;
    const MIN_GUESTS = 1;
    
    function updateGuestDisplay() {
        if (guestCountSpan) guestCountSpan.textContent = guestValue;
        if (guestsInputHidden) guestsInputHidden.value = guestValue;
        if (counterError) counterError.textContent = '';
    }
    
    if (minusBtn && plusBtn) {
        minusBtn.addEventListener('click', function() {
            if (guestValue > MIN_GUESTS) {
                guestValue--;
                updateGuestDisplay();
            }
        });
        
        plusBtn.addEventListener('click', function() {
            if (guestValue < MAX_GUESTS) {
                guestValue++;
                updateGuestDisplay();
            }
        });
    }
    
    // Модальные окна
    const mapModal = document.getElementById('map-modal');
    const orderModal = document.getElementById('order-modal');
    const thankyouModal = document.getElementById('thankyou-modal');
    const openMapBtn = document.getElementById('open-map-btn');
    const orderBtn = document.getElementById('order-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    if (openMapBtn) {
        openMapBtn.addEventListener('click', function() {
            window.open('https://yandex.ru/maps/-/CPeX7FN6', '_blank');
        });
    }
    
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            if (orderModal) orderModal.style.display = 'flex';
        });
    }
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (mapModal) mapModal.style.display = 'none';
            if (orderModal) orderModal.style.display = 'none';
            if (thankyouModal) thankyouModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(event) {
        if (mapModal && event.target === mapModal) mapModal.style.display = 'none';
        if (orderModal && event.target === orderModal) orderModal.style.display = 'none';
        if (thankyouModal && event.target === thankyouModal) thankyouModal.style.display = 'none';
    });
    
    // ========== БАЗОВЫЕ СТИЛИ АНИМАЦИЙ ==========
    const coreStyles = document.createElement('style');
    coreStyles.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(coreStyles);
    
    // ========== УНИВЕРСАЛЬНОЕ МОДАЛЬНОЕ ОКНО ==========
    function showModal(title, message, isError = false) {
        const existingModal = document.getElementById('customModal');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.id = 'customModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        const icon = isError ? '✕' : '✓';
        const iconColor = isError ? '#c62828' : '#2e7d32';
        const bgIconColor = isError ? '#ffebee' : '#e8f5e9';
        const borderColor = isError ? '#c62828' : '#2e7d32';

        modal.innerHTML = `
            <div style="
                background: #ffffff;
                border-radius: 16px;
                padding: 32px 40px;
                max-width: 380px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
                animation: slideUp 0.3s ease;
                border-top: 3px solid ${borderColor};
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            ">
                <div style="
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: ${bgIconColor};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px auto;
                ">
                    <div style="
                        font-size: 32px;
                        font-weight: 400;
                        color: ${iconColor};
                        line-height: 1;
                    ">${icon}</div>
                </div>
                <h3 style="
                    font-size: 24px;
                    font-weight: 500;
                    color: #1a1a1a;
                    margin-bottom: 12px;
                    letter-spacing: -0.3px;
                ">${title}</h3>
                <p style="
                    font-size: 16px;
                    color: #555555;
                    margin-bottom: 28px;
                    line-height: 1.5;
                ">${message}</p>
                <button onclick="this.closest('#customModal').remove()" style="
                    background: #f5f5f5;
                    color: #333333;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 40px;
                    font-family: inherit;
                    font-size: 15px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                " onmouseover="this.style.background='#e8e8e8'" onmouseout="this.style.background='#f5f5f5'">
                    Закрыть
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        if (!isError) {
            setTimeout(() => {
                if (modal.parentElement) modal.remove();
            }, 4000);
        }
    }
    
    // ========== МОДАЛЬНОЕ ОКНО ЗАГРУЗКИ ==========
    function showLoadingModal() {
        const existingLoading = document.getElementById('loadingModal');
        if (existingLoading) existingLoading.remove();
        
        const loadingModal = document.createElement('div');
        loadingModal.id = 'loadingModal';
        loadingModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(3px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        loadingModal.innerHTML = `
            <div style="
                background: white;
                border-radius: 16px;
                padding: 32px 40px;
                text-align: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            ">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 3px solid #e0e0e0;
                    border-top-color: #999;
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    animation: spin 1s linear infinite;
                "></div>
                <p style="
                    font-size: 15px;
                    color: #666;
                    margin: 0;
                ">Отправка ответа...</p>
            </div>
        `;
        document.body.appendChild(loadingModal);
        return loadingModal;
    }
    
    // ========== GOOGLE SHEETS ==========
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZtM_kpIDhNOBvFGwEGJExMsVF0BPgFPQ-EsAx1kNQ6A0g088FJTPb5R8o1ZvjeY1UlQ/exec'; // ЗАМЕНИТЕ НА ВАШ URL
    
    // Обработка формы анкеты
    const rsvpForm = document.getElementById('rsvp-form');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Получаем данные
            const nameInput = document.getElementById('name');
            const attendanceYes = document.getElementById('attendance-yes');
            const attendanceNo = document.getElementById('attendance-no');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const attendance = attendanceYes && attendanceYes.checked ? 'yes' : (attendanceNo && attendanceNo.checked ? 'no' : null);
            const guests = guestsInputHidden ? guestsInputHidden.value : '1';
            
            // Валидация
            if (!name) {
                showModal('Ошибка', 'Пожалуйста, введите ваше имя', true);
                nameInput.focus();
                return;
            }
            
            if (!attendance) {
                showModal('Ошибка', 'Пожалуйста, выберите вариант присутствия', true);
                return;
            }
            
            // Показываем загрузку
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправка...';
            
            const loadingModal = showLoadingModal();
            
            try {
                // Формируем данные для отправки
                const formDataToSend = new URLSearchParams();
                formDataToSend.append('name', name);
                formDataToSend.append('guests', guests);
                formDataToSend.append('attendance', attendance);
                
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formDataToSend.toString()
                });
                
                const result = await response.json();
                
                loadingModal.remove();
                
                if (result.result === 'success') {
                    if (attendance === 'yes') {
                        showModal(
                            'Спасибо, ' + name + '!',
                            'Мы будем ждать вас на нашей свадьбе 26 июня 2026 года! 🎉',
                            false
                        );
                    } else {
                        showModal(
                            'Спасибо за ответ!',
                            'Очень жаль, что вы не сможете быть с нами в этот день.',
                            false
                        );
                    }
                    // Очищаем форму
                    rsvpForm.reset();
                    // Сбрасываем счетчик гостей
                    guestValue = 1;
                    updateGuestDisplay();
                } else {
                    throw new Error(result.message || 'Ошибка отправки');
                }
            } catch (error) {
                loadingModal.remove();
                showModal(
                    'Ошибка',
                    error.message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.',
                    true
                );
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});
