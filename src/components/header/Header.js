// import logo from './images/banner.jpg';
import './Header.css';

function Header() {
    return (
        <section>
            <div className="home view">
                <div className="highlights">
                    <h1><b>OUR </b>GYM</h1>
                    <p className="description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Veritatis esse aspernatur quod quaerat earum consequatur?
                        Vero consequatur repellat maiores architecto.
                    </p>
                    <button className="join">Join Now</button>
                </div>
                <div className="background"></div>
            </div>
        </section>
    );
}

export default Header;