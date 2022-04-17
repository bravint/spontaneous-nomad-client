import gitHubIcon from '../../assets/home/github-icon.svg';
import linkedInIcon from '../../assets/home/linkedin-icon.svg';

import '../../styles/sidebar-footer.css';

export const SidebarFooter = () => {
    return (
        <section className="sidebar-footer">
            <div className="sidebar-footer-logo-container">
                <div>&nbsp;</div>
                <a
                    href="https://github.com/bravint"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={gitHubIcon}
                        alt="gitHub logo"
                        className="sidebar-footer-logo"
                    />
                </a>
                <a
                    href="https://uk.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={linkedInIcon}
                        alt="LinkedIn Logo"
                        className="sidebar-footer-logo"
                    />
                </a>
            </div>
            <p className="sidebar-footer-text">
                &#169;2022 Bravin Thillainathan
            </p>
        </section>
    );
};
