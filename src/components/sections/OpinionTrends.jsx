import { useLanguage } from '../../contexts/LanguageContext';
import { OPINION_DATA, TENDENCIAS_DATA } from '../../constants';

export default function OpinionTrends() {
  const { t } = useLanguage();

  return (
    <div className="two-columns">
      {/* OPINIÓN */}
      <section className="news-section" id="opinion">
        <div className="section-header">
          <div className="section-title-group">
            <div className="section-icon"><i className="fas fa-pen-fancy" /></div>
            <h2 className="section-title">{t('opinion.title') || 'Opinión'}</h2>
          </div>
        </div>
        <div className="opinion-list">
          {OPINION_DATA.map((item) => (
            <article key={item.id} className="opinion-card">
              <div className="opinion-avatar">
                <div className="avatar-placeholder">{item.initials}</div>
              </div>
              <div className="opinion-content">
                <h4>{item.quote}</h4>
                <p className="opinion-author">{item.author} - {item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TENDENCIAS */}
      <section className="news-section" id="trends">
        <div className="section-header">
          <div className="section-title-group">
            <div className="section-icon"><i className="fas fa-fire" /></div>
            <h2 className="section-title">{t('trends.title') || 'Tendencias'}</h2>
          </div>
        </div>
        <div className="trends-list">
          {TENDENCIAS_DATA.map((item, i) => (
            <article key={item.id} className="trend-card">
              <span className="trend-number">{String(i + 1).padStart(2, '0')}</span>
              <div className="trend-content">
                <h4>{item.title}</h4>
                <span className="trend-tag"><i className="fas fa-arrow-trend-up" /> {item.mentions} menciones</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
