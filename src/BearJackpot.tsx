import React, {useState, useEffect} from 'react';
import {animated, config, useSprings} from 'react-spring';

import './styles.css';

interface JackpotProps {
    number: number;
}

const BearJackpot = ({number}: JackpotProps) => {
    const [digits, setDigits] = useState(Array(5).fill('0'));
    const targetDigits = number.toString().padStart(5, '0').split('');

    const springs = useSprings(
        digits.length,
        digits.map((digit, index) => ({
            from: { transform: 'translateY(0%)' },
            to: { transform: `translateY(-${targetDigits[index]}00%)` },
            config: { ...config.molasses, duration: 1000 * (digits.length - index) },  // 修改了這裡
            reset: true,
        }))
    );

    useEffect(() => {
        setDigits(targetDigits);
    }, [number]);

    return (
        <div className="jackpot">
            {springs.map((props, index) => (
                <animated.div key={index} style={props}>
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className={digits[index] === String(i) ? 'active' : ''}>
                            {i}
                        </div>
                    ))}
                </animated.div>
            ))}
        </div>
    );
};

export default BearJackpot;