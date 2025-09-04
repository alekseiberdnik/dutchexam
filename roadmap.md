# DutchExam.online --- Product Roadmap

## 0. Что уже есть (база)

-   Домены: dutchexam.online (Netlify + TransIP DNS).
-   Лендинг (index.html) --- дизайн в стиле Skyeng, AJAX-форма на
    Netlify Forms.
-   Cookie banner, форма подписки (имя, email, телефон, согласия).
-   tests.html --- 4 варианта тестов (Quick, Extended, In-Depth,
    Comprehensive).
-   test-quick.html (\~5 мин), test-extended.html (\~10 мин),
    test-in-depth.html (\~12 мин с письмом).
-   Адаптивный дизайн, без Bootstrap.

## 1. MVP (минимально жизнеспособный продукт)

**Цель:** пользователь проходит тест, получает результат + email-отчёт;
мы собираем лиды и аналитику.

### Пользовательская часть

-   Сохранение результатов в БД.
-   Email-отчёт после теста.
-   Мини-опрос перед результатами (имя/email).
-   Страницы: Политика конфиденциальности, Условия.
-   Контактная форма.

### Админка

-   Просмотр сабмишнов, экспорт CSV.
-   CRUD по вопросам (активные/неактивные).
-   Фильтры (дата, тест, уровень).

### AI

-   Объяснения ошибок (подсказки).
-   Проверка письма с AI.
-   Лимиты на подсказки.

## 2. Технологии

-   Фронтенд: HTML/CSS/JS, позже Next.js/React.
-   Бэкенд: .NET 8 minimal APIs.
-   БД: PostgreSQL (Supabase/Neon).
-   Email: SendGrid или Resend.
-   ESP: Mailchimp/Brevo.
-   Аналитика: GA4 или Plausible.
-   Админка: SPA (React/Blazor).
-   CI/CD: Netlify + GitHub Actions.

## 3. Модель данных

-   users (id, email, имя, телефон, язык, created_at)
-   tests (id, slug, title, статус)
-   questions (id, test_id, type, payload JSON)
-   submissions (id, user_id, test_id, started_at, completed_at, score,
    accuracy, level)
-   answers (id, submission_id, question_id, answer JSON, is_correct,
    ai_feedback)
-   admin_users (id, email, password_hash, role)

## 4. Фронтенд задачи

-   Подключить тесты к API.
-   Рендер вопросов из API.
-   Экран результатов с email-отчётом.
-   Блок рекомендаций.
-   Трекинг событий (start, answer, finish).
-   Accessibility (drag&drop).
-   Мультиязычность (EN/RU/NL).

## 5. Бэкенд задачи

-   API: /submissions, /answer, /finish, /tests/{slug}/questions.
-   Сервис оценки уровня (A1--B2).
-   Email-отчёты (через SendGrid/Resend).
-   Вебхук Netlify Forms → users.
-   Админка CRUD + фильтры.
-   Rate limiting.

## 6. AI план

-   Подсказки по грамматике.
-   Фидбек по письму.
-   Кеширование подсказок.
-   Ограничение токенов.
-   Quick test --- без AI, Extended --- 3 подсказки, In-Depth ---
    письменно + подсказки.

## 7. Монетизация

-   MVP: бесплатно + сбор email.
-   V1.1: Stripe Checkout.
    -   Basic: Extended + AI подсказки.
    -   Pro: In-Depth + письменно + сохранение прогресса.
-   Корпоративные тарифы (школы/NGO).

## 8. Дизайн

-   Сейчас: light-дизайн (синий/жёлтый).
-   MVP: оставить как есть, полировка UI.
-   V1: брендирование, иконки, favicon.
-   V2: user flow как у Skyeng.

## 9. Дальнейшие шаги

-   Comprehensive test (\~30 мин) с speaking.
-   Личный кабинет: история тестов, графики.
-   Геймификация: streaks, бейджи.
-   Интеграция с LMS.
-   Мобильное приложение (Flutter/React Native).
