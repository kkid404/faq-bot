'use client';

import { useEffect, useState } from 'react';
import DemoChat from './components/DemoChat';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page-wrapper">
      <div className="hero-section">
        <div className="hero-bg-elements">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>

        <div className="container">
          <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
            <div className="hero-left">
              <div className="pilot-badge">
                <span className="badge-dot"></span>
                Закрытый пилот v0.2
              </div>
              
              <h1 className="hero-title">
                <span className="title-word">Забудьте </span>
                <span className="title-word">о </span>
                <span className="title-word">диспетчере. </span>
                <span className="highlight">Ваш </span>
                <span className="highlight">бот </span>
                <span className="highlight">работает </span>
                <span className="highlight">24/7</span>
              </h1>
              
              <p className="hero-subtitle">
                Пока вы спите, бот отвечает клиентам на вопросы, собирает заявки и снимает с вас рутину. 
                Вы просто берёте готовые заявки — никакой текучки из мессенджеров.
              </p>
              
              <div className="cta-wrapper">
                <a href="#demo-chat" className="cta-button primary">
                  <span className="button-text">Посмотреть в деле</span>
                  <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <button className="cta-button secondary" onClick={() => {
                  alert('Предположительно здесь будет форма регистрации');
                }}>
                  Начать бесплатно
                </button>
              </div>
              
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-value">3 минуты</div>
                  <div className="stat-label">На настройку</div>
                </div>
                <div className="stat">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Интеграция с ВК</div>
                </div>
                <div className="stat">
                  <div className="stat-value">∞</div>
                  <div className="stat-label">Бесплатных вопросов</div>
                </div>
              </div>
            </div>
            
            <div className="hero-right">
              <div className="chat-preview-container">
                <div className="chat-floating-element float-1">
                  <div className="mini-badge">✨ Работает круглосуточно</div>
                </div>
                
                <div className="chat-preview-card">
                  <div className="chat-preview-header">
                    <div className="chat-preview-avatar">
                      <span className="avatar-emoji">💅</span>
                    </div>
                    <div className="chat-preview-info">
                      <div className="chat-preview-name">Виктория Салон</div>
                      <div className="chat-preview-status">
                        <span className="status-dot"></span>
                        Сейчас онлайн
                      </div>
                    </div>
                  </div>
                  <div className="chat-preview-messages">
                    <div className="chat-message-wrapper bot-message">
                      <div className="message-bubble">👋 Привет! Я помогу с записью</div>
                      <div className="message-time">14:32</div>
                    </div>
                    <div className="chat-message-wrapper user-message">
                      <div className="message-bubble">Во сколько вы завтра работаете?</div>
                      <div className="message-time">14:33</div>
                    </div>
                    <div className="chat-message-wrapper bot-message typing">
                      <div className="message-bubble">
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                        <span className="typing-dot"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="chat-floating-element float-2">
                  <div className="mini-badge success">✓ Заявка принята</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Как это решает вашу проблему</h2>
            <p className="section-subtitle">Вот что уходит из вашего дня благодаря боту</p>
          </div>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-icon">🎨</div>
              <h3 className="step-title">Заполните один раз</h3>
              <p className="step-description">
                Услуги, цены, график — вводите один раз. Бот запомнит и будет отвечать.
              </p>
              <div className="step-time">~3 минуты</div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-icon">🤖</div>
              <h3 className="step-title">Бот отвечает 24/7</h3>
              <p className="step-description">
                Не просыпается, не болеет, не отвлекается. Обрабатывает 100 вопросов одновременно.
              </p>
              <div className="step-time">Экономит 2-3 часа в день</div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-icon">📋</div>
              <h3 className="step-title">Заявки в одном месте</h3>
              <p className="step-description">
                Контакты клиентов, их пожелания — всё в удобном интерфейсе. Ничего не потеряется.
              </p>
              <div className="step-time">Никогда не забудете клиента</div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Что вы получаете</h2>
            <p className="section-subtitle">Всё что нужно для автоматизации</p>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h4>Работает в ВК и Telegram</h4>
              <p>Клиенты пишут там, где им удобно</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h4>Ответ за доли секунды</h4>
              <p>Клиент не ждёт, видит, что вы отзывчивы</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h4>Квалифицированные заявки</h4>
              <p>Бот уже спросил про услугу и время</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <h4>Легко менять информацию</h4>
              <p>Новая цена? Изменили за 30 секунд</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h4>Видите статистику</h4>
              <p>Сколько вопросов, кто спрашивает</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🛡️</div>
              <h4>Не теряет данные</h4>
              <p>История сохраняется, ничего не исчезнет</p>
            </div>
          </div>
        </div>
      </div>

      <div className="social-proof-section">
        <div className="container">
          <h2 className="section-title">Уже помогаем бизнесу</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Раньше я целый день отвечала на одни и те же вопросы в ВК. Теперь бот сам, а я занимаюсь клиентами. Просто волшебство!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">К</div>
                <div className="author-info">
                  <div className="author-name">Кристина</div>
                  <div className="author-role">Студия красоты</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Лучше всяких платных диспетчеров. За день бот собирает чистые заявки, я просто звоню и занимаю время."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">И</div>
                <div className="author-info">
                  <div className="author-name">Илья</div>
                  <div className="author-role">Детский центр</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Не дорого, не сложно, работает. Клиенты довольны быстрыми ответами, я экономлю время. Вот это да!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">М</div>
                <div className="author-info">
                  <div className="author-name">Маша</div>
                  <div className="author-role">Салон маникюра</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section" id="demo-chat">
        <div className="container">
          <div className="demo-header">
            <h2 className="section-title">Попробуйте сейчас</h2>
            <p className="demo-subtitle">
              Представьте, что вы клиент студии красоты. Задавайте любые вопросы — бот отвечает в реальном времени.
            </p>
          </div>
          
          <div className="demo-chat-wrapper">
            <DemoChat />
          </div>

          <div className="demo-cta">
            <p className="demo-cta-text">Понравилось? Запустите для своего бизнеса.</p>
            <button className="cta-button primary" onClick={() => {
              alert('Предположительно здесь будет форма регистрации');
            }}>
              Начать бесплатный пробный период
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">FAQ‑бот для малого бизнеса</p>
            <p className="footer-year">2025 · Закрытый пилот</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
