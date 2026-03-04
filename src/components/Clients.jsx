import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { portfolioProjects } from '../data/portfolioData';

const featured = portfolioProjects.slice(0, 6);

export default function Clients() {
  return (
    <section className="section portfolio-home" id="portfolio">
      <div className="portfolio-home__wrap">
        <motion.div
          className="portfolio-home__top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="portfolio-home__head">
            <h2 className="portfolio-home__title">Selected Work</h2>
            <Link to="/portfolio" className="portfolio-home__all">
              View all <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>

        <div className="portfolio-home__scroll">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              className="portfolio-home__item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/portfolio/${project.id}`} className="portfolio-home__card">
                <div className="portfolio-home__thumb">
                  {project.image && (
                    <img src={project.image} alt={project.name} />
                  )}
                </div>
                <div className="portfolio-home__meta">
                  <span className="portfolio-home__name">{project.name}</span>
                  <span className="portfolio-home__type">{project.type}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
