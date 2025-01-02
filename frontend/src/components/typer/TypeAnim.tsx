import { TypeAnimation } from 'react-type-animation';

const TypeAnim = () => {
    return (
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'Asistente Virtual',
                1500, // wait 1s before replacing "Mice" with "Hamsters"
                'Ayuda con marketing',
                1500,
                'Ayuda con objetivos',
                1500,
                'Ayuda con soluciones',
                1500
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '60px', color: 'white', display: 'inline-block', textShadow: '1px 1px 20px #000' }}
            repeat={Infinity}
        />
    );
};

export default TypeAnim