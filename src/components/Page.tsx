import Header from './Header';
import Banner from './Banner';
import Footer from './Footer';

interface PageProps {
    bannerMessage?: string,
    bannerColor?: string,
    onBannerClose?: Function,
    children: React.ReactNode
}

/**
 *  Common Page wrapper component.
 *  contains Header, Banner, and Footer components.
 */
export default function Page({
        bannerMessage = '',
        bannerColor = '#a3be8c',
        onBannerClose = () => { bannerMessage = '' },
        children
    }: PageProps) {

    return (
        <div className="appContainer">
            <Header/>
            <Banner message={bannerMessage} color={bannerColor} onClose={onBannerClose()}/>
            {children}
            <Footer/>
        </div>
    );
}
