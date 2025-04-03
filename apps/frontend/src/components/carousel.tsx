import Carousel from 'react-bootstrap/Carousel';
import basketball from '../../assets/basketball.jpeg'
import legoat from '../../assets/lebron-dunk.jpg'
import leposter from '../../assets/lebron-poster.jpg'

function UncontrolledExample() {
    return (
        <Carousel>
            <Carousel.Item>
                <img 
                    src={basketball} 
                    alt="Carousel"
                    className='h-[500px] w-full object-cover'
                />
                <Carousel.Caption 
                    className="text-white font-bold"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
                >
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img 
                    src={legoat} 
                    alt="Carousel"
                    className='h-[500px] w-full object-cover'
                />
                <Carousel.Caption 
                    className="text-white font-bold"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
                >
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img 
                    src={leposter} 
                    alt="Carousel"
                    className='h-[500px] w-full object-cover'
                />
                <Carousel.Caption 
                    className="text-white font-bold"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
                >
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default UncontrolledExample;