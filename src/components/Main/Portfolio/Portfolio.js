import './Portfolio.css';

const Portfolio = () => {
    return (
        <section className='portfolio'>
            <div className='portfolio__container'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <ul className='portfolio__list'>
                <li className='portfolio__website'>
                    <a
                    className='portfolio__link'
                    target='_blank'
                    rel="noopener noreferrer"
                    href='https://github.com/Ne-skrooomnaya/how-to-learn/'>
                        Статичный сайт
                    <div className="portfolio__icon">&#8599;</div>
                    </a>
                </li>
                <li className='portfolio__website'>
                    <a
                    className='portfolio__link'
                    target='_blank'
                    rel="noopener noreferrer"
                    href='https://github.com/Ne-skrooomnaya/russian-travel/'>
                        Адаптивный сайт
                    <div className="portfolio__icon">&#8599;</div>
                    </a>
                </li>
                <li className='portfolio__website'>
                    <a
                    className='portfolio__link'
                    target='_blank'
                    rel="noopener noreferrer"
                    href='https://github.com/Ne-skrooomnaya/react-mesto-auth/'>
                        Одностраничное приложение
                    <div className="portfolio__icon">&#8599;</div>
                    </a>
                </li>
            </ul>
            </div>
        </section>
    )
}

export default Portfolio;