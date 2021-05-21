import { useRef, memo } from 'react';
import styles from '../styles/Home.module.css';

const TooltipComponent = ({ d, width, height }) => {
    const tooltipRef = useRef(null);

    return (
        <div
            ref={tooltipRef}
            className={styles.tooltip_container}
            style={{
                opacity: d.opacity,
                left: `${d.clientX + 10}px`,
                top: `${d.clientY}px`
            }}
        >
            <h3>{d.message}</h3>
        </div>
    )
}

export default memo(TooltipComponent);