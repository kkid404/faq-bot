import DemoChat from './components/DemoChat';

export default function Home() {
  return (
    <div className="page-wrapper">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <div className="pilot-badge">Закрытый пилот v0.2</div>
              
              <h1 className="hero-title">
                FAQ‑бот для малого бизнеса, который отвечает клиентам и собирает заявки 24/7
              </h1>
              
              <p className="hero-subtitle">
                Забудьте про однотипные вопросы в мессенджерах. Бот сам расскажет про услуги, цены и график работы, 
                а заявки аккуратно соберёт и передаст вам. Вы экономите время, клиенты получают ответы мгновенно.
              </p>
              
              <a href="#demo-chat" className="cta-button">
                Попробовать демо
              </a>
              
              <div className="hero-badges">
                <div className="badge-item">
                  <svg className="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Работает круглосуточно</span>
                </div>
                <div className="badge-item">
                  <svg className="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Ни одна заявка не потеряется</span>
                </div>
                <div className="badge-item">
                  <svg className="badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Ответ за секунды</span>
                </div>
              </div>
            </div>
            
            <div className="hero-right">
              <div className="chat-preview-card">
                <div className="chat-preview-header">
                  <div className="chat-preview-avatar"></div>
                  <div className="chat-preview-info">
                    <div className="chat-preview-name">FAQ‑бот</div>
                    <div className="chat-preview-status">Онлайн</div>
                  </div>
                </div>
                <div className="chat-preview-messages">
                  <div className="chat-preview-message bot">
                    <div className="message-bubble">Добрый день! Чем могу помочь?</div>
                  </div>
                  <div className="chat-preview-message user">
                    <div className="message-bubble">Какие у вас услуги?</div>
                  </div>
                  <div className="chat-preview-message bot">
                    <div className="message-bubble">У нас есть стрижки, окрашивание, маникюр и педикюр...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">Как это работает</h2>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="step-title">Заполните данные бизнеса</h3>
              <p className="step-description">
                Укажите адрес, услуги, график работы и цены. Это займёт 10 минут.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="step-title">Бот отвечает клиентам</h3>
              <p className="step-description">
                Вместо вас бот расскажет про услуги, цены и график. Освобождает время администратора.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="step-title">Получайте заявки</h3>
              <p className="step-description">
                Бот собирает контакты и пожелания клиентов, отправляет вам в удобном формате.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section" id="demo-chat">
        <div className="container">
          <div className="demo-header">
            <h2 className="section-title">Демо‑чат</h2>
            <p className="demo-subtitle">
              Попробуйте пообщаться с ботом. Это пример для салона красоты — задавайте вопросы про услуги, цены или оставьте заявку.
            </p>
          </div>
          
          <div className="demo-chat-wrapper">
            <DemoChat />
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">FAQ‑бот для малого бизнеса · Закрытый пилот 2025</p>
        </div>
      </footer>
    </div>
  );
}
