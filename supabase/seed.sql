-- Optional: Run after schema.sql to seed with sample data
-- Only run if your tables are empty

-- Sample portfolio (one project)
INSERT INTO portfolio (name, type, category, tech, description, image, sort_order)
VALUES ('FinFlow', 'Web App', 'web', 'React • Node • PostgreSQL', 'Financial management platform for SMEs with real-time analytics and reporting.', '/portfolio/1.jpg', 0)
;

-- Sample blog posts
INSERT INTO blog_posts (title, excerpt, category, content, date, published, sort_order) VALUES
('Building Scalable React Applications in 2025', 'Discover the latest patterns and best practices for building maintainable, performant React applications at scale.', 'Web Development', 'Key topics include component architecture, state management, and server components.', '2025-03-01', true, 0),
('The Future of Mobile App Development', 'Exploring cross-platform frameworks and native solutions.', 'Mobile', 'Flutter and React Native have matured significantly.', '2025-02-28', true, 1)
;

-- Sample team
INSERT INTO team_members (name, role, avatar, sort_order) VALUES
('John Doe', 'CEO & Founder', 'JD', 0),
('Jane Smith', 'Lead Developer', 'JS', 1),
('Robert Johnson', 'UI/UX Designer', 'RJ', 2),
('Emily Davis', 'Project Manager', 'ED', 3)
;

-- Sample testimonials
INSERT INTO testimonials (name, role, text, avatar, sort_order) VALUES
('Sarah Johnson', 'CEO, TechStart', 'Exceptional work from start to finish. They delivered our web app on time and exceeded our expectations. Highly recommend!', 'SJ', 0),
('Michael Chen', 'Founder, InnovateLab', 'The team understood our vision perfectly. The mobile app they built has transformed our user engagement. Five stars!', 'MC', 1),
('Emma Roberts', 'Director, ScaleUp', 'Professional, responsive, and results-driven. Our digital presence has grown significantly since working with them.', 'ER', 2)
;
