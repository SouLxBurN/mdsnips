import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Banner.css';

interface BannerProps {
    message: string,
    color: string,
    onClose(): void
}

export default function Banner(props: BannerProps) {
    if (props.message.length <= 0) return (<></>);

    return (
        <div className="banner" style={{ backgroundColor: props.color}}>
            <span className="banner__message">{props.message}</span>
            <button className="banner__close" type="button" onClick={() => props.onClose()}>
                <FontAwesomeIcon icon={faTimes}/>
            </button>
        </div>
    )
}
