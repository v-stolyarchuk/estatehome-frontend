import './FooterBottom.scss'

export const FooterBottom = () => {
    return (
        <div className="footer-bottom">
            <p className="footer-bottom__text">
                © {new Date().getFullYear()} EstateHome. Усі права захищені.
            </p>
        </div>
    )
}
